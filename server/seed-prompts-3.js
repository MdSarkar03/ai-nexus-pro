import dotenv from "dotenv";
import mongoose from "mongoose";
import Prompt from "./models/Prompt.js";

// Configure dotenv
dotenv.config({ path: "C:/Users/Tanmoy/ai-nexus-pro/.env" });

const newPrompts = [
  // 1. Writing - Beginner
  {
    title: "Blog Post Outline Creator",
    toolName: "Jasper AI",
    category: "Writing",
    useCase: "Generating a comprehensive, SEO-optimized blog outline for a specified topic and target keywords.",
    promptText: `# Role\nYou are a Content strategist and SEO Writer who knows how to capture reader attention and organize ideas logically.\n\n# Objective\nCreate a detailed, SEO-friendly outline for a blog post on the following topic.\n\n# Context\n- Topic: \`{{BLOG_TOPIC}}\`\n- Keywords: \`{{KEYWORDS}}\`\n- Target Audience: \`{{TARGET_AUDIENCE}}\`\n\n# Outline Requirements\n1. Suggest 3 potential attention-grabbing titles.\n2. Provide an outline structure with H2 and H3 headings.\n3. For each section, list 2-3 bullet points detailing what should be discussed.\n4. Include a section for a call-to-action (CTA).`,
    expectedOutput: "A structured blog post outline with H2/H3 header suggestions, main bullet points, title options, and a CTA placement.",
    tags: ["writing", "blogging", "seo", "content-creation"],
    difficulty: "Beginner",
    metadata: {
      projectTypes: ["Content Writing", "Blogging"],
      domains: ["Marketing", "Business"],
      complexity: ["Simple"],
      budget: ["Free", "Low"],
      teamSize: ["Solo"],
      deployment: ["Any"],
      securityLevel: ["Standard"]
    }
  },
  // 2. Writing - Intermediate
  {
    title: "Professional Cold Email Copywriter",
    toolName: "Copy.ai",
    category: "Writing",
    useCase: "Drafting high-converting cold email sequences for B2B outreach with personalized hooks and value propositions.",
    promptText: `# Role\nYou are an expert B2B Copywriter and Sales Outreach specialist with a track record of high response rates.\n\n# Objective\nWrite a 3-step cold email sequence targeting the following persona.\n\n# Input Parameters\n- My Service: \`{{MY_SERVICE}}\`\n- Target Persona: \`{{TARGET_PERSONA}}\`\n- Core Value Proposition: \`{{VALUE_PROPOSITION}}\`\n\n# Sequence Requirements\n1. **Email 1 (The Hook)**: Short (under 150 words), focused on a specific pain point, with a low-friction call-to-action (e.g., "Open to a quick feedback call?").\n2. **Email 2 (The Social Proof)**: Follow-up 3 days later, highlighting a brief case study or metric, showing how we solved a similar problem.\n3. **Email 3 (The Clean Break)**: Final follow-up 5 days later, giving them a polite way out while leaving the door open for future contact.\n\n# Output Format\nProvide the subject lines and email body text for all 3 emails.`,
    expectedOutput: "A 3-step B2B sales email outreach sequence with subject lines, body copy, hook personalization variables, and follow-up timing guidelines.",
    tags: ["sales", "email", "copywriting", "outreach"],
    difficulty: "Intermediate",
    metadata: {
      projectTypes: ["Sales Campaign", "Marketing"],
      domains: ["Business", "Marketing"],
      complexity: ["Moderate"],
      budget: ["Low", "Medium"],
      teamSize: ["Solo", "Small"],
      deployment: ["Any"],
      securityLevel: ["Standard"]
    }
  },
  // 3. Design - Beginner
  {
    title: "Minimalist Logo Prompt Generator",
    toolName: "Midjourney",
    category: "Design",
    useCase: "Creating detailed, descriptive image prompts for generating modern, minimalist brand logos.",
    promptText: `# Role\nYou are a Midjourney Prompt Engineer and Brand Identity Designer.\n\n# Objective\nGenerate 3 distinct Midjourney prompts to create a modern, minimalist logo for my brand.\n\n# Brand Details\n- Company Name: \`{{COMPANY_NAME}}\`\n- Industry: \`{{INDUSTRY}}\`\n- Core Values/Aesthetic: \`{{VALUES_AESTHETIC}}\`\n\n# Prompt Generation Rules\n1. Focus on clean lines, vector styles, flat designs, and geometric shapes.\n2. Specify colors, textures, and backdrop style (e.g., white background, isolated).\n3. Add standard Midjourney parameters like \`--v 6.0\` and \`--style raw\` if appropriate.\n4. Do not include complex text elements since AI models struggle with text rendering.`,
    expectedOutput: "Three structured Midjourney prompts with formatting keywords, style definitions, and parameters for creating minimalist logos.",
    tags: ["logo-design", "midjourney-prompts", "branding", "graphic-design"],
    difficulty: "Beginner",
    metadata: {
      projectTypes: ["Branding", "Creative Design"],
      domains: ["Design", "Marketing"],
      complexity: ["Simple"],
      budget: ["Free", "Low"],
      teamSize: ["Solo"],
      deployment: ["Any"],
      securityLevel: ["Standard"]
    }
  },
  // 4. Design - Intermediate
  {
    title: "Website Landing Page Design Specifier",
    toolName: "Canva AI",
    category: "Design",
    useCase: "Designing a detailed visual design layout schema, color palette, and component spacing specifications for a landing page.",
    promptText: `# Role\nYou are a Senior UI/UX Designer who creates beautiful, accessible, and high-converting web landing pages.\n\n# Objective\nCreate a comprehensive visual design specification document and layout guide for a new landing page.\n\n# Product Context\n- Product: \`{{PRODUCT_EXPLANATION}}\`\n- Desired Vibe: \`{{VISUAL_VIBE}}\`\n\n# Layout Requirements\n1. Propose a **Color Palette** (Primary, Secondary, Accent, Backgrounds) with hex codes.\n2. Suggest **Typography pairings** (Heading font, Body font) from Google Fonts.\n3. Detail the layout structure section-by-section (Hero, Features grid, Social Proof, CTA block) with exact spacing suggestions (margins, padding).\n4. Specify interactive states (hover effects, button states) to create a premium feel.`,
    expectedOutput: "Structured UI/UX specification guide detailing colors, typography, layout grid, spacings, and interactive elements.",
    tags: ["ui-ux", "landing-page", "design-specs", "web-design"],
    difficulty: "Intermediate",
    metadata: {
      projectTypes: ["Web Design", "Landing Page"],
      domains: ["Design", "Marketing"],
      complexity: ["Moderate"],
      budget: ["Low", "Medium"],
      teamSize: ["Solo", "Small"],
      deployment: ["Cloud"],
      securityLevel: ["Standard"]
    }
  },
  // 5. Career - Beginner
  {
    title: "Resume Bullet Point Optimizer",
    toolName: "Teal",
    category: "Career",
    useCase: "Re-writing passive resume bullet points into active, result-oriented statements with measurable metrics.",
    promptText: `# Role\nYou are a Professional Career Coach and Executive Resume Writer.\n\n# Objective\nRefactor my weak resume bullet points into strong, achievement-oriented bullet points using the **STAR/XYZ formula** (Accomplished [X] as measured by [Y], by doing [Z]).\n\n# Original Bullet Points\n\`\`\`text\n{{BULLET_POINTS}}\n\`\`\`\n\n# Context / Target Role\n- Target Role: \`{{TARGET_ROLE}}\`\n\n# Refactoring Checklist\n1. Start each bullet point with a strong action verb (e.g., "Led", "Engineered", "Optimized").\n2. Incorporate quantifiable metrics or estimates where possible.\n3. Align the skills demonstrated with the target job role keywords.`,
    expectedOutput: "A list of polished, metrics-focused STAR/XYZ resume bullet points tailored for the target job role.",
    tags: ["resume", "cv-writing", "job-search", "career-prep"],
    difficulty: "Beginner",
    metadata: {
      projectTypes: ["Resume Optimization"],
      domains: ["Professional Services"],
      complexity: ["Simple"],
      budget: ["Free"],
      teamSize: ["Solo"],
      deployment: ["Any"],
      securityLevel: ["Standard"]
    }
  },
  // 6. Career - Intermediate
  {
    title: "Interview Simulator & Coach",
    toolName: "ChatGPT",
    category: "Career",
    useCase: "Conducting an interactive, role-specific practice interview with situational questions and feedback.",
    promptText: `# Role\nYou are a hiring manager for the following position. You conduct behavioral and situational interviews to find top talent.\n\n# Interview Context\n- Target Role: \`{{TARGET_ROLE}}\`\n- Job Description Snippet: \`{{JOB_DESCRIPTION}}\`\n\n# Objective\nConduct a mock interview. Ask me 1 challenging behavioral question at a time.\nWait for my response before asking the next question.\n\n# Feedback Rules\nAfter I answer each question:\n1. Grade my answer on a scale from 1-10.\n2. Provide constructive feedback (what I did well, what I missed).\n3. Suggest a sample response that would earn a 10/10 score.\n4. Ask the next question.`,
    expectedOutput: "Interactive mock interview flow asking behavioral questions one-by-one, scoring responses, and giving optimal answer structures.",
    tags: ["interview-prep", "career-coaching", "mock-interview", "hiring"],
    difficulty: "Intermediate",
    metadata: {
      projectTypes: ["Interview Preparation"],
      domains: ["Professional Services", "Education"],
      complexity: ["Moderate"],
      budget: ["Free", "Low"],
      teamSize: ["Solo"],
      deployment: ["Any"],
      securityLevel: ["Standard"]
    }
  },
  // 7. Learning - Beginner
  {
    title: "Complex Topic Simple Summarizer",
    toolName: "Notion AI",
    category: "Learning",
    useCase: "Breaking down difficult concepts, acronyms, or systems into plain-English explanations using analogies.",
    promptText: `# Role\nYou are a teacher who specializes in explaining complex technical or academic topics using simple analogies (Feynman Technique).\n\n# Objective\nExplain the following topic so that a 10-year-old can easily understand it.\n\n# Topic to explain\n"${"{{COMPLEX_TOPIC}}"}"\n\n# Explanation Guidelines\n1. Avoid jargon. If a technical term is absolutely necessary, define it immediately in plain language.\n2. Use a relatable real-world analogy to illustrate the concept.\n3. Highlight the core problem this concept solves.\n4. Summarize the explanation in 3 key takeaways.`,
    expectedOutput: "A simple, jargon-free breakdown of a difficult topic complete with a real-world analogy and key takeaways.",
    tags: ["education", "feynman-technique", "summarizer", "learning-helper"],
    difficulty: "Beginner",
    metadata: {
      projectTypes: ["Study Guides", "Content Creation"],
      domains: ["Education"],
      complexity: ["Simple"],
      budget: ["Free"],
      teamSize: ["Solo"],
      deployment: ["Any"],
      securityLevel: ["Standard"]
    }
  },
  // 8. Learning - Intermediate
  {
    title: "Anki Flashcard Q&A Generator",
    toolName: "Notion AI",
    category: "Learning",
    useCase: "Generating active recall questions and answers formatted for import into Anki flashcard decks.",
    promptText: `# Role\nYou are an educational designer who builds highly effective active-recall learning materials using spaced repetition.\n\n# Objective\nGenerate a list of high-quality, conceptual flashcards based on the provided study text.\n\n# Source Material\n\`\`\`text\n{{STUDY_TEXT}}\n\`\`\`\n\n# Flashcard Design Rules\n1. Follow the **minimum information principle**: keep front (question) and back (answer) short and concise.\n2. Focus on conceptual understanding, key definitions, and active recall.\n3. Format the cards as a CSV list with columns: \`Front,Back,Tags\`.\n4. Make sure questions test single concepts (don't group multiple questions into one card).`,
    expectedOutput: "A CSV-formatted list of active-recall question and answer pairs suitable for import into Anki flashcards.",
    tags: ["anki", "active-recall", "flashcards", "spaced-repetition", "study"],
    difficulty: "Intermediate",
    metadata: {
      projectTypes: ["Study Material Generation"],
      domains: ["Education"],
      complexity: ["Moderate"],
      budget: ["Free", "Low"],
      teamSize: ["Solo"],
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
