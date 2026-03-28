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
      <div className="container max-w-4xl mx-auto px-4 py-12">
        <Link to="/research" className="inline-flex items-center text-accent-cyan hover:text-white transition-colors mb-12">
          <ArrowLeft size={20} className="mr-2" />
          Back to Research
        </Link>
        
        <article className="glass-panel p-8 md:p-14 research-article">
          <header className="article-header border-b border-glass-border pb-8 mb-10">
            <div className="flex flex-wrap gap-2 mb-6">
              <span className="pill text-xs px-3 py-1 bg-accent-cyan/10 text-accent-cyan rounded-full border border-accent-cyan/20">Artificial Intelligence</span>
              <span className="pill text-xs px-3 py-1 bg-accent-blue/10 text-accent-blue rounded-full border border-accent-blue/20">System Architecture</span>
              <span className="pill text-xs px-3 py-1 bg-accent-purple/10 text-accent-purple rounded-full border border-accent-purple/20">Digital Mental Health</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              The Architecture of Empathy: <br/>
              <span className="gradient-text text-3xl md:text-4xl block mt-2">Synthesizing Deterministic Ephemeris with Large Language Models</span>
            </h1>
            
            <div className="flex items-center gap-4 text-secondary font-mono">
              <div className="author-badge w-10 h-10 rounded-full bg-gradient-to-br from-accent-cyan to-accent-blue flex items-center justify-center text-white font-bold">
                NS
              </div>
              <div>
                <p className="font-bold text-primary">Nayan Kumar Singh</p>
                <p className="text-sm">Published March 2026</p>
              </div>
            </div>
          </header>

          <div className="article-content space-y-8 text-secondary leading-relaxed">
            
            <section className="abstract bg-glass-bg p-6 rounded-xl border border-glass-border border-l-4 border-l-accent-cyan">
              <h3 className="text-xl font-bold text-primary mb-3 flex items-center gap-2">
                 <AlignLeft size={20} className="text-accent-cyan" /> Abstract
              </h3>
              <p>
                The intersection of ancient spiritual predictive systems and modern Generative AI presents a unique architectural challenge: How do we impart emotionally consistent "wisdom" into a probabilistic language model while eliminating hallucinations regarding real-world timelines? This paper explores the framework of a highly responsive, serverless application serving as an emotionally intelligent virtual companion.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-primary mb-4 mt-12 border-b border-glass-border pb-2">1. The Vedic Precedent for Digital Mental Health</h2>
              <p className="mb-4">
                The necessity of cultivating mental well-being is not a modern innovation, but rather a foundational pillar of Vedic sciences. The <em>Yajur Veda</em> explicitly focuses on the cultivation of an auspicious mind in the renowned <strong>Shiva Sankalpa Suktam</strong> (Chapter 34, Verses 1-6), repeatedly ending with the profound mandate: <em>"Tanme manah shiva sankalpam astu"</em> (May my mind be filled with auspicious and peaceful resolves).
              </p>
              <p>
                Furthermore, the <em>Atharva Veda</em> emphasizes <em>Bhaishajya</em> (healing modalities) that treat psychological distress (<em>Adhi</em>) as fundamentally interconnected with physical ailments (<em>Vyadhi</em>). In a highly accelerated digital era where isolation runs rampant, deploying an AI companion acts as a modern-day vessel for <strong>Sakshi Bhava</strong> (witness consciousness)—guiding the seeker away from immediate panic and toward a broader, cosmic perspective of their life journey aligned with <em>Dharma</em>.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-primary mb-6 mt-12 border-b border-glass-border pb-2">2. System Architecture</h2>
              <p className="mb-6">To achieve this synthesis between ancient logic and generative capacity, a strict multi-layered serverless pipeline was engineered.</p>
              
              {/* Custom CSS Diagram */}
              <div className="bg-glass-bg border border-glass-border p-8 rounded-2xl overflow-x-auto custom-diagram my-8">
                <div className="diagram-grid min-w-[600px]">
                   {/* Row 1 */}
                   <div className="flex justify-center mb-6">
                      <div className="node user-node text-center">User Distress Query</div>
                   </div>
                   <div className="line-down"></div>
                   
                   {/* Row 2 */}
                   <div className="flex justify-center mb-6 relative">
                      <div className="node react-node">Strict React Client & Onboarding Layer</div>
                   </div>
                   
                   <div className="flex justify-between max-w-lg mx-auto mb-6 relative px-4">
                      <div className="line-branch-left"></div>
                      <div className="line-branch-right"></div>
                      <div className="node data-node w-5/12 text-center text-sm">Location / Time Geocoding</div>
                      <div className="node data-node w-5/12 text-center text-sm">Emotional State Capture</div>
                   </div>
                   
                   {/* Row 4 */}
                   <div className="flex justify-between max-w-lg mx-auto mb-6 relative px-4">
                      <div className="line-down absolute left-[20%] -top-6 h-6"></div>
                      <div className="line-down absolute right-[20%] -top-6 h-6 border-l-dashed"></div>
                      
                      <div className="node api-node w-5/12 text-center text-sm border-accent-cyan">Prokerala Vedic API (Serverless Backend)</div>
                      <div className="node empty-node w-5/12 text-center text-sm opacity-0 hidden"></div>
                   </div>

                   {/* Row 5 */}
                   <div className="flex justify-center mb-8 relative">
                      <div className="line-converge"></div>
                      <div className="node injection-node w-full max-w-md text-center bg-accent-purple/10 border-accent-purple text-accent-purple font-mono text-sm py-4">
                         SYSTEM INJECTION: [Deterministic Planets] + [User Persona]
                      </div>
                   </div>
                   <div className="line-down relative -top-8 z-0"></div>

                   {/* Row 6 */}
                   <div className="flex justify-center mb-6 relative z-10">
                      <div className="node gemini-node w-64 text-center font-bold text-lg bg-gradient-to-r from-accent-cyan/20 to-accent-blue/20 border-accent-cyan shadow-[0_0_20px_rgba(0,195,255,0.2)]">
                         Gemini 2.5 Flash LLM
                      </div>
                   </div>
                   <div className="line-down"></div>

                   {/* Row 7 */}
                   <div className="flex justify-center">
                      <div className="node ui-node w-64 text-center border-accent-green text-accent-green bg-accent-green/10">
                         Glassmorphism UI Stream
                      </div>
                   </div>

                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-primary mb-4 mt-12 border-b border-glass-border pb-2">3. Dynamic Empathy Architecting (The Generative Layer)</h2>
              <p>
                Unlike clinical task-oriented conversational agents, a digital spiritual companion must exhibit cognitive empathy that respects the user's <em>Samskaras</em> (deep-rooted mental patterns). We utilized Google’s Gemini 2.5 Flash model as the core reasoning engine. However, to guarantee an empathetic baseline, the system relies on <strong>Dynamic Persona Injection</strong>. The application proactively captures the user's psychological state via an initial React onboarding layer. This metadata is parsed to dynamically alter the system instructions. An "anxiety" input, for example, forcibly overrides the LLM's standard response tree, instructing the neural network to prioritize grounding algorithms (e.g., breathwork exercises) before delivering predictive advice.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-primary mb-4 mt-12 border-b border-glass-border pb-2">4. Algorithmic Tethering via REST APIs (The Deterministic Layer)</h2>
              <p className="mb-4">
                Large Language Models inherently struggle with mathematical certainty, often hallucinating timelines or arbitrary dates when asked for temporal predictions. To solve this, the generative brain is tethered to a strict deterministic mathematical engine.
              </p>
              <p>
                When a user initializes the chat, the Node.js backend (<code>/api/astrology</code>) asynchronously translates the user's geocoded birthplace into rigorous latitude/longitude parameters. It securely requests an OAuth token and queries external astronomical databases (the Prokerala API) to calculate mathematically flawless planetary transits (<em>Gochar</em>). These raw JSON facts are invisibly piped into the LLM’s framework as absolute structural truth. Consequently, the AI's natural language forecasting is mathematically tethered to factual geometry.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-primary mb-4 mt-12 border-b border-glass-border pb-2">5. Psychosocial Monetization (The 'Karmic Token' Economy)</h2>
              <p className="mb-4">
                Mindful engagement is crucial in spiritual counseling. To prevent mindless spamming and enforce a conscious value exchange (<em>Dakshina</em>), the system deploys a stateful "Karmic Economy." The React frontend utilizes browser <code>localStorage</code> variables to track conversation depth. Upon token depletion, the chat loop locks via conditional rendering.
              </p>
              <p>
                For monetization on a serverless edge architecture without a dedicated WebSocket or Database verifier, we implemented an <strong>Intelligent Redirect Loop</strong>. When users utilize the Cashfree Payment Gateway, success signals are passed back onto the application via sanitized URL query parameters (e.g., <code>?payment=success</code>). The React router intercepts this, instantly injects token states, cleanses the browser history state to prevent manipulation, and unlocks the application seamlessly.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-primary mb-4 mt-12 border-b border-glass-border pb-2">6. Aesthetic Sensorial Integration (UI/UX)</h2>
              <p>
                Technical brilliance must be matched by psychological color theory. The application avoids modern software aesthetics (whites, harsh grays, clinical borders). Instead, it implements a meticulously calculated "Divine Aesthetic"—utilizing dark dimensional purples, saffron gradients, and sophisticated frosted glass components (<code>backdrop-filter: blur(8px)</code>). Intelligent DOM referencing ensures the viewport wrapper remains perfectly static, bounded strictly to incoming messages, preventing jarring layout shifts during deep meditative focus.
              </p>
            </section>

            <footer className="mt-16 pt-8 border-t border-glass-border/40 text-sm text-center text-muted flex flex-col items-center">
               <Edit3 className="mb-4 opacity-50" size={24}/>
               <p>Published in sys.research_logs | Nayan Kumar Singh Portfolio</p>
               <p className="mt-2">© 2026 Architectural Syntheses.</p>
            </footer>

          </div>
        </article>
      </div>
    </div>
  );
};

export default PaperSpiritualAI;
