import mongoose from "mongoose";
import dotenv from "dotenv";
import Tool from "../models/Tool.js";
import Workflow from "../models/Workflow.js";
import LLMModel from "../models/LLMModel.js";
import Stack from "../models/Stack.js";
import Prompt from "../models/Prompt.js";

dotenv.config({ path: "../../.env" });

const tools = [
  // AI Chatbots
  { name: "ChatGPT", category: "AI Chatbots", description: "Most popular AI chatbot by OpenAI. Great for writing, coding, and general tasks.", pricing: "Freemium", url: "https://chat.openai.com", tags: ["chatbot", "writing", "coding"], featured: true, rating: 4.8 },
  { name: "Claude", category: "AI Chatbots", description: "Anthropic's AI assistant. Best for long documents, analysis, and safe conversations.", pricing: "Freemium", url: "https://claude.ai", tags: ["chatbot", "analysis", "writing"], featured: true, rating: 4.7 },
  { name: "Gemini", category: "AI Chatbots", description: "Google's AI assistant integrated with Google Workspace and search.", pricing: "Freemium", url: "https://gemini.google.com", tags: ["chatbot", "google", "multimodal"], featured: true, rating: 4.5 },

  // AI Writing Tools
  { name: "Jasper AI", category: "AI Writing Tools", description: "Enterprise-grade AI writing assistant for marketing and content teams.", pricing: "Paid", url: "https://jasper.ai", tags: ["writing", "marketing", "content"], featured: true, rating: 4.7 },
  { name: "Copy.ai", category: "AI Writing Tools", description: "AI copywriting tool for blogs, ads, emails, and social media content.", pricing: "Freemium", url: "https://copy.ai", tags: ["writing", "copywriting", "marketing"], featured: true, rating: 4.5 },
  { name: "Writesonic", category: "AI Writing Tools", description: "AI writer with SEO tools, article generation, and chatbot features.", pricing: "Freemium", url: "https://writesonic.com", tags: ["writing", "seo", "articles"], featured: false, rating: 4.4 },

  // Coding Assistants
  { name: "GitHub Copilot", category: "Coding Assistants", description: "AI pair programmer that suggests code in real time inside your editor.", pricing: "Paid", url: "https://github.com/features/copilot", tags: ["coding", "autocomplete", "github"], featured: true, rating: 4.8 },
  { name: "Cursor", category: "Coding Assistants", description: "AI-first code editor built on VS Code with powerful chat and edit features.", pricing: "Freemium", url: "https://cursor.sh", tags: ["coding", "editor", "chat"], featured: true, rating: 4.7 },
  { name: "Windsurf", category: "Coding Assistants", description: "Agentic AI code editor by Codeium with autonomous coding capabilities.", pricing: "Freemium", url: "https://codeium.com/windsurf", tags: ["coding", "agentic", "editor"], featured: false, rating: 4.5 },

  // Image Generation
  { name: "Midjourney", category: "Image Generation", description: "Best AI image generator for artistic and high quality visuals.", pricing: "Paid", url: "https://midjourney.com", tags: ["image", "art", "design"], featured: true, rating: 4.9 },
  { name: "DALL-E", category: "Image Generation", description: "OpenAI's image generator integrated with ChatGPT. Best for accurate prompt following.", pricing: "Freemium", url: "https://openai.com/dall-e-3", tags: ["image", "openai", "creative"], featured: true, rating: 4.6 },
  { name: "Adobe Firefly", category: "Image Generation", description: "Adobe's AI image generator built for commercial safe creative workflows.", pricing: "Freemium", url: "https://firefly.adobe.com", tags: ["image", "adobe", "commercial"], featured: false, rating: 4.5 },

  // Video Generation
  { name: "Runway", category: "Video Generation", description: "Professional AI video generation and editing platform used by creators.", pricing: "Freemium", url: "https://runwayml.com", tags: ["video", "editing", "generation"], featured: true, rating: 4.6 },
  { name: "Synthesia", category: "Video Generation", description: "Create AI avatar videos with text. Best for presentations and training.", pricing: "Paid", url: "https://synthesia.io", tags: ["video", "avatar", "presentation"], featured: true, rating: 4.5 },
  { name: "Pika", category: "Video Generation", description: "AI video generation tool for turning ideas and images into short videos.", pricing: "Freemium", url: "https://pika.art", tags: ["video", "generation", "creative"], featured: false, rating: 4.3 },

  // AI Research & Search
  { name: "Perplexity AI", category: "AI Research", description: "AI-powered search engine that gives cited answers from the web in real time.", pricing: "Freemium", url: "https://perplexity.ai", tags: ["research", "search", "citations"], featured: true, rating: 4.8 },
  { name: "Elicit", category: "AI Research", description: "AI research assistant that helps find, summarize, and analyze academic papers.", pricing: "Freemium", url: "https://elicit.com", tags: ["research", "academic", "papers"], featured: true, rating: 4.5 },
  { name: "Consensus", category: "AI Research", description: "AI search engine for scientific research with evidence-based answers.", pricing: "Freemium", url: "https://consensus.app", tags: ["research", "science", "evidence"], featured: false, rating: 4.4 },

  // Productivity Tools
  { name: "Notion AI", category: "Productivity Tools", description: "AI built into Notion for writing, summarizing, and managing knowledge.", pricing: "Freemium", url: "https://notion.so", tags: ["productivity", "notes", "writing"], featured: true, rating: 4.7 },
  { name: "ClickUp AI", category: "Productivity Tools", description: "AI assistant inside ClickUp for task management and project summaries.", pricing: "Freemium", url: "https://clickup.com", tags: ["productivity", "tasks", "projects"], featured: true, rating: 4.5 },
  { name: "Motion", category: "Productivity Tools", description: "AI calendar that automatically plans and reschedules your tasks and meetings.", pricing: "Paid", url: "https://usemotion.com", tags: ["productivity", "calendar", "scheduling"], featured: false, rating: 4.4 },

  // Presentation Tools
  { name: "Gamma", category: "Presentation Tools", description: "AI presentation maker that generates beautiful slides from a text prompt.", pricing: "Freemium", url: "https://gamma.app", tags: ["presentation", "slides", "design"], featured: true, rating: 4.7 },
  { name: "Beautiful.ai", category: "Presentation Tools", description: "Smart presentation software that auto-designs slides as you add content.", pricing: "Freemium", url: "https://beautiful.ai", tags: ["presentation", "design", "slides"], featured: true, rating: 4.5 },
  { name: "Tome", category: "Presentation Tools", description: "AI-powered storytelling and presentation tool for narratives and pitches.", pricing: "Freemium", url: "https://tome.app", tags: ["presentation", "storytelling", "pitch"], featured: false, rating: 4.3 },

  // Voice & Audio Tools
  { name: "ElevenLabs", category: "Voice & Audio Tools", description: "Best AI voice generator for realistic text-to-speech and voice cloning.", pricing: "Freemium", url: "https://elevenlabs.io", tags: ["voice", "tts", "cloning"], featured: true, rating: 4.9 },
  { name: "Murf AI", category: "Voice & Audio Tools", description: "AI voiceover studio for creating professional narrations and podcasts.", pricing: "Freemium", url: "https://murf.ai", tags: ["voice", "voiceover", "podcast"], featured: true, rating: 4.6 },
  { name: "Descript", category: "Voice & Audio Tools", description: "AI audio and video editor where you edit media by editing text.", pricing: "Freemium", url: "https://descript.com", tags: ["audio", "video", "editing"], featured: false, rating: 4.5 },

  // Automation Tools
  { name: "Zapier AI", category: "Automation Tools", description: "AI-powered automation platform connecting 6000+ apps with no code.", pricing: "Freemium", url: "https://zapier.com", tags: ["automation", "nocode", "integration"], featured: true, rating: 4.7 },
  { name: "Make", category: "Automation Tools", description: "Visual automation platform for building complex multi-step workflows.", pricing: "Freemium", url: "https://make.com", tags: ["automation", "visual", "workflows"], featured: true, rating: 4.6 },
  { name: "n8n", category: "Automation Tools", description: "Open source workflow automation tool with self-hosting option.", pricing: "Free", url: "https://n8n.io", tags: ["automation", "opensource", "selfhost"], featured: false, rating: 4.5 },
];

