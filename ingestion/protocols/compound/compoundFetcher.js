require("dotenv").config();

const { ethers } = require("ethers");

const ADDRESSES = require("./addresses");
const ASSETS = require("./assetMapper");

const { getProvider } = require("../../config/rpc");
const { resolveNetwork } = require("../../services/networkResolver");

// cToken ABI (minimal)
const CTOKEN_ABI = [
  "function supplyRatePerBlock() view returns (uint256)",
];

/**
 * Convert supplyRatePerBlock → APY
 * Compound uses per-block rates
 */
function blockRateToApy(ratePerBlock, blocksPerYear) {
  const rate = Number(ratePerBlock) / 1e18;

  // Compounded APY (Compound-style)
  return (Math.pow(1 + rate, blocksPerYear) - 1) * 100;
}

/**
 * Fetch Compound APY for all assets
 * - Compound is Ethereum-only
 * - Uses real compounding (NOT linear APR)
 */
async function fetchCompoundYields() {
  const results = [];

  for (const asset of Object.values(ASSETS)) {
    const network = resolveNetwork("compound", asset.symbol);

    // Asset not supported on any network
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

    if (!networkConfig || !networkConfig.CTOKENS) {
      results.push({
        asset: asset.symbol,
        apy: null,
        supported: false,
        network,
      });
      continue;
    }

    const cTokenAddress = networkConfig.CTOKENS[asset.symbol];

    if (!cTokenAddress) {
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
      const cToken = new ethers.Contract(
        cTokenAddress,
        CTOKEN_ABI,
        provider
      );

      const supplyRatePerBlock = await cToken.supplyRatePerBlock();

      const apy = blockRateToApy(
        supplyRatePerBlock,
        networkConfig.BLOCKS_PER_YEAR
      );

      results.push({
        asset: asset.symbol,
        apy,
        supported: true,
        network,
      });
    } catch (err) {
      console.error(
        `Compound fetch error [${asset.symbol}]:`,
        err.message
      );

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
  fetchCompoundYields()
    .then((data) => {
      console.log("Compound Supply APY:\n");
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

module.exports = fetchCompoundYields;
