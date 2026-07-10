import React, { useState } from 'react';
import { Send, Target, Plus, X } from 'lucide-react';

const GoalInput = ({ onSubmit, loading }) => {
  const [goal, setGoal] = useState('');
  const [constraints, setConstraints] = useState([]);
  const [newConstraint, setNewConstraint] = useState('');
  const [preferences, setPreferences] = useState({
    budget: 'medium',
    timeline: 'medium',
    scalability: 'high',
    complexity: 'medium',
  });
  const [context, setContext] = useState({
    industry: '',
    teamSize: '',
    techStack: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!goal.trim()) {
      alert("Please enter a clear goal for your architecture.");
      return;
    }

    const formData = {
      goal: goal.trim(),
      constraints,
      preferences,
      context,
    };

    onSubmit(formData);
  };

  const addConstraint = () => {
    if (newConstraint.trim()) {
      setConstraints([...constraints, newConstraint.trim()]);
      setNewConstraint('');
    }
  };

  const removeConstraint = (index) => {
    setConstraints(constraints.filter((_, i) => i !== index));
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (newConstraint.trim()) {
        addConstraint();
      } else if (goal.trim()) {
        handleSubmit(e);
      }
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
      <div className="p-8">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/50 rounded-2xl flex items-center justify-center">
            <Target className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <h2 className="text-3xl font-semibold text-gray-900 dark:text-white">Define Your Architecture Goal</h2>
            <p className="text-gray-600 dark:text-gray-400 mt-1">Be specific about what you want to achieve</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Main Goal */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              What is your primary goal?
            </label>
            <textarea
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Build a scalable real-time analytics dashboard for 10k concurrent users..."
              className="w-full min-h-[140px] p-5 text-lg bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-y transition-all"
              disabled={loading}
            />
          </div>

          {/* Constraints */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              Constraints
            </label>
            <div className="flex gap-3 mb-4">
              <input
                type="text"
                value={newConstraint}
                onChange={(e) => setNewConstraint(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addConstraint())}
                placeholder="e.g., Must use open source tools"
                className="flex-1 px-5 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={loading}
              />
              <button
                type="button"
                onClick={addConstraint}
                disabled={!newConstraint.trim() || loading}
                className="px-6 py-3 bg-gray-900 dark:bg-white dark:text-gray-900 text-white rounded-2xl hover:bg-gray-800 transition-colors disabled:opacity-50 flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Add
              </button>
            </div>

            {constraints.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {constraints.map((constraint, index) => (
                  <div
                    key={index}
                    className="group flex items-center gap-2 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-4 py-2 rounded-2xl text-sm pr-2"
                  >
                    <span>{constraint}</span>
                    <button
                      type="button"
                      onClick={() => removeConstraint(index)}
                      className="text-gray-400 hover:text-red-500 transition-colors p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600"
                      disabled={loading}
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Preferences */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Budget Preference</label>
              <select
                value={preferences.budget}
                onChange={(e) => setPreferences({ ...preferences, budget: e.target.value })}
                className="w-full px-5 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl focus:ring-2 focus:ring-blue-500"
                disabled={loading}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Timeline</label>
              <select
                value={preferences.timeline}
                onChange={(e) => setPreferences({ ...preferences, timeline: e.target.value })}
                className="w-full px-5 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl focus:ring-2 focus:ring-blue-500"
                disabled={loading}
              >
                <option value="short">Short (weeks)</option>
                <option value="medium">Medium (months)</option>
                <option value="long">Long (quarters+)</option>
              </select>
            </div>
          </div>

          {/* Additional Context */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Additional Context (Optional)</label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input
                type="text"
                placeholder="Industry / Domain"
                value={context.industry}
                onChange={(e) => setContext({ ...context, industry: e.target.value })}
                className="px-5 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl"
                disabled={loading}
              />
              <input
                type="text"
                placeholder="Team Size"
                value={context.teamSize}
                onChange={(e) => setContext({ ...context, teamSize: e.target.value })}
                className="px-5 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl"
                disabled={loading}
              />
              <input
                type="text"
                placeholder="Preferred Tech Stack"
                value={context.techStack}
                onChange={(e) => setContext({ ...context, techStack: e.target.value })}
                className="px-5 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl"
                disabled={loading}
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading || !goal.trim()}
            className="w-full mt-6 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:from-gray-400 disabled:to-gray-500 text-white text-lg font-semibold rounded-2xl flex items-center justify-center gap-3 transition-all active:scale-[0.985] shadow-lg shadow-blue-500/30"
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Analyzing Requirements...
              </>
            ) : (
              <>
                Generate Architecture Recommendations
                <Send className="w-5 h-5" />
              </>
            )}
          </button>
        </form>
      </div>

      <div className="border-t border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50 px-8 py-4 text-xs text-gray-500 dark:text-gray-400 flex items-center gap-2">
        <span>💡</span>
        <span>The more specific your goal, the better the recommendations</span>
      </div>
    </div>
  );
};

export default GoalInput;