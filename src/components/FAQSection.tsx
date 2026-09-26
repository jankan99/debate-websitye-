import { useState } from "react";
import { Plus, Minus, HelpCircle, Sparkles } from "lucide-react";
import { FAQItem } from "../types";

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs: FAQItem[] = [
    {
      question: "What events does Nila coach?",
      answer: "Nila specializes in Student Congress and Declamation, helping students improve argumentation, structural outlining, rhetorical delivery, and competitive strategy."
    },
    {
      question: "Who is this tutoring for?",
      answer: "Students of any experience level — from middle school beginners just starting out, to competitive high schoolers aiming to qualify or place at state and national tournaments."
    },
    {
      question: "How are sessions structured?",
      answer: "Each session is one-on-one (or small group, if requested) and focused completely on the student's current needs, including speech selection/writing, rhetorical delivery, and live practice rounds with active feedback and critiques."
    },
    {
      question: "How much does tutoring cost?",
      answer: "Sessions are priced at an affordable rate of $30 per hour. There are no long-term contracts or hidden signup fees."
    },
    {
      question: "How do I sign up?",
      answer: "Simply click the floating chat button in the bottom-right corner to open our interactive assistant! The assistant can answer any questions and will collect your info to register your first session. Nila will then reach out to finalize the details."
    }
  ];

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq-section" className="py-24 px-4 bg-primary-950">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-primary-900 text-primary-300 border border-primary-800 mb-4 tracking-wider uppercase font-display">
            Got Questions?
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white font-display tracking-tight mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-base text-primary-300 max-w-xl mx-auto">
            Everything you need to know about scheduling, events, lesson structures, and pricing.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className={`border rounded-2xl transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? "bg-primary-900/40 border-accent-500/30 shadow-lg shadow-accent-500/5"
                    : "bg-primary-900/10 border-primary-800 hover:border-primary-750"
                }`}
              >
                <button
                  onClick={() => toggleAccordion(index)}
                  className="w-full flex items-center justify-between px-6 py-5 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-500 transition-colors cursor-pointer"
                >
                  <span className="font-semibold text-white text-base md:text-lg flex items-center gap-3">
                    <HelpCircle className={`w-5 h-5 flex-shrink-0 transition-colors ${isOpen ? "text-accent-400" : "text-primary-500"}`} />
                    {faq.question}
                  </span>
                  <div className={`p-1.5 rounded-lg transition-all ${isOpen ? "bg-accent-500/10 text-accent-400" : "bg-primary-800 text-primary-400"}`}>
                    {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </div>
                </button>

                <div
                  className={`transition-all duration-300 ease-in-out overflow-hidden ${
                    isOpen ? "max-h-[300px] border-t border-primary-800/40" : "max-h-0"
                  }`}
                >
                  <p className="px-6 py-5 text-sm md:text-base text-primary-200 leading-relaxed font-light">
                    {faq.answer}
                  </p>
                </div>
              </div>
            );
          })}

          {/* Placeholder FAQ items for future additions */}
          <div className="border border-dashed border-primary-800/60 bg-primary-900/5 rounded-2xl p-5 flex items-center justify-between opacity-50 hover:opacity-75 transition-opacity">
            <span className="text-sm font-semibold text-primary-400 flex items-center gap-3">
              <Sparkles className="w-4 h-4 text-primary-500" />
              Additional Question (Coming soon)
            </span>
            <span className="text-[10px] text-primary-500 uppercase tracking-widest font-semibold bg-primary-900/50 px-2 py-1 rounded-md border border-primary-800/40">
              Future Update
            </span>
          </div>

          <div className="border border-dashed border-primary-800/60 bg-primary-900/5 rounded-2xl p-5 flex items-center justify-between opacity-50 hover:opacity-75 transition-opacity">
            <span className="text-sm font-semibold text-primary-400 flex items-center gap-3">
              <Sparkles className="w-4 h-4 text-primary-500" />
              Additional Question (Coming soon)
            </span>
            <span className="text-[10px] text-primary-500 uppercase tracking-widest font-semibold bg-primary-900/50 px-2 py-1 rounded-md border border-primary-800/40">
              Future Update
            </span>
          </div>
        </div>

      </div>
    </section>
  );
}
