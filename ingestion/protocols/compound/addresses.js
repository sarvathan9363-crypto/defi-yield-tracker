/**
 * Compound protocol addresses & constants
 *
 * Notes:
 * - Compound V2 is Ethereum-only for this MVP
 * - cToken addresses are market-specific
 * - APY is derived from supplyRatePerBlock
 * - Other networks intentionally marked unsupported
 */

module.exports = {
  ethereum: {
    // cToken contracts (Compound V2 – Ethereum mainnet)
    CTOKENS: {
      USDC: "0x39AA39c021dfbaE8faC545936693aC917d5E7563", // cUSDC
      USDT: "0xf650C3d88D12dB855b8bf7D11Be6C55A4e07dCC9", // cUSDT

      // Not available on Compound V2
      USDE: null,
      CevUSD: null,
    },

    // Ethereum average blocks per year (~12s block time)
    BLOCKS_PER_YEAR: 4 * 60 * 24 * 365, // 2,102,400
  },

  arbitrum: {
    // Compound is not deployed on Arbitrum (native)
    CTOKENS: {
      USDC: null,
      USDT: null,
      USDE: null,
      CevUSD: null,
    },

    BLOCKS_PER_YEAR: null,
  },

  bnb: {
    // Compound not available on BNB Chain
    CTOKENS: {
      USDC: null,
      USDT: null,
      USDE: null,
      CevUSD: null,
    },

    BLOCKS_PER_YEAR: null,
  },
};
