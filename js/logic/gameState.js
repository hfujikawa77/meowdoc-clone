/**
 * MeowDoku game state management (no DOM dependency).
 * Depends on: window.MeowdokuValidator
 */
window.MeowdokuGameState = (function (Validator) {
  "use strict";

  const NEXT_STATE = { empty: "cross", cross: "cat", cat: "empty" };

  function emptyCells(size) {
    return Array.from({ length: size }, () => Array(size).fill("empty"));
  }

  function cloneCells(cells) {
    return cells.map((row) => row.slice());
  }

  function createState(puzzle, savedPuzzleState) {
    const cells = savedPuzzleState
      ? cloneCells(savedPuzzleState.cells)
      : emptyCells(puzzle.size);
    const elapsedSeconds = savedPuzzleState ? savedPuzzleState.elapsedSeconds : 0;

    return {
      puzzle,
      cells,
      history: [],
      elapsedSeconds,
      cleared: Validator.isSolved(puzzle, cells),
    };
  }

  function neighborsOf(size, row, col) {
    const result = [];
    for (let dr = -1; dr <= 1; dr++) {
      for (let dc = -1; dc <= 1; dc++) {
        if (dr === 0 && dc === 0) continue;
        const r = row + dr;
        const c = col + dc;
        if (r >= 0 && r < size && c >= 0 && c < size) result.push([r, c]);
      }
    }
    return result;
  }

  /** 猫を置いたときに、同じ行・列・エリア・周囲8マスを自動で×にする */
  function autoCross(state, row, col) {
    const { puzzle, cells } = state;
    const size = puzzle.size;
    const regionId = puzzle.regions[row][col];

    for (let c = 0; c < size; c++) {
      if (c !== col && cells[row][c] === "empty") cells[row][c] = "cross";
    }
    for (let r = 0; r < size; r++) {
      if (r !== row && cells[r][col] === "empty") cells[r][col] = "cross";
    }
    for (let r = 0; r < size; r++) {
      for (let c = 0; c < size; c++) {
        if (
          puzzle.regions[r][c] === regionId &&
          !(r === row && c === col) &&
          cells[r][c] === "empty"
        ) {
          cells[r][c] = "cross";
        }
      }
    }
    for (const [r, c] of neighborsOf(size, row, col)) {
      if (cells[r][c] === "empty") cells[r][c] = "cross";
    }
  }

  /** セルをタップしたときの状態遷移: empty -> cross -> cat -> empty */
  function cycleCell(state, row, col) {
    if (state.cleared) return state;

    state.history.push(cloneCells(state.cells));

    const current = state.cells[row][col];
    const next = NEXT_STATE[current];
    state.cells[row][col] = next;

    if (next === "cat") {
      autoCross(state, row, col);
    }

    state.cleared = Validator.isSolved(state.puzzle, state.cells);
    return state;
  }

  function undo(state) {
    if (state.history.length === 0) return state;
    state.cells = state.history.pop();
    state.cleared = Validator.isSolved(state.puzzle, state.cells);
    return state;
  }

  function reset(state) {
    state.cells = emptyCells(state.puzzle.size);
    state.history = [];
    state.elapsedSeconds = 0;
    state.cleared = false;
    return state;
  }

  return { createState, cycleCell, undo, reset, emptyCells, cloneCells };
})(window.MeowdokuValidator);
