import { Sparkles, Phone, Mail, Award } from "lucide-react";

export default function Header() {
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-primary-950/80 backdrop-blur-md border-b border-primary-900/60">
      <div className="max-w-6xl mx-auto px-4 h-16 sm:h-20 flex items-center justify-between">
        
        {/* Logo / Title */}
        <div 
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="flex items-center gap-2 cursor-pointer group"
          id="header-logo"
        >
          <div className="w-9 h-9 rounded-lg bg-accent-500/10 border border-accent-500/25 flex items-center justify-center text-accent-400 group-hover:bg-accent-500/15 transition-all">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <span className="font-extrabold text-white tracking-tight font-display text-sm sm:text-base leading-none block">
              Nila Rajkumar
            </span>
            <span className="text-[10px] sm:text-[11px] text-accent-400 tracking-wider font-semibold uppercase leading-none block mt-0.5">
              Debate & Public Speaking
            </span>
          </div>
        </div>

        {/* Desktop Anchor Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm">
          <button 
            onClick={() => scrollToSection("about-accomplishments")} 
            className="text-primary-300 hover:text-white transition-colors cursor-pointer"
          >
            About & Achievements
          </button>
          <button 
            onClick={() => scrollToSection("faq-section")} 
            className="text-primary-300 hover:text-white transition-colors cursor-pointer"
          >
            Q&A
          </button>
          <button 
            onClick={() => scrollToSection("pricing-section")} 
            className="text-primary-300 hover:text-white transition-colors cursor-pointer"
          >
            Pricing
          </button>
          <button 
            onClick={() => window.dispatchEvent(new CustomEvent("open-chat-assistant"))} 
            className="bg-accent-500 hover:bg-accent-400 text-primary-950 font-bold px-4 py-2 rounded-lg transition-all cursor-pointer shadow-md shadow-accent-500/10"
          >
            Sign Up
          </button>
        </nav>

        {/* Mobile Contact Shortcuts */}
        <div className="flex md:hidden items-center gap-3">
          <a
            href="tel:4084622029"
            className="p-2 rounded-lg bg-primary-900 border border-primary-800 text-primary-300 hover:text-white transition-colors"
            title="Call Nila"
          >
            <Phone className="w-4 h-4" />
          </a>
          <a
            href="mailto:itsnila24@gmail.com"
            className="p-2 rounded-lg bg-primary-900 border border-primary-800 text-primary-300 hover:text-white transition-colors"
            title="Email Nila"
          >
            <Mail className="w-4 h-4" />
          </a>
          <button
            onClick={() => window.dispatchEvent(new CustomEvent("open-chat-assistant"))}
            className="bg-accent-500 text-primary-950 font-semibold px-3 py-1.5 rounded-lg text-xs cursor-pointer"
          >
            Sign Up
          </button>
        </div>

      </div>
    </header>
  );
}
