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
  u: [x, x, x, x, y, x, x, b, b],
  l: [x, x, w, b, b, x, b, b, x],
  r: [r, r, x, x, r, r, x, r, r],
};

const defaultPattern2: F2LPattern = {
  u: [x, x, x, x, y, x, r, r, x],
  l: [x, b, b, b, b, x, b, b, x],
  r: [w, x, x, x, r, r, x, r, r],
};

const defaultPattern3: F2LPattern = {
  u: [r, x, x, x, y, x, x, b, x],
  l: [x, x, w, b, b, x, b, b, x],
  r: [r, x, x, x, r, r, x, r, r],
};

const defaultPattern4: F2LPattern = {
  u: [x, x, b, x, y, x, x, r, x],
  l: [x, x, b, b, b, x, b, b, x],
  r: [w, x, x, x, r, r, x, r, r],
};

const defaultPattern5: F2LPattern = {
  u: [r, x, x, x, y, x, x, r, x],
  l: [x, x, b, b, b, x, b, b, x],
  r: [w, x, x, x, r, r, x, r, r],
};

const defaultPattern6: F2LPattern = {
  u: [x, x, b, x, y, x, x, b, x],
  l: [x, x, w, b, b, x, b, b, x],
  r: [r, x, x, x, r, r, x, r, r],
};

const defaultPattern7: F2LPattern = {
  u: [x, x, r, x, y, x, x, r, x],
  l: [x, x, b, b, b, x, b, b, x],
  r: [w, x, x, x, r, r, x, r, r],
};

const defaultPattern8: F2LPattern = {
  u: [b, x, x, x, y, x, x, b, x],
  l: [x, x, w, b, b, x, b, b, x],
  r: [r, x, x, x, r, r, x, r, r],
};

const defaultPattern9: F2LPattern = {
  u: [x, x, r, x, y, x, x, b, x],
  l: [x, x, w, b, b, x, b, b, x],
  r: [r, x, x, x, r, r, x, r, r],
};

const defaultPattern10: F2LPattern = {
  u: [b, x, x, x, y, x, x, r, x],
  l: [x, x, b, b, b, x, b, b, x],
  r: [w, x, x, x, r, r, x, r, r],
};

const defaultPattern11: F2LPattern = {
  u: [x, x, x, x, y, x, x, b, r],
  l: [x, x, w, b, b, x, b, b, x],
  r: [r, b, x, x, r, r, x, r, r],
};

const defaultPattern12: F2LPattern = {
  u: [x, x, x, x, y, x, b, r, x],
  l: [x, r, b, b, b, x, b, b, x],
  r: [w, x, x, x, r, r, x, r, r],
};


const patterns: Record<string, F2LPattern> = {
  // We can pre-fill these with the default, so the user can just edit the arrays.
  "f2l_fr_basic_insert": { ...defaultPattern },
  "f2l_fr_split_white_up": { ...defaultPattern2 },
  "f2l_fr_split_white_front": { ...defaultPattern3 },
  "f2l_fr_misoriented_pair": { ...defaultPattern4 },
  "f2l_fr_edge_in_middle": { ...defaultPattern5 },
  "f2l_fr_corner_wrong_in_slot": { ...defaultPattern6 },
  "f2l_fr_edge_in_slot_corner_u": { ...defaultPattern7 },
  "f2l_fr_pair_over_wrong_slot": { ...defaultPattern8 },
  "f2l_fl_basic_insert": { ...defaultPattern9 },
  "f2l_fl_split": { ...defaultPattern10 },
  "f2l_br_reorient": { ...defaultPattern11 },
  "f2l_bl_extract_reinsert": { ...defaultPattern12 },
};

export const getF2LPattern = (id: string): F2LPattern => {
  return patterns[id] || defaultPattern;
};
