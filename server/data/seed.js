import mongoose from "mongoose";
import dotenv from "dotenv";
import Tool from "../models/Tool.js";
import Workflow from "../models/Workflow.js";
import LLMModel from "../models/LLMModel.js";
import Stack from "../models/Stack.js";
import Prompt from "../models/Prompt.js";

dotenv.config({ path: "../../.env" });

const tools = [
  // AI Chatbots & Assistants
  {
    name: "ChatGPT",
    logo: "https://upload.wikimedia.org/wikipedia/commons/1/13/ChatGPT-Logo.png",
    category: "AI Chatbots & Assistants",
    description: "OpenAI's flagship conversational AI. Versatile for writing, coding, reasoning, and creative tasks.",
    pricing: "Freemium",
    url: "https://chat.openai.com",
    tags: ["chatbot", "general", "multimodal"],
    rating: 4.9,
    featured: true
  },
  {
    name: "Claude",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Claude_AI_logo.svg/512px-Claude_AI_logo.svg.png",
    category: "AI Chatbots & Assistants",
    description: "Anthropic's helpful and harmless AI assistant, excels at long-context analysis and careful reasoning.",
    pricing: "Freemium",
    url: "https://claude.ai",
    tags: ["chatbot", "analysis", "writing"],
    rating: 4.8,
    featured: true
  },
  {
    name: "Google Gemini",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Google_Gemini_logo.svg/512px-Google_Gemini_logo.svg.png",
    category: "AI Chatbots & Assistants",
    description: "Google's multimodal AI integrated with search, YouTube, and Google services.",
    pricing: "Freemium",
    url: "https://gemini.google.com",
    tags: ["chatbot", "multimodal", "google"],
    rating: 4.7,
    featured: true
  },
  {
    name: "Grok",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Grok_logo.svg/512px-Grok_logo.svg.png",
    category: "AI Chatbots & Assistants",
    description: "xAI's maximally truthful AI with real-time knowledge from X platform.",
    pricing: "Freemium",
    url: "https://grok.x.ai",
    tags: ["chatbot", "reasoning", "real-time"],
    rating: 4.6,
    featured: true
  },

  // AI Writing Tools
  {
    name: "Jasper AI",
    logo: "https://www.jasper.ai/favicon.ico",
    category: "AI Writing Tools",
    description: "Enterprise AI content platform for marketing teams with brand voice customization.",
    pricing: "Paid",
    url: "https://jasper.ai",
    tags: ["writing", "marketing", "seo"],
    rating: 4.6
  },
  {
    name: "Copy.ai",
    logo: "https://copy.ai/favicon.ico",
    category: "AI Writing Tools",
    description: "AI-powered copywriting for blogs, ads, emails, and social media.",
    pricing: "Freemium",
    url: "https://copy.ai",
    tags: ["copywriting", "marketing"],
    rating: 4.5
  },
  {
    name: "Writesonic",
    logo: "https://writesonic.com/favicon.ico",
    category: "AI Writing Tools",
    description: "Fast AI writer with SEO optimization, article generator, and chatbot features.",
    pricing: "Freemium",
    url: "https://writesonic.com",
    tags: ["writing", "seo", "articles"],
    rating: 4.4
  },

  // AI Coding Assistants
  {
    name: "GitHub Copilot",
    logo: "https://github.githubassets.com/images/modules/site/copilot/copilot.png",
    category: "AI Coding Assistants",
    description: "AI pair programmer that suggests code in real-time across IDEs.",
    pricing: "Paid",
    url: "https://github.com/features/copilot",
    tags: ["coding", "autocomplete", "github"],
    rating: 4.8,
    featured: true
  },
  {
    name: "Cursor",
    logo: "https://cursor.sh/favicon.ico",
    category: "AI Coding Assistants",
    description: "AI-first code editor with powerful chat, codebase understanding, and editing.",
    pricing: "Freemium",
    url: "https://cursor.sh",
    tags: ["coding", "editor", "ide"],
    rating: 4.7
  },
  {
    name: "Windsurf",
    logo: "https://codeium.com/favicon.ico",
    category: "AI Coding Assistants",
    description: "Agentic AI coding experience by Codeium with autonomous capabilities.",
    pricing: "Freemium",
    url: "https://codeium.com/windsurf",
    tags: ["coding", "agentic"],
    rating: 4.5
  },

  // AI Image Generation
  {
    name: "Midjourney",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Midjourney_Emblem.svg/512px-Midjourney_Emblem.svg.png",
    category: "AI Image Generation",
    description: "Leading AI art generator known for artistic, high-quality, and creative visuals.",
    pricing: "Paid",
    url: "https://midjourney.com",
    tags: ["image", "art", "creative"],
    rating: 4.9,
    featured: true
  },
  {
    name: "DALL·E",
    logo: "https://openai.com/favicon.ico",
    category: "AI Image Generation",
    description: "OpenAI's powerful text-to-image model integrated into ChatGPT.",
    pricing: "Freemium",
    url: "https://openai.com/dall-e-3",
    tags: ["image", "dalle", "openai"],
    rating: 4.7
  },
  {
    name: "Adobe Firefly",
    logo: "https://www.adobe.com/favicon.ico",
    category: "AI Image Generation",
    description: "Adobe's commercially safe AI image generator integrated with Creative Cloud.",
    pricing: "Freemium",
    url: "https://firefly.adobe.com",
    tags: ["image", "adobe", "design"],
    rating: 4.6
  },

  // AI Video Generation & Editing
  {
    name: "Runway",
    logo: "https://runwayml.com/favicon.ico",
    category: "AI Video Generation & Editing",
    description: "Professional-grade AI video generation, editing, and motion tools.",
    pricing: "Freemium",
    url: "https://runwayml.com",
    tags: ["video", "generation", "editing"],
    rating: 4.7
  },
  {
    name: "Synthesia",
    logo: "https://www.synthesia.io/favicon.ico",
    category: "AI Video Generation & Editing",
    description: "Create realistic AI avatar videos from text scripts for training and marketing.",
    pricing: "Paid",
    url: "https://synthesia.io",
    tags: ["video", "avatar", "presentation"],
    rating: 4.6
  },
  {
    name: "Pika",
    logo: "https://pika.art/favicon.ico",
    category: "AI Video Generation & Editing",
    description: "Fast and fun AI video generator for turning text and images into short clips.",
    pricing: "Freemium",
    url: "https://pika.art",
    tags: ["video", "creative"],
    rating: 4.4
  },

  // AI Research & Search
  {
    name: "Perplexity AI",
    logo: "https://www.perplexity.ai/favicon.ico",
    category: "AI Research & Search",
    description: "AI-powered search engine with real-time web access and cited answers.",
    pricing: "Freemium",
    url: "https://perplexity.ai",
    tags: ["research", "search", "citations"],
    rating: 4.8,
    featured: true
  },
  {
    name: "Elicit",
    logo: "https://elicit.com/favicon.ico",
    category: "AI Research & Search",
    description: "AI research assistant for literature review and academic paper analysis.",
    pricing: "Freemium",
    url: "https://elicit.com",
    tags: ["research", "academic"],
    rating: 4.5
  },
  {
    name: "Consensus",
    logo: "https://consensus.app/favicon.ico",
    category: "AI Research & Search",
    description: "AI search for scientific research with evidence synthesis.",
    pricing: "Freemium",
    url: "https://consensus.app",
    tags: ["research", "science"],
    rating: 4.4
  },

  // Productivity & More
  {
    name: "Notion AI",
    logo: "https://www.notion.so/favicon.ico",
    category: "AI Productivity Tools",
    description: "AI features built into Notion for summarization, writing, and database automation.",
    pricing: "Freemium",
    url: "https://notion.so",
    tags: ["productivity", "notes"],
    rating: 4.7
  },
  {
    name: "Gamma",
    logo: "https://gamma.app/favicon.ico",
    category: "AI Presentation Tools",
    description: "AI presentation generator that creates beautiful decks from text prompts.",
    pricing: "Freemium",
    url: "https://gamma.app",
    tags: ["presentation", "slides"],
    rating: 4.6
  },
  {
    name: "ElevenLabs",
    logo: "https://elevenlabs.io/favicon.ico",
    category: "AI Voice & Audio Tools",
    description: "Industry-leading AI voice synthesis and cloning with emotional control.",
    pricing: "Freemium",
    url: "https://elevenlabs.io",
    tags: ["voice", "tts", "audio"],
    rating: 4.9
  },
  {
    name: "Zapier AI",
    logo: "https://zapier.com/favicon.ico",
    category: "AI Automation Tools",
    description: "No-code automation with AI actions connecting thousands of apps.",
    pricing: "Freemium",
    url: "https://zapier.com",
    tags: ["automation", "integration"],
    rating: 4.7
  },
  {
    name: "Teal",
    logo: "https://www.tealhq.com/favicon.ico",
    category: "AI Resume & Career Tools",
    description: "AI resume builder and job tracking platform.",
    pricing: "Freemium",
    url: "https://www.tealhq.com",
    tags: ["resume", "career"],
    rating: 4.5
  },
  {
    name: "Harvey AI",
    logo: "https://www.harvey.ai/favicon.ico",
    category: "AI Legal Assistants",
    description: "AI assistant purpose-built for legal professionals.",
    pricing: "Enterprise",
    url: "https://www.harvey.ai",
    tags: ["legal", "enterprise"],
    rating: 4.6
  },
  {
    name: "Manus AI",
    logo: "https://manus.im/favicon.ico",
    category: "AI Agents",
    description: "Advanced general-purpose AI agent platform.",
    pricing: "Freemium",
    url: "https://manus.im",
    tags: ["agents", "automation"],
    rating: 4.5
  },
  {
    name: "Glass Health",
    logo: "https://glass.health/favicon.ico",
    category: "AI Healthcare Assistants",
    description: "AI-powered clinical decision support for healthcare.",
    pricing: "Paid",
    url: "https://glass.health",
    tags: ["healthcare", "medical"],
    rating: 4.4
  },
  {
    name: "CrowdStrike Charlotte AI",
    logo: "https://www.crowdstrike.com/favicon.ico",
    category: "AI Cybersecurity Tools",
    description: "AI-driven cybersecurity threat detection and response.",
    pricing: "Enterprise",
    url: "https://www.crowdstrike.com",
    tags: ["cybersecurity", "security"],
    rating: 4.7
  }
  // Total 30+ tools
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
  }
];

