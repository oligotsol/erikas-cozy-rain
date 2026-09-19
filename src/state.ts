const STORAGE_KEY = "erika-cozy-rain-v1";

export const UNLOCK_THRESHOLD = 15;

export interface GameState {
  cozyPoints: number;
  babePoints: number;
  unlockedKeepsake: boolean;
  muted: boolean;
  visited: boolean;
  coffeeCount: number;
  bookCount: number;
  bakeCount: number;
  showCount: number;
}

const DEFAULT_STATE: GameState = {
  cozyPoints: 0,
  babePoints: 0,
  unlockedKeepsake: false,
  muted: false,
  visited: false,
  coffeeCount: 0,
  bookCount: 0,
  bakeCount: 0,
  showCount: 0,
};

export function loadState(): GameState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { ...DEFAULT_STATE };
    const parsed = JSON.parse(raw) as Partial<GameState>;
    return { ...DEFAULT_STATE, ...parsed };
  } catch {
    return { ...DEFAULT_STATE };
  }
}

export function saveState(state: GameState): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export function markVisited(state: GameState): GameState {
  const next = { ...state, visited: true };
  saveState(next);
  return next;
}

export function setMuted(state: GameState, muted: boolean): GameState {
  const next = { ...state, muted };
  saveState(next);
  return next;
}

export interface AwardResult {
  state: GameState;
  justUnlocked: boolean;
}

export function awardPoints(
  state: GameState,
  cozy: number,
  babe: number,
  activity?: "coffee" | "book" | "bake" | "show",
): AwardResult {
  const wasUnlocked = state.unlockedKeepsake;
  const next: GameState = {
    ...state,
    cozyPoints: state.cozyPoints + cozy,
    babePoints: state.babePoints + babe,
  };

  if (activity) {
    const key = `${activity}Count` as const;
    next[key] = state[key] + 1;
  }

  if (next.babePoints >= UNLOCK_THRESHOLD) {
    next.unlockedKeepsake = true;
  }

  saveState(next);
  return {
    state: next,
    justUnlocked: !wasUnlocked && next.unlockedKeepsake,
  };
}