const llmModels = [
  {
    name: "GPT-4o",
    provider: "OpenAI",
    description: "OpenAI's flagship multimodal model. Handles text, image, and audio. Best all-rounder for most tasks.",
    contextWindow: "128K tokens",
    costPer1MInput: "$5.00",
    costPer1MOutput: "$15.00",
    scores: { mmlu: 88.7, humaneval: 90.2, math: 76.6, reasoning: 90 },
    bestFor: ["General tasks", "Coding", "Image analysis", "Customer support"],
    strengths: ["Best overall performance", "Multimodal", "Fast response", "Huge ecosystem"],
    weaknesses: ["Expensive at scale", "Can hallucinate on niche topics"],
    free: false,
  },
  {
    name: "Claude Sonnet 4",
    provider: "Anthropic",
    description: "Anthropic's most balanced model. Excellent for long documents, analysis, and safe outputs.",
    contextWindow: "200K tokens",
    costPer1MInput: "$3.00",
    costPer1MOutput: "$15.00",
    scores: { mmlu: 88.0, humaneval: 92.0, math: 78.0, reasoning: 92 },
    bestFor: ["Document analysis", "Long context tasks", "Coding", "Research"],
    strengths: ["Longest context window", "Very safe outputs", "Excellent at following instructions", "Strong coding"],
    weaknesses: ["Slower than GPT-4o", "No image generation"],
    free: false,
  },
  {
    name: "Gemini 2.5 Pro",
    provider: "Google",
    description: "Google's most capable model with deep integration with Google services and Search.",
    contextWindow: "1M tokens",
    costPer1MInput: "$3.50",
    costPer1MOutput: "$10.50",
    scores: { mmlu: 90.0, humaneval: 87.0, math: 91.0, reasoning: 91 },
    bestFor: ["Math & science", "Google Workspace", "Long documents", "Multimodal"],
    strengths: ["Largest context window", "Best at math", "Google integration", "Multimodal"],
    weaknesses: ["Inconsistent on creative tasks", "Privacy concerns for some users"],
    free: false,
  },
  {
    name: "DeepSeek R1",
    provider: "DeepSeek",
    description: "Chinese open source reasoning model. Matches GPT-4 level performance at near zero cost.",
    contextWindow: "128K tokens",
    costPer1MInput: "$0.55",
    costPer1MOutput: "$2.19",
    scores: { mmlu: 86.5, humaneval: 86.0, math: 90.0, reasoning: 94 },
    bestFor: ["Reasoning", "Math", "Coding", "Budget-conscious users"],
    strengths: ["Best reasoning scores", "Extremely cheap", "Open source", "Strong math"],
    weaknesses: ["Data privacy concerns", "Slower inference", "Less English optimization"],
    free: true,
  },
  {
    name: "Llama 3.3 70B",
    provider: "Meta",
    description: "Meta's open source large language model. Can be run locally or via API for free.",
    contextWindow: "128K tokens",
    costPer1MInput: "$0.00",
    costPer1MOutput: "$0.00",
    scores: { mmlu: 83.0, humaneval: 80.0, math: 77.0, reasoning: 81 },
    bestFor: ["Self-hosting", "Privacy-sensitive tasks", "Research", "Custom fine-tuning"],
    strengths: ["Completely free", "Open source", "Can run locally", "No data sharing"],
    weaknesses: ["Needs powerful hardware locally", "Below GPT-4 level", "Less instruction tuned"],
    free: true,
  },
  {
    name: "Grok 3",
    provider: "xAI",
    description: "Elon Musk's xAI model with real-time X (Twitter) data access and strong reasoning.",
    contextWindow: "131K tokens",
    costPer1MInput: "$3.00",
    costPer1MOutput: "$15.00",
    scores: { mmlu: 87.5, humaneval: 88.0, math: 83.0, reasoning: 89 },
    bestFor: ["Real-time information", "Coding", "Reasoning", "Social media analysis"],
    strengths: ["Real-time X data", "Strong reasoning", "Good coding", "Less restrictive"],
    weaknesses: ["Requires X Premium", "Smaller ecosystem", "Less tested than GPT-4"],
    free: false,
  },
];

