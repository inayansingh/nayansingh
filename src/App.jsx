import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Research from './pages/Research';
import AiApps from './pages/AiApps';
import PrekshaApp from './apps/Preksha/PrekshaApp';
import ErrorBoundary from './components/ErrorBoundary';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/research" element={<Research />} />
            <Route path="/apps" element={<AiApps />} />
            <Route path="/preksha" element={<PrekshaApp />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
