import React from 'react';
import { Award, TrendingUp, AlertTriangle, Info, ChevronDown, ChevronUp } from 'lucide-react';
import ScoreBar from './ScoreBar';
import AlternativeCard from './AlternativeCard';

const RecommendationCard = ({ recommendation }) => {
  if (!recommendation) {
    return (
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl p-8 text-center">
        <div className="mx-auto w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-4">
          <Info className="w-8 h-8 text-gray-400" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No Recommendation Available</h3>
        <p className="text-gray-500 dark:text-gray-400">Please provide more details or try again later.</p>
      </div>
    );
  }

  const {
    id,
    name,
    type,
    score = 0,
    confidence = 0,
    reasoning = '',
    explanation = '',
    alternatives = [],
    tradeoffs = [],
    fitScore,
    metadata = {}
  } = recommendation;

  const [showDetails, setShowDetails] = React.useState(false);
  const [showAlternatives, setShowAlternatives] = React.useState(false);

  // Safe score display
  const displayScore = typeof score === 'number' ? Math.round(score) : 0;
  const displayConfidence = typeof confidence === 'number' ? Math.round(confidence) : 0;
  const displayFitScore = fitScore !== undefined ? Math.round(fitScore) : displayScore;

  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
      {/* Header */}
      <div className="px-6 pt-6 pb-4 border-b border-gray-100 dark:border-gray-800 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white dark:bg-gray-800 rounded-xl shadow-sm">
                <Award className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">
                  {name || 'Unnamed Recommendation'}
                </h3>
                <div className="flex items-center gap-2 mt-1">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-300">
                    {type || 'General'}
                  </span>
                  {metadata?.category && (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400">
                      {metadata.category}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Score Indicators */}
          <div className="flex flex-col items-end gap-3">
            <div className="flex items-center gap-2">
              <div className="text-right">
                <div className="text-sm text-gray-500 dark:text-gray-400">Fit Score</div>
                <div className="text-3xl font-semibold text-emerald-600 dark:text-emerald-400 tabular-nums">
                  {displayFitScore}
                </div>
              </div>
              <div className="w-16">
                <ScoreBar score={displayFitScore} size="lg" />
              </div>
            </div>

            {displayConfidence > 0 && (
              <div className="flex items-center gap-1.5 text-xs">
                <div className="px-2.5 py-0.5 bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-400 rounded-full flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  {displayConfidence}% Confidence
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6 space-y-8">
        {/* Reasoning */}
        {reasoning && (
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
              <h4 className="font-semibold text-gray-900 dark:text-white">Key Reasoning</h4>
            </div>
            <div className="prose prose-sm dark:prose-invert text-gray-600 dark:text-gray-300 max-w-none">
              {reasoning}
            </div>
          </div>
        )}

        {/* Explanation */}
        {explanation && (
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <h4 className="font-semibold text-gray-900 dark:text-white">Detailed Explanation</h4>
              </div>
              <button
                onClick={() => setShowDetails(!showDetails)}
                className="flex items-center gap-1 text-xs text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
              >
                {showDetails ? (
                  <>Hide <ChevronUp className="w-3 h-3" /></>
                ) : (
                  <>Show full <ChevronDown className="w-3 h-3" /></>
                )}
              </button>
            </div>
            
            <div className={`prose prose-sm dark:prose-invert text-gray-600 dark:text-gray-300 overflow-hidden transition-all duration-300 ${showDetails ? 'max-h-none' : 'max-h-32 line-clamp-5'}`}>
              {explanation}
            </div>
          </div>
        )}

        {/* Tradeoffs */}
        {tradeoffs && tradeoffs.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-3">
              <AlertTriangle className="w-4 h-4 text-amber-500" />
              <h4 className="font-semibold text-gray-900 dark:text-white">Tradeoffs</h4>
            </div>
            <div className="grid gap-3">
              {tradeoffs.slice(0, 3).map((tradeoff, index) => (
                <div key={index} className="flex gap-3 bg-amber-50 dark:bg-amber-950/50 border border-amber-100 dark:border-amber-900 rounded-xl p-4 text-sm">
                  <div className="text-amber-500 mt-0.5">⚠️</div>
                  <div className="text-amber-700 dark:text-amber-300">{tradeoff}</div>
                </div>
              ))}
              {tradeoffs.length > 3 && (
                <p className="text-xs text-gray-400 text-center">+{tradeoffs.length - 3} more tradeoffs</p>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Alternatives Section */}
      {alternatives && alternatives.length > 0 && (
        <div className="border-t border-gray-100 dark:border-gray-800 px-6 py-5 bg-gray-50 dark:bg-gray-950">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
              Alternative Options
              <span className="text-xs px-2 py-0.5 bg-white dark:bg-gray-800 text-gray-500 rounded-full">{alternatives.length}</span>
            </h4>
            <button
              onClick={() => setShowAlternatives(!showAlternatives)}
              className="text-sm text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 flex items-center gap-1"
            >
              {showAlternatives ? 'Hide' : 'View All'}
              {showAlternatives ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          </div>

          <div className={`grid gap-4 transition-all ${showAlternatives ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2'}`}>
            {alternatives.slice(0, showAlternatives ? 10 : 2).map((alt, idx) => (
              <AlternativeCard 
                key={alt.id || idx} 
                alternative={alt} 
              />
            ))}
          </div>
        </div>
      )}

      {/* Footer Metadata */}
      <div className="px-6 py-4 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between text-xs text-gray-400">
        <div>ID: {id ? id.slice(0, 8) : 'N/A'}</div>
        
        {metadata?.timestamp && (
          <div>
            Generated: {new Date(metadata.timestamp).toLocaleDateString()}
          </div>
        )}
        
        <div className="flex items-center gap-1">
          <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></div>
          AI Powered
        </div>
      </div>
    </div>
  );
};

export default RecommendationCard;