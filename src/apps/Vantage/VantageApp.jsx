import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  LayoutDashboard, TrendingUp, FileText, Calculator, Mail,
  ArrowLeft, AlertCircle, Key, Wifi, WifiOff, Menu, X
} from 'lucide-react';
import './VantageStyles.css';
import MatrixCanvas        from './components/MatrixCanvas.jsx';
import VantageDashboard    from './components/VantageDashboard.jsx';
import OnboardingForm      from './components/OnboardingForm.jsx';
import DealDashboard       from './components/DealDashboard.jsx';
import ContractScanner     from './components/ContractScanner.jsx';
import NegotiationCalc     from './components/NegotiationCalc.jsx';
import EmailGenerator      from './components/EmailGenerator.jsx';
import { analyzeDeal }     from './vantageAgent.js';
import { calculateNegotiationFloor } from './utils/rateCalculator.js';
import { useDeals }        from './utils/useDeals.js';

const NAV = [
  { id: 'dashboard', label: 'Dashboard',         Icon: LayoutDashboard },
  { id: 'deal',      label: 'Deal Analyzer',     Icon: TrendingUp      },
  { id: 'contract',  label: 'Contract Scanner',  Icon: FileText        },
  { id: 'rate',      label: 'Rate Calculator',   Icon: Calculator      },
  { id: 'email',     label: 'Email Generator',   Icon: Mail            },
];

export default function VantageApp() {
  const [view, setView]         = useState('dashboard');
  const [apiKey, setApiKey]     = useState('');
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState(null);
  const [result, setResult]     = useState(null);
  const [metrics, setMetrics]   = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false); // mobile toggle

  const { deals, addDeal, clearAll } = useDeals();

  useEffect(() => {
    const prev = document.title;
    document.title = 'Vantage — AI Brand Deal Manager';
    return () => { document.title = prev; };
  }, []);

  const navigate = (id) => { setView(id); setError(null); setSidebarOpen(false); };

  const handleAnalyze = async (m, brief) => {
    if (!apiKey) { setError('Enter your Gemini API Key in the sidebar to run AI analysis.'); return; }
    setLoading(true); setError(null); setResult(null); setMetrics(m);
    try {
      const [analysisResult, rateResult] = await Promise.all([
        analyzeDeal(m, brief, apiKey),
        Promise.resolve(calculateNegotiationFloor({
          platform: m.platform,
          niche: m.niche,
          followers: m.followers,
          engagementRate: m.engagementRate,
          contentType: 'reel',
          usageRightsMonths: 3,
        })),
      ]);
      setResult(analysisResult);
      addDeal(m, brief, analysisResult, rateResult);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  const Sidebar = () => (
    <aside className={`v-sidebar ${sidebarOpen ? 'mobile-open' : ''}`}>
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

      {/* API Key */}
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

      <Link to="/apps" className="v-sb-back">
        <ArrowLeft size={14} /> Back to Portfolio
      </Link>
    </aside>
  );

  return (
    <div className="vantage-shell">
      <MatrixCanvas />
      <div className="v-matrix-overlay" />

      {/* Mobile overlay backdrop */}
      {sidebarOpen && (
        <div className="v-sidebar-backdrop" onClick={() => setSidebarOpen(false)} />
      )}

      <Sidebar />

      {/* MAIN */}
      <main className="v-main">
        {/* Top bar */}
        <header className="v-topbar">
          <div className="v-topbar-breadcrumb">
            {/* Hamburger — mobile only */}
            <button className="v-hamburger" onClick={() => setSidebarOpen(o => !o)}>
              {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            <span className="v-muted" style={{ fontFamily: 'var(--v-font-mono)', fontSize: '0.72rem' }}>VANTAGE /</span>
            <span style={{ fontFamily: 'var(--v-font-mono)', fontSize: '0.72rem', color: 'var(--v-text-2)' }}>
              {NAV.find(n => n.id === view)?.label}
            </span>
          </div>
          <div className="v-topbar-right">
            <span className={`v-api-pill ${apiKey ? 'connected' : ''}`}>
              {apiKey ? '● AI CONNECTED' : '○ NO API KEY'}
            </span>
          </div>
        </header>

        {error && (
          <div className="v-error" style={{ margin: '1rem 2rem 0' }}>
            <AlertCircle size={15} /> {error}
          </div>
        )}

        <div className="v-main-content">
          {view === 'dashboard' && (
            <VantageDashboard
              onNavigate={navigate}
              deals={deals}
              onClearAll={clearAll}
            />
          )}

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
          {view === 'email'    && <EmailGenerator deals={deals} apiKey={apiKey} />}
        </div>
      </main>
    </div>
  );
}
