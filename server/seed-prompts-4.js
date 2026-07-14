import dotenv from "dotenv";
import mongoose from "mongoose";
import Prompt from "./models/Prompt.js";

// Configure dotenv
dotenv.config({ path: "C:/Users/Tanmoy/ai-nexus-pro/.env" });

const newPrompts = [
  // 1. Audio - Beginner
  {
    title: "Voiceover Script Polisher",
    toolName: "ElevenLabs",
    category: "Audio",
    useCase: "Formatting and polishing raw text to be natural, well-paced, and optimized for text-to-speech voice generation.",
    promptText: `# Role\nYou are a professional Voice Director and Scriptwriter specializing in optimizing scripts for natural-sounding text-to-speech (TTS) voice generation.\n\n# Objective\nRewrite the provided raw text to optimize it for an AI voice actor.\n\n# Raw Script\n\`\`\`text\n{{RAW_SCRIPT}}\n\`\`\`\n\n# Guidelines for TTS Optimization\n1. Add pronunciation cues or spelling adjustments for tricky words or acronyms (e.g., spelling out "AI" as "A.I.").\n2. Insert punctuation marks (commas, ellipses, dashes) to indicate natural pauses and breath points.\n3. Ensure the tone is conversational and matches the target audience: \`{{TARGET_AUDIENCE}}\`.\n4. Format the final output with clear narrator markers.`,
    expectedOutput: "A polished script formatted with phonetic spellings, pause punctuation (commas, ellipses), and tone indicators for TTS generation.",
    tags: ["audio", "voiceover", "scriptwriting", "tts-optimization"],
    difficulty: "Beginner",
    metadata: {
      projectTypes: ["Content Creation", "Audiobook", "Video Production"],
      domains: ["Marketing", "Education"],
      complexity: ["Simple"],
      budget: ["Free"],
      teamSize: ["Solo"],
      deployment: ["Any"],
      securityLevel: ["Standard"]
    }
  },
  // 2. Audio - Intermediate
  {
    title: "Podcast Episode Audio Enhancer",
    toolName: "Descript",
    category: "Audio",
    useCase: "Writing structured editing steps, noise removal guidelines, and audio leveling configurations to polish raw multi-speaker podcast recordings.",
    promptText: `# Role\nYou are a Podcast Producer and Audio Engineer specializing in audio cleanup, leveling, and mastering.\n\n# Objective\nGenerate a step-by-step audio post-production checklist and editing guide for a raw multi-speaker recording.\n\n# Recording Details\n- Speakers: \`{{SPEAKER_COUNT}}\`\n- Background Noise Level: \`{{NOISE_LEVEL}}\` (e.g., room echo, HVAC hum, hiss)\n- Target Platform: \`{{TARGET_PLATFORM}}\` (e.g., Spotify, Apple Podcasts, YouTube)\n\n# Checklist Tasks\n1. Recommend exact noise gate and de-hiss threshold settings.\n2. Suggest compressor and limiter settings to achieve target loudness (-16 LUFS for stereo podcasts).\n3. Provide instructions on removing filler words (e.g., "um", "ah") and awkward silences using automated tools.\n4. Recommend EQ adjustments to enhance vocal warmth and clarity for each speaker type.`,
    expectedOutput: "Audio editing roadmap featuring specific threshold settings, compression specs, vocal EQ targets, and loudness mastering workflows.",
    tags: ["audio-editing", "podcast", "mastering", "noise-reduction"],
    difficulty: "Intermediate",
    metadata: {
      projectTypes: ["Podcast Production", "Audio Engineering"],
      domains: ["Entertainment", "Business"],
      complexity: ["Moderate"],
      budget: ["Low", "Medium"],
      teamSize: ["Solo", "Small"],
      deployment: ["Any"],
      securityLevel: ["Standard"]
    }
  },
  // 3. Presentation - Beginner
  {
    title: "Interactive Pitch Deck Structure Outline",
    toolName: "Gamma",
    category: "Presentation",
    useCase: "Designing a cohesive, narrative slide-by-slide outline for a startup pitch deck targeting venture capitalists.",
    promptText: `# Role\nYou are a Pitch Deck Architect and Startup Founder Coach who has helped secure millions in seed funding.\n\n# Objective\nCreate a 10-slide outline structure for a startup pitch deck.\n\n# Startup Overview\n- Startup Idea: \`{{STARTUP_IDEA}}\`\n- Target Market: \`{{TARGET_MARKET}}\`\n\n# Deck Guidelines\nFor each of the 10 slides, provide:\n1. Slide Title (e.g., Problem, Solution, Market Size).\n2. The core message or narrative focus.\n3. Key bullet points to display on the slide.\n4. Suggestion for visual elements (e.g., chart, graphic, icon style).`,
    expectedOutput: "A slide-by-slide 10-slide outline template with title, core message, bullet points, and visual asset suggestions.",
    tags: ["presentation", "pitch-deck", "startup", "storytelling"],
    difficulty: "Beginner",
    metadata: {
      projectTypes: ["Pitch Decks", "Business Plan"],
      domains: ["Business", "Marketing"],
      complexity: ["Simple"],
      budget: ["Free"],
      teamSize: ["Solo", "Small"],
      deployment: ["Any"],
      securityLevel: ["Standard"]
    }
  },
  // 4. Presentation - Intermediate
  {
    title: "Brand Style Presentation Schema",
    toolName: "Beautiful.ai",
    category: "Presentation",
    useCase: "Designing typography hierarchies, custom component rules, and adaptive smart layouts matching brand guidelines.",
    promptText: `# Role\nYou are a Visual Designer and Brand Strategist designing modular corporate templates.\n\n# Objective\nDesign a cohesive, adaptive design system style guide for high-quality corporate presentations.\n\n# Brand Context\n- Company Profile: \`{{COMPANY_PROFILE}}\`\n- Brand Colors: \`{{PRIMARY_SECONDARY_HEX}}\`\n- Tone: \`{{BRAND_TONE}}\` (e.g., Bold, Tech-focused, Traditional)\n\n# Layout Requirements\n1. Propose exact color hex codes for headings, body text, highlights, and slide backgrounds.\n2. Suggest font pairings (Title, Header, Body) optimizing for screen readability.\n3. Define design guidelines for charts and graphs (e.g., bar chart styling, color sequences).\n4. Suggest structural layouts for complex slides, such as comparisons, timelines, and pricing matrices.`,
    expectedOutput: "Presentation design specification covering colors, typography, charts design, comparison grids, and layout spacing rules.",
    tags: ["branding", "presentation-design", "corporate-templates", "ui-ux"],
    difficulty: "Intermediate",
    metadata: {
      projectTypes: ["Corporate Presentation", "Branding Guidelines"],
      domains: ["Business", "Design"],
      complexity: ["Moderate"],
      budget: ["Low", "Medium"],
      teamSize: ["Solo", "Small", "Medium"],
      deployment: ["Cloud"],
      securityLevel: ["Standard"]
    }
  },
  // 5. Research - Beginner
  {
    title: "Quick Topic Fact-Finder & Synopsizer",
    toolName: "Perplexity AI",
    category: "Research",
    useCase: "Gathering authenticated resources, key statistics, and main viewpoints on a target subject.",
    promptText: `# Role\nYou are an Academic Research Assistant who gathers clean, reliable facts and citations.\n\n# Objective\nResearch the following topic and compile a structured research brief.\n\n# Research Subject\n"${"{{RESEARCH_SUBJECT}}"}"\n\n# Brief Requirements\n1. Summarize the core concept in a clear, objective paragraph.\n2. Provide 3-5 key statistical facts with verified sources.\n3. Outline the main consensus view among experts, as well as any significant controversies or debates.\n4. List 3 high-quality reference links or publications to investigate further.`,
    expectedOutput: "A structured research summary containing statistical facts, expert consensus, debates, and cited reference links.",
    tags: ["research", "literature-review", "fact-finding", "citations"],
    difficulty: "Beginner",
    metadata: {
      projectTypes: ["Research Briefs", "Content Writing"],
      domains: ["Research", "Education"],
      complexity: ["Simple"],
      budget: ["Free"],
      teamSize: ["Solo"],
      deployment: ["Any"],
      securityLevel: ["Standard"]
    }
  },
  // 6. Research - Intermediate
  {
    title: "Structured Literature Synthesis Planner",
    toolName: "Elicit",
    category: "Research",
    useCase: "Analyzing academic articles, extracting variables/methodologies, and building a literature synthesis matrix.",
    promptText: `# Role\nYou are a Systematic Reviewer and Academic Consultant guiding researchers through literature syntheses.\n\n# Objective\nAnalyze the key metadata and methodologies from the provided list of research paper abstracts and synthesize findings.\n\n# Abstracts List\n\`\`\`text\n{{ABSTRACTS_LIST}}\n\`\`\`\n\n# Synthesis Guidelines\n1. Extract the core variables, research methodologies, and sample sizes from each abstract.\n2. Propose a structured **Synthesis Matrix** table layout mapping: Study Author, Methodology, Main Findings, and Limitations.\n3. Identify common trends, contradictions, and critical gaps in the literature.\n4. Formulate 3 potential research questions based on the identified gaps.`,
    expectedOutput: "A literature synthesis matrix table, trend/gap analysis report, and prospective research questions based on source abstracts.",
    tags: ["literature-review", "academic-writing", "systematic-review", "synthesis"],
    difficulty: "Intermediate",
    metadata: {
      projectTypes: ["Literature Synthesis", "Academic Research"],
      domains: ["Research", "Education"],
      complexity: ["Moderate"],
      budget: ["Free", "Low"],
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

    // Perform insertMany
    const result = await Prompt.insertMany(newPrompts);
    console.log(`Successfully inserted ${result.length} new prompts.`);

  } catch (error) {
    console.error("An error occurred during prompt seeding:", error);
  } finally {
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB.");
  }
}

run();
