import React from 'react';
import { BookOpen, ExternalLink, Calendar, Tag } from 'lucide-react';
import { Link } from 'react-router-dom';
import './Research.css';

const researchData = [
  {
    title: "The Architecture of Empathy: Synthesizing Deterministic Ephemeris with Large Language Models",
    date: "March 2026",
    description: "An exploration into the framework of a highly responsive, serverless application serving as an emotionally intelligent virtual spiritual companion. This paper details the integration of structured offline mathematics with dynamic Generative AI prompting.",
    tags: ["LLM Prompting", "System Architecture", "Digital Mental Health"],
    link: "/research/architecture-of-empathy",
    internal: true
  },
  {
    title: "Vantage: Engineering an Adversarial AI Talent Manager for the Creator Economy",
    date: "March 2026",
    description: "A technical deep-dive into a multi-module AI brand deal intelligence platform. Covers the prompt-chaining Fit Score Engine, dual-layer NLP contract scanner (Regex + Gemini LLM), and the mathematical Negotiation Floor Calculator based on CPM benchmarks, niche premiums, and usage rights surcharges.",
    tags: ["Agentic AI", "NLP & Contract Law", "Creator Economy", "Prompt Engineering"],
    link: "/research/vantage-ai-brand-deal-manager",
    internal: true
  }
];

const Research = () => {
  return (
    <div className="page-wrapper container">
      <header className="page-header text-center mb-12">
        <h1 className="hero-title text-5xl mb-4 font-mono">
          <BookOpen className="inline-block mr-4 text-accent-cyan" size={40} />
          <span className="gradient-text">sys.research_logs</span>
        </h1>
        <p className="text-secondary max-w-2xl mx-auto">
          Publishing practical research, case studies, and findings from deep dives into data engineering, analytics, and architecture.
        </p>
      </header>

      <div className="research-grid">
        {researchData.length === 0 ? (
          <div className="glass-panel p-6 text-center text-muted font-mono col-span-full">
            No research logs found. Add your publications to researchData array.
          </div>
        ) : (
          researchData.map((item, index) => (
            <article key={index} className="research-card glass-panel hover-glow">
              <div className="card-content">
                <div className="meta text-muted font-mono flex items-center gap-4 mb-4 text-sm">
                  <span className="flex items-center gap-1"><Calendar size={14} /> {item.date}</span>
                </div>
                
                <h3 className="card-title text-xl font-bold mb-3">{item.title}</h3>
                <p className="card-text text-secondary mb-6">{item.description}</p>
                
                <div className="tags mb-6">
                  {item.tags.map(tag => (
                    <span key={tag} className="tag flex items-center gap-1">
                      <Tag size={12} /> {tag}
                    </span>
                  ))}
                </div>
              </div>
              
              {item.internal ? (
                 <Link to={item.link} className="btn btn-secondary w-full justify-center mt-auto border-t border-glass-border">
                   <span>Read Full Paper</span>
                   <ExternalLink size={16} />
                 </Link>
              ) : (
                <a href={item.link} className="btn btn-secondary w-full justify-center mt-auto border-t border-glass-border">
                  <span>Read Full Paper</span>
                  <ExternalLink size={16} />
                </a>
              )}
            </article>
          ))
        )}
      </div>
    </div>
  );
};

export default Research;