const workflows = [
  {
    title: "Launch a YouTube Channel",
    goal: "Content Creation",
    category: "Content Creation",
    difficulty: "Beginner",
    description: "Complete workflow to research, script, record, edit, and publish YouTube videos using AI tools at every step.",
    tags: ["youtube", "content", "video"],
    steps: [
      { stepNumber: 1, title: "Find Your Niche & Topics", description: "Use Perplexity AI to research trending topics in your niche. Ask it what questions people are searching for.", toolName: "Perplexity AI", toolUrl: "https://perplexity.ai", promptTemplate: "What are the top 10 trending questions people ask about [your niche] in 2026? Show search volume and interest level." },
      { stepNumber: 2, title: "Write Your Script", description: "Use Claude to write a full engaging YouTube script with hook, body, and CTA.", toolName: "Claude", toolUrl: "https://claude.ai", promptTemplate: "Write a 8-minute YouTube script about [topic]. Start with a strong hook, include 3 main points with examples, and end with a call to action. Make it conversational." },
      { stepNumber: 3, title: "Create Thumbnail", description: "Use Midjourney to generate eye-catching thumbnail concepts.", toolName: "Midjourney", toolUrl: "https://midjourney.com", promptTemplate: "YouTube thumbnail, bold text overlay space, [topic] visual concept, high contrast, professional, eye-catching --ar 16:9" },
      { stepNumber: 4, title: "Generate Voiceover", description: "Use ElevenLabs to create a professional voiceover from your script.", toolName: "ElevenLabs", toolUrl: "https://elevenlabs.io", promptTemplate: "Paste your script into ElevenLabs. Choose a voice that matches your channel tone. Use the Turbo model for faster generation." },
      { stepNumber: 5, title: "Edit Video", description: "Use Runway to edit footage, add effects, and polish the final video.", toolName: "Runway", toolUrl: "https://runwayml.com", promptTemplate: "Upload your raw footage. Use Gen-2 for AI background removal and enhance your B-roll with AI effects." },
    ],
  },
  {
    title: "Build a SaaS Landing Page",
    goal: "Web Development",
    category: "Development",
    difficulty: "Intermediate",
    description: "Plan, design, write copy, and build a high-converting SaaS landing page using AI tools.",
    tags: ["saas", "landing page", "web"],
    steps: [
      { stepNumber: 1, title: "Research Competitors", description: "Use Perplexity AI to analyze top competitors in your SaaS niche.", toolName: "Perplexity AI", toolUrl: "https://perplexity.ai", promptTemplate: "Analyze the top 5 SaaS tools in [niche]. What are their landing page headlines, value propositions, and pricing structures?" },
      { stepNumber: 2, title: "Write Landing Page Copy", description: "Use Claude to write headline, subheadline, features, and CTA copy.", toolName: "Claude", toolUrl: "https://claude.ai", promptTemplate: "Write a complete SaaS landing page copy for [product name] that does [what it does] for [target audience]. Include: hero headline, subheadline, 3 feature sections, social proof section, pricing section, and CTA." },
      { stepNumber: 3, title: "Generate Hero Image", description: "Use Midjourney to create a professional hero image or product mockup.", toolName: "Midjourney", toolUrl: "https://midjourney.com", promptTemplate: "SaaS product dashboard mockup, clean minimal UI, [your color scheme], professional, isometric view, white background --ar 16:9" },
      { stepNumber: 4, title: "Build the Page", description: "Use GitHub Copilot or Cursor to build the landing page in React or HTML.", toolName: "Cursor", toolUrl: "https://cursor.sh", promptTemplate: "Build a responsive React landing page with these sections: Hero, Features, How It Works, Testimonials, Pricing, CTA. Use Tailwind CSS. Here is my copy: [paste copy]" },
      { stepNumber: 5, title: "Create Pitch Deck", description: "Use Gamma to create a pitch deck version of your landing page.", toolName: "Gamma", toolUrl: "https://gamma.app", promptTemplate: "Create a 10-slide pitch deck for [product]. Slides: Problem, Solution, Product Demo, Market Size, Business Model, Traction, Team, Roadmap, Competition, Ask." },
    ],
  },
  {
    title: "Automate Freelance Workflow",
    goal: "Freelancing",
    category: "Automation",
    difficulty: "Intermediate",
    description: "Automate your freelance invoicing, client communication, project tracking, and reporting with AI tools.",
    tags: ["freelance", "automation", "productivity"],
    steps: [
      { stepNumber: 1, title: "Set Up Project Tracking", description: "Use Notion AI to create a client and project management system.", toolName: "Notion AI", toolUrl: "https://notion.so", promptTemplate: "Create a Notion database template for freelance project tracking with fields: Client Name, Project, Deadline, Status, Invoice Amount, Payment Status, Notes." },
      { stepNumber: 2, title: "Automate Client Emails", description: "Use Zapier AI to auto-send onboarding emails when a new project is added.", toolName: "Zapier AI", toolUrl: "https://zapier.com", promptTemplate: "Create a Zap: When new row added to Notion database → Send Gmail email to client with onboarding template → Add task to ClickUp for project kickoff." },
      { stepNumber: 3, title: "Write Proposals Fast", description: "Use Claude to generate client proposals from a brief.", toolName: "Claude", toolUrl: "https://claude.ai", promptTemplate: "Write a professional freelance proposal for [client name] for [project type]. Budget: [amount]. Timeline: [weeks]. Include: executive summary, scope of work, deliverables, timeline, pricing, and terms." },
      { stepNumber: 4, title: "Create Invoice", description: "Use ChatGPT to generate invoice content and format.", toolName: "ChatGPT", toolUrl: "https://chat.openai.com", promptTemplate: "Generate a professional invoice for freelance services. Client: [name]. Services: [list]. Amount: [total]. Payment terms: Net 15. Format it cleanly." },
      { stepNumber: 5, title: "Automate Reporting", description: "Use Make to auto-generate weekly project status reports.", toolName: "Make", toolUrl: "https://make.com", promptTemplate: "Build a Make scenario: Every Monday at 9am → Pull data from Notion → Generate summary with ChatGPT → Send report email to client." },
    ],
  },
  {
    title: "Create an Online Course",
    goal: "Education",
    category: "Content Creation",
    difficulty: "Intermediate",
    description: "Plan, outline, record, and publish a full online course using AI at every production step.",
    tags: ["course", "education", "content"],
    steps: [
      { stepNumber: 1, title: "Validate Course Idea", description: "Use Perplexity AI to check demand and competition for your course topic.", toolName: "Perplexity AI", toolUrl: "https://perplexity.ai", promptTemplate: "Is there demand for an online course about [topic]? What are people willing to pay? Who are the top competitors? What gaps exist in current courses?" },
      { stepNumber: 2, title: "Create Course Outline", description: "Use Claude to build a complete module-by-module course curriculum.", toolName: "Claude", toolUrl: "https://claude.ai", promptTemplate: "Create a complete online course outline for [topic] targeted at [audience level]. Include 6 modules, each with 4 lessons, learning objectives, and key takeaways per lesson." },
      { stepNumber: 3, title: "Write Lesson Scripts", description: "Use Jasper AI to write engaging lesson scripts for each module.", toolName: "Jasper AI", toolUrl: "https://jasper.ai", promptTemplate: "Write a 5-minute lesson script for Module [X], Lesson [Y] about [topic]. Make it engaging, educational, and include a practical example." },
      { stepNumber: 4, title: "Record with AI Avatar", description: "Use Synthesia to create video lessons with an AI avatar presenter.", toolName: "Synthesia", toolUrl: "https://synthesia.io", promptTemplate: "Create a Synthesia video using your lesson script. Choose a professional avatar. Set background to a clean office or branded template." },
      { stepNumber: 5, title: "Create Slide Decks", description: "Use Gamma to auto-generate slides for each lesson from the script.", toolName: "Gamma", toolUrl: "https://gamma.app", promptTemplate: "Create lesson slides for [topic]. Include: title slide, agenda, 5 content slides with key points, summary slide, and quiz question slide." },
    ],
  },
  {
    title: "Launch a Personal Brand",
    goal: "Personal Branding",
    category: "Marketing",
    difficulty: "Beginner",
    description: "Build your personal brand online with AI-generated content, visuals, and social media strategy.",
    tags: ["personal brand", "social media", "marketing"],
    steps: [
      { stepNumber: 1, title: "Define Your Brand Identity", description: "Use Claude to craft your personal brand statement, niche, and positioning.", toolName: "Claude", toolUrl: "https://claude.ai", promptTemplate: "Help me define my personal brand. My background: [your background]. My skills: [skills]. Target audience: [audience]. Create a brand statement, niche definition, content pillars, and tone of voice guide." },
      { stepNumber: 2, title: "Create Brand Visuals", description: "Use Midjourney to create a personal brand logo and profile visuals.", toolName: "Midjourney", toolUrl: "https://midjourney.com", promptTemplate: "Professional personal brand logo for [your name], [your niche], minimal modern design, [color preference], clean typography --ar 1:1" },
      { stepNumber: 3, title: "Write LinkedIn Bio", description: "Use Jasper AI to write a compelling LinkedIn profile and bio.", toolName: "Jasper AI", toolUrl: "https://jasper.ai", promptTemplate: "Write a powerful LinkedIn About section for [name] who is a [role] specializing in [niche]. Include hook, story, achievements, and CTA. Keep it under 300 words." },
      { stepNumber: 4, title: "Plan Content Calendar", description: "Use Notion AI to create a 30-day content calendar.", toolName: "Notion AI", toolUrl: "https://notion.so", promptTemplate: "Create a 30-day LinkedIn content calendar for [niche]. Include post type, topic, hook line, and format for each day. Mix: tips, stories, opinions, case studies." },
      { stepNumber: 5, title: "Automate Posting", description: "Use Zapier AI to automate scheduling and cross-posting content.", toolName: "Zapier AI", toolUrl: "https://zapier.com", promptTemplate: "Create a Zap: When new content row marked Ready in Notion → Auto-schedule to Buffer → Post to LinkedIn and Twitter simultaneously." },
    ],
  },
];

