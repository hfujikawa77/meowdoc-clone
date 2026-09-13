/**
 * Meowdoku - UI wiring. Depends on globals set up by the other js/ files.
 */
(function () {
  "use strict";

  const PUZZLES = window.MEOWDOKU_PUZZLES;
  const GameState = window.MeowdokuGameState;
  const Storage = window.MeowdokuStorage;

  const REGION_COLOR_COUNT = 8;

  const boardEl = document.getElementById("board");
  const levelLabelEl = document.getElementById("level-label");
  const timerEl = document.getElementById("timer");
  const mistakesEl = document.getElementById("mistakes");
  const undoBtn = document.getElementById("undo-btn");
  const resetBtn = document.getElementById("reset-btn");
  const levelSelectBtn = document.getElementById("level-select-btn");

  const gameoverOverlay = document.getElementById("gameover-overlay");
  const gameoverLevelsBtn = document.getElementById("gameover-levels-btn");
  const gameoverRetryBtn = document.getElementById("gameover-retry-btn");

  const clearOverlay = document.getElementById("clear-overlay");
  const clearLevelText = document.getElementById("clear-level-text");
  const clearTimeEl = document.getElementById("clear-time");
  const clearBestEl = document.getElementById("clear-best");
  const clearLevelsBtn = document.getElementById("clear-levels-btn");
  const clearNextBtn = document.getElementById("clear-next-btn");

  const levelOverlay = document.getElementById("level-overlay");
  const levelGridEl = document.getElementById("level-grid");
  const levelCloseBtn = document.getElementById("level-close-btn");

  let savedData = Storage.load();
  let currentPuzzle = null;
  let state = null;
  let cellEls = [];
  let timerInterval = null;

  function formatTime(totalSeconds) {
    const m = Math.floor(totalSeconds / 60).toString().padStart(2, "0");
    const s = Math.floor(totalSeconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  }

  function getPuzzleById(id) {
    return PUZZLES.find((p) => p.id === id) || PUZZLES[0];
  }

  function persistCurrentProgress() {
    if (!currentPuzzle || !state) return;
    savedData.currentPuzzleId = currentPuzzle.id;
    Storage.savePuzzleState(
      savedData,
      currentPuzzle.id,
      state.cells,
      state.elapsedSeconds,
      state.mistakes
    );
  }

  function stopTimer() {
    if (timerInterval) clearInterval(timerInterval);
    timerInterval = null;
  }

  function startTimer() {
    stopTimer();
    timerInterval = setInterval(() => {
      if (state.cleared || state.gameOver) return;
      state.elapsedSeconds++;
      timerEl.textContent = formatTime(state.elapsedSeconds);
      persistCurrentProgress();
    }, 1000);
  }

  function buildBoardDom(puzzle) {
    boardEl.innerHTML = "";
    boardEl.style.gridTemplateColumns = `repeat(${puzzle.size}, 1fr)`;
    boardEl.style.gridTemplateRows = `repeat(${puzzle.size}, 1fr)`;
    cellEls = [];

    for (let row = 0; row < puzzle.size; row++) {
      const rowEls = [];
      for (let col = 0; col < puzzle.size; col++) {
        const cell = document.createElement("button");
        cell.type = "button";
        cell.className = "cell";
        const regionId = puzzle.regions[row][col];
        cell.style.setProperty("--cell-bg", `var(--region-${regionId % REGION_COLOR_COUNT})`);

        if (col < puzzle.size - 1 && puzzle.regions[row][col + 1] !== regionId) {
          cell.classList.add("region-edge-right");
        }
        if (row < puzzle.size - 1 && puzzle.regions[row + 1][col] !== regionId) {
          cell.classList.add("region-edge-bottom");
        }

        cell.addEventListener("click", () => onCellClick(row, col));
        boardEl.appendChild(cell);
        rowEls.push(cell);
      }
      cellEls.push(rowEls);
    }
  }

  function render() {
    for (let row = 0; row < currentPuzzle.size; row++) {
      for (let col = 0; col < currentPuzzle.size; col++) {
        const cell = cellEls[row][col];
        const value = state.cells[row][col];
        cell.innerHTML = "";

        if (value === "cat") {
          const span = document.createElement("span");
          span.className = "mark-cat";
          span.textContent = "🐱";
          cell.appendChild(span);
          cell.setAttribute("aria-label", `${row + 1}行${col + 1}列 猫`);
        } else if (value === "cross") {
          const span = document.createElement("span");
          span.className = "mark-cross";
          span.textContent = "×";
          cell.appendChild(span);
          cell.setAttribute("aria-label", `${row + 1}行${col + 1}列 バツ`);
        } else {
          cell.setAttribute("aria-label", `${row + 1}行${col + 1}列 空欄`);
        }
      }
    }

    levelLabelEl.textContent = currentPuzzle.title;
    timerEl.textContent = formatTime(state.elapsedSeconds);
    mistakesEl.textContent = `Miss: ${state.mistakes} / ${GameState.MAX_MISTAKES}`;
    undoBtn.disabled = state.history.length === 0;

    if (state.lastMistake) {
      const { row, col } = state.lastMistake;
      const cell = cellEls[row][col];
      cell.classList.remove("mistake");
      // reflow to restart the animation if the same cell mistakes twice in a row
      void cell.offsetWidth;
      cell.classList.add("mistake");
      state.lastMistake = null;
    }
  }

  function showClearModal() {
    clearLevelText.textContent = `${currentPuzzle.title} Clear!`;
    clearTimeEl.textContent = formatTime(state.elapsedSeconds);
    const best = savedData.bestTimes[currentPuzzle.id];
    clearBestEl.textContent = formatTime(best !== undefined ? best : state.elapsedSeconds);
    clearOverlay.classList.remove("hidden");
  }

  function hideClearModal() {
    clearOverlay.classList.add("hidden");
  }

  function showGameOverModal() {
    gameoverOverlay.classList.remove("hidden");
  }

  function hideGameOverModal() {
    gameoverOverlay.classList.add("hidden");
  }

  function onCellClick(row, col) {
    if (state.cleared || state.gameOver) return;
    GameState.cycleCell(state, row, col);
    render();
    persistCurrentProgress();

    if (state.cleared) {
      stopTimer();
      Storage.markCleared(savedData, currentPuzzle.id, state.elapsedSeconds);
      showClearModal();
    } else if (state.gameOver) {
      stopTimer();
      showGameOverModal();
    }
  }

  function loadPuzzle(id) {
    persistCurrentProgress();
    hideClearModal();
    hideGameOverModal();

    currentPuzzle = getPuzzleById(id);
    const savedPuzzleState = savedData.puzzleStates[currentPuzzle.id];
    state = GameState.createState(currentPuzzle, savedPuzzleState);

    buildBoardDom(currentPuzzle);
    render();

    savedData.currentPuzzleId = currentPuzzle.id;
    Storage.save(savedData);

    if (!state.cleared && !state.gameOver) startTimer();
    else stopTimer();

    if (state.gameOver) showGameOverModal();
  }

  function buildLevelGrid() {
    levelGridEl.innerHTML = "";
    for (const puzzle of PUZZLES) {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "level-btn";
      if (currentPuzzle && puzzle.id === currentPuzzle.id) {
        btn.classList.add("current");
      }
      const cleared = savedData.clearedPuzzleIds.includes(puzzle.id);
      btn.setAttribute(
        "aria-label",
        `${puzzle.title}${cleared ? " クリア済み" : ""}`
      );
      btn.innerHTML = `
        <span class="level-check">${cleared ? "✅" : "🐾"}</span>
        <span>${String(puzzle.id).padStart(2, "0")}</span>
      `;
      btn.addEventListener("click", () => {
        levelOverlay.classList.add("hidden");
        loadPuzzle(puzzle.id);
      });
      levelGridEl.appendChild(btn);
    }
  }

  function openLevelSelect() {
    buildLevelGrid();
    levelOverlay.classList.remove("hidden");
  }

  undoBtn.addEventListener("click", () => {
    GameState.undo(state);
    render();
    persistCurrentProgress();
  });

  resetBtn.addEventListener("click", () => {
    if (!window.confirm("Reset this puzzle?")) return;
    GameState.reset(state);
    render();
    persistCurrentProgress();
    startTimer();
  });

  levelSelectBtn.addEventListener("click", openLevelSelect);
  levelCloseBtn.addEventListener("click", () => levelOverlay.classList.add("hidden"));

  clearLevelsBtn.addEventListener("click", () => {
    hideClearModal();
    openLevelSelect();
  });

  clearNextBtn.addEventListener("click", () => {
    const idx = PUZZLES.findIndex((p) => p.id === currentPuzzle.id);
    const next = PUZZLES[idx + 1];
    if (next) {
      loadPuzzle(next.id);
    } else {
      hideClearModal();
      openLevelSelect();
    }
  });

  gameoverRetryBtn.addEventListener("click", () => {
    hideGameOverModal();
    GameState.reset(state);
    render();
    persistCurrentProgress();
    startTimer();
  });

  gameoverLevelsBtn.addEventListener("click", () => {
    hideGameOverModal();
    openLevelSelect();
  });

  const initialId = getPuzzleById(savedData.currentPuzzleId).id;
  loadPuzzle(initialId);
})();
