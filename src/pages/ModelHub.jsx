import { useState, useEffect } from "react";
import axios from "axios";
import PagePurposeHeader from "../components/PagePurposeHeader";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function ModelHub() {
  const [models, setModels] = useState([]);
  const [selected, setSelected] = useState(null);
  const [compare, setCompare] = useState([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState("grid");

  useEffect(() => {
    axios.get(`${API}/api/models`)
      .then(res => { setModels(res.data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const toggleCompare = (model) => {
    if (compare.find(m => m._id === model._id)) {
      setCompare(compare.filter(m => m._id !== model._id));
    } else if (compare.length < 2) {
      setCompare([...compare, model]);
    }
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-[#FF6B35] border-t-transparent rounded-full animate-spin mx-auto"></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-12 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">AI Model Intelligence Hub</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">Compare top LLMs by benchmark scores, pricing, and use cases. Find the right model for your task.</p>
        </div>
      </div>
      <PagePurposeHeader
  title="Choosing The Wrong Model Costs More Than Choosing No Model At All."
  description="Compare AI models based on real-world capabilities, strengths, limitations, and intended use cases."
/>

      <div className="max-w-7xl mx-auto px-4 py-8">

        {/* Compare Bar */}
        {compare.length > 0 && (
          <div className="bg-[#FF6B35] text-white rounded-2xl p-4 mb-8 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="font-semibold">Comparing:</span>
              {compare.map(m => (
                <span key={m._id} className="bg-white/20 px-3 py-1 rounded-full text-sm font-medium">{m.name}</span>
              ))}
              {compare.length === 1 && <span className="text-white/70 text-sm">Select one more model to compare</span>}
            </div>
            <div className="flex gap-3">
              {compare.length === 2 && (
                <button onClick={() => setView("compare")}
                  className="bg-white text-[#FF6B35] px-4 py-2 rounded-full font-semibold hover:bg-gray-100 transition-colors">
                  Compare Now
                </button>
              )}
              <button onClick={() => { setCompare([]); setView("grid"); }}
                className="bg-white/20 px-4 py-2 rounded-full font-medium hover:bg-white/30 transition-colors">
                Clear
              </button>
            </div>
          </div>
        )}

        {/* Compare View */}
        {view === "compare" && compare.length === 2 && (
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              {compare[0].name} vs {compare[1].name}
            </h2>
            <div className="grid grid-cols-3 gap-4">
              <div className="font-semibold text-gray-500 flex flex-col gap-4 pt-8">
                <div className="h-10 flex items-center">Provider</div>
                <div className="h-10 flex items-center">Context Window</div>
                <div className="h-10 flex items-center">Input Cost /1M</div>
                <div className="h-10 flex items-center">Output Cost /1M</div>
                <div className="h-10 flex items-center">MMLU Score</div>
                <div className="h-10 flex items-center">HumanEval</div>
                <div className="h-10 flex items-center">Math Score</div>
                <div className="h-10 flex items-center">Reasoning</div>
                <div className="h-10 flex items-center">Free Tier</div>
                <div className="h-10 flex items-center">Best For</div>
              </div>
              {compare.map(model => (
                <div key={model._id} className="flex flex-col gap-4">
                  <div className="text-center font-bold text-lg text-[#FF6B35] h-8 flex items-center justify-center">{model.name}</div>
                  <div className="h-10 flex items-center justify-center bg-gray-50 rounded-lg">{model.provider}</div>
                  <div className="h-10 flex items-center justify-center bg-gray-50 rounded-lg">{model.contextWindow}</div>
                  <div className="h-10 flex items-center justify-center bg-gray-50 rounded-lg">{model.costPer1MInput}</div>
                  <div className="h-10 flex items-center justify-center bg-gray-50 rounded-lg">{model.costPer1MOutput}</div>
                  <div className="h-10 flex items-center justify-center bg-gray-50 rounded-lg font-semibold text-blue-600">{model.scores?.mmlu}%</div>
                  <div className="h-10 flex items-center justify-center bg-gray-50 rounded-lg font-semibold text-green-600">{model.scores?.humaneval}%</div>
                  <div className="h-10 flex items-center justify-center bg-gray-50 rounded-lg font-semibold text-purple-600">{model.scores?.math}%</div>
                  <div className="h-10 flex items-center justify-center bg-gray-50 rounded-lg font-semibold text-orange-600">{model.scores?.reasoning}%</div>
                  <div className="h-10 flex items-center justify-center bg-gray-50 rounded-lg">
                    {model.free ? <span className="text-green-600 font-semibold">✓ Free</span> : <span className="text-gray-400">Paid</span>}
                  </div>
                  <div className="bg-gray-50 rounded-lg p-2 text-sm text-center">{model.bestFor?.slice(0, 2).join(", ")}</div>
                </div>
              ))}
            </div>
            <button onClick={() => setView("grid")} className="mt-6 text-[#FF6B35] hover:underline font-medium">← Back to all models</button>
          </div>
        )}

        {/* Grid View */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {models.map(model => (
            <div key={model._id}
              className={`bg-white rounded-2xl shadow-md hover:shadow-xl transition-all border-2 p-6 ${compare.find(m => m._id === model._id) ? "border-[#FF6B35]" : "border-transparent"}`}>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{model.name}</h3>
                  <p className="text-gray-500 text-sm">{model.provider}</p>
                </div>
                {model.free && <span className="bg-green-100 text-green-700 text-xs font-semibold px-2 py-1 rounded-full">Free</span>}
              </div>

              <p className="text-gray-600 text-sm mb-4 line-clamp-2">{model.description}</p>

              {/* Scores */}
              <div className="grid grid-cols-2 gap-2 mb-4">
                {[
                  { label: "MMLU", value: model.scores?.mmlu, color: "blue" },
                  { label: "HumanEval", value: model.scores?.humaneval, color: "green" },
                  { label: "Math", value: model.scores?.math, color: "purple" },
                  { label: "Reasoning", value: model.scores?.reasoning, color: "orange" },
                ].map(score => (
                  <div key={score.label} className="bg-gray-50 rounded-lg p-2 text-center">
                    <div className={`text-lg font-bold text-${score.color}-600`}>{score.value}%</div>
                    <div className="text-xs text-gray-500">{score.label}</div>
                  </div>
                ))}
              </div>

              {/* Pricing */}
              <div className="bg-gray-50 rounded-lg p-3 mb-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Input /1M tokens</span>
                  <span className="font-semibold">{model.costPer1MInput}</span>
                </div>
                <div className="flex justify-between mt-1">
                  <span className="text-gray-500">Output /1M tokens</span>
                  <span className="font-semibold">{model.costPer1MOutput}</span>
                </div>
                <div className="flex justify-between mt-1">
                  <span className="text-gray-500">Context</span>
                  <span className="font-semibold">{model.contextWindow}</span>
                </div>
              </div>

              {/* Best For */}
              <div className="flex flex-wrap gap-1 mb-4">
                {model.bestFor?.slice(0, 3).map(use => (
                  <span key={use} className="bg-[#FF6B35]/10 text-[#FF6B35] text-xs px-2 py-1 rounded-full">{use}</span>
                ))}
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <button onClick={() => setSelected(selected?._id === model._id ? null : model)}
                  className="flex-1 border border-[#FF6B35] text-[#FF6B35] py-2 rounded-xl font-medium hover:bg-[#FF6B35]/5 transition-colors text-sm">
                  {selected?._id === model._id ? "Hide Details" : "View Details"}
                </button>
                <button onClick={() => toggleCompare(model)}
                  className={`flex-1 py-2 rounded-xl font-medium transition-colors text-sm ${compare.find(m => m._id === model._id) ? "bg-[#FF6B35] text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}>
                  {compare.find(m => m._id === model._id) ? "✓ Added" : "+ Compare"}
                </button>
              </div>

              {/* Expanded Details */}
              {selected?._id === model._id && (
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <div className="mb-3">
                    <p className="text-xs font-semibold text-gray-500 uppercase mb-2">Strengths</p>
                    <ul className="space-y-1">
                      {model.strengths?.map(s => <li key={s} className="text-sm text-gray-700 flex items-center gap-2"><span className="text-green-500">✓</span>{s}</li>)}
                    </ul>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-500 uppercase mb-2">Weaknesses</p>
                    <ul className="space-y-1">
                      {model.weaknesses?.map(w => <li key={w} className="text-sm text-gray-700 flex items-center gap-2"><span className="text-red-400">✗</span>{w}</li>)}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}