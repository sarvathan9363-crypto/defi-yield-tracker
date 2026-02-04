require("dotenv").config();

const { ethers } = require("ethers");

const ADDRESSES = require("./addresses");
const ASSETS = require("./assetMapper");

const { getProvider } = require("../../config/rpc");
const { resolveNetwork } = require("../../services/networkResolver");

// Venus vToken ABI (Compound-style markets only)
const VTOKEN_ABI = [
  "function supplyRatePerBlock() view returns (uint256)",
];

/**
 * Convert supplyRatePerBlock → APY
 * Compound-style compounding
 */
function blockRateToApy(ratePerBlock, blocksPerYear) {
  const rate = Number(ratePerBlock.toString()) / 1e18;
  if (!rate || rate <= 0) return 0;
  return (Math.pow(1 + rate, blocksPerYear) - 1) * 100;
}

/**
 * Fetch Venus Supply APY
 * - Venus is BNB-chain only
 * - Skips unsupported / incompatible markets silently
 * - NEVER logs expected protocol behavior
 */
async function fetchVenusYields() {
  const results = [];

  for (const asset of Object.values(ASSETS)) {
    const network = resolveNetwork("venus", asset.symbol);

    // Asset not supported on Venus
    if (!network) {
      results.push({
        asset: asset.symbol,
        apy: null,
        supported: false,
        network: null,
      });
      continue;
    }

    const networkConfig = ADDRESSES[network];

    // Venus config missing
    if (
      !networkConfig ||
      !networkConfig.VTOKENS ||
      !networkConfig.BLOCKS_PER_YEAR
    ) {
      results.push({
        asset: asset.symbol,
        apy: null,
        supported: false,
        network,
      });
      continue;
    }

    const vTokenAddress = networkConfig.VTOKENS[asset.symbol];

    // Not a Compound-style Venus market (e.g. USDC)
    if (!vTokenAddress) {
      results.push({
        asset: asset.symbol,
        apy: null,
        supported: false,
        network,
      });
      continue;
    }

    try {
      const provider = getProvider(network);
      const vToken = new ethers.Contract(
        vTokenAddress,
        VTOKEN_ABI,
        provider
      );

      const ratePerBlock = await vToken.supplyRatePerBlock();

      if (!ratePerBlock || ratePerBlock === 0n) {
        results.push({
          asset: asset.symbol,
          apy: null,
          supported: false,
          network,
        });
        continue;
      }

      const apy = blockRateToApy(
        ratePerBlock,
        networkConfig.BLOCKS_PER_YEAR
      );

      results.push({
        asset: asset.symbol,
        apy,
        supported: true,
        network,
      });
    } catch {
      // Expected incompatibility → silent skip
      results.push({
        asset: asset.symbol,
        apy: null,
        supported: false,
        network,
      });
    }
  }

  return results;
}

/**
 * Local CLI test
 */
if (require.main === module) {
  fetchVenusYields()
    .then((data) => {
      console.log("Venus Supply APY:\n");
      data.forEach((d) => {
        console.log(
          `${d.asset}: ${
            d.supported
              ? `${d.apy.toFixed(2)} % (${d.network})`
              : "N/A"
          }`
        );
      });
    })
    .catch(console.error);
}

module.exports = fetchVenusYields;
