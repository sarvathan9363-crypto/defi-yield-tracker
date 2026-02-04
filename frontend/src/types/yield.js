/**
 * ===============================
 * Yield & Protocol Type Contracts
 * ===============================
 *
 * This file defines the canonical data shapes used by:
 * - REST API responses
 * - WebSocket live updates
 * - UI tables
 * - Charts
 *
 * IMPORTANT:
 * - Backend MUST conform to these shapes
 * - Frontend MUST trust these contracts
 */

/**
 * Single asset APY snapshot
 */
export const YieldAsset = {
  asset: "",        // "USDC" | "USDT" | "USDE" | "CevUSD"
  apy: null,        // number | null
  supported: false, // boolean
  network: null,    // "ethereum" | "arbitrum" | "bnb" | null
};

/**
 * Protocol yield payload
 */
export const ProtocolYield = {
  protocol: "",      // "Aave" | "Compound" | ...
  protocolKey: "",   // "aave" | "compound" | ...
  network: "",       // Human-readable default network
  updatedAt: 0,      // unix timestamp (ms)
  assets: [],        // YieldAsset[]
};

/**
 * REST API response: /api/yields
 */
export const YieldsApiResponse = {
  success: true,
  timestamp: 0,        // unix timestamp (ms)
  data: [],            // ProtocolYield[]
};

/**
 * WebSocket yield update message
 */
export const YieldWsMessage = {
  type: "yields_update",
  protocol: "",        // "Aave"
  protocolKey: "",     // "aave"
  network: "",         // "ethereum"
  timestamp: 0,        // unix timestamp (ms)
  payload: [],         // YieldAsset[]
};

/**
 * Historical APY point (for charts)
 */
export const YieldHistoryPoint = {
  time: "",   // "12:01:05"
  apy: 0,     // number
};

/**
 * Chart history structure
 *
 * {
 *   aave: {
 *     USDC: [{ time, apy }],
 *     USDT: [{ time, apy }]
 *   },
 *   compound: {
 *     USDC: [...]
 *   }
 * }
 */
export const YieldHistoryMap = {};
