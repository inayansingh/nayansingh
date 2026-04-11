import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  LayoutDashboard, FileText, Radio, Sparkles, Users,
  Swords, Wand2, Shield, MessageSquare, ArrowLeft,
  Key, Wifi, WifiOff, Menu, X, Instagram, CheckCircle2, Loader2
} from 'lucide-react';
import './CreatorOSStyles.css';

// Pages
import CommandCenter       from './components/CommandCenter.jsx';
import ContentIntelligence from './components/ContentIntelligence.jsx';
import AudienceAnalytics   from './components/AudienceAnalytics.jsx';
import SocialListening     from './components/SocialListening.jsx';
import StrategyEngine      from './components/StrategyEngine.jsx';
import CompetitorIntel     from './components/CompetitorIntel.jsx';
import ContentStudio       from './components/ContentStudio.jsx';
import BrandCommerce       from './components/BrandCommerce.jsx';
import GrowthCopilot       from './components/GrowthCopilot.jsx';
import ConnectInstagram    from './components/ConnectInstagram.jsx';

// Real data hook  ← NEW
import { useInstagramData } from './utils/useInstagramData.js';

// Static data for pages that don't change (trends, competitors, brand safety, audience)
import { TRENDS, COMPETITORS, BRAND_SAFETY, AUDIENCE } from './utils/mockData.js';

const NAV_SECTIONS = [
  {
    label: 'Overview',
    items: [
      { id: 'dashboard',  label: 'Command Center',      Icon: LayoutDashboard },
    ],
  },
  {
    label: 'Intelligence',
    items: [
      { id: 'content',    label: 'Content Intelligence', Icon: FileText        },
      { id: 'audience',   label: 'Audience Analytics',   Icon: Users           },
      { id: 'listening',  label: 'Social Listening',     Icon: Radio           },
    ],
  },
  {
    label: 'Strategy',
    items: [
      { id: 'strategy',   label: 'Strategy Engine',      Icon: Sparkles        },
      { id: 'competitor', label: 'Competitor Intel',      Icon: Swords          },
    ],
  },
  {
    label: 'Create',
    items: [
      { id: 'studio',     label: 'Content Studio',        Icon: Wand2           },
      { id: 'brand',      label: 'Brand & Commerce',      Icon: Shield          },
      { id: 'copilot',    label: 'Growth Copilot',        Icon: MessageSquare   },
    ],
  },
  {
    label: 'Account',
    items: [
      { id: 'connect',    label: 'Connect Instagram',     Icon: Instagram       },
    ],
  },
];

