const express = require("express");
const router = express.Router();

const { getSupportedProtocols } = require("./protocols.service");

/**
 * GET /api/protocols
 *
 * Returns supported protocol metadata
 * Used by:
 * - Frontend protocol listing
 * - Validation
 * - API discovery
 */
router.get("/", (req, res) => {
  try {
    const protocols = getSupportedProtocols();

    res.status(200).json({
      success: true,
      timestamp: Date.now(),
      count: protocols.length,
      data: protocols,
    });
  } catch (err) {
    console.error("Error fetching protocols:", err.message);

    res.status(500).json({
      success: false,
      error: err.message || "Failed to fetch protocols",
    });
  }
});

module.exports = router;
