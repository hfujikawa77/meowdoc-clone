/**
 * MeowDoku validator - pure game-rule logic, no DOM dependency.
 * cells: string[][] of "empty" | "cross" | "cat"
 * puzzle: { size: number, regions: number[][] }
 */
(function (root, factory) {
  if (typeof module === "object" && module.exports) {
    module.exports = factory();
  } else {
    root.MeowdokuValidator = factory();
  }
})(typeof self !== "undefined" ? self : this, function () {
  "use strict";

  function countCatsInRow(cells, row) {
    return cells[row].filter((v) => v === "cat").length;
  }

  function countCatsInColumn(cells, col) {
    let count = 0;
    for (let row = 0; row < cells.length; row++) {
      if (cells[row][col] === "cat") count++;
    }
    return count;
  }

  function countCatsInRegion(puzzle, cells, regionId) {
    let count = 0;
    for (let row = 0; row < puzzle.size; row++) {
      for (let col = 0; col < puzzle.size; col++) {
        if (puzzle.regions[row][col] === regionId && cells[row][col] === "cat") {
          count++;
        }
      }
    }
    return count;
  }

  function isRowValid(cells, row) {
    return countCatsInRow(cells, row) <= 1;
  }

  function isColumnValid(cells, col) {
    return countCatsInColumn(cells, col) <= 1;
  }

  function isRegionValid(puzzle, cells, regionId) {
    return countCatsInRegion(puzzle, cells, regionId) <= 1;
  }

  function totalCats(cells) {
    let count = 0;
    for (const row of cells) {
      for (const value of row) {
        if (value === "cat") count++;
      }
    }
    return count;
  }

  function hasAdjacentCats(cells) {
    const size = cells.length;
    const catCells = [];
    for (let row = 0; row < size; row++) {
      for (let col = 0; col < size; col++) {
        if (cells[row][col] === "cat") catCells.push({ row, col });
      }
    }
    for (let i = 0; i < catCells.length; i++) {
      for (let j = i + 1; j < catCells.length; j++) {
        const a = catCells[i];
        const b = catCells[j];
        if (Math.abs(a.row - b.row) <= 1 && Math.abs(a.col - b.col) <= 1) {
          return true;
        }
      }
    }
    return false;
  }

  function isSolved(puzzle, cells) {
    const size = puzzle.size;

    if (totalCats(cells) !== size) return false;
    if (hasAdjacentCats(cells)) return false;

    for (let i = 0; i < size; i++) {
      if (countCatsInRow(cells, i) !== 1) return false;
      if (countCatsInColumn(cells, i) !== 1) return false;
    }

    const regionIds = new Set();
    for (let row = 0; row < size; row++) {
      for (let col = 0; col < size; col++) {
        regionIds.add(puzzle.regions[row][col]);
      }
    }
    for (const regionId of regionIds) {
      if (countCatsInRegion(puzzle, cells, regionId) !== 1) return false;
    }

    return true;
  }

  return {
    isRowValid,
    isColumnValid,
    isRegionValid,
    hasAdjacentCats,
    isSolved,
    countCatsInRow,
    countCatsInColumn,
    countCatsInRegion,
    totalCats,
  };
});
