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
    case "pll_Aa": return createPattern("RGB ORR BBO GOG", []); 
    case "pll_Ab": return createPattern("OGO GRR BBG ROB", []);
    case "pll_E": return createPattern("GOB OGR BRG RBO", []);
    case "pll_F": return createPattern("ORG RGO GOR BBB", []);
    case "pll_Ga": return createPattern("RBO GGR BOB ORG", []);
    case "pll_Gb": return createPattern("OBG RRO GOR BGB", []);
    case "pll_Gc": return createPattern("BRO GOG RBB OGR", []);
    case "pll_Gd": return createPattern("ROB ORR BGO GBG", []);
    case "pll_H": return createPattern("GBG ROR BGB ORO", []);
    case "pll_Ja": return createPattern("OGG ROO GRR BBB", []);
    case "pll_Jb": return createPattern("OOG RRO GGR BBB", []);
    case "pll_Na": return createPattern("RRO GGB OOR BBG", []);
    case "pll_Nb": return createPattern("ROO GBB ORR BGG", []);
    case "pll_Ra": return createPattern("OBG RGO GRR BOB", []);
    case "pll_Rb": return createPattern("GOB ORG RGR BBO", []);
    case "pll_T": return createPattern("OOG RBO GRR BGB", []);
    case "pll_Ua": return createPattern("BBB ORO GOG RGR", []);
    case "pll_Ub": return createPattern("BBB OGO GRG ROR", []);
    case "pll_V": return createPattern("RGO GOB ORR BBG", []);
    case "pll_Y": return createPattern("BOG RRO GBB OGR", []);
    case "pll_Z": return createPattern("GOG RBR BRB OGO", []);
    
    default: return defaultPattern;
  }
};