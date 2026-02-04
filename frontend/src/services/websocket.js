/**
 * Connect to backend WebSocket
 * Receives live yield updates (1 message = 1 protocol)
 *
 * Backend emits:
 * {
 *   type: "yields_update",
 *   protocolKey: string,
 *   protocol: string,
 *   network: string,
 *   payload: Array,
 *   timestamp: number
 * }
 */
export function connectWebSocket(onMessage) {
  const socket = new WebSocket("ws://localhost:4000");

  socket.onopen = () => {
    console.log("WebSocket connected (live yields)");
  };

  socket.onmessage = (event) => {
    try {
      const message = JSON.parse(event.data);

      // ✅ STRICT validation matching BACKEND
      if (
        !message ||
        message.type !== "yields_update" ||
        typeof message.protocolKey !== "string" ||
        !Array.isArray(message.payload) ||
        typeof message.timestamp !== "number"
      ) {
        return;
      }

      if (typeof onMessage !== "function") return;

      // ✅ Forward EXACT backend payload
      onMessage(message);
    } catch (err) {
      console.error("WebSocket message parse error:", err);
    }
  };

  socket.onerror = (err) => {
    console.error("WebSocket error:", err);
  };

  socket.onclose = () => {
    console.warn("WebSocket disconnected");
  };

  return socket;
}
