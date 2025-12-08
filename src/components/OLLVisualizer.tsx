import React from 'react';
import { cn } from '@/lib/utils';
import { getOLLPattern } from './ollPatterns';

interface OLLVisualizerProps {
  caseId: string;
  className?: string;
}

export const OLLVisualizer: React.FC<OLLVisualizerProps> = ({ caseId, className }) => {
  const pattern = getOLLPattern(caseId);
  
  // Define colors
  const yellow = "#facc15"; // Tailwind yellow-400
  const dark = "#333333";
  const gray = "#9ca3af"; // Tailwind gray-400 for background/lines

  // Helper to get fill color for top grid
  const getTopFill = (index: number) => pattern.top[index] === 1 ? yellow : dark;

  // Helper to render side stickers
  // We only render if the side sticker is 1 (Yellow)
  const renderSideSticker = (index: number, x: number, y: number, width: number, height: number) => {
    if (pattern.sides[index] === 1) {
      return <rect key={`side-${index}`} x={x} y={y} width={width} height={height} rx="1" fill={yellow} />;
    }
    return null;
  };

  return (
    <div className={cn("relative w-full h-full flex items-center justify-center bg-muted/50 p-2", className)}>
      <svg viewBox="10 10 100 100" className="w-full h-full max-w-[120px] max-h-[120px]">
        {/* Main 3x3 Grid on Top Face */}
        <g transform="translate(28, 28)">
          {/* Row 1 */}
          <rect x="0" y="0" width="20" height="20" rx="2" fill={getTopFill(0)} stroke={gray} strokeWidth="1" />
          <rect x="22" y="0" width="20" height="20" rx="2" fill={getTopFill(1)} stroke={gray} strokeWidth="1" />
          <rect x="44" y="0" width="20" height="20" rx="2" fill={getTopFill(2)} stroke={gray} strokeWidth="1" />
          
          {/* Row 2 */}
          <rect x="0" y="22" width="20" height="20" rx="2" fill={getTopFill(3)} stroke={gray} strokeWidth="1" />
          <rect x="22" y="22" width="20" height="20" rx="2" fill={getTopFill(4)} stroke={gray} strokeWidth="1" />
          <rect x="44" y="22" width="20" height="20" rx="2" fill={getTopFill(5)} stroke={gray} strokeWidth="1" />
          
          {/* Row 3 */}
          <rect x="0" y="44" width="20" height="20" rx="2" fill={getTopFill(6)} stroke={gray} strokeWidth="1" />
          <rect x="22" y="44" width="20" height="20" rx="2" fill={getTopFill(7)} stroke={gray} strokeWidth="1" />
          <rect x="44" y="44" width="20" height="20" rx="2" fill={getTopFill(8)} stroke={gray} strokeWidth="1" />
        </g>

        {/* Side Indicators */}
        {/* Top Side: Indices 0, 1, 2 */}
        {renderSideSticker(0, 28, 20, 20, 5)}
        {renderSideSticker(1, 50, 20, 20, 5)}
        {renderSideSticker(2, 72, 20, 20, 5)}
        
        {/* Right Side: Indices 3, 4, 5 */}
        {renderSideSticker(3, 95, 28, 5, 20)}
        {renderSideSticker(4, 95, 50, 5, 20)}
        {renderSideSticker(5, 95, 72, 5, 20)}

        {/* Bottom Side: Indices 6, 7, 8 */}
        {renderSideSticker(6, 72, 95, 20, 5)}
        {renderSideSticker(7, 50, 95, 20, 5)}
        {renderSideSticker(8, 28, 95, 20, 5)}

        {/* Left Side: Indices 9, 10, 11 */}
        {renderSideSticker(9, 20, 72, 5, 20)}
        {renderSideSticker(10, 20, 50, 5, 20)}
        {renderSideSticker(11, 20, 28, 5, 20)}

      </svg>
    </div>
  );
};
