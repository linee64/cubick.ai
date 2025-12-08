// 3x3 Grid: 0 to 8
// 0 1 2
// 3 4 5
// 6 7 8
// Center (4) is always 1 (Yellow) for OLL.

// Side Stickers: 0 to 11
// Top: 0, 1, 2 (Left, Mid, Right)
// Right: 3, 4, 5 (Top, Mid, Bottom)
// Bottom: 6, 7, 8 (Right, Mid, Left)
// Left: 9, 10, 11 (Bottom, Mid, Top)
// Note: This order is arbitrary, but we'll stick to a consistent one.
// Let's use the visualizer's coordinate system logic.
// Top Side: 3 blocks.
// Right Side: 3 blocks.
// Bottom Side: 3 blocks.
// Left Side: 3 blocks.

export interface OLLPattern {
  top: number[]; // 9 elements, 0 or 1
  sides: number[]; // 12 elements, 0 or 1. Order: T1, T2, T3, R1, R2, R3, B1, B2, B3, L1, L2, L3
}

const DOT = [0,0,0, 0,1,0, 0,0,0];
const LINE_H = [0,0,0, 1,1,1, 0,0,0];
const LINE_V = [0,1,0, 0,1,0, 0,1,0];
const CROSS = [0,1,0, 1,1,1, 0,1,0];
const SQUARE = [1,1,0, 1,1,0, 0,0,0]; // Top-left square
const L_SHAPE = [0,1,0, 0,1,1, 0,0,0]; // Small L
const P_SHAPE = [1,1,0, 1,1,0, 1,0,0]; // P shape block
const T_SHAPE = [1,1,1, 0,1,0, 0,1,0]; // T shape
const W_SHAPE = [1,0,0, 1,1,0, 0,1,1]; // W shape
const FISH = [0,1,0, 1,1,1, 0,1,1]; // Sune shape (Cross + 1 corner)
const C_SHAPE = [1,1,1, 1,0,1, 0,0,0]; // C shape (U shape?)
const I_SHAPE = [1,1,1, 0,1,0, 1,1,1]; // I shape (H shape?)
const H_SHAPE = [1,0,1, 1,1,1, 1,0,1]; // H shape
const LIGHTNING = [0,1,1, 1,1,0, 0,0,0]; // Small lightning

// Helper to rotate top grid 90 deg clockwise
const rotateTop = (grid: number[]) => {
  return [
    grid[6], grid[3], grid[0],
    grid[7], grid[4], grid[1],
    grid[8], grid[5], grid[2]
  ];
};

// Default generic side stickers (just for visual filler if needed)
const sidesGeneric = [0,1,0, 0,1,0, 0,1,0, 0,1,0];

