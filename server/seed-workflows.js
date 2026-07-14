import dotenv from "dotenv";
import mongoose from "mongoose";
import Workflow from "./models/Workflow.js";

// Configure dotenv
dotenv.config({ path: "C:/Users/Tanmoy/ai-nexus-pro/.env" });

const newWorkflows = [
  // 1. Software Development - Beginner
  {
    title: "Build a Simple Personal Website with AI",
    goal: "Create, deploy, and style a modern personal portfolio website from scratch using AI web builders.",
    category: "Software Development",
    difficulty: "Beginner",
    description: "A step-by-step beginner's guide to designing layout pages, generating clean code blocks, and deploying a personal portfolio website online.",
    steps: [
      {
        stepNumber: 1,
        title: "Ideate Page Layout & Sections",
        description: "Generate layout ideas and structure your personal website pages.",
        toolName: "ChatGPT",
        toolUrl: "https://chatgpt.com",
        promptTemplate: "Role:\nUI/UX Brainstorming Assistant.\n\nObjective:\nOutline the key sections for a personal portfolio website.\n\nRequired sections:\n- Hero header\n- Project show grid\n- About Me text\n- Contact Form\n\nOutput:\nStructured list of components and content focus."
      },
      {
        stepNumber: 2,
        title: "Generate Tailwind HTML Code",
        description: "Generate clean, modern HTML and Tailwind CSS code blocks for the landing page.",
        toolName: "Cursor",
        toolUrl: "https://www.cursor.com",
        promptTemplate: "Role:\nJunior Frontend Developer.\n\nTask:\nWrite a complete single-file index.html portfolio layout using Tailwind CSS CDN. Include clean, modern design styling, a responsive header, project cards, and a footer.\n\nOutput:\nRaw HTML and CSS code block."
      },
      {
        stepNumber: 3,
        title: "Verify Code Compatibility",
        description: "Double-check code formatting and fix any syntax errors.",
        toolName: "Claude",
        toolUrl: "https://claude.ai",
        promptTemplate: "Role:\nLinter and Debugging Guide.\n\nTask:\nReview this index.html code. Check for missing closing tags, incorrect CSS class references, and verify mobile responsiveness layout settings.\n\nOutput:\nCorrected code blocks with inline comments."
      },
      {
        stepNumber: 4,
        title: "Deploy Live Site",
        description: "Publish your HTML file online for free using Vercel or Netlify.",
        toolName: "Vercel",
        toolUrl: "https://vercel.com",
        promptTemplate: "Role:\nDeployment Helper.\n\nTask:\nProvide a step-by-step list of instructions to upload this index.html to GitHub and link it to Vercel for instant static hosting.\n\nOutput:\nWritten deployment workflow instructions."
      }
    ],
    tags: ["portfolio", "frontend", "html", "tailwind", "hosting"],
    metadata: {
      projectTypes: ["Web App", "Portfolio"],
      domains: ["Technology", "Education"],
      complexity: ["Simple"],
      budget: ["Free"],
      teamSize: ["Solo"],
      deployment: ["Cloud", "Serverless"],
      securityLevel: ["Standard"]
    }
  },
  // 2. Marketing - Beginner
  {
    title: "Write Your First Email Newsletter with AI",
    goal: "Draft, proofread, segment, and design a high-converting email newsletter using AI copywriting tools.",
    category: "Marketing",
    difficulty: "Beginner",
    description: "A straightforward guide for beginners to write professional email campaigns, optimize subject lines, and structure email marketing templates.",
    steps: [
      {
        stepNumber: 1,
        title: "Draft Newsletter Body",
        description: "Write a warm, conversational newsletter talking about recent product updates.",
        toolName: "Jasper AI",
        toolUrl: "https://www.jasper.ai",
        promptTemplate: "Role:\nCreative Copywriter.\n\nTask:\nDraft a 150-word email newsletter announcing a new product launch. Emphasize user benefits and write in an exciting, friendly tone.\n\nOutput:\nSubject line ideas and body copy."
      },
      {
        stepNumber: 2,
        title: "Optimize Subject Lines",
        description: "Generate subject lines targeting higher open-rates.",
        toolName: "Copy.ai",
        toolUrl: "https://www.copy.ai",
        promptTemplate: "Role:\nEmail Marketing Specialist.\n\nTask:\nAnalyze the drafted newsletter and generate 5 subject lines with variations (curiosity-driven, benefit-focused, direct, sense of urgency).\n\nOutput:\nList of 5 prioritized subject lines."
      },
      {
        stepNumber: 3,
        title: "Grammar Check & Tone Correction",
        description: "Polishing the copy for professional reading and spelling fixes.",
        toolName: "Grammarly",
        toolUrl: "https://www.grammarly.com",
        promptTemplate: "Role:\nEditor.\n\nTask:\nReview this draft for grammar, active voice verb usage, readability levels, and clear formatting.\n\nOutput:\nCorrected text ready for copying."
      },
      {
        stepNumber: 4,
        title: "Configure Email Template",
        description: "Upload your optimized copy and design the email graphics.",
        toolName: "Canva AI",
        toolUrl: "https://www.canva.com",
        promptTemplate: "Role:\nEmail Layout Assistant.\n\nTask:\nSuggest a layout style, sizing, header banner designs, and CTA button colors matching the email topic.\n\nOutput:\nLayout layout suggestions and dimensions."
      }
    ],
    tags: ["newsletter", "email-marketing", "copywriting", "campaign"],
    metadata: {
      projectTypes: ["Marketing Campaign"],
      domains: ["Marketing", "Business"],
      complexity: ["Simple"],
      budget: ["Free", "Low"],
      teamSize: ["Solo"],
      deployment: ["Any"],
      securityLevel: ["Standard"]
    }
  },
  // 3. Content Creation - Beginner
  {
    title: "Start a Blog with AI Assistance",
    goal: "Brainstorm keywords, write draft articles, create blog graphics, and plan monthly schedules.",
    category: "Content Creation",
    difficulty: "Beginner",
    description: "Learn how to use AI tools to quickly write blog posts, generate beautiful cover images, and publish contents consistently.",
    steps: [
      {
        stepNumber: 1,
        title: "Brainstorm Topics & Keyword Research",
        description: "Find popular topics within your niche and identify high-value search keywords.",
        toolName: "Perplexity AI",
        toolUrl: "https://www.perplexity.ai",
        promptTemplate: "Role:\nSEO Researcher.\n\nTask:\nFind the top 5 questions people ask about travel budgeting. Provide monthly search estimates and search intent details for each question.\n\nOutput:\nTable showing topics, keywords, and intents."
      },
      {
        stepNumber: 2,
        title: "Generate Detailed Outline",
        description: "Draft an H2/H3 outline containing main points for a blog post.",
        toolName: "ChatGPT",
        toolUrl: "https://chatgpt.com",
        promptTemplate: "Role:\nContent Editor.\n\nTask:\nCreate a detailed blog post outline for the topic: 'Top 5 Budget Travel Tips'. Plan the introduction, body sections, and conclusion.\n\nOutput:\nOutlined structure with section descriptions."
      },
      {
        stepNumber: 3,
        title: "Draft Blog Content",
        description: "Write a high-quality blog post draft based on the outline.",
        toolName: "Claude",
        toolUrl: "https://claude.ai",
        promptTemplate: "Role:\nProfessional Blogger.\n\nTask:\nWrite a 800-word blog post based on the travel outline. Use short paragraphs, list formatting, and a warm, engaging tone.\n\nOutput:\nComplete blog post in markdown format."
      },
      {
        stepNumber: 4,
        title: "Create Cover Graphics",
        description: "Generate modern, visual blog graphics to act as header banners.",
        toolName: "Stable Diffusion",
        toolUrl: "https://stability.ai",
        promptTemplate: "Role:\nMidjourney Prompt Generator.\n\nTask:\nGenerate a high-quality, minimalistic, warm illustration of a backpack, passport, and map sitting on a wooden desk. Vector style, clean background.\n\nOutput:\nImage prompt or generated illustration."
      }
    ],
    tags: ["blogging", "content", "copywriting", "seo-optimization"],
    metadata: {
      projectTypes: ["Blogging", "Content Platform"],
      domains: ["Marketing", "Entertainment"],
      complexity: ["Simple"],
      budget: ["Free", "Low"],
      teamSize: ["Solo"],
      deployment: ["Any"],
      securityLevel: ["Standard"]
    }
  },
  // 4. Research - Beginner
  {
    title: "Research a Topic Quickly with AI Tools",
    goal: "Search reliable web resources, download statistics, summarize papers, and compile brief reports.",
    category: "Research",
    difficulty: "Beginner",
    description: "A fast, beginner-friendly process for conducting market research, reading academic reviews, and compiling reports using AI search assistants.",
    steps: [
      {
        stepNumber: 1,
        title: "Gather Initial Topic Web Citations",
        description: "Run research searches online to find cited claims and basic overview facts.",
        toolName: "Perplexity AI",
        toolUrl: "https://www.perplexity.ai",
        promptTemplate: "Role:\nResearch Assistant.\n\nTask:\nProvide a comprehensive summary of renewable energy trends in 2026. Cite sources and provide raw statistics.\n\nOutput:\nCitations list and summary."
      },
      {
        stepNumber: 2,
        title: "Search Academic Literatures",
        description: "Discover peer-reviewed papers matching your topic details.",
        toolName: "Semantic Scholar",
        toolUrl: "https://www.semanticscholar.org",
        promptTemplate: "Role:\nAcademic Database Searcher.\n\nTask:\nFind the top 3 cited articles discussing solar cell efficiency improvements from the past 3 years.\n\nOutput:\nList of titles, author metadata, and links."
      },
      {
        stepNumber: 3,
        title: "Summarize Research Findings",
        description: "Convert long academic text or source files into clean summaries.",
        toolName: "ChatGPT",
        toolUrl: "https://chatgpt.com",
        promptTemplate: "Role:\nScientific Writer.\n\nTask:\nSummarize this research abstract. Highlight the methodology, core sample sizes, findings, and major research limitations.\n\nOutput:\nBullet points summary."
      },
      {
        stepNumber: 4,
        title: "Compile Final Research Report",
        description: "Write a unified, professional research brief ready for sharing.",
        toolName: "Notion AI",
        toolUrl: "https://www.notion.so/product/ai",
        promptTemplate: "Role:\nReport Editor.\n\nTask:\nOrganize these summaries, statistics, and references into a formal research memo with headings, lists, and reference tables.\n\nOutput:\nFormally structured markdown memo."
      }
    ],
    tags: ["research", "education", "citations", "report-writing"],
    metadata: {
      projectTypes: ["Research Briefs"],
      domains: ["Research", "Education"],
      complexity: ["Simple"],
      budget: ["Free"],
      teamSize: ["Solo"],
      deployment: ["Any"],
      securityLevel: ["Standard"]
    }
  },
  // 5. Human Resources - Beginner
  {
    title: "Write a Job Description with AI",
    goal: "Define candidate requirements, detail daily tasks, choose candidate criteria, and generate JD copies.",
    category: "Human Resources",
    difficulty: "Beginner",
    description: "A step-by-step workflow for HR recruiters to write professional, inclusive job descriptions using AI copy assistants.",
    steps: [
      {
        stepNumber: 1,
        title: "Brainstorm Role Responsibilities",
        description: "Determine what skills and tasks this new role will handle in daily operations.",
        toolName: "ChatGPT",
        toolUrl: "https://chatgpt.com",
        promptTemplate: "Role:\nHR Strategist.\n\nTask:\nWhat are the top 6 daily responsibilities of a Junior Product Manager in a software startup? Focus on agile processes.\n\nOutput:\nList of typical duties."
      },
      {
        stepNumber: 2,
        title: "Draft Job Description Template",
        description: "Create the primary outline of the JD text including requirements.",
        toolName: "Claude",
        toolUrl: "https://claude.ai",
        promptTemplate: "Role:\nCorporate Recruiter.\n\nTask:\nWrite a complete job description for a Junior Product Manager based on the responsibilities. Include sections: About Us, Role Overview, Key Responsibilities, Requirements, and Benefits.\n\nOutput:\nStructured job description draft."
      },
      {
        stepNumber: 3,
        title: "Review for Inclusive Language & Tone",
        description: "Audit JD language to remove potential biases and optimize tone for inclusivity.",
        toolName: "ChatGPT",
        toolUrl: "https://chatgpt.com",
        promptTemplate: "Role:\nDEI Consultant.\n\nTask:\nReview this job description draft. Highlight gender-biased words, replace jargon with accessible terms, and suggest formatting changes to attract a diverse talent pool.\n\nOutput:\nAudit comments and updated JD copy."
      },
      {
        stepNumber: 4,
        title: "Generate Outreach Post Copy",
        description: "Write short, engaging LinkedIn posts to advertise the role opening.",
        toolName: "Copy.ai",
        toolUrl: "https://www.copy.ai",
        promptTemplate: "Role:\nEmployer Branding Specialist.\n\nTask:\nWrite a short, engaging LinkedIn update post advertising this Junior Product Manager opening. Include relevant hashtags and a clear call-to-action to apply.\n\nOutput:\nSocial copy variations."
      }
    ],
    tags: ["recruiting", "job-description", "hiring", "talent-acquisition"],
    metadata: {
      projectTypes: ["Hiring Campaigns"],
      domains: ["Human Resources", "Business"],
      complexity: ["Simple"],
      budget: ["Free", "Low"],
      teamSize: ["Solo", "Small"],
      deployment: ["Any"],
      securityLevel: ["Standard"]
    }
  },
  // 6. Data Analytics - Beginner
  {
    title: "Analyze a Simple Spreadsheet with AI",
    goal: "Upload table files, run formulas, compile key trends, and generate visual chart code.",
    category: "Data Analytics",
    difficulty: "Beginner",
    description: "Learn how to use AI chat interpreters to perform basic data cleaning, run calculations, and discover key trends in spreadsheets.",
    steps: [
      {
        stepNumber: 1,
        title: "Define Clean Data Schemas",
        description: "Structure your table data correctly before performing calculations.",
        toolName: "ChatGPT",
        toolUrl: "https://chatgpt.com",
        promptTemplate: "Role:\nData Architect.\n\nTask:\nI have a raw list of sales records containing date, items, amount, and customer. Suggest how to organize this table in CSV layout to avoid errors.\n\nOutput:\nStructured column outline."
      },
      {
        stepNumber: 2,
        title: "Generate Analytical Formulas",
        description: "Get help writing complex Excel/Google Sheets formulas to process columns.",
        toolName: "ChatGPT",
        toolUrl: "https://chatgpt.com",
        promptTemplate: "Role:\nExcel Expert.\n\nTask:\nWrite a Google Sheets formula that calculates the monthly sales total only for rows where the status is 'Completed'. Explain how to apply it.\n\nOutput:\nGoogle Sheets formula with explanation."
      },
      {
        stepNumber: 3,
        title: "Identify Key Trends & Insights",
        description: "Parse the dataset to discover hidden highlights or peak sales days.",
        toolName: "Claude",
        toolUrl: "https://claude.ai",
        promptTemplate: "Role:\nData Analyst.\n\nTask:\nAnalyze the provided CSV data. Find which month had the highest sales growth, what product category performed best, and list 3 key highlights.\n\nOutput:\nWritten analytics brief."
      },
      {
        stepNumber: 4,
        title: "Create Data Visualizations Code",
        description: "Generate chart code (using Chart.js or Python) to visualize trends.",
        toolName: "Cursor",
        toolUrl: "https://www.cursor.com",
        promptTemplate: "Role:\nPython Developer.\n\nTask:\nWrite a short Python script using pandas and matplotlib to read a CSV file named sales.csv and plot a line chart of monthly sales totals.\n\nOutput:\nClean Python plotting script."
      }
    ],
    tags: ["data-analysis", "excel-formulas", "spreadsheets", "visualization"],
    metadata: {
      projectTypes: ["Data Reporting"],
      domains: ["Research", "Business"],
      complexity: ["Simple"],
      budget: ["Free"],
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

    // First query and print a single workflow document for structural reference
    const sample = await Workflow.findOne({});
    console.log("--- REFERENCE SAMPLE WORKFLOW DOCUMENT ---");
    console.log(JSON.stringify(sample, null, 2));
    console.log("----------------------------------------\n");

    // Perform insertMany
    const result = await Workflow.insertMany(newWorkflows);
    console.log(`Successfully inserted ${result.length} new workflows.`);

  } catch (error) {
    console.error("An error occurred during workflow seeding:", error);
  } finally {
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB.");
  }
}

run();
