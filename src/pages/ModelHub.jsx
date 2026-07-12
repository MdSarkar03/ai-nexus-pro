import { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
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
      {/* Enhanced Header with premium treatment */}
      <div className="bg-white border-b relative overflow-hidden">
        {/* Subtle dot-grid texture */}
        <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_0.8px,transparent_1px)] [background-size:22px_22px] opacity-60 pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto px-4 py-14 relative z-10 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4 tracking-[-2.5px]">
            AI Model <span className="bg-gradient-to-r from-[#FF6B35] via-orange-500 to-amber-500 bg-clip-text text-transparent">Intelligence Hub</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">Compare top LLMs by benchmark scores, pricing, and use cases. Find the right model for your task.</p>
        </div>
      </div>

      <PagePurposeHeader
        title="Choosing The Wrong Model Costs More Than Choosing No Model At All."
        description="Compare AI models based on real-world capabilities, strengths, limitations, and intended use cases."
      />

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Enhanced Compare Bar */}
        {compare.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-r from-[#FF6B35] to-orange-600 text-white rounded-3xl p-5 mb-10 shadow-xl shadow-[#FF6B35]/20 flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <span className="font-semibold text-lg">Comparing:</span>
              {compare.map(m => (
                <span key={m._id} className="bg-white/20 px-4 py-1 rounded-2xl text-sm font-medium backdrop-blur-sm">{m.name}</span>
              ))}
              {compare.length === 1 && <span className="text-white/70 text-sm ml-2">Select one more model to compare</span>}
            </div>
            <div className="flex gap-3">
              {compare.length === 2 && (
                <button 
                  onClick={() => setView("compare")}
                  className="bg-white text-[#FF6B35] px-6 py-2.5 rounded-2xl font-semibold hover:bg-gray-100 transition-all active:scale-[0.985]"
                >
                  Compare Now
                </button>
              )}
              <button 
                onClick={() => { setCompare([]); setView("grid"); }}
                className="bg-white/20 px-6 py-2.5 rounded-2xl font-medium hover:bg-white/30 transition-all active:scale-[0.985]"
              >
                Clear
              </button>
            </div>
          </motion.div>
        )}

        {/* Compare View - Premium Table */}
        {view === "compare" && compare.length === 2 && (
          <div className="bg-white rounded-3xl shadow-xl p-10 mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center tracking-tight">
              {compare[0].name} vs {compare[1].name}
            </h2>
            <div className="grid grid-cols-3 gap-6">
              <div className="font-semibold text-gray-500 flex flex-col gap-5 pt-10 text-sm">
                <div className="h-11 flex items-center">Provider</div>
                <div className="h-11 flex items-center">Context Window</div>
                <div className="h-11 flex items-center">Input Cost /1M</div>
                <div className="h-11 flex items-center">Output Cost /1M</div>
                <div className="h-11 flex items-center">MMLU Score</div>
                <div className="h-11 flex items-center">HumanEval</div>
                <div className="h-11 flex items-center">Math Score</div>
                <div className="h-11 flex items-center">Reasoning</div>
                <div className="h-11 flex items-center">Free Tier</div>
                <div className="h-11 flex items-center">Best For</div>
              </div>
              {compare.map(model => (
                <div key={model._id} className="flex flex-col gap-5">
                  <div className="text-center font-bold text-2xl tracking-tight text-[#FF6B35] h-11 flex items-center justify-center border-b border-gray-100 pb-4">
                    {model.name}
                  </div>
                  <div className="h-11 flex items-center justify-center bg-gray-50/80 border border-gray-100 rounded-2xl">{model.provider}</div>
                  <div className="h-11 flex items-center justify-center bg-gray-50/80 border border-gray-100 rounded-2xl">{model.contextWindow}</div>
                  <div className="h-11 flex items-center justify-center bg-gray-50/80 border border-gray-100 rounded-2xl font-medium">{model.costPer1MInput}</div>
                  <div className="h-11 flex items-center justify-center bg-gray-50/80 border border-gray-100 rounded-2xl font-medium">{model.costPer1MOutput}</div>
                  <div className="h-11 flex items-center justify-center bg-gray-50/80 border border-gray-100 rounded-2xl font-semibold text-blue-600">{model.scores?.mmlu}%</div>
                  <div className="h-11 flex items-center justify-center bg-gray-50/80 border border-gray-100 rounded-2xl font-semibold text-green-600">{model.scores?.humaneval}%</div>
                  <div className="h-11 flex items-center justify-center bg-gray-50/80 border border-gray-100 rounded-2xl font-semibold text-purple-600">{model.scores?.math}%</div>
                  <div className="h-11 flex items-center justify-center bg-gray-50/80 border border-gray-100 rounded-2xl font-semibold text-orange-600">{model.scores?.reasoning}%</div>
                  <div className="h-11 flex items-center justify-center bg-gray-50/80 border border-gray-100 rounded-2xl">
                    {model.free ? <span className="text-green-600 font-semibold">✓ Free</span> : <span className="text-gray-400">Paid</span>}
                  </div>
                  <div className="bg-gray-50/80 border border-gray-100 rounded-2xl p-3 text-sm text-center">{model.bestFor?.slice(0, 2).join(", ")}</div>
                </div>
              ))}
            </div>
            <button 
              onClick={() => setView("grid")} 
              className="mt-10 text-[#FF6B35] hover:underline font-medium flex items-center gap-2"
            >
              ← Back to all models
            </button>
          </div>
        )}

        {/* Grid View - Premium Model Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {models.map((model, index) => (
            <motion.div 
              key={model._id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: Math.min(index * 0.03, 0.2) }}
              className={`bg-white rounded-3xl shadow-sm border p-8 transition-all duration-300 group flex flex-col relative overflow-hidden ${
                compare.find(m => m._id === model._id) 
                  ? "border-[#FF6B35] shadow-md" 
                  : "border-gray-100 hover:border-[#FF6B35]/40 hover:shadow-2xl"
              }`}
            >
              <div className="flex items-start justify-between mb-5">
                <div>
                  <h3 className="text-2xl font-semibold tracking-tight text-gray-900 group-hover:text-[#FF6B35] transition-colors">{model.name}</h3>
                  <p className="text-gray-500 text-sm mt-1">{model.provider}</p>
                </div>
                {model.free && (
                  <span className="bg-emerald-100 text-emerald-700 text-xs font-semibold px-3 py-1 rounded-2xl shrink-0">Free</span>
                )}
              </div>

              <p className="text-gray-600 text-[15px] mb-6 line-clamp-2 leading-relaxed flex-1">{model.description}</p>

              {/* Enhanced Score Boxes */}
              <div className="grid grid-cols-2 gap-3 mb-7">
                {[
                  { label: "MMLU", value: model.scores?.mmlu, color: "blue" },
                  { label: "HumanEval", value: model.scores?.humaneval, color: "green" },
                  { label: "Math", value: model.scores?.math, color: "purple" },
                  { label: "Reasoning", value: model.scores?.reasoning, color: "orange" },
                ].map(score => (
                  <div 
                    key={score.label} 
                    className="bg-gray-50 border border-gray-100 rounded-2xl p-4 text-center hover:bg-white transition-colors"
                  >
                    <div className={`text-2xl font-bold text-${score.color}-600`}>{score.value}%</div>
                    <div className="text-xs text-gray-500 mt-1 font-medium tracking-wide">{score.label}</div>
                  </div>
                ))}
              </div>

              {/* Pricing Mini Table */}
              <div className="bg-gray-50 border border-gray-100 rounded-2xl p-5 mb-6 text-sm space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-500">Input /1M tokens</span>
                  <span className="font-semibold text-gray-900">{model.costPer1MInput}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Output /1M tokens</span>
                  <span className="font-semibold text-gray-900">{model.costPer1MOutput}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Context Window</span>
                  <span className="font-semibold text-gray-900">{model.contextWindow}</span>
                </div>
              </div>

              {/* Best For Tags */}
              <div className="flex flex-wrap gap-2 mb-8">
                {model.bestFor?.slice(0, 3).map(use => (
                  <span key={use} className="bg-[#FF6B35]/10 text-[#FF6B35] text-xs px-3 py-1 rounded-2xl font-medium">{use}</span>
                ))}
              </div>

              {/* Actions */}
              <div className="flex gap-3 mt-auto">
                <button 
                  onClick={() => setSelected(selected?._id === model._id ? null : model)}
                  className="flex-1 border border-[#FF6B35] text-[#FF6B35] py-3 rounded-2xl font-semibold hover:bg-[#FF6B35]/5 active:bg-[#FF6B35]/10 transition-all text-sm tracking-wide"
                >
                  {selected?._id === model._id ? "Hide Details" : "View Details"}
                </button>
                <button 
                  onClick={() => toggleCompare(model)}
                  className={`flex-1 py-3 rounded-2xl font-semibold transition-all text-sm tracking-wide ${
                    compare.find(m => m._id === model._id) 
                      ? "bg-[#FF6B35] text-white shadow-md" 
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200 active:bg-gray-300"
                  }`}
                >
                  {compare.find(m => m._id === model._id) ? "✓ Added" : "+ Compare"}
                </button>
              </div>

              {/* Expanded Details */}
              {selected?._id === model._id && (
                <div className="mt-8 pt-6 border-t border-gray-100">
                  <div className="mb-6">
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-[1px] mb-3">Strengths</p>
                    <ul className="space-y-2">
                      {model.strengths?.map(s => (
                        <li key={s} className="text-sm text-gray-700 flex items-start gap-2.5">
                          <span className="text-green-500 mt-0.5">✓</span>{s}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-[1px] mb-3">Weaknesses</p>
                    <ul className="space-y-2">
                      {model.weaknesses?.map(w => (
                        <li key={w} className="text-sm text-gray-700 flex items-start gap-2.5">
                          <span className="text-red-400 mt-0.5">✗</span>{w}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}