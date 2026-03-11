import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Terminal, Lightbulb, Code2, Briefcase } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
  const location = useLocation();
  
  // Render nothing if we are on the Preksha app route
  if (location.pathname === '/preksha') {
    return null; // Let the Preksha app own the entire viewport
  }

  return (
    <nav className="navbar glass-panel">
      <div className="navbar-container">
        <div className="navbar-logo">
          <Terminal className="logo-icon" size={28} />
          <span className="logo-text font-mono">
            <span className="text-muted">~/</span>
            Nayan<span className="gradient-text">.Singh</span>
            <span className="cursor-blink">_</span>
          </span>
        </div>
        
        <div className="navbar-links font-mono">
          <NavLink to="/" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
            <Briefcase size={18} />
            <span>About</span>
          </NavLink>
          <NavLink to="/research" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
            <Lightbulb size={18} />
            <span>Research</span>
          </NavLink>
          <NavLink to="/apps" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
            <Code2 size={18} />
            <span>AI Apps</span>
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
