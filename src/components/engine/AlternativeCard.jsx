import React from 'react';
import { Award, Target, Zap, Brain } from 'lucide-react';

const AlternativeCard = ({ alternative }) => {
  if (!alternative) {
    return null;
  }

  const name = alternative?.name || 'Unnamed Alternative';
  const type = alternative?.type || alternative?.category || 'General';
  const score = alternative?.score !== undefined ? alternative.score : null;
  const confidence = alternative?.confidence !== undefined ? alternative.confidence : null;
  const reasoning = alternative?.reasoning || alternative?.explanation || alternative?.description || 'No reasoning provided.';

  const scorePercentage = score !== null ? Math.min(Math.max(Math.round(score), 0), 100) : null;
  const confidencePercentage = confidence !== null ? Math.min(Math.max(Math.round(confidence), 0), 100) : null;

  const getScoreColor = (val) => {
    if (val >= 80) return 'text-emerald-500';
    if (val >= 60) return 'text-amber-500';
    return 'text-rose-500';
  };

  const getConfidenceColor = (val) => {
    if (val >= 80) return 'bg-emerald-500';
    if (val >= 60) return 'bg-amber-500';
    return 'bg-rose-500';
  };

  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group">
      {/* Header */}
      <div className="p-6 border-b border-gray-100 dark:border-gray-700 flex items-start justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center flex-shrink-0">
            <Award className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-xl text-gray-900 dark:text-white tracking-tight">
              {name}
            </h3>
            <div className="flex items-center gap-2 mt-1">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300">
                {type}
              </span>
            </div>
          </div>
        </div>
        
        {scorePercentage !== null && (
          <div className="text-right">
            <div className={`text-4xl font-bold ${getScoreColor(scorePercentage)} tabular-nums`}>
              {scorePercentage}
              <span className="text-2xl align-super">%</span>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 -mt-1">SCORE</p>
          </div>
        )}
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-2 gap-px bg-gray-100 dark:bg-gray-700">
        {confidencePercentage !== null && (
          <div className="bg-white dark:bg-gray-800 p-4">
            <div className="flex items-center gap-2 mb-3">
              <Target className="w-4 h-4 text-indigo-500" />
              <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Confidence</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex-1 h-2.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div 
                  className={`h-full ${getConfidenceColor(confidencePercentage)} transition-all duration-500 rounded-full`}
                  style={{ width: `${confidencePercentage}%` }}
                />
              </div>
              <span className="font-mono text-sm font-semibold text-gray-700 dark:text-gray-300 w-12 text-right">
                {confidencePercentage}%
              </span>
            </div>
          </div>
        )}

        <div className="bg-white dark:bg-gray-800 p-4">
          <div className="flex items-center gap-2 mb-3">
            <Zap className="w-4 h-4 text-amber-500" />
            <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Key Factors</span>
          </div>
          <div className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2">
            {reasoning.substring(0, 120)}{reasoning.length > 120 ? '...' : ''}
          </div>
        </div>
      </div>

      {/* Reasoning Section */}
      <div className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <Brain className="w-4 h-4 text-violet-500" />
          <span className="uppercase text-xs tracking-widest font-semibold text-gray-500 dark:text-gray-400">Reasoning</span>
        </div>
        
        <div className="prose prose-sm dark:prose-invert text-gray-600 dark:text-gray-300 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
          {reasoning}
        </div>

        {/* Optional tags or additional info */}
        {(alternative?.strengths || alternative?.tags) && (
          <div className="mt-6 pt-6 border-t border-gray-100 dark:border-gray-700">
            <div className="flex flex-wrap gap-2">
              {Array.isArray(alternative.strengths) && alternative.strengths.slice(0, 3).map((strength, idx) => (
                <span 
                  key={idx}
                  className="inline-flex items-center px-3 py-1 text-[10px] font-medium rounded-lg bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400"
                >
                  ✓ {strength}
                </span>
              ))}
              {Array.isArray(alternative.tags) && alternative.tags.slice(0, 3).map((tag, idx) => (
                <span 
                  key={idx}
                  className="inline-flex items-center px-2.5 py-1 text-[10px] font-medium rounded-md bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="px-6 py-4 bg-gray-50 dark:bg-gray-900/50 border-t border-gray-100 dark:border-gray-700 flex items-center justify-between text-xs">
        <div className="flex items-center text-gray-400 dark:text-gray-500">
          <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mr-1.5 animate-pulse" />
          AI Evaluated
        </div>
        
        <button 
          className="text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300 font-medium flex items-center gap-1 transition-colors group-hover:translate-x-0.5"
          onClick={() => {/* Add to comparison or details handler - implement as needed */}}
        >
          View Details
          <span className="text-lg leading-none">→</span>
        </button>
      </div>
    </div>
  );
};

export default AlternativeCard;