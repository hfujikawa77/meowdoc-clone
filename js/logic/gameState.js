/**
 * MeowDoku game state management (no DOM dependency).
 * Depends on: window.MeowdokuValidator
 */
window.MeowdokuGameState = (function (Validator) {
  "use strict";

  const MAX_MISTAKES = 3;

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
    const mistakes = savedPuzzleState ? savedPuzzleState.mistakes || 0 : 0;

    return {
      puzzle,
      cells,
      history: [],
      elapsedSeconds,
      mistakes,
      lastMistake: null,
      cleared: Validator.isSolved(puzzle, cells),
      gameOver: mistakes >= MAX_MISTAKES,
    };
  }

  /** この猫の配置が行・列・エリアの重複、または隣接ルールに違反しているか */
  function isInvalidPlacement(puzzle, cells, row, col) {
    const regionId = puzzle.regions[row][col];
    return (
      !Validator.isRowValid(cells, row) ||
      !Validator.isColumnValid(cells, col) ||
      !Validator.isRegionValid(puzzle, cells, regionId) ||
      Validator.hasAdjacentCats(cells)
    );
  }

  /** シングルタップ: empty <-> cross のみ切り替える（猫マスは無視） */
  function toggleCross(state, row, col) {
    if (state.cleared || state.gameOver) return state;

    const current = state.cells[row][col];
    if (current === "cat") return state;

    state.history.push(cloneCells(state.cells));
    state.cells[row][col] = current === "empty" ? "cross" : "empty";
    return state;
  }

  /** ダブルタップ: 猫の設置・撤去を行う */
  function toggleCat(state, row, col) {
    if (state.cleared || state.gameOver) return state;

    state.lastMistake = null;
    const current = state.cells[row][col];

    if (current === "cat") {
      state.history.push(cloneCells(state.cells));
      state.cells[row][col] = "empty";
      state.cleared = Validator.isSolved(state.puzzle, state.cells);
      return state;
    }

    const trial = cloneCells(state.cells);
    trial[row][col] = "cat";
    if (isInvalidPlacement(state.puzzle, trial, row, col)) {
      state.mistakes++;
      state.lastMistake = { row, col };
      if (state.mistakes >= MAX_MISTAKES) state.gameOver = true;
      return state;
    }

    state.history.push(cloneCells(state.cells));
    state.cells[row][col] = "cat";
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
    state.mistakes = 0;
    state.lastMistake = null;
    state.cleared = false;
    state.gameOver = false;
    return state;
  }

  return { createState, toggleCross, toggleCat, undo, reset, emptyCells, cloneCells, MAX_MISTAKES };
})(window.MeowdokuValidator);
