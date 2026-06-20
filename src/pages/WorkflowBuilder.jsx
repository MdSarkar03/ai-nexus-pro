// 2. Complete src/pages/WorkflowBuilder.jsx
import { useState, useEffect } from "react";
import axios from "axios";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000";
const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY;

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
  const [saving, setSaving] = useState(false);
  const [editingWorkflow, setEditingWorkflow] = useState(null);
  const [showEditForm, setShowEditForm] = useState(false);

  useEffect(() => {
    fetchWorkflows();
  }, []);

  const fetchWorkflows = async () => {
    try {
      const res = await axios.get(`${API}/api/workflows`);
      setSavedWorkflows(res.data);
    } catch (err) {
      console.error("Failed to fetch workflows");
    }
  };

  const generateWorkflow = async (goal) => {
    const userGoal = goal || goalInput.trim();
    if (!userGoal) return;

    setGenerating(true);
    setAiWorkflow(null);
    setError("");

    const prompt = `You are an expert AI workflow designer. User goal: "${userGoal}"

Create a practical, step-by-step AI-powered workflow. Return ONLY valid JSON with this EXACT structure (no markdown, no extra text):

{
  "title": "Clear workflow title",
  "goal": "${userGoal}",
  "category": "Marketing or Productivity or Development or Content etc",
  "difficulty": "Beginner or Intermediate or Advanced",
  "description": "2-3 sentence overview",
  "steps": [
    {
      "stepNumber": 1,
      "title": "Step title",
      "description": "Detailed description of what to do",
      "toolName": "Tool name (e.g. Claude, Midjourney)",
      "toolUrl": "https://example.com",
      "promptTemplate": "Ready-to-use prompt template"
    }
  ],
  "tags": ["tag1", "tag2"]
}

Rules:
- 5-7 steps
- Use real popular AI tools
- Make everything actionable and specific
- Categories: Marketing, Productivity, Development, Content Creation, Business, Education`;

    try {
      const response = await fetch(
        "https://api.groq.com/openai/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${GROQ_API_KEY}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            model: "llama-3.3-70b-versatile",
            messages: [{ role: "user", content: prompt }],
            temperature: 0.7,
            max_tokens: 4000,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(`Groq API Error: ${data.error?.message || "Unknown error"}`);
        return;
      }

      const text = data.choices?.[0]?.message?.content || "";
      const cleaned = text.replace(/```json|```/g, "").trim();
      const parsed = JSON.parse(cleaned);
      
      // Ensure compatibility with schema (add defaults if missing)
      if (!parsed.steps) parsed.steps = [];
      if (!parsed.tags) parsed.tags = [];
      
      setAiWorkflow(parsed);
    } catch (err) {
      console.error(err);
      setError("Failed to generate workflow. Check Groq API key and try again.");
    } finally {
      setGenerating(false);
    }
  };

  const saveWorkflow = async (workflowToSave) => {
    setSaving(true);
    try {
      const payload = { ...workflowToSave };
      // Ensure required fields
      if (!payload.category) payload.category = "General";
      if (!payload.difficulty) payload.difficulty = "Beginner";
      if (!payload.tags) payload.tags = [];

      const res = await axios.post(`${API}/api/workflows`, payload);
      setSavedWorkflows(prev => [res.data, ...prev]);
      setAiWorkflow(null);
      setGoalInput("");
      alert("Workflow saved successfully!");
    } catch (err) {
      setError("Failed to save workflow: " + (err.response?.data?.message || err.message));
    } finally {
      setSaving(false);
    }
  };

  const updateWorkflow = async (id, updatedData) => {
    try {
      const res = await axios.put(`${API}/api/workflows/${id}`, updatedData);
      setSavedWorkflows(prev => prev.map(w => w._id === id ? res.data : w));
      setSelected(res.data);
      setEditingWorkflow(null);
      setShowEditForm(false);
      alert("Workflow updated successfully!");
    } catch (err) {
      setError("Failed to update workflow");
    }
  };

  const deleteWorkflow = async (id) => {
    if (!confirm("Delete this workflow?")) return;
    
    try {
      await axios.delete(`${API}/api/workflows/${id}`);
      setSavedWorkflows(prev => prev.filter(w => w._id !== id));
      if (selected?._id === id) setSelected(null);
      alert("Workflow deleted successfully!");
    } catch (err) {
      setError("Failed to delete workflow");
    }
  };

  const startEditing = (workflow) => {
    setEditingWorkflow({ ...workflow });
    setShowEditForm(true);
  };

  const handleEditChange = (field, value) => {
    setEditingWorkflow(prev => ({ ...prev, [field]: value }));
  };

  const saveEdit = () => {
    if (editingWorkflow) {
      updateWorkflow(editingWorkflow._id, editingWorkflow);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-12 text-center">
          <div className="inline-flex items-center gap-2 bg-[#FF6B35]/10 text-[#FF6B35] px-4 py-2 rounded-full text-sm font-semibold mb-4">
            ✨ Powered by Groq + Llama 3.3
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
          <button 
            onClick={() => setActiveTab("generate")}
            className={`px-6 py-2.5 rounded-xl font-semibold transition-colors ${activeTab === "generate" ? "bg-[#FF6B35] text-white" : "text-gray-600 hover:text-gray-900"}`}
          >
            ✨ Generate with AI
          </button>
          <button 
            onClick={() => setActiveTab("saved")}
            className={`px-6 py-2.5 rounded-xl font-semibold transition-colors ${activeTab === "saved" ? "bg-[#FF6B35] text-white" : "text-gray-600 hover:text-gray-900"}`}
          >
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
                  className={`px-6 py-3 rounded-xl font-bold transition-colors ${goalInput.trim() && !generating ? "bg-[#FF6B35] text-white hover:bg-[#FF5722]" : "bg-gray-100 text-gray-400 cursor-not-allowed"}`}
                >
                  {generating ? "Generating..." : "Generate ✨"}
                </button>
              </div>

              <div className="mt-4">
                <p className="text-sm text-gray-500 mb-2">Quick starts:</p>
                <div className="flex flex-wrap gap-2">
                  {goalSuggestions.map(s => (
                    <button 
                      key={s} 
                      onClick={() => { setGoalInput(s); generateWorkflow(s); }}
                      className="bg-gray-50 border border-gray-200 hover:border-[#FF6B35] hover:text-[#FF6B35] text-gray-600 text-sm px-3 py-1.5 rounded-full transition-colors"
                    >
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
              </div>
            )}

            {aiWorkflow && !generating && (
              <div>
                <div className="bg-white rounded-2xl shadow-lg border border-[#FF6B35]/20 p-8 mb-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <span className="bg-[#FF6B35]/10 text-[#FF6B35] text-sm font-semibold px-3 py-1 rounded-full">✨ AI Generated</span>
                        <span className="bg-gray-100 text-gray-600 text-sm px-3 py-1 rounded-full">{aiWorkflow.difficulty || "Beginner"}</span>
                      </div>
                      <h2 className="text-3xl font-bold text-gray-900 mb-2">{aiWorkflow.title}</h2>
                      <p className="text-gray-600 text-lg">{aiWorkflow.description}</p>
                    </div>
                    <button
                      onClick={() => saveWorkflow(aiWorkflow)}
                      disabled={saving}
                      className="bg-[#FF6B35] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#FF5722] disabled:opacity-50 flex items-center gap-2"
                    >
                      {saving ? "Saving..." : "💾 Save Workflow"}
                    </button>
                  </div>
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
                          </div>
                          <p className="text-gray-600 mb-4">{step.description}</p>
                          {step.promptTemplate && (
                            <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
                              <p className="text-xs font-semibold text-gray-500 uppercase mb-2">📋 Prompt Template</p>
                              <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-wrap">{step.promptTemplate}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => { setAiWorkflow(null); setGoalInput(""); }}
                  className="mt-8 text-[#FF6B35] hover:underline font-medium flex items-center gap-1"
                >
                  ← Generate Another
                </button>
              </div>
            )}
          </div>
        )}

        {/* Saved Workflows Tab */}
        {activeTab === "saved" && (
          <div>
            {showEditForm && editingWorkflow ? (
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h3 className="text-2xl font-bold mb-6">Edit Workflow</h3>
                <div className="space-y-4">
                  <input
                    type="text"
                    value={editingWorkflow.title}
                    onChange={(e) => handleEditChange("title", e.target.value)}
                    className="w-full p-3 border rounded-xl"
                    placeholder="Title"
                  />
                  <textarea
                    value={editingWorkflow.description}
                    onChange={(e) => handleEditChange("description", e.target.value)}
                    className="w-full p-3 border rounded-xl h-24"
                    placeholder="Description"
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      value={editingWorkflow.category}
                      onChange={(e) => handleEditChange("category", e.target.value)}
                      className="p-3 border rounded-xl"
                      placeholder="Category"
                    />
                    <select
                      value={editingWorkflow.difficulty}
                      onChange={(e) => handleEditChange("difficulty", e.target.value)}
                      className="p-3 border rounded-xl"
                    >
                      <option value="Beginner">Beginner</option>
                      <option value="Intermediate">Intermediate</option>
                      <option value="Advanced">Advanced</option>
                    </select>
                  </div>
                </div>
                <div className="flex gap-3 mt-6">
                  <button
                    onClick={saveEdit}
                    className="bg-[#FF6B35] text-white px-6 py-3 rounded-xl font-semibold flex-1"
                  >
                    Save Changes
                  </button>
                  <button
                    onClick={() => { setShowEditForm(false); setEditingWorkflow(null); }}
                    className="border border-gray-300 px-6 py-3 rounded-xl flex-1"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : selected ? (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <button 
                    onClick={() => setSelected(null)} 
                    className="flex items-center gap-2 text-[#FF6B35] hover:underline font-medium"
                  >
                    ← Back to List
                  </button>
                  <div className="flex gap-3">
                    <button
                      onClick={() => startEditing(selected)}
                      className="px-5 py-2 border border-[#FF6B35] text-[#FF6B35] rounded-xl hover:bg-[#FF6B35] hover:text-white transition-colors"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteWorkflow(selected._id)}
                      className="px-5 py-2 border border-red-500 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </div>

                <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="bg-[#FF6B35]/10 text-[#FF6B35] text-sm font-semibold px-4 py-1 rounded-full">{selected.category}</span>
                    <span className="bg-gray-100 text-gray-600 text-sm px-4 py-1 rounded-full">{selected.difficulty}</span>
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-3">{selected.title}</h2>
                  <p className="text-gray-600 text-lg leading-relaxed">{selected.description}</p>
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
                            <h3 className="text-xl font-bold">{step.title}</h3>
                            <a 
                              href={step.toolUrl} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="bg-[#FF6B35] text-white text-sm px-3 py-1 rounded-full hover:bg-[#FF5722]"
                            >
                              {step.toolName} ↗
                            </a>
                          </div>
                          <p className="text-gray-600 mb-4">{step.description}</p>
                          {step.promptTemplate && (
                            <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 text-sm">
                              <p className="font-semibold text-gray-500 mb-2">PROMPT TEMPLATE:</p>
                              <p className="text-gray-700 whitespace-pre-wrap font-mono text-xs leading-relaxed">{step.promptTemplate}</p>
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
                {savedWorkflows.length === 0 ? (
                  <div className="col-span-2 text-center py-20 text-gray-400">
                    No saved workflows yet. Generate and save some!
                  </div>
                ) : (
                  savedWorkflows.map(workflow => (
                    <div 
                      key={workflow._id} 
                      onClick={() => setSelected(workflow)}
                      className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all cursor-pointer border border-gray-100 hover:border-[#FF6B35] p-6 group relative"
                    >
                      <div className="flex items-center gap-2 mb-3">
                        <span className="bg-[#FF6B35]/10 text-[#FF6B35] text-xs font-semibold px-3 py-1 rounded-full">{workflow.category}</span>
                        <span className="bg-gray-100 text-gray-500 text-xs px-3 py-1 rounded-full">{workflow.difficulty}</span>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-[#FF6B35] transition-colors line-clamp-2">{workflow.title}</h3>
                      <p className="text-gray-600 text-sm mb-6 line-clamp-3">{workflow.description}</p>
                      
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500">{workflow.steps?.length || 0} steps</span>
                        <div className="flex gap-2">
                          <button 
                            onClick={(e) => { e.stopPropagation(); startEditing(workflow); }}
                            className="text-[#FF6B35] hover:underline text-xs"
                          >
                            Edit
                          </button>
                          <button 
                            onClick={(e) => { e.stopPropagation(); deleteWorkflow(workflow._id); }}
                            className="text-red-500 hover:underline text-xs"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}