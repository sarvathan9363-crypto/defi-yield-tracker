/**
 * Supported blockchain networks configuration
 * This file is the single source of truth for:
 * - chainId
 * - RPC URLs
 * - human-readable names
 *
 * IMPORTANT:
 * - Do NOT put protocol-specific logic here
 * - Do NOT put token addresses here
 */

const NETWORKS = {
  ethereum: {
    key: "ethereum",
    name: "Ethereum",
    chainId: 1,
    rpcEnvKey: "ETHEREUM_RPC_URL",
  },

  arbitrum: {
    key: "arbitrum",
    name: "Arbitrum One",
    chainId: 42161,
    rpcEnvKey: "ARBITRUM_RPC_URL",
  },

  bnb: {
    key: "bnb",
    name: "BNB Chain",
    chainId: 56,
    rpcEnvKey: "BNB_RPC_URL",
  },
};

/**
 * Get network config by key
 * @param {string} networkKey
 */
function getNetwork(networkKey) {
  const network = NETWORKS[networkKey];

  if (!network) {
    throw new Error(`Unsupported network: ${networkKey}`);
  }

  return network;
}

/**
 * Get all supported networks
 */
function getAllNetworks() {
  return Object.values(NETWORKS);
}

module.exports = {
  NETWORKS,
  getNetwork,
  getAllNetworks,
};
