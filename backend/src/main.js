require("dotenv").config({ path: "../.env" });

const express = require("express");
const cors = require("cors");
const http = require("http");
const WebSocket = require("ws");

// Controllers
const yieldsController = require("./modules/yields/yields.controller");
const healthController = require("./modules/health/health.controller");
const protocolsController = require("./modules/protocols/protocols.controller");

// Services
const { getAllYields } = require("./modules/yields/yields.service");

const app = express();

/* -------------------- CORS -------------------- */
app.use(
  cors({
    origin: ["http://localhost:3000"],
  })
);

app.use(express.json());

/* -------------------- REST APIs -------------------- */
app.use("/api/yields", yieldsController);
app.use("/api/protocols", protocolsController);
app.use("/health", healthController);

/* -------------------- HTTP + WS -------------------- */
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

/* -------------------- WS Broadcast Helper -------------------- */
function broadcast(message) {
  const payload = JSON.stringify(message);

  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(payload);
    }
  });
}

/* -------------------- WS Connection -------------------- */
wss.on("connection", () => {
  console.log("WebSocket client connected");
});

/* -------------------- 🔥 REAL-TIME STREAM -------------------- */
/**
 * Every 1 second:
 * - fetch all protocol yields
 * - emit ONE message per protocol
 * - frontend appends points → graph grows
 */
const UPDATE_INTERVAL_MS = 1000;

setInterval(async () => {
  try {
    const protocols = await getAllYields();
    const timestamp = Date.now();

    protocols.forEach((protocol) => {
      broadcast({
        type: "yields_update",
        protocolKey: protocol.protocolKey,
        protocol: protocol.protocol,
        network: protocol.network,
        payload: protocol.assets,
        timestamp,
      });
    });
  } catch (err) {
    console.error("WebSocket stream error:", err.message);
  }
}, UPDATE_INTERVAL_MS);

/* -------------------- START SERVER -------------------- */
const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
