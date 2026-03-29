import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { TrendingUp, FileText, Calculator, ArrowLeft, AlertCircle } from 'lucide-react';
import './VantageStyles.css';
import OnboardingForm from './components/OnboardingForm.jsx';
import DealDashboard from './components/DealDashboard.jsx';
import ContractScanner from './components/ContractScanner.jsx';
import NegotiationCalc from './components/NegotiationCalc.jsx';
import { analyzeDeal } from './vantageAgent.js';

const TABS = [
  { id: 'deal',     label: 'Deal Analyzer',      Icon: TrendingUp },
  { id: 'contract', label: 'Contract Scanner',    Icon: FileText   },
  { id: 'rate',     label: 'Rate Calculator',     Icon: Calculator },
];

// One EKG cycle = 300px wide, baseline at y=60
// Two rows stacked vertically offset for depth
const EKG_CYCLE = `
  L 20,60 L 35,55 L 48,46 L 60,55 L 72,60
  L 84,60 L 90,65 L 97,4 L 103,72 L 109,60
  L 122,60 L 132,50 L 145,42 L 158,50 L 175,60
  L 300,60
`.trim();

function buildEkgPath(cycles, yOffset) {
  let d = `M 0,${yOffset + 60}`;
  for (let i = 0; i < cycles; i++) {
    // translate each cycle by 300px
    const shifted = EKG_CYCLE.replace(/L (\d+\.?\d*),/g, (_, x) =>
      `L ${parseFloat(x) + i * 300},`
    );
    // also fix the start M for cycle > 0
    d += ' ' + shifted.replace(/L (\d+\.?\d*),(\d+\.?\d*)/,
      (m, x, y) => `L ${parseFloat(x)},${parseFloat(y) + yOffset}`
    );
  }
  return d;
}

function EkgBackground() {
  const cycles = 14; // enough to fill wide screens
  const width  = cycles * 300;

  // Build two separate waveform paths at different vertical positions
  const makeD = (yBase) => {
    let d = `M 0,${yBase}`;
    for (let i = 0; i < cycles; i++) {
      const ox = i * 300;
      d += ` L ${ox + 20},${yBase}`;
      d += ` L ${ox + 35},${yBase - 5}`;
      d += ` L ${ox + 48},${yBase - 14}`;
      d += ` L ${ox + 60},${yBase - 5}`;
      d += ` L ${ox + 72},${yBase}`;
      d += ` L ${ox + 84},${yBase}`;
      d += ` L ${ox + 90},${yBase + 5}`;
      d += ` L ${ox + 97},${yBase - 56}`;
      d += ` L ${ox + 103},${yBase + 12}`;
      d += ` L ${ox + 109},${yBase}`;
      d += ` L ${ox + 122},${yBase}`;
      d += ` L ${ox + 132},${yBase - 10}`;
      d += ` L ${ox + 145},${yBase - 18}`;
      d += ` L ${ox + 158},${yBase - 10}`;
      d += ` L ${ox + 175},${yBase}`;
      d += ` L ${ox + 300},${yBase}`;
    }
    return d;
  };

  return (
    <div className="v-ekg-bg" aria-hidden="true">
      <svg
        className="v-ekg-svg"
        viewBox={`0 0 ${width} 300`}
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Glowing filter */}
          <filter id="ekg-glow" x="-20%" y="-60%" width="140%" height="220%">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          {/* Vertical fade mask — brighter in middle, fades at edges */}
          <linearGradient id="ekg-fade-x" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%"    stopColor="white" stopOpacity="0" />
            <stop offset="8%"    stopColor="white" stopOpacity="1" />
            <stop offset="92%"   stopColor="white" stopOpacity="1" />
            <stop offset="100%"  stopColor="white" stopOpacity="0" />
          </linearGradient>
          <mask id="ekg-mask">
            <rect width={width} height="300" fill="url(#ekg-fade-x)" />
          </mask>
        </defs>

        <g mask="url(#ekg-mask)">
          {/* Primary row — brighter */}
          <path
            d={makeD(100)}
            fill="none"
            stroke="#10B981"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.18"
            filter="url(#ekg-glow)"
          />
          {/* Secondary row — dimmer, offset */}
          <path
            d={makeD(210)}
            fill="none"
            stroke="#6366F1"
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.09"
          />
        </g>
      </svg>
      {/* Edge fade overlays */}
      <div className="v-ekg-fade-left" />
      <div className="v-ekg-fade-right" />
    </div>
  );
}