const stacks = [
  {
    title: "Solo Developer Stack",
    role: "Developer",
    description: "The complete AI toolkit for a solo developer building products faster with less effort.",
    difficulty: "Intermediate",
    tags: ["developer", "coding", "productivity"],
    tools: [
      { toolName: "Cursor", toolUrl: "https://cursor.sh", purpose: "Primary AI code editor for writing and debugging code", category: "Coding Assistants" },
      { toolName: "GitHub Copilot", toolUrl: "https://github.com/features/copilot", purpose: "In-editor autocomplete and code suggestions", category: "Coding Assistants" },
      { toolName: "ChatGPT", toolUrl: "https://chat.openai.com", purpose: "Architecture planning, debugging help, and documentation writing", category: "AI Chatbots" },
      { toolName: "Perplexity AI", toolUrl: "https://perplexity.ai", purpose: "Quick research on libraries, APIs, and technical concepts", category: "AI Research" },
      { toolName: "Notion AI", toolUrl: "https://notion.so", purpose: "Project planning, task tracking, and technical documentation", category: "Productivity Tools" },
    ],
  },
  {
    title: "Content Creator Stack",
    role: "Content Creator",
    description: "Everything a YouTube or social media creator needs to produce high quality content with AI.",
    difficulty: "Beginner",
    tags: ["content", "youtube", "social media"],
    tools: [
      { toolName: "Claude", toolUrl: "https://claude.ai", purpose: "Script writing, video descriptions, and content ideation", category: "AI Chatbots" },
      { toolName: "ElevenLabs", toolUrl: "https://elevenlabs.io", purpose: "AI voiceover for videos and podcasts", category: "Voice & Audio Tools" },
      { toolName: "Midjourney", toolUrl: "https://midjourney.com", purpose: "Thumbnail creation and visual content generation", category: "Image Generation" },
      { toolName: "Runway", toolUrl: "https://runwayml.com", purpose: "Video editing and AI video effects", category: "Video Generation" },
      { toolName: "Notion AI", toolUrl: "https://notion.so", purpose: "Content calendar and idea management", category: "Productivity Tools" },
    ],
  },
  {
    title: "Freelance Designer Stack",
    role: "Designer",
    description: "AI tools that make a freelance designer faster, more creative, and more productive.",
    difficulty: "Beginner",
    tags: ["design", "freelance", "creative"],
    tools: [
      { toolName: "Midjourney", toolUrl: "https://midjourney.com", purpose: "Concept generation, moodboards, and visual ideation", category: "Image Generation" },
      { toolName: "Adobe Firefly", toolUrl: "https://firefly.adobe.com", purpose: "Commercial-safe image editing inside Adobe tools", category: "Image Generation" },
      { toolName: "Claude", toolUrl: "https://claude.ai", purpose: "Client proposal writing and creative brief analysis", category: "AI Chatbots" },
      { toolName: "Gamma", toolUrl: "https://gamma.app", purpose: "Client presentations and portfolio decks", category: "Presentation Tools" },
      { toolName: "Zapier AI", toolUrl: "https://zapier.com", purpose: "Automate client onboarding and invoice workflows", category: "Automation Tools" },
    ],
  },
  {
    title: "Student & Researcher Stack",
    role: "Student",
    description: "AI tools to help students research faster, write better, and learn more effectively.",
    difficulty: "Beginner",
    tags: ["student", "research", "academic"],
    tools: [
      { toolName: "Perplexity AI", toolUrl: "https://perplexity.ai", purpose: "Research with cited sources for essays and projects", category: "AI Research" },
      { toolName: "Elicit", toolUrl: "https://elicit.com", purpose: "Finding and summarizing academic papers", category: "AI Research" },
      { toolName: "Claude", toolUrl: "https://claude.ai", purpose: "Essay writing, summarizing long papers, and study help", category: "AI Chatbots" },
      { toolName: "Notion AI", toolUrl: "https://notion.so", purpose: "Notes organization and study planning", category: "Productivity Tools" },
      { toolName: "Gamma", toolUrl: "https://gamma.app", purpose: "Creating presentation slides for assignments", category: "Presentation Tools" },
    ],
  },
  {
    title: "Marketing Professional Stack",
    role: "Marketer",
    description: "AI tools for marketers to create campaigns, write copy, and analyze performance faster.",
    difficulty: "Intermediate",
    tags: ["marketing", "content", "campaigns"],
    tools: [
      { toolName: "Jasper AI", toolUrl: "https://jasper.ai", purpose: "Ad copy, blog posts, and campaign content writing", category: "AI Writing Tools" },
      { toolName: "Midjourney", toolUrl: "https://midjourney.com", purpose: "Campaign visuals, social media graphics, and ad creatives", category: "Image Generation" },
      { toolName: "Perplexity AI", toolUrl: "https://perplexity.ai", purpose: "Market research and competitor analysis", category: "AI Research" },
      { toolName: "Zapier AI", toolUrl: "https://zapier.com", purpose: "Automating lead nurturing and email sequences", category: "Automation Tools" },
      { toolName: "Gamma", toolUrl: "https://gamma.app", purpose: "Campaign pitch decks and client presentations", category: "Presentation Tools" },
    ],
  },
];

