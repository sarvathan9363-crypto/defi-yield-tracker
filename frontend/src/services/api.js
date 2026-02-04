/**
 * Fetch yield data from backend
 * Returns yield data for ALL protocols
 *
 * Expected backend response:
 * {
 *   success: true,
 *   timestamp: number,
 *   data: [
 *     {
 *       protocol: string,
 *       protocolKey: string,
 *       network: string,
 *       updatedAt: number,
 *       assets: Array
 *     }
 *   ]
 * }
 */
export async function fetchYields() {
  // ✅ IMPORTANT: this is the ONLY route that returns all protocols
  const API_URL = "http://localhost:4000/api/yields/all";

  try {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const json = await response.json();

    // strict validation (no guessing)
    if (
      !json ||
      json.success !== true ||
      !Array.isArray(json.data)
    ) {
      console.error("Invalid API payload:", json);
      throw new Error("Invalid API response structure");
    }

    // ✅ return protocols array directly
    return json.data;
  } catch (error) {
    console.error("fetchYields failed:", error.message);
    throw error;
  }
}
