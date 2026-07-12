// Restyled WorkflowBuilder.jsx - Premium Light Theme
import { useState, useEffect } from "react";
import axios from "axios";
import PagePurposeHeader from "../components/PagePurposeHeader";

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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Header with ambient accent blob */}
      <div className="relative bg-white border-b overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,107,53,0.08),transparent_50%)] pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 py-12 text-center relative">
          <div className="inline-flex items-center gap-2 bg-[#FF6B35]/10 text-[#FF6B35] px-4 py-2 rounded-full text-sm font-semibold mb-4">
            ✨ Powered by Groq + Llama 3.3
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-4 tracking-tighter">AI Workflow Builder</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Describe any goal and get a custom step-by-step AI workflow instantly.
          </p>
        </div>
      </div>

      <PagePurposeHeader
        title="Great Results Come From Systems, Not Single Tools."
        description="Build repeatable AI workflows that connect tools, models, and processes into practical execution."
      />

      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* Tabs - Elevated */}
        <div className="flex gap-2 mb-8 bg-white rounded-3xl p-1 shadow-lg border-0 w-fit">
          <button 
            onClick={() => setActiveTab("generate")}
            className={`px-8 py-3 rounded-2xl font-semibold transition-all ${activeTab === "generate" ? "bg-[#FF6B35] text-white shadow-md" : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"}`}
          >
            ✨ Generate with AI
          </button>
          <button 
            onClick={() => setActiveTab("saved")}
            className={`px-8 py-3 rounded-2xl font-semibold transition-all ${activeTab === "saved" ? "bg-[#FF6B35] text-white shadow-md" : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"}`}
          >
            📚 Saved Workflows ({savedWorkflows.length})
          </button>
        </div>

        {/* Generate Tab */}
        {activeTab === "generate" && (
          <div>
            {/* Input Card - Elevated */}
            <div className="bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all border-0 p-8 mb-8">
              <label className="block text-xl font-semibold text-gray-900 mb-4">
                What do you want to achieve?
              </label>
              <div className="flex gap-3">
                <input
                  type="text"
                  value={goalInput}
                  onChange={e => setGoalInput(e.target.value)}
                  onKeyDown={e => e.key === "Enter" && generateWorkflow()}
                  placeholder="e.g. Launch a YouTube channel about cooking..."
                  className="flex-1 px-6 py-4 border border-gray-200 rounded-2xl focus:outline-none focus:border-[#FF6B35] focus:ring-2 focus:ring-[#FF6B35]/20 text-gray-700 text-lg"
                />
                <button
                  onClick={() => generateWorkflow()}
                  disabled={!goalInput.trim() || generating}
                  className={`px-8 py-4 rounded-2xl font-bold text-lg transition-all flex-shrink-0 ${goalInput.trim() && !generating ? "bg-[#FF6B35] text-white hover:bg-[#FF5722] shadow-lg" : "bg-gray-100 text-gray-400 cursor-not-allowed"}`}
                >
                  {generating ? "Generating..." : "Generate ✨"}
                </button>
              </div>

              <div className="mt-6">
                <p className="text-sm text-gray-500 mb-3 font-medium">Quick starts:</p>
                <div className="flex flex-wrap gap-2">
                  {goalSuggestions.map(s => (
                    <button 
                      key={s} 
                      onClick={() => { setGoalInput(s); generateWorkflow(s); }}
                      className="bg-white border border-gray-200 hover:border-[#FF6B35] hover:text-[#FF6B35] hover:shadow text-gray-700 text-sm px-5 py-2.5 rounded-2xl transition-all"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border-l-4 border-red-500 text-red-700 rounded-2xl p-5 mb-8">
                {error}
              </div>
            )}

            {generating && (
              <div className="bg-white rounded-3xl shadow-xl border-0 p-16 text-center">
                <div className="w-20 h-20 border-4 border-[#FF6B35] border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
                <p className="text-gray-600 font-semibold text-xl">Crafting your premium AI workflow...</p>
                <p className="text-gray-500 mt-2">This usually takes 8-15 seconds</p>
              </div>
            )}

            {aiWorkflow && !generating && (
              <div>
                {/* AI Result Header Card */}
                <div className="bg-white rounded-3xl shadow-2xl border-0 p-10 mb-8 relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-[#FF6B35] via-orange-400 to-[#FF6B35]"></div>
                  
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <div className="flex items-center gap-3 mb-4">
                        <span className="bg-[#FF6B35]/10 text-[#FF6B35] text-sm font-semibold px-4 py-1.5 rounded-2xl">✨ AI Generated</span>
                        <span className="bg-gray-100 text-gray-600 text-sm px-4 py-1.5 rounded-2xl">{aiWorkflow.difficulty || "Beginner"}</span>
                      </div>
                      <h2 className="text-4xl font-bold text-gray-900 mb-3 tracking-tight">{aiWorkflow.title}</h2>
                      <p className="text-gray-600 text-lg leading-relaxed">{aiWorkflow.description}</p>
                    </div>
                    <button
                      onClick={() => saveWorkflow(aiWorkflow)}
                      disabled={saving}
                      className="bg-[#FF6B35] text-white px-8 py-4 rounded-2xl font-semibold hover:bg-[#FF5722] disabled:opacity-70 flex items-center gap-3 shadow-lg transition-all mt-2"
                    >
                      {saving ? "Saving..." : "💾 Save Workflow"}
                    </button>
                  </div>
                </div>

                {/* Steps */}
                <div className="space-y-6">
                  {aiWorkflow.steps?.map((step, index) => (
                    <div key={index} className="bg-white rounded-3xl shadow-lg hover:shadow-xl transition-all border-l-4 border-[#FF6B35] p-8">
                      <div className="flex items-start gap-6">
                        <div className="w-14 h-14 bg-gradient-to-br from-[#FF6B35] to-[#ff8a5c] text-white rounded-2xl flex items-center justify-center font-bold text-2xl shrink-0 shadow-inner">
                          {step.stepNumber}
                        </div>
                        <div className="flex-1 pt-1">
                          <div className="flex items-center gap-3 mb-4 flex-wrap">
                            <h3 className="text-2xl font-semibold text-gray-900">{step.title}</h3>
                            <a 
                              href={step.toolUrl} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="bg-[#FF6B35] text-white text-sm px-4 py-1.5 rounded-2xl hover:bg-[#FF5722] transition-colors inline-flex items-center gap-1"
                            >
                              {step.toolName} ↗
                            </a>
                          </div>
                          <p className="text-gray-600 mb-6 text-[15.5px] leading-relaxed">{step.description}</p>
                          {step.promptTemplate && (
                            <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6">
                              <p className="text-xs font-semibold text-gray-500 uppercase mb-3 tracking-widest">📋 Prompt Template</p>
                              <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-wrap font-mono">{step.promptTemplate}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => { setAiWorkflow(null); setGoalInput(""); }}
                  className="mt-10 text-[#FF6B35] hover:text-orange-600 font-medium flex items-center gap-2 text-lg transition-colors"
                >
                  ← Generate Another Workflow
                </button>
              </div>
            )}
          </div>
        )}

        {/* Saved Workflows Tab */}
        {activeTab === "saved" && (
          <div>
            {showEditForm && editingWorkflow ? (
              <div className="bg-white rounded-3xl shadow-xl border-0 p-10">
                <h3 className="text-3xl font-bold mb-8 text-gray-900">Edit Workflow</h3>
                <div className="space-y-6">
                  <input
                    type="text"
                    value={editingWorkflow.title}
                    onChange={(e) => handleEditChange("title", e.target.value)}
                    className="w-full p-4 border border-gray-200 rounded-2xl focus:outline-none focus:border-[#FF6B35]"
                    placeholder="Title"
                  />
                  <textarea
                    value={editingWorkflow.description}
                    onChange={(e) => handleEditChange("description", e.target.value)}
                    className="w-full p-4 border border-gray-200 rounded-2xl h-32 focus:outline-none focus:border-[#FF6B35]"
                    placeholder="Description"
                  />
                  <div className="grid grid-cols-2 gap-6">
                    <input
                      type="text"
                      value={editingWorkflow.category}
                      onChange={(e) => handleEditChange("category", e.target.value)}
                      className="p-4 border border-gray-200 rounded-2xl focus:outline-none focus:border-[#FF6B35]"
                      placeholder="Category"
                    />
                    <select
                      value={editingWorkflow.difficulty}
                      onChange={(e) => handleEditChange("difficulty", e.target.value)}
                      className="p-4 border border-gray-200 rounded-2xl focus:outline-none focus:border-[#FF6B35]"
                    >
                      <option value="Beginner">Beginner</option>
                      <option value="Intermediate">Intermediate</option>
                      <option value="Advanced">Advanced</option>
                    </select>
                  </div>
                </div>
                <div className="flex gap-4 mt-10">
                  <button
                    onClick={saveEdit}
                    className="bg-[#FF6B35] text-white px-8 py-4 rounded-2xl font-semibold flex-1 hover:bg-[#FF5722] transition-all"
                  >
                    Save Changes
                  </button>
                  <button
                    onClick={() => { setShowEditForm(false); setEditingWorkflow(null); }}
                    className="border border-gray-300 px-8 py-4 rounded-2xl flex-1 hover:bg-gray-50 transition-all"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : selected ? (
              <div>
                <div className="flex justify-between items-center mb-8">
                  <button 
                    onClick={() => setSelected(null)} 
                    className="flex items-center gap-2 text-[#FF6B35] hover:underline font-medium text-lg"
                  >
                    ← Back to List
                  </button>
                  <div className="flex gap-3">
                    <button
                      onClick={() => startEditing(selected)}
                      className="px-6 py-3 border border-[#FF6B35] text-[#FF6B35] rounded-2xl hover:bg-[#FF6B35] hover:text-white transition-all"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteWorkflow(selected._id)}
                      className="px-6 py-3 border border-red-500 text-red-500 rounded-2xl hover:bg-red-500 hover:text-white transition-all"
                    >
                      Delete
                    </button>
                  </div>
                </div>

                <div className="bg-white rounded-3xl shadow-xl p-10 mb-8">
                  <div className="flex items-center gap-4 mb-6">
                    <span className="bg-[#FF6B35]/10 text-[#FF6B35] text-sm font-semibold px-5 py-2 rounded-2xl">{selected.category}</span>
                    <span className="bg-gray-100 text-gray-600 text-sm px-5 py-2 rounded-2xl">{selected.difficulty}</span>
                  </div>
                  <h2 className="text-4xl font-bold text-gray-900 mb-4">{selected.title}</h2>
                  <p className="text-gray-600 text-lg leading-relaxed">{selected.description}</p>
                </div>

                <div className="space-y-6">
                  {selected.steps?.map((step, index) => (
                    <div key={index} className="bg-white rounded-3xl shadow-lg hover:shadow-xl transition-all border-l-4 border-[#FF6B35] p-8">
                      <div className="flex items-start gap-6">
                        <div className="w-14 h-14 bg-gradient-to-br from-[#FF6B35] to-[#ff8a5c] text-white rounded-2xl flex items-center justify-center font-bold text-2xl shrink-0 shadow-inner">
                          {step.stepNumber}
                        </div>
                        <div className="flex-1 pt-1">
                          <div className="flex items-center gap-3 mb-4">
                            <h3 className="text-2xl font-semibold text-gray-900">{step.title}</h3>
                            <a 
                              href={step.toolUrl} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="bg-[#FF6B35] text-white text-sm px-4 py-1.5 rounded-2xl hover:bg-[#FF5722] transition-colors"
                            >
                              {step.toolName} ↗
                            </a>
                          </div>
                          <p className="text-gray-600 mb-6">{step.description}</p>
                          {step.promptTemplate && (
                            <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6">
                              <p className="font-semibold text-gray-500 mb-3">PROMPT TEMPLATE:</p>
                              <p className="text-gray-700 whitespace-pre-wrap font-mono text-sm leading-relaxed">{step.promptTemplate}</p>
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
                  <div className="col-span-2 text-center py-24 text-gray-400 bg-white/70 rounded-3xl">
                    No saved workflows yet.<br />Generate and save some to get started.
                  </div>
                ) : (
                  savedWorkflows.map(workflow => (
                    <div 
                      key={workflow._id} 
                      onClick={() => setSelected(workflow)}
                      className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all cursor-pointer border-0 p-8 group relative"
                    >
                      <div className="flex items-center gap-3 mb-4">
                        <span className="bg-[#FF6B35]/10 text-[#FF6B35] text-xs font-semibold px-4 py-1 rounded-2xl">{workflow.category}</span>
                        <span className="bg-gray-100 text-gray-500 text-xs px-4 py-1 rounded-2xl">{workflow.difficulty}</span>
                      </div>
                      <h3 className="text-2xl font-semibold text-gray-900 mb-3 group-hover:text-[#FF6B35] transition-colors line-clamp-2">{workflow.title}</h3>
                      <p className="text-gray-600 text-sm mb-8 line-clamp-3">{workflow.description}</p>
                      
                      <div className="flex items-center justify-between text-sm pt-4 border-t border-gray-100">
                        <span className="text-gray-500">{workflow.steps?.length || 0} steps</span>
                        <div className="flex gap-4">
                          <button 
                            onClick={(e) => { e.stopPropagation(); startEditing(workflow); }}
                            className="text-[#FF6B35] hover:underline text-sm font-medium"
                          >
                            Edit
                          </button>
                          <button 
                            onClick={(e) => { e.stopPropagation(); deleteWorkflow(workflow._id); }}
                            className="text-red-500 hover:underline text-sm font-medium"
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