const prompts = [
  // ChatGPT Prompts
  { title: "Debug My Code", toolName: "ChatGPT", category: "Coding", useCase: "Fix broken code", promptText: "Here is my [language] code that is giving this error: [error message]. Code: [paste code]. Please identify the bug, explain why it's happening, and give me the fixed version.", expectedOutput: "Explanation of the bug and corrected code with comments", tags: ["coding", "debugging"], difficulty: "Beginner" },
  { title: "Write Cold Email", toolName: "ChatGPT", category: "Writing", useCase: "Outreach email", promptText: "Write a cold email to [job title] at [company type] offering my [service/skill]. Keep it under 100 words, focus on one specific pain point they have, and end with a soft CTA asking for a 15-minute call.", expectedOutput: "Short personalized cold email under 100 words", tags: ["email", "outreach", "sales"], difficulty: "Beginner" },
  { title: "Explain Like I'm 5", toolName: "ChatGPT", category: "Learning", useCase: "Simplify complex topics", promptText: "Explain [complex topic] like I am 5 years old. Use a simple analogy from everyday life. Then explain it again for a professional audience in 3 sentences.", expectedOutput: "Two explanations: one simple, one professional", tags: ["learning", "explanation"], difficulty: "Beginner" },

  // Claude Prompts
  { title: "Analyze Long Document", toolName: "Claude", category: "Research", useCase: "Document analysis", promptText: "I am going to paste a long document. Please: 1) Summarize the key points in bullet form, 2) Identify the 3 most important insights, 3) List any action items mentioned, 4) Flag anything that seems contradictory or unclear. Document: [paste document]", expectedOutput: "Structured summary with bullets, insights, action items, and flags", tags: ["analysis", "documents", "research"], difficulty: "Intermediate" },
  { title: "Write Professional Proposal", toolName: "Claude", category: "Writing", useCase: "Client proposals", promptText: "Write a professional freelance proposal for the following project: Client: [name], Project: [description], Budget: [amount], Timeline: [weeks]. Include: executive summary, understanding of requirements, proposed solution, deliverables list, timeline breakdown, pricing, and payment terms.", expectedOutput: "Full professional proposal document ready to send", tags: ["proposal", "freelance", "writing"], difficulty: "Intermediate" },
  { title: "Review My Resume", toolName: "Claude", category: "Career", useCase: "Resume improvement", promptText: "Review my resume for a [job title] position at a [company type]. Here is my resume: [paste resume]. Tell me: 1) What is weak or missing, 2) Which bullets need stronger action verbs, 3) What keywords are missing for ATS, 4) Rewrite the top 3 weakest bullet points.", expectedOutput: "Detailed resume critique with rewritten bullet points", tags: ["resume", "career", "job"], difficulty: "Beginner" },

  // Midjourney Prompts
  { title: "YouTube Thumbnail", toolName: "Midjourney", category: "Design", useCase: "Thumbnail creation", promptText: "[Subject/topic] YouTube thumbnail, bold expressive face reaction, large text space on left, high contrast colors, professional photography style, dramatic lighting --ar 16:9 --v 6", expectedOutput: "High contrast eye-catching YouTube thumbnail", tags: ["thumbnail", "youtube", "design"], difficulty: "Beginner" },
  { title: "Product Mockup", toolName: "Midjourney", category: "Design", useCase: "Product visualization", promptText: "[Product type] product mockup, minimal clean design, studio lighting, white background, professional commercial photography, [color scheme] brand colors --ar 4:3 --v 6", expectedOutput: "Professional product mockup for marketing use", tags: ["product", "mockup", "commercial"], difficulty: "Beginner" },

  // Perplexity Prompts
  { title: "Competitor Research", toolName: "Perplexity AI", category: "Research", useCase: "Business research", promptText: "Give me a detailed competitor analysis for [your product/service] in [market/niche]. For each competitor include: pricing model, key features, target audience, main strengths, main weaknesses, and recent updates or news. Focus on the top 5 competitors.", expectedOutput: "Structured competitor analysis table with cited sources", tags: ["research", "competitors", "business"], difficulty: "Intermediate" },
  { title: "Trending Topics Finder", toolName: "Perplexity AI", category: "Research", useCase: "Content research", promptText: "What are the top 10 trending questions and topics people are searching for about [niche] in 2026? Include search intent for each topic and suggest a content angle I can use to create original content.", expectedOutput: "List of trending topics with search intent and content angles", tags: ["research", "content", "trends"], difficulty: "Beginner" },

  // ElevenLabs Prompts
  { title: "Voiceover Script Format", toolName: "ElevenLabs", category: "Audio", useCase: "Voiceover creation", promptText: "Before pasting into ElevenLabs remove all markdown formatting. Add pause markers where you want natural breaks. Write numbers as words. Spell out abbreviations. Keep sentences short. Use Multilingual V2 or Turbo model.", expectedOutput: "Clean voiceover audio file ready for video editing", tags: ["voiceover", "audio", "video"], difficulty: "Beginner" },
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