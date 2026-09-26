export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

export interface CollectedInfo {
  name: string | null;
  event: string | null;
  experienceLevel: string | null;
  availability: string | null;
  isCompleted: boolean;
}

export interface Achievement {
  title: string;
  detail: string;
  iconType: "medal" | "award" | "trophy" | "star" | "placeholder";
}

export interface FAQItem {
  question: string;
  answer: string;
}
