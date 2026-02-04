/**
 * RPC Provider Factory
 *
 * IMPORTANT:
 * - Ingestion runs from project root
 * - .env is located in /backend/.env
 * - We MUST explicitly load it here
 */

require("dotenv").config({ path: "./backend/.env" });

const { ethers } = require("ethers");
const { NETWORKS } = require("./networks");

/**
 * Cache providers so we don't recreate them
 */
const providers = {};

/**
 * Get JsonRpcProvider for a given network
 * @param {string} networkKey - ethereum | arbitrum | bnb
 */
function getProvider(networkKey) {
  if (!NETWORKS[networkKey]) {
    throw new Error(`Unsupported network: ${networkKey}`);
  }

  // Return cached provider if exists
  if (providers[networkKey]) {
    return providers[networkKey];
  }

  const rpcEnvKey = NETWORKS[networkKey].rpcEnvKey;
  const rpcUrl = process.env[rpcEnvKey];

  if (!rpcUrl) {
    throw new Error(
      `RPC URL not found for network ${networkKey}. Missing env: ${rpcEnvKey}`
    );
  }

  const provider = new ethers.JsonRpcProvider(rpcUrl);

  providers[networkKey] = provider;
  return provider;
}

/**
 * Get all initialized providers (optional utility)
 */
function getAllProviders() {
  const result = {};

  for (const key of Object.keys(NETWORKS)) {
    try {
      result[key] = getProvider(key);
    } catch (_) {
      // ignore missing RPCs
    }
  }

  return result;
}

module.exports = {
  getProvider,
  getAllProviders,
};
