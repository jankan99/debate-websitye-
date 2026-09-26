import { Trophy, Medal, Award, Sparkles, BookOpen, Volume2 } from "lucide-react";

interface AchievementCardProps {
  rank: string;
  competition: string;
  isPlaceholder?: boolean;
}

function AchievementCard({ rank, competition, isPlaceholder = false }: AchievementCardProps) {
  if (isPlaceholder) {
    return (
      <div className="bg-primary-900/20 border border-dashed border-primary-800/80 rounded-2xl p-6 flex flex-col justify-center items-center text-center min-h-[160px] group transition-all hover:border-accent-500/30">
        <div className="w-10 h-10 rounded-full border border-dashed border-primary-800 flex items-center justify-center text-primary-500 group-hover:text-accent-400 group-hover:border-accent-500/40 transition-colors mb-3">
          <Sparkles className="w-5 h-5" />
        </div>
        <h3 className="text-sm font-semibold text-primary-400">Additional Achievement</h3>
        <p className="text-xs text-primary-500 mt-1">Pending upcoming tournament results</p>
      </div>
    );
  }

  // Choose colors/borders based on placement
  const isNationals = competition.toLowerCase().includes("nationals");

  return (
    <div className="bg-primary-900/40 backdrop-blur-sm border border-primary-800/80 rounded-2xl p-6 transition-all duration-300 hover:scale-[1.02] hover:border-accent-500/30 hover:shadow-lg hover:shadow-accent-500/5 group">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-2.5 rounded-xl ${
          isNationals ? "bg-accent-500/10 text-accent-400 border border-accent-500/20" : "bg-primary-800/60 text-primary-300 border border-primary-750"
        }`}>
          {isNationals ? <Trophy className="w-5 h-5 text-accent-400" /> : <Medal className="w-5 h-5 text-primary-300" />}
        </div>
        <span className="text-[10px] uppercase font-semibold tracking-wider text-primary-500 group-hover:text-primary-400 transition-colors">
          Forensics Event
        </span>
      </div>
      <h3 className="text-xl font-bold text-white font-display leading-tight mb-2">
        {rank}
      </h3>
      <p className="text-sm text-primary-300">
        {competition}
      </p>
    </div>
  );
}

export default function AboutSection() {
  return (
    <section id="about-accomplishments" className="py-24 px-4 bg-primary-950/80 border-t border-primary-900/60">
      <div className="max-w-6xl mx-auto">
        
        {/* Top: Header and Bio Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
          
          {/* Left: Section Header & Biography */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-primary-900 text-primary-300 border border-primary-800 mb-4 tracking-wider uppercase font-display">
                Meet Nila Rajkumar
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-white font-display tracking-tight">
                Empathetic Coach. Elite Competitor.
              </h2>
            </div>
            
            <p className="text-base text-primary-200 leading-relaxed font-light">
              Hello! I'm Nila Rajkumar, an experienced competitor and debate coach passionate about helping students find their voice and excel under pressure. Public speaking is more than just memorizing lines—it is about structuring powerful arguments, mastering dynamic delivery, and projecting confidence.
            </p>
            
            <p className="text-base text-primary-200 leading-relaxed font-light">
              Through my student-run coaching service, I share elite strategies, script selection techniques, and rigorous practice drill routines that have allowed my students and myself to reach final rounds of top-tier tournaments across the country.
            </p>

            {/* Note on focus */}
            <div className="p-4 rounded-xl bg-primary-900/30 border border-primary-800/50 flex gap-3.5 items-start">
              <div className="p-1.5 rounded-lg bg-accent-500/10 text-accent-400 mt-1">
                <Award className="w-4 h-4" />
              </div>
              <p className="text-xs text-primary-300 leading-relaxed">
                <span className="font-semibold text-white">Focus Area:</span> I specialize in and focus primarily on coaching <span className="text-accent-300 font-medium">Student Congress</span> (parliamentary debate, legislative bill writing, and chamber presiding) and <span className="text-accent-300 font-medium">Declamation</span> (delivery style, text analysis, and emotional pacing).
              </p>
            </div>
          </div>

          {/* Right: Elegant visual placeholder representation of Nila */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-primary-900 to-primary-850 p-8 border border-primary-800/80 shadow-2xl flex flex-col justify-between min-h-[320px]">
              <div className="absolute top-0 right-0 w-32 h-32 bg-accent-500/5 rounded-full blur-2xl" />
              
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-accent-500/10 border border-accent-500/20 flex items-center justify-center text-accent-400">
                  <Trophy className="w-6 h-6 animate-pulse" />
                </div>
                <h3 className="text-2xl font-bold text-white font-display">Student-Run, Results-Oriented</h3>
                <p className="text-sm text-primary-300 leading-relaxed">
                  "By learning from an active competitor, students gain a unique edge. I understand exactly what modern judges look for because I face them myself at tournaments every month."
                </p>
              </div>

              <div className="border-t border-primary-800/80 pt-4 flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-white">Nila Rajkumar</h4>
                  <p className="text-xs text-primary-400">Founder & Head Coach</p>
                </div>
                <span className="text-xs bg-accent-500/10 text-accent-400 px-3 py-1 rounded-full border border-accent-500/20 font-medium">
                  3x National Medalist
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom: Achievements Grid */}
        <div>
          <div className="mb-8">
            <h3 className="text-lg font-bold text-white font-display tracking-wide uppercase">
              Competitive Milestones
            </h3>
            <p className="text-xs text-primary-400">Selected career highlights and placements</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            <AchievementCard 
              rank="3x Bronze Medalist" 
              competition="NSDA National Tournament" 
            />
            <AchievementCard 
              rank="6th Place Winner" 
              competition="State Speech & Debate Championship" 
            />
            <AchievementCard 
              rank="5th Place Winner" 
              competition="Dempsey Cronin Invitational" 
            />
            <AchievementCard 
              rank="12th Place Finalist" 
              competition="Stanford Debate Invitational" 
            />
            <AchievementCard 
              rank="" 
              competition="" 
              isPlaceholder={true} 
            />
          </div>
        </div>

      </div>
    </section>
  );
}
