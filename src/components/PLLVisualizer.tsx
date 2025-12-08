import React from 'react';
import { cn } from '@/lib/utils';

interface PLLVisualizerProps {
  caseId: string;
  className?: string;
}

export const PLLVisualizer: React.FC<PLLVisualizerProps> = ({ caseId, className }) => {
  // Colors
  const yellow = "#facc15"; // Top face
  const dark = "#333333";   // Borders/lines
  const gray = "#9ca3af";   // Stroke
  
  // Side colors (standard scheme for demo)
  const red = "#ef4444";
  const green = "#22c55e";
  const orange = "#f97316";
  const blue = "#3b82f6";

  // TODO: In a real app, we would map caseId to specific side colors and arrows.
  // For now, we render a generic template that looks like a PLL diagram (Solved/Generic state).
  
  // Grid configuration
  // Grid size: 3x3
  // Cell size: 20
  // Gap: 2 (stroke width effectively)
  // Top-left of grid: (28, 28)
  
  return (
    <div className={cn("relative w-full h-full flex items-center justify-center bg-muted/50 p-2", className)}>
      <svg viewBox="10 10 100 100" className="w-full h-full max-w-[120px] max-h-[120px]">
        {/* Main 3x3 Grid on Top Face (All Yellow for PLL) */}
        <g transform="translate(28, 28)">
          {/* Row 1 */}
          <rect x="0" y="0" width="20" height="20" rx="2" fill={yellow} stroke={dark} strokeWidth="2" />
          <rect x="22" y="0" width="20" height="20" rx="2" fill={yellow} stroke={dark} strokeWidth="2" />
          <rect x="44" y="0" width="20" height="20" rx="2" fill={yellow} stroke={dark} strokeWidth="2" />
          
          {/* Row 2 */}
          <rect x="0" y="22" width="20" height="20" rx="2" fill={yellow} stroke={dark} strokeWidth="2" />
          <rect x="22" y="22" width="20" height="20" rx="2" fill={yellow} stroke={dark} strokeWidth="2" />
          <rect x="44" y="22" width="20" height="20" rx="2" fill={yellow} stroke={dark} strokeWidth="2" />
          
          {/* Row 3 */}
          <rect x="0" y="44" width="20" height="20" rx="2" fill={yellow} stroke={dark} strokeWidth="2" />
          <rect x="22" y="44" width="20" height="20" rx="2" fill={yellow} stroke={dark} strokeWidth="2" />
          <rect x="44" y="44" width="20" height="20" rx="2" fill={yellow} stroke={dark} strokeWidth="2" />
        </g>

        {/* Side Indicators (Stickers) */}
        {/* We use a generic pattern: Red, Green, Orange, Blue rotating or similar */}
        
        {/* Top Side (Back) */}
        <rect x="28" y="20" width="20" height="6" rx="1" fill={blue} stroke={dark} strokeWidth="1" />
        <rect x="50" y="20" width="20" height="6" rx="1" fill={blue} stroke={dark} strokeWidth="1" />
        <rect x="72" y="20" width="20" height="6" rx="1" fill={blue} stroke={dark} strokeWidth="1" />

        {/* Bottom Side (Front) */}
        <rect x="28" y="94" width="20" height="6" rx="1" fill={green} stroke={dark} strokeWidth="1" />
        <rect x="50" y="94" width="20" height="6" rx="1" fill={green} stroke={dark} strokeWidth="1" />
        <rect x="72" y="94" width="20" height="6" rx="1" fill={green} stroke={dark} strokeWidth="1" />

        {/* Left Side */}
        <rect x="20" y="28" width="6" height="20" rx="1" fill={red} stroke={dark} strokeWidth="1" />
        <rect x="20" y="50" width="6" height="20" rx="1" fill={red} stroke={dark} strokeWidth="1" />
        <rect x="20" y="72" width="6" height="20" rx="1" fill={red} stroke={dark} strokeWidth="1" />

        {/* Right Side */}
        <rect x="94" y="28" width="6" height="20" rx="1" fill={orange} stroke={dark} strokeWidth="1" />
        <rect x="94" y="50" width="6" height="20" rx="1" fill={orange} stroke={dark} strokeWidth="1" />
        <rect x="94" y="72" width="6" height="20" rx="1" fill={orange} stroke={dark} strokeWidth="1" />

        {/* Example Arrow (Generic Swap Indicator) */}
        {/* Diagonal Arrow (e.g., Corner Swap) */}
        <defs>
          <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
            <polygon points="0 0, 10 3.5, 0 7" fill="black" />
          </marker>
        </defs>
        
        {/* Drawing a sample double-headed arrow for demonstration if needed */}
        {/* <line x1="38" y1="38" x2="82" y2="82" stroke="black" strokeWidth="3" markerEnd="url(#arrowhead)" markerStart="url(#arrowhead)" /> */}
        
        {/* For now, just the grid structure is a huge improvement over "Schema" text */}
      </svg>
    </div>
  );
};
