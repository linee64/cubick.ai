export interface Arrow {
  start: [number, number]; // [x, y] grid coordinates (0-2)
  end: [number, number];   // [x, y] grid coordinates (0-2)
  color?: string;          // Optional color override
}

export interface PLLPattern {
  sides: string[]; // 12 elements: Top(3), Right(3), Bottom(3), Left(3)
                   // Colors: 'R' (Red), 'G' (Green), 'B' (Blue), 'O' (Orange)
  arrows: Arrow[];
}

// Helper to create patterns
//
// FORMAT DOCUMENTATION:
// ---------------------
// You can manually edit the patterns below.
//
// 1. sides: A string of 12 characters representing the stickers AROUND the top face.
//    Order: CLOCKWISE starting from Back-Left.
//    - Characters 0-2: Back Face (Left -> Right)
//    - Characters 3-5: Right Face (Back -> Front)
//    - Characters 6-8: Front Face (Right -> Left)
//    - Characters 9-11: Left Face (Front -> Back)
//
//    Colors: 'R'=Red, 'G'=Green, 'B'=Blue, 'O'=Orange
//
// 2. arrows: An array of arrows to draw on the top face.
//    Each arrow has:
//    - start: [x, y] (0-2, 0-2) - Grid coordinates
//    - end: [x, y] (0-2, 0-2)
//
//    Grid Coordinates:
//    [0,0] [1,0] [2,0]
//    [0,1] [1,1] [2,1]
//    [0,2] [1,2] [2,2]
//
const createPattern = (sideStr: string, arrows: Arrow[] = []): PLLPattern => {
  // Remove spaces for easier formatting
  const cleanStr = sideStr.replace(/\s/g, '');
  const sides = cleanStr.split('');
  return { sides, arrows };
};

export const getPLLPattern = (id: string): PLLPattern => {
  // Default Side Colors (Solved state relative to Green Front)
  // Back: Blue (BBB), Right: Red (RRR), Front: Green (GGG), Left: Orange (OOO)
  // Note: Standard scheme is Blue Back, Red Right, Green Front, Orange Left?
  // Let's assume Green Front (Bottom in diagram).
  // Then Right is Red. Back is Blue. Left is Orange.
  // 
  // String: "BBB RRR GGG OOO"
  
  const defaultPattern = createPattern("BBB RRR GGG OOO");

  switch (id) {
    // You can customize each case here:
    case "pll_Aa": return createPattern("BBB RRR GGG OOO", []); 
    case "pll_Ab": return createPattern("BBB RRR GGG OOO", []);
    case "pll_E": return createPattern("BBB RRR GGG OOO", []);
    case "pll_F": return createPattern("BBB RRR GGG OOO", []);
    case "pll_Ga": return createPattern("BBB RRR GGG OOO", []);
    case "pll_Gb": return createPattern("BBB RRR GGG OOO", []);
    case "pll_Gc": return createPattern("BBB RRR GGG OOO", []);
    case "pll_Gd": return createPattern("BBB RRR GGG OOO", []);
    case "pll_H": return createPattern("BBB RRR GGG OOO", []);
    case "pll_Ja": return createPattern("BBB RRR GGG OOO", []);
    case "pll_Jb": return createPattern("BBB RRR GGG OOO", []);
    case "pll_Na": return createPattern("BBB RRR GGG OOO", []);
    case "pll_Nb": return createPattern("BBB RRR GGG OOO", []);
    case "pll_Ra": return createPattern("BBB RRR GGG OOO", []);
    case "pll_Rb": return createPattern("BBB RRR GGG OOO", []);
    case "pll_T": return createPattern("BBB RRR GGG OOO", []);
    case "pll_Ua": return createPattern("BBB RRR GGG OOO", []);
    case "pll_Ub": return createPattern("BBB RRR GGG OOO", []);
    case "pll_V": return createPattern("BBB RRR GGG OOO", []);
    case "pll_Y": return createPattern("BBB RRR GGG OOO", []);
    case "pll_Z": return createPattern("BBB RRR GGG OOO", []);
    
    default: return defaultPattern;
  }
};