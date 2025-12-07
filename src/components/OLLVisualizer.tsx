import React from 'react';
import { cn } from '@/lib/utils';

interface OLLVisualizerProps {
  caseId: string;
  className?: string;
}

export const OLLVisualizer: React.FC<OLLVisualizerProps> = ({ caseId, className }) => {
  // Define colors
  const yellow = "#facc15"; // Tailwind yellow-400
  const dark = "#333333";
  const gray = "#9ca3af"; // Tailwind gray-400 for background/lines

  // This is a simplified renderer. Ideally, we would map caseId to a specific pattern.
  // For now, we render a generic OLL pattern (OLL 1 - Dot) as requested/implied by the user's image.
  // Pattern: Center dot yellow. All other top stickers dark.
  // Side stickers: Need to indicate orientation.
  
  // Grid size: 3x3. 
  // Cell size: 20x20. Spacing: 2.
  // Total grid width: 3*20 + 2*2 = 64.
  // ViewBox: 100x100 to allow space for side indicators.
  
  return (
    <div className={cn("relative w-full h-full flex items-center justify-center bg-muted/50 p-2", className)}>
      <svg viewBox="0 0 120 120" className="w-full h-full max-w-[120px] max-h-[120px]">
        {/* Main 3x3 Grid on Top Face */}
        <g transform="translate(28, 28)">
          {/* Row 1 */}
          <rect x="0" y="0" width="20" height="20" rx="2" fill={dark} stroke={gray} strokeWidth="1" />
          <rect x="22" y="0" width="20" height="20" rx="2" fill={dark} stroke={gray} strokeWidth="1" />
          <rect x="44" y="0" width="20" height="20" rx="2" fill={dark} stroke={gray} strokeWidth="1" />
          
          {/* Row 2 */}
          <rect x="0" y="22" width="20" height="20" rx="2" fill={dark} stroke={gray} strokeWidth="1" />
          <rect x="22" y="22" width="20" height="20" rx="2" fill={yellow} stroke={gray} strokeWidth="1" /> {/* Center */}
          <rect x="44" y="22" width="20" height="20" rx="2" fill={dark} stroke={gray} strokeWidth="1" />
          
          {/* Row 3 */}
          <rect x="0" y="44" width="20" height="20" rx="2" fill={dark} stroke={gray} strokeWidth="1" />
          <rect x="22" y="44" width="20" height="20" rx="2" fill={dark} stroke={gray} strokeWidth="1" />
          <rect x="44" y="44" width="20" height="20" rx="2" fill={dark} stroke={gray} strokeWidth="1" />
        </g>

        {/* Side Indicators (representing yellow stickers facing out) */}
        {/* Top Side */}
        <rect x="28" y="20" width="20" height="5" rx="1" fill={yellow} /> {/* Top Left */}
        <rect x="72" y="20" width="20" height="5" rx="1" fill={yellow} /> {/* Top Right */}
        
        {/* Bottom Side */}
        <rect x="28" y="95" width="20" height="5" rx="1" fill={yellow} /> {/* Bottom Left */}
        <rect x="72" y="95" width="20" height="5" rx="1" fill={yellow} /> {/* Bottom Right */}

        {/* Left Side */}
        <rect x="20" y="28" width="5" height="20" rx="1" fill={yellow} /> {/* Left Top */}
        <rect x="20" y="72" width="5" height="20" rx="1" fill={yellow} /> {/* Left Bottom */}

        {/* Right Side */}
        <rect x="95" y="28" width="5" height="20" rx="1" fill={yellow} /> {/* Right Top */}
        <rect x="95" y="72" width="5" height="20" rx="1" fill={yellow} /> {/* Right Bottom */}
      </svg>
    </div>
  );
};