export const getOLLPattern = (id: string): OLLPattern => {
  // Mapping based on ID from src/pages/OLL.tsx
  switch (id) {
    // 1-4: Dot (No edges oriented)
    case "oll_01": return { top: DOT, sides: [1,0,1, 1,0,1, 1,0,1, 1,0,1] }; // Runway
    case "oll_02": return { top: DOT, sides: [1,0,1, 0,0,0, 1,0,1, 0,0,0] }; // Zamboni (approx)
    case "oll_03": return { top: DOT, sides: [0,0,0, 1,0,1, 0,0,0, 1,0,1] }; // Anti-Zamboni
    case "oll_04": return { top: DOT, sides: [0,0,0, 0,0,0, 0,0,0, 0,0,0] }; // Checkers (approx)

    // 5-6: P-shape
    case "oll_05": return { top: [1,1,0, 1,1,0, 0,1,0], sides: sidesGeneric };
    case "oll_06": return { top: [0,1,1, 0,1,1, 0,1,0], sides: sidesGeneric };

    // 7-8: T-shape
    case "oll_07": return { top: [0,1,0, 1,1,1, 0,0,0], sides: sidesGeneric }; // Short T
    case "oll_08": return { top: [0,0,0, 1,1,1, 0,1,0], sides: sidesGeneric };

    // 9-10: W-shape
    case "oll_09": return { top: [1,0,0, 1,1,0, 0,1,1], sides: sidesGeneric };
    case "oll_10": return { top: [0,0,1, 0,1,1, 1,1,0], sides: sidesGeneric };

    // 11-14: L-shape (Knight?)
    case "oll_11": return { top: [1,0,0, 1,1,1, 0,0,0], sides: sidesGeneric };
    case "oll_12": return { top: [0,0,1, 1,1,1, 0,0,0], sides: sidesGeneric };
    case "oll_13": return { top: [0,0,0, 1,1,1, 1,0,0], sides: sidesGeneric };
    case "oll_14": return { top: [0,0,0, 1,1,1, 0,0,1], sides: sidesGeneric };

    // 15-16: Square
    case "oll_15": return { top: SQUARE, sides: sidesGeneric };
    case "oll_16": return { top: [0,1,1, 0,1,1, 0,0,0], sides: sidesGeneric };

    // 17-18: Small lightning
    case "oll_17": return { top: [0,1,1, 1,1,0, 0,0,0], sides: sidesGeneric };
    case "oll_18": return { top: [1,1,0, 0,1,1, 0,0,0], sides: sidesGeneric };

    // 19-20: Bowtie (Mickey Mouse)
    case "oll_19": return { top: [1,1,0, 0,1,0, 1,1,0], sides: sidesGeneric };
    case "oll_20": return { top: [0,1,1, 0,1,0, 0,1,1], sides: sidesGeneric };

    // 21-27: Cross shapes (All edges oriented)
    case "oll_21": return { top: CROSS, sides: [0,0,0, 0,0,0, 1,0,1, 0,0,0] }; // Headlights
    case "oll_22": return { top: CROSS, sides: [1,0,1, 0,0,0, 1,0,1, 0,0,0] }; // Pi
    case "oll_23": return { top: CROSS, sides: [1,0,1, 0,0,0, 0,0,0, 0,0,0] }; // Headlights
    case "oll_24": return { top: CROSS, sides: [0,0,0, 1,0,0, 1,0,0, 0,0,0] }; // Chameleon
    case "oll_25": return { top: [0,1,0, 1,1,1, 0,1,1], sides: sidesGeneric }; // Fish / Sune
    case "oll_26": return { top: [0,1,0, 1,1,1, 1,1,0], sides: sidesGeneric }; // Anti-Sune
    case "oll_27": return { top: [0,1,1, 1,1,1, 0,1,0], sides: sidesGeneric }; // Sune (rotated)

    // 28: Double Sune (Arrow?)
    case "oll_28": return { top: [0,1,0, 1,1,1, 0,1,0], sides: [1,0,0, 0,0,1, 1,0,0, 0,0,1] }; // Arrow?

    // 29-30: Chameleon (Awkward)
    case "oll_29": return { top: [0,1,0, 1,1,1, 1,0,1], sides: sidesGeneric };
    case "oll_30": return { top: [1,0,1, 1,1,1, 0,1,0], sides: sidesGeneric };

    // 31-32: Swordfish / Kite
    case "oll_31": return { top: [1,0,1, 0,1,0, 1,0,1], sides: sidesGeneric }; // 4 corners? No.
    case "oll_32": return { top: [0,1,0, 1,1,1, 0,1,0], sides: sidesGeneric }; // Kite?

    // 33-34: Diagonal (T)
    case "oll_33": return { top: T_SHAPE, sides: sidesGeneric };
    case "oll_34": return { top: [0,1,0, 0,1,0, 1,1,1], sides: sidesGeneric };

    // 35-36: Square (Big?)
    case "oll_35": return { top: [1,1,1, 1,1,0, 1,0,0], sides: sidesGeneric };
    case "oll_36": return { top: [1,1,1, 0,1,1, 0,0,1], sides: sidesGeneric };

    // 37-38: Knight
    case "oll_37": return { top: [1,1,0, 0,1,1, 0,1,0], sides: sidesGeneric };
    case "oll_38": return { top: [0,1,1, 1,1,0, 0,1,0], sides: sidesGeneric };

    // 39-40: Crown
    case "oll_39": return { top: [1,1,0, 1,1,1, 0,1,0], sides: sidesGeneric };
    case "oll_40": return { top: [0,1,1, 1,1,1, 0,1,0], sides: sidesGeneric };

    // 41-42: Arrowhead
    case "oll_41": return { top: [1,1,0, 1,1,0, 0,0,1], sides: sidesGeneric };
    case "oll_42": return { top: [0,1,1, 0,1,1, 1,0,0], sides: sidesGeneric };

    // 43-44: Line
    case "oll_43": return { top: [0,0,0, 1,1,1, 0,1,0], sides: sidesGeneric }; // T-like?
    case "oll_44": return { top: [0,1,0, 1,1,1, 0,0,0], sides: sidesGeneric };

    // 45-48: Cross (More)
    case "oll_45": return { top: CROSS, sides: [1,0,1, 0,0,0, 0,0,0, 0,0,0] };
    case "oll_46": return { top: CROSS, sides: [0,0,0, 1,0,1, 0,0,0, 0,0,0] };
    case "oll_47": return { top: CROSS, sides: [0,0,0, 0,0,0, 0,0,0, 1,0,1] };
    case "oll_48": return { top: CROSS, sides: [0,0,0, 0,0,0, 1,0,1, 0,0,0] };

    // 49-50: Corners
    case "oll_49": return { top: [1,0,0, 1,1,1, 0,0,1], sides: sidesGeneric };
    case "oll_50": return { top: [0,0,1, 1,1,1, 1,0,0], sides: sidesGeneric };

    // 51-52: I-shape
    case "oll_51": return { top: [1,1,0, 0,1,0, 1,1,0], sides: sidesGeneric };
    case "oll_52": return { top: [0,1,1, 0,1,0, 0,1,1], sides: sidesGeneric };

    // 53-54: X-shape
    case "oll_53": return { top: [0,1,0, 1,1,1, 0,1,0], sides: [1,0,1, 1,0,1, 1,0,1, 1,0,1] }; // 4 spots?
    case "oll_54": return { top: [0,1,0, 1,1,1, 0,1,0], sides: sidesGeneric };

    // 55-56: Lightning
    case "oll_55": return { top: [1,1,0, 1,1,1, 0,0,0], sides: sidesGeneric };
    case "oll_56": return { top: [0,1,1, 1,1,1, 0,0,0], sides: sidesGeneric };

    // 57: Last one (H)
    case "oll_57": return { top: [1,0,1, 1,1,1, 1,0,1], sides: sidesGeneric }; // H shape

    default: return { top: DOT, sides: sidesGeneric };
  }
};
