const BASE_URL = "http://localhost:5000";

const cases = [
  { prompt: "A clinical decision support tool for doctors, must meet strict healthcare compliance standards, medium team size.", expected: "Healthcare AI Platform" },
  { prompt: "A data science team needs to track ML experiments and serve trained models in production using MLOps tooling.", expected: "Machine Learning Engineering Stack" },
  { prompt: "A company needs to centralize data from multiple sources into a cloud warehouse with BI dashboards, large enterprise team.", expected: "Data Engineering Pipeline" },
  { prompt: "A DevOps team setting up Kubernetes, CI/CD pipelines, and infrastructure as code for a large enterprise.", expected: "DevOps & Cloud Platform" },
  { prompt: "An engineering team needs reliable deployment automation, container orchestration, and infrastructure monitoring.", expected: "DevOps & Cloud Platform" },
];

async function run() {
  for (const c of cases) {
    const res = await fetch(`${BASE_URL}/api/architect/generate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt: c.prompt }),
    });
    const data = await res.json();
    console.log('='.repeat(80));
    console.log('PROMPT:', c.prompt);
    console.log('EXPECTED:', c.expected, '| ACTUAL:', data.recommendations?.stack?.title);
    console.log('INTENT:', JSON.stringify(data.intent, null, 2));
  }
}

run();