import { useState, useEffect } from "react";
import axios from "axios";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

const categories = ["All", "Content Creation", "Development", "Automation", "Marketing", "Education"];

export default function WorkflowBuilder() {
  const [workflows, setWorkflows] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [selected, setSelected] = useState(null);
  const [activeCategory, setActiveCategory] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`${API}/api/workflows`)
      .then(res => { setWorkflows(res.data); setFiltered(res.data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (activeCategory === "All") setFiltered(workflows);
    else setFiltered(workflows.filter(w => w.category === activeCategory));
  }, [activeCategory, workflows]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-[#FF6B35] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-gray-600">Loading workflows...</p>
      </div>
    </div>
  );

  if (selected) return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <button onClick={() => setSelected(null)} className="mb-6 flex items-center gap-2 text-[#FF6B35] hover:underline font-medium">
          ← Back to Workflows
        </button>
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="flex items-center gap-3 mb-2">
            <span className="bg-[#FF6B35]/10 text-[#FF6B35] text-sm font-semibold px-3 py-1 rounded-full">{selected.category}</span>
            <span className="bg-gray-100 text-gray-600 text-sm px-3 py-1 rounded-full">{selected.difficulty}</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mt-3 mb-2">{selected.title}</h1>
          <p className="text-gray-600 text-lg">{selected.description}</p>
        </div>

        <div className="space-y-6">
          {selected.steps.map((step, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-md p-6 border-l-4 border-[#FF6B35]">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-[#FF6B35] text-white rounded-full flex items-center justify-center font-bold text-lg shrink-0">
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
                      <p className="text-xs font-semibold text-gray-500 uppercase mb-2">Prompt Template</p>
                      <p className="text-gray-700 text-sm leading-relaxed">{step.promptTemplate}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-12 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">AI Workflow Builder</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">Select a goal and get a step-by-step AI workflow with the best tool for each step.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex gap-3 flex-wrap mb-8">
          {categories.map(cat => (
            <button key={cat} onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full font-medium transition-colors ${activeCategory === cat ? "bg-[#FF6B35] text-white" : "bg-white text-gray-600 border border-gray-200 hover:border-[#FF6B35] hover:text-[#FF6B35]"}`}>
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(workflow => (
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
                <span className="text-[#FF6B35] font-medium text-sm group-hover:translate-x-1 transition-transform inline-block">View Workflow →</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}