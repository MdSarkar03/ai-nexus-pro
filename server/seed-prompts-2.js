import dotenv from "dotenv";
import mongoose from "mongoose";
import Prompt from "./models/Prompt.js";

// Configure dotenv
dotenv.config({ path: "C:/Users/Tanmoy/ai-nexus-pro/.env" });

const newPrompts = [
  // 1. DevOps & Cloud Engineering - Beginner
  {
    title: "Dockerfile Best Practices Auditor",
    toolName: "ChatGPT",
    category: "DevOps & Cloud Engineering",
    useCase: "Reviewing basic Dockerfile setups to ensure proper layering, user permissions, and cache utilization.",
    promptText: `# Role\nYou are a DevOps Mentor with years of experience building secure and lightweight Docker container images.\n\n# Objective\nAudit the provided Dockerfile and recommend improvements to make it smaller, faster, and more secure.\n\n# Dockerfile Content\n\`\`\`dockerfile\n{{DOCKERFILE_CONTENT}}\n\`\`\`\n\n# Review Criteria\n1. Base Image: Is the base image minimal (e.g., using alpine or slim versions)?\n2. Layering: Are commands structured to optimize Docker layer caching?\n3. User Permissions: Is the container running as root? If so, explain how to switch to a non-root user.\n4. Build Context: Suggest what files should be excluded in a \`.dockerignore\` file.\n\n# Output Format\nProvide the modified Dockerfile first, followed by a list of explanations for the changes.`,
    expectedOutput: "Optimized Dockerfile showing multi-stage or minimal base image, non-root user setup, and caching optimizations, along with explanations.",
    tags: ["docker", "devops", "containers", "best-practices"],
    difficulty: "Beginner",
    metadata: {
      projectTypes: ["SaaS", "Web App", "API Service"],
      domains: ["Technology"],
      complexity: ["Simple"],
      budget: ["Free"],
      teamSize: ["Solo", "Small"],
      deployment: ["Cloud", "On-Prem"],
      securityLevel: ["Standard"]
    }
  },
  // 2. DevOps & Cloud Engineering - Intermediate
  {
    title: "Terraform AWS Infrastructure Blueprint",
    toolName: "Claude",
    category: "DevOps & Cloud Engineering",
    useCase: "Generating standard multi-AZ AWS VPC and ECS/EKS module structures using best practices in Terraform.",
    promptText: `# Role\nYou are a Cloud Infrastructure Architect specializing in Infrastructure as Code (IaC) and AWS environments.\n\n# Objective\nWrite a clean, modular Terraform configuration for a secure VPC in AWS.\n\n# VPC Requirements\n1. Multi-AZ setup with public and private subnets across two Availability Zones.\n2. A NAT Gateway in each public subnet to allow private resources internet access.\n3. A public Route Table routing to the Internet Gateway, and a private Route Table routing to the NAT Gateways.\n4. Standard variables for CIDR blocks, environment tagging (Dev, Staging, Prod), and region.\n5. Enabled DNS hostnames and DNS support.\n\n# Output Format\nProvide the complete Terraform \`main.tf\`, \`variables.tf\`, and \`outputs.tf\` files with clear comments.`,
    expectedOutput: "Complete modular Terraform files defining a multi-AZ VPC on AWS with correct routing, subnets, NAT, variables, and outputs.",
    tags: ["terraform", "aws", "vpc", "infrastructure-as-code"],
    difficulty: "Intermediate",
    metadata: {
      projectTypes: ["SaaS", "Enterprise Software", "API Service"],
      domains: ["Technology"],
      complexity: ["Moderate"],
      budget: ["Low", "Medium"],
      teamSize: ["Small", "Medium"],
      deployment: ["Cloud"],
      securityLevel: ["High"]
    }
  },
  // 3. Performance Engineering - Beginner
  {
    title: "Frontend Image & Asset Optimization Plan",
    toolName: "Claude",
    category: "Performance Engineering",
    useCase: "Auditing a website's image assets and suggesting modern optimization techniques to reduce bundle size and improve load times.",
    promptText: `# Role\nYou are a Web Performance Specialist focused on Core Web Vitals (LCP, FID, CLS).\n\n# Objective\nCreate an asset optimization plan for a web app to speed up initial page load.\n\n# Context\nMy web app has several large banner images and icons loading in standard PNG/JPEG format, resulting in slow load times on mobile.\n\n# Optimization Guide\nExplain how I can optimize these assets:\n1. Modern image formats (e.g., WebP, AVIF) and how to serve them using the \`<picture>\` tag.\n2. Responsive image serving (using \`srcset\` and \`sizes\`).\n3. Image lazy loading techniques.\n4. Strategies for font and CSS asset delivery optimization.\n\n# Output Format\nPresent a clean, actionable guide with code snippets showing how to implement these optimizations in HTML/CSS.`,
    expectedOutput: "Structured guide on modern image formats, srcset usage, lazy loading, and code snippets representing optimized asset delivery.",
    tags: ["web-performance", "images", "assets", "frontend"],
    difficulty: "Beginner",
    metadata: {
      projectTypes: ["Web App", "SaaS", "E-commerce"],
      domains: ["Marketing", "Technology"],
      complexity: ["Simple"],
      budget: ["Free"],
      teamSize: ["Solo", "Small"],
      deployment: ["Any"],
      securityLevel: ["Standard"]
    }
  },
  // 4. Performance Engineering - Intermediate
  {
    title: "Database Query Indexing & Analysis Script",
    toolName: "Cursor",
    category: "Performance Engineering",
    useCase: "Creating a script to analyze database slow query logs and identify candidates for composite indexes or caching.",
    promptText: `# Role\nYou are a Database Performance Engineer specializing in optimizing slow database queries at scale.\n\n# Objective\nWrite a Node.js script that connects to MongoDB, reads a list of active query profiles, and outputs recommendations for composite indexes.\n\n# Script Specifications\n1. Query the MongoDB system profile collection (\`system.profile\`) for operations that took longer than 100ms.\n2. Parse the query filter fields for each slow operation.\n3. Identify if the query involves multiple filter fields (equality, range, sort).\n4. Generate the exact \`createIndex()\` statements for recommended composite indexes matching the equality-sort-range rule.\n5. Handle exceptions if profiling is not enabled on the database.\n\n# Output Format\nProvide the complete, documented JavaScript file.`,
    expectedOutput: "A Node.js database indexing optimizer script reading the profiling collection, identifying slow fields, and suggesting indexes.",
    tags: ["mongodb", "performance", "indexing", "database-script"],
    difficulty: "Intermediate",
    metadata: {
      projectTypes: ["SaaS", "API Service", "Enterprise Software"],
      domains: ["Technology"],
      complexity: ["Moderate"],
      budget: ["Low", "Medium"],
      teamSize: ["Solo", "Small", "Medium"],
      deployment: ["Cloud", "On-Prem"],
      securityLevel: ["Standard"]
    }
  },
  // 5. Cybersecurity - Beginner
  {
    title: "OWASP Top 10 Awareness Checklist",
    toolName: "ChatGPT",
    category: "Cybersecurity",
    useCase: "Reviewing a simple web app architecture to ensure fundamental protections against basic web vulnerabilities are active.",
    promptText: `# Role\nYou are an Application Security Educator who makes security principles approachable for junior developers.\n\n# Objective\nExplain the fundamental concepts of the OWASP Top 10 vulnerabilities and provide a basic code mitigation for:\n1. SQL Injection (SQLi)\n2. Cross-Site Scripting (XSS)\n3. Broken Object Level Authorization (BOLA)\n\n# Request Details\nFor each of the three vulnerabilities:\n- Describe how an attacker exploits it in simple terms.\n- Show a vulnerable code snippet (in Node.js/JavaScript).\n- Show the secure, refactored version of that same code.`,
    expectedOutput: "Educational explanation of SQLi, XSS, and BOLA, complete with vulnerable vs secure code pairings.",
    tags: ["security", "owasp", "education", "best-practices"],
    difficulty: "Beginner",
    metadata: {
      projectTypes: ["Web App", "SaaS", "API Service"],
      domains: ["Education", "Technology"],
      complexity: ["Simple"],
      budget: ["Free"],
      teamSize: ["Solo", "Small"],
      deployment: ["Any"],
      securityLevel: ["Standard"]
    }
  },
  // 6. Cybersecurity - Intermediate
  {
    title: "JWT Authentication Security Hardening",
    toolName: "Claude",
    category: "Cybersecurity",
    useCase: "Designing a secure JWT strategy featuring Access/Refresh token rotation, secure cookie transport, and CSRF mitigation.",
    promptText: `# Role\nYou are a Cybersecurity Architect specializing in identity management and web authentication protocols.\n\n# Objective\nDesign and implement a secure token-based authentication system using JSON Web Tokens (JWT) in an Express.js backend.\n\n# Security Requirements\n1. Use short-lived Access Tokens (stored in memory) and long-lived Refresh Tokens (stored in HTTP-only, secure, SameSite cookies).\n2. Implement a **Refresh Token Rotation** mechanism to detect and mitigate token theft.\n3. Prevent CSRF (Cross-Site Request Forgery) attacks by implementing double-submit cookies or custom headers.\n4. Set secure cryptographic configurations using HMAC SHA-256 for token signing.\n5. Handle token revocation on user logout.\n\n# Output Format\nProvide complete Express middleware and router code implementing these requirements, including comments on key security mechanisms.`,
    expectedOutput: "Complete secure authentication middleware in Express containing HTTP-only cookie handlers, rotation logic, and CSRF mitigation code.",
    tags: ["authentication", "jwt", "csrf", "backend-security"],
    difficulty: "Intermediate",
    metadata: {
      projectTypes: ["SaaS", "API Service", "Enterprise Software"],
      domains: ["Finance", "Technology", "Healthcare"],
      complexity: ["Moderate"],
      budget: ["Low", "Medium"],
      teamSize: ["Small", "Medium"],
      deployment: ["Cloud", "Serverless"],
      securityLevel: ["High"]
    }
  },
  // 7. Business Strategy - Beginner
  {
    title: "SaaS Pricing Tier Planner",
    toolName: "ChatGPT",
    category: "Business Strategy",
    useCase: "Designing a basic multi-tier pricing strategy for a startup launching its first software-as-a-service product.",
    promptText: `# Role\nYou are a Startup Business Strategist and Product Manager specializing in monetization and growth.\n\n# Objective\nCreate a tiered pricing structure for a new SaaS product based on my target audience.\n\n# Product & Target Audience\n- Product: \`{{PRODUCT_DESCRIPTION}}\`\n- Audience: \`{{AUDIENCE_DESCRIPTION}}\`\n\n# Planning Tasks\n1. Propose three pricing tiers (e.g., Free/Hobby, Growth/Pro, Enterprise).\n2. Define what features are included in each tier (feature gating strategy).\n3. Recommend a price range for each tier with justification based on value metrics.\n4. Outline a strategy to encourage users to upgrade from the lower tiers.`,
    expectedOutput: "Monetization plan showing three tiered plans, feature gates, value metric pricing logic, and upgrade pathways.",
    tags: ["pricing-strategy", "saas", "monetization", "growth"],
    difficulty: "Beginner",
    metadata: {
      projectTypes: ["SaaS"],
      domains: ["Business", "Marketing"],
      complexity: ["Simple"],
      budget: ["Free", "Low"],
      teamSize: ["Solo", "Small"],
      deployment: ["Any"],
      securityLevel: ["Standard"]
    }
  },
  // 8. Business Strategy - Intermediate
  {
    title: "Competitor Feature Matrix & SWOT Analyst",
    toolName: "Claude",
    category: "Business Strategy",
    useCase: "Analyzing target industry competitors, mapping features, and outputting a SWOT matrix and strategy recommendations.",
    promptText: `# Role\nYou are a Market Research Analyst and Business Strategist specializing in competitive intelligence.\n\n# Objective\nConduct a competitive analysis for our product in the current market.\n\n# Our Product & Niche\n- Product: \`{{OUR_PRODUCT}}\`\n- Competitors: \`{{COMPETITORS_LIST}}\`\n\n# Analysis Guidelines\n1. Map our core features against the listed competitors in a structured comparison format.\n2. Identify gaps where competitors have a significant advantage.\n3. Generate a SWOT Matrix (Strengths, Weaknesses, Opportunities, Threats) for our product.\n4. Formulate 3 tactical recommendations to differentiate our product and capture market share.`,
    expectedOutput: "Comparative feature checklist, detailed SWOT analysis, and 3 strategic differentiator recommendations.",
    tags: ["competitor-analysis", "swot", "business-strategy", "product-management"],
    difficulty: "Intermediate",
    metadata: {
      projectTypes: ["SaaS", "E-commerce", "Mobile App"],
      domains: ["Business", "Marketing"],
      complexity: ["Moderate"],
      budget: ["Low", "Medium"],
      teamSize: ["Solo", "Small", "Medium"],
      deployment: ["Any"],
      securityLevel: ["Standard"]
    }
  },
  // 9. Artificial Intelligence - Beginner
  {
    title: "OpenAI API Hello World Starter",
    toolName: "ChatGPT",
    category: "Artificial Intelligence",
    useCase: "A simple, beginner-friendly script to send a prompt to the OpenAI API and retrieve a structured response.",
    promptText: `# Role\nYou are an AI Integration Guide who explains API integrations clearly.\n\n# Objective\nWrite a simple Node.js script to call the OpenAI API (chat completions) using their official SDK.\n\n# Requirements\n1. Load the API key from environment variables.\n2. Use the \`gpt-4o-mini\` model.\n3. Send a user prompt (e.g., "Tell me a joke about coding").\n4. Log the generated text answer to the console.\n5. Handle basic errors (like a missing API key).\n\n# Output Format\nProvide the complete JavaScript file with comments explaining the imports, configuration, and API call structure.`,
    expectedOutput: "Node.js script using the official OpenAI SDK, loading keys securely, initiating chat completions, handling errors, and logging results.",
    tags: ["openai-api", "javascript", "ai-integration", "sdk-starter"],
    difficulty: "Beginner",
    metadata: {
      projectTypes: ["SaaS", "API Service", "Web App"],
      domains: ["Technology"],
      complexity: ["Simple"],
      budget: ["Free"],
      teamSize: ["Solo", "Small"],
      deployment: ["Cloud", "Serverless"],
      securityLevel: ["Standard"]
    }
  },
  // 10. Artificial Intelligence - Intermediate
  {
    title: "Retrieval-Augmented Generation (RAG) Architecture Builder",
    toolName: "Claude",
    category: "Artificial Intelligence",
    useCase: "Implementing a node-based pipeline to split documents, generate embeddings, store in a vector DB, and retrieve contexts.",
    promptText: `# Role\nYou are an AI Engineer specializing in Natural Language Processing and Retrieval-Augmented Generation (RAG) systems.\n\n# Objective\nCreate a Node.js service class that implements a basic RAG pipeline to answer user questions using custom text documents.\n\n# Pipeline Specifications\n1. Load a text file and split it into chunks of approximately 500 characters with a 50-character overlap.\n2. Call the OpenAI Embedding API (\`text-embedding-3-small\`) to generate vectors for each chunk.\n3. Propose a basic in-memory vector storage approach or a Pinecone/Supabase integration to store these embeddings.\n4. Implement a semantic search function that takes a user query, generates its embedding, performs Cosine Similarity, and returns the top 3 matching chunks.\n5. Construct a prompt template combining the retrieved chunks as context and the user query, and call \`gpt-4o\` to get the final answer.\n\n# Output Format\nProvide a clean, modular class file with methods for indexing documents and querying.`,
    expectedOutput: "Complete Node.js class demonstrating document chunking, embedding calls, vector similarity search, context matching, and chat completion prompt injection.",
    tags: ["rag", "vector-database", "embeddings", "openai", "ai-architecture"],
    difficulty: "Intermediate",
    metadata: {
      projectTypes: ["SaaS", "Enterprise Software", "API Service"],
      domains: ["Technology", "Education"],
      complexity: ["Moderate", "Complex"],
      budget: ["Low", "Medium"],
      teamSize: ["Solo", "Small", "Medium"],
      deployment: ["Cloud", "Serverless"],
      securityLevel: ["Standard", "High"]
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
