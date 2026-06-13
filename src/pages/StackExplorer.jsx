import { useState, useEffect } from "react";
import axios from "axios";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

const roles = ["All", "Developer", "Content Creator", "Designer", "Student", "Marketer"];

export default function StackExplorer() {
  const [stacks, setStacks] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [activeRole, setActiveRole] = useState("All");
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`${API}/api/stacks`)
      .then(res => { setStacks(res.data); setFiltered(res.data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (activeRole === "All") setFiltered(stacks);
    else setFiltered(stacks.filter(s => s.role === activeRole));
  }, [activeRole, stacks]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-[#FF6B35] border-t-transparent rounded-full animate-spin mx-auto"></div>
    </div>
  );

  if (selected) return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <button onClick={() => setSelected(null)} className="mb-6 flex items-center gap-2 text-[#FF6B35] hover:underline font-medium">
          ← Back to Stacks
        </button>

        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="flex items-center gap-3 mb-3">
            <span className="bg-[#FF6B35]/10 text-[#FF6B35] text-sm font-semibold px-3 py-1 rounded-full">{selected.role}</span>
            <span className="bg-gray-100 text-gray-600 text-sm px-3 py-1 rounded-full">{selected.difficulty}</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{selected.title}</h1>
          <p className="text-gray-600 text-lg">{selected.description}</p>
        </div>

        <div className="space-y-4">
          {selected.tools.map((tool, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-md p-6 flex items-start gap-4 border-l-4 border-[#FF6B35]">
              <div className="w-10 h-10 bg-[#FF6B35]/10 text-[#FF6B35] rounded-full flex items-center justify-center font-bold shrink-0">
                {index + 1}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-1">
                  <h3 className="text-lg font-bold text-gray-900">{tool.toolName}</h3>
                  <span className="bg-gray-100 text-gray-500 text-xs px-2 py-1 rounded-full">{tool.category}</span>
                  <a href={tool.toolUrl} target="_blank" rel="noopener noreferrer"
                    className="bg-[#FF6B35] text-white text-xs px-3 py-1 rounded-full hover:bg-[#FF5722] transition-colors">
                    Visit ↗
                  </a>
                </div>
                <p className="text-gray-600 text-sm">{tool.purpose}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 bg-[#FF6B35]/5 border border-[#FF6B35]/20 rounded-2xl p-6">
          <h3 className="font-bold text-gray-900 mb-2">Tags</h3>
          <div className="flex flex-wrap gap-2">
            {selected.tags?.map(tag => (
              <span key={tag} className="bg-white border border-gray-200 text-gray-600 text-sm px-3 py-1 rounded-full">{tag}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-12 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Stack Explorer</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">Discover curated AI tool combinations for your role. See exactly which tools work together and why.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex gap-3 flex-wrap mb-8">
          {roles.map(role => (
            <button key={role} onClick={() => setActiveRole(role)}
              className={`px-4 py-2 rounded-full font-medium transition-colors ${activeRole === role ? "bg-[#FF6B35] text-white" : "bg-white text-gray-600 border border-gray-200 hover:border-[#FF6B35] hover:text-[#FF6B35]"}`}>
              {role}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(stack => (
            <div key={stack._id} onClick={() => setSelected(stack)}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all cursor-pointer border border-gray-100 hover:border-[#FF6B35] p-6 group">
              <div className="flex items-center gap-2 mb-3">
                <span className="bg-[#FF6B35]/10 text-[#FF6B35] text-xs font-semibold px-3 py-1 rounded-full">{stack.role}</span>
                <span className="bg-gray-100 text-gray-500 text-xs px-3 py-1 rounded-full">{stack.difficulty}</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-[#FF6B35] transition-colors">{stack.title}</h3>
              <p className="text-gray-600 text-sm mb-4 line-clamp-2">{stack.description}</p>

              <div className="flex flex-wrap gap-1 mb-4">
                {stack.tools?.slice(0, 3).map(tool => (
                  <span key={tool.toolName} className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">{tool.toolName}</span>
                ))}
                {stack.tools?.length > 3 && (
                  <span className="bg-gray-100 text-gray-500 text-xs px-2 py-1 rounded-full">+{stack.tools.length - 3} more</span>
                )}
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">{stack.tools?.length} tools</span>
                <span className="text-[#FF6B35] font-medium text-sm group-hover:translate-x-1 transition-transform inline-block">View Stack →</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}