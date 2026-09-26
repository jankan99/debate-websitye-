import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Send, 
  Sparkles, 
  User, 
  Calendar, 
  BookOpen, 
  Award, 
  RotateCcw, 
  CheckCircle2, 
  X, 
  MessageSquare, 
  Check, 
  Clock, 
  XCircle 
} from "lucide-react";
import { Message, CollectedInfo } from "../types";

export default function ChatbotDrawer() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "drawer-initial",
      role: "assistant",
      content: "Hi there! I'm Nila's scheduling and info assistant. I can answer any questions you have about Nila's competitive achievements, pricing, schedule (Mon-Fri 3-8 PM), or coaching methodology, as well as help you sign up for tutoring in Student Congress or Declamation. What can I help you with today?",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [unread, setUnread] = useState(true);

  const [collectedInfo, setCollectedInfo] = useState<CollectedInfo>({
    name: null,
    event: null,
    experienceLevel: null,
    availability: null,
    isCompleted: false
  });

  const chatEndRef = useRef<HTMLDivElement>(null);

  // Listen for global custom events to open the chat drawer
  useEffect(() => {
    const handleOpen = () => {
      setIsOpen(true);
      setUnread(false);
    };
    window.addEventListener("open-chat-assistant", handleOpen);
    return () => {
      window.removeEventListener("open-chat-assistant", handleOpen);
    };
  }, []);

  // Auto-scroll to bottom of chat
  useEffect(() => {
    if (isOpen) {
      chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, loading, isOpen]);

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim() || loading) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);
    setError(null);

    const chatHistory = messages.map(msg => ({
      role: msg.role,
      content: msg.content
    }));

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: textToSend,
          history: chatHistory
        }),
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.error || `Server returned ${response.status}`);
      }

      const data = await response.json();
      
      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: data.message,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages((prev) => [...prev, botMsg]);
      
      if (data.collectedInfo) {
        setCollectedInfo(data.collectedInfo);
      }
    } catch (err: any) {
      console.error(err);
      setError(
        err.message || "Failed to reach scheduling assistant. Please check your network or try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSendMessage(input);
    }
  };

  const resetChat = () => {
    setMessages([
      {
        id: "drawer-initial",
        role: "assistant",
        content: "Hi there! I'm Nila's scheduling and info assistant. I can answer any questions you have about Nila's competitive achievements, pricing, schedule (Mon-Fri 3-8 PM), or coaching methodology, as well as help you sign up for tutoring in Student Congress or Declamation. What can I help you with today?",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
    setInput("");
    setLoading(false);
    setError(null);
    setCollectedInfo({
      name: null,
      event: null,
      experienceLevel: null,
      availability: null,
      isCompleted: false
    });
  };

  const handleOpenDrawer = () => {
    setIsOpen(true);
    setUnread(false);
  };

  const selectSuggestion = (suggestion: string) => {
    handleSendMessage(suggestion);
  };

  return (
    <>
      {/* Floating Action Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={handleOpenDrawer}
          className="relative group w-14 h-14 bg-accent-500 hover:bg-accent-400 text-primary-950 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer border border-accent-400/30"
          id="floating-chat-bubble"
        >
          {unread && (
            <span className="absolute top-0 right-0 flex h-4 w-4">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-4 w-4 bg-rose-500 text-[10px] text-white font-bold items-center justify-center">1</span>
            </span>
          )}
          <MessageSquare className="w-6 h-6 transition-transform group-hover:rotate-6" />
          
          {/* Tooltip */}
          <span className="absolute right-16 bg-primary-900 border border-primary-800 text-white text-xs px-3 py-1.5 rounded-xl shadow-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap hidden sm:inline-block">
            Ask AI Assistant
          </span>
        </button>
      </div>

      {/* Drawer Overlay & Content */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black z-50"
            />

            {/* Sidebar Slide-over Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-full max-w-md bg-primary-950 border-l border-primary-900 shadow-2xl z-50 flex flex-col"
            >
              {/* Drawer Header */}
              <div className="bg-primary-900/95 px-6 py-4 border-b border-primary-800/80 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-accent-500/15 border border-accent-500/30 flex items-center justify-center text-accent-400">
                    <Sparkles className="w-5 h-5 animate-pulse" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-white">Nila's Scheduling Assistant</h3>
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      <span className="text-xs text-primary-400">Online | Ready to Help</span>
                    </div>
                  </div>
                </div>
                
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-lg hover:bg-primary-800 text-primary-400 hover:text-white transition-colors"
                  id="btn-close-drawer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Chat Area & Split Layout with Mini-Progress */}
              <div className="flex-1 overflow-y-auto p-5 space-y-4 flex flex-col">
                
                {/* Mini Schedule Info Block */}
                <div className="p-3 bg-primary-900/40 border border-primary-800/60 rounded-xl text-xs text-primary-300 space-y-1">
                  <div className="flex items-center gap-1.5 text-accent-300 font-medium">
                    <Clock className="w-3.5 h-3.5" />
                    <span>Nila's Tutoring Schedule:</span>
                  </div>
                  <p>Monday - Friday, 3:00 PM - 8:00 PM ($30/hr)</p>
                </div>

                {/* Chat Messages */}
                <div className="flex-1 space-y-4">
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[85%] rounded-2xl px-4 py-3 shadow-md ${
                          msg.role === "user"
                            ? "bg-accent-600 text-white rounded-tr-none text-sm"
                            : "bg-primary-900 text-primary-100 border border-primary-850 rounded-tl-none text-sm"
                        }`}
                      >
                        <p className="whitespace-pre-wrap leading-relaxed">{msg.content}</p>
                        <span className="block text-[9px] opacity-60 text-right mt-1.5">
                          {msg.timestamp}
                        </span>
                      </div>
                    </div>
                  ))}

                  {loading && (
                    <div className="flex justify-start">
                      <div className="bg-primary-900 text-primary-100 border border-primary-850 rounded-2xl rounded-tl-none px-4 py-3 shadow-md flex items-center gap-2">
                        <span className="text-xs text-primary-400">Assistant is typing</span>
                        <div className="flex gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-accent-400 animate-bounce delay-100" />
                          <span className="w-1.5 h-1.5 rounded-full bg-accent-400 animate-bounce delay-200" />
                          <span className="w-1.5 h-1.5 rounded-full bg-accent-400 animate-bounce delay-300" />
                        </div>
                      </div>
                    </div>
                  )}

                  {error && (
                    <div className="p-3 rounded-xl bg-rose-950/40 border border-rose-500/20 text-rose-300 text-xs flex items-start gap-2">
                      <XCircle className="w-4 h-4 mt-0.5 flex-shrink-0 text-rose-400" />
                      <p>{error}</p>
                    </div>
                  )}

                  <div ref={chatEndRef} />
                </div>

                {/* Progress Details inside Drawer */}
                <div className="mt-auto border-t border-primary-900/60 pt-4 space-y-3">
                  <div className="flex justify-between items-center text-[11px] text-primary-400">
                    <span className="font-semibold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-accent-400" />
                      Registration Checklist
                    </span>
                    <span>
                      {Object.values(collectedInfo).filter(v => v !== null && v !== false).length} of 4
                    </span>
                  </div>
                  
                  {/* Progress Items Grid */}
                  <div className="grid grid-cols-2 gap-2 text-[10px]">
                    <div className={`p-1.5 rounded-lg border ${collectedInfo.name ? 'bg-emerald-950/20 border-emerald-500/20 text-emerald-300' : 'bg-primary-900/40 border-primary-850 text-primary-400'}`}>
                      Name: {collectedInfo.name ? "✓" : "—"}
                    </div>
                    <div className={`p-1.5 rounded-lg border ${collectedInfo.event ? 'bg-emerald-950/20 border-emerald-500/20 text-emerald-300' : 'bg-primary-900/40 border-primary-850 text-primary-400'}`}>
                      Event: {collectedInfo.event ? "✓" : "—"}
                    </div>
                    <div className={`p-1.5 rounded-lg border ${collectedInfo.experienceLevel ? 'bg-emerald-950/20 border-emerald-500/20 text-emerald-300' : 'bg-primary-900/40 border-primary-850 text-primary-400'}`}>
                      Level: {collectedInfo.experienceLevel ? "✓" : "—"}
                    </div>
                    <div className={`p-1.5 rounded-lg border ${collectedInfo.availability ? 'bg-emerald-950/20 border-emerald-500/20 text-emerald-300' : 'bg-primary-900/40 border-primary-850 text-primary-400'}`}>
                      Times: {collectedInfo.availability ? "✓" : "—"}
                    </div>
                  </div>

                  {collectedInfo.isCompleted && (
                    <div className="p-2.5 bg-emerald-950/40 border border-emerald-500/35 rounded-xl text-[11px] text-emerald-300">
                      🎉 Registration complete! Nila will contact you at your email/phone shortly.
                    </div>
                  )}
                </div>

              </div>

              {/* Suggestions Quick Chips */}
              {messages.length === 1 && (
                <div className="px-5 py-3 bg-primary-950 border-t border-primary-900/60 flex flex-wrap gap-2">
                  <button
                    onClick={() => selectSuggestion("What are Nila's debate achievements?")}
                    className="text-[11px] bg-primary-900 hover:bg-primary-850 border border-primary-800 text-primary-300 hover:text-white px-2.5 py-1.5 rounded-full transition-all"
                  >
                    Nila's Achievements?
                  </button>
                  <button
                    onClick={() => selectSuggestion("Can you tell me about the coaching schedule?")}
                    className="text-[11px] bg-primary-900 hover:bg-primary-850 border border-primary-800 text-primary-300 hover:text-white px-2.5 py-1.5 rounded-full transition-all"
                  >
                    Schedule & Times?
                  </button>
                  <button
                    onClick={() => selectSuggestion("I would like to sign up for tutoring.")}
                    className="text-[11px] bg-primary-900 hover:bg-primary-850 border border-primary-800 text-primary-300 hover:text-white px-2.5 py-1.5 rounded-full transition-all"
                  >
                    I want to sign up
                  </button>
                </div>
              )}

              {/* Drawer Chat Input */}
              <div className="p-4 bg-primary-900/90 border-t border-primary-800 flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Ask a question or register..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyPress}
                  disabled={loading}
                  className="flex-1 bg-primary-950 border border-primary-800 hover:border-primary-700 focus:border-accent-500 text-xs text-white px-3.5 py-3 rounded-xl focus:outline-none focus:ring-1 focus:ring-accent-500 transition-all"
                  id="drawer-chat-input"
                />
                <button
                  onClick={() => handleSendMessage(input)}
                  disabled={!input.trim() || loading}
                  className="bg-accent-600 hover:bg-accent-500 disabled:bg-primary-800 text-white p-3 rounded-xl transition-all flex items-center justify-center shadow-lg cursor-pointer"
                  id="drawer-chat-send"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
                
                {/* Reset Option inside Drawer Input bar */}
                <button
                  onClick={resetChat}
                  className="p-3 rounded-xl bg-primary-850 hover:bg-primary-800 text-primary-400 hover:text-white border border-primary-800/80 transition-all flex items-center justify-center"
                  title="Reset conversation"
                  id="drawer-chat-reset"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              </div>

            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
