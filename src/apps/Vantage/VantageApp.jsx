import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  LayoutDashboard, TrendingUp, FileText, Calculator,
  ArrowLeft, AlertCircle, Key, Wifi, WifiOff
} from 'lucide-react';
import './VantageStyles.css';
import MatrixCanvas        from './components/MatrixCanvas.jsx';
import VantageDashboard    from './components/VantageDashboard.jsx';
import OnboardingForm      from './components/OnboardingForm.jsx';
import DealDashboard       from './components/DealDashboard.jsx';
import ContractScanner     from './components/ContractScanner.jsx';
import NegotiationCalc     from './components/NegotiationCalc.jsx';
import { analyzeDeal }     from './vantageAgent.js';

const NAV = [
  { id: 'dashboard', label: 'Dashboard',       Icon: LayoutDashboard },
  { id: 'deal',      label: 'Deal Analyzer',   Icon: TrendingUp      },
  { id: 'contract',  label: 'Contract Scanner',Icon: FileText        },
  { id: 'rate',      label: 'Rate Calculator', Icon: Calculator      },
];

export default function VantageApp() {
  const [view, setView]     = useState('dashboard');
  const [apiKey, setApiKey] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError]   = useState(null);
  const [result, setResult] = useState(null);
  const [metrics, setMetrics] = useState(null);

  useEffect(() => {
    const prev = document.title;
    document.title = 'Vantage — AI Brand Deal Manager';
    return () => { document.title = prev; };
  }, []);

  const navigate = (id) => { setView(id); setError(null); };

  const handleAnalyze = async (m, brief) => {
    if (!apiKey) { setError('Enter your Gemini API Key in the sidebar to run AI analysis.'); return; }
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
      {/* Matrix Rain */}
      <MatrixCanvas />

      {/* Dark overlay to keep UI readable */}
      <div className="v-matrix-overlay" />

      {/* ================================================
          SIDEBAR
          ================================================ */}
      <aside className="v-sidebar">
        {/* Logo */}
        <div className="v-sb-logo">
          <div className="v-logo-icon">V</div>
          <div>
            <span className="v-logo-name">VANTAGE</span>
            <span className="v-logo-tag">AI DEAL MANAGER</span>
          </div>
        </div>

        {/* Nav */}
        <nav className="v-sb-nav">
          {NAV.map(({ id, label, Icon }) => (
            <button
              key={id}
              className={`v-sb-item ${view === id ? 'active' : ''}`}
              onClick={() => navigate(id)}
            >
              <Icon size={17} />
              <span>{label}</span>
            </button>
          ))}
        </nav>

        {/* API Key Input */}
        <div className="v-sb-api">
          <div className="v-sb-api-label">
            <Key size={12} />
            <span>Gemini API Key</span>
            {apiKey
              ? <span className="v-connected-dot"><Wifi size={10} /> Live</span>
              : <span className="v-offline-dot"><WifiOff size={10} /> Offline</span>
            }
          </div>
          <input
            type="password"
            className="v-api-input"
            style={{ width: '100%' }}
            placeholder="AIza..."
            value={apiKey}
            onChange={e => setApiKey(e.target.value)}
          />
        </div>

        {/* Back link */}
        <Link to="/apps" className="v-sb-back">
          <ArrowLeft size={14} /> Back to Portfolio
        </Link>
      </aside>

      {/* ================================================
          MAIN CONTENT
          ================================================ */}
      <main className="v-main">
        {/* Top bar */}
        <header className="v-topbar">
          <div className="v-topbar-breadcrumb">
            <span className="v-muted" style={{ fontFamily: 'var(--v-font-mono)', fontSize: '0.72rem' }}>
              VANTAGE /
            </span>
            <span style={{ fontFamily: 'var(--v-font-mono)', fontSize: '0.72rem', color: 'var(--v-text-2)' }}>
              {NAV.find(n => n.id === view)?.label || 'Dashboard'}
            </span>
          </div>
          <div className="v-topbar-right">
            <span className={`v-api-pill ${apiKey ? 'connected' : ''}`}>
              {apiKey ? '● AI CONNECTED' : '○ NO API KEY'}
            </span>
          </div>
        </header>

        {/* Error */}
        {error && (
          <div className="v-error" style={{ margin: '1rem 2rem 0' }}>
            <AlertCircle size={15} /> {error}
          </div>
        )}

        {/* View Content */}
        <div className="v-main-content">
          {view === 'dashboard' && <VantageDashboard onNavigate={navigate} />}

          {view === 'deal' && (
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

          {view === 'contract' && <ContractScanner apiKey={apiKey} />}
          {view === 'rate'     && <NegotiationCalc prefillMetrics={metrics} />}
        </div>
      </main>
    </div>
  );
}
