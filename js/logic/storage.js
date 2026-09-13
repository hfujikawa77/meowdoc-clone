/**
 * MeowDoku localStorage persistence.
 *
 * SavedData shape:
 * {
 *   currentPuzzleId: number,
 *   puzzleStates: { [puzzleId]: { cells: string[][], elapsedSeconds: number } },
 *   clearedPuzzleIds: number[],
 *   bestTimes: { [puzzleId]: number }
 * }
 */
window.MeowdokuStorage = (function () {
  "use strict";

  const KEY = "meowdoku-save-v1";

  function defaultData() {
    return {
      currentPuzzleId: 1,
      puzzleStates: {},
      clearedPuzzleIds: [],
      bestTimes: {},
    };
  }

  function load() {
    try {
      const raw = localStorage.getItem(KEY);
      if (!raw) return defaultData();
      const parsed = JSON.parse(raw);
      return Object.assign(defaultData(), parsed);
    } catch (e) {
      return defaultData();
    }
  }

  function save(data) {
    try {
      localStorage.setItem(KEY, JSON.stringify(data));
    } catch (e) {
      // localStorageが使えなくてもゲーム自体は続行できるので無視する
    }
  }

  function savePuzzleState(data, puzzleId, cells, elapsedSeconds) {
    data.puzzleStates[puzzleId] = { cells, elapsedSeconds };
    save(data);
  }

  function markCleared(data, puzzleId, elapsedSeconds) {
    if (!data.clearedPuzzleIds.includes(puzzleId)) {
      data.clearedPuzzleIds.push(puzzleId);
    }
    const best = data.bestTimes[puzzleId];
    if (best === undefined || elapsedSeconds < best) {
      data.bestTimes[puzzleId] = elapsedSeconds;
    }
    save(data);
  }

  return { load, save, savePuzzleState, markCleared, defaultData };
})();
