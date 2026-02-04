import { useEffect, useState } from "react";
import { connectWebSocket } from "../services/websocket";

/**
 * Real-time APY history for ALL protocols
 *
 * Shape:
 * {
 *   aave: {
 *     USDC: [{ time, apy }],
 *     USDT: [{ time, apy }]
 *   },
 *   compound: { ... }
 * }
 */
export function useLiveYield() {
  const [history, setHistory] = useState({});

  useEffect(() => {
    const socket = connectWebSocket((msg) => {
      // ✅ MATCH ACTUAL BACKEND MESSAGE
      if (
        !msg ||
        msg.type !== "yields_update" ||
        typeof msg.protocolKey !== "string" ||
        !Array.isArray(msg.payload) ||
        typeof msg.timestamp !== "number"
      ) {
        return;
      }

      const { protocolKey, payload } = msg;
      const time = new Date(msg.timestamp).toLocaleTimeString();

      setHistory((prev) => {
        const updated = { ...prev };

        // Ensure protocol bucket
        if (!updated[protocolKey]) {
          updated[protocolKey] = {};
        }

        payload.forEach((asset) => {
          if (!asset || !asset.supported || asset.apy == null) return;

          const assetKey = asset.asset;

          if (!updated[protocolKey][assetKey]) {
            updated[protocolKey][assetKey] = [];
          }

          // ⏱️ keep last 60 seconds
          updated[protocolKey][assetKey] = [
            ...updated[protocolKey][assetKey].slice(-59),
            {
              time,
              apy: asset.apy,
            },
          ];
        });

        return updated;
      });
    });

    return () => socket.close();
  }, []);

  return history;
}
