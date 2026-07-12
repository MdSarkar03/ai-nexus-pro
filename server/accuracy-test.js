// accuracy-test.js
// Measures recommendation accuracy for the Decision Engine (/api/architect/generate).
// Run this while your server (node index.js) is already running in another terminal.
//
// These "expected" answers are based on the ACTUAL 10 stacks and their real metadata,
// pulled directly from GET /api/stacks on 2026-07-12. The real stack set is:
// Startup MVP Stack, AI SaaS Platform, Enterprise SaaS Stack, E-commerce Platform Stack,
// Mobile App Backend Stack, Data Engineering Pipeline, Healthcare AI Platform,
// Cybersecurity Platform, DevOps & Cloud Platform, Machine Learning Engineering Stack.
//
// A few of these stacks overlap in purpose (e.g. "AI SaaS Platform" vs "Machine Learning
// Engineering Stack" both touch AI, "Data Engineering Pipeline" vs "Machine Learning
// Engineering Stack" both touch data pipelines), so the test prompts below are written to
// lean clearly toward one over the other based on their actual metadata and tool lists.
// If a mismatch shows up on one of these overlapping pairs, look at it by hand rather than
// assuming it's automatically wrong - it may be a genuinely reasonable alternative match.

const BASE_URL = "http://localhost:5000";

const testCases = [
  // Healthcare AI Platform (domains: Healthcare only - should be unambiguous)
  { prompt: "A HIPAA-compliant patient records system for a mid-size hospital network with strict data privacy needs.", expected: "Healthcare AI Platform" },
  { prompt: "A telemedicine app for a healthcare startup handling sensitive patient data, needs AI-assisted diagnosis support.", expected: "Healthcare AI Platform" },
  { prompt: "A clinical decision support tool for doctors, must meet strict healthcare compliance standards, medium team size.", expected: "Healthcare AI Platform" },

  // Enterprise SaaS Stack (domains: Finance, Enterprise, General; budget High; team Medium/Large)
  { prompt: "A high-security banking platform for an enterprise fintech company with a large team of 30 engineers and a high budget.", expected: "Enterprise SaaS Stack" },
  { prompt: "An enterprise B2B SaaS product for a Fortune 500 finance company needing strong security and a large team.", expected: "Enterprise SaaS Stack" },
  { prompt: "A large enterprise internal software platform with a big team and high budget, needs strong compliance and reliability.", expected: "Enterprise SaaS Stack" },

  // Startup MVP Stack (budget Free/Low/Medium; team Solo/Small; complexity Simple/Moderate)
  { prompt: "A solo founder building a quick MVP for a weekend hackathon with zero budget.", expected: "Startup MVP Stack" },
  { prompt: "A small two-person team wants to launch a simple SaaS product fast with minimal cost.", expected: "Startup MVP Stack" },
  { prompt: "A student building a hobby web app with no budget at all, just one person working on it.", expected: "Startup MVP Stack" },

  // E-commerce Platform Stack (domains: E-commerce, Retail)
  { prompt: "An online store selling clothing, needs product search, secure payments, and inventory management, small team, medium budget.", expected: "E-commerce Platform Stack" },
  { prompt: "A retail brand launching an online marketplace with fast checkout and SEO-friendly product pages.", expected: "E-commerce Platform Stack" },
  { prompt: "A direct-to-consumer online shop that needs a scalable storefront and payment processing.", expected: "E-commerce Platform Stack" },

  // AI SaaS Platform (projectTypes: SaaS, AI Product, Chatbot, API Service; domains: General/Technology/Productivity)
  { prompt: "A startup building an AI chatbot product using an LLM API with retrieval-augmented generation for customer support.", expected: "AI SaaS Platform" },
  { prompt: "A team building a production SaaS application powered by GPT with vector search for a knowledge assistant.", expected: "AI SaaS Platform" },

  // Machine Learning Engineering Stack (PyTorch, MLflow, experiment tracking, model training/serving; domains: General/Technology/Research)
  { prompt: "A research team training and deploying their own custom machine learning models with experiment tracking.", expected: "Machine Learning Engineering Stack" },
  { prompt: "A data science team needs to track ML experiments and serve trained models in production using MLOps tooling.", expected: "Machine Learning Engineering Stack" },

  // Mobile App Backend Stack (projectTypes: Mobile App)
  { prompt: "A cross-platform mobile app for iOS and Android with push notifications and realtime data, small budget.", expected: "Mobile App Backend Stack" },
  { prompt: "A solo developer building a mobile app for both iPhone and Android with a backend for auth and notifications.", expected: "Mobile App Backend Stack" },

  // Data Engineering Pipeline (projectTypes: Data Pipeline, Analytics Platform; domains: Finance, Enterprise, Retail; high budget)
  { prompt: "A company needs to centralize data from multiple sources into a cloud warehouse with BI dashboards, large enterprise team.", expected: "Data Engineering Pipeline" },
  { prompt: "An enterprise data team building ETL pipelines and executive analytics dashboards for the finance department.", expected: "Data Engineering Pipeline" },

  // Cybersecurity Platform (domains: Cybersecurity, Enterprise, Government, Finance)
  { prompt: "A government agency needs a SIEM system for threat detection, security monitoring, and automated incident response.", expected: "Cybersecurity Platform" },
  { prompt: "An enterprise security team building a platform for log aggregation, security alerting, and incident response.", expected: "Cybersecurity Platform" },

  // DevOps & Cloud Platform (projectTypes: Internal Tool, Infrastructure Platform)
  { prompt: "A DevOps team setting up Kubernetes, CI/CD pipelines, and infrastructure as code for a large enterprise.", expected: "DevOps & Cloud Platform" },
  { prompt: "An engineering team needs reliable deployment automation, container orchestration, and infrastructure monitoring.", expected: "DevOps & Cloud Platform" },
];

async function runTest(testCase) {
  try {
    const res = await fetch(`${BASE_URL}/api/architect/generate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt: testCase.prompt }),
    });
    const data = await res.json();

    if (!data.success) {
      return { ...testCase, actual: null, correct: false, error: data.error || "request failed" };
    }

    const actualStack = data.recommendations?.stack?.title || "(none returned)";
    const correct = actualStack === testCase.expected;

    return { ...testCase, actual: actualStack, confidence: data.confidence, correct };
  } catch (err) {
    return { ...testCase, actual: null, correct: false, error: err.message };
  }
}

async function main() {
  console.log(`Running ${testCases.length} accuracy test cases against ${BASE_URL}...\n`);

  const results = [];
  for (let i = 0; i < testCases.length; i++) {
    process.stdout.write(`[${i + 1}/${testCases.length}] Testing... `);
    const result = await runTest(testCases[i]);
    results.push(result);
    console.log(result.correct ? "MATCH" : "MISMATCH");
  }

  const correctCount = results.filter((r) => r.correct).length;
  const accuracy = ((correctCount / results.length) * 100).toFixed(1);

  console.log("\n===== DETAILED RESULTS =====\n");
  results.forEach((r, i) => {
    console.log(`${i + 1}. ${r.correct ? "[MATCH]   " : "[MISMATCH]"} prompt: "${r.prompt}"`);
    console.log(`   expected: ${r.expected}`);
    console.log(`   actual:   ${r.actual || r.error}`);
    if (r.confidence !== undefined) console.log(`   confidence: ${r.confidence}`);
    console.log("");
  });

  console.log("===== SUMMARY =====");
  console.log(`Total test cases: ${results.length}`);
  console.log(`Matches: ${correctCount}`);
  console.log(`Mismatches: ${results.length - correctCount}`);
  console.log(`Accuracy: ${accuracy}%`);
}

main();