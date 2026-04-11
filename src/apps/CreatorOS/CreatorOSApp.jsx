import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  LayoutDashboard, FileText, Radio, Sparkles, Users,
  Swords, Wand2, Shield, MessageSquare, ArrowLeft,
  Key, Wifi, WifiOff, Menu, X
} from 'lucide-react';
import './CreatorOSStyles.css';

// Pages (lazy imports)
import CommandCenter      from './components/CommandCenter.jsx';
import ContentIntelligence from './components/ContentIntelligence.jsx';
import AudienceAnalytics  from './components/AudienceAnalytics.jsx';
import SocialListening    from './components/SocialListening.jsx';
import StrategyEngine     from './components/StrategyEngine.jsx';
import CompetitorIntel    from './components/CompetitorIntel.jsx';
import ContentStudio      from './components/ContentStudio.jsx';
import BrandCommerce      from './components/BrandCommerce.jsx';
import GrowthCopilot      from './components/GrowthCopilot.jsx';

// Data
import { CREATOR_PROFILE, POSTS, AUDIENCE, TRENDS, COMPETITORS, BRAND_SAFETY } from './utils/mockData.js';

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
      { id: 'competitor', label: 'Competitor Intel',     Icon: Swords          },
    ],
  },
  {
    label: 'Create',
    items: [
      { id: 'studio',     label: 'Content Studio',       Icon: Wand2           },
      { id: 'brand',      label: 'Brand & Commerce',     Icon: Shield          },
      { id: 'copilot',    label: 'Growth Copilot',       Icon: MessageSquare   },
    ],
  },
];

export default function CreatorOSApp() {
  const [view, setView]           = useState('dashboard');
  const [apiKey, setApiKey]       = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navigate = (id) => { setView(id); setSidebarOpen(false); };

  const sharedProps = { apiKey, CREATOR_PROFILE, POSTS, AUDIENCE, TRENDS, COMPETITORS, BRAND_SAFETY, navigate };

  const PAGE_LABEL = NAV_SECTIONS
    .flatMap(s => s.items)
    .find(i => i.id === view)?.label || 'Dashboard';

  return (
    <div className="cos-shell">
      {/* Mobile backdrop */}
      {sidebarOpen && <div className="cos-mobile-backdrop" onClick={() => setSidebarOpen(false)} />}

      {/* ── SIDEBAR ──────────────────────── */}
      <aside className={`cos-sidebar ${sidebarOpen ? 'open' : ''}`}>
        {/* Logo */}
        <div className="cos-sb-logo">
          <div className="cos-logo-icon">C</div>
          <div>
            <span className="cos-logo-name">CREATOR OS</span>
            <span className="cos-logo-tag">AI Strategic Partner</span>
          </div>
        </div>

        {/* Nav */}
        {NAV_SECTIONS.map(section => (
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

      {/* ── MAIN ─────────────────────────── */}
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
            <span className="cos-muted cos-mono" style={{ fontSize: '0.72rem' }}>
              {CREATOR_PROFILE.handle}
            </span>
            <span className={`cos-status-pill ${apiKey ? 'live' : ''}`}>
              {apiKey ? '● AI CONNECTED' : '○ NO API KEY'}
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
        </div>
      </main>
    </div>
  );
}
