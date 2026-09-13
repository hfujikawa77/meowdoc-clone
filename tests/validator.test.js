const test = require("node:test");
const assert = require("node:assert/strict");
const Validator = require("../js/logic/validator.js");

function emptyCells(n) {
  return Array.from({ length: n }, () => Array(n).fill("empty"));
}

// 3x3 puzzle, each cell its own region (id = row*3+col) so region rules
// don't interfere with the row/column-specific tests below.
const soloRegionsPuzzle = {
  size: 3,
  regions: [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
  ],
};

// 5x5 puzzle with a valid complete solution, one cat per row/col/region,
// no two cats adjacent (matches js/data/puzzles.js Level 01 shape).
const validPuzzle = {
  size: 5,
  regions: [
    [1, 1, 0, 0, 0],
    [1, 1, 1, 0, 0],
    [1, 1, 2, 0, 0],
    [1, 1, 4, 3, 3],
    [4, 4, 4, 3, 3],
  ],
};
const validSolutionCells = (() => {
  const cells = emptyCells(5);
  cells[0][3] = "cat";
  cells[1][0] = "cat";
  cells[2][2] = "cat";
  cells[3][4] = "cat";
  cells[4][1] = "cat";
  return cells;
})();

test("正常な完成盤面は isSolved が true", () => {
  assert.equal(Validator.isSolved(validPuzzle, validSolutionCells), true);
});

test("同じ行に猫2匹いると isRowValid が false", () => {
  const cells = emptyCells(3);
  cells[0][0] = "cat";
  cells[0][2] = "cat";
  assert.equal(Validator.isRowValid(cells, 0), false);
});

test("同じ列に猫2匹いると isColumnValid が false", () => {
  const cells = emptyCells(3);
  cells[0][0] = "cat";
  cells[2][0] = "cat";
  assert.equal(Validator.isColumnValid(cells, 0), false);
});

test("同じエリアに猫2匹いると isRegionValid が false", () => {
  const regionPuzzle = {
    size: 3,
    regions: [
      [0, 0, 1],
      [0, 2, 1],
      [2, 2, 1],
    ],
  };
  const regionCells = emptyCells(3);
  regionCells[0][0] = "cat"; // region 0
  regionCells[1][0] = "cat"; // region 0 too
  assert.equal(Validator.isRegionValid(regionPuzzle, regionCells, 0), false);
});

test("横に隣接する猫があると hasAdjacentCats が true", () => {
  const cells = emptyCells(3);
  cells[1][0] = "cat";
  cells[1][1] = "cat";
  assert.equal(Validator.hasAdjacentCats(cells), true);
});

test("縦に隣接する猫があると hasAdjacentCats が true", () => {
  const cells = emptyCells(3);
  cells[0][1] = "cat";
  cells[1][1] = "cat";
  assert.equal(Validator.hasAdjacentCats(cells), true);
});

test("斜めに隣接する猫があると hasAdjacentCats が true", () => {
  const cells = emptyCells(3);
  cells[0][0] = "cat";
  cells[1][1] = "cat";
  assert.equal(Validator.hasAdjacentCats(cells), true);
});

test("隣接していない猫同士は hasAdjacentCats が false", () => {
  const cells = emptyCells(3);
  cells[0][0] = "cat";
  cells[2][2] = "cat";
  assert.equal(Validator.hasAdjacentCats(cells), false);
});

test("猫の数が足りない場合は isSolved が false", () => {
  const cells = emptyCells(soloRegionsPuzzle.size);
  cells[0][0] = "cat";
  assert.equal(Validator.isSolved(soloRegionsPuzzle, cells), false);
});
