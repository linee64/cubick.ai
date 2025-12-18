// Color constants
const y = "#facc15"; // Yellow
const b = "#3b82f6"; // Blue
const r = "#ef4444"; // Red
const g = "#22c55e"; // Green
const o = "#f97316"; // Orange
const w = "#ffffff"; // White
const x = "#3f3f46"; // Dark Gray (Zinc 700) - for "empty" or irrelevant
const k = "#18181b"; // Black/Darker for borders

export type F2LPattern = {
  u: string[]; // 9 stickers for U face
  l: string[]; // 9 stickers for L face
  r: string[]; // 9 stickers for R face
};

// Default: Yellow center, Blue Left, Red Right (as requested)
const defaultPattern: F2LPattern = {
  u: [x, x, x, x, y, x, x, x, x],
  l: [b, b, b, b, b, b, b, b, b],
  r: [r, r, r, r, r, r, r, r, r],
};

const patterns: Record<string, F2LPattern> = {
  // We can pre-fill these with the default, so the user can just edit the arrays.
  "f2l_fr_basic_insert": { ...defaultPattern },
  "f2l_fr_split_white_up": { ...defaultPattern },
  "f2l_fr_split_white_front": { ...defaultPattern },
  "f2l_fr_misoriented_pair": { ...defaultPattern },
  "f2l_fr_edge_in_middle": { ...defaultPattern },
  "f2l_fr_corner_wrong_in_slot": { ...defaultPattern },
  "f2l_fr_edge_in_slot_corner_u": { ...defaultPattern },
  "f2l_fr_pair_over_wrong_slot": { ...defaultPattern },
  "f2l_fl_basic_insert": { ...defaultPattern },
  "f2l_fl_split": { ...defaultPattern },
  "f2l_br_reorient": { ...defaultPattern },
  "f2l_bl_extract_reinsert": { ...defaultPattern },
};

export const getF2LPattern = (id: string): F2LPattern => {
  return patterns[id] || defaultPattern;
};
