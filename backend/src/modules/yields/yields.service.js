// Import protocol fetchers
const fetchAaveYields = require("../../../../ingestion/protocols/aave/aaveFetcher");
const fetchCompoundYields = require("../../../../ingestion/protocols/compound/compoundFetcher");
const fetchRadiantYields = require("../../../../ingestion/protocols/radiant/radiantFetcher");
const fetchSiloYields = require("../../../../ingestion/protocols/silo/siloFetcher");
const fetchSparkYields = require("../../../../ingestion/protocols/spark/sparkFetcher");
const fetchVenusYields = require("../../../../ingestion/protocols/venus/venusFetcher");

/**
 * Protocol registry
 * Single source of truth for backend aggregation
 */
const PROTOCOLS = {
  aave: {
    key: "aave",
    name: "Aave",
    fetcher: fetchAaveYields,
  },
  compound: {
    key: "compound",
    name: "Compound",
    fetcher: fetchCompoundYields,
  },
  radiant: {
    key: "radiant",
    name: "Radiant",
    fetcher: fetchRadiantYields,
  },
  silo: {
    key: "silo",
    name: "Silo",
    fetcher: fetchSiloYields,
  },
  spark: {
    key: "spark",
    name: "Spark",
    fetcher: fetchSparkYields,
  },
  venus: {
    key: "venus",
    name: "Venus",
    fetcher: fetchVenusYields,
  },
};

/**
 * Fetch yields for a SINGLE protocol
 * (Backward compatible with existing frontend)
 *
 * @param {string} protocolKey
 */
async function getYields(protocolKey = "aave") {
  const protocol = PROTOCOLS[protocolKey];

  if (!protocol) {
    throw new Error(`Unsupported protocol: ${protocolKey}`);
  }

  const assets = await protocol.fetcher();

  return {
    protocol: protocol.name,
    updatedAt: Date.now(),
    assets,
  };
}

/**
 * Fetch yields for ALL protocols
 * Used for:
 * - Single-page multi-protocol view
 * - WebSocket aggregation
 */
async function getAllYields() {
  const results = [];

  for (const protocol of Object.values(PROTOCOLS)) {
    try {
      const assets = await protocol.fetcher();

      results.push({
        protocol: protocol.name,
        protocolKey: protocol.key,
        updatedAt: Date.now(),
        assets,
      });
    } catch (err) {
      console.error(
        `Yield fetch failed for ${protocol.name}:`,
        err.message
      );

      results.push({
        protocol: protocol.name,
        protocolKey: protocol.key,
        updatedAt: Date.now(),
        assets: [],
        error: "Failed to fetch protocol yields",
      });
    }
  }

  return results;
}

module.exports = {
  getYields,     // single protocol
  getAllYields, // all protocols
};
