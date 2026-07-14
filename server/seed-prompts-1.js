import dotenv from "dotenv";
import mongoose from "mongoose";
import Prompt from "./models/Prompt.js";

// Configure dotenv
dotenv.config({ path: "C:/Users/Tanmoy/ai-nexus-pro/.env" });

const newPrompts = [
  // 1. Software Development - Beginner
  {
    title: "Git Branching & Workflow Helper",
    toolName: "ChatGPT",
    category: "Software Development",
    useCase: "Step-by-step assistance for new developers setting up feature branches, commits, and pull requests in Git.",
    promptText: `# Role\nYou are a helpful and patient Senior Developer guiding a junior developer who is new to Git version control.\n\n# Objective\nHelp me manage my workflow for a new feature. Explain the exact Git commands needed to:\n1. Create a new branch named \`feature/user-login\`.\n2. Save my local progress with a commit message following Conventional Commits.\n3. Keep my branch up-to-date with the main branch.\n4. Push my changes and open a pull request.\n\n# Context\nMy project is hosted on GitHub. I have completed coding the login button.\n\n# Output Format\nProvide a clear step-by-step list of commands, each accompanied by a brief explanation of what it does.`,
    expectedOutput: "A step-by-step guide with terminal commands and explanations for branching, committing, merging, and pushing in Git.",
    tags: ["git", "workflow", "version-control", "collaboration"],
    difficulty: "Beginner",
    metadata: {
      projectTypes: ["SaaS", "Web App", "API Service"],
      domains: ["Technology", "General"],
      complexity: ["Simple"],
      budget: ["Free"],
      teamSize: ["Solo", "Small", "Medium"],
      deployment: ["Any"],
      securityLevel: ["Standard"]
    }
  },
  // 2. Software Development - Intermediate
  {
    title: "Interactive Unit Test Case Generator",
    toolName: "Cursor",
    category: "Software Development",
    useCase: "Automated generation of comprehensive unit tests with mocks and boundary value checks for existing functions.",
    promptText: `# Role\nYou are a Test Automation Engineer specializing in unit testing and test-driven development (TDD).\n\n# Objective\nGenerate a comprehensive suite of unit tests for the provided function.\n\n# Target Function\n\`\`\`javascript\n{{FUNCTION_TO_TEST}}\n\`\`\`\n\n# Constraints & Requirements\n1. Write tests using the Jest testing library.\n2. Include test cases for:\n   - Happy path scenarios.\n   - Boundary and edge cases (e.g., empty arrays, null/undefined inputs, extremely large values).\n   - Error handling (verifying that the function throws correct exceptions).\n3. Use mock functions where external dependencies or API requests are present.\n4. Ensure tests are clean, readable, and follow testing best practices.\n\n# Output Format\nProvide the complete test suite file with assertions clearly annotated.`,
    expectedOutput: "A complete unit test suite file using Jest containing happy paths, edge cases, error handling tests, and appropriate mocks.",
    tags: ["testing", "jest", "unit-tests", "quality-assurance"],
    difficulty: "Intermediate",
    metadata: {
      projectTypes: ["SaaS", "Web App", "API Service", "Mobile App"],
      domains: ["Technology"],
      complexity: ["Moderate"],
      budget: ["Free", "Low", "Medium"],
      teamSize: ["Solo", "Small", "Medium"],
      deployment: ["Any"],
      securityLevel: ["Standard"]
    }
  },
  // 3. Software Engineering - Beginner
  {
    title: "Clean Code Refactoring Basics",
    toolName: "Claude",
    category: "Software Engineering",
    useCase: "Refactoring poorly formatted or overly complex basic code functions into clean, readable code.",
    promptText: `# Role\nYou are a clean code mentor. You help developers write readable, expressive, and maintainable code by applying principles from Robert C. Martin's "Clean Code".\n\n# Objective\nRefactor the following poorly written function to improve its readability and maintainability.\n\nCode to refactor:\n\`\`\`javascript\n{{CODE_BLOCK}}\n\`\`\`\n\n# Refactoring Checklist\n1. Rename variable and function names to be descriptive and meaningful.\n2. Reduce nesting (avoid nested loops or deep if-else statements if possible).\n3. Extract long blocks of code into smaller helper functions with a single responsibility.\n4. Add clean comments only where necessary to explain the *why*, not the *what*.\n\n# Output Format\nShow the refactored code first, followed by a concise bulleted list of the specific improvements made.`,
    expectedOutput: "Clean refactored code with descriptive naming and extracted helpers, along with a list of applied improvements.",
    tags: ["refactoring", "clean-code", "readability", "javascript"],
    difficulty: "Beginner",
    metadata: {
      projectTypes: ["SaaS", "Web App"],
      domains: ["Technology"],
      complexity: ["Simple"],
      budget: ["Free"],
      teamSize: ["Solo", "Small"],
      deployment: ["Any"],
      securityLevel: ["Standard"]
    }
  },
  // 4. Software Engineering - Intermediate
  {
    title: "API Integration Error Handler & Retry Orchestrator",
    toolName: "GitHub Copilot",
    category: "Software Engineering",
    useCase: "Implementing a robust error handling wrapper with exponential backoff and circuit breaker patterns for API integration.",
    promptText: `# Role\nYou are a Senior Backend Engineer focusing on building resilient distributed systems.\n\n# Objective\nCreate a wrapper function or decorator in Node.js/TypeScript that handles API request failures robustly.\n\n# Specifications\n1. Wrap the following HTTP call: \`{{HTTP_CALL_FUNCTION}}\`.\n2. Implement a retry mechanism with **Exponential Backoff** and jitter.\n3. Add a basic **Circuit Breaker** state (Closed, Open, Half-Open) to prevent overloading the downstream API.\n4. Log failures using a structured logger (like Winston or Pino).\n5. Handle specific HTTP response statuses differently (e.g., fail immediately on 401/403, retry on 429 and 5xx).\n\n# Output Format\nProvide complete, compile-safe TypeScript code implementing this pattern, along with inline documentation explaining the state machine.`,
    expectedOutput: "Resilient TypeScript integration code containing exponential backoff retries, basic circuit breaker logic, structured logging, and status code-specific behaviors.",
    tags: ["api", "reliability", "typescript", "design-patterns"],
    difficulty: "Intermediate",
    metadata: {
      projectTypes: ["API Service", "SaaS", "Enterprise Software"],
      domains: ["Technology", "Finance"],
      complexity: ["Moderate"],
      budget: ["Low", "Medium"],
      teamSize: ["Solo", "Small", "Medium"],
      deployment: ["Cloud", "Serverless"],
      securityLevel: ["Standard", "High"]
    }
  },
  // 5. Software Architecture - Beginner
  {
    title: "Architecture Design Pattern Decider",
    toolName: "Claude",
    category: "Software Architecture",
    useCase: "Selecting the appropriate design pattern (Singleton, Factory, Observer, etc.) for a specific programming scenario.",
    promptText: `# Role\nYou are a Software Architect who loves explaining software design patterns in simple terms.\n\n# Objective\nHelp me choose the best design pattern for my current programming scenario and explain how to apply it.\n\n# Scenario\n"{{SCENARIO_DESCRIPTION}}"\n\n# Architect's Analysis\nFor the scenario above:\n1. Recommend the most appropriate design pattern (e.g., Strategy, Factory, Observer, Singleton).\n2. Explain *why* it fits this specific scenario over alternatives.\n3. Provide a simple code example showing the basic structure of the pattern.\n4. List the main advantages and potential drawbacks of using this pattern.`,
    expectedOutput: "A comprehensive design recommendation detailing the selected design pattern, architectural reasoning, structural code skeleton, and pros/cons.",
    tags: ["design-patterns", "architecture", "ood", "best-practices"],
    difficulty: "Beginner",
    metadata: {
      projectTypes: ["SaaS", "Web App", "Desktop App"],
      domains: ["Technology"],
      complexity: ["Simple"],
      budget: ["Free"],
      teamSize: ["Solo", "Small"],
      deployment: ["Any"],
      securityLevel: ["Standard"]
    }
  },
  // 6. Software Architecture - Intermediate
  {
    title: "Monolith to Microservices Decomposition Guide",
    toolName: "ChatGPT",
    category: "Software Architecture",
    useCase: "Planning the decomposition of a monolithic system into domain-driven microservices.",
    promptText: `# Role\nYou are a Lead Software Architect specializing in system modernization, legacy migrations, and Domain-Driven Design (DDD).\n\n# Objective\nDesign a migration and decomposition plan to break down a monolithic application into microservices.\n\n# Legacy Monolith Description\n"{{MONOLITH_DESCRIPTION}}"\n\n# Migration Requirements\n1. Identify the **Bounded Contexts** using Domain-Driven Design.\n2. Outline the proposed microservice boundaries and their database separation strategy (Database-per-Service).\n3. Propose an communication architecture (e.g., REST, gRPC, Event-Driven with Kafka/RabbitMQ) for inter-service calls.\n4. Suggest a step-by-step transition path using the **Strangler Fig Pattern** to minimize downtime.\n\n# Output Format\nProvide a structured architectural document outlining context maps, communication paths, and the step-by-step migration roadmap.`,
    expectedOutput: "Legacy decomposition roadmap with bounded contexts, communication design, database strategy, and a Strangler Fig migration timeline.",
    tags: ["microservices", "ddd", "system-design", "migration"],
    difficulty: "Intermediate",
    metadata: {
      projectTypes: ["Enterprise Software", "SaaS"],
      domains: ["Technology", "Finance", "E-commerce"],
      complexity: ["Moderate", "Complex"],
      budget: ["Medium", "High"],
      teamSize: ["Small", "Medium", "Large"],
      deployment: ["Cloud", "On-Prem", "Hybrid"],
      securityLevel: ["High"]
    }
  },
  // 7. Backend Engineering - Beginner
  {
    title: "RESTful API Endpoint Boilerplate Builder",
    toolName: "Cursor",
    category: "Backend Engineering",
    useCase: "Rapid creation of a standard RESTful Express router with validation middleware and error handling.",
    promptText: `# Role\nYou are a Backend Developer who writes clean, standard, production-ready Express.js APIs.\n\n# Objective\nCreate a Node.js Express router code boilerplate for a new resource.\n\n# Resource Details\n- Name: \`{{RESOURCE_NAME}}\`\n- Fields: \`{{RESOURCE_FIELDS}}\`\n\n# Code Specifications\n1. Implement standard REST routes: GET (all), GET (by ID), POST, PUT, and DELETE.\n2. Include basic input validation for request bodies.\n3. Use standard HTTP status codes (200, 201, 400, 404, 500).\n4. Implement basic try-catch error blocks passing errors to an Express error handler.\n\n# Output Format\nProvide the complete Express javascript router file ready for import.`,
    expectedOutput: "A ready-to-run Express.js route router file with standard CRUD paths, validation hooks, and error handling.",
    tags: ["express", "crud", "boilerplate", "nodejs"],
    difficulty: "Beginner",
    metadata: {
      projectTypes: ["API Service", "Web App"],
      domains: ["Technology"],
      complexity: ["Simple"],
      budget: ["Free"],
      teamSize: ["Solo", "Small"],
      deployment: ["Cloud", "Serverless"],
      securityLevel: ["Standard"]
    }
  },
  // 8. Backend Engineering - Intermediate
  {
    title: "Redis Caching Layer Implementation",
    toolName: "Claude",
    category: "Backend Engineering",
    useCase: "Intercepting slow database queries with a Redis cache to optimize API response times.",
    promptText: `# Role\nYou are a Backend Performance Engineer focusing on database query optimization and API speed.\n\n# Objective\nImplement a robust Redis caching layer in Node.js for a high-traffic API endpoint.\n\n# Scenario\nWe have a slow MongoDB query function: \`{{DATABASE_QUERY_FUNCTION}}\`.\n\n# Caching Strategy Requirements\n1. Write a wrapper function that checks if the requested data exists in Redis.\n2. If there is a cache hit, return the data immediately in JSON format.\n3. If there is a cache miss, query the database, store the result in Redis with an appropriate Time-To-Live (TTL), and return the result.\n4. Implement **Cache-Aside** strategy.\n5. Include logic to invalidate or update the cache when the underlying data is mutated.\n6. Handle Redis connection failures gracefully (fallback directly to database queries so the API stays online).\n\n# Output Format\nProvide the complete JavaScript/TypeScript implementation for the caching utility and routes.`,
    expectedOutput: "Cache wrapper script demonstrating Cache-Aside, TTL setting, mutation invalidation, and connection failure fallback handler.",
    tags: ["redis", "caching", "performance", "mongodb"],
    difficulty: "Intermediate",
    metadata: {
      projectTypes: ["API Service", "SaaS", "E-commerce"],
      domains: ["Technology", "E-commerce"],
      complexity: ["Moderate"],
      budget: ["Low", "Medium"],
      teamSize: ["Solo", "Small", "Medium"],
      deployment: ["Cloud", "Serverless"],
      securityLevel: ["Standard"]
    }
  },
  // 9. Database Engineering - Beginner
  {
    title: "Relational Database Schema Generator",
    toolName: "ChatGPT",
    category: "Database Engineering",
    useCase: "Generating standard SQL DDL schema definitions for a simple application data model.",
    promptText: `# Role\nYou are a Database Administrator designing clean, normalized relational schemas.\n\n# Objective\nGenerate the SQL DDL commands to create tables for the following application description.\n\n# Application Description\n"${"{{APP_DESCRIPTION}}"}"\n\n# Database Specifications\n1. Target SQL Dialect: PostgreSQL.\n2. Design the schema in **Third Normal Form (3NF)**.\n3. Include proper Primary Keys and Foreign Keys with reference actions (e.g., \`ON DELETE CASCADE\`).\n4. Add basic constraints (e.g., \`NOT NULL\`, \`UNIQUE\`, \`CHECK\`).\n\n# Output Format\nProvide clean SQL commands with brief comments explaining the relationships between the tables.`,
    expectedOutput: "Normalized PostgreSQL DDL commands containing tables, indexes, constraints, and foreign key relations.",
    tags: ["sql", "postgresql", "ddl", "schema-design"],
    difficulty: "Beginner",
    metadata: {
      projectTypes: ["SaaS", "Web App", "API Service"],
      domains: ["Technology"],
      complexity: ["Simple"],
      budget: ["Free"],
      teamSize: ["Solo", "Small"],
      deployment: ["Cloud", "On-Prem", "Any"],
      securityLevel: ["Standard"]
    }
  },
  // 10. Database Engineering - Intermediate
  {
    title: "SQL Query Performance Optimizer",
    toolName: "ChatGPT",
    category: "Database Engineering",
    useCase: "Analyzing slow running queries, explaining execution plans, and suggesting indexing or refactoring strategies.",
    promptText: `# Role\nYou are a Database Performance Tuner with deep knowledge of query execution planners and index internals.\n\n# Objective\nAnalyze the provided slow SQL query and execution plan, then propose optimizations.\n\n# Slow Query\n\`\`\`sql\n{{SLOW_QUERY}}\n\`\`\`\n\n# Execution Plan (EXPLAIN ANALYZE)\n\`\`\`\n{{EXECUTION_PLAN}}\n\`\`\`\n\n# Optimization Tasks\n1. Identify the bottlenecks in the execution plan (e.g., Sequential Scans, hash joins, temporary disk writes).\n2. Suggest specific **Indexes** (B-Tree, Hash, GIN, Composite Indexes) that would eliminate scans.\n3. Refactor the SQL query syntax to be more efficient (e.g., replacing subqueries with JOINs or using CTEs).\n4. Explain how the database planner will change its route after these optimizations.\n\n# Output Format\nProvide the optimized SQL query, DDL statements for any suggested indexes, and a paragraph explaining the performance improvement mechanism.`,
    expectedOutput: "Optimized SQL query syntax, index creation statements, execution plan analysis, and optimization explanation.",
    tags: ["query-optimization", "indexing", "sql", "explain-plan"],
    difficulty: "Intermediate",
    metadata: {
      projectTypes: ["Enterprise Software", "SaaS", "API Service"],
      domains: ["Technology", "Finance", "E-commerce"],
      complexity: ["Moderate", "Complex"],
      budget: ["Low", "Medium", "High"],
      teamSize: ["Solo", "Small", "Medium", "Large"],
      deployment: ["Cloud", "On-Prem", "Hybrid"],
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
