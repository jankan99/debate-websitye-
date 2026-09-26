import { motion } from "motion/react";
import { ArrowRight, Sparkles, Trophy, BookOpen, Volume2 } from "lucide-react";

export default function HeroSection() {
  const scrollToChat = () => {
    window.dispatchEvent(new CustomEvent("open-chat-assistant"));
  };

  return (
    <section className="relative pt-32 pb-24 md:pt-40 md:pb-36 px-4 overflow-hidden bg-primary-950">
      {/* Dynamic background lights */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[10%] w-[35rem] h-[35rem] bg-primary-700/10 rounded-full blur-[120px]" />
        <div className="absolute top-[20%] right-[5%] w-[25rem] h-[25rem] bg-accent-500/5 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-5xl mx-auto text-center relative z-10">
        
        {/* Accent Tag */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-accent-500/10 text-accent-400 border border-accent-500/20 mb-6 tracking-wide uppercase font-display">
          <Sparkles className="w-3.5 h-3.5" />
          Elite Public Speaking & Debate Coaching
        </div>

        {/* Headline */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white font-display tracking-tight leading-[1.1] mb-6">
          Empowering the Next Generation of <br className="hidden md:inline" />
          <span className="bg-gradient-to-r from-accent-400 via-accent-300 to-accent-500 bg-clip-text text-transparent">
            Champions & Orators
          </span>
        </h1>

        {/* Subheading */}
        <p className="text-base sm:text-lg md:text-xl text-primary-300 max-w-3xl mx-auto mb-10 leading-relaxed font-sans font-light">
          Master the art of competitive speech with personalized instruction from 
          <span className="text-white font-semibold"> Nila Rajkumar</span>. 
          Specializing in elite coaching for <span className="text-accent-300 font-medium">Student Congress</span> and <span className="text-accent-300 font-medium">Declamation</span>.
        </p>

        {/* Call to Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={scrollToChat}
            className="w-full sm:w-auto px-8 py-4 rounded-xl text-primary-950 font-bold font-display bg-accent-400 hover:bg-accent-300 transition-all shadow-lg shadow-accent-500/20 hover:shadow-accent-500/30 flex items-center justify-center gap-2 group cursor-pointer"
            id="btn-hero-signup"
          >
            Schedule a Free Consultation
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
          
          <a
            href="#about-accomplishments"
            className="w-full sm:w-auto px-8 py-4 rounded-xl text-white font-semibold font-display bg-primary-900/60 hover:bg-primary-850 border border-primary-800/80 transition-all flex items-center justify-center gap-2 hover:border-primary-700"
          >
            Explore Accomplishments
          </a>
        </div>

        {/* Small Feature Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-20 max-w-4xl mx-auto border-t border-primary-900 pt-12">
          <div className="flex items-center gap-3 justify-center sm:justify-start">
            <div className="w-10 h-10 rounded-lg bg-primary-900/80 border border-primary-800 flex items-center justify-center text-accent-400 flex-shrink-0">
              <Trophy className="w-5 h-5" />
            </div>
            <div className="text-left">
              <h3 className="text-xs font-semibold text-primary-400 uppercase tracking-wider">Proven Results</h3>
              <p className="text-sm text-white font-medium">National Medalist Coaching</p>
            </div>
          </div>

          <div className="flex items-center gap-3 justify-center sm:justify-start">
            <div className="w-10 h-10 rounded-lg bg-primary-900/80 border border-primary-800 flex items-center justify-center text-accent-400 flex-shrink-0">
              <BookOpen className="w-5 h-5" />
            </div>
            <div className="text-left">
              <h3 className="text-xs font-semibold text-primary-400 uppercase tracking-wider">Expertise</h3>
              <p className="text-sm text-white font-medium">Congress & Declamation</p>
            </div>
          </div>

          <div className="flex items-center gap-3 justify-center sm:justify-start">
            <div className="w-10 h-10 rounded-lg bg-primary-900/80 border border-primary-800 flex items-center justify-center text-accent-400 flex-shrink-0">
              <Volume2 className="w-5 h-5" />
            </div>
            <div className="text-left">
              <h3 className="text-xs font-semibold text-primary-400 uppercase tracking-wider">Approach</h3>
              <p className="text-sm text-white font-medium">1-on-1 Practice & Drills</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
