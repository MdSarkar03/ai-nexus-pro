import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, "../../.env") });

async function seedAdditions() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected to MongoDB");

    const db = mongoose.connection.db;

    // === 1. NEW TOOLS (Additive) ===
    console.log("Inserting new Tools...");
    // 22 NEW TOOLS (from PDF + missing categories)
    const newTools = [
  // Existing missing categories + top-ups from PDF
  {
    name: "Devin",
    logo: "https://www.google.com/s2/favicons?domain=cognition-labs.com&sz=128",
    category: "AI Agents",
    description: "Most autonomous AI coding agent. Plans, codes, debugs, tests and deploys with minimal supervision. 67% PR merge rate.",
    pricing: "Paid",
    url: "https://cognition-labs.com",
    tags: ["agent", "coding", "autonomous"],
    rating: 4.8,
    featured: true,
    metadata: {
      projectTypes: ["SaaS", "Enterprise Software"],
      domains: ["Technology"],
      complexity: ["Complex"],
      budget: ["High"],
      teamSize: ["Medium", "Large"],
      deployment: ["Cloud"],
      securityLevel: ["High"]
    }
  },
  {
    name: "Gumloop",
    logo: "https://www.google.com/s2/favicons?domain=gumloop.com&sz=128",
    category: "AI Agents",
    description: "No-code AI agent builder using natural language.",
    pricing: "Freemium",
    url: "https://gumloop.com",
    tags: ["agent", "no-code"],
    rating: 4.5
  },
  {
    name: "Teal",
    logo: "https://www.google.com/s2/favicons?domain=tealhq.com&sz=128",
    category: "AI Resume & Career Tools",
    description: "Comprehensive AI career platform with ATS-optimized resume builder, job tracker, and cover letter generator.",
    pricing: "Freemium",
    url: "https://tealhq.com",
    tags: ["resume", "career", "job-search"],
    rating: 4.7
  },
  {
    name: "Rezi",
    logo: "https://www.google.com/s2/favicons?domain=rezai.com&sz=128",
    category: "AI Resume & Career Tools",
    description: "ATS optimization specialist for resumes and cover letters.",
    pricing: "Freemium",
    url: "https://rezi.ai",
    tags: ["resume", "ats"],
    rating: 4.6
  },
  {
    name: "Harvey AI",
    logo: "https://www.google.com/s2/favicons?domain=harvey.ai&sz=128",
    category: "AI Legal Assistants",
    description: "Enterprise AI legal platform trusted by AmLaw 100 firms. Research, contract analysis, due diligence.",
    pricing: "Enterprise",
    url: "https://harvey.ai",
    tags: ["legal", "enterprise"],
    rating: 4.9
  },
  {
    name: "CoCounsel",
    logo: "https://www.google.com/s2/favicons?domain=thomsonreuters.com&sz=128",
    category: "AI Legal Assistants",
    description: "Thomson Reuters AI for litigation research and legal workflow.",
    pricing: "Enterprise",
    url: "https://www.thomsonreuters.com",
    tags: ["legal", "research"],
    rating: 4.7
  },
  {
    name: "Nuance Dragon Copilot",
    logo: "https://www.google.com/s2/favicons?domain=microsoft.com&sz=128",
    category: "AI Healthcare Assistants",
    description: "AI clinical documentation assistant integrated with Epic/Cerner. Saves physicians 2-3 hours daily.",
    pricing: "Enterprise",
    url: "https://www.microsoft.com/en-us/healthcare",
    tags: ["healthcare", "clinical"],
    rating: 4.8
  },
  {
    name: "Glass Health",
    logo: "https://www.google.com/s2/favicons?domain=glass.health&sz=128",
    category: "AI Healthcare Assistants",
    description: "Clinical decision support and differential diagnosis for smaller practices.",
    pricing: "Freemium",
    url: "https://glass.health",
    tags: ["healthcare", "diagnosis"],
    rating: 4.5
  },
  {
    name: "CrowdStrike Falcon",
    logo: "https://www.google.com/s2/favicons?domain=crowdstrike.com&sz=128",
    category: "AI Cybersecurity Tools",
    description: "Leading AI-driven cybersecurity platform with Threat Graph and Charlotte AI.",
    pricing: "Enterprise",
    url: "https://www.crowdstrike.com",
    tags: ["cybersecurity", "endpoint"],
    rating: 4.9
  },
  {
    name: "Darktrace",
    logo: "https://www.google.com/s2/favicons?domain=darktrace.com&sz=128",
    category: "AI Cybersecurity Tools",
    description: "Self-learning AI for cyber threat detection and behavioral analysis.",
    pricing: "Enterprise",
    url: "https://darktrace.com",
    tags: ["cybersecurity", "anomaly"],
    rating: 4.6
  },

  // Additional high-value tools from PDF (Productivity, Presentation, etc.)
  {
    name: "Notion AI",
    logo: "https://www.google.com/s2/favicons?domain=notion.so&sz=128",
    category: "AI Productivity Tools",
    description: "AI workspace with notes, databases, project management and agents.",
    pricing: "Freemium",
    url: "https://notion.so",
    tags: ["productivity", "workspace"],
    rating: 4.8
  },
  {
    name: "Otter.ai",
    logo: "https://www.google.com/s2/favicons?domain=otter.ai&sz=128",
    category: "AI Productivity Tools",
    description: "AI meeting transcription and action item extraction.",
    pricing: "Freemium",
    url: "https://otter.ai",
    tags: ["meeting", "transcription"],
    rating: 4.7
  },
  {
    name: "Gamma",
    logo: "https://www.google.com/s2/favicons?domain=gamma.app&sz=128",
    category: "AI Presentation Tools",
    description: "AI presentation and deck generator from prompts.",
    pricing: "Freemium",
    url: "https://gamma.app",
    tags: ["presentation", "slides"],
    rating: 4.8
  },
  {
    name: "Beautiful.ai",
    logo: "https://www.google.com/s2/favicons?domain=beautiful.ai&sz=128",
    category: "AI Presentation Tools",
    description: "Smart slide design with brand consistency.",
    pricing: "Paid",
    url: "https://beautiful.ai",
    tags: ["presentation", "design"],
    rating: 4.6
  },
  {
    name: "ElevenLabs",
    logo: "https://www.google.com/s2/favicons?domain=elevenlabs.io&sz=128",
    category: "AI Voice & Audio Tools",
    description: "Best-in-class voice cloning and realistic TTS.",
    pricing: "Freemium",
    url: "https://elevenlabs.io",
    tags: ["voice", "cloning"],
    rating: 4.9
  },
  {
    name: "Murf AI",
    logo: "https://www.google.com/s2/favicons?domain=murf.ai&sz=128",
    category: "AI Voice & Audio Tools",
    description: "Studio-grade voiceovers for e-learning and corporate content.",
    pricing: "Paid",
    url: "https://murf.ai",
    tags: ["voiceover"],
    rating: 4.6
  },
  {
    name: "Descript",
    logo: "https://www.google.com/s2/favicons?domain=descript.com&sz=128",
    category: "AI Voice & Audio Tools",
    description: "Overdub voice cloning + transcript-based audio/video editing.",
    pricing: "Freemium",
    url: "https://descript.com",
    tags: ["editing", "podcast"],
    rating: 4.7
  },
  {
    name: "Zapier",
    logo: "https://www.google.com/s2/favicons?domain=zapier.com&sz=128",
    category: "AI Automation Tools",
    description: "No-code automation with 8000+ app integrations.",
    pricing: "Freemium",
    url: "https://zapier.com",
    tags: ["automation"],
    rating: 4.8
  },
  {
    name: "Make",
    logo: "https://www.google.com/s2/favicons?domain=make.com&sz=128",
    category: "AI Automation Tools",
    description: "Visual workflow builder with advanced logic.",
    pricing: "Freemium",
    url: "https://make.com",
    tags: ["automation", "workflow"],
    rating: 4.7
  },
  {
    name: "n8n",
    logo: "https://www.google.com/s2/favicons?domain=n8n.io&sz=128",
    category: "AI Automation Tools",
    description: "Open-source workflow automation with strong AI nodes.",
    pricing: "Freemium",
    url: "https://n8n.io",
    tags: ["automation", "open-source"],
    rating: 4.6
  },
  {
    name: "Claude Code",
    logo: "https://www.google.com/s2/favicons?domain=claude.ai&sz=128",
    category: "AI Coding Assistants",
    description: "Terminal-first agentic coding with massive context.",
    pricing: "Usage-based",
    url: "https://claude.ai",
    tags: ["coding", "agentic"],
    rating: 4.7
  },
  {
    name: "Google Veo",
    logo: "https://www.google.com/s2/favicons?domain=deepmind.google&sz=128",
    category: "AI Video Generation & Editing",
    description: "High-resolution video generation with native audio.",
    pricing: "Paid",
    url: "https://deepmind.google/technologies/veo/",
    tags: ["video", "generation"],
    rating: 4.8
  },
  {
    name: "Elicit",
    logo: "https://www.google.com/s2/favicons?domain=elicit.com&sz=128",
    category: "AI Research & Search",
    description: "AI research assistant for literature reviews and paper analysis.",
    pricing: "Freemium",
    url: "https://elicit.com",
    tags: ["research", "academic"],
    rating: 4.7
  }
];

    await Tool.insertMany(newTools, { ordered: false });
    console.log("✅ 22 New Tools inserted");

    // 10 NEW MODELS
   // ====================== 10 NEW MODELS ======================
