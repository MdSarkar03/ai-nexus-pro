// Full content of server/data/seed.js (only stacks, workflows, prompts replaced; rest byte-identical to original)
import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

import Tool from "../models/Tool.js";
import Workflow from "../models/Workflow.js";
import LLMModel from "../models/LLMModel.js";
import Stack from "../models/Stack.js";
import Prompt from "../models/Prompt.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env from the project root (ai-nexus-pro/.env)
dotenv.config({
  path: path.join(__dirname, "../../.env"),
});




const tools = [
  // AI Chatbots & Assistants
  {
    name: "ChatGPT",
    logo: "https://www.google.com/s2/favicons?domain=openai.com&sz=128",
    category: "AI Chatbots & Assistants",
    description: "OpenAI's flagship conversational AI. Versatile for writing, coding, reasoning, and creative tasks.",
    pricing: "Freemium",
    url: "https://chat.openai.com",
    tags: ["chatbot", "general", "multimodal"],
    rating: 4.9,
    featured: true,
    metadata: {
      projectTypes: ["SaaS", "Chatbot", "MVP", "Content Platform"],
      domains: ["General", "Technology", "Marketing"],
      complexity: ["Simple", "Moderate", "Complex"],
      budget: ["Free", "Low", "Medium"],
      teamSize: ["Solo", "Small", "Medium", "Large"],
      deployment: ["Cloud", "Any"],
      securityLevel: ["Standard"],
    },
  },
  {
    name: "Claude",
    logo: "https://www.google.com/s2/favicons?domain=claude.ai&sz=128",
    category: "AI Chatbots & Assistants",
    description: "Anthropic's helpful and harmless AI assistant, excels at long-context analysis and careful reasoning.",
    pricing: "Freemium",
    url: "https://claude.ai",
    tags: ["chatbot", "analysis", "writing"],
    rating: 4.8,
    featured: true,
    metadata: {
      projectTypes: ["SaaS", "Enterprise Software", "Research Project", "MVP"],
      domains: ["General", "Technology", "Education"],
      complexity: ["Moderate", "Complex"],
      budget: ["Free", "Low", "Medium"],
      teamSize: ["Solo", "Small", "Medium", "Large"],
      deployment: ["Cloud", "Any"],
      securityLevel: ["Standard", "High"],
    },
  },
  {
    name: "Google Gemini",
    logo: "https://www.google.com/s2/favicons?domain=gemini.google.com&sz=128",
    category: "AI Chatbots & Assistants",
    description: "Google's multimodal AI integrated with search, YouTube, and Google services.",
    pricing: "Freemium",
    url: "https://gemini.google.com",
    tags: ["chatbot", "multimodal", "google"],
    rating: 4.7,
    featured: true,
    metadata: {
      projectTypes: ["SaaS", "MVP", "Content Platform"],
      domains: ["General", "Technology"],
      complexity: ["Simple", "Moderate", "Complex"],
      budget: ["Free", "Low", "Medium"],
      teamSize: ["Solo", "Small", "Medium", "Large"],
      deployment: ["Cloud", "Any"],
      securityLevel: ["Standard"],
    },
  },
  {
    name: "Grok",
    logo: "https://www.google.com/s2/favicons?domain=x.ai&sz=128",
    category: "AI Chatbots & Assistants",
    description: "xAI's maximally truthful AI with real-time knowledge from X platform.",
    pricing: "Freemium",
    url: "https://grok.x.ai",
    tags: ["chatbot", "reasoning", "real-time"],
    rating: 4.6,
    featured: true,
    metadata: {
      projectTypes: ["SaaS", "MVP"],
      domains: ["General", "Technology", "Media"],
      complexity: ["Simple", "Moderate"],
      budget: ["Free", "Low", "Medium"],
      teamSize: ["Solo", "Small"],
      deployment: ["Cloud", "Any"],
      securityLevel: ["Standard"],
    },
  },

  // AI Writing Tools
  {
    name: "Jasper AI",
    logo: "https://www.google.com/s2/favicons?domain=jasper.ai&sz=128",
    category: "AI Writing Tools",
    description: "Enterprise AI content platform for marketing teams with brand voice customization.",
    pricing: "Paid",
    url: "https://jasper.ai",
    tags: ["writing", "marketing", "seo"],
    rating: 4.6,
    metadata: {
      projectTypes: ["Marketing Campaign", "Content Platform", "E-commerce Store"],
      domains: ["Marketing", "E-commerce", "General"],
      complexity: ["Simple", "Moderate"],
      budget: ["Medium", "High"],
      teamSize: ["Small", "Medium", "Large"],
      deployment: ["Cloud"],
      securityLevel: ["Standard"],
    },
  },
  {
    name: "Copy.ai",
    logo: "https://www.google.com/s2/favicons?domain=copy.ai&sz=128",
    category: "AI Writing Tools",
    description: "AI-powered copywriting for blogs, ads, emails, and social media.",
    pricing: "Freemium",
    url: "https://copy.ai",
    tags: ["copywriting", "marketing"],
    rating: 4.5,
    metadata: {
      projectTypes: ["Marketing Campaign", "Content Platform"],
      domains: ["Marketing", "General", "E-commerce"],
      complexity: ["Simple"],
      budget: ["Free", "Low", "Medium"],
      teamSize: ["Solo", "Small", "Medium"],
      deployment: ["Cloud"],
      securityLevel: ["Standard"],
    },
  },
  {
    name: "Writesonic",
    logo: "https://www.google.com/s2/favicons?domain=writesonic.com&sz=128",
    category: "AI Writing Tools",
    description: "Fast AI writer with SEO optimization, article generator, and chatbot features.",
    pricing: "Freemium",
    url: "https://writesonic.com",
    tags: ["writing", "seo", "articles"],
    rating: 4.4,
    metadata: {
      projectTypes: ["Content Platform", "Marketing Campaign"],
      domains: ["Marketing", "General"],
      complexity: ["Simple"],
      budget: ["Free", "Low", "Medium"],
      teamSize: ["Solo", "Small", "Medium"],
      deployment: ["Cloud"],
      securityLevel: ["Standard"],
    },
  },

  // AI Coding Assistants
  {
    name: "GitHub Copilot",
    logo: "https://www.google.com/s2/favicons?domain=github.com&sz=128",
    category: "AI Coding Assistants",
    description: "AI pair programmer that suggests code in real-time across IDEs.",
    pricing: "Paid",
    url: "https://github.com/features/copilot",
    tags: ["coding", "autocomplete", "github"],
    rating: 4.8,
    featured: true,
    metadata: {
      projectTypes: ["SaaS", "Web App", "API Service", "Enterprise Software", "MVP"],
      domains: ["Technology", "General"],
      complexity: ["Moderate", "Complex"],
      budget: ["Low", "Medium", "High"],
      teamSize: ["Solo", "Small", "Medium", "Large"],
      deployment: ["Any"],
      securityLevel: ["Standard"],
    },
  },
  {
    name: "Cursor",
    logo: "https://www.google.com/s2/favicons?domain=cursor.sh&sz=128",
    category: "AI Coding Assistants",
    description: "AI-first code editor with powerful chat, codebase understanding, and editing.",
    pricing: "Freemium",
    url: "https://cursor.sh",
    tags: ["coding", "editor", "ide"],
    rating: 4.7,
    metadata: {
      projectTypes: ["SaaS", "Web App", "API Service", "MVP"],
      domains: ["Technology", "General"],
      complexity: ["Moderate", "Complex"],
      budget: ["Free", "Low", "Medium"],
      teamSize: ["Solo", "Small", "Medium"],
      deployment: ["Any"],
      securityLevel: ["Standard"],
    },
  },
  {
    name: "Windsurf",
    logo: "https://www.google.com/s2/favicons?domain=codeium.com&sz=128",
    category: "AI Coding Assistants",
    description: "Agentic AI coding experience by Codeium with autonomous capabilities.",
    pricing: "Freemium",
    url: "https://codeium.com/windsurf",
    tags: ["coding", "agentic"],
    rating: 4.5,
    metadata: {
      projectTypes: ["SaaS", "Web App", "MVP"],
      domains: ["Technology", "General"],
      complexity: ["Moderate", "Complex"],
      budget: ["Free", "Low", "Medium"],
      teamSize: ["Solo", "Small"],
      deployment: ["Any"],
      securityLevel: ["Standard"],
    },
  },

  // AI Image Generation
  {
    name: "Midjourney",
    logo: "https://www.google.com/s2/favicons?domain=midjourney.com&sz=128",
    category: "AI Image Generation",
    description: "Leading AI art generator known for artistic, high-quality, and creative visuals.",
    pricing: "Paid",
    url: "https://midjourney.com",
    tags: ["image", "art", "creative"],
    rating: 4.9,
    featured: true,
    metadata: {
      projectTypes: ["Content Platform", "Marketing Campaign", "E-commerce Store"],
      domains: ["Media", "Marketing", "E-commerce", "General"],
      complexity: ["Simple", "Moderate"],
      budget: ["Low", "Medium"],
      teamSize: ["Solo", "Small", "Medium"],
      deployment: ["Cloud"],
      securityLevel: ["Standard"],
    },
  },
  {
    name: "DALL·E",
    logo: "https://www.google.com/s2/favicons?domain=openai.com&sz=128",
    category: "AI Image Generation",
    description: "OpenAI's powerful text-to-image model integrated into ChatGPT.",
    pricing: "Freemium",
    url: "https://openai.com/dall-e-3",
    tags: ["image", "dalle", "openai"],
    rating: 4.7,
    metadata: {
      projectTypes: ["Content Platform", "Marketing Campaign", "E-commerce Store"],
      domains: ["Media", "Marketing", "E-commerce", "General"],
      complexity: ["Simple", "Moderate"],
      budget: ["Free", "Low", "Medium"],
      teamSize: ["Solo", "Small", "Medium"],
      deployment: ["Cloud"],
      securityLevel: ["Standard"],
    },
  },
  {
    name: "Adobe Firefly",
    logo: "https://www.google.com/s2/favicons?domain=adobe.com&sz=128",
    category: "AI Image Generation",
    description: "Adobe's commercially safe AI image generator integrated with Creative Cloud.",
    pricing: "Freemium",
    url: "https://firefly.adobe.com",
    tags: ["image", "adobe", "design"],
    rating: 4.6,
    metadata: {
      projectTypes: ["Content Platform", "Marketing Campaign", "E-commerce Store", "Enterprise Software"],
      domains: ["Media", "Marketing", "E-commerce", "General"],
      complexity: ["Simple", "Moderate"],
      budget: ["Low", "Medium", "High"],
      teamSize: ["Solo", "Small", "Medium", "Large"],
      deployment: ["Cloud"],
      securityLevel: ["Standard"],
    },
  },

  // AI Video Generation & Editing
  {
    name: "Runway",
    logo: "https://www.google.com/s2/favicons?domain=runwayml.com&sz=128",
    category: "AI Video Generation & Editing",
    description: "Professional-grade AI video generation, editing, and motion tools.",
    pricing: "Freemium",
    url: "https://runwayml.com",
    tags: ["video", "generation", "editing"],
    rating: 4.7,
    metadata: {
      projectTypes: ["Content Platform", "Marketing Campaign"],
      domains: ["Media", "Marketing", "General"],
      complexity: ["Moderate"],
      budget: ["Low", "Medium", "High"],
      teamSize: ["Solo", "Small", "Medium"],
      deployment: ["Cloud"],
      securityLevel: ["Standard"],
    },
  },
  {
    name: "Synthesia",
    logo: "https://www.google.com/s2/favicons?domain=synthesia.io&sz=128",
    category: "AI Video Generation & Editing",
    description: "Create realistic AI avatar videos from text scripts for training and marketing.",
    pricing: "Paid",
    url: "https://synthesia.io",
    tags: ["video", "avatar", "presentation"],
    rating: 4.6,
    metadata: {
      projectTypes: ["Content Platform", "Enterprise Software", "HR Platform"],
      domains: ["Media", "Marketing", "HR", "General"],
      complexity: ["Simple", "Moderate"],
      budget: ["Medium", "High"],
      teamSize: ["Small", "Medium", "Large"],
      deployment: ["Cloud"],
      securityLevel: ["Standard"],
    },
  },
  {
    name: "Pika",
    logo: "https://www.google.com/s2/favicons?domain=pika.art&sz=128",
    category: "AI Video Generation & Editing",
    description: "Fast and fun AI video generator for turning text and images into short clips.",
    pricing: "Freemium",
    url: "https://pika.art",
    tags: ["video", "creative"],
    rating: 4.4,
    metadata: {
      projectTypes: ["Content Platform", "Marketing Campaign"],
      domains: ["Media", "Marketing", "General"],
      complexity: ["Simple"],
      budget: ["Free", "Low", "Medium"],
      teamSize: ["Solo", "Small"],
      deployment: ["Cloud"],
      securityLevel: ["Standard"],
    },
  },

  // AI Research & Search
  {
    name: "Perplexity AI",
    logo: "https://www.google.com/s2/favicons?domain=perplexity.ai&sz=128",
    category: "AI Research & Search",
    description: "AI-powered search engine with real-time web access and cited answers.",
    pricing: "Freemium",
    url: "https://perplexity.ai",
    tags: ["research", "search", "citations"],
    rating: 4.8,
    featured: true,
    metadata: {
      projectTypes: ["Research Project", "Marketing Campaign", "Content Platform", "MVP"],
      domains: ["General", "Education", "Marketing", "Technology"],
      complexity: ["Simple", "Moderate"],
      budget: ["Free", "Low", "Medium"],
      teamSize: ["Solo", "Small", "Medium", "Large"],
      deployment: ["Cloud"],
      securityLevel: ["Standard"],
    },
  },
  {
    name: "Elicit",
    logo: "https://www.google.com/s2/favicons?domain=elicit.com&sz=128",
    category: "AI Research & Search",
    description: "AI research assistant for literature review and academic paper analysis.",
    pricing: "Freemium",
    url: "https://elicit.com",
    tags: ["research", "academic"],
    rating: 4.5,
    metadata: {
      projectTypes: ["Research Project"],
      domains: ["Education", "General"],
      complexity: ["Moderate", "Complex"],
      budget: ["Free", "Low"],
      teamSize: ["Solo", "Small"],
      deployment: ["Cloud"],
      securityLevel: ["Standard"],
    },
  },
  {
    name: "Consensus",
    logo: "https://www.google.com/s2/favicons?domain=consensus.app&sz=128",
    category: "AI Research & Search",
    description: "AI search for scientific research with evidence synthesis.",
    pricing: "Freemium",
    url: "https://consensus.app",
    tags: ["research", "science"],
    rating: 4.4,
    metadata: {
      projectTypes: ["Research Project"],
      domains: ["Education", "Healthcare", "General"],
      complexity: ["Moderate", "Complex"],
      budget: ["Free", "Low"],
      teamSize: ["Solo", "Small"],
      deployment: ["Cloud"],
      securityLevel: ["Standard"],
    },
  },

  // Productivity & More
  {
    name: "Notion AI",
    logo: "https://www.google.com/s2/favicons?domain=notion.so&sz=128",
    category: "AI Productivity Tools",
    description: "AI features built into Notion for summarization, writing, and database automation.",
    pricing: "Freemium",
    url: "https://notion.so",
    tags: ["productivity", "notes"],
    rating: 4.7,
    metadata: {
      projectTypes: ["SaaS", "MVP", "Content Platform", "HR Platform", "Research Project"],
      domains: ["General", "Technology", "HR", "Education"],
      complexity: ["Simple", "Moderate"],
      budget: ["Free", "Low", "Medium"],
      teamSize: ["Solo", "Small", "Medium", "Large"],
      deployment: ["Cloud"],
      securityLevel: ["Standard"],
    },
  },
  {
    name: "Gamma",
    logo: "https://www.google.com/s2/favicons?domain=gamma.app&sz=128",
    category: "AI Presentation Tools",
    description: "AI presentation generator that creates beautiful decks from text prompts.",
    pricing: "Freemium",
    url: "https://gamma.app",
    tags: ["presentation", "slides"],
    rating: 4.6,
    metadata: {
      projectTypes: ["Marketing Campaign", "Content Platform", "MVP"],
      domains: ["General", "Marketing", "Education"],
      complexity: ["Simple"],
      budget: ["Free", "Low", "Medium"],
      teamSize: ["Solo", "Small", "Medium"],
      deployment: ["Cloud"],
      securityLevel: ["Standard"],
    },
  },
  {
    name: "ElevenLabs",
    logo: "https://www.google.com/s2/favicons?domain=elevenlabs.io&sz=128",
    category: "AI Voice & Audio Tools",
    description: "Industry-leading AI voice synthesis and cloning with emotional control.",
    pricing: "Freemium",
    url: "https://elevenlabs.io",
    tags: ["voice", "tts", "audio"],
    rating: 4.9,
    metadata: {
      projectTypes: ["Content Platform", "AI Product", "MVP"],
      domains: ["Media", "General", "Technology"],
      complexity: ["Simple", "Moderate"],
      budget: ["Free", "Low", "Medium"],
      teamSize: ["Solo", "Small", "Medium"],
      deployment: ["Cloud"],
      securityLevel: ["Standard"],
    },
  },
  {
    name: "Zapier AI",
    logo: "https://www.google.com/s2/favicons?domain=zapier.com&sz=128",
    category: "AI Automation Tools",
    description: "No-code automation with AI actions connecting thousands of apps.",
    pricing: "Freemium",
    url: "https://zapier.com",
    tags: ["automation", "integration"],
    rating: 4.7,
    metadata: {
      projectTypes: ["SaaS", "Marketing Campaign", "Support Platform", "HR Platform", "E-commerce Store"],
      domains: ["General", "Marketing", "Technology", "E-commerce", "HR"],
      complexity: ["Simple", "Moderate"],
      budget: ["Free", "Low", "Medium"],
      teamSize: ["Solo", "Small", "Medium", "Large"],
      deployment: ["Cloud"],
      securityLevel: ["Standard"],
    },
  },
  {
    name: "Teal",
    logo: "https://www.google.com/s2/favicons?domain=tealhq.com&sz=128",
    category: "AI Resume & Career Tools",
    description: "AI resume builder and job tracking platform.",
    pricing: "Freemium",
    url: "https://www.tealhq.com",
    tags: ["resume", "career"],
    rating: 4.5,
    metadata: {
      projectTypes: ["HR Platform"],
      domains: ["HR", "General"],
      complexity: ["Simple"],
      budget: ["Free", "Low"],
      teamSize: ["Solo"],
      deployment: ["Cloud"],
      securityLevel: ["Standard"],
    },
  },
  {
    name: "Harvey AI",
    logo: "https://www.google.com/s2/favicons?domain=harvey.ai&sz=128",
    category: "AI Legal Assistants",
    description: "AI assistant purpose-built for legal professionals.",
    pricing: "Paid",
    url: "https://www.harvey.ai",
    tags: ["legal", "enterprise"],
    rating: 4.6,
    metadata: {
      projectTypes: ["Enterprise Software"],
      domains: ["Legal", "General"],
      complexity: ["Complex"],
      budget: ["High"],
      teamSize: ["Medium", "Large"],
      deployment: ["Cloud", "On-Prem"],
      securityLevel: ["High"],
    },
  },
  {
    name: "Manus AI",
    logo: "https://www.google.com/s2/favicons?domain=manus.im&sz=128",
    category: "AI Agents",
    description: "Advanced general-purpose AI agent platform.",
    pricing: "Freemium",
    url: "https://manus.im",
    tags: ["agents", "automation"],
    rating: 4.5,
    metadata: {
      projectTypes: ["AI Product", "SaaS", "MVP"],
      domains: ["Technology", "General"],
      complexity: ["Moderate", "Complex"],
      budget: ["Free", "Low", "Medium"],
      teamSize: ["Solo", "Small", "Medium"],
      deployment: ["Cloud"],
      securityLevel: ["Standard"],
    },
  },
  {
    name: "Glass Health",
    logo: "https://www.google.com/s2/favicons?domain=glass.health&sz=128",
    category: "AI Healthcare Assistants",
    description: "AI-powered clinical decision support for healthcare.",
    pricing: "Paid",
    url: "https://glass.health",
    tags: ["healthcare", "medical"],
    rating: 4.4,
    metadata: {
      projectTypes: ["Enterprise Software", "SaaS"],
      domains: ["Healthcare", "General"],
      complexity: ["Complex"],
      budget: ["Medium", "High"],
      teamSize: ["Medium", "Large"],
      deployment: ["Cloud", "On-Prem"],
      securityLevel: ["High"],
    },
  },
  {
    name: "CrowdStrike Charlotte AI",
    logo: "https://www.google.com/s2/favicons?domain=crowdstrike.com&sz=128",
    category: "AI Cybersecurity Tools",
    description: "AI-driven cybersecurity threat detection and response.",
    pricing: "Paid",
    url: "https://www.crowdstrike.com",
    tags: ["cybersecurity", "security"],
    rating: 4.7,
    metadata: {
      projectTypes: ["Enterprise Software"],
      domains: ["Technology", "Finance", "Healthcare", "General"],
      complexity: ["Complex"],
      budget: ["High"],
      teamSize: ["Medium", "Large"],
      deployment: ["Cloud", "On-Prem", "Hybrid"],
      securityLevel: ["High"],
    },
  },
  // Total 28 tools
];
const llmModels = [
  {
    name: "GPT-4.1",
    provider: "OpenAI",
    description: "Advanced multimodal model with improved reasoning and tool use.",
    contextWindow: "200K tokens",
    costPer1MInput: "$10.00",
    costPer1MOutput: "$30.00",
    scores: { mmlu: 89.5, humaneval: 92.0, math: 85.0, reasoning: 93 },
    bestFor: ["General tasks", "Coding", "Multimodal", "Complex reasoning"],
    strengths: ["Versatile", "Strong ecosystem", "Tool calling"],
    weaknesses: ["Cost at scale"],
    free: false,
    metadata: {
      projectTypes: ["SaaS", "Chatbot", "API Service", "AI Product"],
      domains: ["General", "Technology"],
      complexity: ["Moderate", "Complex"],
      budget: ["High"],
      teamSize: ["Small", "Medium", "Large"],
      deployment: ["Cloud"],
      securityLevel: ["Standard"]
    }
  },
  {
    name: "GPT-4 Turbo",
    provider: "OpenAI",
    description: "Fast and cost-effective version of GPT-4 with 128K context.",
    contextWindow: "128K tokens",
    costPer1MInput: "$10.00",
    costPer1MOutput: "$30.00",
    scores: { mmlu: 86.4, humaneval: 90.2, math: 80.0, reasoning: 88 },
    bestFor: ["Coding", "Chat", "Analysis"],
    strengths: ["Speed", "Reliability"],
    weaknesses: ["Slightly less capable than latest"],
    free: false,
    metadata: {
      projectTypes: ["SaaS", "Chatbot", "API Service"],
      domains: ["General", "Technology"],
      complexity: ["Moderate", "Complex"],
      budget: ["High"],
      teamSize: ["Small", "Medium", "Large"],
      deployment: ["Cloud"],
      securityLevel: ["Standard"]
    }
  },
  {
    name: "Claude 3 Opus",
    provider: "Anthropic",
    description: "Anthropic's most powerful model for complex tasks.",
    contextWindow: "200K tokens",
    costPer1MInput: "$15.00",
    costPer1MOutput: "$75.00",
    scores: { mmlu: 88.0, humaneval: 84.9, math: 83.0, reasoning: 92 },
    bestFor: ["Deep analysis", "Long documents", "Safety-critical"],
    strengths: ["Exceptional reasoning", "Long context"],
    weaknesses: ["Higher cost"],
    free: false,
    metadata: {
      projectTypes: ["SaaS", "Internal Tool", "AI Product"],
      domains: ["Healthcare", "Finance", "Legal", "General"],
      complexity: ["Complex"],
      budget: ["High"],
      teamSize: ["Medium", "Large"],
      deployment: ["Cloud"],
      securityLevel: ["Standard", "High"]
    }
  },
  {
    name: "Claude 3.5 Sonnet",
    provider: "Anthropic",
    description: "Balanced high-performance model with excellent coding and writing.",
    contextWindow: "200K tokens",
    costPer1MInput: "$3.00",
    costPer1MOutput: "$15.00",
    scores: { mmlu: 88.7, humaneval: 92.0, math: 78.0, reasoning: 91 },
    bestFor: ["Coding", "Writing", "Analysis"],
    strengths: ["Best coding performance", "Safe outputs"],
    weaknesses: ["No native image gen"],
    free: false,
    metadata: {
      projectTypes: ["SaaS", "API Service", "Chatbot"],
      domains: ["General", "Technology"],
      complexity: ["Moderate", "Complex"],
      budget: ["Medium"],
      teamSize: ["Solo", "Small", "Medium"],
      deployment: ["Cloud"],
      securityLevel: ["Standard"]
    }
  },
  {
    name: "Claude 3.7 Sonnet",
    provider: "Anthropic",
    description: "Latest Claude model with enhanced reasoning and tool use.",
    contextWindow: "200K tokens",
    costPer1MInput: "$3.00",
    costPer1MOutput: "$15.00",
    scores: { mmlu: 89.0, humaneval: 93.0, math: 82.0, reasoning: 93 },
    bestFor: ["Advanced coding", "Agentic workflows"],
    strengths: ["Improved reasoning", "Tool integration"],
    weaknesses: ["Availability"],
    free: false,
    metadata: {
      projectTypes: ["SaaS", "API Service", "AI Product"],
      domains: ["General", "Technology"],
      complexity: ["Moderate", "Complex"],
      budget: ["Medium"],
      teamSize: ["Solo", "Small", "Medium"],
      deployment: ["Cloud"],
      securityLevel: ["Standard"]
    }
  },
  {
    name: "Gemini 1.5 Pro",
    provider: "Google",
    description: "Google's long-context multimodal model.",
    contextWindow: "1M tokens",
    costPer1MInput: "$3.50",
    costPer1MOutput: "$10.50",
    scores: { mmlu: 85.0, humaneval: 85.0, math: 85.0, reasoning: 89 },
    bestFor: ["Long documents", "Multimodal", "Code"],
    strengths: ["Massive context", "Multimodal native"],
    weaknesses: ["Variable consistency"],
    free: false,
    metadata: {
      projectTypes: ["SaaS", "AI Product", "Data Pipeline"],
      domains: ["General", "Research"],
      complexity: ["Moderate", "Complex"],
      budget: ["Medium"],
      teamSize: ["Small", "Medium"],
      deployment: ["Cloud"],
      securityLevel: ["Standard"]
    }
  },
  {
    name: "Gemini 2.5 Pro",
    provider: "Google",
    description: "Next-generation Gemini with superior performance across benchmarks.",
    contextWindow: "1M tokens",
    costPer1MInput: "$3.50",
    costPer1MOutput: "$10.50",
    scores: { mmlu: 90.0, humaneval: 88.0, math: 91.0, reasoning: 92 },
    bestFor: ["Math", "Science", "Long context"],
    strengths: ["Best-in-class math", "Google ecosystem"],
    weaknesses: ["Creative tasks"],
    free: false,
    metadata: {
      projectTypes: ["SaaS", "AI Product", "Data Pipeline"],
      domains: ["Research", "Technology", "General"],
      complexity: ["Complex"],
      budget: ["Medium"],
      teamSize: ["Small", "Medium"],
      deployment: ["Cloud"],
      securityLevel: ["Standard"]
    }
  },
  {
    name: "Llama 3.1 405B",
    provider: "Meta",
    description: "Meta's flagship open-source model rivaling closed models.",
    contextWindow: "128K tokens",
    costPer1MInput: "$0.00",
    costPer1MOutput: "$0.00",
    scores: { mmlu: 88.6, humaneval: 89.0, math: 85.0, reasoning: 90 },
    bestFor: ["Self-hosting", "Customization"],
    strengths: ["Open weights", "High performance"],
    weaknesses: ["Requires infrastructure"],
    free: true,
    metadata: {
      projectTypes: ["Internal Tool", "AI Product", "SaaS"],
      domains: ["General", "Technology"],
      complexity: ["Complex"],
      budget: ["Free"],
      teamSize: ["Medium", "Large"],
      deployment: ["On-Prem", "Cloud", "Hybrid"],
      securityLevel: ["Standard", "High"]
    }
  },
  {
    name: "Llama 3.3 70B",
    provider: "Meta",
    description: "Efficient open model with strong capabilities.",
    contextWindow: "128K tokens",
    costPer1MInput: "$0.00",
    costPer1MOutput: "$0.00",
    scores: { mmlu: 83.0, humaneval: 80.0, math: 77.0, reasoning: 81 },
    bestFor: ["Local deployment", "Privacy"],
    strengths: ["Free to run", "Open source"],
    weaknesses: ["Smaller than 405B"],
    free: true,
    metadata: {
      projectTypes: ["Internal Tool", "MVP"],
      domains: ["General"],
      complexity: ["Simple", "Moderate"],
      budget: ["Free"],
      teamSize: ["Solo", "Small", "Medium"],
      deployment: ["On-Prem", "Cloud"],
      securityLevel: ["Standard", "High"]
    }
  },
  {
    name: "Mistral Large",
    provider: "Mistral AI",
    description: "High-performance European model with strong multilingual support.",
    contextWindow: "128K tokens",
    costPer1MInput: "$2.00",
    costPer1MOutput: "$6.00",
    scores: { mmlu: 85.0, humaneval: 85.0, math: 80.0, reasoning: 87 },
    bestFor: ["Multilingual", "Coding"],
    strengths: ["Cost effective", "Privacy focused"],
    weaknesses: ["Ecosystem"],
    free: false,
    metadata: {
      projectTypes: ["SaaS", "API Service"],
      domains: ["General"],
      complexity: ["Moderate"],
      budget: ["Low", "Medium"],
      teamSize: ["Solo", "Small", "Medium"],
      deployment: ["Cloud"],
      securityLevel: ["Standard", "High"]
    }
  },
  {
    name: "Mixtral 8x22B",
    provider: "Mistral AI",
    description: "Mixture-of-Experts model with excellent performance.",
    contextWindow: "64K tokens",
    costPer1MInput: "$0.65",
    costPer1MOutput: "$2.60",
    scores: { mmlu: 84.0, humaneval: 82.0, math: 78.0, reasoning: 85 },
    bestFor: ["Efficiency", "Reasoning"],
    strengths: ["MoE efficiency"],
    weaknesses: ["Context length"],
    free: false,
    metadata: {
      projectTypes: ["MVP", "Internal Tool", "API Service"],
      domains: ["General"],
      complexity: ["Simple", "Moderate"],
      budget: ["Free", "Low"],
      teamSize: ["Solo", "Small"],
      deployment: ["Cloud", "On-Prem"],
      securityLevel: ["Standard"]
    }
  },
  {
    name: "Command R+",
    provider: "Cohere",
    description: "Cohere's flagship model optimized for business and RAG.",
    contextWindow: "128K tokens",
    costPer1MInput: "$3.00",
    costPer1MOutput: "$15.00",
    scores: { mmlu: 85.0, humaneval: 80.0, math: 75.0, reasoning: 86 },
    bestFor: ["Enterprise RAG", "Business"],
    strengths: ["Tool use", "RAG optimized"],
    weaknesses: ["Less known"],
    free: false,
    metadata: {
      projectTypes: ["SaaS", "Internal Tool", "Enterprise Software"],
      domains: ["Finance", "Enterprise", "General"],
      complexity: ["Moderate", "Complex"],
      budget: ["Medium"],
      teamSize: ["Medium", "Large"],
      deployment: ["Cloud"],
      securityLevel: ["Standard", "High"]
    }
  },
  {
    name: "DeepSeek R1",
    provider: "DeepSeek",
    description: "Outstanding open reasoning model with competitive performance.",
    contextWindow: "128K tokens",
    costPer1MInput: "$0.55",
    costPer1MOutput: "$2.19",
    scores: { mmlu: 86.5, humaneval: 86.0, math: 90.0, reasoning: 94 },
    bestFor: ["Reasoning", "Math", "Coding"],
    strengths: ["Exceptional reasoning", "Low cost"],
    weaknesses: ["Language bias"],
    free: true,
    metadata: {
      projectTypes: ["MVP", "AI Product", "API Service"],
      domains: ["Research", "Technology", "General"],
      complexity: ["Complex"],
      budget: ["Free", "Low"],
      teamSize: ["Solo", "Small", "Medium"],
      deployment: ["Cloud", "On-Prem"],
      securityLevel: ["Standard"]
    }
  },
  {
    name: "Grok 3",
    provider: "xAI",
    description: "xAI's powerful model with real-time knowledge and humor.",
    contextWindow: "131K tokens",
    costPer1MInput: "$3.00",
    costPer1MOutput: "$15.00",
    scores: { mmlu: 87.5, humaneval: 88.0, math: 83.0, reasoning: 89 },
    bestFor: ["Real-time info", "Coding", "Unrestricted"],
    strengths: ["Real-time X data", "Less censored"],
    weaknesses: ["Access via X"],
    free: false,
    metadata: {
      projectTypes: ["SaaS", "Chatbot"],
      domains: ["General", "Media"],
      complexity: ["Moderate", "Complex"],
      budget: ["Medium"],
      teamSize: ["Solo", "Small", "Medium"],
      deployment: ["Cloud"],
      securityLevel: ["Standard"]
    }
  },
  {
    name: "Grok 4",
    provider: "xAI",
    description: "Flagship Grok model with frontier-level capabilities.",
    contextWindow: "256K tokens",
    costPer1MInput: "$5.00",
    costPer1MOutput: "$20.00",
    scores: { mmlu: 89.0, humaneval: 91.0, math: 87.0, reasoning: 92 },
    bestFor: ["Advanced tasks", "Reasoning"],
    strengths: ["Frontier performance"],
    weaknesses: ["Newer model"],
    free: false,
    metadata: {
      projectTypes: ["SaaS", "AI Product"],
      domains: ["General", "Technology"],
      complexity: ["Complex"],
      budget: ["High"],
      teamSize: ["Medium", "Large"],
      deployment: ["Cloud"],
      securityLevel: ["Standard"]
    }
  }
];
const stacks = [
  {
    title: "Startup MVP Stack",
    role: "Rapid full-stack SaaS development",
    description: "Optimized for shipping MVPs quickly with minimal DevOps overhead.",
    tools: [
      { toolName: "Next.js", toolUrl: "https://nextjs.org", purpose: "Frontend + SSR", category: "Frontend" },
      { toolName: "Node.js", toolUrl: "https://nodejs.org", purpose: "Backend runtime", category: "Backend" },
      { toolName: "Supabase", toolUrl: "https://supabase.com", purpose: "Database + Auth + Storage", category: "Database" },
      { toolName: "Clerk", toolUrl: "https://clerk.com", purpose: "Authentication", category: "Authentication" },
      { toolName: "Vercel", toolUrl: "https://vercel.com", purpose: "Deployment", category: "Deployment" },
      { toolName: "Sentry", toolUrl: "https://sentry.io", purpose: "Monitoring", category: "Monitoring" }
    ],
    tags: ["startup", "mvp", "fullstack"],
    difficulty: "Intermediate",
    reasoning: "Excellent balance between developer experience, deployment speed, and scalability for early-stage startups.",
    alternatives: [
      { category: "Frontend", toolName: "SvelteKit", reason: "Smaller bundle size." },
      { category: "Database", toolName: "MongoDB", reason: "Flexible schema." },
      { category: "Deployment", toolName: "Railway", reason: "Simple deployment workflow." }
    ],
    metadata: {
      projectTypes: ["SaaS", "MVP", "Web App"],
      domains: ["General", "E-commerce", "Productivity"],
      complexity: ["Simple", "Moderate"],
      budget: ["Free", "Low", "Medium"],
      teamSize: ["Solo", "Small"],
      deployment: ["Cloud", "Serverless"],
      securityLevel: ["Standard"]
    }
  },
  {
    title: "AI SaaS Platform",
    role: "Building AI-powered SaaS applications",
    description: "Production-ready stack for LLM applications.",
    tools: [
      { toolName: "Next.js", toolUrl: "https://nextjs.org", purpose: "Frontend", category: "Frontend" },
      { toolName: "FastAPI", toolUrl: "https://fastapi.tiangolo.com", purpose: "AI Backend APIs", category: "Backend" },
      { toolName: "PostgreSQL", toolUrl: "https://postgresql.org", purpose: "Relational database", category: "Database" },
      { toolName: "Pinecone", toolUrl: "https://pinecone.io", purpose: "Vector Database", category: "AI" },
      { toolName: "OpenAI", toolUrl: "https://openai.com", purpose: "LLM Provider", category: "AI" },
      { toolName: "Docker", toolUrl: "https://docker.com", purpose: "Containerization", category: "Deployment" }
    ],
    tags: ["ai", "llm", "rag"],
    difficulty: "Advanced",
    reasoning: "Designed for scalable AI applications using retrieval augmentation, vector search, and production APIs.",
    alternatives: [
      { category: "AI", toolName: "Anthropic Claude", reason: "Better long-context reasoning." },
      { category: "Vector DB", toolName: "Weaviate", reason: "Open-source alternative." },
      { category: "Backend", toolName: "NestJS", reason: "Enterprise TypeScript architecture." }
    ],
    metadata: {
      projectTypes: ["SaaS", "AI Product", "Chatbot", "API Service"],
      domains: ["General", "Technology", "Productivity"],
      complexity: ["Complex"],
      budget: ["Medium", "High"],
      teamSize: ["Small", "Medium"],
      deployment: ["Cloud"],
      securityLevel: ["Standard", "High"]
    }
  },
  {
    title: "Enterprise SaaS Stack",
    role: "Large-scale enterprise software",
    description: "Security-first architecture for enterprise applications.",
    tools: [
      { toolName: "React", toolUrl: "https://react.dev", purpose: "Frontend", category: "Frontend" },
      { toolName: "NestJS", toolUrl: "https://nestjs.com", purpose: "Backend", category: "Backend" },
      { toolName: "PostgreSQL", toolUrl: "https://postgresql.org", purpose: "Database", category: "Database" },
      { toolName: "Auth0", toolUrl: "https://auth0.com", purpose: "Identity Management", category: "Authentication" },
      { toolName: "AWS", toolUrl: "https://aws.amazon.com", purpose: "Infrastructure", category: "Deployment" },
      { toolName: "Datadog", toolUrl: "https://datadoghq.com", purpose: "Observability", category: "Monitoring" }
    ],
    tags: ["enterprise", "security", "scalable"],
    difficulty: "Advanced",
    reasoning: "Enterprise-grade architecture emphasizing security, compliance, scalability, and observability.",
    alternatives: [
      { category: "Backend", toolName: "Spring Boot", reason: "Ideal for Java enterprise ecosystems." },
      { category: "Cloud", toolName: "Azure", reason: "Better Microsoft ecosystem integration." },
      { category: "Monitoring", toolName: "Grafana", reason: "Open-source observability." }
    ],
    metadata: {
      projectTypes: ["SaaS", "Enterprise Software", "Internal Tool"],
      domains: ["Finance", "Enterprise", "General"],
      complexity: ["Complex"],
      budget: ["High"],
      teamSize: ["Medium", "Large"],
      deployment: ["Cloud"],
      securityLevel: ["High"]
    }
  },
  {
    title: "E-commerce Platform Stack",
    role: "Scalable online store and marketplace",
    description: "Production-ready stack for modern e-commerce applications with secure payments, inventory management, and SEO.",
    tools: [
      { toolName: "Next.js", toolUrl: "https://nextjs.org", purpose: "SEO-friendly storefront", category: "Frontend" },
      { toolName: "NestJS", toolUrl: "https://nestjs.com", purpose: "REST APIs and business logic", category: "Backend" },
      { toolName: "PostgreSQL", toolUrl: "https://postgresql.org", purpose: "Products, orders and customer data", category: "Database" },
      { toolName: "Redis", toolUrl: "https://redis.io", purpose: "Caching and session management", category: "Cache" },
      { toolName: "Stripe", toolUrl: "https://stripe.com", purpose: "Online payments", category: "Payments" },
      { toolName: "Vercel", toolUrl: "https://vercel.com", purpose: "Deployment", category: "Deployment" }
    ],
    tags: ["ecommerce", "retail", "payments"],
    difficulty: "Intermediate",
    reasoning: "Provides excellent SEO, reliable payment processing, fast page loads, and a scalable backend suitable for growing online businesses.",
    alternatives: [
      { category: "Payments", toolName: "Razorpay", reason: "Better choice for Indian payment processing." },
      { category: "Deployment", toolName: "AWS", reason: "Greater infrastructure flexibility." },
      { category: "Frontend", toolName: "Remix", reason: "Excellent server-side rendering performance." }
    ],
    metadata: {
      projectTypes: ["E-commerce", "Marketplace", "Web App"],
      domains: ["E-commerce", "Retail"],
      complexity: ["Moderate", "Complex"],
      budget: ["Medium", "High"],
      teamSize: ["Small", "Medium"],
      deployment: ["Cloud"],
      securityLevel: ["Standard", "High"]
    }
  },
  {
    title: "Mobile App Backend Stack",
    role: "Backend architecture for Android and iOS applications",
    description: "Complete backend stack supporting authentication, notifications, cloud storage, and realtime data.",
    tools: [
      { toolName: "Flutter", toolUrl: "https://flutter.dev", purpose: "Cross-platform mobile development", category: "Frontend" },
      { toolName: "Firebase", toolUrl: "https://firebase.google.com", purpose: "Authentication and cloud platform", category: "Backend" },
      { toolName: "Cloud Firestore", toolUrl: "https://firebase.google.com/products/firestore", purpose: "Realtime NoSQL database", category: "Database" },
      { toolName: "Firebase Cloud Messaging", toolUrl: "https://firebase.google.com/docs/cloud-messaging", purpose: "Push notifications", category: "Notifications" },
      { toolName: "Cloud Functions", toolUrl: "https://firebase.google.com/products/functions", purpose: "Serverless APIs", category: "Backend" },
      { toolName: "Crashlytics", toolUrl: "https://firebase.google.com/products/crashlytics", purpose: "Crash reporting", category: "Monitoring" }
    ],
    tags: ["mobile", "flutter", "firebase"],
    difficulty: "Intermediate",
    reasoning: "Ideal for startups needing fast mobile development with managed backend services and minimal operational overhead.",
    alternatives: [
      { category: "Frontend", toolName: "React Native", reason: "JavaScript ecosystem compatibility." },
      { category: "Backend", toolName: "Supabase", reason: "Open-source Firebase alternative." },
      { category: "Monitoring", toolName: "Sentry", reason: "Advanced error tracking." }
    ],
    metadata: {
      projectTypes: ["Mobile App"],
      domains: ["General", "Social", "Productivity"],
      complexity: ["Moderate"],
      budget: ["Free", "Low", "Medium"],
      teamSize: ["Solo", "Small"],
      deployment: ["Cloud", "Serverless"],
      securityLevel: ["Standard"]
    }
  },
  {
    title: "Data Engineering Pipeline",
    role: "Enterprise ETL and analytics platform",
    description: "Modern architecture for collecting, processing, transforming, and visualizing large-scale business data.",
    tools: [
      { toolName: "Apache Airflow", toolUrl: "https://airflow.apache.org", purpose: "Workflow orchestration", category: "Pipeline" },
      { toolName: "Apache Spark", toolUrl: "https://spark.apache.org", purpose: "Distributed data processing", category: "Processing" },
      { toolName: "dbt", toolUrl: "https://www.getdbt.com", purpose: "Data transformation", category: "Transformation" },
      { toolName: "Snowflake", toolUrl: "https://www.snowflake.com", purpose: "Cloud data warehouse", category: "Warehouse" },
      { toolName: "Power BI", toolUrl: "https://powerbi.microsoft.com", purpose: "Business intelligence dashboards", category: "Analytics" },
      { toolName: "PostgreSQL", toolUrl: "https://postgresql.org", purpose: "Operational database", category: "Database" }
    ],
    tags: ["etl", "analytics", "big-data"],
    difficulty: "Advanced",
    reasoning: "Supports reliable ETL pipelines, scalable analytics, cloud warehousing, and business intelligence for enterprise data workloads.",
    alternatives: [
      { category: "Warehouse", toolName: "Google BigQuery", reason: "Fully managed analytics platform." },
      { category: "Pipeline", toolName: "Prefect", reason: "Simpler orchestration for Python teams." },
      { category: "Analytics", toolName: "Tableau", reason: "Advanced visualization and reporting." }
    ],
    metadata: {
      projectTypes: ["Data Pipeline", "Analytics Platform", "Internal Tool"],
      domains: ["Finance", "Enterprise", "General", "Retail"],
      complexity: ["Complex"],
      budget: ["High"],
      teamSize: ["Medium", "Large"],
      deployment: ["Cloud", "On-Prem", "Hybrid"],
      securityLevel: ["Standard", "High"]
    }
  },
  {
    title: "Healthcare AI Platform",
    role: "HIPAA-ready AI healthcare platform",
    description: "Secure architecture for clinical decision support, patient management, and AI-assisted healthcare workflows.",
    tools: [
      { toolName: "Next.js", toolUrl: "https://nextjs.org", purpose: "Healthcare portal", category: "Frontend" },
      { toolName: "FastAPI", toolUrl: "https://fastapi.tiangolo.com", purpose: "Medical APIs", category: "Backend" },
      { toolName: "PostgreSQL", toolUrl: "https://postgresql.org", purpose: "Patient records", category: "Database" },
      { toolName: "OpenAI", toolUrl: "https://openai.com", purpose: "Clinical AI assistance", category: "AI" },
      { toolName: "Docker", toolUrl: "https://docker.com", purpose: "Container deployment", category: "Deployment" },
      { toolName: "AWS", toolUrl: "https://aws.amazon.com", purpose: "HIPAA-capable cloud infrastructure", category: "Cloud" }
    ],
    tags: ["healthcare", "medical", "ai"],
    difficulty: "Advanced",
    reasoning: "Prioritizes security, compliance, reliability, and AI integration suitable for healthcare applications handling sensitive patient information.",
    alternatives: [
      { category: "Cloud", toolName: "Azure", reason: "Strong healthcare compliance offerings." },
      { category: "AI", toolName: "Claude", reason: "Excellent long-document analysis." },
      { category: "Database", toolName: "MongoDB", reason: "Flexible medical document storage." }
    ],
    metadata: {
      projectTypes: ["SaaS", "AI Product", "Internal Tool"],
      domains: ["Healthcare"],
      complexity: ["Complex"],
      budget: ["Medium", "High"],
      teamSize: ["Small", "Medium", "Large"],
      deployment: ["Cloud", "Hybrid"],
      securityLevel: ["High"]
    }
  },
  {
    title: "Cybersecurity Platform",
    role: "Threat detection and security monitoring",
    description: "Enterprise security stack for SIEM, monitoring, alerting, and automated incident response.",
    tools: [
      { toolName: "React", toolUrl: "https://react.dev", purpose: "Security dashboard", category: "Frontend" },
      { toolName: "Go", toolUrl: "https://go.dev", purpose: "High-performance backend", category: "Backend" },
      { toolName: "Elasticsearch", toolUrl: "https://www.elastic.co", purpose: "Security log indexing", category: "Database" },
      { toolName: "Kibana", toolUrl: "https://www.elastic.co/kibana", purpose: "Security visualization", category: "Analytics" },
      { toolName: "Docker", toolUrl: "https://docker.com", purpose: "Containerization", category: "Deployment" },
      { toolName: "Grafana", toolUrl: "https://grafana.com", purpose: "Infrastructure monitoring", category: "Monitoring" }
    ],
    tags: ["security", "cybersecurity", "siem"],
    difficulty: "Advanced",
    reasoning: "Optimized for real-time monitoring, log aggregation, visualization, and incident response at enterprise scale.",
    alternatives: [
      { category: "Analytics", toolName: "Splunk", reason: "Enterprise SIEM solution." },
      { category: "Backend", toolName: "Rust", reason: "Memory-safe systems programming." },
      { category: "Monitoring", toolName: "Datadog", reason: "Managed observability platform." }
    ],
    metadata: {
      projectTypes: ["Internal Tool", "SaaS", "Enterprise Software"],
      domains: ["Cybersecurity", "Enterprise", "Government", "Finance"],
      complexity: ["Complex"],
      budget: ["High"],
      teamSize: ["Medium", "Large"],
      deployment: ["Cloud", "On-Prem", "Hybrid"],
      securityLevel: ["High"]
    }
  },
  {
    title: "DevOps & Cloud Platform",
    role: "Cloud-native DevOps infrastructure",
    description: "Scalable CI/CD and Kubernetes platform for modern software delivery.",
    tools: [
      { toolName: "Docker", toolUrl: "https://docker.com", purpose: "Containerization", category: "Containers" },
      { toolName: "Kubernetes", toolUrl: "https://kubernetes.io", purpose: "Container orchestration", category: "Infrastructure" },
      { toolName: "GitHub Actions", toolUrl: "https://github.com/features/actions", purpose: "CI/CD", category: "Automation" },
      { toolName: "Terraform", toolUrl: "https://terraform.io", purpose: "Infrastructure as Code", category: "Infrastructure" },
      { toolName: "Prometheus", toolUrl: "https://prometheus.io", purpose: "Metrics collection", category: "Monitoring" },
      { toolName: "Grafana", toolUrl: "https://grafana.com", purpose: "Dashboards", category: "Monitoring" }
    ],
    tags: ["devops", "cloud", "kubernetes"],
    difficulty: "Advanced",
    reasoning: "Provides reproducible infrastructure, automated deployments, observability, and cloud-native scalability.",
    alternatives: [
      { category: "CI/CD", toolName: "GitLab CI", reason: "Integrated DevOps workflow." },
      { category: "Infrastructure", toolName: "Pulumi", reason: "Infrastructure using programming languages." },
      { category: "Containers", toolName: "Podman", reason: "Daemonless container engine." }
    ],
    metadata: {
      projectTypes: ["Internal Tool", "Infrastructure Platform"],
      domains: ["General", "Enterprise", "Technology"],
      complexity: ["Complex"],
      budget: ["Medium", "High"],
      teamSize: ["Medium", "Large"],
      deployment: ["Cloud", "Hybrid"],
      securityLevel: ["Standard", "High"]
    }
  },
  {
    title: "Machine Learning Engineering Stack",
    role: "End-to-end ML model development and deployment",
    description: "Production ML platform covering experimentation, model training, deployment, monitoring, and serving.",
    tools: [
      { toolName: "Python", toolUrl: "https://python.org", purpose: "ML development", category: "Programming" },
      { toolName: "PyTorch", toolUrl: "https://pytorch.org", purpose: "Deep learning framework", category: "ML" },
      { toolName: "MLflow", toolUrl: "https://mlflow.org", purpose: "Experiment tracking", category: "MLOps" },
      { toolName: "FastAPI", toolUrl: "https://fastapi.tiangolo.com", purpose: "Model serving APIs", category: "Backend" },
      { toolName: "Docker", toolUrl: "https://docker.com", purpose: "Container deployment", category: "Deployment" },
      { toolName: "Weights & Biases", toolUrl: "https://wandb.ai", purpose: "Model monitoring", category: "MLOps" }
    ],
    tags: ["machine-learning", "mlops", "ai"],
    difficulty: "Advanced",
    reasoning: "Covers the complete ML lifecycle from experimentation through deployment and production monitoring using industry-standard MLOps tooling.",
    alternatives: [
      { category: "ML", toolName: "TensorFlow", reason: "Excellent production deployment ecosystem." },
      { category: "Experiment Tracking", toolName: "Neptune.ai", reason: "Comprehensive experiment management." },
      { category: "Deployment", toolName: "KServe", reason: "Kubernetes-native model serving." }
    ],
    metadata: {
      projectTypes: ["AI Product", "Data Pipeline", "Internal Tool"],
      domains: ["General", "Technology", "Research"],
      complexity: ["Complex"],
      budget: ["Medium", "High"],
      teamSize: ["Small", "Medium"],
      deployment: ["Cloud"],
      securityLevel: ["Standard"]
    }
  }
];

