import dotenv from "dotenv";
import mongoose from "mongoose";
import Tool from "./models/Tool.js";

// Configure dotenv
dotenv.config({ path: "C:/Users/Tanmoy/ai-nexus-pro/.env" });

const newTools = [
  // AI Coding Assistants
  {
    name: "Codeium",
    category: "AI Coding Assistants",
    description: "A free, ultra-fast AI code completion and search tool that supports over 70+ programming languages and integrates with popular IDEs.",
    pricing: "Free",
    url: "https://codeium.com",
    logo: "https://www.google.com/s2/favicons?domain=codeium.com&sz=128",
    tags: ["Code Completion", "AI Autocomplete", "Developer Tool", "Coding"],
    featured: false,
    rating: 4.8,
    metadata: {
      projectTypes: ["Software Development", "Scripting", "Web Apps"],
      domains: ["Technology", "Education"],
      complexity: ["Simple", "Moderate", "Complex"],
      budget: ["Free"],
      teamSize: ["Solo", "Small", "Medium", "Large"],
      deployment: ["Cloud", "On-Prem"],
      securityLevel: ["Standard", "High"]
    }
  },
  {
    name: "Tabnine",
    category: "AI Coding Assistants",
    description: "An AI code assistant for developers that provides context-aware code completions and chat in private, secure coding environments.",
    pricing: "Freemium",
    url: "https://www.tabnine.com",
    logo: "https://www.google.com/s2/favicons?domain=tabnine.com&sz=128",
    tags: ["Code Assistant", "AI Programming", "Developer Tool", "Private Code"],
    featured: false,
    rating: 4.5,
    metadata: {
      projectTypes: ["Enterprise Software", "Backend Development"],
      domains: ["Technology", "Finance"],
      complexity: ["Moderate", "Complex"],
      budget: ["Free", "Low", "Medium"],
      teamSize: ["Solo", "Small", "Medium", "Large"],
      deployment: ["Cloud", "On-Prem", "Hybrid"],
      securityLevel: ["High"]
    }
  },
  // AI Image Generation
  {
    name: "Stable Diffusion",
    category: "AI Image Generation",
    description: "A state-of-the-art open-weights text-to-image AI model developed by Stability AI, enabling high-quality creative image generation.",
    pricing: "Freemium",
    url: "https://stability.ai",
    logo: "https://www.google.com/s2/favicons?domain=stability.ai&sz=128",
    tags: ["Image Generation", "Open Source AI", "Art Generator", "Graphic Design"],
    featured: false,
    rating: 4.6,
    metadata: {
      projectTypes: ["Asset Generation", "Creative Design", "Concept Art"],
      domains: ["Design", "Entertainment", "Advertising"],
      complexity: ["Moderate", "Complex"],
      budget: ["Free", "Low", "Medium"],
      teamSize: ["Solo", "Small"],
      deployment: ["Cloud", "On-Prem"],
      securityLevel: ["Standard"]
    }
  },
  {
    name: "Canva AI",
    category: "AI Image Generation",
    description: "Canva's integrated Magic Media AI tool, allowing users to generate stunning images and designs directly inside their canvas.",
    pricing: "Freemium",
    url: "https://www.canva.com",
    logo: "https://www.google.com/s2/favicons?domain=canva.com&sz=128",
    tags: ["Design Tools", "Image Creator", "AI Graphic Design", "Marketing"],
    featured: false,
    rating: 4.5,
    metadata: {
      projectTypes: ["Social Media Graphics", "Presentations", "Ad Copy"],
      domains: ["Design", "Marketing", "Business"],
      complexity: ["Simple"],
      budget: ["Free", "Low", "Medium"],
      teamSize: ["Solo", "Small", "Medium"],
      deployment: ["Cloud"],
      securityLevel: ["Standard"]
    }
  },
  // AI Resume & Career Tools
  {
    name: "Kickresume",
    category: "AI Resume & Career Tools",
    description: "Create a beautiful resume or cover letter in minutes with the help of AI resume builders and templates approved by recruiters.",
    pricing: "Freemium",
    url: "https://www.kickresume.com",
    logo: "https://www.google.com/s2/favicons?domain=kickresume.com&sz=128",
    tags: ["Resume Builder", "Cover Letter", "Career Assistant", "CV Design"],
    featured: false,
    rating: 4.4,
    metadata: {
      projectTypes: ["Job Search Preparation", "Resume Tailoring"],
      domains: ["Education", "Professional Services"],
      complexity: ["Simple"],
      budget: ["Free", "Low"],
      teamSize: ["Solo"],
      deployment: ["Cloud"],
      securityLevel: ["Standard"]
    }
  },
  {
    name: "Rezi",
    category: "AI Resume & Career Tools",
    description: "An AI-powered resume builder designed to optimize your resume for applicant tracking systems (ATS) and job applications.",
    pricing: "Freemium",
    url: "https://www.rezi.ai",
    logo: "https://www.google.com/s2/favicons?domain=rezi.ai&sz=128",
    tags: ["Resume Builder", "Job Application", "Career AI", "ATS Optimization"],
    featured: false,
    rating: 4.3,
    metadata: {
      projectTypes: ["ATS Optimization", "Resume Auditing"],
      domains: ["Education", "HR & Recruiting"],
      complexity: ["Simple"],
      budget: ["Free", "Low"],
      teamSize: ["Solo"],
      deployment: ["Cloud"],
      securityLevel: ["Standard"]
    }
  },
  {
    name: "Enhancv",
    category: "AI Resume & Career Tools",
    description: "Create resumes that get interviews using AI-driven suggestions, templates, and analytics to showcase your top achievements.",
    pricing: "Freemium",
    url: "https://enhancv.com",
    logo: "https://www.google.com/s2/favicons?domain=enhancv.com&sz=128",
    tags: ["Resume Builder", "CV Design", "Career Tool", "Professional CV"],
    featured: false,
    rating: 4.5,
    metadata: {
      projectTypes: ["CV Enhancement", "Professional Branding"],
      domains: ["Business", "Education"],
      complexity: ["Simple"],
      budget: ["Free", "Low", "Medium"],
      teamSize: ["Solo"],
      deployment: ["Cloud"],
      securityLevel: ["Standard"]
    }
  },
  {
    name: "Wonsulting ResumAI",
    category: "AI Resume & Career Tools",
    description: "An AI resume bullet point generator designed to transform basic text into high-impact, metrics-driven professional bullet points.",
    pricing: "Freemium",
    url: "https://www.wonsulting.com/resumai",
    logo: "https://www.google.com/s2/favicons?domain=wonsulting.com&sz=128",
    tags: ["Resume Writer", "Career Coaching", "AI CV Builder", "Bullet Point Generator"],
    featured: false,
    rating: 4.2,
    metadata: {
      projectTypes: ["Resume Writing", "Career Growth"],
      domains: ["HR & Recruiting", "Professional Services"],
      complexity: ["Simple"],
      budget: ["Free", "Low"],
      teamSize: ["Solo"],
      deployment: ["Cloud"],
      securityLevel: ["Standard"]
    }
  },
  // AI Legal Assistants
  {
    name: "Casetext CoCounsel",
    category: "AI Legal Assistants",
    description: "An AI legal assistant powered by GPT-4, performing complex document review, legal research memos, and deposition prep.",
    pricing: "Paid",
    url: "https://casetext.com",
    logo: "https://www.google.com/s2/favicons?domain=casetext.com&sz=128",
    tags: ["Legal Research", "Contract Review", "AI Lawyer", "Deposition Prep"],
    featured: false,
    rating: 4.7,
    metadata: {
      projectTypes: ["Litigation Support", "Legal Document Drafting", "Case Analysis"],
      domains: ["Legal Services", "Corporate Compliance"],
      complexity: ["Complex"],
      budget: ["High"],
      teamSize: ["Solo", "Small", "Medium", "Large"],
      deployment: ["Cloud"],
      securityLevel: ["High"]
    }
  },
  {
    name: "Luminance",
    category: "AI Legal Assistants",
    description: "The leading AI platform for the legal sector, helping corporations and law firms analyze contracts, conduct audits, and manage risks.",
    pricing: "Paid",
    url: "https://www.luminance.com",
    logo: "https://www.google.com/s2/favicons?domain=luminance.com&sz=128",
    tags: ["Document Review", "Legal AI", "Contract Analysis", "Risk Management"],
    featured: false,
    rating: 4.6,
    metadata: {
      projectTypes: ["M&A Due Diligence", "Compliance Auditing"],
      domains: ["Legal Services", "Finance"],
      complexity: ["Complex"],
      budget: ["High"],
      teamSize: ["Small", "Medium", "Large"],
      deployment: ["Cloud", "On-Prem", "Hybrid"],
      securityLevel: ["High"]
    }
  },
  {
    name: "Spellbook",
    category: "AI Legal Assistants",
    description: "An AI-powered Copilot for Microsoft Word that helps lawyers draft and review contracts three times faster using GPT-4.",
    pricing: "Paid",
    url: "https://www.spellbook.legal",
    logo: "https://www.google.com/s2/favicons?domain=spellbook.legal&sz=128",
    tags: ["Contract Drafting", "Word Plugin", "Legal Assistant", "Clause Library"],
    featured: false,
    rating: 4.5,
    metadata: {
      projectTypes: ["Contract Negotiation", "Document Drafting"],
      domains: ["Legal Services", "Business Operations"],
      complexity: ["Moderate", "Complex"],
      budget: ["Medium", "High"],
      teamSize: ["Solo", "Small", "Medium"],
      deployment: ["Cloud"],
      securityLevel: ["High"]
    }
  },
  {
    name: "LawGeex",
    category: "AI Legal Assistants",
    description: "Automate contract review and redlining based on your company's playbook, reducing legal operations turnaround times.",
    pricing: "Paid",
    url: "https://www.lawgeex.com",
    logo: "https://www.google.com/s2/favicons?domain=lawgeex.com&sz=128",
    tags: ["Contract Review", "Legal Operations", "Compliance", "Contract Automation"],
    featured: false,
    rating: 4.4,
    metadata: {
      projectTypes: ["Inbound NDA Review", "Contract Redlining"],
      domains: ["Legal Services", "Enterprise Procurement"],
      complexity: ["Complex"],
      budget: ["High"],
      teamSize: ["Medium", "Large"],
      deployment: ["Cloud", "On-Prem"],
      securityLevel: ["High"]
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
      "AI Coding Assistants",
      "AI Image Generation",
      "AI Resume & Career Tools",
      "AI Legal Assistants"
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
