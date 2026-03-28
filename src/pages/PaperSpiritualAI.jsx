import React, { useEffect } from 'react';
import { ArrowLeft, Edit3, AlignLeft, BarChart2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import './PaperSpiritualAI.css';

const PaperSpiritualAI = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
              <span className="pill api-pill">Artificial Intelligence</span>
              <span className="pill arch-pill">System Architecture</span>
              <span className="pill health-pill">Digital Mental Health</span>
            </div>
            
            <h1 className="paper-title">
              The Architecture of Empathy: <br/>
              <span className="gradient-text paper-subtitle">Synthesizing Deterministic Ephemeris with Large Language Models</span>
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
            
            <section className="abstract bg-glass-bg">
              <h3 className="abstract-title">
                 <AlignLeft size={20} style={{color: 'var(--accent-cyan)'}} /> Abstract
              </h3>
              <p>
                The intersection of ancient spiritual predictive systems and modern Generative AI presents a unique architectural challenge: How do we impart emotionally consistent "wisdom" into a probabilistic language model while eliminating hallucinations regarding real-world timelines? This paper explores the framework of a highly responsive, serverless application serving as an emotionally intelligent virtual companion.
              </p>
            </section>

            <section>
              <h2>1. The Vedic Precedent for Digital Mental Health</h2>
              <p>
                The necessity of cultivating mental well-being is not a modern innovation, but rather a foundational pillar of Vedic sciences. The <em>Yajur Veda</em> explicitly focuses on the cultivation of an auspicious mind in the renowned <strong>Shiva Sankalpa Suktam</strong> (Chapter 34, Verses 1-6), repeatedly ending with the profound mandate: <em>"Tanme manah shiva sankalpam astu"</em> (May my mind be filled with auspicious and peaceful resolves).
              </p>
              <p>
                Furthermore, the <em>Atharva Veda</em> emphasizes <em>Bhaishajya</em> (healing modalities) that treat psychological distress (<em>Adhi</em>) as fundamentally interconnected with physical ailments (<em>Vyadhi</em>). In a highly accelerated digital era where isolation runs rampant, deploying an AI companion acts as a modern-day vessel for <strong>Sakshi Bhava</strong> (witness consciousness)—guiding the seeker away from immediate panic and toward a broader, cosmic perspective of their life journey aligned with <em>Dharma</em>.
              </p>
            </section>

            <section>
              <h2>2. System Architecture</h2>
              <p>To achieve this synthesis between ancient logic and generative capacity, a strict multi-layered serverless pipeline was engineered.</p>
              
              {/* Branching Multi-Node Secure Architecture Diagram */}
              <div className="bg-glass-bg custom-diagram">
                <div className="diagram-spine">
                   <div className="d-node user-node border-2">HTTPS TLS/Edge Request</div>
                   <div className="d-line"></div>
                   <div className="d-split">
                      <div className="d-split-col">
                         <div className="d-node react-node">Location Geocoding</div>
                         <div className="d-line"></div>
                         <div className="d-node api-node">Prokerala Vedic Auth Engine</div>
                      </div>
                      <div className="d-split-col">
                         <div className="d-node react-node">Samskara Payload (React)</div>
                         <div className="d-line"></div>
                         <div className="d-node data-node bg-glass-bg">Preksha Master Persona</div>
                      </div>
                   </div>
                   <div className="d-converge"><div className="d-converge-drop"></div></div>
                   <div className="d-node injection-node shadow-md text-center py-4 px-8 w-full max-w-md">
                      <strong>NEURAL INJECTION BAY</strong><br/>
                      [Ephemeris Gochar] + [Psychological Directives]
                   </div>
                   <div className="d-line"></div>
                   <div className="d-node gemini-node py-4 w-full max-w-sm">Gemini 2.5 Flash LLM</div>
                </div>
              </div>
            </section>

            <section>
              <h2>3. Dynamic Empathy Architecting (The Generative Layer)</h2>
              <p>
                Unlike clinical task-oriented conversational agents, a digital spiritual companion must exhibit cognitive empathy that respects the user's <em>Samskaras</em> (deep-rooted mental patterns). We utilized Google’s Gemini 2.5 Flash model as the core reasoning engine. However, to guarantee an empathetic baseline, the system relies on <strong>Dynamic Master Persona Injection</strong>.
              </p>
              <p className="mt-4">
                The system prompt was fundamentally engineered to force the LLM to strictly adopt the persona of "Preksha Rana", an empathetic spiritual guide. This aggressively prevents the model from reverting to its base identity ("I am a large language model...") and ensures all outputs adhere to a rigidly therapeutic, Vedic-aligned dialect. Additionally, an initial React onboarding layer proactively captures the user's psychological state. This metadata dynamically alters the instructions—an "anxiety" input, for example, overrides the standard response tree, instructing the neural network to prioritize grounding algorithms before delivering predictive advice.
              </p>
            </section>

            <section>
              <h2>4. Algorithmic Tethering via REST APIs (The Deterministic Layer)</h2>
              <p>
                Large Language Models inherently struggle with mathematical certainty, often hallucinating timelines or arbitrary dates when asked for temporal predictions. To solve this, the generative brain is tethered to a strict deterministic mathematical engine.
              </p>
              <p>
                When a user initializes the chat, the Node.js backend (<code>/api/astrology</code>) asynchronously translates the user's geocoded birthplace into rigorous latitude/longitude parameters. It securely requests an OAuth token and queries external astronomical databases (the Prokerala API) to calculate mathematically flawless planetary transits (<em>Gochar</em>). These raw JSON facts are invisibly piped into the LLM’s framework as absolute structural truth. Consequently, the AI's natural language forecasting is mathematically tethered to factual geometry.
              </p>
            </section>

            <section>
              <h2>5. Psychosocial Monetization (The 'Karmic Token' Economy)</h2>
              <p>
                Mindful engagement is crucial in spiritual counseling. To prevent mindless spamming and enforce a conscious value exchange (<em>Dakshina</em>), the system deploys a stateful "Karmic Economy." The React frontend utilizes browser <code>localStorage</code> variables to track conversation depth. Upon token depletion, the chat loop locks via conditional rendering.
              </p>
              <p className="mt-4">
                For monetization on a serverless edge architecture without a dedicated WebSocket or Database verifier, we implemented an <strong>Intelligent Redirect Loop</strong>. When users utilize the Cashfree Payment Gateway, success signals are passed back onto the application via sanitized URL query parameters (e.g., <code>?payment=success</code>). The React router intercepts this, instantly injects token states, cleanses the browser history state to prevent manipulation, and unlocks the application seamlessly.
              </p>
              <p className="mt-4">
                To maintain structural integrity during debugging without triggering the CashFree redirect loop or depleting the local economy, a strict <strong>Administrative Core Bypass</strong> was concurrently integrated. A hardcoded <code>isUnlimitedUser</code> conditional hook securely intercepts the React authentication layer for designated architectural maintainers, dynamically nullifying token depletion mechanisms across the entire UI state tree.
              </p>

              {/* Karmic Economy State Machine Diagram */}
              <div className="bg-glass-bg custom-diagram mt-8">
                <div className="diagram-spine max-w-md">
                   <div className="d-node user-node">Initial Chat Hook</div>
                   <div className="d-line"></div>
                   <div className="d-split">
                      <div className="d-split-col">
                         <div className="d-node api-node">Standard User</div>
                         <div className="d-line"></div>
                         <div className="d-node react-node text-xs">localStorage JWT Token Check</div>
                         <div className="d-line"></div>
                         <div className="d-node injection-node border-red-400">CashFree Trigger (Zero Balance)</div>
                      </div>
                      <div className="d-split-col">
                         <div className="d-node react-node">Admin Bypass</div>
                         <div className="d-line"></div>
                         <div className="d-node ui-node">isUnlimitedUser == true</div>
                         <div className="d-line"></div>
                         <div className="d-node data-node text-xs">Bypass Payment Interceptor</div>
                      </div>
                   </div>
                   <div className="d-converge"><div className="d-converge-drop"></div></div>
                   <div className="d-node gemini-node">Enable Message Pipeline</div>
                </div>
              </div>
            </section>

            <section>
              <h2>6. Aesthetic Sensorial Integration & Generative UI</h2>
              <p>
                Technical brilliance must be matched by psychological color theory. To bridge the "Uncanny Valley" and establish genuine user trust, the application relies heavily on <strong>Generative Avatar Engineering</strong>. Physical photographic references were mapped through an image-to-image stable diffusion layer. The output—a hyper-realistic, ethereal rendering matching the platform's exact aura—was embedded as the literal, breathing face of the chat interface, seamlessly unifying the visual and neural layers.
              </p>
              <p className="mt-4">
                Surrounding this persona, the DOM abstraction was engineered into a complete <strong>Digital Sanctuary</strong> utilizing a newly architected 'Light Spiritual Radha' schema. The application avoids modern software aesthetics entirely, implementing instead a meticulously calculated divine atmosphere. This includes complex CSS layering for floating background ambient orbs (utilizing continuously sweeping <code>@keyframes</code> curves), translucent frosted glass chat nodes (<code>backdrop-filter: blur(8px)</code>), and warm morning-saffron gradients. Intelligent DOM referencing ensures the viewport wrapper remains perfectly static, preventing jarring layout shifts during deep meditative focus and proving that visual harmony is as critical as algorithmic intelligence in digital mental health applications.
              </p>

              {/* Generative UI Pipeline Diagram */}
              <div className="bg-glass-bg custom-diagram mt-8">
                <div className="diagram-spine max-w-sm">
                   <div className="d-node react-node">Photographic References</div>
                   <div className="d-line"></div>
                   <div className="d-node api-node">Stable Diffusion (Image-to-Image)</div>
                   <div className="d-line"></div>
                   <div className="d-node data-node">Hyper-Realistic Avatar Rendering</div>
                   <div className="d-line"></div>
                   <div className="d-node ui-node shadow-xl text-center">
                      <strong>Digital Sanctuary Framing</strong><br/>
                      Frosted Glass + Orbs + Saffron HSL
                   </div>
                </div>
              </div>
            </section>

            <section>
              <h2>7. Conclusion</h2>
              <p>
                By synthesizing rigorous offline mathematical pipelines with emotionally-weighted prompt engineering and culturally-resonant Vedic frameworks, we achieve a highly scalable, serverless digital companion capable of genuine spiritual validation and structurally sound predictive guidance.
              </p>
            </section>

            <footer className="paper-footer">
               <Edit3 className="footer-icon" size={24}/>
               <p>Published in sys.research_logs | Nayan Kumar Singh Portfolio</p>
               <p className="copyright-text">© 2026 Architectural Syntheses.</p>
            </footer>

          </div>
        </article>
      </div>
    </div>
  );
};

export default PaperSpiritualAI;