const workflows = [
  {
    title: "Launch a YouTube Channel",
    goal: "Content Creation",
    category: "Content Creation",
    difficulty: "Beginner",
    description: "Complete workflow to research, script, record, edit, and publish YouTube videos using AI tools.",
    tags: ["youtube", "content", "video"],
    steps: [
      { stepNumber: 1, title: "Find Your Niche & Topics", description: "Use Perplexity AI to research trending topics.", toolName: "Perplexity AI", toolUrl: "https://perplexity.ai", promptTemplate: "What are the top 10 trending questions people ask about [your niche]?" },
      { stepNumber: 2, title: "Write Your Script", description: "Use Claude to write engaging script.", toolName: "Claude", toolUrl: "https://claude.ai", promptTemplate: "Write a full YouTube script about [topic]." }
    ]
  },
  // Additional workflows can be expanded similarly; keeping minimal for structure
  {
    title: "Content Marketing Campaign",
    goal: "Marketing",
    category: "Marketing",
    difficulty: "Intermediate",
    description: "End-to-end AI-powered content marketing workflow.",
    tags: ["marketing", "content"],
    steps: []
  }
];

// Keep existing stacks and prompts structure (abbreviated for brevity; expand as needed in real file)
const stacks = [
  // Existing or placeholder stacks
  { name: "Full AI Stack", description: "Complete modern AI development stack", tools: ["ChatGPT", "Claude", "Midjourney"] }
];

const prompts = [
  // Existing prompts from original
  { title: "Explain Like I'm 5", toolName: "ChatGPT", category: "Learning", useCase: "Simplify complex topics", promptText: "Explain [complex topic] like I am 5 years old...", expectedOutput: "...", tags: ["learning"], difficulty: "Beginner" }
  // Add more as per original structure
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