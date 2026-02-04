/**
 * Spark Protocol addresses
 *
 * Notes:
 * - Spark is an Aave V3 fork by MakerDAO
 * - Currently deployed ONLY on Ethereum Mainnet
 * - Uses Aave-style Pool & liquidityRate
 * - Unsupported assets are explicitly marked as null
 */

module.exports = {
  ethereum: {
    // Spark Lend Pool (Ethereum Mainnet)
    POOL: "0xC13e21B648A5Ee794902342038FF3aDAB66BE987",

    TOKENS: {
      // Supported assets
      USDC: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
      USDT: "0xdAC17F958D2ee523a2206206994597C13D831ec7",

      // Not supported on Spark
      USDE: null,
      CevUSD: null,
    },
  },

  arbitrum: {
    // Spark not deployed on Arbitrum
    POOL: null,

    TOKENS: {
      USDC: null,
      USDT: null,
      USDE: null,
      CevUSD: null,
    },
  },

  bnb: {
    // Spark not deployed on BNB Chain
    POOL: null,

    TOKENS: {
      USDC: null,
      USDT: null,
      USDE: null,
      CevUSD: null,
    },
  },
};
