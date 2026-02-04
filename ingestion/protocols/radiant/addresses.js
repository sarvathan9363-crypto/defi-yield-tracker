/**
 * Radiant protocol addresses
 *
 * Notes:
 * - Radiant is deployed ONLY on Arbitrum
 * - Uses Aave-style Pool & liquidityRate
 * - Unsupported assets are explicitly marked as null
 */

module.exports = {
  arbitrum: {
    // Radiant Lending Pool (Arbitrum One)
    POOL: "0x2032b9A8e9F7e76768CA9271003d3e43E1616B1F",

    TOKENS: {
      // Supported assets
      USDC: "0xFF970A61A04b1cA14834A43f5dE4533eBDDB5CC8", // USDC.e (Arbitrum)
      USDT: "0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9",

      // Not supported on Radiant
      USDE: null,
      CevUSD: null,
    },
  },

  ethereum: {
    // Radiant is NOT deployed on Ethereum
    POOL: null,

    TOKENS: {
      USDC: null,
      USDT: null,
      USDE: null,
      CevUSD: null,
    },
  },

  bnb: {
    // Radiant not deployed on BNB Chain
    POOL: null,

    TOKENS: {
      USDC: null,
      USDT: null,
      USDE: null,
      CevUSD: null,
    },
  },
};
