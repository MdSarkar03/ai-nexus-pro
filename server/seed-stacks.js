import dotenv from "dotenv";
import mongoose from "mongoose";
import Stack from "./models/Stack.js";

// Configure dotenv
dotenv.config({ path: "C:/Users/Tanmoy/ai-nexus-pro/.env" });

const newStacks = [
  // 1. YouTube/Video Production AI Stack - Beginner
  {
    title: "YouTube AI Production Stack",
    role: "Automating video production, scripting, and marketing workflows",
    roles: ["Content Creator"],
    description: "A streamlined AI stack for content creators to draft video scripts, generate realistic voiceovers, compile visual assets, and automate subtitle generation for social media platforms.",
    tools: [
      {
        toolName: "ChatGPT",
        toolUrl: "https://chatgpt.com",
        purpose: "Scriptwriting and topic ideation",
        category: "Ideation"
      },
      {
        toolName: "Jasper AI",
        toolUrl: "https://www.jasper.ai",
        purpose: "SEO description and title drafting",
        category: "Copywriting"
      },
      {
        toolName: "ElevenLabs",
        toolUrl: "https://elevenlabs.io",
        purpose: "High-fidelity AI voice narration",
        category: "Audio Generation"
      },
      {
        toolName: "HeyGen",
        toolUrl: "https://www.heygen.com",
        purpose: "AI avatar and spokesperson videos",
        category: "Video Generation"
      },
      {
        toolName: "Descript",
        toolUrl: "https://www.descript.com",
        purpose: "Video transcription and text-based editing",
        category: "Video Editing"
      }
    ],
    tags: ["video-production", "youtube", "social-media", "content-creation"],
    difficulty: "Beginner",
    reasoning: "Enables solo creators to generate high-quality video content from scripts in a fraction of the time compared to traditional production pipelines.",
    alternatives: [
      {
        category: "Video Editing",
        toolName: "Runway",
        reason: "Provides advanced generative video effects and inpainting features."
      },
      {
        category: "Audio Generation",
        toolName: "Murf.ai",
        reason: "Offers highly customizable corporate voice profiles."
      }
    ],
    metadata: {
      projectTypes: ["Video", "Social Media", "Marketing"],
      domains: ["Marketing", "Entertainment"],
      complexity: ["Simple"],
      budget: ["Free", "Low", "Medium"],
      teamSize: ["Solo"],
      deployment: ["Cloud"],
      securityLevel: ["Standard"]
    }
  },
  // 2. Podcast Production AI Stack - Intermediate
  {
    title: "Podcast AI Mastering Stack",
    role: "Automated multi-track podcast editing and publishing",
    roles: ["Content Creator"],
    description: "A robust audio compilation and post-production stack optimized for recording high-fidelity multi-speaker podcasts, cleaning background noise, and writing promotional summaries.",
    tools: [
      {
        toolName: "Riverside.fm",
        toolUrl: "https://riverside.fm",
        purpose: "Local multi-track video/audio recording",
        category: "Recording Platform"
      },
      {
        toolName: "Descript",
        toolUrl: "https://www.descript.com",
        purpose: "Filler word removal and multi-track audio editing",
        category: "Audio Editing"
      },
      {
        toolName: "Adobe Podcast",
        toolUrl: "https://podcast.adobe.com",
        purpose: "Speech enhancement and noise isolation",
        category: "Audio Mastering"
      },
      {
        toolName: "Suno",
        toolUrl: "https://suno.com",
        purpose: "Custom AI intro/outro music creation",
        category: "Music Production"
      },
      {
        toolName: "Otter.ai",
        toolUrl: "https://otter.ai",
        purpose: "Generating interactive meeting show notes and transcripts",
        category: "Transcription"
      }
    ],
    tags: ["podcasting", "audio-engineering", "mastering", "content-creation"],
    difficulty: "Intermediate",
    reasoning: "Combines raw local audio capture with AI-driven speech cleanup and text-based editing, ensuring broadcast-quality results without requiring complex DAW software.",
    alternatives: [
      {
        category: "Audio Editing",
        toolName: "Murf.ai",
        reason: "Useful for inserting studio-quality voice comments post-recording."
      },
      {
        category: "Recording Platform",
        toolName: "Zoom",
        reason: "Widely available alternative though lower raw audio quality."
      }
    ],
    metadata: {
      projectTypes: ["Audio", "Podcast", "Interview"],
      domains: ["Entertainment", "Business"],
      complexity: ["Moderate"],
      budget: ["Low", "Medium"],
      teamSize: ["Solo", "Small"],
      deployment: ["Cloud"],
      securityLevel: ["Standard"]
    }
  },
  // 3. UI/UX Design AI Stack - Beginner
  {
    title: "AI UI/UX Design Prototyping Stack",
    role: "Rapid interface mockups and interactive user flows creation",
    roles: ["Designer"],
    description: "A beginner-friendly design stack that leverages generative AI components to create page layouts, suggest design elements, and audit accessibility.",
    tools: [
      {
        toolName: "Figma",
        toolUrl: "https://www.figma.com",
        purpose: "Design canvas and prototyping space",
        category: "Design Canvas"
      },
      {
        toolName: "Galileo AI",
        toolUrl: "https://www.usegalileo.ai",
        purpose: "Text-to-UI screen design generation",
        category: "UI Generation"
      },
      {
        toolName: "Canva AI",
        toolUrl: "https://www.canva.com",
        purpose: "Template adjustments and placeholder visuals",
        category: "Visual Editor"
      },
      {
        toolName: "ChatGPT",
        toolUrl: "https://chatgpt.com",
        purpose: "UX microcopy and user persona drafting",
        category: "UX Writing"
      },
      {
        toolName: "Contrast",
        toolUrl: "https://usecontrast.com",
        purpose: "Color contrast and WCAG compliance checker",
        category: "Accessibility Audit"
      }
    ],
    tags: ["ui-ux", "prototyping", "figma", "web-design"],
    difficulty: "Beginner",
    reasoning: "Simplifies the transition from feature descriptions to visual screen mockups, automating asset generation and UX copy creation.",
    alternatives: [
      {
        category: "UI Generation",
        toolName: "v0 by Vercel",
        reason: "Generates interactive React frontend code directly rather than raw designs."
      },
      {
        category: "Visual Editor",
        toolName: "Adobe Firefly",
        reason: "Provides high-end generative fill options for custom visual assets."
      }
    ],
    metadata: {
      projectTypes: ["Web Design", "Mobile App UI"],
      domains: ["Design", "Technology"],
      complexity: ["Simple"],
      budget: ["Free", "Low"],
      teamSize: ["Solo", "Small"],
      deployment: ["Cloud"],
      securityLevel: ["Standard"]
    }
  },
  // 4. Graphic/Brand Design AI Stack - Intermediate
  {
    title: "AI Graphic & Brand Identity Stack",
    role: "Consistent brand asset generation and marketing design",
    roles: ["Designer"],
    description: "An intermediate design stack allowing designers to build cohesive visual brand guidelines, generate vector graphics, and scale promotional material quickly.",
    tools: [
      {
        toolName: "Adobe Illustrator",
        toolUrl: "https://www.adobe.com/products/illustrator",
        purpose: "Vector designs, custom typography, and print files layout",
        category: "Vector Editor"
      },
      {
        toolName: "Adobe Firefly",
        toolUrl: "https://www.adobe.com/sensei/generative-ai/firefly",
        purpose: "Generative vector graphics and prompt recoloring",
        category: "Vector Generation"
      },
      {
        toolName: "Midjourney",
        toolUrl: "https://www.midjourney.com",
        purpose: "Creative brand moodboards and concept art generation",
        category: "Concept Generation"
      },
      {
        toolName: "Stable Diffusion",
        toolUrl: "https://stability.ai",
        purpose: "Localized product mockups and packaging designs",
        category: "Image Synthesis"
      },
      {
        toolName: "Beautiful.ai",
        toolUrl: "https://www.beautiful.ai",
        purpose: "Brand deck and visual asset showcase generation",
        category: "Presentation"
      }
    ],
    tags: ["branding", "graphic-design", "vector-art", "creative-marketing"],
    difficulty: "Intermediate",
    reasoning: "Melds traditional vector precision tools with generative model libraries, allowing the fast production of brand variations without loss of vector flexibility.",
    alternatives: [
      {
        category: "Concept Generation",
        toolName: "DALL·E",
        reason: "Easily integrated via ChatGPT interface for fast iterations."
      },
      {
        category: "Vector Generation",
        toolName: "Canva AI",
        reason: "Simple drag-and-drop templates ideal for fast social graphics."
      }
    ],
    metadata: {
      projectTypes: ["Branding", "Asset Pack", "Marketing Campaign"],
      domains: ["Design", "Marketing"],
      complexity: ["Moderate"],
      budget: ["Low", "Medium", "High"],
      teamSize: ["Solo", "Small", "Medium"],
      deployment: ["Cloud", "On-Prem"],
      securityLevel: ["Standard"]
    }
  },
  // 5. Study/Research/Note-Taking AI Stack - Beginner
  {
    title: "AI Academic Research & Note Stack",
    role: "Streamlined citation search, article summarization, and active recall studies",
    roles: ["Student"],
    description: "A comprehensive study stack designed to help students discover relevant scientific studies, synthesize complex concepts, and build interactive flashcard decks.",
    tools: [
      {
        toolName: "Notion",
        toolUrl: "https://www.notion.so",
        purpose: "Study notes organization and lecture logs central hub",
        category: "Notes Hub"
      },
      {
        toolName: "Notion AI",
        toolUrl: "https://www.notion.so/product/ai",
        purpose: "Summarizing long readings and generating key take-aways",
        category: "Note Assistant"
      },
      {
        toolName: "Semantic Scholar",
        toolUrl: "https://www.semanticscholar.org",
        purpose: "AI-powered academic paper discovery and citation checks",
        category: "Academic Search"
      },
      {
        toolName: "Perplexity AI",
        toolUrl: "https://www.perplexity.ai",
        purpose: "Fast question answering with cited web links",
        category: "General Search"
      },
      {
        toolName: "Anki",
        toolUrl: "https://apps.ankiweb.net",
        purpose: "Spaced repetition active-recall flashcard study reviews",
        category: "Recall Flashcards"
      }
    ],
    tags: ["studying", "academic-research", "active-recall", "note-taking"],
    difficulty: "Beginner",
    reasoning: "Unifies active research tools with spaced-repetition software, shifting study focus from manual note-taking to active retrieval practice.",
    alternatives: [
      {
        category: "Academic Search",
        toolName: "Consensus",
        reason: "Best for pulling expert consensus answers directly from peer-reviewed abstracts."
      },
      {
        category: "Note Assistant",
        toolName: "ChatGPT",
        reason: "Highly flexible generic summaries and brainstorming partner."
      }
    ],
    metadata: {
      projectTypes: ["Study Guides", "Research Papers", "Exam Preparation"],
      domains: ["Education", "Research"],
      complexity: ["Simple"],
      budget: ["Free", "Low"],
      teamSize: ["Solo"],
      deployment: ["Any"],
      securityLevel: ["Standard"]
    }
  },
  // 6. Coding-Bootcamp Learning AI Stack - Beginner
  {
    title: "Coding Bootcamp Developer Stack",
    role: "Accelerated programming studies, interactive debugging, and code pattern discovery",
    roles: ["Student"],
    description: "An interactive stack for coding bootcamp students to learn software development, trace execution bugs, and study coding best practices under an AI programming mentor.",
    tools: [
      {
        toolName: "VS Code",
        toolUrl: "https://code.visualstudio.com",
        purpose: "Primary development environment code editor",
        category: "Code Editor"
      },
      {
        toolName: "Codeium",
        toolUrl: "https://codeium.com",
        purpose: "Free AI-assisted code completions and interactive chat inside the editor",
        category: "Coding Assistant"
      },
      {
        toolName: "Phind",
        toolUrl: "https://www.phind.com",
        purpose: "Technical programming search engine explaining libraries with source links",
        category: "Tech Research"
      },
      {
        toolName: "ChatGPT",
        toolUrl: "https://chatgpt.com",
        purpose: "Explaining database structures and software concepts in plain English",
        category: "Theory Tutor"
      },
      {
        toolName: "GitHub",
        toolUrl: "https://github.com",
        purpose: "Hosting study repositories and practicing Git branching workflows",
        category: "Code Host"
      }
    ],
    tags: ["coding", "programming-basics", "debugging", "developer-prep"],
    difficulty: "Beginner",
    reasoning: "Pairs a free IDE editor assistant with developer-focused search tools, providing answers with explicit code examples and explanations that skip boilerplate search steps.",
    alternatives: [
      {
        category: "Coding Assistant",
        toolName: "Cursor",
        reason: "Next-generation editor fork offering deeper inline refactoring tools."
      },
      {
        category: "Tech Research",
        toolName: "Claude",
        reason: "Highly detailed responses when studying algorithmic logic."
      }
    ],
    metadata: {
      projectTypes: ["Software Projects", "Coding Practice", "Portfolio Projects"],
      domains: ["Education", "Technology"],
      complexity: ["Simple", "Moderate"],
      budget: ["Free"],
      teamSize: ["Solo", "Small"],
      deployment: ["Any"],
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

    // First query and print a single stack document for structural reference
    const sample = await Stack.findOne({});
    console.log("--- REFERENCE SAMPLE STACK DOCUMENT ---");
    console.log(JSON.stringify(sample, null, 2));
    console.log("----------------------------------------\n");

    // Perform insertMany
    const result = await Stack.insertMany(newStacks);
    console.log(`Successfully inserted ${result.length} new stacks.`);

  } catch (error) {
    console.error("An error occurred during stack seeding:", error);
  } finally {
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB.");
  }
}

run();