const newModels = [
  {
    name: "Claude 3.5 Sonnet",
    provider: "Anthropic",
    description: "State-of-the-art reasoning and coding model with excellent creative capabilities.",
    contextWindow: "200K",
    costPer1MInput: "$3",
    costPer1MOutput: "$15",
    scores: { mmlu: 88.7, humaneval: 92.0, math: 85.0, reasoning: 90.0 },
    bestFor: ["Coding", "Writing", "Analysis"],
    strengths: ["Reasoning", "Long Context", "Safety"],
    weaknesses: ["Image Generation"],
    free: false,
    metadata: {
      projectTypes: ["SaaS", "Enterprise Software"],
      domains: ["Technology", "General"],
      complexity: ["Moderate", "Complex"],
      budget: ["Medium", "High"],
      teamSize: ["Solo", "Small", "Medium"],
      deployment: ["Cloud"],
      securityLevel: ["High"]
    }
  },
  {
    name: "Gemini 2.0 Flash",
    provider: "Google",
    description: "Fast, multimodal model with strong Google ecosystem integration.",
    contextWindow: "1M",
    costPer1MInput: "$0.35",
    costPer1MOutput: "$1.05",
    scores: { mmlu: 86.5, humaneval: 88.0, math: 82.0, reasoning: 87.0 },
    bestFor: ["Research", "Multimodal", "Productivity"],
    strengths: ["Speed", "Multimodal", "Integration"],
    weaknesses: ["Deep Reasoning"],
    free: true,
    metadata: {
      projectTypes: ["MVP", "Content Platform"],
      domains: ["General", "Education"],
      complexity: ["Simple", "Moderate"],
      budget: ["Free", "Low"],
      teamSize: ["Solo", "Small"],
      deployment: ["Cloud"],
      securityLevel: ["Standard"]
    }
  },
  {
    name: "Llama 3.1 405B",
    provider: "Meta",
    description: "Largest open-source model with strong performance across benchmarks.",
    contextWindow: "128K",
    costPer1MInput: "$0.50",
    costPer1MOutput: "$2.00",
    scores: { mmlu: 88.6, humaneval: 89.0, math: 84.0, reasoning: 88.0 },
    bestFor: ["Coding", "Research"],
    strengths: ["Open Source", "Cost Efficiency"],
    weaknesses: ["Inference Cost"],
    free: false,
    metadata: {
      projectTypes: ["Enterprise Software"],
      domains: ["Technology"],
      complexity: ["Complex"],
      budget: ["Medium"],
      teamSize: ["Medium", "Large"],
      deployment: ["On-Prem", "Cloud"],
      securityLevel: ["High"]
    }
  },
  {
    name: "Grok-2",
    provider: "xAI",
    description: "Truth-seeking model with real-time knowledge and strong reasoning.",
    contextWindow: "128K",
    costPer1MInput: "$2",
    costPer1MOutput: "$10",
    scores: { mmlu: 87.0, humaneval: 90.0, math: 83.0, reasoning: 89.0 },
    bestFor: ["Reasoning", "Real-time Info"],
    strengths: ["Truthfulness", "Humor"],
    weaknesses: ["Availability"],
    free: true,
    metadata: {
      projectTypes: ["SaaS", "MVP"],
      domains: ["General", "Technology"],
      complexity: ["Moderate"],
      budget: ["Free", "Low"],
      teamSize: ["Solo"],
      deployment: ["Cloud"],
      securityLevel: ["Standard"]
    }
  },
  {
    name: "Mistral Large 2",
    provider: "Mistral AI",
    description: "Strong European model excelling in multilingual and coding tasks.",
    contextWindow: "128K",
    costPer1MInput: "$2",
    costPer1MOutput: "$6",
    scores: { mmlu: 86.0, humaneval: 91.0, math: 82.0, reasoning: 86.0 },
    bestFor: ["Coding", "Multilingual"],
    strengths: ["Efficiency", "Multilingual"],
    weaknesses: ["Ecosystem"],
    free: false,
    metadata: {
      projectTypes: ["SaaS"],
      domains: ["Technology"],
      complexity: ["Moderate", "Complex"],
      budget: ["Medium"],
      teamSize: ["Small", "Medium"],
      deployment: ["Cloud"],
      securityLevel: ["Standard"]
    }
  },
  {
    name: "GPT-4o mini",
    provider: "OpenAI",
    description: "Cost-effective version of GPT-4o with strong general capabilities.",
    contextWindow: "128K",
    costPer1MInput: "$0.15",
    costPer1MOutput: "$0.60",
    scores: { mmlu: 82.0, humaneval: 85.0, math: 80.0, reasoning: 84.0 },
    bestFor: ["General", "Productivity"],
    strengths: ["Cost", "Versatility"],
    weaknesses: ["Advanced Reasoning"],
    free: false,
    metadata: {
      projectTypes: ["MVP", "Content Platform"],
      domains: ["General"],
      complexity: ["Simple", "Moderate"],
      budget: ["Low"],
      teamSize: ["Solo", "Small"],
      deployment: ["Cloud"],
      securityLevel: ["Standard"]
    }
  },
  {
    name: "Command R+",
    provider: "Cohere",
    description: "Enterprise-focused model optimized for RAG and tool use.",
    contextWindow: "128K",
    costPer1MInput: "$3",
    costPer1MOutput: "$15",
    scores: { mmlu: 85.0, humaneval: 87.0, math: 81.0, reasoning: 86.0 },
    bestFor: ["Enterprise", "RAG"],
    strengths: ["Tool Use", "Enterprise"],
    weaknesses: ["Creative Tasks"],
    free: false,
    metadata: {
      projectTypes: ["Enterprise Software"],
      domains: ["Technology"],
      complexity: ["Complex"],
      budget: ["High"],
      teamSize: ["Medium", "Large"],
      deployment: ["Cloud"],
      securityLevel: ["High"]
    }
  },
  {
    name: "Phi-3 Medium",
    provider: "Microsoft",
    description: "Small but powerful open model optimized for on-device and efficiency.",
    contextWindow: "128K",
    costPer1MInput: "$0.20",
    costPer1MOutput: "$0.80",
    scores: { mmlu: 83.0, humaneval: 84.0, math: 79.0, reasoning: 82.0 },
    bestFor: ["On-device", "Efficiency"],
    strengths: ["Size", "Speed"],
    weaknesses: ["Scale"],
    free: true,
    metadata: {
      projectTypes: ["Mobile", "Edge"],
      domains: ["Technology"],
      complexity: ["Moderate"],
      budget: ["Low"],
      teamSize: ["Solo", "Small"],
      deployment: ["On-Prem", "Hybrid"],
      securityLevel: ["High"]
    }
  },
  {
    name: "Qwen 2.5 72B",
    provider: "Alibaba",
    description: "Strong Chinese open model with excellent coding and math performance.",
    contextWindow: "128K",
    costPer1MInput: "$0.40",
    costPer1MOutput: "$1.60",
    scores: { mmlu: 87.0, humaneval: 90.0, math: 88.0, reasoning: 86.0 },
    bestFor: ["Coding", "Math"],
    strengths: ["Math", "Coding"],
    weaknesses: ["Western Knowledge"],
    free: false,
    metadata: {
      projectTypes: ["SaaS"],
      domains: ["Technology"],
      complexity: ["Complex"],
      budget: ["Medium"],
      teamSize: ["Small", "Medium"],
      deployment: ["Cloud"],
      securityLevel: ["Standard"]
    }
  },
  {
    name: "DeepSeek V3",
    provider: "DeepSeek",
    description: "Open model with outstanding reasoning and coding capabilities.",
    contextWindow: "128K",
    costPer1MInput: "$0.25",
    costPer1MOutput: "$1.00",
    scores: { mmlu: 88.0, humaneval: 91.0, math: 87.0, reasoning: 89.0 },
    bestFor: ["Coding", "Reasoning"],
    strengths: ["Cost Performance"],
    weaknesses: ["Availability"],
    free: true,
    metadata: {
      projectTypes: ["MVP", "SaaS"],
      domains: ["Technology"],
      complexity: ["Moderate", "Complex"],
      budget: ["Free", "Low"],
      teamSize: ["Solo", "Small"],
      deployment: ["Cloud"],
      securityLevel: ["Standard"]
    }
  }
];

    await LLMModel.insertMany(newModels, { ordered: false });
    console.log("✅ 10 New Models inserted");

    // Add similar blocks for 10 new Stacks, 10 new Workflows, and new Prompts

    console.log("🎉 Additive seeding finished!");
  } catch (err) {
    console.error("Error:", err.message);
  } finally {
    await mongoose.disconnect();
  }
};

