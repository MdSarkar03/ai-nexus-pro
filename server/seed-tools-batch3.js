import dotenv from "dotenv";
import mongoose from "mongoose";
import Tool from "./models/Tool.js";

// Configure dotenv
dotenv.config({ path: "C:/Users/Tanmoy/ai-nexus-pro/.env" });

const newTools = [
  // AI Productivity Tools
  {
    name: "Taskade",
    category: "AI Productivity Tools",
    description: "An AI-powered collaboration and productivity tool providing task lists, mind maps, structured outlines, and chat spaces in unified workspaces.",
    pricing: "Freemium",
    url: "https://www.taskade.com",
    logo: "https://www.google.com/s2/favicons?domain=taskade.com&sz=128",
    tags: ["Task Management", "Collaboration", "Productivity", "Mind Map"],
    featured: false,
    rating: 4.6,
    metadata: {
      projectTypes: ["Task Tracking", "Team Collaboration", "Ideation"],
      domains: ["Business", "Education", "Personal Productivity"],
      complexity: ["Simple"],
      budget: ["Free", "Low", "Medium"],
      teamSize: ["Solo", "Small", "Medium", "Large"],
      deployment: ["Cloud"],
      securityLevel: ["Standard"]
    }
  },
  {
    name: "Otter.ai",
    category: "AI Productivity Tools",
    description: "AI assistant that records meetings, takes automated notes, transcribes voice to text, and generates summaries for teams.",
    pricing: "Freemium",
    url: "https://otter.ai",
    logo: "https://www.google.com/s2/favicons?domain=otter.ai&sz=128",
    tags: ["Meeting Notes", "Transcription", "Audio AI", "Productivity"],
    featured: false,
    rating: 4.5,
    metadata: {
      projectTypes: ["Meeting Documentation", "Voice Archiving"],
      domains: ["Business", "Education", "Sales"],
      complexity: ["Simple"],
      budget: ["Free", "Low", "Medium"],
      teamSize: ["Solo", "Small", "Medium", "Large"],
      deployment: ["Cloud"],
      securityLevel: ["Standard", "High"]
    }
  },
  {
    name: "Sunsama",
    category: "AI Productivity Tools",
    description: "A premium daily planner that compiles tasks from multiple integrations and uses time-blocking to plan your day.",
    pricing: "Paid",
    url: "https://www.sunsama.com",
    logo: "https://www.google.com/s2/favicons?domain=sunsama.com&sz=128",
    tags: ["Daily Planner", "Time Blocking", "Task Integration", "Focus Mode"],
    featured: false,
    rating: 4.6,
    metadata: {
      projectTypes: ["Daily Planning", "Calendar Management"],
      domains: ["Personal Productivity", "Professional Services"],
      complexity: ["Simple"],
      budget: ["Low", "Medium"],
      teamSize: ["Solo", "Small"],
      deployment: ["Cloud"],
      securityLevel: ["Standard"]
    }
  },
  {
    name: "Granola",
    category: "AI Productivity Tools",
    description: "An AI meeting notepad for macOS that writes clean, organized notes directly based on your meeting audio.",
    pricing: "Paid",
    url: "https://www.granola.so",
    logo: "https://www.google.com/s2/favicons?domain=granola.so&sz=128",
    tags: ["Meeting Notes", "Mac App", "Productivity AI", "Meeting Summary"],
    featured: false,
    rating: 4.4,
    metadata: {
      projectTypes: ["Internal Team Meetings", "Product Scoping"],
      domains: ["Technology", "Business"],
      complexity: ["Simple"],
      budget: ["Low", "Medium"],
      teamSize: ["Solo", "Small", "Medium"],
      deployment: ["Cloud"],
      securityLevel: ["Standard"]
    }
  },
  // AI Cybersecurity Tools
  {
    name: "Microsoft Copilot for Security",
    category: "AI Cybersecurity Tools",
    description: "A generative AI security product helping security professionals defend at machine speed and discover threat intelligence.",
    pricing: "Paid",
    url: "https://www.microsoft.com/security",
    logo: "https://www.google.com/s2/favicons?domain=microsoft.com&sz=128",
    tags: ["Cybersecurity", "Threat Intelligence", "Incident Response", "SecOps"],
    featured: false,
    rating: 4.7,
    metadata: {
      projectTypes: ["Incident Triage", "Policy Auditing", "Threat Analysis"],
      domains: ["Corporate Security", "IT Infrastructure"],
      complexity: ["Complex"],
      budget: ["High"],
      teamSize: ["Medium", "Large"],
      deployment: ["Cloud", "Hybrid"],
      securityLevel: ["High"]
    }
  },
  {
    name: "SentinelOne Purple AI",
    category: "AI Cybersecurity Tools",
    description: "An AI security analyst that queries threat data using natural language, speeds up hunting, and automates responses.",
    pricing: "Paid",
    url: "https://www.sentinelone.com",
    logo: "https://www.google.com/s2/favicons?domain=sentinelone.com&sz=128",
    tags: ["Threat Hunting", "SecOps", "Endpoint Protection", "Data Analytics"],
    featured: false,
    rating: 4.8,
    metadata: {
      projectTypes: ["Threat Hunting", "Endpoint Defense"],
      domains: ["Corporate Security", "Finance", "Healthcare"],
      complexity: ["Complex"],
      budget: ["High"],
      teamSize: ["Medium", "Large"],
      deployment: ["Cloud", "On-Prem", "Hybrid"],
      securityLevel: ["High"]
    }
  },
  {
    name: "Tessian",
    category: "AI Cybersecurity Tools",
    description: "An email security platform that prevents data loss, email misdirection, and sophisticated phishing attacks using behavioral AI.",
    pricing: "Paid",
    url: "https://www.tessian.com",
    logo: "https://www.google.com/s2/favicons?domain=tessian.com&sz=128",
    tags: ["Email Security", "Data Loss Prevention", "Phishing Prevention", "Behavioral AI"],
    featured: false,
    rating: 4.6,
    metadata: {
      projectTypes: ["Phishing Defense", "DLP Compliance"],
      domains: ["Corporate Security", "Legal Services", "Finance"],
      complexity: ["Moderate", "Complex"],
      budget: ["Medium", "High"],
      teamSize: ["Small", "Medium", "Large"],
      deployment: ["Cloud"],
      securityLevel: ["High"]
    }
  },
  {
    name: "Snyk",
    category: "AI Cybersecurity Tools",
    description: "A developer-first security platform finding and automatically fixing vulnerabilities in code, open source, and containers.",
    pricing: "Freemium",
    url: "https://snyk.io",
    logo: "https://www.google.com/s2/favicons?domain=snyk.io&sz=128",
    tags: ["Vulnerability Scanner", "Code Security", "Developer Security", "Static Analysis"],
    featured: false,
    rating: 4.7,
    metadata: {
      projectTypes: ["AppSec Audit", "Vulnerability Remediations"],
      domains: ["Technology", "Software Engineering"],
      complexity: ["Moderate", "Complex"],
      budget: ["Free", "Low", "Medium", "High"],
      teamSize: ["Solo", "Small", "Medium", "Large"],
      deployment: ["Cloud", "On-Prem", "Serverless", "Hybrid", "Any"],
      securityLevel: ["High"]
    }
  },
  // AI Presentation Tools
  {
    name: "Beautiful.ai",
    category: "AI Presentation Tools",
    description: "An online presentation maker with smart templates that adjust layouts automatically as you add content and slides.",
    pricing: "Paid",
    url: "https://www.beautiful.ai",
    logo: "https://www.google.com/s2/favicons?domain=beautiful.ai&sz=128",
    tags: ["Presentation Maker", "Slide Designer", "Pitch Decks", "Layout AI"],
    featured: false,
    rating: 4.5,
    metadata: {
      projectTypes: ["Pitch Decks", "Sales Presentations", "Project Reports"],
      domains: ["Business", "Marketing", "Education"],
      complexity: ["Simple"],
      budget: ["Low", "Medium"],
      teamSize: ["Solo", "Small", "Medium"],
      deployment: ["Cloud"],
      securityLevel: ["Standard"]
    }
  },
  {
    name: "Tome",
    category: "AI Presentation Tools",
    description: "A fluid storytelling and presentation platform that instantly generates slidedecks, images, and text from a prompt.",
    pricing: "Freemium",
    url: "https://tome.app",
    logo: "https://www.google.com/s2/favicons?domain=tome.app&sz=128",
    tags: ["Presentation Tool", "Storytelling", "AI Slidedeck", "Creative Builder"],
    featured: false,
    rating: 4.3,
    metadata: {
      projectTypes: ["Product Storytelling", "Brand Pitching"],
      domains: ["Design", "Marketing", "E-commerce"],
      complexity: ["Simple"],
      budget: ["Free", "Low", "Medium"],
      teamSize: ["Solo", "Small"],
      deployment: ["Cloud"],
      securityLevel: ["Standard"]
    }
  },
  {
    name: "Decktopus",
    category: "AI Presentation Tools",
    description: "Create visually appealing presentations online in seconds by filling out prompt forms and choosing template themes.",
    pricing: "Freemium",
    url: "https://www.decktopus.com",
    logo: "https://www.google.com/s2/favicons?domain=decktopus.com&sz=128",
    tags: ["Slide Generator", "Presentation Builder", "Lead Generation", "Layouts"],
    featured: false,
    rating: 4.4,
    metadata: {
      projectTypes: ["Quick Presentation Generation", "Business Proposing"],
      domains: ["Business", "Education", "Marketing"],
      complexity: ["Simple"],
      budget: ["Free", "Low", "Medium"],
      teamSize: ["Solo", "Small", "Medium"],
      deployment: ["Cloud"],
      securityLevel: ["Standard"]
    }
  },
  {
    name: "Slidesgo AI",
    category: "AI Presentation Tools",
    description: "An AI-powered presentation creator that builds customized slide decks for Google Slides and PowerPoint.",
    pricing: "Freemium",
    url: "https://slidesgo.com",
    logo: "https://www.google.com/s2/favicons?domain=slidesgo.com&sz=128",
    tags: ["Google Slides Templates", "PowerPoint Creator", "AI Slides", "Theme Packs"],
    featured: false,
    rating: 4.2,
    metadata: {
      projectTypes: ["Education Slideshows", "Public Speaking Material"],
      domains: ["Education", "Business"],
      complexity: ["Simple"],
      budget: ["Free", "Low"],
      teamSize: ["Solo", "Small"],
      deployment: ["Cloud"],
      securityLevel: ["Standard"]
    }
  },
  // AI Healthcare Assistants
  {
    name: "Ada Health",
    category: "AI Healthcare Assistants",
    description: "A certified symptom assessment app helping patients and doctors analyze symptoms and understand health conditions.",
    pricing: "Free",
    url: "https://ada.com",
    logo: "https://www.google.com/s2/favicons?domain=ada.com&sz=128",
    tags: ["Symptom Checker", "Personal Health", "Medical Diagnostics", "Triage"],
    featured: false,
    rating: 4.7,
    metadata: {
      projectTypes: ["Symptom Assessment", "Pre-clinical Triage"],
      domains: ["Healthcare", "Science & Technology"],
      complexity: ["Moderate"],
      budget: ["Free"],
      teamSize: ["Solo"],
      deployment: ["Cloud"],
      securityLevel: ["High"]
    }
  },
  {
    name: "Suki AI",
    category: "AI Healthcare Assistants",
    description: "An AI-powered voice assistant for healthcare, capturing clinic notes, charting, and helping clinicians save time on documentation.",
    pricing: "Paid",
    url: "https://www.suki.ai",
    logo: "https://www.google.com/s2/favicons?domain=suki.ai&sz=128",
    tags: ["Voice Assistant", "Medical Documentation", "Clinical Notes", "Electronic Health Records"],
    featured: false,
    rating: 4.6,
    metadata: {
      projectTypes: ["Clinical Charting", "EHR Documentation"],
      domains: ["Healthcare"],
      complexity: ["Complex"],
      budget: ["High"],
      teamSize: ["Solo", "Small", "Medium"],
      deployment: ["Cloud"],
      securityLevel: ["High"]
    }
  },
  {
    name: "Abridge",
    category: "AI Healthcare Assistants",
    description: "Generative AI platform transcribing medical dialogues into clinical documentation for physicians and care teams.",
    pricing: "Paid",
    url: "https://www.abridge.com",
    logo: "https://www.google.com/s2/favicons?domain=abridge.com&sz=128",
    tags: ["Clinical Conversation", "Medical Transcripts", "Healthcare Notes", "Physician Scribe"],
    featured: false,
    rating: 4.8,
    metadata: {
      projectTypes: ["Physician Consultation Recording", "Encounter Summary"],
      domains: ["Healthcare"],
      complexity: ["Complex"],
      budget: ["High"],
      teamSize: ["Solo", "Small", "Medium", "Large"],
      deployment: ["Cloud", "Hybrid"],
      securityLevel: ["High"]
    }
  },
  {
    name: "Heidi Health",
    category: "AI Healthcare Assistants",
    description: "An AI medical scribe transforming doctor-patient consultation audio into structured referral letters and clinical logs.",
    pricing: "Freemium",
    url: "https://www.heidihealth.com",
    logo: "https://www.google.com/s2/favicons?domain=heidihealth.com&sz=128",
    tags: ["AI Scribe", "Medical Records", "Healthcare Admin", "Referrals Builder"],
    featured: false,
    rating: 4.5,
    metadata: {
      projectTypes: ["Consultation Scribing", "Referral Drafting"],
      domains: ["Healthcare"],
      complexity: ["Moderate"],
      budget: ["Free", "Low", "Medium"],
      teamSize: ["Solo", "Small"],
      deployment: ["Cloud"],
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
      "AI Productivity Tools",
      "AI Cybersecurity Tools",
      "AI Presentation Tools",
      "AI Healthcare Assistants"
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
