import React, { useEffect } from 'react';
import { ArrowLeft, AlignLeft, BarChart2, Edit3, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import './PaperSpiritualAI.css'; // Reuse the same beautiful paper styles

const PaperVantage = () => {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="paper-page-wrapper">
      <div className="paper-container">

        <Link to="/research" className="paper-back-link">
          <ArrowLeft size={20} className="icon-mr" />
          Back to Research
        </Link>

        <article className="glass-panel paper-article">
          <header className="paper-header">
            <div className="paper-tags">
              <span className="pill api-pill">Agentic AI</span>
              <span className="pill arch-pill">Creator Economy</span>
              <span className="pill health-pill">NLP & Contract Law</span>
            </div>

            <h1 className="paper-title">
              Vantage: Engineering an Adversarial AI Talent Manager<br />
              <span className="gradient-text paper-subtitle">
                A Multi-Module AI System for Brand Deal Intelligence in the Creator Economy
              </span>
            </h1>

            <div className="paper-author-box">
              <div className="author-badge">NS</div>
              <div className="author-details">
                <p className="author-name">Nayan Kumar Singh</p>
                <p className="author-date">Published March 2026</p>
              </div>
            </div>
          </header>

          <div className="paper-content">

            {/* Abstract */}
            <section className="abstract bg-glass-bg">
              <h3 className="abstract-title">
                <AlignLeft size={20} style={{ color: 'var(--accent-cyan)' }} /> Abstract
              </h3>
              <p>
                The rapid commodification of influence as a commercial asset has created an asymmetric information problem in the Creator Economy. Brands deploy seasoned legal and marketing teams to negotiate deals with digital creators who often lack equivalent expertise. This paper presents <strong>Vantage</strong>, a client-side AI system that eliminates this asymmetry. Vantage deploys three tightly composed modules: a prompt-chaining <em>Fit Score Engine</em> for brand-audience alignment analysis, a dual-layer <em>Contract Red-Flag Scanner</em> combining offline Regular Expression pattern detection with Gemini LLM deep-analysis, and a mathematically derived <em>Negotiation Floor Calculator</em> based on industry-standard CPM benchmarks. All modules operate serverlessly via direct API orchestration, with a hardened behavioral guardrail system enforcing an adversarial "Talent Manager" AI persona to prevent the generation of generic, non-data-backed recommendations.
              </p>
            </section>

            <section>
              <h2>1. The Asymmetric Information Problem in Creator Deals</h2>
              <p>
                The global creator economy is valued at over $250 billion, yet the vast majority of individual creators — particularly those below the "mega" threshold of 1M+ followers — navigate brand partnership negotiations without professional representation. A survey of mid-tier creators reveals that over 60% have signed contracts they later identified as containing restrictive clauses (Influencer Marketing Hub, 2024). The root cause is structural: brands retain dedicated influencer marketing managers, legal teams, and pricing databases, while creators operate with no equivalent institutional knowledge.
              </p>
              <p className="mt-4">
                Traditional influencer marketing platforms (AspireIQ, Grin, Creator.co) address this from the supply side, optimizing deal discovery for brands. They create the very asymmetry they claim to solve by providing brand teams with rich analytics on creator profiles while offering creators no equivalent intelligence about deal terms. <strong>Vantage is explicitly designed to address the demand side of this equation</strong> — engineering an AI system that equips the creator with the analytical firepower of a talent management firm.
              </p>
            </section>

            <section>
              <h2>2. System Architecture: The Serverless Agentic Approach</h2>
              <p>
                A core architectural decision was to eliminate any dedicated backend. All computational logic operates either as pure client-side JavaScript utilities (the Negotiation Calculator) or as direct, authenticated API calls to the Gemini model from the React frontend. This mirrors the architecture pioneered in the Preksha Rana Foundation project and provides three distinct engineering advantages: zero cloud infrastructure cost, zero data persistence risk for sensitive contract text, and instantaneous deployment via static hosting (Vercel edge network).
              </p>

              {/* Branching System Architecture */}
              <div className="bg-glass-bg custom-diagram">
                <div className="diagram-spine">
                  <div className="d-node user-node border-2">Creator Input Layer (React)</div>
                  <div className="d-line"></div>
                  <div className="d-split">
                    <div className="d-split-col">
                      <div className="d-node react-node">Influencer Metrics JSON</div>
                      <div className="d-line"></div>
                      <div className="d-node api-node">Fit Score Prompt Chain</div>
                    </div>
                    <div className="d-split-col">
                      <div className="d-node react-node">Contract Text Input</div>
                      <div className="d-line"></div>
                      <div className="d-node data-node">Regex Pre-Scanner</div>
                    </div>
                  </div>
                  <div className="d-converge"><div className="d-converge-drop"></div></div>
                  <div className="d-node injection-node shadow-md text-center py-4">
                    <strong>VANTAGE AGENT SYSTEM PROMPT</strong><br />
                    [Talent Manager Persona] + [Structured JSON Output Constraints]
                  </div>
                  <div className="d-line"></div>
                  <div className="d-node gemini-node py-4">Gemini 2.0 Flash LLM</div>
                  <div className="d-line"></div>
                  <div className="d-node ui-node">Deal Dashboard / Risk Cards / Rate Breakdown</div>
                </div>
              </div>
            </section>

            <section>
              <h2>3. Module A: The Fit Score Engine (Prompt-Chaining Architecture)</h2>
              <p>
                The Fit Score Engine addresses the most fundamental question in a brand deal: <em>Does this brand's audience and product align with the creator's audience composition?</em> A naive implementation would simply ask an LLM to "rate" the fit. This is insufficient — general-purpose LLMs produce inconsistently calibrated scores and lack grounding in the creator's specific data.
              </p>
              <p className="mt-4">
                Vantage employs a <strong>structured data injection prompt-chain</strong>. Before any generative reasoning begins, the system serializes the creator's full metric profile — platform, niche, follower count, engagement rate percentage, and top 5 audience keyword descriptors — into a structured string and injects it directly into the prompt context. The brand's campaign brief text is provided as the second context block. The LLM is then constrained by the system prompt to apply a deterministic three-factor scoring rubric:
              </p>
              <ul style={{ listStyleType: 'disc', paddingLeft: '20px', marginBottom: '1.5rem', lineHeight: 2.1 }}>
                <li><strong>Niche-Category Overlap (up to 40 points):</strong> Semantic alignment between the creator's declared primary niche and the brand's product vertical, as extracted from the campaign brief text.</li>
                <li><strong>Audience Sentiment & Keyword Alignment (up to 35 points):</strong> Cross-reference between the creator's top 5 audience keywords and the brand's stated target demographic descriptors within the brief.</li>
                <li><strong>Engagement Rate vs. Industry Benchmark (up to 25 points):</strong> A creator's engagement rate is compared against the platform-specific industry average (3.0% for Instagram, 5.0% for TikTok), with scores scaled proportionally. An engagement rate of 3× the benchmark yields maximum points in this category.</li>
              </ul>
              <p>
                Critically, the system prompt enforces a strict refusal policy: any deal scoring below 65 must receive a <code>REJECT</code> verdict. The Fit Score output is constrained to a deterministic JSON schema — <code>{"{ score, verdict, reasoning, top_alignment_factors[] }"}</code> — preventing free-form prose responses that would be impossible to render systematically in the UI.
              </p>
            </section>

            <section>
              <h2>4. Module B: The Contract Red-Flag Scanner (Dual-Layer NLP Pipeline)</h2>
              <p>
                Contract analysis is the highest-stakes feature of Vantage. A single missed "Perpetuity" clause can lock a creator out of ever being compensated for the future use of their likeness in advertising, irrespective of the platform's performance. The scanner is deliberately architected as a double-redundancy pipeline.
              </p>
              <p className="mt-4">
                <strong>Layer 1 — Offline Regex Pre-Scanner:</strong> Before any API call is made, a client-side JavaScript module runs nine independent regular expression patterns over the uploaded contract text. These patterns target the legally dangerous clauses identified in consultation with standard entertainment industry contract templates: <em>Perpetuity</em>, <em>Exclusivity</em>, <em>Work for Hire</em>, <em>Usage Rights</em>, <em>Non-Disparagement</em>, <em>Liquidated Damages</em>, <em>Intellectual Property Assignment</em>, <em>Morality Clause</em>, and <em>First Right of Refusal</em>. This layer operates in zero milliseconds, requires no network connection, and provides an immediate "Quick Scan" result. Each matched sentence is extracted and returned with a pre-classified risk level and a plain-English translation.
              </p>
              <p className="mt-4">
                <strong>Layer 2 — Gemini AI Deep Scan:</strong> The opted-in "AI Deep Scan" sends the full contract text to the Vantage agent. The system prompt instructs the model to perform contextual clause analysis beyond simple keyword matching — detecting obfuscated phrasing such as <em>"in perpetuity throughout the universe"</em> (a common entertainment industry euphemism) that a regex would miss without explicit enumeration. The output is again constrained to a structured JSON array of clause objects, each containing <code>risk_level</code>, <code>clause_text</code>, <code>plain_english</code>, and <code>recommended_action</code>.
              </p>

              {/* Contract Pipeline Diagram */}
              <div className="bg-glass-bg custom-diagram mt-8">
                <div className="diagram-spine">
                  <div className="d-node user-node">Contract Text Upload</div>
                  <div className="d-line"></div>
                  <div className="d-split">
                    <div className="d-split-col">
                      <div className="d-node react-node">Quick Scan</div>
                      <div className="d-line"></div>
                      <div className="d-node data-node">Regex Pattern Engine<br />(9 Red-Flag Patterns)</div>
                      <div className="d-line"></div>
                      <div className="d-node ui-node">Instant (&lt;1ms)</div>
                    </div>
                    <div className="d-split-col">
                      <div className="d-node react-node">AI Deep Scan</div>
                      <div className="d-line"></div>
                      <div className="d-node api-node">Gemini NLP Analysis<br />(Context-Aware)</div>
                      <div className="d-line"></div>
                      <div className="d-node gemini-node" style={{ fontSize: '0.8rem' }}>Obfuscated Clause Detection</div>
                    </div>
                  </div>
                  <div className="d-converge"><div className="d-converge-drop"></div></div>
                  <div className="d-node injection-node shadow-md text-center py-4">
                    <strong>Risk-Sorted Output</strong><br />
                    [CRITICAL] → [HIGH] → [MEDIUM] → [LOW]
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h2>5. Module C: The Negotiation Floor Calculator</h2>
              <p>
                Rate negotiation is fundamentally a mathematical problem that the industry consistently mystifies. Vantage reduces it to a transparent, auditable formula that any creator can understand and defend:
              </p>
              <div style={{ background: 'var(--glass-bg)', border: '1px solid var(--glass-border)', borderRadius: '12px', padding: '1.5rem 2rem', margin: '1.5rem 0', fontFamily: 'Fira Code, monospace', fontSize: '0.95rem', lineHeight: 2.2, color: 'var(--text-primary)' }}>
                <p style={{ marginBottom: '0.5rem' }}><strong>Floor Rate =</strong></p>
                <p style={{ paddingLeft: '1.5rem' }}>( Base Rate × Engagement Factor )</p>
                <p style={{ paddingLeft: '1.5rem' }}>+ Niche Premium</p>
                <p style={{ paddingLeft: '1.5rem' }}>+ Usage Rights Surcharge</p>
                <p style={{ borderTop: '1px solid var(--glass-border)', marginTop: '0.75rem', paddingTop: '0.75rem' }}>
                  <strong>Range = [Floor × 0.85, Floor × 1.40]</strong>
                </p>
              </div>
              <p>
                The <strong>Base Rate</strong> is derived from a $10 CPM (Cost per Mille) industry baseline applied against the creator's estimated reach (followers × engagement rate), with a platform-specific floor protecting against artificially low valuations for small accounts. The <strong>Engagement Factor</strong> applies a tiered multiplier: engagement rates exceeding 6% attract a 1.5× multiplier (reflecting premium audience quality), 3–6% yields 1.2×, and below 3% receives no premium—penalizing passive audiences common in purchased follower portfolios.
              </p>
              <p className="mt-4">
                The <strong>Niche Premium</strong> reflects vertical-specific market demand, ranging from 10% (Entertainment, Food) to 35% (Finance, Technology) — calibrated against publicly available influencer market rate surveys. The <strong>Usage Rights Surcharge</strong> is the most commonly misunderstood element of creator compensation. When a brand purchases "6-month digital rights," they are effectively acquiring a perpetual license to use that content in paid advertising — a fundamentally different commercial arrangement than a one-time organic post. Vantage applies a 10% surcharge per month of rights duration, capped at 60%, directly reflecting the actuarial depreciation of creative asset value over time.
              </p>
            </section>

            <section>
              <h2>6. The Adversarial Persona Engineering Problem</h2>
              <p>
                Perhaps the most subtle engineering challenge in Vantage was behavioral: a general-purpose LLM, when asked to evaluate a brand deal, will default to hedged, diplomatic language. It will say "this deal has both strengths and areas to consider." This is useless to a creator entering a negotiation. They need a decisive, directive advisor.
              </p>
              <p className="mt-4">
                The solution was explicit <strong>Adversarial Persona Injection</strong> at the system prompt level. The Vantage system prompt instructs the model to behave as a "ruthlessly analytical Talent Manager and Brand Deal Strategist" — and more importantly, encodes specific behavioral guardrails: the model is prohibited from recommending any deal with a Fit Score below 65, prohibited from providing generic advice not grounded in the submitted data, and prohibited from omitting a Negotiation Floor calculation before recommending any terms. The output format is itself a guardrail — by mandating JSON responses, the system structurally prevents the model from generating the vague, conversational prose that LLMs naturally gravitate toward.
              </p>
            </section>

            <section>
              <h2>7. UI Architecture: Data Density as Design Principle</h2>
              <p>
                The Vantage UI deliberately rejects the minimalist "wellness" aesthetics common in consumer apps in favor of a high information-density design language — described internally as "Bloomberg Terminal meets Creator Economy." This is an intentional product decision: the target user of Vantage is not a casual consumer but a professional creator making a high-stakes financial decision. Dense, data-rich layouts signal competence and reduce cognitive friction when parsing complex analytical outputs.
              </p>
              <p className="mt-4">
                The centerpiece visualization is an <strong>animated SVG radial gauge</strong> rendering the Fit Score as a circular progress arc with a spring-physics animation (<code>cubic-bezier(0.34, 1.56, 0.64, 1)</code>) that overshoots and snaps back to the final value, creating a kinetic sense of precise measurement. The gauge's stroke color transitions dynamically — emerald above 75, amber between 50–74, rose below 50 — providing a pre-attentive signal readable before the number itself is processed. The full-width "Creator-Tech" dark theme deploys ambient radial CSS gradient orbs to create visual depth without obscuring data readability.
              </p>
            </section>

            <section>
              <h2>8. Conclusion</h2>
              <p>
                Vantage demonstrates that a sophisticated, multi-module AI advisory system can be deployed entirely serverlessly with zero infrastructure cost, achieving the analytical depth of an enterprise talent management platform through careful prompt engineering, dual-layer NLP pipelines, and deterministic mathematical modeling. By architecting a system that is simultaneously adversarial in its behavioral mandate and transparent in its reasoning chain, it addresses the Creator Economy's most persistent structural imbalance: the informational asymmetry between professional brand teams and individual creators negotiating alone.
              </p>
            </section>

            <footer className="paper-footer">
              <Edit3 className="footer-icon" size={24} />
              <p>Published in sys.research_logs | Nayan Kumar Singh Portfolio</p>
              <p className="copyright-text">© 2026 Architectural Syntheses.</p>
            </footer>

          </div>
        </article>
      </div>
    </div>
  );
};

export default PaperVantage;