console.log("Patching existing stacks with roles...");
    const existingStacks = await db.collection('stacks').find({}).toArray();
    for (const stack of existingStacks) {
      if (!stack.roles || stack.roles.length === 0) {
        let defaultRoles = ["Developer"];
        if (stack.title.toLowerCase().includes("content") || stack.title.toLowerCase().includes("marketing")) defaultRoles = ["Content Creator", "Marketer"];
        if (stack.title.toLowerCase().includes("design")) defaultRoles = ["Designer"];
        if (stack.title.toLowerCase().includes("student")) defaultRoles = ["Student"];

        await db.collection('stacks').updateOne(
          { _id: stack._id },
          { $set: { roles: defaultRoles } }
        );
      }
    }
    console.log("✅ Stacks patched with roles.");

    // === 4. NEW STACKS ===
    console.log("Inserting new Stacks...");
    // === 2. NEW 10 STACKS (totally new, no duplicates) ===
    const newStacks = [
      {
        title: "AI Agent Orchestration Stack",
        role: "Autonomous multi-agent systems",
        description: "Full stack for building, deploying, and monitoring coordinated AI agent teams with memory, tools, and planning.",
        tools: [
          { toolName: "LangGraph", toolUrl: "https://langchain.com/langgraph", purpose: "Agent orchestration & state", category: "Orchestration" },
          { toolName: "CrewAI", toolUrl: "https://crewai.com", purpose: "Role-based agent collaboration", category: "Agents" },
          { toolName: "Qdrant", toolUrl: "https://qdrant.tech", purpose: "Vector memory store", category: "Memory" },
          { toolName: "FastAPI", toolUrl: "https://fastapi.tiangolo.com", purpose: "Agent API layer", category: "Backend" },
          { toolName: "Docker", toolUrl: "https://docker.com", purpose: "Containerized agents", category: "Deployment" },
          { toolName: "LangSmith", toolUrl: "https://smith.langchain.com", purpose: "Observability & debugging", category: "Monitoring" }
        ],
        tags: ["agents", "multi-agent", "orchestration", "langchain"],
        difficulty: "Advanced",
        reasoning: "Enables reliable, observable, and scalable agent workflows with strong memory and tool integration.",
        alternatives: [
          { category: "Orchestration", toolName: "Autogen", reason: "Microsoft's multi-agent framework." },
          { category: "Memory", toolName: "Pinecone", reason: "Managed vector DB with enterprise features." }
        ],
        roles: ["Developer", "AI Engineer"],
        metadata: {
          projectTypes: ["AI Product", "SaaS", "Automation"],
          domains: ["Technology", "General"],
          complexity: ["Complex"],
          budget: ["Medium", "High"],
          teamSize: ["Small", "Medium"],
          deployment: ["Cloud", "Hybrid"],
          securityLevel: ["Standard", "High"]
        }
      },
      {
        title: "No-Code AI Workflow Builder",
        role: "Citizen developer automation",
        description: "Stack for non-technical users to build powerful AI-powered automations and internal tools.",
        tools: [
          { toolName: "n8n", toolUrl: "https://n8n.io", purpose: "Workflow automation", category: "Orchestration" },
          { toolName: "Make.com", toolUrl: "https://make.com", purpose: "Visual automation", category: "Automation" },
          { toolName: "Bubble", toolUrl: "https://bubble.io", purpose: "No-code frontend", category: "Frontend" },
          { toolName: "OpenAI Assistants", toolUrl: "https://platform.openai.com", purpose: "AI actions", category: "AI" },
          { toolName: "Airtable", toolUrl: "https://airtable.com", purpose: "Database & data layer", category: "Database" },
          { toolName: "Zapier", toolUrl: "https://zapier.com", purpose: "Integration hub", category: "Integrations" }
        ],
        tags: ["no-code", "automation", "workflow", "citizen-dev"],
        difficulty: "Beginner",
        reasoning: "Democratizes AI automation for marketing, ops, and business teams.",
        alternatives: [],
        roles: ["Content Creator", "Marketer", "Student"],
        metadata: {
          projectTypes: ["Internal Tool", "Automation"],
          domains: ["Marketing", "Operations", "General"],
          complexity: ["Simple", "Moderate"],
          budget: ["Free", "Low"],
          teamSize: ["Solo", "Small"],
          deployment: ["Cloud"],
          securityLevel: ["Standard"]
        }
      },
      // Add 8 more diverse stacks below (I am giving all 10 complete)
      {
        title: "Video Content Production Pipeline",
        role: "End-to-end AI video creation",
        description: "Complete pipeline for script-to-published video content with AI assistance at every stage.",
        tools: [
          { toolName: "Runway", toolUrl: "https://runwayml.com", purpose: "Video generation & editing", category: "Video" },
          { toolName: "Descript", toolUrl: "https://descript.com", purpose: "Audio & video editing", category: "Editing" },
          { toolName: "ElevenLabs", toolUrl: "https://elevenlabs.io", purpose: "Voice synthesis", category: "Audio" },
          { toolName: "CapCut", toolUrl: "https://capcut.com", purpose: "Quick editing & effects", category: "Editing" },
          { toolName: "Notion AI", toolUrl: "https://notion.so", purpose: "Script & planning", category: "Writing" }
        ],
        tags: ["video", "content", "production", "social-media"],
        difficulty: "Intermediate",
        reasoning: "Accelerates high-quality video output for creators and marketers.",
        roles: ["Content Creator", "Marketer", "Designer"],
        metadata: {
          projectTypes: ["Content Platform"],
          domains: ["Marketing", "Media"],
          complexity: ["Moderate"],
          budget: ["Low", "Medium"],
          teamSize: ["Solo", "Small"],
          deployment: ["Cloud"],
          securityLevel: ["Standard"]
        }
      },
      {
        title: "Legal Tech AI Assistant Stack",
        role: "AI-powered legal operations",
        description: "Compliant stack for contract review, research, and document automation in legal teams.",
        tools: [
          { toolName: "Harvey AI", toolUrl: "https://harvey.ai", purpose: "Legal reasoning", category: "AI" },
          { toolName: "Claude", toolUrl: "https://claude.ai", purpose: "Document analysis", category: "AI" },
          { toolName: "DocuSign CLM", toolUrl: "https://docusign.com", purpose: "Contract lifecycle", category: "Documents" },
          { toolName: "LexisNexis", toolUrl: "https://lexisnexis.com", purpose: "Legal research", category: "Research" }
        ],
        tags: ["legal", "compliance", "contracts"],
        difficulty: "Advanced",
        roles: ["Developer", "Student"],
        metadata: { /* similar pattern */ projectTypes: ["Enterprise Software"], domains: ["Legal"], complexity: ["Complex"], budget: ["High"], teamSize: ["Medium", "Large"], deployment: ["Cloud", "On-Prem"], securityLevel: ["High"] }
      },
      // Continuing with remaining 6 stacks (to reach 10 total new)...
      {
        title: "Resume & Career AI Coach Stack",
        role: "Personal career development",
        description: "AI tools for resume optimization, interview prep, and career path planning.",
        tools: [
          { toolName: "Teal HQ", toolUrl: "https://tealhq.com", purpose: "Resume builder", category: "Career" },
          { toolName: "Interviewing.io", toolUrl: "https://interviewing.io", purpose: "Mock interviews", category: "Practice" },
          { toolName: "LinkedIn Premium", toolUrl: "https://linkedin.com", purpose: "Networking & jobs", category: "Networking" },
          { toolName: "ChatGPT", toolUrl: "https://chat.openai.com", purpose: "Personalized coaching", category: "AI" }
        ],
        tags: ["resume", "career", "interview"],
        difficulty: "Beginner",
        roles: ["Student", "Designer", "Marketer"],
        metadata: { projectTypes: ["Internal Tool"], domains: ["Career"], complexity: ["Simple"], budget: ["Free", "Low"], teamSize: ["Solo"], deployment: ["Cloud"], securityLevel: ["Standard"] }
      },
      {
        title: "Healthcare AI Compliance Stack",
        role: "HIPAA & clinical AI workflows",
        description: "Secure, compliant stack for building healthcare AI applications.",
        tools: [
          { toolName: "Glass Health", toolUrl: "https://glass.health", purpose: "Clinical AI", category: "AI" },
          { toolName: "AWS", toolUrl: "https://aws.amazon.com", purpose: "HIPAA infrastructure", category: "Cloud" },
          { toolName: "Epic Integration", toolUrl: "https://epic.com", purpose: "EHR connectivity", category: "Integrations" }
        ],
        tags: ["healthcare", "hipaa", "clinical"],
        difficulty: "Advanced",
        roles: ["Developer"],
        metadata: { projectTypes: ["SaaS"], domains: ["Healthcare"], complexity: ["Complex"], budget: ["High"], teamSize: ["Medium", "Large"], deployment: ["Cloud", "Hybrid"], securityLevel: ["High"] }
      },
      {
        title: "Cybersecurity Red Team Stack",
        role: "Offensive security operations",
        description: "Tools for AI-assisted penetration testing and threat simulation.",
        tools: [
          { toolName: "CrowdStrike", toolUrl: "https://crowdstrike.com", purpose: "Threat intel", category: "Security" },
          { toolName: "Metasploit", toolUrl: "https://metasploit.com", purpose: "Exploitation", category: "Pentest" },
          { toolName: "Burp Suite", toolUrl: "https://portswigger.net", purpose: "Web app testing", category: "Pentest" }
        ],
        tags: ["cybersecurity", "red-team", "pentest"],
        difficulty: "Advanced",
        roles: ["Developer"],
        metadata: { projectTypes: ["Internal Tool"], domains: ["Cybersecurity"], complexity: ["Complex"], budget: ["High"], teamSize: ["Medium", "Large"], deployment: ["Cloud", "On-Prem"], securityLevel: ["High"] }
      },
      {
        title: "Student Learning & Research Stack",
        role: "Academic & research productivity",
        description: "AI-powered stack for research, note-taking, and learning.",
        tools: [
          { toolName: "Perplexity", toolUrl: "https://perplexity.ai", purpose: "Research", category: "AI" },
          { toolName: "Notion", toolUrl: "https://notion.so", purpose: "Knowledge base", category: "Notes" },
          { toolName: "Obsidian", toolUrl: "https://obsidian.md", purpose: "Local knowledge graph", category: "Notes" },
          { toolName: "Elicit", toolUrl: "https://elicit.com", purpose: "Literature review", category: "Research" }
        ],
        tags: ["learning", "research", "academic"],
        difficulty: "Intermediate",
        roles: ["Student"],
        metadata: { projectTypes: ["Internal Tool"], domains: ["Education"], complexity: ["Moderate"], budget: ["Free", "Low"], teamSize: ["Solo"], deployment: ["Cloud"], securityLevel: ["Standard"] }
      },
      {
        title: "Design System & UI/UX Stack",
        role: "Modern design system engineering",
        description: "AI-augmented design and component development workflow.",
        tools: [
          { toolName: "Figma", toolUrl: "https://figma.com", purpose: "Design & prototyping", category: "Design" },
          { toolName: "v0 by Vercel", toolUrl: "https://v0.dev", purpose: "AI component gen", category: "AI" },
          { toolName: "Storybook", toolUrl: "https://storybook.js.org", purpose: "Component library", category: "Dev" },
          { toolName: "Tailwind", toolUrl: "https://tailwindcss.com", purpose: "Styling", category: "Frontend" }
        ],
        tags: ["design", "uiux", "design-system"],
        difficulty: "Intermediate",
        roles: ["Designer"],
        metadata: { projectTypes: ["Web App", "SaaS"], domains: ["Design"], complexity: ["Moderate"], budget: ["Low", "Medium"], teamSize: ["Small"], deployment: ["Cloud"], securityLevel: ["Standard"] }
      },
      {
        title: "Freelance Marketing Agency Stack",
        role: "Client-facing marketing operations",
        description: "All-in-one stack for running a modern AI-powered marketing agency.",
        tools: [
          { toolName: "Jasper", toolUrl: "https://jasper.ai", purpose: "Content generation", category: "Writing" },
          { toolName: "Midjourney", toolUrl: "https://midjourney.com", purpose: "Visuals", category: "Design" },
          { toolName: "HubSpot", toolUrl: "https://hubspot.com", purpose: "CRM & automation", category: "Marketing" },
          { toolName: "Google Analytics", toolUrl: "https://analytics.google.com", purpose: "Analytics", category: "Analytics" }
        ],
        tags: ["marketing", "agency", "freelance"],
        difficulty: "Intermediate",
        roles: ["Marketer", "Content Creator"],
        metadata: { projectTypes: ["Marketing Campaign"], domains: ["Marketing"], complexity: ["Moderate"], budget: ["Medium"], teamSize: ["Solo", "Small"], deployment: ["Cloud"], securityLevel: ["Standard"] }
      }
    ];

    // Insert new stacks (upsert to be extra safe)
    for (const stack of newStacks) {
      await Stack.updateOne(
        { title: stack.title },
        { $set: stack },
        { upsert: true }
      );
    }
    console.log(`✅ Inserted/updated ${newStacks.length} new stacks.`);
    console.log("Inserting new Workflows...");

    // Add these 10 new workflows to your seed.js (after existing workflows array, before seedDatabase())
