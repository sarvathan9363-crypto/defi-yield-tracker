/**
 * Venus Protocol addresses
 *
 * Notes:
 * - Venus is deployed on BNB Chain only
 * - Uses vToken markets (Compound-style)
 * - APY derived from supplyRatePerBlock
 * - Unsupported assets are explicitly marked as null
 */

module.exports = {
  bnb: {
    // Venus vToken contracts (BNB Chain)
    VTOKENS: {
      USDC: "0xEC5dCb5Dbf4B114C9d0F65BcCAb49EC54F6A0867", // vUSDC
      USDT: "0xfD5840Cd36d94D7229439859C0112a4185BC0255", // vUSDT

      // Not supported on Venus
      USDE: null,
      CevUSD: null,
    },

    // Approx. BNB Chain blocks per year (~3s block time)
    BLOCKS_PER_YEAR: 10512000,
  },

  ethereum: {
    // Venus not deployed on Ethereum
    VTOKENS: {
      USDC: null,
      USDT: null,
      USDE: null,
      CevUSD: null,
    },

    BLOCKS_PER_YEAR: null,
  },

  arbitrum: {
    // Venus not deployed on Arbitrum
    VTOKENS: {
      USDC: null,
      USDT: null,
      USDE: null,
      CevUSD: null,
    },

    BLOCKS_PER_YEAR: null,
  },
};
