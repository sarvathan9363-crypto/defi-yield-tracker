/**
 * Aave V3 addresses per network
 * Source: Aave official deployments
 *
 * IMPORTANT:
 * - Only include assets that are real Aave V3 reserves
 * - Token address must be the UNDERLYING asset
 * - If an asset is not a reserve → use null
 */

module.exports = {
  ethereum: {
    // Aave V3 Pool – Ethereum Mainnet
    POOL: "0x87870Bca3F3fD6335C3F4ce8392D69350B4fA4E2",

    TOKENS: {
      USDC: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
      USDT: "0xdAC17F958D2ee523a2206206994597C13D831ec7",

      // USDe is NOT a standard Aave V3 reserve on Ethereum
      USDE: null,

      // Not available
      CevUSD: null,
    },
  },

  arbitrum: {
    // Aave V3 Pool – Arbitrum One
    POOL: "0x794a61358D6845594F94dc1DB02A252b5b4814aD",

    TOKENS: {
      USDC: "0xaf88d065e77c8cC2239327C5EDb3A432268e5831",
      USDT: "0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9",

      // USDe exists on Arbitrum, but is NOT exposed as a standard Aave V3 reserve
      // Therefore we intentionally mark it unsupported
      USDE: null,

      // Not available
      CevUSD: null,
    },
  },

  bnb: {
    // Aave is NOT deployed on BNB Chain
    POOL: null,

    TOKENS: {
      USDC: null,
      USDT: null,
      USDE: null,
      CevUSD: null,
    },
  },
};
