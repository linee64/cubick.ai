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
  u: [x, x, x, x, y, x, r, r, x],
  l: [x, b, b, b, b, x, b, b, x],
  r: [w, x, x, x, r, r, x, r, r],
};

const defaultPattern2: F2LPattern = {
  u: [x, x, x, x, y, x, x, b, b],
  l: [x, x, w, b, b, x, b, b, x],
  r: [r, r, x, x, r, r, x, r, r],
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

const defaultPattern13: F2LPattern = {
  u: [x, x, x, x, y, x, r, b, x],
  l: [x, b, w, b, b, x, b, b, x],
  r: [r, x, x, x, r, r, x, r, r],
};

const defaultPattern14: F2LPattern = {
  u: [x, x, x, x, y, x, x, r, b],
  l: [x, x, b, b, b, x, b, b, x],
  r: [w, r, x, x, r, x, x, r, r],
};

const defaultPattern15: F2LPattern = {
  u: [x, x, x, x, y, x, x, r, r],
  l: [x, x, b, b, b, x, b, b, x],
  r: [w, b, x, x, r, r, x, r, r],
};

const defaultPattern16: F2LPattern = {
  u: [x, x, x, x, y, x, b, b, x],
  l: [x, r, w, b, b, x, b, b, x],
  r: [r, x, x, x, r, r, x, r, r],
};

const defaultPattern17: F2LPattern = {
  u: [x, x, x, x, y, x, r, w, x],
  l: [x, b, r, b, b, x, b, b, x],
  r: [b, x, x, x, r, r, x, r, r],
};

const defaultPattern18: F2LPattern = {
  u: [x, x, x, x, y, x, x, w, b],
  l: [x, x, r, b, b, x, b, b, x],
  r: [b, r, x, x, r, r, x, r, r],
};

const defaultPattern19: F2LPattern = {
  u: [x, x, x, x, y, w, r, x, x],
  l: [x, b, x, b, b, x, b, b, x],
  r: [x, x, r, x, r, r, x, r, r],
};

const defaultPattern20: F2LPattern = {
  u: [x, x, x, w, y, x, x, x, b],
  l: [b, x, x, b, b, x, b, b, x],
  r: [x, r, x, x, r, r, x, r, r],
};

const defaultPattern21: F2LPattern = {
  u: [x, w, x, x, y, x, r, x, x],
  l: [x, b, x, b, b, x, b, b, x],
  r: [x, x, x, x, r, r, x, r, r],
};

const defaultPattern22: F2LPattern = {
  u: [x, w, x, x, y, x, x, x, b],
  l: [x, x, x, b, b, x, b, b, x],
  r: [x, r, x, x, r, r, x, r, r],
};  

const defaultPattern23: F2LPattern = {
  u: [x, x, x, x, y, x, x, w, r],
  l: [x, x, r, b, b, x, b, b, x],
  r: [b, b, x, x, r, r, x, r, r],
};

const defaultPattern24: F2LPattern = {
  u: [x, x, x, x, y, x, b, w, x],
  l: [x, r, r, b, b, x, b, b, x],
  r: [b, x, x, x, r, r, x, r, r],
};

const defaultPattern25: F2LPattern = {
  u: [x, x, x, x, y, x, r, x, x],
  l: [x, b, x, b, b, x, b, b, b],
  r: [x, x, x, x, r, r, r, r, r],
};

const defaultPattern26: F2LPattern = {
  u: [x, x, x, x, y, x, x, x, b],
  l: [x, x, x, b, b, x, b, b, b],
  r: [x, r, x, x, r, r, r, r, r],
};

const defaultPattern27: F2LPattern = {
  u: [x, x, x, x, y, x, r, x, x],
  l: [x, b, x, b, b, x, b, b, r],
  r: [x, x, x, x, r, r, w, r, r],
};

const defaultPattern28: F2LPattern = {
  u: [x, x, x, x, y, x, x, x, b],
  l: [x, x, x, b, b, x, b, b, w],
  r: [x, r, x, x, r, r, b, r, r],
};

const defaultPattern29: F2LPattern = {
  u: [x, x, x, x, y, x, r, x, x],
  l: [x, b, x, b, b, x, b, b, w],
  r: [x, x, x, x, r, r, b, r, r],
};

const defaultPattern30: F2LPattern = {
  u: [x, x, x, x, y, x, x, x, b],
  l: [x, x, x, b, b, x, b, b, r],
  r: [x, r, x, x, r, r, w, r, r],
};

const defaultPattern31: F2LPattern = {
  u: [x, x, x, x, y, x, x, b, x],
  l: [x, x, w, b, b, b, b, b, x],
  r: [r, x, x, r, r, r, x, r, r],
};

const defaultPattern32: F2LPattern = {
  u: [x, x, x, x, y, x, x, r, x],
  l: [x, x, b, b, b, b, b, b, x],
  r: [w, x, x, r, r, r, x, r, r],
};

const defaultPattern33: F2LPattern = {
  u: [x, x, x, x, y, x, x, b, x],
  l: [x, x, w, b, b, r, b, b, x],
  r: [r, x, x, b, r, r, x, r, r],
};

const defaultPattern34: F2LPattern = {
  u: [x, x, x, x, y, x, x, x, x],
  l: [x, x, x, b, b, r, b, b, b],
  r: [x, x, x, b, r, r, r, r, r],
};

const defaultPattern35: F2LPattern = {
  u: [x, x, x, x, y, x, x, r, x],
  l: [x, x, b, b, b, r, b, b, x],
  r: [w, x, x, b, r, r, x, r, r],
};

const defaultPattern36: F2LPattern = {
  u: [x, x, x, x, y, x, x, w, x],
  l: [x, x, r, b, b, b, b, b, x],
  r: [b, x, x, r, r, r, x, r, r],
};

const defaultPattern37: F2LPattern = {
  u: [x, x, x, x, y, x, x, w, x],
  l: [x, x, r, b, b, r, b, b, x],
  r: [b, x, x, b, r, r, x, r, r],
};

const defaultPattern38: F2LPattern = {
  u: [x, x, x, x, y, x, x, x, x],
  l: [x, x, x, b, b, b, b, b, w],
  r: [x, x, x, r, r, r, b, r, r],
};

const defaultPattern39: F2LPattern = {
  u: [x, x, x, x, y, x, x, x, x],
  l: [x, x, x, b, b, b, b, b, r],
  r: [x, x, x, r, r, r, w, r, r],
};

const defaultPattern40: F2LPattern = {
  u: [x, x, x, x, y, x, x, x, x],
  l: [x, x, x, b, b, r, b, b, w],
  r: [x, x, x, b, r, r, b, r, r],
};

const defaultPattern41: F2LPattern = {
  u: [x, x, x, x, y, x, x, x, x],
  l: [x, x, x, b, b, r, b, b, r],
  r: [x, x, x, b, r, r, w, r, r],
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
  "f2l_case_13": { ...defaultPattern13 },
  "f2l_case_14": { ...defaultPattern14 },
  "f2l_case_15": { ...defaultPattern15 },
  "f2l_case_16": { ...defaultPattern16 },
  "f2l_case_17": { ...defaultPattern17 },
  "f2l_case_18": { ...defaultPattern18 },
  "f2l_case_19": { ...defaultPattern19 },
  "f2l_case_20": { ...defaultPattern20 },
  "f2l_case_21": { ...defaultPattern21 },
  "f2l_case_22": { ...defaultPattern22 },
  "f2l_case_23": { ...defaultPattern23 },
  "f2l_case_24": { ...defaultPattern24 },
  "f2l_case_25": { ...defaultPattern25 },
  "f2l_case_26": { ...defaultPattern26 },
  "f2l_case_27": { ...defaultPattern27 },
  "f2l_case_28": { ...defaultPattern28 },
  "f2l_case_29": { ...defaultPattern29 },
  "f2l_case_30": { ...defaultPattern30 },
  "f2l_case_31": { ...defaultPattern31 },
  "f2l_case_32": { ...defaultPattern32 },
  "f2l_case_33": { ...defaultPattern33 },
  "f2l_case_34": { ...defaultPattern34 },
  "f2l_case_35": { ...defaultPattern35 },
  "f2l_case_36": { ...defaultPattern36 },
  "f2l_case_37": { ...defaultPattern37 },
  "f2l_case_38": { ...defaultPattern38 },
  "f2l_case_39": { ...defaultPattern39 },
  "f2l_case_40": { ...defaultPattern40 },
  "f2l_case_41": { ...defaultPattern41 },
};

export const getF2LPattern = (id: string): F2LPattern => {
  return patterns[id] || defaultPattern;
};
