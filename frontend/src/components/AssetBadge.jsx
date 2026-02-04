/**
 * Asset availability badge
 *
 * Props:
 * - supported: boolean
 * - network: string | null (ethereum | arbitrum | bnb)
 */
export default function AssetBadge({ supported, network }) {
  const baseStyle = {
    padding: "6px 12px",
    borderRadius: "8px",
    fontSize: "11px",
    fontWeight: 600,
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
    whiteSpace: "nowrap",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
    transition: "all 0.2s ease",
    border: "1px solid",
  };

  const supportedStyle = {
    background: "linear-gradient(135deg, rgba(34, 197, 94, 0.15) 0%, rgba(16, 185, 129, 0.15) 100%)",
    color: "#4ade80",
    borderColor: "rgba(34, 197, 94, 0.3)",
    boxShadow: "0 0 12px rgba(34, 197, 94, 0.15)",
  };

  const unsupportedStyle = {
    background: "rgba(71, 85, 105, 0.2)",
    color: "#94a3b8",
    borderColor: "rgba(71, 85, 105, 0.3)",
  };

  return (
    <span
      style={{
        ...baseStyle,
        ...(supported ? supportedStyle : unsupportedStyle),
      }}
    >
      {/* Status Dot */}
      {supported && (
        <span
          style={{
            width: "6px",
            height: "6px",
            borderRadius: "50%",
            background: "#4ade80",
            boxShadow: "0 0 6px rgba(34, 197, 94, 0.6)",
            animation: "pulse 2s ease-in-out infinite",
          }}
        />
      )}
      
      {supported ? "✓ Supported" : "✕ Not Available"}
      
      {supported && network && (
        <span
          style={{
            opacity: 0.7,
            fontSize: "10px",
            fontWeight: 500,
            paddingLeft: "4px",
            borderLeft: "1px solid rgba(74, 222, 128, 0.3)",
          }}
        >
          {network.toUpperCase()}
        </span>
      )}

      {/* Inline animation for pulse */}
      <style>{`
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }
      `}</style>
    </span>
  );
}