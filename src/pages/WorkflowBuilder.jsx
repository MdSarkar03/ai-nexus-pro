import { useState, useEffect } from "react";
import axios from "axios";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000";
const GEMINI_KEY = import.meta.env.VITE_GEMINI_API_KEY;

const goalSuggestions = [
  "Launch a YouTube Channel",
  "Build a SaaS Landing Page",
  "Start a Podcast",
  "Grow a Personal Brand on LinkedIn",
  "Automate My Freelance Business",
  "Create an Online Course",
  "Build a Mobile App",
  "Start an E-commerce Store",
  "Write and Publish a Book",
  "Run a Social Media Marketing Campaign",
];

export default function WorkflowBuilder() {
  const [savedWorkflows, setSavedWorkflows] = useState([]);
  const [selected, setSelected] = useState(null);
  const [goalInput, setGoalInput] = useState("");
  const [aiWorkflow, setAiWorkflow] = useState(null);
  const [generating, setGenerating] = useState(false);
  const [activeTab, setActiveTab] = useState("generate");
  const [error, setError] = useState("");

  useEffect(() => {
    axios.get(`${API}/api/workflows`)
      .then(res => setSavedWorkflows(res.data))
      .catch(() => {});
  }, []);

  const generateWorkflow = async (goal) => {
    const userGoal = goal || goalInput.trim();
    if (!userGoal) return;

    setGenerating(true);
    setAiWorkflow(null);
    setError("");

    const prompt = `You are an AI workflow expert. A user wants to: "${userGoal}"

Create a practical step-by-step AI-powered workflow for this goal. Return ONLY valid JSON, no markdown, no backticks, no explanation.

Return this exact structure:
{
  "title": "workflow title",
  "goal": "${userGoal}",
  "description": "2 sentence description of what this workflow achieves",
  "estimatedTime": "total time estimate",
  "steps": [
    {
      "stepNumber": 1,
      "title": "step title",
      "description": "what to do in this step",
      "toolName": "best AI tool name for this step",
      "toolUrl": "https://tool-website.com",
      "promptTemplate": "exact prompt template the user should use with this tool",
      "duration": "time for this step"
    }
  ]
}

Rules:
- 5 to 7 steps only
- Use real AI tools (ChatGPT, Claude, Midjourney, ElevenLabs, Runway, Perplexity, Notion AI, Gamma, Jasper, etc)
- Make prompt templates specific and immediately usable
- Be practical and actionable`;

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_KEY}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }]
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(`API Error: ${data.error?.message || "Unknown error"}`);
        setGenerating(false);
        return;
      }

      const text = data.candidates?.[0]?.content?.parts?.[0]?.text || "";
      const cleaned = text.replace(/```json|```/g, "").trim();
      const parsed = JSON.parse(cleaned);
      setAiWorkflow(parsed);
    } catch (err) {
      setError("Failed to generate workflow. Please try again.");
    } finally {
      setGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-12 text-center">
          <div className="inline-flex items-center gap-2 bg-[#FF6B35]/10 text-[#FF6B35] px-4 py-2 rounded-full text-sm font-semibold mb-4">
            ✨ Powered by Gemini AI
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">AI Workflow Builder</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Describe any goal and get a custom step-by-step AI workflow instantly.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8">

        {/* Tabs */}
        <div className="flex gap-2 mb-8 bg-white rounded-2xl p-1 shadow-sm border border-gray-100 w-fit">
          <button onClick={() => setActiveTab("generate")}
            className={`px-6 py-2.5 rounded-xl font-semibold transition-colors ${activeTab === "generate" ? "bg-[#FF6B35] text-white" : "text-gray-600 hover:text-gray-900"}`}>
            ✨ Generate with AI
          </button>
          <button onClick={() => setActiveTab("saved")}
            className={`px-6 py-2.5 rounded-xl font-semibold transition-colors ${activeTab === "saved" ? "bg-[#FF6B35] text-white" : "text-gray-600 hover:text-gray-900"}`}>
            📚 Saved Workflows ({savedWorkflows.length})
          </button>
        </div>

        {/* Generate Tab */}
        {activeTab === "generate" && (
          <div>
            <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 mb-6">
              <label className="block text-lg font-bold text-gray-900 mb-3">
                What do you want to achieve?
              </label>
              <div className="flex gap-3">
                <input
                  type="text"
                  value={goalInput}
                  onChange={e => setGoalInput(e.target.value)}
                  onKeyDown={e => e.key === "Enter" && generateWorkflow()}
                  placeholder="e.g. Launch a YouTube channel about cooking..."
                  className="flex-1 px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[#FF6B35] focus:ring-1 focus:ring-[#FF6B35] text-gray-700"
                />
                <button
                  onClick={() => generateWorkflow()}
                  disabled={!goalInput.trim() || generating}
                  className={`px-6 py-3 rounded-xl font-bold transition-colors ${goalInput.trim() && !generating ? "bg-[#FF6B35] text-white hover:bg-[#FF5722]" : "bg-gray-100 text-gray-400 cursor-not-allowed"}`}>
                  {generating ? "Generating..." : "Generate ✨"}
                </button>
              </div>

              <div className="mt-4">
                <p className="text-sm text-gray-500 mb-2">Try these:</p>
                <div className="flex flex-wrap gap-2">
                  {goalSuggestions.map(s => (
                    <button key={s} onClick={() => { setGoalInput(s); generateWorkflow(s); }}
                      className="bg-gray-50 border border-gray-200 hover:border-[#FF6B35] hover:text-[#FF6B35] text-gray-600 text-sm px-3 py-1.5 rounded-full transition-colors">
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl p-4 mb-6">
                {error}
              </div>
            )}

            {generating && (
              <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-12 text-center">
                <div className="w-16 h-16 border-4 border-[#FF6B35] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-gray-600 font-medium text-lg">Building your AI workflow...</p>
                <p className="text-gray-400 text-sm mt-2">Gemini is selecting the best tools for each step</p>
              </div>
            )}

            {aiWorkflow && !generating && (
              <div>
                <div className="bg-white rounded-2xl shadow-lg border border-[#FF6B35]/20 p-8 mb-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="bg-[#FF6B35]/10 text-[#FF6B35] text-sm font-semibold px-3 py-1 rounded-full">✨ AI Generated</span>
                    {aiWorkflow.estimatedTime && (
                      <span className="bg-gray-100 text-gray-600 text-sm px-3 py-1 rounded-full">⏱ {aiWorkflow.estimatedTime}</span>
                    )}
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">{aiWorkflow.title}</h2>
                  <p className="text-gray-600 text-lg">{aiWorkflow.description}</p>
                </div>

                <div className="space-y-4">
                  {aiWorkflow.steps?.map((step, index) => (
                    <div key={index} className="bg-white rounded-2xl shadow-md border-l-4 border-[#FF6B35] p-6">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-[#FF6B35] text-white rounded-full flex items-center justify-center font-bold text-xl shrink-0">
                          {step.stepNumber}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2 flex-wrap">
                            <h3 className="text-xl font-bold text-gray-900">{step.title}</h3>
                            <a href={step.toolUrl} target="_blank" rel="noopener noreferrer"
                              className="bg-[#FF6B35] text-white text-sm px-3 py-1 rounded-full hover:bg-[#FF5722] transition-colors">
                              {step.toolName} ↗
                            </a>
                            {step.duration && (
                              <span className="bg-gray-100 text-gray-500 text-xs px-2 py-1 rounded-full">⏱ {step.duration}</span>
                            )}
                          </div>
                          <p className="text-gray-600 mb-4">{step.description}</p>
                          {step.promptTemplate && (
                            <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
                              <p className="text-xs font-semibold text-gray-500 uppercase mb-2">📋 Prompt Template</p>
                              <p className="text-gray-700 text-sm leading-relaxed">{step.promptTemplate}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => { setAiWorkflow(null); setGoalInput(""); }}
                  className="mt-6 text-[#FF6B35] hover:underline font-medium">
                  ← Generate Another Workflow
                </button>
              </div>
            )}
          </div>
        )}

        {/* Saved Workflows Tab */}
        {activeTab === "saved" && (
          <div>
            {selected ? (
              <div>
                <button onClick={() => setSelected(null)} className="mb-6 flex items-center gap-2 text-[#FF6B35] hover:underline font-medium">
                  ← Back to Saved Workflows
                </button>
                <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="bg-[#FF6B35]/10 text-[#FF6B35] text-sm font-semibold px-3 py-1 rounded-full">{selected.category}</span>
                    <span className="bg-gray-100 text-gray-600 text-sm px-3 py-1 rounded-full">{selected.difficulty}</span>
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">{selected.title}</h2>
                  <p className="text-gray-600 text-lg">{selected.description}</p>
                </div>
                <div className="space-y-4">
                  {selected.steps?.map((step, index) => (
                    <div key={index} className="bg-white rounded-2xl shadow-md border-l-4 border-[#FF6B35] p-6">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-[#FF6B35] text-white rounded-full flex items-center justify-center font-bold text-xl shrink-0">
                          {step.stepNumber}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-xl font-bold text-gray-900">{step.title}</h3>
                            <a href={step.toolUrl} target="_blank" rel="noopener noreferrer"
                              className="bg-[#FF6B35] text-white text-sm px-3 py-1 rounded-full hover:bg-[#FF5722] transition-colors">
                              {step.toolName} ↗
                            </a>
                          </div>
                          <p className="text-gray-600 mb-4">{step.description}</p>
                          {step.promptTemplate && (
                            <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
                              <p className="text-xs font-semibold text-gray-500 uppercase mb-2">📋 Prompt Template</p>
                              <p className="text-gray-700 text-sm leading-relaxed">{step.promptTemplate}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {savedWorkflows.map(workflow => (
                  <div key={workflow._id} onClick={() => setSelected(workflow)}
                    className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all cursor-pointer border border-gray-100 hover:border-[#FF6B35] p-6 group">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="bg-[#FF6B35]/10 text-[#FF6B35] text-xs font-semibold px-3 py-1 rounded-full">{workflow.category}</span>
                      <span className="bg-gray-100 text-gray-500 text-xs px-3 py-1 rounded-full">{workflow.difficulty}</span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-[#FF6B35] transition-colors">{workflow.title}</h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">{workflow.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">{workflow.steps?.length} steps</span>
                      <span className="text-[#FF6B35] font-medium text-sm">View Workflow →</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}