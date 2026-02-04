import { useEffect, useState } from "react";
import { fetchYields } from "../services/api";

import YieldTable from "../components/YieldTable";
import LiveIndicator from "../components/LiveIndicator";
import Charts from "../components/Charts";
import { useLiveYield } from "../hooks/useLiveYield";

/**
 * Fixed protocol render order
 */
const PROTOCOL_ORDER = [
  "aave",
  "compound",
  "radiant",
  "silo",
  "spark",
  "venus",
];

export default function Home() {
  /* ----------------------------------
     PAGE MODE
     ---------------------------------- */
  const [showDashboard, setShowDashboard] = useState(false);

  /* ----------------------------------
     DASHBOARD STATE (UNCHANGED)
     ---------------------------------- */
  const [protocols, setProtocols] = useState([]);
  const [error, setError] = useState(null);

  // 🔥 Real-time APY history (WebSocket)
  const history = useLiveYield();

  /**
   * Initial REST fetch (static snapshot)
   * Only runs AFTER dashboard is opened
   */
  useEffect(() => {
    if (!showDashboard) return;

    async function loadInitialData() {
      try {
        const data = await fetchYields();
        console.log("Fetched protocols:", data);
        setProtocols(data);
      } catch (err) {
        setError(err.message);
      }
    }

    loadInitialData();
  }, [showDashboard]);

  /* ----------------------------------
     1️⃣ HOME PAGE VIEW
     ---------------------------------- */
  if (!showDashboard) {
    return (
      <div
        style={{
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          fontFamily: "'Inter', 'SF Pro Display', -apple-system, sans-serif",
          background: "linear-gradient(135deg, #0a0e27 0%, #1a1042 50%, #0d1b2a 100%)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Animated Background Elements */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: `
              radial-gradient(circle at 20% 50%, rgba(99, 102, 241, 0.1) 0%, transparent 50%),
              radial-gradient(circle at 80% 80%, rgba(139, 92, 246, 0.1) 0%, transparent 50%),
              radial-gradient(circle at 40% 20%, rgba(14, 165, 233, 0.1) 0%, transparent 50%)
            `,
            animation: "gradientShift 15s ease infinite",
          }}
        />

        {/* Floating Particles */}
        <div
          style={{
            position: "absolute",
            top: "20%",
            left: "10%",
            width: "120px",
            height: "120px",
            background: "radial-gradient(circle, rgba(99, 102, 241, 0.2) 0%, transparent 70%)",
            borderRadius: "50%",
            filter: "blur(40px)",
            animation: "float 8s ease-in-out infinite",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "15%",
            right: "15%",
            width: "100px",
            height: "100px",
            background: "radial-gradient(circle, rgba(139, 92, 246, 0.2) 0%, transparent 70%)",
            borderRadius: "50%",
            filter: "blur(40px)",
            animation: "float 10s ease-in-out infinite reverse",
          }}
        />

        {/* Main Content */}
        <div
          style={{
            position: "relative",
            zIndex: 10,
            textAlign: "center",
            animation: "fadeInUp 1s ease-out",
          }}
        >
          {/* Logo/Icon */}
          <div
            style={{
              width: "80px",
              height: "80px",
              margin: "0 auto 24px",
              background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
              borderRadius: "20px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 8px 32px rgba(99, 102, 241, 0.4)",
              animation: "pulse 3s ease-in-out infinite",
            }}
          >
            <span style={{ fontSize: "36px" }}>📊</span>
          </div>

          <h1
            style={{
              fontSize: "56px",
              fontWeight: "800",
              background: "linear-gradient(135deg, #fff 0%, #a5b4fc 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              marginBottom: "16px",
              letterSpacing: "-0.02em",
            }}
          >
            Web3 Yield Tracker
          </h1>

          <p
            style={{
              marginBottom: "48px",
              color: "#94a3b8",
              fontSize: "18px",
              fontWeight: "400",
              maxWidth: "500px",
              lineHeight: "1.6",
            }}
          >
            Real-time APY analytics across DeFi protocols
          </p>

          {/* CTA Button */}
          <button
            onClick={() => setShowDashboard(true)}
            style={{
              padding: "16px 40px",
              fontSize: "16px",
              fontWeight: "600",
              cursor: "pointer",
              borderRadius: "12px",
              border: "1px solid rgba(99, 102, 241, 0.3)",
              background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
              color: "white",
              boxShadow: "0 4px 24px rgba(99, 102, 241, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
              transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
              position: "relative",
              overflow: "hidden",
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = "translateY(-2px) scale(1.02)";
              e.target.style.boxShadow = "0 8px 32px rgba(99, 102, 241, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.2)";
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = "translateY(0) scale(1)";
              e.target.style.boxShadow = "0 4px 24px rgba(99, 102, 241, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)";
            }}
          >
            Enter Dashboard →
          </button>

          {/* Secondary Link */}
          <div style={{ marginTop: "24px" }}>
            <a
              href="#protocols"
              style={{
                color: "#818cf8",
                fontSize: "14px",
                textDecoration: "none",
                borderBottom: "1px solid transparent",
                transition: "border-color 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.target.style.borderBottomColor = "#818cf8";
              }}
              onMouseLeave={(e) => {
                e.target.style.borderBottomColor = "transparent";
              }}
            >
              View Supported Protocols
            </a>
          </div>
        </div>

        {/* Inline Keyframes */}
        <style>{`
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes gradientShift {
            0%, 100% {
              opacity: 1;
            }
            50% {
              opacity: 0.8;
            }
          }

          @keyframes float {
            0%, 100% {
              transform: translateY(0px);
            }
            50% {
              transform: translateY(-20px);
            }
          }

          @keyframes pulse {
            0%, 100% {
              transform: scale(1);
            }
            50% {
              transform: scale(1.05);
            }
          }
        `}</style>
      </div>
    );
  }

  /* ----------------------------------
     2️⃣ DASHBOARD VIEW
     ---------------------------------- */

  if (error) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #0a0e27 0%, #1a1042 100%)",
          fontFamily: "'Inter', sans-serif",
        }}
      >
        <div
          style={{
            background: "rgba(239, 68, 68, 0.1)",
            border: "1px solid rgba(239, 68, 68, 0.3)",
            borderRadius: "12px",
            padding: "24px 32px",
            color: "#fca5a5",
            maxWidth: "500px",
          }}
        >
          <strong style={{ color: "#ef4444" }}>Error:</strong> {error}
        </div>
      </div>
    );
  }

  if (protocols.length === 0) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #0a0e27 0%, #1a1042 100%)",
          fontFamily: "'Inter', sans-serif",
          color: "#94a3b8",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <div
            style={{
              width: "48px",
              height: "48px",
              margin: "0 auto 16px",
              border: "3px solid rgba(99, 102, 241, 0.2)",
              borderTopColor: "#6366f1",
              borderRadius: "50%",
              animation: "spin 1s linear infinite",
            }}
          />
          <div>Loading yield data…</div>
        </div>

        <style>{`
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #0a0e27 0%, #1a1042 50%, #0d1b2a 100%)",
        fontFamily: "'Inter', 'SF Pro Display', -apple-system, sans-serif",
        color: "#e2e8f0",
      }}
    >
      {/* Sticky Header */}
      <div
        style={{
          position: "sticky",
          top: 0,
          zIndex: 100,
          background: "rgba(10, 14, 39, 0.8)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid rgba(99, 102, 241, 0.2)",
          padding: "20px 0",
          boxShadow: "0 4px 24px rgba(0, 0, 0, 0.2)",
        }}
      >
        <div style={{ maxWidth: "100%", padding: "0 32px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <h2
            style={{
              fontSize: "24px",
              fontWeight: "700",
              background: "linear-gradient(135deg, #fff 0%, #a5b4fc 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              margin: 0,
            }}
          >
            Web3 Yield Tracker
          </h2>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <LiveIndicator />
            <span style={{ color: "#94a3b8", fontSize: "14px" }}>Live Data</span>
          </div>
        </div>
      </div>

      {/* Protocol Cards - FULL WIDTH */}
      <div style={{ maxWidth: "100%", padding: "32px" }}>
        {PROTOCOL_ORDER.map((protocolKey, index) => {
          const protocolData = protocols.find((p) => {
            const key =
              p.protocolKey ||
              (p.protocol ? p.protocol.toLowerCase() : null);

            return key === protocolKey;
          });

          if (!protocolData) return null;

          return (
            <div
              key={protocolKey}
              style={{
                marginBottom: "32px",
                background: "rgba(15, 23, 42, 0.6)",
                backdropFilter: "blur(12px)",
                border: "1px solid rgba(99, 102, 241, 0.2)",
                borderRadius: "16px",
                padding: "32px",
                boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
                animation: `fadeInUp 0.6s ease-out ${index * 0.1}s backwards`,
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(99, 102, 241, 0.4)";
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 12px 40px rgba(0, 0, 0, 0.4)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(99, 102, 241, 0.2)";
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 8px 32px rgba(0, 0, 0, 0.3)";
              }}
            >
              {/* Protocol Header */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "24px" }}>
                <div>
                  <h3
                    style={{
                      fontSize: "28px",
                      fontWeight: "700",
                      color: "#fff",
                      margin: "0 0 8px 0",
                      letterSpacing: "-0.01em",
                    }}
                  >
                    {protocolData.protocol}
                  </h3>
                  <div style={{ display: "flex", alignItems: "center", gap: "16px", flexWrap: "wrap" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <span
                        style={{
                          color: "#94a3b8",
                          fontSize: "14px",
                          fontWeight: "500",
                        }}
                      >
                        Network:
                      </span>
                      <span
                        style={{
                          background: "rgba(99, 102, 241, 0.2)",
                          color: "#818cf8",
                          padding: "4px 12px",
                          borderRadius: "6px",
                          fontSize: "13px",
                          fontWeight: "600",
                          border: "1px solid rgba(99, 102, 241, 0.3)",
                        }}
                      >
                        {protocolData.network}
                      </span>
                    </div>
                    <LiveIndicator />
                  </div>
                </div>

                {protocolData.updatedAt && (
                  <div
                    style={{
                      color: "#64748b",
                      fontSize: "13px",
                      textAlign: "right",
                    }}
                  >
                    <div style={{ color: "#94a3b8", marginBottom: "4px" }}>Last update</div>
                    <div style={{ fontWeight: "600", color: "#cbd5e1" }}>
                      {new Date(protocolData.updatedAt).toLocaleTimeString()}
                    </div>
                  </div>
                )}
              </div>

              {/* 📊 TABLE - FULL WIDTH */}
              <YieldTable assets={protocolData.assets} />

              {/* 📈 REAL-TIME GRAPH - FULL WIDTH */}
              <Charts
                history={history[protocolKey]}
                assets={protocolData.assets}
              />
            </div>
          );
        })}
      </div>

      {/* Keyframes */}
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}