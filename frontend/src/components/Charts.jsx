import { useState, useEffect } from 'react';
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Legend,
  Tooltip,
  Filler
} from "chart.js";
import { Line } from "react-chartjs-2";

// Register Chart.js components
ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Legend,
  Tooltip,
  Filler
);

/**
 * Enhanced Charts component with Web3 styling
 */
function Charts({ history, assets }) {
  const [isAnimated, setIsAnimated] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsAnimated(true), 100);
  }, []);

  let labels = [];
  let datasets = [];

  /* Live WebSocket Data */
  if (history && typeof history === "object") {
    const assetKeys = Object.keys(history).filter(
      (asset) =>
        Array.isArray(history[asset]) &&
        history[asset].length > 0 &&
        history[asset].some(
          (p) => typeof p.apy === "number" && !isNaN(p.apy)
        )
    );

    if (assetKeys.length > 0) {
      labels = history[assetKeys[0]].map((p) => p.time);

      datasets = assetKeys.map((asset, index) => ({
        label: asset,
        data: history[asset].map((p) =>
          typeof p.apy === "number" ? p.apy : null
        ),
        borderColor: getGradientColor(index).primary,
        backgroundColor: (context) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 300);
          gradient.addColorStop(0, getGradientColor(index).start);
          gradient.addColorStop(1, getGradientColor(index).end);
          return gradient;
        },
        tension: 0.4,
        spanGaps: true,
        pointRadius: 4,
        pointHoverRadius: 8,
        pointBackgroundColor: getGradientColor(index).primary,
        pointBorderColor: '#0a0e27',
        pointBorderWidth: 2,
        pointHoverBackgroundColor: getGradientColor(index).glow,
        pointHoverBorderColor: getGradientColor(index).primary,
        pointHoverBorderWidth: 3,
        fill: true,
        borderWidth: 3,
      }));
    }
  }

  /* Static REST Fallback */
  if (datasets.length === 0 && Array.isArray(assets)) {
    const validAssets = assets.filter(
      (a) => a.supported && typeof a.apy === "number"
    );

    if (validAssets.length > 0) {
      labels = ["Now"];

      datasets = validAssets.map((asset, index) => ({
        label: asset.asset,
        data: [asset.apy],
        borderColor: getGradientColor(index).primary,
        backgroundColor: getGradientColor(index).primary,
        pointRadius: 8,
        pointHoverRadius: 12,
        pointBackgroundColor: getGradientColor(index).primary,
        pointBorderColor: '#0a0e27',
        pointBorderWidth: 3,
        tension: 0.3,
      }));
    }
  }

  /* No Data State */
  if (datasets.length === 0) {
    return (
      <div style={{
        marginTop: '32px',
        padding: '60px 32px',
        background: 'rgba(15, 23, 42, 0.5)',
        border: '1px solid rgba(99, 102, 241, 0.2)',
        borderRadius: '20px',
        textAlign: 'center',
        backdropFilter: 'blur(10px)',
      }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '12px',
          color: '#818cf8',
          fontSize: '15px',
          fontWeight: '500',
        }}>
          <div style={{
            width: '8px',
            height: '8px',
            background: '#818cf8',
            borderRadius: '50%',
            animation: 'pulse 2s ease-in-out infinite',
          }} />
          Waiting for live yield updates…
        </div>
      </div>
    );
  }

  /* Chart Options */
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: isAnimated ? 1500 : 0,
      easing: 'easeInOutQuart',
    },
    interaction: {
      mode: 'index',
      intersect: false,
    },
    plugins: {
      legend: {
        position: 'top',
        align: 'end',
        labels: {
          color: '#e2e8f0',
          font: {
            size: 13,
            weight: '600',
            family: "'Inter', sans-serif",
          },
          padding: 16,
          usePointStyle: true,
          pointStyle: 'circle',
          boxWidth: 8,
          boxHeight: 8,
        },
      },
      tooltip: {
        enabled: true,
        backgroundColor: 'rgba(10, 14, 39, 0.95)',
        titleColor: '#e2e8f0',
        bodyColor: '#cbd5e1',
        borderColor: 'rgba(99, 102, 241, 0.3)',
        borderWidth: 1,
        padding: 16,
        displayColors: true,
        titleFont: {
          size: 14,
          weight: '700',
          family: "'Inter', sans-serif",
        },
        bodyFont: {
          size: 13,
          weight: '500',
          family: "'Inter', sans-serif",
        },
        callbacks: {
          label: (ctx) => `${ctx.dataset.label}: ${ctx.parsed.y.toFixed(2)}%`,
        },
        cornerRadius: 12,
      },
    },
    scales: {
      x: {
        grid: {
          color: 'rgba(99, 102, 241, 0.08)',
          drawBorder: false,
        },
        ticks: {
          color: '#94a3b8',
          font: {
            size: 12,
            weight: '500',
            family: "'Inter', sans-serif",
          },
          maxRotation: 0,
          padding: 8,
        },
        border: {
          display: false,
        },
      },
      y: {
        grid: {
          color: 'rgba(99, 102, 241, 0.08)',
          drawBorder: false,
        },
        ticks: {
          color: '#94a3b8',
          font: {
            size: 12,
            weight: '600',
            family: "'Inter', sans-serif",
          },
          callback: (v) => `${v}%`,
          padding: 12,
        },
        border: {
          display: false,
        },
      },
    },
  };

  return (
    <div style={{
      marginTop: '32px',
      padding: '32px',
      background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.8) 0%, rgba(30, 27, 75, 0.6) 100%)',
      border: '1px solid rgba(99, 102, 241, 0.2)',
      borderRadius: '24px',
      backdropFilter: 'blur(20px)',
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
      position: 'relative',
      overflow: 'hidden',
      opacity: isAnimated ? 1 : 0,
      transform: isAnimated ? 'translateY(0)' : 'translateY(20px)',
      transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
    }}>
      {/* Gradient overlay effect */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'radial-gradient(circle at 20% 50%, rgba(99, 102, 241, 0.1) 0%, transparent 50%)',
        pointerEvents: 'none',
      }} />

      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '28px',
        position: 'relative',
        zIndex: 1,
      }}>
        <div>
          <h4 style={{
            margin: 0,
            fontSize: '24px',
            fontWeight: '800',
            background: 'linear-gradient(135deg, #818cf8 0%, #c084fc 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            letterSpacing: '-0.02em',
            fontFamily: "'Inter', sans-serif",
          }}>
            Real-Time APY Trends
          </h4>
          <p style={{
            margin: '6px 0 0 0',
            fontSize: '13px',
            color: '#94a3b8',
            fontWeight: '500',
          }}>
            Live yield performance across protocols
          </p>
        </div>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '8px 16px',
          background: 'rgba(34, 197, 94, 0.15)',
          border: '1px solid rgba(34, 197, 94, 0.3)',
          borderRadius: '12px',
        }}>
          <div style={{
            width: '8px',
            height: '8px',
            background: '#22c55e',
            borderRadius: '50%',
            boxShadow: '0 0 12px rgba(34, 197, 94, 0.8)',
            animation: 'pulse 2s ease-in-out infinite',
          }} />
          <span style={{
            fontSize: '12px',
            fontWeight: '700',
            color: '#22c55e',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
          }}>
            Live
          </span>
        </div>
      </div>

      <div style={{ height: '360px', position: 'relative', zIndex: 1 }}>
        <Line data={{ labels, datasets }} options={options} />
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.6;
            transform: scale(1.1);
          }
        }
      `}</style>
    </div>
  );
}

/**
 * Enhanced gradient color palette for Web3 aesthetic
 */
function getGradientColor(index) {
  const colors = [
    { 
      primary: '#22c55e', 
      start: 'rgba(34, 197, 94, 0.4)', 
      end: 'rgba(34, 197, 94, 0.01)',
      glow: '#4ade80'
    },
    { 
      primary: '#3b82f6', 
      start: 'rgba(59, 130, 246, 0.4)', 
      end: 'rgba(59, 130, 246, 0.01)',
      glow: '#60a5fa'
    },
    { 
      primary: '#a855f7', 
      start: 'rgba(168, 85, 247, 0.4)', 
      end: 'rgba(168, 85, 247, 0.01)',
      glow: '#c084fc'
    },
    { 
      primary: '#f59e0b', 
      start: 'rgba(245, 158, 11, 0.4)', 
      end: 'rgba(245, 158, 11, 0.01)',
      glow: '#fbbf24'
    },
    { 
      primary: '#ef4444', 
      start: 'rgba(239, 68, 68, 0.4)', 
      end: 'rgba(239, 68, 68, 0.01)',
      glow: '#f87171'
    },
    { 
      primary: '#14b8a6', 
      start: 'rgba(20, 184, 166, 0.4)', 
      end: 'rgba(20, 184, 166, 0.01)',
      glow: '#2dd4bf'
    },
  ];
  return colors[index % colors.length];
}

export default Charts;