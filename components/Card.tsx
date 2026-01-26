import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  padding?: boolean;
  style?: React.CSSProperties;
}

export function Card({ children, className = '', padding = true, style }: CardProps) {
  return (
    <div
      className={`bg-white dark:bg-slate-800 rounded-lg shadow-md border border-slate-200 dark:border-slate-700 ${
        padding ? 'p-6' : ''
      } ${className}`}
      style={style}
    >
      {children}
    </div>
  );
}
