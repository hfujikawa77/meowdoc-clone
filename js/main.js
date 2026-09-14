/**
 * Meowdoku - UI wiring. Depends on globals set up by the other js/ files.
 */
(function () {
  "use strict";

  const PUZZLES = window.MEOWDOKU_PUZZLES;
  const GameState = window.MeowdokuGameState;
  const Storage = window.MeowdokuStorage;
  const Validator = window.MeowdokuValidator;

  const REGION_COLOR_COUNT = 8;
  const DOUBLE_TAP_MS = 300;

  const boardEl = document.getElementById("board");
  const levelLabelEl = document.getElementById("level-label");
  const timerEl = document.getElementById("timer");
  const catCounterEl = document.getElementById("cat-counter");
  const heartsEl = document.getElementById("hearts");
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
  const pendingTaps = new Map();

  function clearPendingTaps() {
    for (const timer of pendingTaps.values()) clearTimeout(timer);
    pendingTaps.clear();
  }

  function formatTime(totalSeconds) {
    const m = Math.floor(totalSeconds / 60).toString().padStart(2, "0");
    const s = Math.floor(totalSeconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  }

  function getPuzzleById(id) {
    return PUZZLES.find((p) => p.id === id) || PUZZLES[0];
  }

  /** 未クリアの問題を優先してランダムに選ぶ（全部クリア済みなら完全ランダム） */
  function pickRandomPuzzleId(excludeId) {
    const others = PUZZLES.filter((p) => p.id !== excludeId);
    const uncleared = others.filter((p) => !savedData.clearedPuzzleIds.includes(p.id));
    const pool = uncleared.length > 0 ? uncleared : others.length > 0 ? others : PUZZLES;
    return pool[Math.floor(Math.random() * pool.length)].id;
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

        cell.addEventListener("click", () => handleCellTap(row, col));
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

        // 変化したマスだけDOMを更新する（毎回全マス作り直すと
        // ポップインアニメーションが無関係なマスまで再生されてしまうため）
        if (cell.dataset.value === value) continue;
        cell.dataset.value = value;
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
    catCounterEl.textContent = `🐱 ${Validator.totalCats(state.cells)} / ${currentPuzzle.size}`;
    const remainingLives = GameState.MAX_MISTAKES - state.mistakes;
    heartsEl.textContent =
      "❤️".repeat(Math.max(remainingLives, 0)) + "🤍".repeat(state.mistakes);
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

  /** シングルタップとダブルタップを区別する（一定時間内の2回目のタップだけをダブルタップ扱いにする） */
  function handleCellTap(row, col) {
    if (state.cleared || state.gameOver) return;
    const key = `${row},${col}`;
    const pending = pendingTaps.get(key);

    if (pending) {
      clearTimeout(pending);
      pendingTaps.delete(key);
      handleDoubleTap(row, col);
    } else {
      const timer = setTimeout(() => {
        pendingTaps.delete(key);
        handleSingleTap(row, col);
      }, DOUBLE_TAP_MS);
      pendingTaps.set(key, timer);
    }
  }

  function handleSingleTap(row, col) {
    GameState.toggleCross(state, row, col);
    render();
    persistCurrentProgress();
  }

  function handleDoubleTap(row, col) {
    GameState.toggleCat(state, row, col);
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
    clearPendingTaps();

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
        `${puzzle.title} ${puzzle.size}x${puzzle.size}${cleared ? " クリア済み" : ""}`
      );
      btn.innerHTML = `
        <span class="level-check">${cleared ? "✅" : "🐾"}</span>
        <span>${String(puzzle.id).padStart(2, "0")}</span>
        <span class="level-size">${puzzle.size}×${puzzle.size}</span>
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
    clearPendingTaps();
    GameState.undo(state);
    render();
    persistCurrentProgress();
  });

  resetBtn.addEventListener("click", () => {
    if (!window.confirm("Reset this puzzle?")) return;
    clearPendingTaps();
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
    loadPuzzle(pickRandomPuzzleId(currentPuzzle.id));
  });

  gameoverRetryBtn.addEventListener("click", () => {
    hideGameOverModal();
    clearPendingTaps();
    GameState.reset(state);
    render();
    persistCurrentProgress();
    startTimer();
  });

  gameoverLevelsBtn.addEventListener("click", () => {
    hideGameOverModal();
    openLevelSelect();
  });

  const isFreshPlayer =
    Object.keys(savedData.puzzleStates).length === 0 && savedData.clearedPuzzleIds.length === 0;
  const initialId = isFreshPlayer
    ? pickRandomPuzzleId(null)
    : getPuzzleById(savedData.currentPuzzleId).id;
  loadPuzzle(initialId);
})();
