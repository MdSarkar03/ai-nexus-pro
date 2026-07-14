import dotenv from "dotenv";
import mongoose from "mongoose";
import Tool from "./models/Tool.js";

// Configure dotenv
dotenv.config({ path: "C:/Users/Tanmoy/ai-nexus-pro/.env" });

const newTools = [
  {
    name: "Hugging Chat",
    category: "AI Chatbots & Assistants",
    description: "An open-source AI chat assistant powered by Hugging Face's community models, offering customizable conversational agents.",
    pricing: "Free",
    url: "https://huggingface.co/chat",
    logo: "https://www.google.com/s2/favicons?domain=huggingface.co&sz=128",
    tags: ["Open Source", "Chatbot", "Assistant", "Conversational AI"],
    featured: false,
    rating: 4.2,
    metadata: {
      projectTypes: ["Chatbot Integration", "Customer Service", "Research"],
      domains: ["Technology", "Education", "Personal Productivity"],
      complexity: ["Simple"],
      budget: ["Free"],
      teamSize: ["Solo", "Small"],
      deployment: ["Cloud"],
      securityLevel: ["Standard"]
    }
  },
  {
    name: "Grammarly",
    category: "AI Writing Tools",
    description: "AI-powered writing assistant that helps you write clearly, mistake-free, and with the appropriate tone.",
    pricing: "Freemium",
    url: "https://www.grammarly.com",
    logo: "https://www.google.com/s2/favicons?domain=grammarly.com&sz=128",
    tags: ["Writing Assistant", "Grammar Check", "Tone Detection", "Editing"],
    featured: false,
    rating: 4.6,
    metadata: {
      projectTypes: ["Content Writing", "Copywriting", "Professional Correspondence"],
      domains: ["Business", "Education", "Marketing"],
      complexity: ["Simple"],
      budget: ["Free", "Low", "Medium"],
      teamSize: ["Solo", "Small", "Medium", "Large"],
      deployment: ["Cloud"],
      securityLevel: ["Standard", "High"]
    }
  },
  {
    name: "QuillBot",
    category: "AI Writing Tools",
    description: "An AI-powered paraphrasing tool that helps students and professionals rewrite, edit, and simplify sentences.",
    pricing: "Freemium",
    url: "https://quillbot.com",
    logo: "https://www.google.com/s2/favicons?domain=quillbot.com&sz=128",
    tags: ["Paraphraser", "Writing Tool", "Summarizer", "Rewriter"],
    featured: false,
    rating: 4.4,
    metadata: {
      projectTypes: ["Academic Writing", "Blogging", "Translation Assistance"],
      domains: ["Education", "Publishing", "Marketing"],
      complexity: ["Simple"],
      budget: ["Free", "Low"],
      teamSize: ["Solo", "Small"],
      deployment: ["Cloud"],
      securityLevel: ["Standard"]
    }
  },
  {
    name: "Semantic Scholar",
    category: "AI Research & Search",
    description: "A free, AI-powered research tool for scientific literature, helping researchers discover and understand academic papers.",
    pricing: "Free",
    url: "https://www.semanticscholar.org",
    logo: "https://www.google.com/s2/favicons?domain=semanticscholar.org&sz=128",
    tags: ["Academic Research", "Literature Review", "Scientific Search"],
    featured: false,
    rating: 4.5,
    metadata: {
      projectTypes: ["Scientific Research", "Data Mining", "Paper Summarization"],
      domains: ["Education", "Healthcare", "Science & Technology"],
      complexity: ["Moderate"],
      budget: ["Free"],
      teamSize: ["Solo", "Small", "Medium"],
      deployment: ["Cloud"],
      securityLevel: ["Standard"]
    }
  },
  {
    name: "Phind",
    category: "AI Research & Search",
    description: "An AI search engine for developers, designed to answer technical questions with code snippets and explanations.",
    pricing: "Freemium",
    url: "https://www.phind.com",
    logo: "https://www.google.com/s2/favicons?domain=phind.com&sz=128",
    tags: ["Developer Search", "Code Assistant", "Technical Search"],
    featured: false,
    rating: 4.7,
    metadata: {
      projectTypes: ["Software Development", "Debugging", "Code Refactoring"],
      domains: ["Technology", "Education"],
      complexity: ["Simple", "Moderate", "Complex"],
      budget: ["Free", "Low", "Medium"],
      teamSize: ["Solo", "Small", "Medium"],
      deployment: ["Cloud"],
      securityLevel: ["Standard"]
    }
  },
  {
    name: "HeyGen",
    category: "AI Video Generation & Editing",
    description: "An AI video generator that lets you create professional business and spokesperson videos with custom avatars and voices.",
    pricing: "Freemium",
    url: "https://www.heygen.com",
    logo: "https://www.google.com/s2/favicons?domain=heygen.com&sz=128",
    tags: ["Video Generator", "Spokesperson Video", "AI Avatars", "Marketing"],
    featured: false,
    rating: 4.8,
    metadata: {
      projectTypes: ["Product Demo", "Training Video", "Marketing Campaigns"],
      domains: ["Business", "Marketing", "E-commerce"],
      complexity: ["Moderate"],
      budget: ["Low", "Medium", "High"],
      teamSize: ["Solo", "Small", "Medium"],
      deployment: ["Cloud"],
      securityLevel: ["Standard"]
    }
  },
  {
    name: "Luma Dream Machine",
    category: "AI Video Generation & Editing",
    description: "A highly advanced AI video model that generates cinematic, high-quality, and realistic videos from text descriptions.",
    pricing: "Freemium",
    url: "https://lumalabs.ai/dream-machine",
    logo: "https://www.google.com/s2/favicons?domain=lumalabs.ai&sz=128",
    tags: ["Video Generation", "Cinematic AI", "Text-to-Video", "Creative"],
    featured: false,
    rating: 4.3,
    metadata: {
      projectTypes: ["Film Production", "Creative Content", "Artistic Experiments"],
      domains: ["Entertainment", "Design", "Marketing"],
      complexity: ["Moderate", "Complex"],
      budget: ["Free", "Low", "Medium"],
      teamSize: ["Solo", "Small"],
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
      "AI Chatbots & Assistants",
      "AI Writing Tools",
      "AI Research & Search",
      "AI Video Generation & Editing"
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
