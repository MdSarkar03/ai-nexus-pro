import React from 'react';

const ScoreBar = ({ score, label, size = 'md' }) => {
  // Safe normalization and handling of invalid inputs
  const normalizeScore = (value) => {
    if (value === null || value === undefined || isNaN(value)) {
      return 0;
    }
    
    const num = parseFloat(value);
    if (isNaN(num)) return 0;
    
    // Clamp between 0 and 100
    return Math.max(0, Math.min(100, num));
  };

  const normalizedScore = normalizeScore(score);
  const displayScore = Math.round(normalizedScore);
  const percentage = `${displayScore}%`;

  // Size variants
  const sizeClasses = {
    sm: 'h-1.5',
    md: 'h-2.5',
    lg: 'h-3.5',
  };

  const barHeight = sizeClasses[size] || sizeClasses.md;

  // Color based on score
  const getColorClass = (s) => {
    if (s >= 90) return 'bg-emerald-500';
    if (s >= 75) return 'bg-teal-500';
    if (s >= 60) return 'bg-blue-500';
    if (s >= 40) return 'bg-amber-500';
    return 'bg-rose-500';
  };

  const colorClass = getColorClass(normalizedScore);

  return (
    <div className="w-full">
      {(label || score !== undefined) && (
        <div className="flex items-center justify-between mb-1.5">
          {label && (
            <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
              {label}
            </span>
          )}
          <span className="text-xs font-semibold tabular-nums text-gray-700 dark:text-gray-300">
            {percentage}
          </span>
        </div>
      )}

      <div className={`w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden ${barHeight}`}>
        <div 
          className={`h-full rounded-full transition-all duration-500 ease-out ${colorClass}`}
          style={{ width: `${normalizedScore}%` }}
          role="progressbar"
          aria-valuenow={normalizedScore}
          aria-valuemin="0"
          aria-valuemax="100"
        />
      </div>
    </div>
  );
};

export default ScoreBar;