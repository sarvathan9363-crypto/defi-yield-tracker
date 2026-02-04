/**
 * List of supported protocols
 *
 * PURPOSE:
 * - API discovery
 * - Frontend protocol sections
 * - Validation of protocol keys
 *
 * IMPORTANT:
 * - This file exposes ONLY metadata
 * - NO on-chain logic
 * - NO APY fetching
 * - NO RPC usage
 */
function getSupportedProtocols() {
  return [
    {
      key: "aave",
      name: "Aave",
      networks: ["ethereum", "arbitrum"],
      primaryNetwork: "ethereum",
    },
    {
      key: "compound",
      name: "Compound",
      networks: ["ethereum"],
      primaryNetwork: "ethereum",
    },
    {
      key: "radiant",
      name: "Radiant",
      networks: ["arbitrum"],
      primaryNetwork: "arbitrum",
    },
    {
      key: "silo",
      name: "Silo",
      networks: ["ethereum"],
      primaryNetwork: "ethereum",
    },
    {
      key: "spark",
      name: "Spark",
      networks: ["ethereum"],
      primaryNetwork: "ethereum",
    },
    {
      key: "venus",
      name: "Venus",
      networks: ["bnb"],
      primaryNetwork: "bnb",
    },
  ];
}

module.exports = {
  getSupportedProtocols,
};
