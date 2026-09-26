import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import AboutSection from "./components/AboutSection";
import FAQSection from "./components/FAQSection";
import PricingSection from "./components/PricingSection";
import ChatbotDrawer from "./components/ChatbotDrawer";
import { Phone, Mail, Award, Clock } from "lucide-react";

export default function App() {
  return (
    <div className="min-h-screen bg-primary-950 text-white selection:bg-accent-500/30 selection:text-white">
      
      {/* Navigation Header */}
      <Header />

      {/* Main Single Page Content */}
      <main className="relative">
        
        {/* Section 1: Hero Section */}
        <HeroSection />

        {/* Section 2: About / Accomplishments Section */}
        <AboutSection />

        {/* Section 3: Q&A Section */}
        <FAQSection />

        {/* Section 4: Pricing Section */}
        <PricingSection />

      </main>

      {/* Persistent Floating Chat Drawer (Accessible anytime/anywhere) */}
      <ChatbotDrawer />

      {/* Section 6: Footer */}
      <footer className="bg-primary-950 border-t border-primary-900/80 py-12 px-4 relative">
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary-800 to-transparent" />
        
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          
          {/* Left: Brand / Title */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary-900 border border-primary-800 flex items-center justify-center text-accent-400">
              <Award className="w-5.5 h-5.5" />
            </div>
            <div className="text-left">
              <h3 className="font-bold text-white font-display tracking-tight text-base leading-none">
                Nila Rajkumar
              </h3>
              <p className="text-xs text-primary-400 mt-1 leading-none">
                Debate & Public Speaking Tutoring
              </p>
            </div>
          </div>

          {/* Center: Contact Info */}
          <div className="flex flex-col sm:flex-row items-center gap-6 text-sm text-primary-300">
            <a
              href="tel:4084622029"
              className="flex items-center gap-2 hover:text-accent-400 transition-colors group"
            >
              <span className="p-1.5 rounded-lg bg-primary-900 border border-primary-800 group-hover:bg-primary-800 transition-colors">
                <Phone className="w-4 h-4 text-accent-400" />
              </span>
              <span>Phone: 408-462-2029</span>
            </a>

            <a
              href="mailto:itsnila24@gmail.com"
              className="flex items-center gap-2 hover:text-accent-400 transition-colors group"
            >
              <span className="p-1.5 rounded-lg bg-primary-900 border border-primary-800 group-hover:bg-primary-800 transition-colors">
                <Mail className="w-4 h-4 text-accent-400" />
              </span>
              <span>Email: itsnila24@gmail.com</span>
            </a>
          </div>

          {/* Right: Copyright line */}
          <div className="text-center md:text-right text-xs text-primary-500">
            <p>© {new Date().getFullYear()} Nila Rajkumar. All rights reserved.</p>
            <p className="mt-1">Student Congress & Declamation Coaching</p>
          </div>

        </div>
      </footer>

    </div>
  );
}
