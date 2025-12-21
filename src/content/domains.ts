import { Code, Globe, Smartphone, Terminal } from "lucide-react";

export const DOMAINS = [
  {
    id: "web-dev" as const,
    title: "Web Development",
    description: "Build modern web applications.",
    icon: Globe,
    resources: {
      title: "Your First Web App: From Zero to Launch in 15 Days",
      status: "available" as const,
    }
  },
  {
    id: "app-dev" as const,
    title: "App Development",
    description: "Create native and cross-platform apps.",
    icon: Smartphone,
    resources: {
      title: "Your First Flutter App in Just 1 Week",
      status: "unavailable" as const,
    }
  },
  {
    id: "ml-ai" as const,
    title: "Machine Learning",
    description: "Explore AI and data science.",
    icon: Code,
    resources: {
      title: "AI Dev Fast-Track: From Idea to App in 10 Days",
      status: "unavailable" as const,
    }
  },
  {
    id: "cyber-security" as const,
    title: "Cyber Security",
    description: "Protect systems and networks.",
    icon: Terminal,
    resources: {
      title: "Become a Cyber Defender in 2 Weeks",
      status: "available" as const,
    }
  },
];

export type DomainName = typeof DOMAINS[number]["id"]