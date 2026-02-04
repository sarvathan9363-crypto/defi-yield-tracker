const { ethers } = require("ethers");

const ADDRESSES = require("./addresses");
const ASSETS = require("./assetMapper");
const { rayToApy } = require("./apyCalculator");

const { getProvider } = require("../../config/rpc");
const { resolveNetwork } = require("../../services/networkResolver");

// Aave V3 Pool ABI (correct & minimal)
const POOL_ABI = [
  {
    inputs: [{ internalType: "address", name: "asset", type: "address" }],
    name: "getReserveData",
    outputs: [
      {
        components: [
          { internalType: "uint256", name: "configuration", type: "uint256" },
          { internalType: "uint128", name: "liquidityIndex", type: "uint128" },
          {
            internalType: "uint128",
            name: "currentLiquidityRate",
            type: "uint128",
          },
          { internalType: "uint128", name: "variableBorrowIndex", type: "uint128" },
          {
            internalType: "uint128",
            name: "currentVariableBorrowRate",
            type: "uint128",
          },
          {
            internalType: "uint128",
            name: "currentStableBorrowRate",
            type: "uint128",
          },
          { internalType: "uint40", name: "lastUpdateTimestamp", type: "uint40" },
          { internalType: "address", name: "aTokenAddress", type: "address" },
          { internalType: "address", name: "stableDebtTokenAddress", type: "address" },
          { internalType: "address", name: "variableDebtTokenAddress", type: "address" },
          { internalType: "address", name: "interestRateStrategyAddress", type: "address" },
          { internalType: "uint8", name: "id", type: "uint8" },
        ],
        internalType: "struct DataTypes.ReserveData",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

/**
 * Fetch Aave APY for all assets (multi-network)
 */
async function fetchAaveYields() {
  const results = [];

  for (const asset of Object.values(ASSETS)) {
    const network = resolveNetwork("aave", asset.symbol);

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

    if (!networkConfig || !networkConfig.POOL) {
      results.push({
        asset: asset.symbol,
        apy: null,
        supported: false,
        network,
      });
      continue;
    }

    const tokenAddress = networkConfig.TOKENS[asset.symbol];

    if (!tokenAddress) {
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
      const pool = new ethers.Contract(
        networkConfig.POOL,
        POOL_ABI,
        provider
      );

      const reserveData = await pool.getReserveData(tokenAddress);
      const liquidityRate = reserveData.currentLiquidityRate;

      if (!liquidityRate || liquidityRate === 0n) {
        results.push({
          asset: asset.symbol,
          apy: null,
          supported: false,
          network,
        });
        continue;
      }

      results.push({
        asset: asset.symbol,
        apy: rayToApy(liquidityRate),
        supported: true,
        network,
      });
    } catch (err) {
      console.error(
        `Aave fetch error [${asset.symbol} on ${network}]:`,
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
  fetchAaveYields()
    .then((data) => {
      console.log("Aave Supply APY (Multi-Network):\n");
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

module.exports = fetchAaveYields;
