import AssetBadge from "./AssetBadge";
import { formatApy } from "../utils/format";

/**
 * YieldTable - Enhanced Web3 Version
 *
 * Displays APY data for a single protocol
 * Assets are dynamic and protocol-agnostic
 */
export default function YieldTable({ assets }) {
  // Safety guard
  if (!Array.isArray(assets) || assets.length === 0) {
    return (
      <div style={{
        padding: '48px 24px',
        textAlign: 'center',
        background: 'rgba(15, 23, 42, 0.4)',
        border: '1px solid rgba(148, 163, 184, 0.2)',
        borderRadius: '16px',
        backdropFilter: 'blur(10px)',
        margin: '0',
      }}>
        <p style={{
          margin: 0,
          color: '#64748b',
          fontSize: '14px',
          fontWeight: '500',
          fontFamily: "'Inter', sans-serif",
        }}>
          No yield data available
        </p>
      </div>
    );
  }

  return (
    <div style={{
      margin: '0',
      background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.6) 0%, rgba(30, 27, 75, 0.4) 100%)',
      border: '1px solid rgba(99, 102, 241, 0.2)',
      borderRadius: '20px',
      overflow: 'hidden',
      backdropFilter: 'blur(20px)',
      boxShadow: '0 4px 24px rgba(0, 0, 0, 0.3)',
    }}>
      <div style={{
        overflowX: 'auto',
      }}>
        <table style={{
          width: '100%',
          borderCollapse: 'separate',
          borderSpacing: 0,
          fontFamily: "'Inter', sans-serif",
        }}>
          <thead>
            <tr style={{
              background: 'linear-gradient(90deg, rgba(99, 102, 241, 0.15) 0%, rgba(168, 85, 247, 0.15) 100%)',
              borderBottom: '1px solid rgba(99, 102, 241, 0.2)',
            }}>
              <th style={{
                padding: '18px 24px',
                textAlign: 'left',
                fontSize: '12px',
                fontWeight: '700',
                color: '#94a3b8',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                width: '25%',
              }}>
                Asset
              </th>
              <th style={{
                padding: '18px 24px',
                textAlign: 'left',
                fontSize: '12px',
                fontWeight: '700',
                color: '#94a3b8',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                width: '25%',
              }}>
                APY
              </th>
              <th style={{
                padding: '18px 24px',
                textAlign: 'left',
                fontSize: '12px',
                fontWeight: '700',
                color: '#94a3b8',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                width: '25%',
              }}>
                Network
              </th>
              <th style={{
                padding: '18px 24px',
                textAlign: 'center',
                fontSize: '12px',
                fontWeight: '700',
                color: '#94a3b8',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                width: '25%',
              }}>
                Status
              </th>
            </tr>
          </thead>

          <tbody>
            {assets.map((item, index) => {
              const isSupported = item.supported === true;
              const hasApy = typeof item.apy === "number";

              return (
                <tr
                  key={item.asset}
                  style={{
                    borderBottom: index < assets.length - 1 ? '1px solid rgba(51, 65, 85, 0.3)' : 'none',
                    transition: 'all 0.2s ease',
                    cursor: 'default',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(99, 102, 241, 0.08)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'transparent';
                  }}
                >
                  {/* Asset */}
                  <td style={{
                    padding: '20px 24px',
                  }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                    }}>
                      <div style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: '10px',
                        background: `linear-gradient(135deg, ${getAssetColor(item.asset).from} 0%, ${getAssetColor(item.asset).to} 100%)`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '14px',
                        fontWeight: '700',
                        color: '#fff',
                        boxShadow: `0 4px 12px ${getAssetColor(item.asset).shadow}`,
                      }}>
                        {item.asset.slice(0, 2)}
                      </div>
                      <span style={{
                        fontSize: '15px',
                        fontWeight: '600',
                        color: '#e2e8f0',
                      }}>
                        {item.asset}
                      </span>
                    </div>
                  </td>

                  {/* APY */}
                  <td style={{
                    padding: '20px 24px',
                  }}>
                    {isSupported && hasApy ? (
                      <div style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                      }}>
                        <span style={{
                          fontSize: '18px',
                          fontWeight: '700',
                          background: 'linear-gradient(135deg, #22c55e 0%, #10b981 100%)',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                        }}>
                          {formatApy(item.apy).replace('%', '')}
                        </span>
                        <span style={{
                          fontSize: '11px',
                          fontWeight: '600',
                          color: '#64748b',
                          marginLeft: '2px',
                        }}>
                          %
                        </span>
                      </div>
                    ) : (
                      <span style={{
                        fontSize: '15px',
                        color: '#475569',
                        fontWeight: '500',
                      }}>
                        —
                      </span>
                    )}
                  </td>

                  {/* Network */}
                  <td style={{
                    padding: '20px 24px',
                  }}>
                    {item.network ? (
                      <div style={{
                        display: 'inline-block',
                        padding: '6px 12px',
                        background: 'rgba(59, 130, 246, 0.15)',
                        border: '1px solid rgba(59, 130, 246, 0.3)',
                        borderRadius: '8px',
                        fontSize: '12px',
                        fontWeight: '600',
                        color: '#60a5fa',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                      }}>
                        {item.network}
                      </div>
                    ) : (
                      <span style={{
                        fontSize: '15px',
                        color: '#475569',
                        fontWeight: '500',
                      }}>
                        —
                      </span>
                    )}
                  </td>

                  {/* Status */}
                  <td style={{
                    padding: '20px 24px',
                    textAlign: 'center',
                  }}>
                    <AssetBadge supported={isSupported} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/**
 * Get color scheme for asset icons
 */
function getAssetColor(asset) {
  const colors = {
    'USDC': { from: '#2775ca', to: '#1e5a9c', shadow: 'rgba(39, 117, 202, 0.4)' },
    'USDT': { from: '#26a17b', to: '#1e7a5c', shadow: 'rgba(38, 161, 123, 0.4)' },
    'DAI': { from: '#f4b731', to: '#c99326', shadow: 'rgba(244, 183, 49, 0.4)' },
    'ETH': { from: '#627eea', to: '#4a5fb8', shadow: 'rgba(98, 126, 234, 0.4)' },
    'WBTC': { from: '#f09242', to: '#c9742f', shadow: 'rgba(240, 146, 66, 0.4)' },
    'WETH': { from: '#627eea', to: '#4a5fb8', shadow: 'rgba(98, 126, 234, 0.4)' },
    'USDE': { from: '#8b5cf6', to: '#6d28d9', shadow: 'rgba(139, 92, 246, 0.4)' },
    'CrvUSD': { from: '#ef4444', to: '#dc2626', shadow: 'rgba(239, 68, 68, 0.4)' },
  };
  return colors[asset] || { from: '#6366f1', to: '#4f46e5', shadow: 'rgba(99, 102, 241, 0.4)' };
}