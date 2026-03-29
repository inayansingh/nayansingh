import React, { useState } from 'react';
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

export default function VantageApp() {
  const [tab, setTab]       = useState('deal');
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
      <div className="vantage-grid-bg" />

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
