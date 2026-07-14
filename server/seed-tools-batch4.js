import dotenv from "dotenv";
import mongoose from "mongoose";
import Tool from "./models/Tool.js";

// Configure dotenv
dotenv.config({ path: "C:/Users/Tanmoy/ai-nexus-pro/.env" });

const newTools = [
  // AI Agents
  {
    name: "Devin",
    category: "AI Agents",
    description: "The world's first fully autonomous AI software engineer, capable of planning, coding, debugging, and executing software tasks.",
    pricing: "Paid",
    url: "https://www.cognition.ai",
    logo: "https://www.google.com/s2/favicons?domain=cognition.ai&sz=128",
    tags: ["Software Engineer", "AI Agent", "Developer Tool", "Autonomous Coding"],
    featured: false,
    rating: 4.8,
    metadata: {
      projectTypes: ["Full-stack Development", "Debugging Sessions", "Feature Upgrades"],
      domains: ["Technology", "Software Engineering"],
      complexity: ["Complex"],
      budget: ["High"],
      teamSize: ["Solo", "Small", "Medium", "Large"],
      deployment: ["Cloud", "Serverless"],
      securityLevel: ["High"]
    }
  },
  {
    name: "AutoGPT",
    category: "AI Agents",
    description: "An open-source autonomous GPT-4 agent that chains thoughts together to accomplish multi-step objectives independently.",
    pricing: "Free",
    url: "https://github.com/Significant-Gravitas/AutoGPT",
    logo: "https://www.google.com/s2/favicons?domain=github.com&sz=128",
    tags: ["Autonomous Agent", "Open Source", "Task Automation", "AI Chain"],
    featured: false,
    rating: 4.5,
    metadata: {
      projectTypes: ["Market Research", "Autonomous Web Scraping", "Custom Pipelines"],
      domains: ["Technology", "Business Operations"],
      complexity: ["Complex"],
      budget: ["Free"],
      teamSize: ["Solo", "Small"],
      deployment: ["Cloud", "On-Prem", "Hybrid", "Any"],
      securityLevel: ["Standard"]
    }
  },
  {
    name: "BabyAGI",
    category: "AI Agents",
    description: "A lightweight AI agent framework designed to showcase autonomous task generation, prioritization, and execution.",
    pricing: "Free",
    url: "https://github.com/yoheinakajima/babyagi",
    logo: "https://www.google.com/s2/favicons?domain=github.com&sz=128",
    tags: ["AI Agent", "Open Source", "Task Planner", "Minimalist Framework"],
    featured: false,
    rating: 4.3,
    metadata: {
      projectTypes: ["Task Scheduling", "Logical Workflow Testing"],
      domains: ["Technology", "Education"],
      complexity: ["Moderate"],
      budget: ["Free"],
      teamSize: ["Solo"],
      deployment: ["Cloud", "On-Prem", "Any"],
      securityLevel: ["Standard"]
    }
  },
  {
    name: "CrewAI",
    category: "AI Agents",
    description: "A framework for orchestrating role-playing autonomous AI agents to work together collaboratively on complex tasks.",
    pricing: "Freemium",
    url: "https://www.crewai.com",
    logo: "https://www.google.com/s2/favicons?domain=crewai.com&sz=128",
    tags: ["Multi-Agent System", "AI Orchestration", "Python Framework", "Collaborative AI"],
    featured: false,
    rating: 4.6,
    metadata: {
      projectTypes: ["Content Generation Crews", "Multi-Agent Research Pipeline"],
      domains: ["Business", "Marketing", "Technology"],
      complexity: ["Moderate", "Complex"],
      budget: ["Free", "Low", "Medium"],
      teamSize: ["Solo", "Small", "Medium"],
      deployment: ["Cloud", "On-Prem", "Serverless", "Hybrid", "Any"],
      securityLevel: ["Standard", "High"]
    }
  },
  // AI Automation Tools
  {
    name: "Make.com",
    category: "AI Automation Tools",
    description: "A visual workflow automation tool connecting apps and automating tasks without writing code, using drag-and-drop mechanics.",
    pricing: "Freemium",
    url: "https://www.make.com",
    logo: "https://www.google.com/s2/favicons?domain=make.com&sz=128",
    tags: ["Workflow Automation", "No-Code Integration", "API Connectors", "Visual Editor"],
    featured: false,
    rating: 4.6,
    metadata: {
      projectTypes: ["CRM Sync", "Auto-responding Workflows", "Data Import/Export"],
      domains: ["Business", "Marketing", "E-commerce"],
      complexity: ["Simple", "Moderate"],
      budget: ["Free", "Low", "Medium"],
      teamSize: ["Solo", "Small", "Medium", "Large"],
      deployment: ["Cloud"],
      securityLevel: ["Standard", "High"]
    }
  },
  {
    name: "n8n",
    category: "AI Automation Tools",
    description: "A fair-code node-based workflow automation tool that can be self-hosted, allowing high levels of customization and security.",
    pricing: "Freemium",
    url: "https://n8n.io",
    logo: "https://www.google.com/s2/favicons?domain=n8n.io&sz=128",
    tags: ["Fair-Code Automation", "Workflow Builder", "API Integration", "Self-Hosted"],
    featured: false,
    rating: 4.7,
    metadata: {
      projectTypes: ["Custom API Integrations", "Secure Data Pipelines"],
      domains: ["Technology", "Finance", "Legal Services"],
      complexity: ["Moderate", "Complex"],
      budget: ["Free", "Low", "Medium"],
      teamSize: ["Solo", "Small", "Medium", "Large"],
      deployment: ["Cloud", "On-Prem", "Hybrid"],
      securityLevel: ["High"]
    }
  },
  {
    name: "Bardeen",
    category: "AI Automation Tools",
    description: "A browser-based automation tool that runs local web scraping and app integrations right from your Chrome extension.",
    pricing: "Freemium",
    url: "https://www.bardeen.ai",
    logo: "https://www.google.com/s2/favicons?domain=bardeen.ai&sz=128",
    tags: ["Browser Automation", "No-Code Scraping", "Productivity Tool", "Chrome Extension"],
    featured: false,
    rating: 4.4,
    metadata: {
      projectTypes: ["Web Data Scraping", "Local Task Shortcuts"],
      domains: ["Business", "HR & Recruiting", "Marketing"],
      complexity: ["Simple"],
      budget: ["Free", "Low"],
      teamSize: ["Solo", "Small"],
      deployment: ["Cloud"],
      securityLevel: ["Standard"]
    }
  },
  {
    name: "Activepieces",
    category: "AI Automation Tools",
    description: "An open-source workflow automation builder designed for developers and business operations, offering local execution.",
    pricing: "Freemium",
    url: "https://www.activepieces.com",
    logo: "https://www.google.com/s2/favicons?domain=activepieces.com&sz=128",
    tags: ["Open Source Automation", "Workflow Integration", "No-Code", "Developer-Friendly"],
    featured: false,
    rating: 4.5,
    metadata: {
      projectTypes: ["Internal Integrations", "Automation Frameworks"],
      domains: ["Technology", "Business"],
      complexity: ["Simple", "Moderate"],
      budget: ["Free", "Low", "Medium"],
      teamSize: ["Solo", "Small", "Medium"],
      deployment: ["Cloud", "On-Prem"],
      securityLevel: ["Standard", "High"]
    }
  },
  // AI Voice & Audio Tools
  {
    name: "Murf.ai",
    category: "AI Voice & Audio Tools",
    description: "An AI voice generator creating studio-quality voiceovers in minutes, ideal for podcasts, presentations, and ads.",
    pricing: "Freemium",
    url: "https://murf.ai",
    logo: "https://www.google.com/s2/favicons?domain=murf.ai&sz=128",
    tags: ["Voice Generator", "Text to Speech", "Voice Cloning", "Voiceover"],
    featured: false,
    rating: 4.6,
    metadata: {
      projectTypes: ["Ad Soundtracks", "Explainer Video Voiceovers"],
      domains: ["Marketing", "Education", "Entertainment"],
      complexity: ["Simple"],
      budget: ["Free", "Low", "Medium"],
      teamSize: ["Solo", "Small", "Medium"],
      deployment: ["Cloud"],
      securityLevel: ["Standard"]
    }
  },
  {
    name: "Descript",
    category: "AI Voice & Audio Tools",
    description: "A collaborative video and audio editor that transcribes audio, allowing you to edit sound recordings by editing the text transcript.",
    pricing: "Freemium",
    url: "https://www.descript.com",
    logo: "https://www.google.com/s2/favicons?domain=descript.com&sz=128",
    tags: ["Video Editing", "Podcast Editor", "Audio Transcription", "Voice Cloning"],
    featured: false,
    rating: 4.7,
    metadata: {
      projectTypes: ["Podcast Production", "Audio Editing", "Video Subtitling"],
      domains: ["Entertainment", "Marketing", "Education"],
      complexity: ["Moderate"],
      budget: ["Free", "Low", "Medium"],
      teamSize: ["Solo", "Small", "Medium", "Large"],
      deployment: ["Cloud"],
      securityLevel: ["Standard"]
    }
  },
  {
    name: "Suno",
    category: "AI Voice & Audio Tools",
    description: "An AI-powered music generator that generates high-fidelity vocals and full instrumentation audio from descriptive text prompts.",
    pricing: "Freemium",
    url: "https://suno.com",
    logo: "https://www.google.com/s2/favicons?domain=suno.com&sz=128",
    tags: ["Music Generation", "AI Songwriter", "Audio Creation", "Vocal Synthesis"],
    featured: false,
    rating: 4.8,
    metadata: {
      projectTypes: ["Jingle Creation", "Background Music Tracks"],
      domains: ["Entertainment", "Design", "Marketing"],
      complexity: ["Moderate"],
      budget: ["Free", "Low", "Medium"],
      teamSize: ["Solo", "Small"],
      deployment: ["Cloud"],
      securityLevel: ["Standard"]
    }
  },
  {
    name: "Lovo AI",
    category: "AI Voice & Audio Tools",
    description: "An award-winning AI voiceover and text-to-speech platform featuring hundreds of realistic, emotional voice profiles.",
    pricing: "Freemium",
    url: "https://lovo.ai",
    logo: "https://www.google.com/s2/favicons?domain=lovo.ai&sz=128",
    tags: ["AI Voiceover", "Text to Speech", "Content Creation", "E-learning Audio"],
    featured: false,
    rating: 4.5,
    metadata: {
      projectTypes: ["E-learning Voiceovers", "Corporate Trainings"],
      domains: ["Education", "Business", "Marketing"],
      complexity: ["Simple"],
      budget: ["Free", "Low", "Medium"],
      teamSize: ["Solo", "Small", "Medium"],
      deployment: ["Cloud"],
      securityLevel: ["Standard"]
    }
  }
];

async function run() {
  const mongoUri = process.env.MONGO_URI;
  if (!mongoUri) {
    console.error("MONGO_URI not found in environment variables");
    process.exit(1);
  }

  try {
    await mongoose.connect(mongoUri);
    console.log("Connected to MongoDB successfully.");

    // Perform insertMany
    const result = await Tool.insertMany(newTools);
    console.log(`Successfully inserted ${result.length} new tools.`);

    // Get the resulting count per category for all target categories
    const categories = [
      "AI Agents",
      "AI Automation Tools",
      "AI Voice & Audio Tools"
    ];

    console.log("\n--- RESULTING COUNTS BY TARGET CATEGORIES ---");
    for (const cat of categories) {
      const count = await Tool.countDocuments({ category: cat });
      console.log(`- "${cat}": ${count} tools`);
    }
    console.log("---------------------------------------------\n");

  } catch (error) {
    console.error("An error occurred during seeding:", error);
  } finally {
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB.");
  }
}

run();
