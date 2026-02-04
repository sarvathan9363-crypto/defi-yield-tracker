/**
 * Compound Asset Mapper
 *
 * - Assets are protocol-level definitions
 * - Network availability is resolved dynamically
 * - Addresses come from addresses.js per network
 */

module.exports = {
  USDC: {
    symbol: "USDC",
  },

  USDT: {
    symbol: "USDT",
  },

  // Not supported on Compound
  USDE: {
    symbol: "USDE",
  },

  CevUSD: {
    symbol: "CevUSD",
  },
};
