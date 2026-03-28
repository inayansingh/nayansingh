import React from 'react';
import { userData } from '../data/userData';
import { Terminal, Database, Code, Cloud, Cpu, Briefcase, GraduationCap, Users, BookOpen, ExternalLink, Star } from 'lucide-react';
import profileImg from '../assets/images/profile.jpg';
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
        
        <div className="hero-image-wrapper">
          <img src={profileImg} alt="Nayan Singh Profile" className="hero-image" />
        </div>
      </section>

      <div className="dashboard-grid mt-12">
        {/* Experience Section */}
        <section className="experience-section glass-panel block-experience">
          <div className="section-header">
            <Briefcase className="accent-icon" />
            <h3 className="font-mono">Experience_Log</h3>
          </div>
          
          <div className="timeline">
            {userData.experience.map((exp, index) => (
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
                    {exp.highlights.map((highlight, i) => (
                      <li key={i}>{highlight}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Publications Section (Grid Placement + Academic Formatting) */}
        <section className="publications-section glass-panel block-publications">
          <div className="section-header">
            <BookOpen className="accent-icon-alt text-accent-purple" size={24} />
            <h3 className="font-mono text-xl">Publications_&_Research</h3>
          </div>
          
          <div className="flex flex-col gap-6">
            {userData.publications.map((pub, index) => (
              <div key={index} className="academic-publication-card relative overflow-hidden group">
                <div className="academic-badge font-mono text-xs flex items-center gap-2 mb-4 text-accent-purple uppercase tracking-widest">
                  <Star size={14} className="fill-current" />
                  <span>Featured Publication</span>
                </div>
                
                <h4 className="academic-title text-2xl text-primary font-bold mb-4 leading-tight group-hover:text-accent-cyan transition-colors duration-500">
                  {pub.title}
                </h4>
                
                <div className="academic-desc-container my-5">
                  <p className="academic-text text-secondary text-base leading-relaxed whitespace-pre-line">
                    {pub.description}
                  </p>
                </div>
                
                <div className="pt-4 border-t border-glass-border overflow-hidden">
                  <a href={pub.link} target="_blank" rel="noopener noreferrer" className="academic-btn btn btn-primary w-full justify-center mt-2 group-hover:shadow-[0_0_15px_rgba(189,0,255,0.4)] transition-all">
                    <BookOpen size={16} />
                    <span className="text-base">Acquire Publication</span>
                    <ExternalLink size={14} className="ml-2 opacity-70" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Skills Section */}
        <section className="skills-section glass-panel block-skills">
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

        {/* Volunteering Section */}
        <section className="volunteering-section glass-panel block-volunteering">
          <div className="section-header">
            <Users className="accent-icon" />
            <h3 className="font-mono">Volunteering_Log</h3>
          </div>
          
          <div className="timeline">
            {userData.volunteering.map((vol, index) => (
              <div key={index} className="timeline-item hover-glow">
                <div className="timeline-dot"></div>
                <div className="timeline-content">
                  <h4 className="role text-primary font-mono">{vol.role}</h4>
                  <div className="company-info text-secondary mb-2">
                    <span className="company">{vol.organization}</span>
                    <span className="separator">|</span>
                    <span className="period font-mono text-muted">{vol.period}</span>
                  </div>
                  {vol.description && (
                    <p className="text-secondary text-sm mt-2 leading-relaxed">
                      {vol.description}
                    </p>
                  )}
                </div>
              </div>
            ))}
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
