import { useState } from "react";
import { aiTools } from "@/lib/ai-tools-data.js";
import { Button } from "@/components/ui/Button.jsx";
import { cn } from "@/lib/utils.js";

export default function ComparePage() {
  const [selectedTools, setSelectedTools] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const addTool = (tool) => {
    if (
      selectedTools.length < 3 &&
      !selectedTools.find((t) => t.id === tool.id)
    ) {
      setSelectedTools([...selectedTools, tool]);
      setDropdownOpen(false);
    }
  };

  const removeTool = (toolId) => {
    setSelectedTools(selectedTools.filter((t) => t.id !== toolId));
  };

  const resetComparison = () => {
    setSelectedTools([]);
  };

  const getCategoryColor = (category) => {
    const colors = {
      "Text Generation": "bg-purple-100 text-purple-700",
      "Image Generation": "bg-pink-100 text-pink-700",
      "Video Generation": "bg-red-100 text-red-700",
      "Audio Tools": "bg-green-100 text-green-700",
      "Code Assistants": "bg-blue-100 text-blue-700",
      Productivity: "bg-yellow-100 text-yellow-700",
      Research: "bg-teal-100 text-teal-700",
    };
    return colors[category] || "bg-gray-100 text-gray-700";
  };

  const getPricingColor = (pricing) => {
    const colors = {
      Free: "bg-green-100 text-green-700",
      Freemium: "bg-blue-100 text-blue-700",
      Paid: "bg-orange-100 text-orange-700",
    };
    return colors[pricing] || "bg-gray-100 text-gray-700";
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-[#3B82F6] mb-4">
            Compare AI Tools Side by Side
          </h1>
          <p className="text-xl text-gray-600">
            Select up to 3 tools to compare their features
          </p>
        </div>

        <div className="mb-8">
          <div className="relative">
            <Button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              disabled={selectedTools.length >= 3}
              className="bg-[#FF6B35] hover:bg-[#FF5722] text-white px-8 py-6 text-lg disabled:opacity-50"
            >
              + Add Tool to Compare
            </Button>

            {dropdownOpen && (
              <div className="absolute top-full mt-2 w-full max-w-md bg-white rounded-lg shadow-xl border max-h-96 overflow-y-auto z-10">
                {aiTools.map((tool) => (
                  <button
                    key={tool.id}
                    onClick={() => addTool(tool)}
                    disabled={
                      selectedTools.find((t) => t.id === tool.id) !== undefined
                    }
                    className="w-full flex items-center gap-3 p-4 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed border-b"
                  >
                    <img
                      src={tool.logo || "/placeholder.svg"}
                      alt={tool.name}
                      className="w-10 h-10 rounded object-contain"
                    />
                    <div className="flex-1 text-left">
                      <p className="font-medium text-gray-900">{tool.name}</p>
                      <span
                        className={cn(
                          "text-xs px-2 py-0.5 rounded-full inline-block mt-1",
                          getCategoryColor(tool.category)
                        )}
                      >
                        {tool.category}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {selectedTools.length > 0 && (
            <div className="flex flex-wrap gap-3 mt-4">
              {selectedTools.map((tool) => (
                <div
                  key={tool.id}
                  className="flex items-center gap-2 bg-[#FF6B35] text-white px-4 py-2 rounded-full"
                >
                  <span>{tool.name}</span>
                  <button
                    onClick={() => removeTool(tool.id)}
                    className="hover:bg-white/20 rounded-full px-2"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}

          {selectedTools.length >= 3 && (
            <p className="text-[#FF6B35] mt-4 flex items-center gap-2">
              <span>⚠️</span>
              Maximum 3 tools selected
            </p>
          )}
        </div>

        {selectedTools.length >= 2 ? (
          <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="p-4 text-left font-bold text-gray-900 sticky left-0 bg-gray-50">
                      Attribute
                    </th>
                    {selectedTools.map((tool) => (
                      <th
                        key={tool.id}
                        className="p-4 text-center min-w-[250px]"
                      >
                        <div className="flex flex-col items-center gap-2">
                          <img
                            src={tool.logo || "/placeholder.svg"}
                            alt={tool.name}
                            className="w-12 h-12 rounded object-contain"
                          />
                          <span className="font-bold text-gray-900">
                            {tool.name}
                          </span>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t">
                    <td className="p-4 font-semibold text-gray-700 sticky left-0 bg-white">
                      Category
                    </td>
                    {selectedTools.map((tool) => (
                      <td key={tool.id} className="p-4 text-center">
                        <span
                          className={cn(
                            "px-3 py-1 rounded-full text-sm font-medium inline-block",
                            getCategoryColor(tool.category)
                          )}
                        >
                          {tool.category}
                        </span>
                      </td>
                    ))}
                  </tr>
                  <tr className="border-t bg-gray-50">
                    <td className="p-4 font-semibold text-gray-700 sticky left-0 bg-gray-50">
                      Description
                    </td>
                    {selectedTools.map((tool) => (
                      <td key={tool.id} className="p-4 text-gray-600">
                        {tool.description}
                      </td>
                    ))}
                  </tr>
                  <tr className="border-t">
                    <td className="p-4 font-semibold text-gray-700 sticky left-0 bg-white">
                      Features
                    </td>
                    {selectedTools.map((tool) => (
                      <td key={tool.id} className="p-4">
                        <ul className="space-y-2">
                          {tool.features.map((feature, idx) => (
                            <li
                              key={idx}
                              className="flex items-start gap-2 text-gray-600"
                            >
                              <span className="text-green-500">✓</span>
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </td>
                    ))}
                  </tr>
                  <tr className="border-t bg-gray-50">
                    <td className="p-4 font-semibold text-gray-700 sticky left-0 bg-gray-50">
                      Pricing
                    </td>
                    {selectedTools.map((tool) => (
                      <td key={tool.id} className="p-4 text-center">
                        <span
                          className={cn(
                            "px-3 py-1 rounded-full text-sm font-medium inline-block",
                            getPricingColor(tool.pricing)
                          )}
                        >
                          {tool.pricing}
                        </span>
                      </td>
                    ))}
                  </tr>
                  <tr className="border-t">
                    <td className="p-4 font-semibold text-gray-700 sticky left-0 bg-white">
                      Rating
                    </td>
                    {selectedTools.map((tool) => (
                      <td key={tool.id} className="p-4 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <span className="text-yellow-500 text-xl">
                            {"★".repeat(Math.floor(tool.rating))}
                          </span>
                          <span className="text-gray-700 font-medium">
                            {tool.rating}
                          </span>
                        </div>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="p-4 border-t bg-gray-50 text-center">
              <Button
                onClick={resetComparison}
                variant="outline"
                className="hover:bg-gray-100 bg-transparent"
              >
                Reset Comparison
              </Button>
            </div>
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-xl shadow-lg">
            <div className="text-6xl mb-4">⚖️</div>
            <p className="text-xl text-gray-600 mb-2">
              Select at least 2 tools to start comparing
            </p>
            <p className="text-gray-500">Use the button above to add tools</p>
          </div>
        )}
      </div>
    </div>
  );
}
