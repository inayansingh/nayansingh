import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Research from './pages/Research';
import AiApps from './pages/AiApps';
import PrekshaApp from './apps/Preksha/PrekshaApp';
import VantageApp from './apps/Vantage/VantageApp';
import PaperSpiritualAI from './pages/PaperSpiritualAI';
import PaperVantage from './pages/PaperVantage';
import ErrorBoundary from './components/ErrorBoundary';

// Routes that have their own full-screen navigation headers
const STANDALONE_ROUTES = ['/vantage', '/preksha'];

function AppShell() {
  const { pathname } = useLocation();
  const isStandalone = STANDALONE_ROUTES.some(r => pathname.startsWith(r));

  return (
    <div className="app-container">
      {!isStandalone && <Navbar />}
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/research" element={<Research />} />
          <Route path="/research/architecture-of-empathy" element={<PaperSpiritualAI />} />
          <Route path="/research/vantage-ai-brand-deal-manager" element={<PaperVantage />} />
          <Route path="/apps" element={<AiApps />} />
          <Route path="/preksha" element={<PrekshaApp />} />
          <Route path="/vantage" element={<VantageApp />} />
        </Routes>
      </main>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppShell />
    </Router>
  );
}

export default App;
