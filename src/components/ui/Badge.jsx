import React from "react";

export function Badge({ children, className = "" }) {
  return (
    <span
      className={`
        inline-flex items-center justify-center
        rounded-full px-3 py-1
        text-xs font-semibold
        bg-gradient-to-r from-zinc-800 to-zinc-900
        text-white
        border border-zinc-700
        shadow-sm shadow-zinc-950/50
        transition-all duration-200
        hover:shadow-md hover:border-zinc-600
        ${className}
      `.trim()}
    >
      {children}
    </span>
  );
}

export default Badge;