const workflows = [
  {
    title: "AI-Powered Content Marketing Campaign",
    goal: "Research, create, optimize, publish, and analyze high-performing marketing content using AI.",
    category: "Marketing",
    difficulty: "Intermediate",
    description: "An end-to-end workflow for creating SEO-friendly content, social media posts, email campaigns, and performance reports using AI tools.",
    steps: [
      { stepNumber: 1, title: "Market & Competitor Research", description: "Research industry trends, competitors, keywords, and customer pain points.", toolName: "Perplexity AI", toolUrl: "https://perplexity.ai", promptTemplate: "Role:\nSenior Market Research Analyst.\n\nObjective:\nResearch the target industry.\n\nTasks:\n• Identify current trends.\n• Find top competitors.\n• Discover customer pain points.\n• Identify emerging opportunities.\n• Generate SEO keyword ideas.\n\nOutput:\n- Top 10 trends\n- Competitor summary\n- Keyword table\n- Customer pain points\n- Content opportunities" },
      { stepNumber: 2, title: "Content Strategy Planning", description: "Convert research into an editorial calendar and campaign roadmap.", toolName: "ChatGPT", toolUrl: "https://chat.openai.com", promptTemplate: "Role:\nContent Marketing Strategist.\n\nObjective:\nCreate a 30-day content strategy.\n\nInclude:\n• Blog topics\n• Social media schedule\n• Email campaign ideas\n• CTA suggestions\n• Funnel mapping\n\nOutput:\nWeekly content calendar with publishing priorities." },
      { stepNumber: 3, title: "Long-form Article Writing", description: "Generate SEO-optimized articles using AI.", toolName: "Claude", toolUrl: "https://claude.ai", promptTemplate: "Role:\nSenior SEO Copywriter.\n\nWrite a comprehensive article.\n\nRequirements:\n• Human-like tone\n• SEO optimized\n• Clear headings\n• FAQs\n• Internal linking suggestions\n• Actionable examples\n\nOutput:\nPublication-ready markdown article." },
      { stepNumber: 4, title: "Visual Asset Creation", description: "Generate marketing graphics and blog illustrations.", toolName: "DALL·E", toolUrl: "https://openai.com/dall-e-3", promptTemplate: "Generate modern marketing illustrations.\n\nStyle:\nProfessional\nMinimal\nBrand-consistent\n\nDeliver:\n• Hero image\n• Social media graphics\n• Blog illustrations\n• Thumbnail ideas" },
      { stepNumber: 5, title: "SEO Optimization", description: "Improve ranking opportunities before publishing.", toolName: "ChatGPT", toolUrl: "https://chat.openai.com", promptTemplate: "Optimize this article.\n\nCheck:\n• SEO title\n• Meta description\n• H1-H3 hierarchy\n• Keyword density\n• Internal links\n• Readability\n• Featured snippet opportunities\n\nReturn an optimized version." },
      { stepNumber: 6, title: "Social Media Repurposing", description: "Convert the article into platform-specific content.", toolName: "Copy.ai", toolUrl: "https://copy.ai", promptTemplate: "Convert this article into:\n\n• LinkedIn post\n• Twitter thread\n• Facebook post\n• Instagram caption\n• Reddit summary\n\nMaintain consistent brand voice." },
      { stepNumber: 7, title: "Performance Analysis", description: "Evaluate campaign performance and recommend improvements.", toolName: "ChatGPT", toolUrl: "https://chat.openai.com", promptTemplate: "Analyze campaign metrics.\n\nMetrics:\nTraffic\nCTR\nBounce Rate\nEngagement\nConversion\n\nRecommend:\n• Improvements\n• New experiments\n• A/B tests\n• Next month's strategy" },
    ],
    tags: ["marketing", "seo", "content", "social-media", "automation"],
    metadata: {
      projectTypes: ["Marketing Campaign", "Content Platform"],
      domains: ["Marketing", "General"],
      complexity: ["Simple", "Moderate"],
      budget: ["Free", "Low", "Medium"],
      teamSize: ["Solo", "Small", "Medium"],
      deployment: ["Any"],
      securityLevel: ["Standard"],
    },
  },
  {
    title: "AI-Assisted SaaS Product Development",
    goal: "Plan, design, build, test, deploy, and monitor a production-ready SaaS application using AI tools.",
    category: "Software Development",
    difficulty: "Advanced",
    description: "Complete workflow covering product planning, UI/UX design, architecture, implementation, testing, deployment, and monitoring.",
    steps: [
      { stepNumber: 1, title: "Product Discovery", description: "Define the SaaS product vision, target users, features, and roadmap.", toolName: "ChatGPT", toolUrl: "https://chat.openai.com", promptTemplate: "Role:\nSenior Product Manager.\n\nObjective:\nDesign a SaaS product roadmap.\n\nDeliver:\n• Problem statement\n• Target users\n• User personas\n• MVP features\n• Premium features\n• Success metrics\n• Development roadmap\n\nOutput:\nProfessional Product Requirement Document (PRD)." },
      { stepNumber: 2, title: "System Architecture", description: "Design scalable backend and frontend architecture.", toolName: "Claude", toolUrl: "https://claude.ai", promptTemplate: "Act as a Principal Software Architect.\n\nDesign a scalable SaaS architecture.\n\nInclude:\n\n• Frontend\n• Backend\n• Database\n• Authentication\n• APIs\n• Caching\n• Storage\n• Deployment\n• Monitoring\n\nExplain why each technology was selected.\n\nOutput Mermaid architecture diagrams." },
      { stepNumber: 3, title: "Database Design", description: "Design normalized database schema and relationships.", toolName: "ChatGPT", toolUrl: "https://chat.openai.com", promptTemplate: "Design the database schema.\n\nRequirements:\n\n• ER Diagram\n• Tables\n• Relationships\n• Indexes\n• Constraints\n• Multi-tenancy\n• Audit logs\n• Soft deletes\n\nOutput SQL-ready schema." },
      { stepNumber: 4, title: "Backend Development", description: "Generate REST APIs and backend services.", toolName: "GitHub Copilot", toolUrl: "https://github.com/features/copilot", promptTemplate: "Generate production-ready backend.\n\nRequirements:\n\n• REST APIs\n• JWT Authentication\n• Validation\n• Error handling\n• Pagination\n• Logging\n• Security\n• Unit tests\n\nUse clean architecture principles." },
      { stepNumber: 5, title: "Frontend Development", description: "Develop responsive user interfaces.", toolName: "Cursor", toolUrl: "https://cursor.sh", promptTemplate: "Build responsive frontend pages.\n\nInclude:\n\n• Dashboard\n• Authentication\n• Forms\n• Tables\n• Charts\n• Responsive layout\n• Accessibility\n• Loading states\n• Error handling\n\nGenerate reusable React components." },
      { stepNumber: 6, title: "Testing & QA", description: "Generate comprehensive testing strategy.", toolName: "Claude", toolUrl: "https://claude.ai", promptTemplate: "Create a testing plan.\n\nInclude:\n\n• Unit tests\n• Integration tests\n• API tests\n• UI tests\n• Security tests\n• Performance tests\n\nProvide example test cases and expected outputs." },
      { stepNumber: 7, title: "Deployment", description: "Prepare CI/CD pipeline and production deployment.", toolName: "ChatGPT", toolUrl: "https://chat.openai.com", promptTemplate: "Create deployment documentation.\n\nInclude:\n\n• Docker\n• CI/CD\n• Environment variables\n• Secrets\n• Monitoring\n• Backup strategy\n• Rollback procedure\n\nOutput production deployment checklist." },
      { stepNumber: 8, title: "Monitoring & Scaling", description: "Monitor application health and recommend scaling improvements.", toolName: "Perplexity AI", toolUrl: "https://perplexity.ai", promptTemplate: "Review SaaS architecture.\n\nRecommend:\n\n• Performance improvements\n• Database optimization\n• Horizontal scaling\n• Cost optimization\n• Security improvements\n• Observability\n\nOutput prioritized action plan." },
    ],
    tags: ["saas", "software", "development", "architecture", "deployment", "testing"],
    metadata: {
      projectTypes: ["SaaS", "Web App", "MVP"],
      domains: ["Technology", "General"],
      complexity: ["Complex"],
      budget: ["Medium", "High"],
      teamSize: ["Small", "Medium", "Large"],
      deployment: ["Cloud"],
      securityLevel: ["Standard", "High"],
    },
  },
  {
    title: "AI Customer Support Automation",
    goal: "Automate customer support using AI chatbots, ticket routing, knowledge bases, and analytics.",
    category: "Customer Support",
    difficulty: "Intermediate",
    description: "End-to-end workflow for building an AI-powered customer support system that handles FAQs, ticket classification, escalation, sentiment analysis, and performance monitoring.",
    steps: [
      { stepNumber: 1, title: "Knowledge Base Preparation", description: "Collect FAQs, documentation, product manuals, and support articles into a centralized knowledge base.", toolName: "ChatGPT", toolUrl: "https://chat.openai.com", promptTemplate: "Role:\nKnowledge Management Specialist.\n\nObjective:\nCreate a structured knowledge base.\n\nTasks:\n• Organize FAQs\n• Remove duplicate content\n• Standardize formatting\n• Categorize documents\n• Identify missing information\n\nOutput:\nKnowledge base structure with categories and article summaries." },
      { stepNumber: 2, title: "Intent & FAQ Classification", description: "Identify common customer intents and categorize support requests.", toolName: "Claude", toolUrl: "https://claude.ai", promptTemplate: "Act as an AI Support Analyst.\n\nAnalyze customer conversations.\n\nIdentify:\n• Frequently asked questions\n• User intent\n• Common complaints\n• Urgency levels\n• Escalation triggers\n\nOutput:\nIntent taxonomy with confidence scores." },
      { stepNumber: 3, title: "AI Chatbot Design", description: "Design chatbot conversation flows and response logic.", toolName: "ChatGPT", toolUrl: "https://chat.openai.com", promptTemplate: "Design a customer support chatbot.\n\nInclude:\n\n• Greeting flow\n• Authentication\n• FAQ responses\n• Troubleshooting\n• Escalation logic\n• Human handoff\n• Closing conversation\n\nOutput conversation flow diagram." },
      { stepNumber: 4, title: "Ticket Classification", description: "Automatically classify incoming tickets by category and priority.", toolName: "Perplexity AI", toolUrl: "https://perplexity.ai", promptTemplate: "Classify support tickets.\n\nCategories:\n\n• Billing\n• Technical\n• Account\n• Orders\n• Refunds\n• General Inquiry\n\nAlso assign:\n\n• Priority\n• Department\n• Suggested response\n• Estimated resolution time" },
      { stepNumber: 5, title: "Response Generation", description: "Generate personalized customer replies.", toolName: "Claude", toolUrl: "https://claude.ai", promptTemplate: "Generate a professional customer response.\n\nRequirements:\n\n• Friendly tone\n• Personalized\n• Accurate\n• Short\n• Actionable\n• Brand compliant\n\nIf confidence is low, recommend escalation." },
      { stepNumber: 6, title: "Sentiment Analysis", description: "Analyze customer emotions and satisfaction.", toolName: "ChatGPT", toolUrl: "https://chat.openai.com", promptTemplate: "Analyze conversation sentiment.\n\nIdentify:\n\n• Positive\n• Neutral\n• Negative\n• Angry\n• Urgent\n\nRecommend the best support strategy for each sentiment." },
      { stepNumber: 7, title: "Human Escalation", description: "Route complex issues to the appropriate support team.", toolName: "Zapier AI", toolUrl: "https://zapier.com", promptTemplate: "Create escalation workflow.\n\nConditions:\n\n• VIP customer\n• Refund request\n• Technical outage\n• Security concern\n• Legal issue\n\nOutput routing logic and automation steps." },
      { stepNumber: 8, title: "Performance Monitoring", description: "Evaluate chatbot accuracy and support performance.", toolName: "ChatGPT", toolUrl: "https://chat.openai.com", promptTemplate: "Analyze support KPIs.\n\nMetrics:\n\n• Resolution rate\n• Average response time\n• Customer satisfaction\n• Escalation rate\n• AI accuracy\n\nRecommend improvements and next optimization steps." },
    ],
    tags: ["customer-support", "chatbot", "automation", "helpdesk", "ai", "support"],
    metadata: {
      projectTypes: ["SaaS", "Chatbot", "Support Platform"],
      domains: ["Technology", "General", "E-commerce"],
      complexity: ["Moderate", "Complex"],
      budget: ["Low", "Medium", "High"],
      teamSize: ["Small", "Medium", "Large"],
      deployment: ["Cloud"],
      securityLevel: ["Standard"],
    },
  },
  {
    title: "Academic Research & Literature Review",
    goal: "Conduct a comprehensive literature review, synthesize research findings, identify gaps, and prepare publication-ready summaries.",
    category: "Research",
    difficulty: "Advanced",
    description: "A complete workflow for researchers, students, and professionals to efficiently review academic literature using AI-assisted tools.",
    steps: [
      { stepNumber: 1, title: "Research Question Definition", description: "Define the research objective, hypotheses, and search strategy.", toolName: "ChatGPT", toolUrl: "https://chat.openai.com", promptTemplate: "Role:\nSenior Research Advisor.\n\nObjective:\nHelp define a research project.\n\nGenerate:\n• Research objective\n• Research questions\n• Hypotheses\n• Keywords\n• Search strategy\n• Inclusion criteria\n• Exclusion criteria\n\nOutput a complete research plan." },
      { stepNumber: 2, title: "Academic Paper Discovery", description: "Search and collect the highest-quality academic publications.", toolName: "Consensus", toolUrl: "https://consensus.app", promptTemplate: "Search peer-reviewed publications.\n\nPrioritize:\n\n• Systematic Reviews\n• Meta Analyses\n• Top Conferences\n• High Impact Journals\n• Recent Publications\n\nReturn:\n\n• Citation\n• Summary\n• Key Findings\n• Limitations\n• DOI" },
      { stepNumber: 3, title: "Paper Summarization", description: "Extract important findings from each selected paper.", toolName: "Claude", toolUrl: "https://claude.ai", promptTemplate: "Read this research paper.\n\nSummarize:\n\n• Objective\n• Methodology\n• Dataset\n• Results\n• Strengths\n• Weaknesses\n• Future Work\n\nOutput a structured summary." },
      { stepNumber: 4, title: "Evidence Comparison", description: "Compare multiple papers to identify consensus and disagreement.", toolName: "Elicit", toolUrl: "https://elicit.com", promptTemplate: "Compare these research papers.\n\nIdentify:\n\n• Agreements\n• Contradictions\n• Evidence strength\n• Method differences\n• Dataset differences\n• Remaining research gaps\n\nGenerate a comparison matrix." },
      { stepNumber: 5, title: "Gap Analysis", description: "Identify unexplored research opportunities.", toolName: "Perplexity AI", toolUrl: "https://perplexity.ai", promptTemplate: "Based on the reviewed literature,\n\nIdentify:\n\n• Open problems\n• Understudied areas\n• Weak methodologies\n• Emerging trends\n• Future opportunities\n\nRank each opportunity by impact." },
      { stepNumber: 6, title: "Literature Review Writing", description: "Draft a publication-quality literature review chapter.", toolName: "Claude", toolUrl: "https://claude.ai", promptTemplate: "Write a literature review.\n\nStructure:\n\n• Introduction\n• Existing Research\n• Comparative Analysis\n• Research Gaps\n• Future Directions\n• Conclusion\n\nMaintain academic writing style with logical transitions." },
      { stepNumber: 7, title: "Citation & Reference Formatting", description: "Prepare correctly formatted references.", toolName: "ChatGPT", toolUrl: "https://chat.openai.com", promptTemplate: "Format references into:\n\n• APA\n• IEEE\n• MLA\n• Chicago\n\nVerify consistency and remove duplicate citations." },
      { stepNumber: 8, title: "Final Quality Review", description: "Evaluate the literature review for completeness and academic quality.", toolName: "Claude", toolUrl: "https://claude.ai", promptTemplate: "Review this literature review.\n\nEvaluate:\n\n• Completeness\n• Academic tone\n• Logical flow\n• Citation quality\n• Critical analysis\n• Bias\n• Missing references\n\nProvide prioritized improvement suggestions." },
    ],
    tags: ["research", "academic", "literature-review", "science", "papers", "analysis"],
    metadata: {
      projectTypes: ["Research Project"],
      domains: ["Education", "General"],
      complexity: ["Moderate", "Complex"],
      budget: ["Free", "Low"],
      teamSize: ["Solo", "Small"],
      deployment: ["Any"],
      securityLevel: ["Standard"],
    },
  },
  {
    title: "Full-Stack Web Application Development",
    goal: "Design, develop, test, deploy, and monitor a modern production-ready full-stack web application.",
    category: "Software Development",
    difficulty: "Advanced",
    description: "End-to-end workflow covering planning, UI/UX, frontend, backend, database, testing, deployment, and production monitoring for modern web applications.",
    steps: [
      { stepNumber: 1, title: "Requirements Analysis", description: "Gather business requirements and define project scope.", toolName: "ChatGPT", toolUrl: "https://chat.openai.com", promptTemplate: "Role:\nSenior Business Analyst.\n\nObjective:\nConvert business ideas into software requirements.\n\nGenerate:\n• Functional Requirements\n• Non-functional Requirements\n• User Stories\n• Acceptance Criteria\n• Feature Priority (MoSCoW)\n• Project Risks\n\nOutput:\nComplete Software Requirement Specification (SRS)." },
      { stepNumber: 2, title: "UI/UX Design", description: "Design intuitive user interfaces and user flows.", toolName: "Figma AI", toolUrl: "https://www.figma.com", promptTemplate: "Design a modern responsive UI.\n\nInclude:\n\n• User Flow\n• Landing Page\n• Dashboard\n• Forms\n• Navigation\n• Mobile Layout\n• Accessibility\n• Design System\n\nOutput component hierarchy and layout suggestions." },
      { stepNumber: 3, title: "Frontend Development", description: "Develop responsive frontend using reusable components.", toolName: "Cursor", toolUrl: "https://cursor.sh", promptTemplate: "Generate production-ready React code.\n\nRequirements:\n\n• Component architecture\n• State management\n• Responsive design\n• Form validation\n• Error boundaries\n• Loading states\n• Accessibility\n• Clean folder structure\n\nUse modern React best practices." },
      { stepNumber: 4, title: "Backend API Development", description: "Develop scalable backend APIs and business logic.", toolName: "GitHub Copilot", toolUrl: "https://github.com/features/copilot", promptTemplate: "Generate backend services.\n\nInclude:\n\n• REST APIs\n• Authentication\n• Authorization\n• CRUD operations\n• Validation\n• Logging\n• Error handling\n• Rate limiting\n\nFollow clean architecture principles." },
      { stepNumber: 5, title: "Database Design & Integration", description: "Create optimized database schema and integrate it with the backend.", toolName: "Claude", toolUrl: "https://claude.ai", promptTemplate: "Design the database.\n\nInclude:\n\n• ER Diagram\n• Tables\n• Relationships\n• Indexes\n• Constraints\n• Transactions\n• Backup strategy\n\nExplain design decisions." },
      { stepNumber: 6, title: "Testing & Quality Assurance", description: "Create automated testing strategy for the application.", toolName: "ChatGPT", toolUrl: "https://chat.openai.com", promptTemplate: "Generate a testing strategy.\n\nCover:\n\n• Unit Tests\n• Integration Tests\n• API Tests\n• UI Tests\n• Security Tests\n• Performance Tests\n\nReturn sample test cases and expected outputs." },
      { stepNumber: 7, title: "Deployment & CI/CD", description: "Deploy the application using automated pipelines.", toolName: "GitHub Copilot", toolUrl: "https://github.com/features/copilot", promptTemplate: "Create a deployment plan.\n\nInclude:\n\n• Docker\n• CI/CD Pipeline\n• Environment Variables\n• Secrets Management\n• Production Build\n• Rollback Strategy\n• Health Checks\n\nOutput deployment checklist." },
      { stepNumber: 8, title: "Monitoring & Maintenance", description: "Monitor production health and continuously improve the application.", toolName: "Perplexity AI", toolUrl: "https://perplexity.ai", promptTemplate: "Review production metrics.\n\nAnalyze:\n\n• Performance\n• API Latency\n• Error Rate\n• User Activity\n• Infrastructure Usage\n• Security Logs\n\nRecommend optimization opportunities ranked by business impact." },
    ],
    tags: ["web-development", "fullstack", "react", "nodejs", "deployment", "testing", "software-engineering"],
    metadata: {
      projectTypes: ["Web App", "SaaS", "MVP"],
      domains: ["Technology", "General"],
      complexity: ["Complex"],
      budget: ["Medium", "High"],
      teamSize: ["Small", "Medium", "Large"],
      deployment: ["Cloud", "Any"],
      securityLevel: ["Standard", "High"],
    },
  },
  {
    title: "E-commerce Product Launch",
    goal: "Plan, launch, market, and optimize a successful e-commerce product using AI-powered research, content generation, analytics, and automation.",
    category: "E-commerce",
    difficulty: "Intermediate",
    description: "Complete workflow for launching an online product including market research, branding, product listing, pricing, advertising, customer engagement, and performance optimization.",
    steps: [
      { stepNumber: 1, title: "Market Research & Product Validation", description: "Validate product demand, analyze competitors, and identify target customers.", toolName: "Perplexity AI", toolUrl: "https://perplexity.ai", promptTemplate: "Act as a Senior E-commerce Research Analyst.\n\nAnalyze the market for this product.\n\nGenerate:\n\n• Market demand\n• Competitor analysis\n• Customer personas\n• Pricing comparison\n• SWOT Analysis\n• Opportunity score\n• Market risks\n\nOutput a product validation report." },
      { stepNumber: 2, title: "Brand Identity & Product Positioning", description: "Develop branding strategy and unique value proposition.", toolName: "ChatGPT", toolUrl: "https://chat.openai.com", promptTemplate: "Act as a Branding Consultant.\n\nCreate:\n\n• Brand positioning\n• Unique Selling Proposition (USP)\n• Brand voice\n• Brand story\n• Product tagline\n• Marketing angle\n\nReturn a complete branding document." },
      { stepNumber: 3, title: "Product Listing Creation", description: "Generate SEO-optimized product listings for online stores.", toolName: "Claude", toolUrl: "https://claude.ai", promptTemplate: "Write a high-converting product listing.\n\nInclude:\n\n• Product Title\n• SEO Description\n• Features\n• Benefits\n• Technical Specifications\n• FAQs\n• Keywords\n• Meta Description\n\nOptimize for conversion and search ranking." },
      { stepNumber: 4, title: "Visual Asset Generation", description: "Create marketing images, banners, and promotional assets.", toolName: "DALL·E", toolUrl: "https://openai.com/dall-e-3", promptTemplate: "Generate premium e-commerce assets.\n\nDeliver:\n\n• Hero banner\n• Product showcase\n• Lifestyle image ideas\n• Instagram creatives\n• Facebook ad visuals\n• Product thumbnails\n\nStyle should be modern, premium, and brand-consistent." },
      { stepNumber: 5, title: "Launch Marketing Campaign", description: "Prepare multi-channel launch campaigns.", toolName: "Copy.ai", toolUrl: "https://copy.ai", promptTemplate: "Create launch marketing content.\n\nGenerate:\n\n• Email campaign\n• Facebook Ads\n• Google Ads\n• LinkedIn Post\n• Instagram Caption\n• Twitter Thread\n• Launch Announcement\n\nMaintain a consistent brand voice across all channels." },
      { stepNumber: 6, title: "Customer Engagement Automation", description: "Automate customer interactions after launch.", toolName: "Zapier AI", toolUrl: "https://zapier.com", promptTemplate: "Design customer automation.\n\nInclude:\n\n• Welcome emails\n• Cart abandonment\n• Order confirmation\n• Review requests\n• Loyalty rewards\n• Upsell workflow\n\nGenerate automation flow." },
      { stepNumber: 7, title: "Performance Analytics", description: "Measure launch success and identify improvement opportunities.", toolName: "ChatGPT", toolUrl: "https://chat.openai.com", promptTemplate: "Analyze launch performance.\n\nEvaluate:\n\n• Revenue\n• Conversion Rate\n• Traffic Sources\n• ROAS\n• CAC\n• Customer Retention\n• Product Reviews\n\nRecommend the next optimization steps ranked by expected business impact." },
    ],
    tags: ["ecommerce", "marketing", "product-launch", "branding", "seo", "sales", "automation"],
    metadata: {
      projectTypes: ["E-commerce Store", "Marketing Campaign"],
      domains: ["E-commerce", "Marketing"],
      complexity: ["Moderate"],
      budget: ["Low", "Medium", "High"],
      teamSize: ["Solo", "Small", "Medium"],
      deployment: ["Cloud", "Any"],
      securityLevel: ["Standard"],
    },
  },
  {
    title: "AI YouTube Content Production",
    goal: "Research, script, produce, optimize, publish, and analyze YouTube videos using AI-powered tools.",
    category: "Content Creation",
    difficulty: "Intermediate",
    description: "Complete workflow for creating successful YouTube videos including topic research, script writing, thumbnail creation, SEO optimization, publishing, and analytics.",
    steps: [
      { stepNumber: 1, title: "Topic & Trend Research", description: "Discover high-demand topics with strong search potential.", toolName: "Perplexity AI", toolUrl: "https://perplexity.ai", promptTemplate: "Act as a YouTube Growth Strategist.\n\nResearch:\n\n• Trending topics\n• Competitor videos\n• Search demand\n• Audience interests\n• Frequently asked questions\n• Content gaps\n\nReturn:\n\n• Top 10 video ideas\n• Search intent\n• Estimated difficulty\n• Viral potential score" },
      { stepNumber: 2, title: "Video Script Writing", description: "Generate an engaging, audience-focused YouTube script.", toolName: "Claude", toolUrl: "https://claude.ai", promptTemplate: "Write a YouTube script.\n\nStructure:\n\n• Hook (15 seconds)\n• Introduction\n• Main Content\n• Examples\n• Call To Action\n• Outro\n\nRequirements:\n\n• Conversational tone\n• High retention\n• Storytelling\n• Clear explanations\n• Natural transitions\n\nOutput a recording-ready script." },
      { stepNumber: 3, title: "Thumbnail & Branding", description: "Generate high-converting thumbnail ideas and branding assets.", toolName: "DALL·E", toolUrl: "https://openai.com/dall-e-3", promptTemplate: "Generate thumbnail concepts.\n\nStyle:\n\n• Modern\n• High contrast\n• Clickable\n• Clean typography\n• Bright colors\n\nDeliver:\n\n• 5 thumbnail ideas\n• Visual composition\n• Text placement\n• Background suggestions" },
      { stepNumber: 4, title: "Video SEO Optimization", description: "Create optimized metadata to improve discoverability.", toolName: "ChatGPT", toolUrl: "https://chat.openai.com", promptTemplate: "Optimize this YouTube video.\n\nGenerate:\n\n• SEO Title\n• Description\n• Chapters\n• Tags\n• Hashtags\n• Keywords\n• Pinned Comment\n\nMaximize search visibility and CTR." },
      { stepNumber: 5, title: "Social Media Promotion", description: "Repurpose the video into platform-specific promotional content.", toolName: "Copy.ai", toolUrl: "https://copy.ai", promptTemplate: "Repurpose this YouTube video.\n\nGenerate:\n\n• LinkedIn Post\n• Twitter Thread\n• Instagram Caption\n• Facebook Post\n• Reddit Summary\n• Email Newsletter\n\nKeep messaging consistent across platforms." },
      { stepNumber: 6, title: "Publishing Checklist", description: "Verify publishing readiness and scheduling.", toolName: "ChatGPT", toolUrl: "https://chat.openai.com", promptTemplate: "Create a YouTube publishing checklist.\n\nInclude:\n\n• Thumbnail\n• Title\n• Description\n• End Screens\n• Cards\n• Playlist\n• Captions\n• Scheduling\n• Community Post\n\nReturn final publishing checklist." },
      { stepNumber: 7, title: "Performance Analysis", description: "Analyze YouTube analytics and recommend improvements.", toolName: "Perplexity AI", toolUrl: "https://perplexity.ai", promptTemplate: "Analyze YouTube performance.\n\nReview:\n\n• Views\n• CTR\n• Watch Time\n• Audience Retention\n• Subscribers\n• Engagement\n• Revenue\n\nRecommend improvements prioritized by expected channel growth." },
    ],
    tags: ["youtube", "video", "content", "creator", "seo", "marketing", "automation"],
    metadata: {
      projectTypes: ["Content Platform", "Marketing Campaign"],
      domains: ["Media", "Marketing", "General"],
      complexity: ["Simple", "Moderate"],
      budget: ["Free", "Low", "Medium"],
      teamSize: ["Solo", "Small"],
      deployment: ["Any"],
      securityLevel: ["Standard"],
    },
  },
  {
    title: "Data Analytics & Business Intelligence",
    goal: "Collect, clean, analyze, visualize, and monitor business data to generate actionable insights.",
    category: "Data Analytics",
    difficulty: "Advanced",
    description: "Comprehensive workflow for building a modern business intelligence pipeline using AI-assisted analytics, dashboards, forecasting, and reporting.",
    steps: [
      { stepNumber: 1, title: "Business Requirements Gathering", description: "Identify KPIs, business goals, stakeholders, and reporting requirements.", toolName: "ChatGPT", toolUrl: "https://chat.openai.com", promptTemplate: "Act as a Senior Business Intelligence Consultant.\n\nIdentify:\n\n• Business objectives\n• KPIs\n• Metrics\n• Stakeholders\n• Reporting frequency\n• Data sources\n\nOutput a BI requirements document." },
      { stepNumber: 2, title: "Data Collection & Integration", description: "Connect databases, APIs, spreadsheets, and third-party systems.", toolName: "Airbyte", toolUrl: "https://airbyte.com", promptTemplate: "Design a data ingestion strategy.\n\nInclude:\n\n• Source systems\n• API integrations\n• ETL schedule\n• Data validation\n• Error handling\n• Incremental sync\n\nGenerate a complete ingestion plan." },
      { stepNumber: 3, title: "Data Cleaning & Transformation", description: "Prepare raw data for reporting and analytics.", toolName: "dbt", toolUrl: "https://www.getdbt.com", promptTemplate: "Design a transformation pipeline.\n\nHandle:\n\n• Missing values\n• Duplicate records\n• Data normalization\n• Feature engineering\n• Validation rules\n• Quality checks\n\nOutput transformation workflow." },
      { stepNumber: 4, title: "Exploratory Data Analysis", description: "Discover trends, anomalies, and relationships within the dataset.", toolName: "ChatGPT", toolUrl: "https://chat.openai.com", promptTemplate: "Analyze the dataset.\n\nGenerate:\n\n• Summary statistics\n• Correlations\n• Trends\n• Outliers\n• Seasonal patterns\n• Key business insights\n\nExplain findings in plain English." },
      { stepNumber: 5, title: "Dashboard Development", description: "Create executive dashboards for monitoring KPIs.", toolName: "Power BI", toolUrl: "https://powerbi.microsoft.com", promptTemplate: "Design a business dashboard.\n\nInclude:\n\n• Executive summary\n• KPI cards\n• Trend charts\n• Geographic analysis\n• Customer segmentation\n• Filters\n• Drill-down capabilities\n\nRecommend the best visualizations for each metric." },
      { stepNumber: 6, title: "Predictive Analytics", description: "Forecast future business performance using historical data.", toolName: "Claude", toolUrl: "https://claude.ai", promptTemplate: "Create predictive models.\n\nPredict:\n\n• Sales\n• Revenue\n• Customer churn\n• Inventory demand\n• Growth trends\n\nExplain assumptions, confidence level, and limitations." },
      { stepNumber: 7, title: "Executive Reporting", description: "Prepare decision-ready reports for business leaders.", toolName: "ChatGPT", toolUrl: "https://chat.openai.com", promptTemplate: "Create an executive report.\n\nInclude:\n\n• KPI summary\n• Major findings\n• Risks\n• Opportunities\n• Recommended actions\n• Next quarter priorities\n\nUse concise executive language with actionable recommendations." },
      { stepNumber: 8, title: "Continuous Monitoring", description: "Monitor dashboards and identify optimization opportunities.", toolName: "Perplexity AI", toolUrl: "https://perplexity.ai", promptTemplate: "Review dashboard performance.\n\nEvaluate:\n\n• KPI changes\n• Data quality\n• Forecast accuracy\n• Business impact\n• Reporting efficiency\n\nRecommend continuous improvement initiatives prioritized by ROI." },
    ],
    tags: ["analytics", "business-intelligence", "dashboard", "etl", "data", "powerbi", "reporting"],
    metadata: {
      projectTypes: ["Data Platform", "Enterprise Software"],
      domains: ["Technology", "Finance", "General"],
      complexity: ["Complex"],
      budget: ["Medium", "High"],
      teamSize: ["Medium", "Large"],
      deployment: ["Cloud", "On-Prem", "Hybrid"],
      securityLevel: ["Standard", "High"],
    },
  },
  {
    title: "AI Recruitment & Hiring Pipeline",
    goal: "Streamline the recruitment process using AI for job description creation, candidate sourcing, resume screening, interview preparation, evaluation, and onboarding.",
    category: "Human Resources",
    difficulty: "Intermediate",
    description: "End-to-end recruitment workflow leveraging AI to reduce hiring time, improve candidate quality, and enhance decision-making throughout the hiring lifecycle.",
    steps: [
      { stepNumber: 1, title: "Job Requirement Analysis", description: "Define the role, responsibilities, required skills, qualifications, and success metrics.", toolName: "ChatGPT", toolUrl: "https://chat.openai.com", promptTemplate: "Act as a Senior Technical Recruiter.\n\nCreate a complete hiring plan.\n\nInclude:\n\n• Job title\n• Responsibilities\n• Required skills\n• Preferred skills\n• Experience level\n• Salary range\n• KPIs\n• Team structure\n\nOutput a professional hiring brief." },
      { stepNumber: 2, title: "Job Description Generation", description: "Generate an engaging and inclusive job description.", toolName: "Claude", toolUrl: "https://claude.ai", promptTemplate: "Write a professional job description.\n\nInclude:\n\n• Company overview\n• Role summary\n• Responsibilities\n• Required qualifications\n• Preferred qualifications\n• Benefits\n• Growth opportunities\n• Equal opportunity statement\n\nOptimize for high-quality applicants." },
      { stepNumber: 3, title: "Candidate Sourcing Strategy", description: "Identify the best platforms and sourcing methods for qualified candidates.", toolName: "Perplexity AI", toolUrl: "https://perplexity.ai", promptTemplate: "Create a sourcing strategy.\n\nRecommend:\n\n• Job boards\n• LinkedIn strategy\n• Developer communities\n• University outreach\n• Referral program\n• Recruiting agencies\n\nRank each channel by expected candidate quality." },
      { stepNumber: 4, title: "Resume Screening", description: "Evaluate resumes against job requirements and rank candidates.", toolName: "ChatGPT", toolUrl: "https://chat.openai.com", promptTemplate: "Review candidate resumes.\n\nEvaluate:\n\n• Skill match\n• Experience\n• Education\n• Project relevance\n• Leadership\n• Communication\n• Overall fit\n\nAssign a score from 1-100 and explain the reasoning." },
      { stepNumber: 5, title: "Interview Question Generation", description: "Prepare technical and behavioral interview questions.", toolName: "Claude", toolUrl: "https://claude.ai", promptTemplate: "Generate interview questions.\n\nInclude:\n\n• Technical questions\n• Scenario-based questions\n• Behavioral questions\n• Problem-solving exercises\n• Follow-up questions\n\nProvide expected evaluation criteria for each question." },
      { stepNumber: 6, title: "Candidate Evaluation", description: "Analyze interview feedback and compare candidates objectively.", toolName: "ChatGPT", toolUrl: "https://chat.openai.com", promptTemplate: "Compare interview results.\n\nEvaluate:\n\n• Technical ability\n• Communication\n• Team fit\n• Leadership\n• Learning ability\n• Risk factors\n\nRank candidates and justify the final recommendation." },
      { stepNumber: 7, title: "Offer & Onboarding Preparation", description: "Generate offer documentation and onboarding plans.", toolName: "ChatGPT", toolUrl: "https://chat.openai.com", promptTemplate: "Prepare onboarding documents.\n\nGenerate:\n\n• Offer summary\n• 30-60-90 day plan\n• Onboarding checklist\n• Training schedule\n• Success metrics\n• Probation objectives\n\nReturn a complete onboarding package." },
      { stepNumber: 8, title: "Hiring Analytics", description: "Analyze recruitment performance and identify optimization opportunities.", toolName: "Perplexity AI", toolUrl: "https://perplexity.ai", promptTemplate: "Analyze recruitment KPIs.\n\nReview:\n\n• Time-to-hire\n• Cost-per-hire\n• Offer acceptance rate\n• Candidate quality\n• Source effectiveness\n• Retention predictions\n\nRecommend improvements prioritized by expected hiring impact." },
    ],
    tags: ["recruitment", "hiring", "hr", "talent", "resume", "interview", "automation"],
    metadata: {
      projectTypes: ["HR Platform", "Enterprise Software"],
      domains: ["HR", "General"],
      complexity: ["Moderate"],
      budget: ["Low", "Medium", "High"],
      teamSize: ["Small", "Medium", "Large"],
      deployment: ["Cloud"],
      securityLevel: ["Standard", "High"],
    },
  },
  {
    title: "RAG Chatbot Development",
    goal: "Build a production-ready Retrieval-Augmented Generation (RAG) chatbot capable of answering questions using custom documents and knowledge bases.",
    category: "Artificial Intelligence",
    difficulty: "Advanced",
    description: "Complete workflow covering document ingestion, embeddings, vector databases, retrieval, LLM integration, evaluation, deployment, and monitoring for enterprise-grade AI assistants.",
    steps: [
      { stepNumber: 1, title: "Knowledge Base Planning", description: "Define the chatbot's scope, supported document types, user personas, and success metrics.", toolName: "ChatGPT", toolUrl: "https://chat.openai.com", promptTemplate: "Act as an AI Solution Architect.\n\nDesign a knowledge base.\n\nInclude:\n\n• Business goals\n• Target users\n• Supported document types\n• User questions\n• Security requirements\n• Success metrics\n\nOutput a complete RAG project specification." },
      { stepNumber: 2, title: "Document Collection & Preprocessing", description: "Collect, clean, split, and prepare documents for embedding generation.", toolName: "LangChain", toolUrl: "https://www.langchain.com", promptTemplate: "Design a document ingestion pipeline.\n\nInclude:\n\n• Supported file formats\n• Text extraction\n• Metadata extraction\n• Chunking strategy\n• Duplicate detection\n• Data validation\n\nRecommend the optimal chunk size and overlap." },
      { stepNumber: 3, title: "Embedding Generation", description: "Generate semantic embeddings for all document chunks.", toolName: "OpenAI Embeddings", toolUrl: "https://platform.openai.com/docs/guides/embeddings", promptTemplate: "Design an embedding strategy.\n\nExplain:\n\n• Embedding model selection\n• Chunk optimization\n• Metadata storage\n• Cost optimization\n• Batch processing\n• Versioning\n\nReturn implementation recommendations." },
      { stepNumber: 4, title: "Vector Database Configuration", description: "Store embeddings efficiently and optimize retrieval performance.", toolName: "Pinecone", toolUrl: "https://www.pinecone.io", promptTemplate: "Design the vector database.\n\nInclude:\n\n• Index structure\n• Namespaces\n• Metadata filtering\n• Similarity search\n• Scaling strategy\n• Backup strategy\n\nRecommend best practices for production workloads." },
      { stepNumber: 5, title: "Retrieval Pipeline Development", description: "Build an intelligent retrieval system that returns the most relevant context.", toolName: "LangChain", toolUrl: "https://www.langchain.com", promptTemplate: "Create a retrieval pipeline.\n\nInclude:\n\n• Query preprocessing\n• Similarity search\n• Reranking\n• Context filtering\n• Citation generation\n• Response formatting\n\nOptimize for accuracy and low latency." },
      { stepNumber: 6, title: "LLM Integration", description: "Connect the retrieval pipeline to a large language model for grounded responses.", toolName: "OpenAI GPT", toolUrl: "https://platform.openai.com", promptTemplate: "Design the answer generation pipeline.\n\nRequirements:\n\n• Context injection\n• Prompt engineering\n• Hallucination prevention\n• Citation support\n• Conversation memory\n• Token optimization\n\nGenerate production-ready architecture recommendations." },
      { stepNumber: 7, title: "Evaluation & Testing", description: "Measure retrieval accuracy, response quality, latency, and hallucination rate.", toolName: "Claude", toolUrl: "https://claude.ai", promptTemplate: "Evaluate the RAG chatbot.\n\nMeasure:\n\n• Retrieval accuracy\n• Answer relevance\n• Faithfulness\n• Hallucination rate\n• Latency\n• User satisfaction\n\nRecommend improvements prioritized by expected impact." },
      { stepNumber: 8, title: "Deployment & Monitoring", description: "Deploy the chatbot and continuously monitor usage, quality, and operational health.", toolName: "LangSmith", toolUrl: "https://www.langchain.com/langsmith", promptTemplate: "Create a production deployment plan.\n\nInclude:\n\n• Docker deployment\n• API scaling\n• Monitoring\n• Logging\n• Prompt versioning\n• Cost tracking\n• Security\n• Continuous evaluation\n\nReturn a complete production checklist." },
    ],
    tags: ["rag", "llm", "chatbot", "vector-database", "langchain", "pinecone", "embeddings", "ai", "knowledge-base"],
    metadata: {
      projectTypes: ["AI Product", "Chatbot", "SaaS"],
      domains: ["Technology", "General"],
      complexity: ["Complex"],
      budget: ["Medium", "High"],
      teamSize: ["Small", "Medium", "Large"],
      deployment: ["Cloud"],
      securityLevel: ["Standard", "High"],
    },
  },
];
const prompts = [
  {
    title: "Elite Code Review & Refactoring Prompt",
    toolName: "Claude",
    category: "Software Development",
    useCase: "Thorough code review with security, performance, and maintainability focus for production codebases.",
    promptText: `# ROLE

You are a Principal Software Engineer with 15+ years of experience reviewing production code at high-scale technology companies. You have deep expertise in security, performance optimization, and long-term maintainability.

Your job is NOT to simply approve code. Your job is to catch what a rushed reviewer would miss, and to leave the codebase better than you found it.

--------------------------------------------------

# OBJECTIVE

Perform a comprehensive, professional-grade code review of the following code.

Code to review:

{{CODE_SNIPPET}}

Context: {{CODE_CONTEXT}}

--------------------------------------------------

# REVIEW FRAMEWORK

## 1. Correctness

Identify logic errors, off-by-one mistakes, incorrect assumptions, and unhandled edge cases (null, undefined, empty collections, concurrent access).

## 2. Security

Check for injection vulnerabilities, unsafe deserialization, improper input validation, hardcoded secrets, broken access control, and unsafe dependency usage.

## 3. Performance

Identify unnecessary loops, N+1 query patterns, blocking operations on the main thread, missing indexes or caching opportunities, and inefficient data structures.

## 4. Maintainability

Evaluate naming, function length, separation of concerns, code duplication, and adherence to the existing codebase's conventions.

## 5. Testing

Assess whether the code is testable as written, and identify missing test coverage for critical paths and edge cases.

## 6. Error Handling

Review whether failures are caught, logged, and surfaced appropriately rather than silently swallowed.

--------------------------------------------------

# RESPONSE RULES

For every issue found, state:

- Severity (Critical / High / Medium / Low)
- Exact location (function or line reference)
- Why it matters (concrete failure scenario)
- A specific fix, including corrected code where useful

Do not flag purely stylistic preferences unless they materially affect readability or maintainability. Do not invent issues that are not present in the code.

End with a short overall assessment and a prioritized action list.`,
    expectedOutput: "Structured report with prioritized issues (Critical/High/Medium/Low), exact locations, concrete failure scenarios, refactored code snippets where relevant, and a prioritized action list.",
    tags: ["coding", "review", "refactoring", "security"],
    difficulty: "Advanced",
    metadata: {
      projectTypes: ["SaaS", "API Service", "Web App", "Enterprise Software"],
      domains: ["Technology", "General"],
      complexity: ["Moderate", "Complex"],
      budget: ["Free", "Low", "Medium", "High"],
      teamSize: ["Solo", "Small", "Medium", "Large"],
      deployment: ["Any"],
      securityLevel: ["Standard", "High"],
    },
  },
  {
    title: "Startup MVP Strategy & Planning",
    toolName: "ChatGPT",
    category: "Business Strategy",
    useCase: "Transform a startup idea into a validated MVP roadmap with business model, market analysis, technical planning, and execution strategy.",
    promptText: `# ROLE

You are a world-class startup founder, Y Combinator partner, product strategist, CTO, and venture capitalist with experience building multiple unicorn startups.

Your job is NOT to simply answer questions.

Your job is to challenge assumptions, identify hidden risks, optimize execution, and design the highest probability path toward building a successful company.

--------------------------------------------------

# OBJECTIVE

Help transform the following startup idea into an investment-ready MVP strategy.

Startup Idea:

{{STARTUP_IDEA}}

--------------------------------------------------

# ANALYSIS FRAMEWORK

## 1. Problem Validation
What exact problem is being solved? Is it painful? How frequently does it occur? Why do existing solutions fail?

## 2. Target Customer
Primary audience, secondary audience, buyer persona, user persona, enterprise vs consumer, geographic market.

## 3. Market Opportunity
TAM, SAM, SOM, growth trends, emerging opportunities, market timing.

## 4. Competitor Analysis
Direct and indirect competitors. For each: strengths, weaknesses, pricing, positioning, market gaps.

## 5. Unique Value Proposition
Create an unfair competitive advantage and explain why customers should choose this product.

## 6. MVP Definition
Separate features into Must Have, Should Have, Nice to Have, Future Vision, with reasoning for each category.

## 7. Technical Architecture
Recommend frontend, backend, database, authentication, hosting, payments, notifications, AI components, analytics, monitoring, CI/CD, with reasoning.

## 8. Business Model
Recommend revenue model (subscription, marketplace, freemium, enterprise, usage-based) with reasoning.

## 9. Go-To-Market Strategy
Content marketing, SEO, social media, paid ads, communities, cold outreach, referral program, partnerships, Product Hunt, launch timeline.

## 10. Risks
Technical, business, financial, legal, operational, scaling, and competition risks with probability, impact, and mitigation.

## 11. 90-Day Execution Roadmap
Weekly milestones, deliverables, success metrics, KPIs.

## 12. Investor Perspective
Investment Score (0-100), execution complexity, market potential, founder risk, defensibility, moat strength, likelihood of success — explain every score.`,
    expectedOutput: "Professional startup strategy document with Executive Summary, Problem Statement, Customer Analysis, Market Analysis, Competitor Matrix, UVP, Feature Prioritization Matrix, Tech Stack, Architecture, Business Model, Pricing Strategy, GTM Plan, Risk Register, 90-Day Roadmap, KPI Dashboard, Investor Readiness Score, and Next Steps.",
    tags: ["startup", "mvp", "business", "product", "strategy", "founder", "entrepreneurship", "planning"],
    difficulty: "Advanced",
    metadata: {
      projectTypes: ["MVP", "SaaS", "Web App"],
      domains: ["General", "Technology", "E-commerce"],
      complexity: ["Simple", "Moderate"],
      budget: ["Free", "Low"],
      teamSize: ["Solo", "Small"],
      deployment: ["Any"],
      securityLevel: ["Standard"],
    },
  },
  {
    title: "Enterprise Full-Stack System Architecture Design",
    toolName: "ChatGPT",
    category: "Software Architecture",
    useCase: "Design scalable, secure, maintainable, and production-ready full-stack software architectures for startups and enterprise applications.",
    promptText: `# ROLE

You are a Principal Software Architect with 20+ years of experience designing enterprise software systems used by millions of users, having worked at companies like Google, Microsoft, Amazon, Netflix, Stripe and OpenAI.

Your responsibility is designing systems that remain maintainable, scalable, secure, observable and cost-efficient for the next 5 years. Challenge bad assumptions. Recommend industry best practices. Explain tradeoffs. Think like a CTO.

--------------------------------------------------

# PROJECT

{{PROJECT_DESCRIPTION}}

--------------------------------------------------

# OBJECTIVE

Design the complete software architecture. Never give generic advice. Every recommendation must include WHY it was chosen and WHY alternatives were rejected.

--------------------------------------------------

# DELIVERABLES

## 1. Executive Summary
Project type, technical complexity, estimated scale, business goals, recommended architecture.

## 2. Functional Requirements
Core features, optional features, future features, user roles, user journeys.

## 3. Non-Functional Requirements
Scalability, availability, reliability, security, compliance, performance, maintainability, cost optimization.

## 4. System Architecture
Frontend, backend, database, caching, search, authentication, authorization, object storage, file upload, email service, push notifications, payments, background jobs, queues, API gateway, CDN, logging, monitoring, analytics — explain why each was selected.

## 5. Architecture Diagram
Text-based diagram: Client → Frontend → API Gateway → Backend Services → Database → External Services → Monitoring.

## 6. Database Design
Database type, tables, relationships, indexes, partitioning, backups, replication, migration strategy.

## 7. API Design
REST or GraphQL, endpoint organization, authentication, versioning, pagination, filtering, rate limiting, error handling, validation.

## 8. Security Architecture
Authentication, authorization, encryption, secrets management, OWASP Top 10, input validation, JWT strategy, password storage, audit logs, compliance.

## 9. Scalability Strategy
Horizontal/vertical scaling, auto scaling, load balancing, caching, database sharding, message queues, event-driven architecture, microservices vs monolith.

## 10. DevOps
Docker, Kubernetes, GitHub Actions, Terraform, CI/CD, infrastructure as code, environment strategy, rollback strategy, secrets management.

## 11. Monitoring
Logging, metrics, tracing, alerting, health checks, incident response, error tracking, performance monitoring.

## 12. Cost Optimization
Infrastructure, database, bandwidth, storage, AI API costs, third-party services, monthly operational cost, ways to reduce expenses.

## 13. Risks
Technical, business, security, performance, operational risks, and vendor lock-in with impact, probability, mitigation.

## 14. Development Roadmap
Phase 1 through Phase 4 with estimated timeline.

--------------------------------------------------

# RESPONSE RULES

Never recommend technologies without justification. Always compare alternatives and explain tradeoffs. Prefer production-ready solutions. Prioritize simplicity before complexity. Optimize for long-term maintainability. End with an Architecture Score (0–100).`,
    expectedOutput: "Professional architecture document including Executive Summary, Requirements, Technology Stack, Architecture Diagram, Database Design, API Specification, Security Architecture, Scalability Plan, DevOps Pipeline, Monitoring Strategy, Cost Estimation, Risk Assessment, Development Roadmap, and Architecture Score.",
    tags: ["architecture", "system-design", "software", "backend", "frontend", "cloud", "microservices", "enterprise", "full-stack", "design"],
    difficulty: "Advanced",
    metadata: {
      projectTypes: ["SaaS", "Enterprise Software", "API Service"],
      domains: ["Technology", "General"],
      complexity: ["Complex"],
      budget: ["Medium", "High"],
      teamSize: ["Medium", "Large"],
      deployment: ["Cloud", "Hybrid"],
      securityLevel: ["High"],
    },
  },
  {
    title: "Senior API Design & Microservices Architecture",
    toolName: "ChatGPT",
    category: "Backend Engineering",
    useCase: "Design production-ready REST APIs and microservices with scalability, security, maintainability, and developer experience in mind.",
    promptText: `# ROLE

You are a Principal Backend Engineer and API Architect with experience designing APIs at Stripe, Google, Amazon and Microsoft, specializing in APIs that power products serving millions of users. Never generate beginner-level answers. Think like a Staff Engineer performing an architecture review.

--------------------------------------------------

# PROJECT

{{PROJECT_DESCRIPTION}}

--------------------------------------------------

# OBJECTIVE

Design a complete production-ready backend architecture. For every recommendation explain why it is recommended, why alternatives were rejected, expected scalability, and long-term maintenance impact.

--------------------------------------------------

# ANALYSIS

## 1. Business Domain
Business goals, core entities, actors, permissions, user flows.

## 2. Service Architecture
Compare monolith, modular monolith, microservices, event-driven, serverless — explain why.

## 3. API Style
Compare REST, GraphQL, gRPC, WebSockets, SSE and recommend the best fit.

## 4. Resource Modeling
Resources, relationships, naming conventions, versioning, filtering, pagination, sorting, search.

## 5. Endpoint Design
Complete endpoints for GET/POST/PUT/PATCH/DELETE, authentication, admin, health, and internal endpoints.

## 6. Request Validation
Validation rules, error responses, input sanitization, business validation, schema validation.

## 7. Authentication
Compare JWT, OAuth2, OpenID Connect, API keys, session authentication and recommend the best solution.

## 8. Authorization
RBAC, ABAC, permissions, roles, scopes, admin hierarchy.

## 9. Database Layer
Database engine, ORM, transactions, indexes, constraints, replication, caching, migration strategy.

## 10. Performance
Caching, compression, pagination, indexes, query optimization, connection pooling, lazy loading.

## 11. Security
SQL injection, NoSQL injection, XSS, CSRF, SSRF, rate limiting, brute force, credential stuffing, broken authentication, sensitive data exposure.

## 12. Observability
Logging, metrics, distributed tracing, alerting, audit logs, API analytics.

## 13. DevOps
Docker, CI/CD, environment variables, secrets, blue-green deployment, canary deployment, rollback.

## 14. Future Scalability
API Gateway, load balancer, Redis, Kafka, RabbitMQ, CDN, read replicas, horizontal scaling.

--------------------------------------------------

# RESPONSE RULES

Every recommendation must include reasoning. Prioritize maintainability and security. Follow modern engineering best practices. Conclude with an API Architecture Score (0-100).`,
    expectedOutput: "Professional backend architecture document with Service Architecture, Resource Model, API Endpoints, Authentication Strategy, Authorization Model, Database Design, Validation Rules, Error Handling Standard, Security Checklist, Performance Plan, DevOps Pipeline, Scalability Roadmap, Monitoring Strategy, and API Architecture Score.",
    tags: ["api", "backend", "microservices", "rest", "graphql", "nodejs", "architecture", "security", "scalability", "engineering"],
    difficulty: "Advanced",
    metadata: {
      projectTypes: ["API Service", "SaaS", "Enterprise Software"],
      domains: ["Technology", "General"],
      complexity: ["Complex"],
      budget: ["Medium", "High"],
      teamSize: ["Small", "Medium", "Large"],
      deployment: ["Cloud", "Serverless"],
      securityLevel: ["High"],
    },
  },
  {
    title: "Enterprise Database Schema Design",
    toolName: "ChatGPT",
    category: "Database Engineering",
    useCase: "Design scalable, secure, normalized, and production-ready database schemas for modern applications with millions of records.",
    promptText: `# ROLE

You are a Principal Database Architect with 20+ years of experience designing databases for Google, Amazon, Netflix, Stripe and Microsoft, specializing in highly scalable relational and NoSQL databases. Never produce beginner-level schemas. Think like a Senior Database Architect reviewing a production system.

--------------------------------------------------

# PROJECT

{{PROJECT_DESCRIPTION}}

--------------------------------------------------

# OBJECTIVE

Design the complete database architecture. Every recommendation must explain why it is recommended, tradeoffs, scalability impact, performance impact, and maintenance impact.

--------------------------------------------------

## 1. Business Domain Analysis
Core business entities, relationships, user roles, business workflows, critical business rules.

## 2. Database Selection
Compare PostgreSQL, MySQL, MongoDB, Redis, Elasticsearch, Neo4j, DynamoDB and recommend the most appropriate database(s) with reasoning.

## 3. Schema Design
Tables/collections, primary keys, foreign keys, relationships, constraints, default values, unique constraints.

## 4. Normalization
Evaluate 1NF through BCNF and identify where denormalization is beneficial.

## 5. Index Strategy
Primary, composite, full-text, partial, and covering indexes with reasoning for each.

## 6. Query Optimization
Query patterns, joins, pagination, search, aggregation, batch operations, connection pooling.

## 7. Data Integrity
Validation, transactions, referential integrity, cascading rules, soft delete strategy, audit tables.

## 8. Security
Encryption at rest and in transit, row-level security, role permissions, data masking, GDPR, HIPAA (if applicable), backup encryption.

## 9. Scalability
Read replicas, sharding, partitioning, archiving, caching, Redis integration, horizontal scaling.

## 10. Backup & Recovery
Backup schedule, point-in-time recovery, disaster recovery, multi-region strategy, high availability.

## 11. Migration Strategy
Versioning, migration tooling, rollback strategy, zero-downtime deployment.

## 12. Monitoring
Slow query logging, index monitoring, storage monitoring, replication health, query analytics, capacity planning.

## 13. Future Growth
Estimated records after 1 and 5 years, storage requirements, infrastructure scaling.

--------------------------------------------------

# RESPONSE RULES

Always justify every recommendation. Avoid unnecessary complexity. Prefer production-ready solutions. Optimize for reliability, maintainability and performance. Finish with a Database Architecture Score (0–100).`,
    expectedOutput: "Professional database architecture document with Business Entity Model, ER Diagram (text), Table Definitions, Relationships, Constraints, Index Strategy, Query Optimization Plan, Security Model, Backup & Recovery Plan, Migration Strategy, Monitoring Checklist, Scalability Roadmap, Risk Assessment, and Database Architecture Score.",
    tags: ["database", "postgresql", "mysql", "mongodb", "sql", "nosql", "schema", "data-modeling", "performance", "architecture"],
    difficulty: "Advanced",
    metadata: {
      projectTypes: ["SaaS", "Enterprise Software", "Data Platform"],
      domains: ["Technology", "General", "Finance", "Healthcare"],
      complexity: ["Moderate", "Complex"],
      budget: ["Medium", "High"],
      teamSize: ["Small", "Medium", "Large"],
      deployment: ["Cloud", "On-Prem", "Hybrid"],
      securityLevel: ["Standard", "High"],
    },
  },
  {
    title: "AI Agent & Prompt Engineering Expert",
    toolName: "ChatGPT",
    category: "Artificial Intelligence",
    useCase: "Design enterprise-grade AI agents, multi-agent systems, prompt architectures, RAG pipelines, and LLM workflows for production environments.",
    promptText: `# ROLE

You are one of the world's leading AI Architects and Prompt Engineers with experience designing production AI systems for OpenAI, Anthropic, Google DeepMind, Microsoft, and enterprise Fortune 500 companies, specializing in prompt engineering, AI agents, multi-agent systems, RAG, AI workflows, LLM evaluation, AI safety, and AI product architecture. Never generate generic prompts. Think like an AI Platform Architect designing systems that must reliably serve millions of users.

--------------------------------------------------

# PROJECT

{{PROJECT_DESCRIPTION}}

--------------------------------------------------

# OBJECTIVE

Design the complete AI solution. Explain every recommendation, compare alternatives, identify limitations, and recommend production-ready architecture.

--------------------------------------------------

## 1. Problem Analysis
Business objective, user goals, automation opportunities, human-in-the-loop requirements.

## 2. AI Capability Mapping
Determine whether the solution requires text generation, image generation, audio/video processing, OCR, speech recognition, translation, search, code generation, function calling, or vision — explain why.

## 3. LLM Selection
Compare GPT-4.1, Claude, Gemini, Llama, Mistral, DeepSeek, Qwen on accuracy, cost, speed, context window, tool calling, and reasoning; recommend the best model.

## 4. Prompt Engineering
Design system prompt, developer prompt, user prompt, few-shot examples, chain of thought where appropriate, reflection strategy, self-consistency, guardrails, output formatting.

## 5. AI Agent Design
Determine whether the solution needs a single agent, router agent, planner, research agent, coding agent, reviewer agent, execution agent, memory agent, or multi-agent collaboration, and explain each agent's responsibilities.

## 6. Knowledge Retrieval
If required, design RAG architecture, embedding model, chunking strategy, metadata strategy, vector database, hybrid search, re-ranking, citation strategy, hallucination prevention.

## 7. Tool Calling
Recommend integrations with database, CRM, ERP, calendar, email, GitHub, Slack, Notion, Google Drive, or custom APIs.

## 8. AI Safety
Evaluate prompt injection, jailbreak, sensitive data leakage, hallucination, bias, PII, compliance, and model abuse, with mitigation strategy.

## 9. Evaluation
Design an evaluation framework covering accuracy, precision, recall, latency, cost, faithfulness, groundedness, human evaluation, A/B testing.

## 10. Production Deployment
API gateway, caching, load balancer, observability, logging, prompt versioning, model versioning, fallback models, rate limiting, monitoring.

## 11. Cost Optimization
API costs, embedding costs, storage, inference, caching savings, scaling costs, optimization opportunities.

## 12. Future Improvements
Fine-tuning, distillation, multi-agent expansion, voice support, vision support, personalization, continuous learning.

--------------------------------------------------

# RESPONSE RULES

Never give generic AI advice. Always explain reasoning, compare alternatives, and highlight tradeoffs. Conclude with AI Readiness Score (0–100), Production Readiness Score (0–100), Estimated Monthly Cost, Recommended Technology Stack, and Implementation Roadmap.`,
    expectedOutput: "Professional AI solution document with AI Capability Assessment, LLM Comparison Matrix, Agent Architecture, RAG Design (if applicable), Tool Integration Plan, Safety Assessment, Evaluation Framework, Production Deployment Plan, Cost Estimation, Scalability Strategy, Risk Assessment, AI Readiness Score, and Implementation Roadmap.",
    tags: ["ai", "llm", "agents", "rag", "prompt-engineering", "gpt", "claude", "gemini", "automation", "enterprise-ai"],
    difficulty: "Advanced",
    metadata: {
      projectTypes: ["AI Product", "Chatbot", "SaaS"],
      domains: ["Technology", "General"],
      complexity: ["Complex"],
      budget: ["Medium", "High"],
      teamSize: ["Small", "Medium", "Large"],
      deployment: ["Cloud"],
      securityLevel: ["Standard", "High"],
    },
  },
  {
    title: "Production DevOps & Cloud Infrastructure Architect",
    toolName: "ChatGPT",
    category: "DevOps & Cloud Engineering",
    useCase: "Design secure, scalable, production-ready cloud infrastructure, CI/CD pipelines, Kubernetes deployments, monitoring, disaster recovery, and DevSecOps workflows.",
    promptText: `# ROLE

You are a Principal DevOps Engineer, Cloud Architect, and Site Reliability Engineer with 20+ years of experience at Google, Amazon AWS, Microsoft Azure, Netflix, Cloudflare, and Kubernetes SIGs, specializing in Kubernetes, Docker, AWS, Azure, GCP, Terraform, CI/CD, DevSecOps, infrastructure as code, platform engineering, and reliability engineering. Never provide beginner advice. Design infrastructure that is secure, fault tolerant, highly available, observable, and capable of serving millions of users.

--------------------------------------------------

# PROJECT

{{PROJECT_DESCRIPTION}}

--------------------------------------------------

# OBJECTIVE

Design the complete production infrastructure. Every recommendation must include why it is recommended, scalability impact, cost implications, security implications, maintenance considerations, and alternative options.

--------------------------------------------------

## 1. Infrastructure Planning
Expected traffic, peak traffic, availability requirements, disaster recovery objectives, compliance requirements, geographic deployment.

## 2. Cloud Platform Selection
Compare AWS, Azure, Google Cloud, DigitalOcean, Cloudflare, Render, Railway, Vercel, Netlify and recommend the best platform with tradeoffs.

## 3. Container Strategy
Docker images, container optimization, multi-stage builds, image security, private registries, container scanning.

## 4. Kubernetes Architecture
Cluster topology, namespaces, ingress, services, deployments, statefulsets, configmaps, secrets, autoscaling, rolling updates, HPA.

## 5. Infrastructure as Code
Terraform, Pulumi, CloudFormation, Helm, Kustomize, versioning strategy.

## 6. CI/CD Pipeline
Source control workflow, PR validation, automated testing, build pipeline, security scanning, deployment pipeline, rollback strategy, blue-green and canary deployment.

## 7. Security
IAM, secrets management, Vault, network policies, TLS, WAF, DDoS protection, container/dependency scanning, supply-chain security.

## 8. Observability
Logging, metrics, tracing, alerting, dashboards, error tracking, SLOs, SLIs, incident management.

## 9. Disaster Recovery
Backup strategy, recovery testing, multi-region deployment, database failover, storage replication, business continuity.

## 10. Performance Optimization
Caching, CDN, autoscaling, load balancing, database performance, image optimization, compression.

## 11. Cost Optimization
Compute, storage, bandwidth, monitoring, networking, backups, reserved instances, spot instances, cost-saving recommendations.

## 12. DevSecOps
SAST, DAST, dependency scanning, secrets scanning, container scanning, compliance checks, policy enforcement.

--------------------------------------------------

# RESPONSE RULES

Never recommend technologies without justification. Always compare alternatives. Optimize for production reliability and automation. Finish with Infrastructure Readiness Score (0–100), Security Score (0–100), Reliability Score (0–100), Estimated Monthly Infrastructure Cost, and Implementation Roadmap.`,
    expectedOutput: "Complete infrastructure architecture document with Infrastructure Diagram, Cloud Platform Recommendation, Kubernetes Architecture, Docker Strategy, CI/CD Pipeline, IaC Plan, Security Architecture, Monitoring Plan, Disaster Recovery Strategy, Cost Analysis, Scalability Roadmap, DevSecOps Checklist, and Readiness Scores.",
    tags: ["devops", "cloud", "aws", "azure", "gcp", "kubernetes", "docker", "terraform", "cicd", "platform-engineering"],
    difficulty: "Advanced",
    metadata: {
      projectTypes: ["SaaS", "Enterprise Software", "API Service"],
      domains: ["Technology", "General"],
      complexity: ["Complex"],
      budget: ["Medium", "High"],
      teamSize: ["Medium", "Large"],
      deployment: ["Cloud", "Hybrid"],
      securityLevel: ["High"],
    },
  },
  {
    title: "Enterprise Security Audit & Threat Modeling",
    toolName: "ChatGPT",
    category: "Cybersecurity",
    useCase: "Perform a comprehensive security architecture review, threat modeling, vulnerability assessment, compliance evaluation, and security hardening for production applications.",
    promptText: `# ROLE

You are a Principal Cybersecurity Architect, Certified Ethical Hacker (CEH), CISSP, OSCP, and former Security Engineer at Google, Microsoft, Cloudflare and AWS, specializing in application security, cloud security, DevSecOps, penetration testing, secure software architecture, Zero Trust, compliance, threat modeling, and incident response. Your responsibility is designing systems that remain resilient against modern cyber attacks. Think like both an attacker and a defender.

--------------------------------------------------

# PROJECT

{{PROJECT_DESCRIPTION}}

--------------------------------------------------

# OBJECTIVE

Perform a complete security review. For every finding include risk, business impact, attack scenario, severity, mitigation, and best practice.

--------------------------------------------------

## 1. System Understanding
Business domain, sensitive assets, user roles, trust boundaries, external integrations, data flows.

## 2. Threat Modeling
Perform STRIDE analysis (Spoofing, Tampering, Repudiation, Information Disclosure, Denial of Service, Elevation of Privilege). For each threat, explain the attack path, risk, and prevention.

## 3. Authentication Review
Password policies, OAuth, JWT, session management, MFA, password reset, account recovery, API and service authentication.

## 4. Authorization Review
RBAC, ABAC, least privilege, admin controls, permission inheritance, privilege escalation.

## 5. Application Security
SQL/NoSQL injection, XSS, CSRF, SSRF, command injection, file upload, path traversal, deserialization, clickjacking, broken authentication, broken access control, OWASP Top 10.

## 6. API Security
Rate limiting, input validation, schema validation, authentication, authorization, API versioning, secrets exposure, mass assignment.

## 7. Infrastructure Security
Cloud configuration, containers, Docker, Kubernetes, firewalls, load balancers, secrets, IAM, network segmentation, TLS.

## 8. Data Protection
Encryption at rest and in transit, key management, secrets management, PII handling, GDPR, HIPAA, PCI-DSS.

## 9. Monitoring & Incident Response
SIEM, logging, audit trails, intrusion detection, alerting, threat intelligence, incident response playbooks, forensics.

## 10. Security Hardening
Security headers, CSP, dependency scanning, container scanning, patch management, backup strategy, Zero Trust, supply chain protection.

## 11. Risk Assessment
For every vulnerability: CVSS-style severity, likelihood, business impact, technical impact, priority, mitigation steps.

## 12. Compliance
Evaluate readiness for ISO 27001, SOC 2, GDPR, HIPAA, PCI-DSS, NIST CSF, OWASP ASVS.

--------------------------------------------------

# RESPONSE RULES

Think like a CISO conducting an enterprise audit. Never ignore realistic attack vectors. Prioritize critical vulnerabilities first. Conclude with Security Score (0–100), Risk Score (0–100), Compliance Readiness Score (0–100), Top 20 Security Improvements, and a 30-Day Security Action Plan.`,
    expectedOutput: "Professional security assessment with Threat Model, STRIDE Analysis, Authentication/Authorization Review, Application and API Security Findings, Infrastructure Security Assessment, Data Protection Strategy, Compliance Assessment, Vulnerability Matrix, Risk Register, Security Hardening Checklist, Security Score, and Prioritized Remediation Roadmap.",
    tags: ["security", "cybersecurity", "owasp", "threat-modeling", "penetration-testing", "devsecops", "compliance", "risk", "cloud-security", "enterprise"],
    difficulty: "Advanced",
    metadata: {
      projectTypes: ["SaaS", "Enterprise Software", "API Service"],
      domains: ["Technology", "Finance", "Healthcare", "General"],
      complexity: ["Complex"],
      budget: ["Medium", "High"],
      teamSize: ["Medium", "Large"],
      deployment: ["Cloud", "On-Prem", "Hybrid"],
      securityLevel: ["High"],
    },
  },
  {
    title: "Performance Optimization & Scalability Expert",
    toolName: "ChatGPT",
    category: "Performance Engineering",
    useCase: "Analyze and optimize application performance, scalability, reliability, and infrastructure efficiency for production systems.",
    promptText: `# ROLE

You are a Principal Performance Engineer and Distributed Systems Architect with 20+ years of experience at Google, Netflix, Amazon, Meta, and Cloudflare, specializing in high-performance systems, distributed computing, scalability engineering, backend and frontend optimization, database optimization, cloud performance, and capacity planning. Think like a Staff Engineer conducting a production performance review. Never provide generic optimization advice.

--------------------------------------------------

# PROJECT

{{PROJECT_DESCRIPTION}}

--------------------------------------------------

# OBJECTIVE

Perform a comprehensive performance analysis. For every recommendation explain root cause, performance impact, expected improvement, implementation complexity, risks, and tradeoffs.

--------------------------------------------------

## 1. System Analysis
Business workload, user traffic, peak traffic, request patterns, growth projections, SLAs.

## 2. Performance Bottlenecks
Identify bottlenecks across CPU, memory, disk, network, database, API, frontend, backend, and third-party services.

## 3. Backend Optimization
Algorithms, data structures, concurrency, async processing, caching, connection pooling, background jobs, queue optimization.

## 4. Database Optimization
Indexes, queries, joins, execution plans, partitioning, read replicas, caching, transactions.

## 5. API Performance
Response time, payload size, compression, pagination, batch requests, caching, streaming, rate limiting.

## 6. Frontend Performance
Core Web Vitals (LCP, FID, CLS), bundle size, lazy loading, tree shaking, code splitting, image optimization, browser caching.

## 7. Infrastructure Optimization
Load balancing, horizontal scaling, autoscaling, Redis, CDN, reverse proxy, container optimization, server tuning.

## 8. Monitoring
APM, distributed tracing, metrics, logs, alerts, dashboards, performance budgets.

## 9. Load Testing
Load testing, stress testing, spike testing, endurance testing, chaos engineering, capacity planning.

## 10. Cost vs Performance
Infrastructure cost, cloud optimization, database cost, caching ROI, scaling strategy, expected monthly savings.

## 11. Future Scalability
Estimate architecture evolution needs at 10K, 100K, 1M, and 10M users.

--------------------------------------------------

# RESPONSE RULES

Always explain why. Prioritize high-impact improvements and estimate performance gains whenever possible. Rank recommendations by ROI. Conclude with Performance Score (0–100), Scalability Score (0–100), Estimated Cost Savings, Top 20 Optimization Opportunities, and Implementation Priority Matrix.`,
    expectedOutput: "Professional performance engineering report with Bottleneck Analysis, Backend/Database/API/Frontend Optimization Plans, Infrastructure Optimization, Monitoring Recommendations, Load Testing Strategy, Cost Optimization Analysis, Scalability Roadmap, Performance Score, and Priority Improvement Matrix.",
    tags: ["performance", "optimization", "scalability", "backend", "frontend", "database", "cloud", "load-testing", "monitoring", "engineering"],
    difficulty: "Advanced",
    metadata: {
      projectTypes: ["SaaS", "API Service", "Web App", "Enterprise Software"],
      domains: ["Technology", "General"],
      complexity: ["Moderate", "Complex"],
      budget: ["Medium", "High"],
      teamSize: ["Small", "Medium", "Large"],
      deployment: ["Cloud", "Any"],
      securityLevel: ["Standard"],
    },
  },
  {
    title: "Technical Documentation & Architecture Documentation Generator",
    toolName: "ChatGPT",
    category: "Software Engineering",
    useCase: "Generate world-class technical documentation, software architecture documentation, API documentation, ADRs, developer guides, runbooks, SOPs, and project documentation for enterprise software.",
    promptText: `# ROLE

You are a Principal Software Architect, Staff Engineer, Technical Writer and Engineering Manager with more than 20 years of experience at Google, Microsoft, Amazon, Stripe and Netflix. You create documentation that engineers actually enjoy reading. Your documentation must be clear, accurate, professional, maintainable, actionable, and production-ready. Never write vague documentation.

--------------------------------------------------

# PROJECT

{{PROJECT_DESCRIPTION}}

--------------------------------------------------

# OBJECTIVE

Generate complete professional technical documentation. Every section should explain what, why, how, best practices, common mistakes, and future considerations.

--------------------------------------------------

## 1. Executive Summary
Project overview, business objective, technical objective, key stakeholders, success criteria.

## 2. System Overview
High-level architecture, major components, data flow, external integrations, technology stack.

## 3. Architecture Decision Records (ADR)
For every major decision: context, problem, options considered, pros, cons, decision, consequences, future impact.

## 4. Installation Guide
Prerequisites, environment setup, dependencies, configuration, secrets, environment variables, running locally, production deployment.

## 5. API Documentation
Authentication, endpoints, parameters, responses, error codes, rate limits, examples, versioning.

## 6. Database Documentation
Schema, relationships, indexes, migration strategy, backup strategy, naming conventions.

## 7. Developer Guide
Project structure, coding standards, folder organization, naming conventions, branch strategy, commit conventions, code review process.

## 8. Deployment Guide
CI/CD, Docker, Kubernetes, rollback, monitoring, scaling, secrets, environment promotion.

## 9. Operations Runbook
Health checks, monitoring, alert handling, incident response, troubleshooting, recovery procedures, maintenance windows.

## 10. Security Documentation
Authentication, authorization, encryption, secrets management, compliance, audit logging, security best practices.

## 11. Testing Documentation
Unit, integration, E2E, performance, security, and acceptance testing.

## 12. Maintenance Guide
Versioning, upgrades, dependency management, database migrations, backup verification, technical debt, future improvements.

--------------------------------------------------

# RESPONSE RULES

Write documentation as if it will become the official engineering handbook. Use professional formatting. Explain every important engineering decision. Prioritize maintainability and readability. Conclude with Documentation Quality Score (0-100), Maintainability Score (0-100), Architecture Maturity Score (0-100), Documentation Improvement Suggestions, and an Engineering Best Practices Checklist.`,
    expectedOutput: "Complete enterprise documentation package with System Architecture Documentation, ADRs, Installation Guide, API Documentation, Database Documentation, Developer Guide, Deployment Guide, Operations Runbook, Security Documentation, Testing Guide, Maintenance Guide, and Documentation/Maturity Scores.",
    tags: ["documentation", "architecture", "adr", "developer-guide", "technical-writing", "api-documentation", "software-engineering", "runbook", "enterprise", "knowledge-base"],
    difficulty: "Advanced",
    metadata: {
      projectTypes: ["SaaS", "Enterprise Software", "API Service", "MVP"],
      domains: ["Technology", "General"],
      complexity: ["Simple", "Moderate", "Complex"],
      budget: ["Free", "Low", "Medium", "High"],
      teamSize: ["Solo", "Small", "Medium", "Large"],
      deployment: ["Any"],
      securityLevel: ["Standard"],
    },
  },
]; 

async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");

    await Tool.deleteMany({});
    await Workflow.deleteMany({});
    await LLMModel.deleteMany({});
    await Stack.deleteMany({});
    await Prompt.deleteMany({});
    console.log("Cleared existing data");

    await Tool.insertMany(tools);
    console.log(`Inserted ${tools.length} tools`);

    await Workflow.insertMany(workflows);
    console.log(`Inserted ${workflows.length} workflows`);

    await LLMModel.insertMany(llmModels);
    console.log(`Inserted ${llmModels.length} LLM models`);

    await Stack.insertMany(stacks);
    console.log(`Inserted ${stacks.length} stacks`);

    await Prompt.insertMany(prompts);
    console.log(`Inserted ${prompts.length} prompts`);

    console.log("Database seeded successfully");
    process.exit(0);
  } catch (err) {
    console.error("Seeding error:", err);
    process.exit(1);
  }
}

seedDatabase();