export default function VantageApp() {
  const [tab, setTab]       = useState('deal');

  useEffect(() => {
    const prev = document.title;
    document.title = 'Vantage — AI Brand Deal Manager';
    return () => { document.title = prev; };
  }, []);

  const [apiKey, setApiKey] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError]   = useState(null);
  const [result, setResult] = useState(null);
  const [metrics, setMetrics] = useState(null);

  const handleAnalyze = async (m, brief) => {
    if (!apiKey) { setError('Enter your Gemini API Key in the header before running analysis.'); return; }
    setLoading(true); setError(null); setResult(null); setMetrics(m);
    try {
      const r = await analyzeDeal(m, brief, apiKey);
      setResult(r);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="vantage-shell">
      <EkgBackground />

      {/* ---- Fixed Header ---- */}
      <header className="vantage-header">
        <Link to="/apps" className="vantage-logo">
          <div className="v-logo-icon">V</div>
          <div>
            <span className="v-logo-name">VANTAGE</span>
            <span className="v-logo-tag">AI BRAND DEAL MANAGER</span>
          </div>
        </Link>

        <div className="v-header-right">
          <div className="v-api-status">
            <span className={`v-api-dot ${apiKey ? 'connected' : ''}`} />
            {apiKey ? 'AI Connected' : 'No API Key'}
          </div>
          <input
            type="password"
            className="v-api-input"
            placeholder="Gemini API Key..."
            value={apiKey}
            onChange={e => setApiKey(e.target.value)}
          />
          <Link to="/apps" className="v-back-link">
            <ArrowLeft size={14} /> Back
          </Link>
        </div>
      </header>

      {/* ---- Main Content ---- */}
      <div className="vantage-content">

        {/* Hero Section */}
        <div className="v-hero">
          <div className="v-hero-badge">
            <span className="v-badge-dot" />
            POWERED BY GEMINI 2.0 FLASH
          </div>
          <h1 className="v-hero-title">
            Your AI-Powered<br />
            <span className="v-gradient-text">Brand Deal Strategist</span>
          </h1>
          <p className="v-hero-sub">
            Analyze brand-audience fit with a proprietary Fit Score Engine, scan contracts for predatory clauses, and calculate your true market rate — all in one ruthlessly data-driven platform.
          </p>
          <div className="v-hero-stats">
            <div className="v-stat">
              <span className="v-stat-num" style={{ color: 'var(--v-indigo-lt)' }}>3</span>
              <span className="v-stat-label">AI Modules</span>
            </div>
            <div className="v-stat">
              <span className="v-stat-num" style={{ color: 'var(--v-emerald)' }}>9+</span>
              <span className="v-stat-label">Red-Flag Patterns</span>
            </div>
            <div className="v-stat">
              <span className="v-stat-num" style={{ color: 'var(--v-amber)' }}>5</span>
              <span className="v-stat-label">Platforms Supported</span>
            </div>
            <div className="v-stat">
              <span className="v-stat-num">0ms</span>
              <span className="v-stat-label">Offline Quick Scan</span>
            </div>
          </div>
        </div>

        {/* Error Banner */}
        {error && (
          <div className="v-error">
            <AlertCircle size={16} /> {error}
          </div>
        )}

        {/* Tabs */}
        <div className="v-tabs">
          {TABS.map(({ id, label, Icon }) => (
            <button
              key={id}
              className={`v-tab ${tab === id ? 'active' : ''}`}
              onClick={() => { setTab(id); setError(null); }}
            >
              <Icon size={15} />
              {label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {tab === 'deal' && (
          <>
            <OnboardingForm onSubmit={handleAnalyze} />
            {loading && (
              <div className="v-loading">
                <div className="v-pulse" />
                <span className="v-loading-text">VANTAGE is analyzing this deal...</span>
              </div>
            )}
            {result && !loading && (
              <div style={{ marginTop: '2rem' }}>
                <DealDashboard analysisResult={result} influencerMetrics={metrics} />
              </div>
            )}
          </>
        )}

        {tab === 'contract' && <ContractScanner apiKey={apiKey} />}

        {tab === 'rate' && <NegotiationCalc prefillMetrics={metrics} />}
      </div>
    </div>
  );
}
