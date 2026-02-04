/**
 * Network Resolver
 *
 * Purpose:
 * - Decide which network should be used to fetch APY
 * - Avoid silent network switching
 * - Centralize asset → network mapping
 */

/**
 * Asset → preferred networks per protocol
 * Order matters: first available network wins
 */
const ASSET_NETWORK_MAP = {
  USDC: {
    aave: ["ethereum", "arbitrum"],
    compound: ["ethereum"],
    spark: ["ethereum"],
    radiant: ["arbitrum"],
    silo: ["ethereum"],
    venus: ["bnb"],
  },

  USDT: {
    aave: ["ethereum", "arbitrum"],
    compound: ["ethereum"],
    spark: ["ethereum"],
    radiant: ["arbitrum"],
    silo: ["ethereum"],
    venus: ["bnb"],
  },

  USDE: {
    aave: ["arbitrum"],
    compound: [],
    spark: [],
    radiant: ["arbitrum"],
    silo: [],
    venus: [],
  },

  CevUSD: {
    aave: [],
    compound: [],
    spark: [],
    radiant: [],
    silo: [],
    venus: [],
  },
};

/**
 * Resolve preferred network for an asset & protocol
 *
 * @param {string} protocolKey
 * @param {string} assetSymbol
 * @returns {string|null}
 */
function resolveNetwork(protocolKey, assetSymbol) {
  if (!protocolKey || !assetSymbol) {
    return null;
  }

  // 🔑 NORMALIZATION (THIS FIXES YOUR ISSUE)
  const protocol = protocolKey.toLowerCase();
  const asset = assetSymbol.toUpperCase();

  const assetEntry = ASSET_NETWORK_MAP[asset];
  if (!assetEntry) {
    return null;
  }

  const networks = assetEntry[protocol];
  if (!networks || networks.length === 0) {
    return null;
  }

  return networks[0];
}

/**
 * Get all candidate networks (fallback list)
 */
function getCandidateNetworks(protocolKey, assetSymbol) {
  if (!protocolKey || !assetSymbol) {
    return [];
  }

  const protocol = protocolKey.toLowerCase();
  const asset = assetSymbol.toUpperCase();

  const assetEntry = ASSET_NETWORK_MAP[asset];
  if (!assetEntry) {
    return [];
  }

  return assetEntry[protocol] || [];
}

module.exports = {
  resolveNetwork,
  getCandidateNetworks,
};