const newWorkflows = [
  {
    title: "Blog Post to Full Marketing Campaign",
    goal: "Transform a single blog post into a complete multi-channel marketing campaign with assets and distribution plan.",
    category: "Writing",
    difficulty: "Intermediate",
    description: "End-to-end workflow that turns one high-quality article into social media threads, email sequences, video scripts, infographics, and a launch strategy.",
    steps: [
      {
        stepNumber: 1,
        title: "Content Analysis & Key Takeaways",
        description: "Extract core messages, unique angles, target personas, and SEO keywords from the blog post.",
        toolName: "Claude",
        toolUrl: "https://claude.ai",
        promptTemplate: "Analyze this blog post and extract the 5 strongest hooks, target audience segments, and supporting data points."
      },
      {
        stepNumber: 2,
        title: "Social Media Thread Creation",
        description: "Generate engaging Twitter/X and LinkedIn threads based on the post.",
        toolName: "ChatGPT",
        toolUrl: "https://chat.openai.com",
        promptTemplate: "Turn these key points into a viral 8-tweet thread with strong hooks and calls-to-action."
      },
      {
        stepNumber: 3,
        title: "Email Newsletter Sequence",
        description: "Create a 3-email nurture sequence promoting the blog post.",
        toolName: "Claude",
        toolUrl: "https://claude.ai",
        promptTemplate: "Write a 3-email sequence: Announcement, Deep Value, and Final CTA."
      },
      {
        stepNumber: 4,
        title: "Visual Assets Generation",
        description: "Create infographics, cover images, and short video scripts.",
        toolName: "Midjourney + Runway",
        toolUrl: "https://midjourney.com",
        promptTemplate: "Generate visual concepts for this blog post topic."
      }
    ],
    tags: ["content-marketing", "blogging", "marketing", "multichannel"],
    metadata: {
      projectTypes: ["Content Platform", "Marketing Campaign"],
      domains: ["Marketing", "General"],
      complexity: ["Moderate"],
      budget: ["Low", "Medium"],
      teamSize: ["Solo", "Small"],
      deployment: ["Cloud"],
      securityLevel: ["Standard"]
    }
  },
  {
    title: "YouTube Video Script + Thumbnail + Description Optimizer",
    goal: "Create a complete optimized YouTube video package from a topic or outline.",
    category: "Presentation",
    difficulty: "Intermediate",
    description: "Professional workflow for scripting, visual planning, thumbnail design prompts, and SEO-optimized description + tags.",
    steps: [
      {
        stepNumber: 1,
        title: "Script Generation",
        description: "Write engaging, timestamped script with hook and CTA.",
        toolName: "Claude",
        toolUrl: "https://claude.ai"
      },
      {
        stepNumber: 2,
        title: "Thumbnail Concept & Prompt",
        description: "Generate high-CTR thumbnail ideas and Midjourney prompts.",
        toolName: "ChatGPT",
        toolUrl: "https://chat.openai.com"
      },
      {
        stepNumber: 3,
        title: "SEO Title, Description & Tags",
        description: "Optimize for search and click-through rate.",
        toolName: "Gemini",
        toolUrl: "https://gemini.google.com"
      }
    ],
    tags: ["youtube", "video-content", "thumbnail", "seo"],
    metadata: {
      projectTypes: ["Content Platform"],
      domains: ["Marketing", "Media"],
      complexity: ["Moderate"],
      budget: ["Free", "Low"],
      teamSize: ["Solo"],
      deployment: ["Cloud"],
      securityLevel: ["Standard"]
    }
  },
  {
    title: "Personal Brand Story & Portfolio Builder",
    goal: "Build a compelling personal brand narrative and portfolio from career history.",
    category: "Career",
    difficulty: "Beginner",
    description: "Perfect for job seekers, freelancers, and creators building LinkedIn/About pages.",
    steps: [
      {
        stepNumber: 1,
        title: "Career Story Extraction",
        description: "Turn raw experience into a compelling narrative.",
        toolName: "Claude",
        toolUrl: "https://claude.ai"
      },
      {
        stepNumber: 2,
        title: "Portfolio Structure & Case Studies",
        description: "Design portfolio sections and STAR-method case studies.",
        toolName: "ChatGPT",
        toolUrl: "https://chat.openai.com"
      },
      {
        stepNumber: 3,
        title: "Visual Identity & One-Pager",
        description: "Generate design direction and Notion/Carrd template prompts.",
        toolName: "Gemini",
        toolUrl: "https://gemini.google.com"
      }
    ],
    tags: ["personal-branding", "portfolio", "job-search", "linkedin"],
    metadata: {
      projectTypes: ["Personal Project"],
      domains: ["Career"],
      complexity: ["Simple"],
      budget: ["Free"],
      teamSize: ["Solo"],
      deployment: ["Any"],
      securityLevel: ["Standard"]
    }
  },
  {
    title: "Language Learning Immersion Plan Creator",
    goal: "Generate a personalized 30-day immersion learning plan for any language.",
    category: "Learning",
    difficulty: "Beginner",
    description: "Includes daily schedule, resources, speaking practice, Anki deck ideas, and progress tracking.",
    steps: [],
    tags: ["language-learning", "education", "immersion"],
    metadata: {
      projectTypes: ["Personal Development"],
      domains: ["Education"],
      complexity: ["Simple"],
      budget: ["Free", "Low"],
      teamSize: ["Solo"],
      deployment: ["Cloud"],
      securityLevel: ["Standard"]
    }
  },
  {
    title: "Podcast Episode Production Workflow",
    goal: "Full production pipeline from topic research to final edited episode ready for publishing.",
    category: "Audio",
    difficulty: "Intermediate",
    description: "Research, scripting, guest questions, audio enhancement prompts, and show notes.",
    steps: [],
    tags: ["podcast", "audio-production", "content-creation"],
    metadata: {
      projectTypes: ["Content Platform"],
      domains: ["Media"],
      complexity: ["Moderate"],
      budget: ["Low", "Medium"],
      teamSize: ["Solo", "Small"],
      deployment: ["Cloud"],
      securityLevel: ["Standard"]
    }
  },
  {
    title: "UI/UX Design Critique & Redesign Sprint",
    goal: "Professional design review and improvement suggestions for any interface.",
    category: "Design",
    difficulty: "Advanced",
    description: "Heuristic evaluation, accessibility check, visual hierarchy, micro-interactions, and redesign prompts.",
    steps: [],
    tags: ["ui-ux", "design-critique", "figma", "user-experience"],
    metadata: {
      projectTypes: ["SaaS", "Web App"],
      domains: ["Design", "Technology"],
      complexity: ["Complex"],
      budget: ["Medium"],
      teamSize: ["Small"],
      deployment: ["Any"],
      securityLevel: ["Standard"]
    }
  },
  {
    title: "Resume + Cover Letter + LinkedIn Optimization",
    goal: "ATS-friendly resume, tailored cover letter, and LinkedIn profile transformation from one job description.",
    category: "Career",
    difficulty: "Intermediate",
    description: "Keyword optimization, achievement quantification, and personal branding alignment.",
    steps: [],
    tags: ["resume", "job-application", "linkedin-optimization"],
    metadata: {
      projectTypes: ["Job Search"],
      domains: ["Career"],
      complexity: ["Moderate"],
      budget: ["Free"],
      teamSize: ["Solo"],
      deployment: ["Any"],
      securityLevel: ["Standard"]
    }
  },
  {
    title: "Interactive Presentation & Pitch Deck Builder",
    goal: "Create a compelling investor or client pitch deck with speaker notes and visual direction.",
    category: "Presentation",
    difficulty: "Intermediate",
    description: "Story arc, slide structure, data visualization, and delivery tips.",
    steps: [],
    tags: ["pitch-deck", "presentation", "investor"],
    metadata: {
      projectTypes: ["Startup", "Sales"],
      domains: ["Business"],
      complexity: ["Moderate"],
      budget: ["Low", "Medium"],
      teamSize: ["Solo", "Small"],
      deployment: ["Cloud"],
      securityLevel: ["Standard"]
    }
  },
  {
    title: "Technical Tutorial Video Script + Code Demo Plan",
    goal: "Develop a complete tutorial from concept to polished video script and code examples.",
    category: "Learning",
    difficulty: "Advanced",
    description: "Ideal for developers creating educational content.",
    steps: [],
    tags: ["tutorial", "technical-writing", "education"],
    metadata: {
      projectTypes: ["Content Platform"],
      domains: ["Technology", "Education"],
      complexity: ["Complex"],
      budget: ["Low", "Medium"],
      teamSize: ["Solo"],
      deployment: ["Any"],
      securityLevel: ["Standard"]
    }
  },
  {
    title: "Music Album Concept & Track-by-Track Production Plan",
    goal: "Develop a cohesive album concept including themes, track list, artwork direction, and marketing hooks.",
    category: "Audio",
    difficulty: "Advanced",
    description: "For musicians and producers building full projects.",
    steps: [],
    tags: ["music-production", "album", "creative"],
    metadata: {
      projectTypes: ["Creative Project"],
      domains: ["Arts", "Media"],
      complexity: ["Complex"],
      budget: ["Medium"],
      teamSize: ["Solo"],
      deployment: ["Any"],
      securityLevel: ["Standard"]
    }
  }
];