export default function CreatorOSApp() {
  const [view, setView]               = useState('dashboard');
  const [apiKey, setApiKey]           = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Real Instagram data hook — auto-detects OAuth callback in URL
  const igData = useInstagramData();

  const navigate = (id) => { setView(id); setSidebarOpen(false); };

  // Profile and posts from real data (or mock fallback)
  const CREATOR_PROFILE = igData.profile;
  const POSTS           = igData.posts;

  const sharedProps = {
    apiKey, navigate,
    CREATOR_PROFILE, POSTS,
    AUDIENCE, TRENDS, COMPETITORS, BRAND_SAFETY,
  };

  const PAGE_LABEL = NAV_SECTIONS
    .flatMap(s => s.items)
    .find(i => i.id === view)?.label || 'Dashboard';

  const igConnected = igData.isLive;
  const igLoading   = igData.status === 'connecting' || igData.status === 'loading';

  return (
    <div className="cos-shell">
      {/* Mobile backdrop */}
      {sidebarOpen && <div className="cos-mobile-backdrop" onClick={() => setSidebarOpen(false)} />}

      {/* ── SIDEBAR ──────────────────────────────── */}
      <aside className={`cos-sidebar ${sidebarOpen ? 'open' : ''}`}>
        {/* Logo */}
        <div className="cos-sb-logo">
          <div className="cos-logo-icon">C</div>
          <div>
            <span className="cos-logo-name">CREATOR OS</span>
            <span className="cos-logo-tag">AI Strategic Partner</span>
          </div>
        </div>

        {/* Instagram data status pill */}
        <button
          className={`cos-sb-item ${view === 'connect' ? 'active' : ''}`}
          onClick={() => navigate('connect')}
          style={{ marginBottom: '0.5rem', background: igConnected ? 'rgba(16,185,129,0.08)' : igLoading ? 'rgba(245,158,11,0.08)' : 'rgba(124,58,237,0.07)', borderRadius: 9, padding: '0.6rem 0.85rem', border: `1px solid ${igConnected ? 'rgba(16,185,129,0.2)' : igLoading ? 'rgba(245,158,11,0.2)' : 'rgba(124,58,237,0.15)'}` }}
        >
          {igLoading
            ? <Loader2 size={14} className="cos-spin-icon" style={{ color: '#F59E0B' }}/>
            : igConnected
              ? <CheckCircle2 size={14} style={{ color: '#10B981' }}/>
              : <Instagram size={14} style={{ color: 'var(--cos-violet-lt)' }}/>
          }
          <span style={{ fontSize: '0.8rem', color: igConnected ? '#10B981' : igLoading ? '#F59E0B' : 'var(--cos-text-2)', fontWeight: 500 }}>
            {igLoading ? 'Connecting...' : igConnected ? `@${CREATOR_PROFILE.handle?.replace('@','')}` : 'Connect Instagram'}
          </span>
          {igConnected && (
            <span style={{ marginLeft: 'auto', fontFamily: 'var(--cos-font-mono)', fontSize: '0.55rem', background: 'rgba(16,185,129,0.12)', color: '#10B981', padding: '0.1rem 0.4rem', borderRadius: 10, border: '1px solid rgba(16,185,129,0.2)' }}>LIVE</span>
          )}
          {!igConnected && !igLoading && (
            <span style={{ marginLeft: 'auto', fontFamily: 'var(--cos-font-mono)', fontSize: '0.55rem', background: 'rgba(124,58,237,0.1)', color: 'var(--cos-violet-lt)', padding: '0.1rem 0.4rem', borderRadius: 10, border: '1px solid rgba(124,58,237,0.15)' }}>MOCK</span>
          )}
        </button>

        {/* Nav */}
        {NAV_SECTIONS.filter(s => s.label !== 'Account').map(section => (
          <div key={section.label} className="cos-nav-section">
            <div className="cos-nav-section-label">{section.label}</div>
            {section.items.map(({ id, label, Icon }) => (
              <button
                key={id}
                className={`cos-sb-item ${view === id ? 'active' : ''}`}
                onClick={() => navigate(id)}
              >
                <Icon size={16} />
                <span>{label}</span>
              </button>
            ))}
          </div>
        ))}

        {/* Footer: API key + back */}
        <div className="cos-sb-footer">
          <div>
            <div className="cos-sb-api-label">
              <Key size={11} />
              <span>Gemini API Key</span>
              <span className={`cos-api-status ${apiKey ? 'live' : 'offline'}`}>
                {apiKey ? <><Wifi size={9} /> Live</> : <><WifiOff size={9} /> Offline</>}
              </span>
            </div>
            <input
              type="password"
              className="cos-api-input"
              placeholder="AIza..."
              value={apiKey}
              onChange={e => setApiKey(e.target.value)}
              style={{ marginTop: '0.4rem' }}
            />
          </div>
          <Link to="/apps" className="cos-sb-back">
            <ArrowLeft size={14} /> Back to Portfolio
          </Link>
        </div>
      </aside>

      {/* ── MAIN ─────────────────────────────────── */}
      <main className="cos-main">
        {/* Topbar */}
        <header className="cos-topbar">
          <div className="cos-breadcrumb">
            <button className="cos-hamburger" onClick={() => setSidebarOpen(o => !o)}>
              {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            <span className="cos-muted">CREATOR OS</span>
            <span className="cos-breadcrumb-sep">/</span>
            <span className="cos-breadcrumb-page">{PAGE_LABEL}</span>
          </div>
          <div className="cos-topbar-right">
            {/* Data source badge */}
            <span className={`cos-status-pill ${igConnected ? 'live' : ''}`}
              style={ igConnected ? { cursor: 'default' } : { cursor: 'pointer' }}
              onClick={() => !igConnected && navigate('connect')}
              title={igConnected ? 'Instagram data is live' : 'Click to connect Instagram'}
            >
              {igConnected
                ? `● LIVE · ${CREATOR_PROFILE.handle}`
                : '○ DEMO DATA · Connect →'
              }
            </span>
            <span className={`cos-status-pill ${apiKey ? 'live' : ''}`}>
              {apiKey ? '● AI ON' : '○ NO AI KEY'}
            </span>
          </div>
        </header>

        {/* Content */}
        <div className="cos-content">
          {view === 'dashboard'  && <CommandCenter       {...sharedProps} />}
          {view === 'content'    && <ContentIntelligence {...sharedProps} />}
          {view === 'audience'   && <AudienceAnalytics   {...sharedProps} />}
          {view === 'listening'  && <SocialListening     {...sharedProps} />}
          {view === 'strategy'   && <StrategyEngine      {...sharedProps} />}
          {view === 'competitor' && <CompetitorIntel     {...sharedProps} />}
          {view === 'studio'     && <ContentStudio       {...sharedProps} />}
          {view === 'brand'      && <BrandCommerce       {...sharedProps} />}
          {view === 'copilot'    && <GrowthCopilot       {...sharedProps} />}
          {view === 'connect'    && (
            <ConnectInstagram
              status={igData.status}
              error={igData.error}
              isLive={igData.isLive}
              profile={igData.profile}
              appId={igData.appId}
              token={igData.token}
              initiateOAuth={igData.initiateOAuth}
              connectWithToken={igData.connectWithToken}
              disconnect={igData.disconnect}
              refreshData={igData.refreshData}
              setAppId={igData.setAppId}
            />
          )}
        </div>
      </main>
    </div>
  );
}
