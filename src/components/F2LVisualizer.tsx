import React from 'react';
import { cn } from '@/lib/utils';
import { getF2LPattern } from './f2lPatterns';

interface F2LVisualizerProps {
  // Optional override for sticker colors
  // Arrays of 9 color strings/hex codes
  stickers?: {
    u?: string[];
    l?: string[];
    r?: string[];
  };
  caseId?: string;
  className?: string;
  size?: number; // Base size for the cube (approx height)
}

export const F2LVisualizer: React.FC<F2LVisualizerProps> = ({ stickers, caseId, className, size = 200 }) => {
  // Standard colors
  const C = {
    y: "#facc15", // Yellow
    b: "#3b82f6", // Blue
    r: "#ef4444", // Red
    g: "#22c55e", // Green
    o: "#f97316", // Orange
    w: "#ffffff", // White
    x: "#3f3f46", // Dark Gray (Zinc 700) - for "empty" or irrelevant
    k: "#18181b", // Black/Darker for borders
  };

  const pattern = caseId ? getF2LPattern(caseId) : null;

  // Default configuration based on user request:
  // "Top yellow center only, Left Blue, Right Red"
  const defaultStickers = {
    u: [C.x, C.x, C.x, C.x, C.y, C.x, C.x, C.x, C.x], // Yellow center, others gray
    l: [C.b, C.b, C.b, C.b, C.b, C.b, C.b, C.b, C.b], // All Blue (Left Face)
    r: [C.r, C.r, C.r, C.r, C.r, C.r, C.r, C.r, C.r], // All Red (Right Face)
  };

  const uStickers = stickers?.u || pattern?.u || defaultStickers.u;
  const lStickers = stickers?.l || pattern?.l || defaultStickers.l;
  const rStickers = stickers?.r || pattern?.r || defaultStickers.r;

  // Geometry Constants
  const S = 24; // Cell size unit
  const G = 2;  // Gap
  const dx = S * 0.866; // cos(30)
  const dy = S * 0.5;   // sin(30)
  
  // Center of the SVG canvas
  const CX = 100;
  const CY = 100; // Shifted down a bit to fit top face

  // Helper to stringify points
  const p = (x: number, y: number) => `${x.toFixed(1)},${y.toFixed(1)}`;

  // Top Face (U)
  // Origin: Top corner (Back-Middle)
  // Grid: r (0..2, Back->Front-Left axis?), c (0..2, Back->Front-Right axis?)
  // Actually from previous thought:
  // Origin = (CX, CY - 3 * S_effective)
  // But let's use the vectors derived:
  // Start = (CX, CY - 3 * (S + G/2)?) Let's ignore gap for math first, or add it.
  // Let's simpler math:
  // Top Face Center = (CX, CY - 1.5*S).
  // Let's draw relative to the "Y" junction at (CX, CY).
  
  // Top Face Generation
  // "Y" junction is at (CX, CY). This is the Front corner of Top Face.
  // Vectors from (CX, CY) going BACKWARDS:
  // v_back_left = (-dx, -dy)
  // v_back_right = (dx, -dy)
  // Sticker (row, col) indices: 0..2
  // Let's map visual grid:
  // Row 0: Back
  // Row 1: Middle
  // Row 2: Front
  // Col 0: Left
  // Col 1: Middle
  // Col 2: Right
  // 
  // Sticker (r, c) center:
  // Start from Back-Top corner? No, let's start from Front (CX, CY).
  // Center(r, c) approx = (CX, CY) + (c - 2.5)*v_right_step + (r - 2.5)*v_left_step ?
  // 
  // Let's use the polygon method from before which was verified:
  // Origin = (CX, CY - 3 * S) (Top-most point)
  // v_dl = (-dx, dy) (Down-Left)
  // v_dr = (dx, dy) (Down-Right)
  // Sticker (r, c) [r: 0..2 (Back->Front-Left), c: 0..2 (Back->Front-Right)]
  // Wait, standard matrix is Row-Major.
  // usually indices 0,1,2 are Row 0.
  // Let's assume input arrays are row-major (0,1,2 = Back Row).
  // So r=0 is Back, r=2 is Front.
  // But on the diamond:
  // Row 0 is Top-Left edge? Or Back edge?
  // Usually U face is drawn:
  // 0 1 2 (Back row)
  // 3 4 5 (Mid)
  // 6 7 8 (Front row)
  // 
  // In our diamond:
  // "Back row" corresponds to the two edges furthest from (CX, CY).
  // "Front row" (6,7,8) is closest to (CX, CY).
  // So `r` corresponds to distance from Origin (Top-most point).
  // `r=0` is near Origin. `r=2` is far from Origin (near CX, CY).
  // `c=0` is Left. `c=2` is Right.
  // 
  // Let's re-verify:
  // Origin = (CX, CY - 3*S).
  // Sticker (r, c):
  // p1 (Top) = Origin + c*v_dr + r*v_dl
  // This implies:
  // if r=0, c=0: At Origin. (Back corner). Correct.
  // if r=2, c=2: At Origin + 2*dr + 2*dl = (CX, CY - 3S) + (0, 2S) = (CX, CY - S).
  // The bottom of sticker (2,2) is at (CX, CY). Correct.
  // So:
  // r maps to "Left-Down" axis? No, r*v_dl. v_dl is (-dx, dy).
  // So increasing r moves Left and Down.
  // c maps to "Right-Down" axis. v_dr is (dx, dy).
  // Increasing c moves Right and Down.
  // 
  // Is this consistent with 0..8 indices?
  // 0 1 2 -> Row 0.
  // If r=0: c=0,1,2.
  // (0,0) -> Back (Top) point.
  // (0,1) -> Down-Right from Back.
  // (0,2) -> Further Down-Right.
  // This forms a diagonal strip?
  // 
  // We want rows 0,1,2 to be horizontal in the view?
  // No, in isometric view, "horizontal" rows on the face become diagonal.
  // Standard U face:
  // Back row (0,1,2).
  // Front row (6,7,8).
  // In the diamond, "Back row" is the two top edges? No.
  // "Back Row" usually means the row adjacent to Back Face.
  // Since we see Left and Right faces, the "Back" of the cube is hidden.
  // The "Back" of the Top face is the corner furthest away.
  // So (0,0), (0,1), (0,2) should be the stickers furthest from (CX, CY).
  // But physically, (0,0) is Back-Left. (0,2) is Back-Right.
  // 
  // Our logic:
  // p1 = Origin + c*v_dr + r*v_dl.
  // if r=0 (Back-Left axis?), c=0..2 (Back-Right axis?).
  // (0,0) -> Top point.
  // (0,1) -> Step Down-Right.
  // (0,2) -> Step Down-Right.
  // This forms a line along the Right Edge of the Top Face?
  // Wait.
  // (0,0) is Top point.
  // (2,0) is Down-Left from Top. (Left Edge).
  // (0,2) is Down-Right from Top. (Right Edge).
  // (2,2) is Bottom point (Center of view).
  // 
  // Is this the standard grid?
  // 0 1 2
  // 3 4 5
  // 6 7 8
  // 
  // usually 0 is Top-Left corner of the face.
  // 2 is Top-Right.
  // 6 is Bottom-Left.
  // 8 is Bottom-Right.
  // 
  // In our diamond:
  // Top-Left corner is... where?
  // Left corner of the diamond is at `Origin + 3*v_dl`. (Since c=0).
  // Wait, if r=3? max r=2.
  // `Origin + 3*v_dl` is the vertex between Top and Left face?
  // No, Left corner of Top Face is `(CX - something, CY - something)`.
  // Using our formula:
  // Left Corner = `Origin + 3*v_dl`? (if grid was 3x3).
  // `v_dl = (-dx, dy)`.
  // `Origin + 3*(-dx, dy)`.
  // `Origin` is Top vertex.
  // `Origin + 3*v_dl` is Left vertex.
  // `Origin + 3*v_dr` is Right vertex.
  // `Origin + 3*v_dl + 3*v_dr` is Bottom vertex.
  // 
  // So:
  // r axis goes along Left edge (Top->Left).
  // c axis goes along Right edge (Top->Right).
  // 
  // So Grid (r, c):
  // (0,0) -> Top corner. (Back corner of cube).
  // (2,0) -> Left corner.
  // (0,2) -> Right corner.
  // (2,2) -> Bottom corner. (Front corner of cube).
  // 
  // Which indices correspond to which?
  // Standard U face orientation:
  // Back-Left is 0. Back-Right is 2.
  // Front-Left is 6. Front-Right is 8.
  // 
  // Our (0,0) is Back corner (Back-Left + Back-Right intersection?).
  // No, Back corner is the one furthest away.
  // Back-Left sticker is 0.
  // Back-Right sticker is 2.
  // Front-Left sticker is 6.
  // Front-Right sticker is 8.
  // 
  // Geometrically:
  // Back-Left sticker (0) is adjacent to Left Face (and Back Face).
  // Front-Left sticker (6) is adjacent to Left Face (and Front Face).
  // Back-Right sticker (2) is adjacent to Right Face (and Back Face).
  // Front-Right sticker (8) is adjacent to Right Face (and Front Face).
  // 
  // In our view (Top, Left, Right visible):
  // The corner (2,2) is the Front corner. It touches Left and Right faces.
  // So (2,2) should be Sticker 8? No.
  // Sticker 8 is Front-Right.
  // Sticker 6 is Front-Left.
  // Sticker 7 is Front-Middle.
  // The Front Corner touches Front Face?
  // No, we see Left and Right faces.
  // The edge between Left and Right faces is the Front edge.
  // So the "Bottom" corner of the Top Face is the "Front" corner.
  // Stickers 6, 7, 8 are the Front row.
  // 
  // Sticker 6 (Front-Left):
  // Adjacent to Left Face. Near Front.
  // In our (r, c) coordinates:
  // `r` goes Top->Left. `c` goes Top->Right.
  // "Left" implies high `r`? No, high `r` moves along Left edge.
  // "Front" implies...
  // Wait.
  // Origin (0,0) is Back corner.
  // Left corner is `r=3, c=0`.
  // Right corner is `r=0, c=3`.
  // Bottom (Front) is `r=3, c=3`.
  // 
  // So:
  // Back-Left (0): Near Left corner, Near Back.
  // Left corner is `r=max`. Back is `r=0`? No.
  // Back corner is `r=0, c=0`.
  // Left corner is `r=3, c=0`.
  // So `r` increases towards Left.
  // `c` increases towards Right.
  // 
  // Sticker 0 (Back-Left): `r` high? `c` low?
  // Sticker 2 (Back-Right): `r` low? `c` high?
  // Sticker 6 (Front-Left): `r` high? `c` low?
  // Sticker 8 (Front-Right): `r` low? `c` high?
  // 
  // Actually, let's map:
  // The diagonal `r=c` goes Back->Front.
  // (0,0) Back. (2,2) Front.
  // 
  // The diagonal `r+c=constant` goes Left->Right.
  // (2,0) Left. (0,2) Right.
  // 
  // So:
  // Back Row (0, 1, 2): `r` and `c` should be small?
  // Back-Left (0): `r` middle? `c` small?
  // 
  // Let's visualize:
  // (0,0) is Back Corner.
  // (1,1) is Center.
  // (2,2) is Front Corner.
  // 
  // Sticker 4 (Center) is at (1,1).
  // Sticker 0 (Back-Left): Needs to be "Left" of Center and "Back" of Center.
  // Left means `r` increases. Back means `r,c` decrease.
  // So `r` same, `c` decrease? Or `r` increase, `c` decrease?
  // 
  // Let's check vectors:
  // `v_dl` (increase r) -> Moves Left and Down.
  // `v_dr` (increase c) -> Moves Right and Down.
  // 
  // To go Back (Up): Decrease r and c.
  // To go Left: Increase r, Decrease c?
  // To go Right: Decrease r, Increase c?
  // 
  // Sticker 0 (Back-Left):
  // Relative to Center (1,1):
  // Back -> Decrease r, Decrease c.
  // Left -> Increase r, Decrease c.
  // Net: Decrease c (double), r unchanged?
  // So (1, -1)? No.
  // Let's try:
  // (1, 0) -> `r=1, c=0`.
  // `1*v_dl` = (-dx, dy).
  // Relative to Origin: Left-Down.
  // Center (1,1) is `v_dl + v_dr` = (0, 2dy). (Straight Down).
  // (1,0) is Left of Center. Correct.
  // (0,1) is Right of Center. Correct.
  // (0,0) is Back of Center. Correct.
  // (2,0) is Left-Down of Center?
  // `2*v_dl` = (-2dx, 2dy).
  // Center `(0, 2dy)`.
  // (2,0) is Left of Center. Same Y? No.
  // Center Y = 2dy. (2,0) Y = 2dy.
  // Yes! (2,0) is Left Corner.
  // (0,2) is Right Corner.
  // (2,2) is Front Corner.
  // 
  // So:
  // (2,0) is Left Corner.
  // (0,2) is Right Corner.
  // (0,0) is Back Corner.
  // (2,2) is Front Corner.
  // 
  // Mapping U indices 0..8:
  // 0 (Back-Left): Between Back(0,0) and Left(2,0). -> (1,0).
  // 1 (Back-Middle): Near Back(0,0). -> (0,0)? No. (0,0) is the corner vertex.
  // The stickers are faces.
  // Grid 3x3.
  // Coordinates r,c in 0,1,2.
  // 
  // Let's define the grid cells (r,c) for the math logic I derived (r->Left, c->Right):
  // (0,0) -> Back Corner cell? No, Back Corner is a vertex.
  // The cell closest to Back Corner is r=0, c=0.
  // Let's check:
  // Cell(0,0) Center approx Origin + 0.5*dl + 0.5*dr = Origin + (0, dy).
  // Back Corner is Origin.
  // So Cell(0,0) is the Back-most cell.
  // This should be Sticker 1 (Back-Middle)? Or Sticker 4?
  // No, Sticker 1 is Back-Middle.
  // Sticker 0 is Back-Left.
  // Sticker 2 is Back-Right.
  // 
  // If we look at the diamond:
  // Back-Most cell is (0,0). This is Sticker 1 (Back-Middle)?
  // Wait, Back-Left (0) is Left of Back-Middle.
  // Left means `r` increases, `c` decreases.
  // If (0,0) is Back-Middle.
  // Then Back-Left should be (1, -1)? No indices must be 0..2.
  // 
  // Rotation!
  // The Top Face is rotated 45 degrees in the view.
  // The diagonal is vertical.
  // 
  //    0
  //   3 1
  //  6 4 2
  //   7 5
  //    8
  // 
  // Is this the layout?
  // 0 is Back-Left. 2 is Back-Right.
  // 6 is Front-Left. 8 is Front-Right.
  // 
  // In our diamond (0,0) is Back. (2,0) is Left. (0,2) is Right. (2,2) is Front.
  // So:
  // (0,0) -> Back -> ???
  // (2,0) -> Left -> Sticker 3? 6?
  // (0,2) -> Right -> Sticker 5? 2?
  // (2,2) -> Front -> ???
  // 
  // Let's look at the standard cube U face.
  //      Back
  //    0   1   2
  // L  3   4   5  R
  //    6   7   8
  //      Front
  // 
  // In isometric view (Front-Left-Right visible):
  // Back (0,1,2) is far.
  // Front (6,7,8) is near.
  // Left (0,3,6) is left.
  // Right (2,5,8) is right.
  // 
  // So:
  // Sticker 0 (Back-Left): Far and Left.
  // Sticker 8 (Front-Right): Near and Right.
  // Sticker 4 (Center): Center.
  // 
  // Map to (r, c) where r->Left, c->Right.
  // Far (Back) -> small r, small c.
  // Left -> large r, small c.
  // Right -> small r, large c.
  // Near (Front) -> large r, large c.
  // 
  // Sticker 0 (Back-Left):
  // Back -> small sum. Left -> r > c.
  // Maybe (1, 0)? (Sum=1, r>c).
  // 
  // Sticker 2 (Back-Right):
  // Back -> small sum. Right -> c > r.
  // Maybe (0, 1)?
  // 
  // Sticker 6 (Front-Left):
  // Front -> large sum. Left -> r > c.
  // Maybe (2, 1)?
  // 
  // Sticker 8 (Front-Right):
  // Front -> large sum. Right -> c > r.
  // Maybe (1, 2)?
  // 
  // Sticker 1 (Back-Middle):
  // Back -> small sum. Middle -> r=c.
  // (0, 0).
  // 
  // Sticker 7 (Front-Middle):
  // Front -> large sum. Middle -> r=c.
  // (2, 2).
  // 
  // Sticker 3 (Left-Middle):
  // Middle sum. Left -> r > c.
  // (2, 0).
  // 
  // Sticker 5 (Right-Middle):
  // Middle sum. Right -> c > r.
  // (0, 2).
  // 
  // Sticker 4 (Center):
  // (1, 1).
  // 
  // Let's verify:
  // (2,0) is Left corner vertex? No, (2,0) cell center is Left-most.
  // Sticker 3 is Left-Middle. Yes.
  // (0,2) cell center is Right-most. Sticker 5 is Right-Middle. Yes.
  // (0,0) cell is Back-most. Sticker 1 is Back-Middle. Yes.
  // (2,2) cell is Front-most. Sticker 7 is Front-Middle. Yes.
  // 
  // So the corners?
  // (1,0) -> r=1, c=0.
  // Sum=1. Back-ish. r>c (Left-ish).
  // Matches Sticker 0 (Back-Left). Yes.
  // 
  // (0,1) -> r=0, c=1.
  // Sum=1. Back-ish. c>r (Right-ish).
  // Matches Sticker 2 (Back-Right). Yes.
  // 
  // (2,1) -> r=2, c=1.
  // Sum=3. Front-ish. r>c (Left-ish).
  // Matches Sticker 6 (Front-Left). Yes.
  // 
  // (1,2) -> r=1, c=2.
  // Sum=3. Front-ish. c>r (Right-ish).
  // Matches Sticker 8 (Front-Right). Yes.
  // 
  // Perfect Mapping!
  // map[0] = {r:1, c:0}
  // map[1] = {r:0, c:0}
  // map[2] = {r:0, c:1}
  // map[3] = {r:2, c:0}
  // map[4] = {r:1, c:1}
  // map[5] = {r:0, c:2}
  // map[6] = {r:2, c:1}
  // map[7] = {r:2, c:2}
  // map[8] = {r:1, c:2}
  
  // Left Face (L)
  // Origin (CX, CY).
  // v_down = (0, S).
  // v_back = (-dx, -dy).
  // Grid 3x3.
  // Standard L face:
  // 0 1 2 (Top row)
  // 3 4 5
  // 6 7 8 (Bottom row)
  // 
  // Visual layout:
  // Top edge is against U face Left edge.
  // Right edge is against Front edge (vertical).
  // 
  // Sticker 2 (Top-Right of L face) touches U face (Sticker 6?) and Front Edge.
  // Sticker 5 (Mid-Right) touches Front Edge.
  // Sticker 8 (Bottom-Right) touches Front Edge.
  // 
  // Coordinate mapping (r=0..2 down, c=0..2 right?):
  // Let's use basis vectors:
  // `v_r` (Right-ish) -> along top edge? No.
  // The face is a parallelogram.
  // Sides: Vertical (Right side), Up-Left (Top side).
  // Let's define from Top-Right corner (CX, CY).
  // To go Left (along Top edge): `v_back`.
  // To go Down (along Right edge): `v_down`.
  // 
  // Sticker (row, col) in standard matrix:
  // row 0..2 (Top to Bottom).
  // col 0..2 (Left to Right).
  // 
  // Sticker (r, c) center relative to (CX, CY):
  // We want (0, 2) [Top-Right] to be near (CX, CY).
  // We want (0, 0) [Top-Left] to be far Up-Left.
  // We want (2, 2) [Bottom-Right] to be Down.
  // 
  // Vector = (c - 2.5) * v_right_axis?
  // Let's say we move FROM (CX, CY).
  // `v_left_step = (-dx/3?, -dy/3?)` -> `v_back`.
  // `v_down_step = (0, S)`.
  // 
  // Sticker (r, c):
  // `c` increases Left to Right.
  // So `c=2` is at the Right (near center). `c=0` is Left (far).
  // So step is proportional to `(c - 2)`.
  // `r` increases Top to Bottom.
  // So `r=0` is Top. `r=2` is Bottom.
  // Step is proportional to `r`.
  // 
  // Vertex formula:
  // Start = (CX, CY).
  // Top-Right corner of sticker (r, c):
  // P = Start + r*v_down + (c-3)*(-v_back)?
  // Let's use `v_left = v_back`.
  // Top-Right corner of Cube Left Face is (CX, CY).
  // This corresponds to Top-Right corner of Sticker (0, 2).
  // 
  // Vertices for Sticker (r, c):
  // Base = Start + r*v_down + (c-3)*(-v_left)? No.
  // Let's use `v_l = (-dx, -dy)` (Left direction).
  // `v_d = (0, S)` (Down direction).
  // 
  // Sticker (r, c):
  // Top-Right corner = Start + r*v_d + (2-c)*(-v_l)? No.
  // If c=2: Start + r*v_d. (On the vertical axis). Correct.
  // If c=1: Start + r*v_d + v_l. (Shifted Left). Correct.
  // 
  // So Top-Right corner of (r, c) = Start + r*v_d + (2-c)*v_l.
  // Vertices:
  // p1 (Top-Right)
  // p2 (Top-Left) = p1 + v_l
  // p3 (Bottom-Left) = p2 + v_d
  // p4 (Bottom-Right) = p1 + v_d
  
  // Right Face (R)
  // Origin (CX, CY).
  // v_down = (0, S).
  // v_right = (dx, -dy).
  // Grid 3x3.
  // Standard R face:
  // 0 1 2 (Top)
  // 3 4 5
  // 6 7 8 (Bottom)
  // 
  // Top edge is along U face Right edge.
  // Left edge is against Front Edge (vertical).
  // 
  // Sticker 0 (Top-Left of R face) touches Front Edge.
  // Sticker 3, 6 touch Front Edge.
  // 
  // Sticker (r, c):
  // r 0..2 (Top->Bottom).
  // c 0..2 (Left->Right).
  // c=0 is Left (near Center). c=2 is Right (far).
  // 
  // Top-Left corner of R face is (CX, CY).
  // Corresponds to Top-Left corner of Sticker (0, 0).
  // 
  // Sticker (r, c):
  // Top-Left corner = Start + r*v_down + c*v_right.
  // Vertices:
  // p1 (Top-Left)
  // p2 (Top-Right) = p1 + v_right
  // p3 (Bottom-Right) = p2 + v_down
  // p4 (Bottom-Left) = p1 + v_down

  return (
    <div className={cn("relative flex items-center justify-center bg-muted/50 p-2 rounded-md", className)}>
      <svg width={size} height={size} viewBox={`0 0 200 200`}>
        {/* Top Face */}
        <g>
           {[0,1,2,3,4,5,6,7,8].map(i => {
             // Map i to r,c
             // map[0]={1,0}, 1:{0,0}, 2:{0,1}, 3:{2,0}, 4:{1,1}, 5:{0,2}, 6:{2,1}, 7:{2,2}, 8:{1,2}
             const map = [
               {r:1, c:0}, {r:0, c:0}, {r:0, c:1},
               {r:2, c:0}, {r:1, c:1}, {r:0, c:2},
               {r:2, c:1}, {r:2, c:2}, {r:1, c:2}
             ];
             const {r, c} = map[i];
             const origin = {x: CX, y: CY - 3*S};
             const v_dl = {x: -dx, y: dy};
             const v_dr = {x: dx, y: dy};
             
             // p1 = Origin + c*v_dr + r*v_dl
             const x1 = origin.x + c*v_dr.x + r*v_dl.x;
             const y1 = origin.y + c*v_dr.y + r*v_dl.y;
             
             // Points: p1 -> +dr -> +dl -> -dr (back to p1+dl)
             const pts = [
               {x: x1, y: y1},
               {x: x1 + v_dr.x, y: y1 + v_dr.y},
               {x: x1 + v_dr.x + v_dl.x, y: y1 + v_dr.y + v_dl.y},
               {x: x1 + v_dl.x, y: y1 + v_dl.y}
             ];
             
             return (
               <polygon 
                 key={`u-${i}`}
                 points={pts.map(pt => p(pt.x, pt.y)).join(' ')}
                 fill={uStickers[i]}
                 stroke={C.k}
                 strokeWidth="2"
               />
             );
           })}
        </g>

        {/* Left Face */}
        <g>
          {[0,1,2,3,4,5,6,7,8].map(i => {
             const r = Math.floor(i / 3);
             const c = i % 3;
             
             const start = {x: CX, y: CY};
             const v_l = {x: -dx, y: -dy};
             const v_d = {x: 0, y: S};
             
             // Top-Right corner of sticker (r, c) = Start + r*v_d + (2-c)*v_l
             const x1 = start.x + r*v_d.x + (2-c)*v_l.x;
             const y1 = start.y + r*v_d.y + (2-c)*v_l.y;
             
             // p1 (TR), p2 (TL=p1+vl), p3 (BL=p2+vd), p4 (BR=p1+vd)
             const pts = [
               {x: x1, y: y1},
               {x: x1 + v_l.x, y: y1 + v_l.y},
               {x: x1 + v_l.x + v_d.x, y: y1 + v_l.y + v_d.y},
               {x: x1 + v_d.x, y: y1 + v_d.y}
             ];
             
             return (
               <polygon 
                 key={`l-${i}`}
                 points={pts.map(pt => p(pt.x, pt.y)).join(' ')}
                 fill={lStickers[i]}
                 stroke={C.k}
                 strokeWidth="2"
               />
             );
          })}
        </g>

        {/* Right Face */}
        <g>
          {[0,1,2,3,4,5,6,7,8].map(i => {
             const r = Math.floor(i / 3);
             const c = i % 3;
             
             const start = {x: CX, y: CY};
             const v_r = {x: dx, y: -dy};
             const v_d = {x: 0, y: S};
             
             // Top-Left corner = Start + r*v_down + c*v_right
             const x1 = start.x + r*v_d.x + c*v_r.x;
             const y1 = start.y + r*v_d.y + c*v_r.y;
             
             // p1 (TL), p2 (TR=p1+vr), p3 (BR=p2+vd), p4 (BL=p1+vd)
             const pts = [
               {x: x1, y: y1},
               {x: x1 + v_r.x, y: y1 + v_r.y},
               {x: x1 + v_r.x + v_d.x, y: y1 + v_r.y + v_d.y},
               {x: x1 + v_d.x, y: y1 + v_d.y}
             ];
             
             return (
               <polygon 
                 key={`r-${i}`}
                 points={pts.map(pt => p(pt.x, pt.y)).join(' ')}
                 fill={rStickers[i]}
                 stroke={C.k}
                 strokeWidth="2"
               />
             );
          })}
        </g>
      </svg>
    </div>
  );
};
