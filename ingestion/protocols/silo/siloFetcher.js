import { assets } from "./assetMapper.js"

export async function fetchSiloYields(provider) {
  const res = []

  for (const asset of assets) {
    let supported = false
    let apy = null

    try {
      await provider.getBalance(asset.address)
      supported = true
      apy = 0
    } catch {
      supported = false
    }

    res.push({ asset: asset.symbol, apy, supported })
  }

  return {
    protocol: "Silo",
    network: "Ethereum",
    updatedAt: Date.now(),
    assets: res
  }
}
