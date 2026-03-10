import React from 'react';
import { userData } from '../data/userData';
import { Terminal, Database, Code, Cloud, Cpu, Briefcase, GraduationCap } from 'lucide-react';
import './Home.css';

const Home = () => {
  return (
    <div className="page-wrapper container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="terminal-badge font-mono">
            <Terminal size={16} />
            <span>Hello World</span>
          </div>
          
          <h1 className="hero-title">
            I'm <span className="gradient-text">{userData.personal.name}</span>
          </h1>
          <h2 className="hero-subtitle font-mono text-muted">
            &gt; {userData.personal.title} <span className="cursor-blink">_</span>
          </h2>
          
          <p className="hero-description text-secondary">
            {userData.personal.about}
          </p>
          
          <div className="hero-actions">
            <a href={userData.personal.linkedin} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
              <Database size={18} />
              <span>Connect on LinkedIn</span>
            </a>
            <a href="mailto:inayansingh@gmail.com" className="btn btn-secondary">
              <Terminal size={18} />
              <span>Contact Me</span>
            </a>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-2">
        {/* Experience Section */}
        <section className="experience-section glass-panel">
          <div className="section-header">
            <Briefcase className="accent-icon" />
            <h3 className="font-mono">Experience_Log</h3>
          </div>
          
          <div className="timeline">
            {userData.experience.slice(0, 3).map((exp, index) => (
              <div key={index} className="timeline-item hover-glow">
                <div className="timeline-dot"></div>
                <div className="timeline-content">
                  <h4 className="role text-primary font-mono">{exp.role}</h4>
                  <div className="company-info text-secondary">
                    <span className="company">{exp.company}</span>
                    <span className="separator">|</span>
                    <span className="period font-mono text-muted">{exp.period}</span>
                  </div>
                  <ul className="highlights text-secondary">
                    {exp.highlights.slice(0, 2).map((highlight, i) => (
                      <li key={i}>{highlight}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Skills Section */}
        <section className="skills-section glass-panel">
          <div className="section-header">
            <Cpu className="accent-icon-alt" />
            <h3 className="font-mono">Tech_Stack</h3>
          </div>

          <div className="skill-groups">
            <div className="skill-group">
              <h4 className="font-mono text-muted flex items-center gap-2">
                <Cloud size={16} /> Cloud & Big Data
              </h4>
              <div className="tags">
                {userData.skills.cloudAndDB.map(skill => (
                  <span key={skill} className="tag tag-cyan">{skill}</span>
                ))}
              </div>
            </div>

            <div className="skill-group">
              <h4 className="font-mono text-muted flex items-center gap-2">
                <Code size={16} /> Languages
              </h4>
              <div className="tags">
                {userData.skills.languages.map(skill => (
                  <span key={skill} className="tag tag-purple">{skill}</span>
                ))}
              </div>
            </div>

            <div className="skill-group">
              <h4 className="font-mono text-muted flex items-center gap-2">
                <Database size={16} /> Analytics & BI
              </h4>
              <div className="tags">
                {userData.skills.tools.map(skill => (
                  <span key={skill} className="tag tag-green">{skill}</span>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>

       {/* Recommendations Section */}
       <section className="recommendations-section mt-8">
        <div className="section-header text-center mb-6">
          <h3 className="font-mono text-2xl">
            <span className="gradient-text">sys.get_recommendations()</span>
          </h3>
        </div>
        
        <div className="marquee-container">
          <div className="marquee">
            {[...userData.recommendations, ...userData.recommendations].map((rec, i) => (
              <div key={i} className="recommendation-card glass-panel hover-glow">
                <p className="rec-text text-secondary line-clamp-4">"{rec.text}"</p>
                <div className="rec-author mt-4">
                  <h5 className="font-mono text-primary">{rec.name}</h5>
                  <p className="text-muted text-sm">{rec.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
