import React from 'react';
import { Code2, Play, Github, HardDrive } from 'lucide-react';
import './AiApps.css';

const appsData = [
  {
    name: "Preksha Rana Foundation",
    status: "online",
    description: "A full-fledged NGO landing page featuring an emotionally intelligent virtual spiritual companion that offers Vedic kundali interpretation and guidance.",
    model: "gemini-2.5-flash",
    demoLink: "/preksha",
    repoLink: "#"
  }
];

const AiApps = () => {
  return (
    <div className="page-wrapper container">
      <header className="page-header text-center mb-12">
        <h1 className="hero-title text-5xl mb-4 font-mono">
          <Code2 className="inline-block mr-4 text-accent-green" size={40} />
          <span className="gradient-text-alt">sys.deploy(ai)</span>
        </h1>
        <p className="text-secondary max-w-2xl mx-auto">
           Interactive artificial intelligence applications, machine learning models, and prototype tools ready for testing.
        </p>
      </header>

      <div className="grid grid-cols-2">
        {appsData.length === 0 ? (
          <div className="glass-panel p-6 text-center text-muted font-mono col-span-full">
            No applications found. Add your deployed AI apps to appsData array.
          </div>
        ) : (
          appsData.map((app, index) => (
            <div key={index} className="app-card glass-panel hover-glow p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-2xl font-bold">{app.name}</h3>
                <span className={`status-indicator ${app.status}`}>
                   <span className="blink-dot"></span>
                   {app.status.toUpperCase()}
                </span>
              </div>
              
              <p className="text-secondary mb-6 min-h-[60px]">{app.description}</p>
              
              <div className="app-meta mb-8 flex gap-4">
                 <div className="meta-item flex items-center gap-2 text-sm font-mono text-muted bg-bg-tertiary px-3 py-1 rounded border border-glass-border">
                    <HardDrive size={14} />
                    <span>{app.model}</span>
                 </div>
              </div>

              <div className="app-actions flex gap-4 mt-auto">
                 <a href={app.demoLink} target="_blank" rel="noopener noreferrer" className={`btn ${app.status === 'online' ? 'btn-primary' : 'btn-secondary disabled'}`}>
                    <Play size={16} />
                    <span>Launch App</span>
                 </a>
                 <a href={app.repoLink} className="btn btn-secondary">
                    <Github size={16} />
                    <span>Source Code</span>
                 </a>
              </div>
            </div>
          ))
        )}
      </div>

    </div>
  );
};

export default AiApps;
