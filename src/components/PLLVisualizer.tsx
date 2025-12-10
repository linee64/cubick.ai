import React from 'react';
import { cn } from '@/lib/utils';
import { getPLLPattern } from './pllPatterns';

interface PLLVisualizerProps {
  caseId: string;
  className?: string;
}

export const PLLVisualizer: React.FC<PLLVisualizerProps> = ({ caseId, className }) => {
  const pattern = getPLLPattern(caseId);

  // Colors
  const yellow = "#facc15"; // Top face
  const dark = "#333333";   // Borders/lines
  // const gray = "#9ca3af";   // Stroke

  const colorMap: Record<string, string> = {
    'R': "#ef4444", // Red
    'G': "#0cc550ff", // Green
    'O': "#ff710cff", // Orange
    'B': "#3b82f6", // Blue
  };

  const getColor = (code: string) => colorMap[code] || dark;

  // Grid constants
  const startX = 28;
  const startY = 28;
  const cellSize = 20;
  const gap = 2;

  const getCenter = (x: number, y: number) => {
    return {
      cx: startX + x * (cellSize + gap) + cellSize / 2,
      cy: startY + y * (cellSize + gap) + cellSize / 2,
    };
  };

  return (
    <div className={cn("relative w-full h-full flex items-center justify-center bg-muted/50 p-2", className)}>
      <svg viewBox="12 12 96 96" className="w-full h-full max-w-[120px] max-h-[120px]">
        <defs>
          <marker id="arrowhead" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
            <path d="M0,0 L0,6 L6,3 z" fill="black" />
          </marker>
        </defs>

        {/* Main 3x3 Grid on Top Face (All Yellow for PLL) */}
        <g transform={`translate(${startX}, ${startY})`}>
          {[0, 1, 2].map(y => (
            [0, 1, 2].map(x => (
              <rect 
                key={`${x}-${y}`}
                x={x * (cellSize + gap)} 
                y={y * (cellSize + gap)} 
                width={cellSize} 
                height={cellSize} 
                rx="2" 
                fill={yellow} 
                stroke={dark} 
                strokeWidth="2" 
              />
            ))
          ))}
        </g>

        {/* Side Indicators (Stickers) */}
        {/* Back (Top) - Indices 0, 1, 2 */}
        <rect x="28" y="20" width="20" height="6" rx="1" fill={getColor(pattern.sides[0])} stroke={dark} strokeWidth="1" />
        <rect x="50" y="20" width="20" height="6" rx="1" fill={getColor(pattern.sides[1])} stroke={dark} strokeWidth="1" />
        <rect x="72" y="20" width="20" height="6" rx="1" fill={getColor(pattern.sides[2])} stroke={dark} strokeWidth="1" />

        {/* Right - Indices 3, 4, 5 */}
        <rect x="94" y="28" width="6" height="20" rx="1" fill={getColor(pattern.sides[3])} stroke={dark} strokeWidth="1" />
        <rect x="94" y="50" width="6" height="20" rx="1" fill={getColor(pattern.sides[4])} stroke={dark} strokeWidth="1" />
        <rect x="94" y="72" width="6" height="20" rx="1" fill={getColor(pattern.sides[5])} stroke={dark} strokeWidth="1" />

        {/* Front (Bottom) - Indices 6, 7, 8 (Right to Left) */}
        <rect x="72" y="94" width="20" height="6" rx="1" fill={getColor(pattern.sides[6])} stroke={dark} strokeWidth="1" />
        <rect x="50" y="94" width="20" height="6" rx="1" fill={getColor(pattern.sides[7])} stroke={dark} strokeWidth="1" />
        <rect x="28" y="94" width="20" height="6" rx="1" fill={getColor(pattern.sides[8])} stroke={dark} strokeWidth="1" />

        {/* Left - Indices 9, 10, 11 (Bottom to Top) */}
        <rect x="20" y="72" width="6" height="20" rx="1" fill={getColor(pattern.sides[9])} stroke={dark} strokeWidth="1" />
        <rect x="20" y="50" width="6" height="20" rx="1" fill={getColor(pattern.sides[10])} stroke={dark} strokeWidth="1" />
        <rect x="20" y="28" width="6" height="20" rx="1" fill={getColor(pattern.sides[11])} stroke={dark} strokeWidth="1" />

        {/* Arrows */}
        {pattern.arrows.map((arrow, i) => {
          const start = getCenter(arrow.start[0], arrow.start[1]);
          const end = getCenter(arrow.end[0], arrow.end[1]);
          return (
            <line 
              key={i}
              x1={start.cx} 
              y1={start.cy} 
              x2={end.cx} 
              y2={end.cy} 
              stroke={arrow.color || "black"} 
              strokeWidth="3" 
              markerEnd="url(#arrowhead)" 
            />
          );
        })}
      </svg>
    </div>
  );
};