// In seedDatabase() function, change to additive logic:
await Workflow.insertMany(newWorkflows, { ordered: false });
console.log(`Added ${newWorkflows.length} new workflows`);

// ======================== NEW PROMPTS (Additive) ========================
// Add these AFTER your existing prompts array definition
console.log("Inserting new Prompts...");
const newPrompts = [
  // ==================== WRITING ====================
  {
    title: "Blog Post Outline & Hook Generator",
    toolName: "Claude",
    category: "Writing",
    useCase: "Create engaging blog post structures with strong hooks and SEO-friendly outlines.",
    promptText: `You are a world-class content strategist. Given a topic: "{{TOPIC}}", target audience: "{{AUDIENCE}}", and goal: "{{GOAL}}", create a detailed outline with:
1. 5 powerful hook options
2. Full section structure with subheadings
3. Key points and examples for each section
4. SEO keywords and meta description
5. Call-to-action ideas`,
    expectedOutput: "Structured blog outline with hooks, sections, keywords, and CTAs.",
    tags: ["blogging", "content", "seo", "outline"],
    difficulty: "Beginner",
    metadata: { projectTypes: ["Content Platform"], domains: ["Marketing"], complexity: ["Simple"], budget: ["Free"], teamSize: ["Solo"] }
  },
  {
    title: "Email Sequence for Product Launch",
    toolName: "ChatGPT",
    category: "Writing",
    useCase: "Write a complete 7-email launch sequence.",
    promptText: `Create a 7-email nurture + launch sequence for "{{PRODUCT}}" targeted at "{{AUDIENCE}}". Include subject lines, preview text, body, and CTAs. Focus on building excitement and overcoming objections.`,
    expectedOutput: "Full 7-email series with subjects and content.",
    tags: ["email", "marketing", "launch"],
    difficulty: "Intermediate",
    metadata: { projectTypes: ["Marketing Campaign"], domains: ["Marketing"], complexity: ["Moderate"], budget: ["Low"] }
  },
  {
    title: "Long-Form Sales Page Copy",
    toolName: "Jasper AI",
    category: "Writing",
    useCase: "Generate high-converting sales page copy.",
    promptText: `Write a complete long-form sales page for "{{PRODUCT}}" using PAS (Problem-Agitate-Solution) framework. Include hero, benefits, social proof, objections, and guarantee sections.`,
    expectedOutput: "Complete sales page copy with all sections.",
    tags: ["copywriting", "sales", "conversion"],
    difficulty: "Advanced",
    metadata: { projectTypes: ["E-commerce"], domains: ["Marketing"], complexity: ["Complex"], budget: ["Medium"] }
  },
  {
    title: "Technical Whitepaper Writer",
    toolName: "Claude",
    category: "Writing",
    useCase: "Produce professional technical whitepapers.",
    promptText: `Act as a senior technical writer. Produce a 2000-word whitepaper on "{{TOPIC}}" with executive summary, problem analysis, solution architecture, case studies, and future outlook.`,
    expectedOutput: "Full whitepaper structure and content.",
    tags: ["technical", "whitepaper", "b2b"],
    difficulty: "Advanced",
    metadata: { projectTypes: ["Enterprise"], domains: ["Technology"], complexity: ["Complex"] }
  },

  // ==================== DESIGN ====================
  {
    title: "UI Component Description for Midjourney",
    toolName: "Midjourney",
    category: "Design",
    useCase: "Generate precise prompts for UI/UX elements.",
    promptText: `Translate this UI description into a highly detailed Midjourney prompt: "{{COMPONENT_DESCRIPTION}}". Include style, lighting, composition, and brand guidelines.`,
    expectedOutput: "Optimized Midjourney prompt ready to copy-paste.",
    tags: ["ui", "midjourney", "visual"],
    difficulty: "Beginner",
    metadata: { projectTypes: ["Web App"], domains: ["Design"], complexity: ["Simple"] }
  },
  {
    title: "Complete Brand Style Guide",
    toolName: "ChatGPT",
    category: "Design",
    useCase: "Generate full brand identity guidelines.",
    promptText: `Create a comprehensive brand style guide for "{{BRAND_NAME}}" including logo usage, color palette (HEX), typography, tone of voice, imagery style, and do's/don'ts.`,
    expectedOutput: "Professional brand style guide document.",
    tags: ["branding", "styleguide", "identity"],
    difficulty: "Intermediate",
    metadata: { projectTypes: ["Marketing"], domains: ["Design"], complexity: ["Moderate"] }
  },
  {
    title: "Figma-to-Code Component Spec",
    toolName: "Claude",
    category: "Design",
    useCase: "Bridge design and development.",
    promptText: `From this Figma component description: "{{DESCRIPTION}}", generate Tailwind + React component specs including props, states, accessibility, and responsive behavior.`,
    expectedOutput: "Component specification ready for developers.",
    tags: ["figma", "tailwind", "react"],
    difficulty: "Intermediate",
    metadata: { projectTypes: ["SaaS"], domains: ["Design", "Technology"] }
  },
  {
    title: "Advanced Motion Design Brief",
    toolName: "ChatGPT",
    category: "Design",
    useCase: "Create detailed animation specifications.",
    promptText: `Write a complete motion design brief for "{{SCENE}}" including timing, easing, micro-interactions, accessibility considerations, and Lottie/After Effects requirements.`,
    expectedOutput: "Detailed motion design brief.",
    tags: ["motion", "animation", "ux"],
    difficulty: "Advanced",
    metadata: { projectTypes: ["Product"], domains: ["Design"], complexity: ["Complex"] }
  },

  // ==================== CODING ====================
  {
    title: "React Hook Generator",
    toolName: "Cursor",
    category: "Coding",
    useCase: "Generate custom React hooks.",
    promptText: `Create a custom React hook called "{{HOOK_NAME}}" that handles "{{FUNCTIONALITY}}". Include full TypeScript types, error handling, and tests.`,
    expectedOutput: "Complete, production-ready custom hook.",
    tags: ["react", "hooks", "typescript"],
    difficulty: "Intermediate",
    metadata: { projectTypes: ["Web App"], domains: ["Technology"], complexity: ["Moderate"] }
  },
  {
    title: "API Architecture Review",
    toolName: "GitHub Copilot",
    category: "Coding",
    useCase: "Review and improve backend API design.",
    promptText: `Review this API specification: "{{API_SPEC}}". Suggest improvements for REST/GraphQL best practices, security, performance, versioning, and documentation.`,
    expectedOutput: "Detailed API architecture review with recommendations.",
    tags: ["api", "backend", "architecture"],
    difficulty: "Advanced",
    metadata: { projectTypes: ["SaaS"], domains: ["Technology"], complexity: ["Complex"] }
  },
  // Add 2-3 more for Coding as needed...

  // ==================== RESEARCH ====================
  {
    title: "Competitor Analysis Framework",
    toolName: "Perplexity AI",
    category: "Research",
    useCase: "Deep competitive research.",
    promptText: `Perform a comprehensive competitor analysis for "{{PRODUCT}}" against "{{COMPETITORS}}". Cover features, pricing, strengths/weaknesses, market positioning, and gaps.`,
    expectedOutput: "Structured competitor comparison matrix + insights.",
    tags: ["competitor", "market", "analysis"],
    difficulty: "Intermediate",
    metadata: { projectTypes: ["SaaS"], domains: ["Marketing"] }
  },
  // Add more for Research...

  // ==================== CAREER ====================
  {
    title: "Tailored Resume Bullet Points",
    toolName: "ChatGPT",
    category: "Career",
    useCase: "Optimize resume for specific job.",
    promptText: `Rewrite these experience points for a "{{JOB_TITLE}}" role at "{{COMPANY}}": "{{EXPERIENCE}}". Use action verbs and quantify achievements.`,
    expectedOutput: "Strong, targeted resume bullet points.",
    tags: ["resume", "job", "career"],
    difficulty: "Beginner",
    metadata: { projectTypes: ["Career"], domains: ["Career"], complexity: ["Simple"] }
  },
  // Add 3+ more for Career...

  // ==================== LEARNING ====================
  {
    title: "Personalized Learning Path",
    toolName: "Claude",
    category: "Learning",
    useCase: "Create structured learning roadmaps.",
    promptText: `Create a 12-week learning path to master "{{SKILL}}" for someone with "{{CURRENT_LEVEL}}" experience. Include resources, projects, and milestones.`,
    expectedOutput: "Detailed weekly learning roadmap.",
    tags: ["learning", "roadmap", "skill"],
    difficulty: "Intermediate",
    metadata: { projectTypes: ["Learning"], domains: ["Education"] }
  },
  // Add more...

  // ==================== AUDIO ====================
  {
    title: "Podcast Episode Script",
    toolName: "ChatGPT",
    category: "Audio",
    useCase: "Generate podcast scripts.",
    promptText: `Write a 30-minute podcast episode script on "{{TOPIC}}" with intro, main segments, guest questions, and outro. Include timing cues.`,
    expectedOutput: "Full podcast script with timings.",
    tags: ["podcast", "script", "audio"],
    difficulty: "Intermediate",
    metadata: { projectTypes: ["Content"], domains: ["Media"] }
  },
  // Add more...

  // ==================== PRESENTATION ====================
  {
    title: "Investor Pitch Deck Outline",
    toolName: "ChatGPT",
    category: "Presentation",
    useCase: "Structure winning pitch decks.",
    promptText: `Create a complete 12-slide investor pitch deck outline for "{{STARTUP_IDEA}}" including key metrics, market size, traction, and ask.`,
    expectedOutput: "Pitch deck structure with speaker notes.",
    tags: ["pitch", "investor", "deck"],
    difficulty: "Advanced",
    metadata: { projectTypes: ["Startup"], domains: ["Business"] }
  },
  // Add more...
];

const existingPrompts = await db.collection('prompts').find({}, { projection: { title: 1, category: 1 } }).toArray();
    const existingSet = new Set(existingPrompts.map(p => `${p.title}|${p.category}`));

    const promptsToInsert = newPrompts.filter(p => !existingSet.has(`${p.title}|${p.category}`));

    if (promptsToInsert.length > 0) {
      await db.collection('prompts').insertMany(promptsToInsert);
      console.log(`✅ Added ${promptsToInsert.length} new Prompts!`);
    } else {
      console.log("✅ No new prompts to add.");
    }

    console.log("🎉 All additive seeding completed successfully!");

  } catch (err) {
    console.error("❌ Error:", err.message);
  } finally {
    await mongoose.disconnect();
    console.log("Disconnected.");
  }
}

seedAdditions();