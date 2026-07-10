import React from 'react';
import { ThumbsUp, ThumbsDown, AlertTriangle } from 'lucide-react';

const TradeoffMatrix = ({ tradeoffs }) => {
  // Safe optional chaining and defaults
  const pros = Array.isArray(tradeoffs?.pros) ? tradeoffs.pros : [];
  const cons = Array.isArray(tradeoffs?.cons) ? tradeoffs.cons : [];

  const hasPros = pros.length > 0;
  const hasCons = cons.length > 0;

  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-3xl shadow-sm overflow-hidden">
      {/* Header */}
      <div className="px-8 py-6 border-b border-gray-100 dark:border-gray-700 bg-gradient-to-r from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-amber-100 dark:bg-amber-900/50 rounded-2xl">
            <AlertTriangle className="w-6 h-6 text-amber-600 dark:text-amber-400" />
          </div>
          <div>
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white tracking-tight">
              Tradeoff Matrix
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
              Balanced view of pros and cons
            </p>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-gray-100 dark:divide-gray-700">
        {/* Pros Section */}
        <div className="p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex items-center justify-center w-8 h-8 bg-emerald-100 dark:bg-emerald-900/50 rounded-2xl">
              <ThumbsUp className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            </div>
            <div>
              <h4 className="font-semibold text-lg text-emerald-700 dark:text-emerald-400">Pros</h4>
              <p className="text-xs text-emerald-600/70 dark:text-emerald-500/70">Advantages</p>
            </div>
            <div className="ml-auto px-3 py-1 text-xs font-mono bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 rounded-full">
              {pros.length}
            </div>
          </div>

          {!hasPros ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="w-16 h-16 bg-emerald-50 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mb-4">
                <ThumbsUp className="w-8 h-8 text-emerald-300 dark:text-emerald-700" />
              </div>
              <p className="text-gray-400 dark:text-gray-500 font-medium">No pros listed yet</p>
              <p className="text-sm text-gray-400 dark:text-gray-600 mt-1 max-w-[180px]">
                Positive aspects will appear here
              </p>
            </div>
          ) : (
            <ul className="space-y-4">
              {pros.map((pro, index) => (
                <li 
                  key={index}
                  className="flex gap-4 group"
                >
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-6 h-6 rounded-xl bg-emerald-100 dark:bg-emerald-900 flex items-center justify-center">
                      <span className="text-emerald-600 dark:text-emerald-400 text-xl leading-none">+</span>
                    </div>
                  </div>
                  <div className="text-[15px] leading-relaxed text-gray-700 dark:text-gray-300">
                    {typeof pro === 'string' ? pro : pro?.text || pro?.description || JSON.stringify(pro)}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Cons Section */}
        <div className="p-8 bg-gray-50 dark:bg-gray-900/50">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex items-center justify-center w-8 h-8 bg-rose-100 dark:bg-rose-900/50 rounded-2xl">
              <ThumbsDown className="w-5 h-5 text-rose-600 dark:text-rose-400" />
            </div>
            <div>
              <h4 className="font-semibold text-lg text-rose-700 dark:text-rose-400">Cons</h4>
              <p className="text-xs text-rose-600/70 dark:text-rose-500/70">Potential drawbacks</p>
            </div>
            <div className="ml-auto px-3 py-1 text-xs font-mono bg-rose-100 dark:bg-rose-900/30 text-rose-700 dark:text-rose-400 rounded-full">
              {cons.length}
            </div>
          </div>

          {!hasCons ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="w-16 h-16 bg-rose-50 dark:bg-rose-900/30 rounded-full flex items-center justify-center mb-4">
                <ThumbsDown className="w-8 h-8 text-rose-300 dark:text-rose-700" />
              </div>
              <p className="text-gray-400 dark:text-gray-500 font-medium">No cons listed yet</p>
              <p className="text-sm text-gray-400 dark:text-gray-600 mt-1 max-w-[180px]">
                Risks and drawbacks will appear here
              </p>
            </div>
          ) : (
            <ul className="space-y-4">
              {cons.map((con, index) => (
                <li 
                  key={index}
                  className="flex gap-4 group"
                >
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-6 h-6 rounded-xl bg-rose-100 dark:bg-rose-900 flex items-center justify-center">
                      <span className="text-rose-600 dark:text-rose-400 text-xl leading-none">−</span>
                    </div>
                  </div>
                  <div className="text-[15px] leading-relaxed text-gray-700 dark:text-gray-300">
                    {typeof con === 'string' ? con : con?.text || con?.description || JSON.stringify(con)}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Footer Summary */}
      {(hasPros || hasCons) && (
        <div className="px-8 py-5 border-t border-gray-100 dark:border-gray-700 bg-white/60 dark:bg-gray-800/60 flex items-center justify-between text-sm">
          <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
            <div className="px-2.5 py-px text-[10px] font-mono border border-gray-200 dark:border-gray-700 rounded">
              BALANCED
            </div>
          </div>
          <div className="text-xs text-gray-400 dark:text-gray-500">
            {pros.length + cons.length} tradeoffs analyzed
          </div>
        </div>
      )}
    </div>
  );
};

export default TradeoffMatrix;