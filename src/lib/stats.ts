type Solve = {
  timeMs: number;
  date: string; // ISO string
};

const STORAGE_KEY = "cubick_solve_times";

function getUserStorageKey(userId: string) {
  return `${STORAGE_KEY}:${userId}`;
}

export function getSolves(): Solve[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((x) => typeof x?.timeMs === "number" && typeof x?.date === "string");
  } catch {
    return [];
  }
}

export function getSolvesForUser(userId?: string): Solve[] {
  if (!userId) return getSolves();
  try {
    const raw = localStorage.getItem(getUserStorageKey(userId));
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((x) => typeof x?.timeMs === "number" && typeof x?.date === "string");
  } catch {
    return [];
  }
}

export function addSolve(timeMs: number) {
  if (!Number.isFinite(timeMs) || timeMs <= 0) return;
  const solves = getSolves();
  solves.push({ timeMs, date: new Date().toISOString() });
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(solves));
  } catch {
    // ignore write errors
  }
}

export function addSolveForUser(userId: string | undefined, timeMs: number) {
  if (!Number.isFinite(timeMs) || timeMs <= 0) return;
  if (!userId) {
    return addSolve(timeMs);
  }
  const solves = getSolvesForUser(userId);
  solves.push({ timeMs, date: new Date().toISOString() });
  try {
    localStorage.setItem(getUserStorageKey(userId), JSON.stringify(solves));
  } catch {
    // ignore write errors
  }
}

export function migrateGlobalToUser(userId: string): boolean {
  try {
    const userKey = getUserStorageKey(userId);
    const userRaw = localStorage.getItem(userKey);
    const globalRaw = localStorage.getItem(STORAGE_KEY);
    if (userRaw) {
      // Уже есть пользовательские данные — ничего не переносим
      return false;
    }
    if (!globalRaw) return false;

    const globalParsed = JSON.parse(globalRaw);
    if (!Array.isArray(globalParsed)) return false;
    const filtered = globalParsed.filter((x) => typeof x?.timeMs === "number" && typeof x?.date === "string");
    localStorage.setItem(userKey, JSON.stringify(filtered));
    // Очищаем глобальный ключ, чтобы избежать дублирования
    localStorage.removeItem(STORAGE_KEY);
    return true;
  } catch {
    return false;
  }
}

export function formatMs(milliseconds: number): string {
  const totalSeconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  const ms = Math.floor((milliseconds % 1000) / 10);
  return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}.${ms
    .toString()
    .padStart(2, "0")}`;
}

export function computeStats(solves: Solve[]) {
  const count = solves.length;
  if (count === 0) {
    return { count: 0, bestMs: null as number | null, avgMs: null as number | null };
  }
  const times = solves.map((s) => s.timeMs);
  const bestMs = Math.min(...times);
  const avgMs = Math.round(times.reduce((a, b) => a + b, 0) / count);
  return { count, bestMs, avgMs };
}

export function calculateAoN(solves: Solve[], n: number): number | null {
  if (solves.length < n) return null;
  
  // Take the last n solves (assuming solves are sorted by date ascending, or we need to sort them)
  // The 'solves' passed here should be the relevant slice. 
  // Standard practice: if we pass all solves, we take the LAST n.
  // But caller might want specific window. Let's assume caller passes the window or we take last n.
  // Let's standardise: take LAST n solves from the provided array.
  
  const lastN = solves.slice(-n);
  const times = lastN.map(s => s.timeMs).sort((a, b) => a - b);
  
  // Remove best and worst
  // For Ao5: remove 1 best, 1 worst (indices 0 and n-1)
  // For Ao12: remove 1 best, 1 worst (indices 0 and n-1)
  // Standard WCA regulation:
  // "Trimmed Average": remove top 5% and bottom 5%?
  // Ao5: remove best 1, worst 1. (3 remaining)
  // Ao12: remove best 1, worst 1. (10 remaining)
  
  // WCA Regs:
  // 9f8) For "Average of 5", the best and worst results are removed, and the arithmetic mean of the remaining 3 results is counted.
  // 9f9) For "Average of 12", the best and worst results are removed, and the arithmetic mean of the remaining 10 results is counted.
  
  const trimmed = times.slice(1, -1);
  const sum = trimmed.reduce((a, b) => a + b, 0);
  return Math.round(sum / trimmed.length);
}

export type { Solve };