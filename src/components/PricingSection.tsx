import { Check, Sparkles, HelpCircle, ShieldCheck, HelpCircle as Help } from "lucide-react";

export default function PricingSection() {
  const scrollToChat = () => {
    window.dispatchEvent(new CustomEvent("open-chat-assistant"));
  };

  const inclusions = [
    "Personalized 1-on-1 coaching customized to your skill level",
    "Tailored speech writing and speech structural drafting support",
    "Competitive strategy drills & live practice rounds with critiques",
    "Flexible scheduling via our automated chatbot",
    "Option for small group sessions (upon requested/joint signup)",
    "No long-term contracts or enrollment fees — pay-as-you-go"
  ];

  return (
    <section id="pricing-section" className="py-24 px-4 bg-primary-950/80 border-t border-primary-900/60 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[30rem] h-[30rem] bg-accent-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-accent-500/10 text-accent-400 border border-accent-500/20 mb-4 tracking-wider uppercase font-display">
            Transparent Pricing
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white font-display tracking-tight mb-4">
            Affordable Elite Instruction
          </h2>
          <p className="text-base text-primary-300 max-w-xl mx-auto">
            High-caliber coaching shouldn't be out of reach. Get customized, competition-winning strategy sessions at a single flat rate.
          </p>
        </div>

        {/* Pricing Card Block */}
        <div className="max-w-md mx-auto">
          <div className="bg-gradient-to-br from-primary-900 to-primary-850 border border-accent-500/30 rounded-3xl p-8 shadow-2xl relative">
            
            {/* Top Tag */}
            <div className="absolute top-0 right-1/2 translate-x-1/2 -translate-y-1/2 px-4 py-1 rounded-full text-xs font-bold bg-accent-400 text-primary-950 shadow-md flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              Flexible Pay-As-You-Go
            </div>

            <div className="text-center mb-8 mt-4">
              <h3 className="text-xl font-bold text-white font-display uppercase tracking-wider mb-2">
                Standard Tutoring
              </h3>
              <p className="text-xs text-primary-400 mb-6">Available in 1-on-1 or small group configurations</p>
              
              <div className="flex items-baseline justify-center gap-1.5">
                <span className="text-5xl md:text-6xl font-extrabold text-white font-display">$30</span>
                <span className="text-lg text-primary-300 font-medium">/ hour</span>
              </div>
            </div>

            {/* Inclusions List */}
            <div className="space-y-4 mb-8">
              {inclusions.map((inc, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-accent-500/10 text-accent-400 flex items-center justify-center flex-shrink-0 mt-0.5 border border-accent-500/20">
                    <Check className="w-3 h-3" />
                  </div>
                  <span className="text-sm text-primary-100">{inc}</span>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <button
              onClick={scrollToChat}
              className="w-full py-4 rounded-xl text-primary-950 font-bold font-display bg-accent-400 hover:bg-accent-300 transition-all shadow-lg hover:shadow-accent-500/20 text-center flex items-center justify-center cursor-pointer"
              id="btn-pricing-cta"
            >
              Sign Up Now
            </button>

            {/* Small reassurance underneath */}
            <p className="text-[11px] text-center text-primary-400 mt-4 font-light">
              Sessions can be held online or in person (local to South Bay Area).
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
