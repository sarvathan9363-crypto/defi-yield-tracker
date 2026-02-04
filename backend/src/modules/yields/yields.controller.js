const express = require("express");
const router = express.Router();

const {
  getYields,
  getAllYields,
} = require("./yields.service");

/**
 * GET /api/yields/all
 *
 * Returns APY data for ALL protocols
 * Used for:
 * - Single-page multi-protocol view
 * - WebSocket aggregation
 */
router.get("/all", async (req, res) => {
  try {
    const data = await getAllYields();

    res.status(200).json({
      success: true,
      timestamp: Date.now(),
      data,
    });
  } catch (err) {
    console.error("Error fetching all yields:", err.message);

    res.status(500).json({
      success: false,
      error: err.message || "Failed to fetch all yields",
    });
  }
});

/**
 * GET /api/yields
 *
 * Query param (optional):
 *   ?protocol=aave | compound | radiant | silo | spark | venus
 *
 * Default:
 *   aave
 *
 * Backward compatible endpoint
 */
router.get("/", async (req, res) => {
  try {
    const protocol = (req.query.protocol || "aave").toLowerCase();

    const data = await getYields(protocol);

    res.status(200).json({
      success: true,
      timestamp: Date.now(),
      data,
    });
  } catch (err) {
    console.error("Error fetching yields:", err.message);

    res.status(500).json({
      success: false,
      error: err.message || "Failed to fetch yields",
    });
  }
});

module.exports = router;
