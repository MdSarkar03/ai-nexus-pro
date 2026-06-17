import { useState, useEffect } from "react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY;
console.log("VITE_GROQ_API_KEY =", import.meta.env.VITE_GROQ_API_KEY);

const STEP_TYPES = [
  { value: "input", label: "📥 Input", color: "bg-blue-100 border-blue-400 text-blue-800" },
  { value: "process", label: "⚙️ Process", color: "bg-yellow-100 border-yellow-400 text-yellow-800" },
  { value: "ai", label: "🤖 AI Step", color: "bg-purple-100 border-purple-400 text-purple-800" },
  { value: "output", label: "📤 Output", color: "bg-green-100 border-green-400 text-green-800" },
];

const defaultStep = () => ({
  id: Date.now(),
  type: "process",
  title: "",
  description: "",
});

export default function WorkflowBuilder() {
  const [workflows, setWorkflows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiIdea, setAiIdea] = useState("");
  const [aiSuggestion, setAiSuggestion] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const [form, setForm] = useState({
    name: "",
    description: "",
    steps: [defaultStep()],
  });

  // ─── Fetch all workflows from backend ───────────────────────────────────────
  useEffect(() => {
    fetchWorkflows();
  }, []);

  async function fetchWorkflows() {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${API_URL}/api/workflows`);
      if (!res.ok) throw new Error("Failed to fetch workflows");
      const data = await res.json();
      setWorkflows(data);
    } catch (err) {
      setError("Could not load workflows. Make sure your backend is running on port 5000.");
    } finally {
      setLoading(false);
    }
  }

  // ─── Form helpers ────────────────────────────────────────────────────────────
  function handleFormChange(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function addStep() {
    setForm((prev) => ({
      ...prev,
      steps: [...prev.steps, defaultStep()],
    }));
  }

  function removeStep(id) {
    setForm((prev) => ({
      ...prev,
      steps: prev.steps.filter((s) => s.id !== id),
    }));
  }

  function updateStep(id, field, value) {
    setForm((prev) => ({
      ...prev,
      steps: prev.steps.map((s) => (s.id === id ? { ...s, [field]: value } : s)),
    }));
  }

  function moveStep(index, direction) {
    const newSteps = [...form.steps];
    const swapIndex = index + direction;
    if (swapIndex < 0 || swapIndex >= newSteps.length) return;
    [newSteps[index], newSteps[swapIndex]] = [newSteps[swapIndex], newSteps[index]];
    setForm((prev) => ({ ...prev, steps: newSteps }));
  }

  function resetForm() {
    setForm({ name: "", description: "", steps: [defaultStep()] });
    setAiSuggestion("");
    setAiIdea("");
    setEditingId(null);
    setShowForm(false);
  }

  // ─── Save workflow (create or update) ────────────────────────────────────────
  async function handleSave() {
    if (!form.name.trim()) return alert("Please enter a workflow name.");
    if (form.steps.some((s) => !s.title.trim()))
      return alert("All steps need a title.");

    setSaving(true);
    try {
      const method = editingId ? "PUT" : "POST";
      const url = editingId
        ? `${API_URL}/api/workflows/${editingId}`
        : `${API_URL}/api/workflows`;

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          description: form.description,
          steps: form.steps.map((s, i) => ({
            stepNumber: i + 1,
            title: s.title,
            description: s.description,
            type: s.type,
          })),
        }),
      });

      if (!res.ok) throw new Error("Save failed");
      await fetchWorkflows();
      resetForm();
    } catch (err) {
      alert("Error saving workflow. Check your backend.");
    } finally {
      setSaving(false);
    }
  }

  // ─── Edit workflow ─────────────────────────────────────────────────────────
  function handleEdit(workflow) {
    setEditingId(workflow._id);
    setForm({
      name: workflow.name,
      description: workflow.description || "",
      steps: (workflow.steps || []).map((s) => ({
        id: Date.now() + Math.random(),
        type: s.type || "process",
        title: s.title || "",
        description: s.description || "",
      })),
    });
    setAiSuggestion("");
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // ─── Delete workflow ──────────────────────────────────────────────────────
  async function handleDelete(id) {
    try {
      const res = await fetch(`${API_URL}/api/workflows/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Delete failed");
      await fetchWorkflows();
      setDeleteConfirm(null);
    } catch {
      alert("Error deleting workflow.");
    }
  }

  //  ─── Groq AI: Generate workflow steps from idea ────────────────────────── from idea ────────────────────────
  async function handleAiGenerate() {
    if (!aiIdea.trim()) return alert("Please enter a workflow idea.");
   if (!GROQ_API_KEY) {
  return alert("Groq API key not found. Check your .env file.");
}
    setAiLoading(true);
    setAiSuggestion("");
    try {
      const prompt = `You are a helpful AI that generates workflow steps for software projects.
The user wants to build: "${aiIdea}"
Generate exactly 4 steps for this workflow in this JSON format (respond ONLY with valid JSON, no markdown):
[
  { "type": "input", "title": "...", "description": "..." },
  { "type": "process", "title": "...", "description": "..." },
  { "type": "ai", "title": "...", "description": "..." },
  { "type": "output", "title": "...", "description": "..." }
]
Types must be one of: input, process, ai, output.`;

      const response = await fetch(
  "https://api.groq.com/openai/v1/chat/completions",
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${GROQ_API_KEY}`,
    },
    body: JSON.stringify({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.7,
    }),
  }
);
      const data = await response.json();

const text =
  data.choices?.[0]?.message?.content || "";
      // Strip markdown code fences if present
      const clean = text.replace(/```json|```/g, "").trim();
      const steps = JSON.parse(clean);

      setForm((prev) => ({
        ...prev,
        name: prev.name || aiIdea,
        description: prev.description || `AI-generated workflow for: ${aiIdea}`,
        steps: steps.map((s) => ({
          id: Date.now() + Math.random(),
          type: s.type || "process",
          title: s.title || "",
          description: s.description || "",
        })),
      }));
      setAiSuggestion("✅ AI generated your workflow steps! Review and save.");
    } catch (err) {
      setAiSuggestion("❌ AI generation failed. Check your Gemini API key or try again.");
    } finally {
      setAiLoading(false);
    }
  }

  // ─── Helpers ──────────────────────────────────────────────────────────────
  function getStepStyle(type) {
    return (
      STEP_TYPES.find((t) => t.value === type)?.color ||
      "bg-gray-100 border-gray-400 text-gray-800"
    );
  }

  function getStepLabel(type) {
    return STEP_TYPES.find((t) => t.value === type)?.label || type;
  }

  // ─── Render ───────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Header */}
      <div className="bg-gray-900 border-b border-gray-800 px-6 py-8">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-3xl font-bold text-white">
                🔄 Workflow Builder
              </h1>
              <p className="text-gray-400 mt-1">
                Design, save and manage AI-powered workflows
              </p>
            </div>
            <button
              onClick={() => {
                resetForm();
                setShowForm(true);
              }}
              className="px-5 py-2.5 rounded-lg font-semibold text-white transition-all hover:opacity-90 active:scale-95"
              style={{ backgroundColor: "#FF6B35" }}
            >
              + New Workflow
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-8">
        {/* ── Create / Edit Form ─────────────────────────────────────────── */}
        {showForm && (
          <div className="bg-gray-900 border border-gray-700 rounded-2xl p-6 mb-10">
            <h2 className="text-xl font-bold mb-6 text-white">
              {editingId ? "✏️ Edit Workflow" : "✨ Create New Workflow"}
            </h2>

            {/* AI Generator Box */}
            <div className="bg-gray-800 rounded-xl p-4 mb-6 border border-purple-700">
              <p className="text-purple-300 font-semibold mb-2">
                🤖 AI Step Generator (Gemini 1.5 Flash)
              </p>
              <p className="text-gray-400 text-sm mb-3">
                Describe your workflow idea and AI will generate the steps for
                you automatically.
              </p>
              <div className="flex gap-3 flex-wrap">
                <input
                  type="text"
                  placeholder='e.g. "Email summarizer with AI"'
                  value={aiIdea}
                  onChange={(e) => setAiIdea(e.target.value)}
                  className="flex-1 min-w-[200px] bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
                  onKeyDown={(e) => e.key === "Enter" && handleAiGenerate()}
                />
                <button
                  onClick={handleAiGenerate}
                  disabled={aiLoading}
                  className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg font-semibold text-white transition disabled:opacity-50"
                >
                  {aiLoading ? "Generating…" : "Generate with AI ✨"}
                </button>
              </div>
              {aiSuggestion && (
                <p className="mt-2 text-sm text-green-400">{aiSuggestion}</p>
              )}
            </div>

            {/* Workflow Name */}
            <div className="mb-4">
              <label className="block text-gray-300 text-sm mb-1 font-medium">
                Workflow Name *
              </label>
              <input
                type="text"
                placeholder="e.g. Content Creation Pipeline"
                value={form.name}
                onChange={(e) => handleFormChange("name", e.target.value)}
                className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-orange-400"
              />
            </div>

            {/* Description */}
            <div className="mb-6">
              <label className="block text-gray-300 text-sm mb-1 font-medium">
                Description
              </label>
              <textarea
                placeholder="What does this workflow do?"
                value={form.description}
                onChange={(e) => handleFormChange("description", e.target.value)}
                rows={2}
                className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-orange-400 resize-none"
              />
            </div>

            {/* Steps */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <label className="text-gray-300 font-medium">Steps</label>
                <button
                  onClick={addStep}
                  className="text-sm px-3 py-1 rounded-lg border border-orange-400 text-orange-400 hover:bg-orange-400 hover:text-white transition"
                >
                  + Add Step
                </button>
              </div>

              <div className="space-y-3">
                {form.steps.map((step, index) => (
                  <div
                    key={step.id}
                    className="bg-gray-800 border border-gray-700 rounded-xl p-4"
                  >
                    <div className="flex items-center gap-2 mb-3 flex-wrap">
                      <span className="text-gray-400 text-sm font-mono w-6">
                        {index + 1}.
                      </span>

                      {/* Type selector */}
                      <select
                        value={step.type}
                        onChange={(e) =>
                          updateStep(step.id, "type", e.target.value)
                        }
                        className="bg-gray-700 border border-gray-600 rounded-lg px-2 py-1.5 text-sm text-white focus:outline-none"
                      >
                        {STEP_TYPES.map((t) => (
                          <option key={t.value} value={t.value}>
                            {t.label}
                          </option>
                        ))}
                      </select>

                      {/* Move buttons */}
                      <div className="flex gap-1 ml-auto">
                        <button
                          onClick={() => moveStep(index, -1)}
                          disabled={index === 0}
                          className="px-2 py-1 text-gray-400 hover:text-white disabled:opacity-30 text-sm"
                          title="Move up"
                        >
                          ▲
                        </button>
                        <button
                          onClick={() => moveStep(index, 1)}
                          disabled={index === form.steps.length - 1}
                          className="px-2 py-1 text-gray-400 hover:text-white disabled:opacity-30 text-sm"
                          title="Move down"
                        >
                          ▼
                        </button>
                        <button
                          onClick={() => removeStep(step.id)}
                          disabled={form.steps.length === 1}
                          className="px-2 py-1 text-red-400 hover:text-red-300 disabled:opacity-30 text-sm"
                          title="Remove step"
                        >
                          ✕
                        </button>
                      </div>
                    </div>

                    <input
                      type="text"
                      placeholder="Step title *"
                      value={step.title}
                      onChange={(e) =>
                        updateStep(step.id, "title", e.target.value)
                      }
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white placeholder-gray-500 mb-2 focus:outline-none focus:border-orange-400 text-sm"
                    />
                    <input
                      type="text"
                      placeholder="Step description (optional)"
                      value={step.description}
                      onChange={(e) =>
                        updateStep(step.id, "description", e.target.value)
                      }
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-orange-400 text-sm"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Form actions */}
            <div className="flex gap-3 justify-end">
              <button
                onClick={resetForm}
                className="px-5 py-2 rounded-lg border border-gray-600 text-gray-300 hover:bg-gray-800 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="px-6 py-2 rounded-lg font-semibold text-white transition hover:opacity-90 disabled:opacity-50"
                style={{ backgroundColor: "#FF6B35" }}
              >
                {saving ? "Saving…" : editingId ? "Update Workflow" : "Save Workflow"}
              </button>
            </div>
          </div>
        )}

        {/* ── Workflow List ──────────────────────────────────────────────── */}
        {loading ? (
          <div className="text-center py-20 text-gray-400">
            <div className="text-4xl mb-3">⏳</div>
            <p>Loading workflows…</p>
          </div>
        ) : error ? (
          <div className="bg-red-900/30 border border-red-700 rounded-xl p-6 text-center text-red-300">
            <p className="text-lg mb-1">⚠️ Error</p>
            <p className="text-sm">{error}</p>
            <button
              onClick={fetchWorkflows}
              className="mt-4 px-4 py-2 bg-red-700 hover:bg-red-600 rounded-lg text-white text-sm"
            >
              Try Again
            </button>
          </div>
        ) : workflows.length === 0 ? (
          <div className="text-center py-20 text-gray-500">
            <div className="text-5xl mb-4">🔄</div>
            <p className="text-lg font-medium text-gray-400">
              No workflows yet
            </p>
            <p className="text-sm mt-1">
              Click <span className="text-orange-400 font-semibold">+ New Workflow</span> to create your first one.
            </p>
          </div>
        ) : (
          <div className="grid gap-6">
            {workflows.map((wf) => (
              <div
                key={wf._id}
                className="bg-gray-900 border border-gray-700 rounded-2xl p-6 hover:border-orange-500 transition-colors"
              >
                {/* Workflow header */}
                <div className="flex items-start justify-between gap-4 mb-4 flex-wrap">
                  <div>
                    <h3 className="text-xl font-bold text-white">{wf.name}</h3>
                    {wf.description && (
                      <p className="text-gray-400 text-sm mt-1">
                        {wf.description}
                      </p>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(wf)}
                      className="px-3 py-1.5 text-sm rounded-lg border border-gray-600 text-gray-300 hover:bg-gray-700 transition"
                    >
                      ✏️ Edit
                    </button>
                    {deleteConfirm === wf._id ? (
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleDelete(wf._id)}
                          className="px-3 py-1.5 text-sm rounded-lg bg-red-600 hover:bg-red-700 text-white transition"
                        >
                          Confirm Delete
                        </button>
                        <button
                          onClick={() => setDeleteConfirm(null)}
                          className="px-3 py-1.5 text-sm rounded-lg border border-gray-600 text-gray-300 hover:bg-gray-700 transition"
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => setDeleteConfirm(wf._id)}
                        className="px-3 py-1.5 text-sm rounded-lg border border-red-700 text-red-400 hover:bg-red-900/30 transition"
                      >
                        🗑️ Delete
                      </button>
                    )}
                  </div>
                </div>

                {/* Steps visual */}
                {wf.steps && wf.steps.length > 0 && (
                  <div className="flex flex-wrap items-center gap-2">
                    {wf.steps.map((step, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <div
                          className={`px-3 py-1.5 rounded-lg border text-xs font-medium ${getStepStyle(
                            step.type
                          )}`}
                        >
                          <span className="font-mono text-gray-500 mr-1">
                            {i + 1}.
                          </span>
                          {step.title}
                        </div>
                        {i < wf.steps.length - 1 && (
                          <span className="text-gray-600 text-lg">→</span>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {/* Meta */}
                <div className="mt-4 flex items-center gap-4 text-xs text-gray-600">
                  <span>{wf.steps?.length || 0} steps</span>
                  {wf.createdAt && (
                    <span>
                      Created{" "}
                      {new Date(wf.createdAt).toLocaleDateString("en-IN", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                  )}
                  <div className="ml-auto flex gap-2 flex-wrap">
                    {[...new Set(wf.steps?.map((s) => s.type))].map((t) => (
                      <span
                        key={t}
                        className="text-gray-500 text-xs"
                      >
                        {getStepLabel(t)}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}