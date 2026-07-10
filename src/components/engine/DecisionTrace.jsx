import React from 'react';
import { Clock, CheckCircle, AlertCircle, Target, ArrowRight } from 'lucide-react';

const DecisionTrace = ({ trace }) => {
  // Safe handling for missing or invalid trace
  if (!trace || typeof trace !== 'object') {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-8 text-center border border-gray-100 dark:border-gray-700">
        <AlertCircle className="w-12 h-12 mx-auto text-amber-500 mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No Decision Trace Available</h3>
        <p className="text-gray-500 dark:text-gray-400">The decision trace could not be loaded or is empty.</p>
      </div>
    );
  }

  const { steps = [], summary = '', finalScore = 0 } = trace;
  const safeSteps = Array.isArray(steps) ? steps : [];

  return (
    <div className="space-y-8">
      {/* Final Score Header */}
      <div className="flex items-center justify-between bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-gradient-to-br from-blue-500 via-indigo-500 to-violet-600 rounded-2xl flex items-center justify-center shadow-inner">
            <Target className="w-7 h-7 text-white" />
          </div>
          <div>
            <div className="uppercase text-xs tracking-widest text-gray-500 dark:text-gray-400 font-medium">FINAL DECISION SCORE</div>
            <div className="text-5xl font-bold text-gray-900 dark:text-white tracking-tighter flex items-baseline">
              {Math.round(finalScore)}
              <span className="text-2xl text-gray-400 font-normal ml-1">/100</span>
            </div>
          </div>
        </div>

        <div className="text-right">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-50 dark:bg-emerald-950 border border-emerald-100 dark:border-emerald-900 text-emerald-700 dark:text-emerald-400 rounded-2xl text-sm font-semibold">
            <CheckCircle className="w-5 h-5" />
            Decision Complete
          </div>
        </div>
      </div>

      {/* Summary */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-7 shadow-sm border border-gray-100 dark:border-gray-700">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-5 flex items-center gap-3">
          <Target className="w-6 h-6 text-indigo-500" />
          Decision Summary
        </h3>
        <div className="prose prose-gray dark:prose-invert max-w-none text-[15px] leading-relaxed text-gray-600 dark:text-gray-300">
          {summary && summary.trim() ? (
            <p>{summary}</p>
          ) : (
            <p className="italic text-gray-400">No summary was generated for this decision trace.</p>
          )}
        </div>
      </div>

      {/* Timeline */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-7 shadow-sm border border-gray-100 dark:border-gray-700">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center gap-3">
            <Clock className="w-6 h-6 text-indigo-500" />
            Decision Process Timeline
          </h3>
          <div className="px-4 py-1.5 bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 text-sm font-medium rounded-xl">
            {safeSteps.length} step{safeSteps.length !== 1 ? 's' : ''}
          </div>
        </div>

        {safeSteps.length > 0 ? (
          <div className="relative pl-10 border-l-2 border-gray-200 dark:border-gray-700 space-y-10">
            {safeSteps.map((step, index) => {
              const isLast = index === safeSteps.length - 1;
              return (
                <div key={index} className="relative group">
                  {/* Timeline Node */}
                  <div className={`absolute -left-[11px] w-[22px] h-[22px] rounded-full border-[5px] border-white dark:border-gray-800 flex items-center justify-center transition-all duration-200 ${isLast ? 'bg-emerald-500' : 'bg-blue-500'}`}>
                    {isLast ? (
                      <CheckCircle className="w-4 h-4 text-white" />
                    ) : (
                      <div className="w-2 h-2 bg-white rounded-full" />
                    )}
                  </div>

                  <div className="bg-gray-50 dark:bg-gray-900/70 rounded-2xl p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between gap-6">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-3">
                          <span className="inline-flex items-center px-3 py-1 text-xs font-mono tracking-widest bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-400 rounded-lg">
                            STEP {String(index + 1).padStart(2, '0')}
                          </span>
                          <h4 className="font-semibold text-lg text-gray-900 dark:text-white">
                            {step.title || `Process Step ${index + 1}`}
                          </h4>
                        </div>

                        {step.description && (
                          <p className="text-[15px] text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                            {step.description}
                          </p>
                        )}

                        {step.reasoning && (
                          <div className="mt-5 pt-5 border-t border-gray-100 dark:border-gray-700">
                            <div className="flex items-center gap-2 text-xs uppercase font-medium tracking-widest text-gray-400 mb-2">
                              <ArrowRight className="w-3 h-3" />
                              REASONING
                            </div>
                            <p className="text-sm text-gray-500 dark:text-gray-400 italic">
                              {step.reasoning}
                            </p>
                          </div>
                        )}
                      </div>

                      {step.score !== undefined && step.score !== null && (
                        <div className="flex-shrink-0 text-right pt-1">
                          <div className="text-xs font-medium text-gray-400 mb-1">CONFIDENCE</div>
                          <div className="text-3xl font-bold text-emerald-600 dark:text-emerald-400 tabular-nums">
                            {step.score}
                            <span className="text-base align-super">%</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-16 bg-gray-50 dark:bg-gray-900/50 rounded-2xl border border-dashed border-gray-200 dark:border-gray-700">
            <Clock className="w-12 h-12 mx-auto text-gray-300 dark:text-gray-600 mb-4" />
            <p className="text-gray-500 dark:text-gray-400">No steps were recorded in this decision trace.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DecisionTrace;