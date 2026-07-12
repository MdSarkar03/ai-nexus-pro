// latency-test.js
// Measures real response time for the key API endpoints.
// Run this while your server (node index.js) is already running in another terminal.

const BASE_URL = "http://localhost:5000";
const RUNS_PER_ENDPOINT = 50;

const endpoints = [
  {
    name: "Search (content)",
    url: `${BASE_URL}/api/search?q=content`,
    method: "GET",
  },
  {
    name: "Search (fintech)",
    url: `${BASE_URL}/api/search?q=fintech`,
    method: "GET",
  },
  {
    name: "Tools list",
    url: `${BASE_URL}/api/tools`,
    method: "GET",
  },
  {
    name: "Stacks list",
    url: `${BASE_URL}/api/stacks`,
    method: "GET",
  },
 {
    name: "Architect / Decision Engine",
    url: `${BASE_URL}/api/architect/generate`,
    method: "POST",
    body: {
      prompt:
        "A healthcare SaaS platform for a mid-size team with high security requirements and a medium budget.",
    },
  },
];

function percentile(sortedArr, p) {
  const idx = Math.ceil((p / 100) * sortedArr.length) - 1;
  return sortedArr[Math.max(0, idx)];
}

async function timeOneRequest(endpoint) {
  const start = performance.now();
  try {
    const options = { method: endpoint.method };
    if (endpoint.body) {
      options.headers = { "Content-Type": "application/json" };
      options.body = JSON.stringify(endpoint.body);
    }
    const res = await fetch(endpoint.url, options);
    await res.json().catch(() => null);
    const end = performance.now();
    return { ok: res.ok, ms: end - start };
  } catch (err) {
    const end = performance.now();
    return { ok: false, ms: end - start, error: err.message };
  }
}

async function testEndpoint(endpoint) {
  const timings = [];
  let failures = 0;

  for (let i = 0; i < RUNS_PER_ENDPOINT; i++) {
    const result = await timeOneRequest(endpoint);
    if (!result.ok) failures++;
    timings.push(result.ms);
  }

  timings.sort((a, b) => a - b);
  const avg = timings.reduce((sum, t) => sum + t, 0) / timings.length;
  const min = timings[0];
  const max = timings[timings.length - 1];
  const p95 = percentile(timings, 95);

  return {
    name: endpoint.name,
    runs: RUNS_PER_ENDPOINT,
    failures,
    avgMs: avg.toFixed(1),
    minMs: min.toFixed(1),
    maxMs: max.toFixed(1),
    p95Ms: p95.toFixed(1),
  };
}

async function main() {
  console.log(`Running ${RUNS_PER_ENDPOINT} requests per endpoint against ${BASE_URL}...\n`);
  const results = [];

  for (const endpoint of endpoints) {
    process.stdout.write(`Testing: ${endpoint.name} ... `);
    const result = await testEndpoint(endpoint);
    results.push(result);
    console.log("done");
  }

  console.log("\n===== RESULTS =====\n");
  for (const r of results) {
    console.log(`${r.name}`);
    console.log(`  Runs: ${r.runs}  Failures: ${r.failures}`);
    console.log(`  Average: ${r.avgMs} ms`);
    console.log(`  Min: ${r.minMs} ms`);
    console.log(`  Max: ${r.maxMs} ms`);
    console.log(`  P95: ${r.p95Ms} ms`);
    console.log("");
  }
}

main();