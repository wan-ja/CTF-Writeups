(function () {
  "use strict";

  const canvas = document.getElementById("gameCanvas");
  const ctx = canvas.getContext("2d");

  const menuScreen = document.getElementById("menuScreen");
  const gameScreen = document.getElementById("gameScreen");
  const titleEl = document.getElementById("title");
  const levelHint = document.getElementById("levelHint");

  const statusText = document.getElementById("statusText");
  const restartBtn = document.getElementById("restartBtn");
  const menuBtn = document.getElementById("menuBtn");

  const levelButtons = document.querySelectorAll(".level-btn");
  const levelStatusEls = {
    1: document.getElementById("levelStatus1"),
    2: document.getElementById("levelStatus2"),
    3: document.getElementById("levelStatus3"),
    4: document.getElementById("levelStatus4"),
    5: document.getElementById("levelStatus5"), 
  };

  const maskCanvas = document.createElement("canvas");
  const maskCtx = maskCanvas.getContext("2d");
  maskCanvas.width = canvas.width;
  maskCanvas.height = canvas.height;

  const progressCanvas = document.createElement("canvas");
  const progressCtx = progressCanvas.getContext("2d");
  progressCanvas.width = canvas.width;
  progressCanvas.height = canvas.height;

  let isMouseDown = false;
  let isGameOver = false;
  let isCleared = false;
  let started = false;

  let lastX = null;
  let lastY = null;

  let currentLevel = 1;
  const MAX_LEVEL = 5;

  const STORAGE_KEY = "dalgona_highest_level";

  let highestUnlocked = loadHighestUnlocked();

  const cx = canvas.width / 2;
  const cy = canvas.height / 2;
  const cookieRadius = 200;
  const lineWidth = 18; 

  const CLEAR_THRESHOLD = 0.9;
  let totalLinePixels = 0;
  let scratchedLinePixels = 0;

  const levelMeta = {
    1: { name: "동그라미",       shape: "circle" },
    2: { name: "별",           shape: "star" },
    3: { name: "우산",         shape: "umbrella" },
    4: { name: "악몽의 삼각형", shape: "nightmare" },
    5: { name: "???",          shape: "hidden" }, 
  };

  initMenu();
  showMenu();

  restartBtn.addEventListener("click", () => {
    resetGame();
  });

  menuBtn.addEventListener("click", () => {
    showMenu();
  });

  levelButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const level = parseInt(btn.dataset.level, 10);

      if (level > highestUnlocked) {
        alert("이 레벨은 아직 잠겨 있습니다.");
        return;
      }

      startLevel(level);
    });
  });

  function loadHighestUnlocked() {
    const saved = localStorage.getItem(STORAGE_KEY);
    const n = parseInt(saved || "1", 10);
    if (isNaN(n) || n < 1) return 1;
    return Math.min(n, MAX_LEVEL);
  }

  function saveHighestUnlocked() {
    localStorage.setItem(STORAGE_KEY, String(highestUnlocked));
  }

  function initMenu() {
    updateLevelButtons();
  }

  function updateLevelButtons() {
    levelButtons.forEach((btn) => {
      const level = parseInt(btn.dataset.level, 10);
      const statusEl = levelStatusEls[level];
      if (!statusEl) return; 

      if (level <= highestUnlocked) {
        btn.classList.remove("locked");
        statusEl.textContent =
          level < highestUnlocked ? "Cleared" : "Unlocked";
        statusEl.className =
          "level-status " + (level < highestUnlocked ? "cleared" : "unlocked");
      } else {
        btn.classList.add("locked");
        statusEl.textContent = "Locked";
        statusEl.className = "level-status locked";
      }
    });
  }

  function showMenu() {
    menuScreen.style.display = "block";
    gameScreen.style.display = "none";
    titleEl.textContent = "달고나 게임";
  }

  function startLevel(level) {
    currentLevel = level;
    menuScreen.style.display = "none";
    gameScreen.style.display = "block";

    const meta = levelMeta[currentLevel];
    titleEl.textContent = `레벨 ${currentLevel} - ${meta.name}`;
    levelHint.innerHTML =
      `현재 레벨: <b>${meta.name}</b><br>`;

    resetGame();
  }

  function resetGame() {
    isMouseDown = false;
    isGameOver = false;
    isCleared = false;
    started = false;
    lastX = null;
    lastY = null;
    scratchedLinePixels = 0;

    if (currentLevel === 5) {
      statusText.textContent =
        "???";
    } else {
      statusText.textContent = "선의 90% 이상을 긁으면 성공";
    }

    drawMask();
    drawDalgona();

    progressCtx.clearRect(0, 0, progressCanvas.width, progressCanvas.height);

    totalLinePixels = countLinePixels();
  }

  function drawMask() {
    maskCtx.clearRect(0, 0, maskCanvas.width, maskCanvas.height);

    maskCtx.save();
    maskCtx.translate(cx, cy);
    maskCtx.lineWidth = lineWidth;
    maskCtx.strokeStyle = "rgba(255, 255, 255, 255)";

    const meta = levelMeta[currentLevel];

    if (meta.shape === "circle") {
      const r = 120;
      maskCtx.beginPath();
      maskCtx.arc(0, 0, r, 0, Math.PI * 2);
      maskCtx.stroke();

    } else if (meta.shape === "star") {
      drawStarPath(maskCtx, 0, 0, 120, 50);

    } else if (meta.shape === "umbrella") {
      drawUmbrellaPath(maskCtx, 0, 0, 120);

    } else if (meta.shape === "nightmare") {
      drawNightmareTrianglePath(maskCtx, 0, 0, 160);

    } else if (meta.shape === "hidden") {
      if (typeof window.stage5DrawMask === "function") {
        window.stage5DrawMask(maskCtx, 0, 0, 150);
      }
    } else {
      const r = 120;
      maskCtx.beginPath();
      maskCtx.arc(0, 0, r, 0, Math.PI * 2);
      maskCtx.stroke();
    }

    maskCtx.restore();
  }

  function drawDalgona() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#4a3b33";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.save();
    ctx.translate(cx, cy);
    const grd = ctx.createRadialGradient(0, -80, 40, 0, 0, cookieRadius);
    grd.addColorStop(0, "#ffdd99");
    grd.addColorStop(1, "#c8872b");
    ctx.fillStyle = grd;
    ctx.beginPath();
    ctx.arc(0, 0, cookieRadius, 0, Math.PI * 2);
    ctx.fill();

    ctx.lineWidth = 10;
    ctx.strokeStyle = "#8a4b14";
    ctx.stroke();

    const meta = levelMeta[currentLevel];
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = "#753e12";

    if (meta.shape === "circle") {
      const r = 120;
      ctx.beginPath();
      ctx.arc(0, 0, r, 0, Math.PI * 2);
      ctx.stroke();

    } else if (meta.shape === "star") {
      drawStarPath(ctx, 0, 0, 120, 50);

    } else if (meta.shape === "umbrella") {
      drawUmbrellaPath(ctx, 0, 0, 120);

    } else if (meta.shape === "nightmare") {
      drawNightmareTrianglePath(ctx, 0, 0, 160);

    } else if (meta.shape === "hidden") {
      if (typeof window.stage5DrawShape === "function") {
        window.stage5DrawShape(ctx, 0, 0, 150);
      }
    } else {
      const r = 120;
      ctx.beginPath();
      ctx.arc(0, 0, r, 0, Math.PI * 2);
      ctx.stroke();
    }

    ctx.restore();
  }

  function drawStarPath(c, x, y, outerR, innerR) {
    c.beginPath();
    for (let i = 0; i < 10; i++) {
      const angle = -Math.PI / 2 + (i * Math.PI) / 5;
      const r = i % 2 === 0 ? outerR : innerR;
      const px = x + Math.cos(angle) * r;
      const py = y + Math.sin(angle) * r;
      if (i === 0) c.moveTo(px, py);
      else c.lineTo(px, py);
    }
    c.closePath();
    c.stroke();
  }

  function drawUmbrellaPath(c, x, y, r) {
    c.beginPath();
    c.arc(x, y, r, Math.PI, 0, false);

    const bumps = 5;

    for (let i = 0; i < bumps; i++) {
      const t0 = -r + (2 * r * i) / bumps;
      const t1 = -r + (2 * r * (i + 1)) / bumps;
      const midX = (t0 + t1) / 2;

      const baseY = y - 4.5;        
      const midY = baseY + r / 3;  

      if (i === 0) c.moveTo(t0, baseY);
      c.quadraticCurveTo(midX, midY, t1, baseY);
    }

    const offsetX = -53;
    const offsetY = -110;

    const handleX = x + r / 2.2 + offsetX;
    const handleTopY = y + r + offsetY;
    const handleBottomY = y + r + 140 + offsetY;

    c.moveTo(handleX, handleTopY);
    c.lineTo(handleX, handleBottomY);
    c.arc(handleX - 10, handleBottomY, 10, 0, Math.PI, true);
    c.stroke();
  }

  function drawNightmareTrianglePath(c, x, y, r) {
    const offsetX = 2.5;      
    const offsetY = -50;   

    const cx0 = x + offsetX;
    const cy0 = y + offsetY;

    const side = r * 2;
    const h = (side * Math.sqrt(3)) / 2;

    const ax = cx0;              
    const ay = cy0 - h / 2;
    const bx = cx0 - side / 2;   
    const by = cy0 + h / 2;
    const cx = cx0 + side / 2;   
    const cy = cy0 + h / 2;

    function drawTri(px, py, qx, qy, rx, ry) {
      c.moveTo(px, py);
      c.lineTo(qx, qy);
      c.lineTo(rx, ry);
      c.lineTo(px, py);
    }

    function recurse(px, py, qx, qy, rx, ry, depth) {
      if (depth === 0) {
        drawTri(px, py, qx, qy, rx, ry);
        return;
      }

      const abx = (px + qx) / 2;
      const aby = (py + qy) / 2;
      const bcx = (qx + rx) / 2;
      const bcy = (qy + ry) / 2;
      const cax = (rx + px) / 2;
      const cay = (ry + py) / 2;

      drawTri(abx, aby, bcx, bcy, cax, cay);

      recurse(px,  py,  abx, aby, cax, cay, depth - 1);
      recurse(abx, aby, qx,  qy,  bcx, bcy, depth - 1);
      recurse(cax, cay, bcx, bcy, rx,  ry,  depth - 1);
    }

    c.beginPath();
    recurse(ax, ay, bx, by, cx, cy, 3); 
    c.stroke();
  }

  function getCanvasPos(evt) {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    return {
      x: (evt.clientX - rect.left) * scaleX,
      y: (evt.clientY - rect.top) * scaleY,
    };
  }

  canvas.addEventListener("mousedown", (evt) => {
    if (isGameOver || isCleared) return;

    const { x, y } = getCanvasPos(evt);
    isMouseDown = true;
    started = true;
    lastX = x;
    lastY = y;

    if (!isOnLine(x, y)) {
      triggerGameOver();
    } else {
      scratchAt(x, y);
      statusText.textContent = "좋아요 UwU";
    }
  });

  canvas.addEventListener("mousemove", (evt) => {
    if (!isMouseDown || isGameOver || isCleared) return;

    const { x, y } = getCanvasPos(evt);

    drawScratchLine(lastX, lastY, x, y);

    if (!isOnLine(x, y)) {
      triggerGameOver();
    } else {
      scratchAt(x, y);
    }

    lastX = x;
    lastY = y;
  });

  canvas.addEventListener("mouseup", () => {
    isMouseDown = false;
  });

  canvas.addEventListener("mouseleave", () => {
    isMouseDown = false;
  });

  function isOnLine(x, y) {
    const img = maskCtx.getImageData(Math.floor(x), Math.floor(y), 1, 1);
    const a = img.data[3];
    return a > 10;
  }

  function countLinePixels() {
    const img = maskCtx.getImageData(0, 0, maskCanvas.width, maskCanvas.height);
    const data = img.data;
    let count = 0;
    for (let i = 0; i < data.length; i += 4) {
      const a = data[i + 3];
      if (a > 10) count++;
    }
    return count;
  }

  function updateProgress() {
    if (totalLinePixels === 0 || isGameOver || isCleared) return;

    const maskData = maskCtx.getImageData(0, 0, maskCanvas.width, maskCanvas.height).data;
    const progData = progressCtx.getImageData(0, 0, progressCanvas.width, progressCanvas.height).data;

    let count = 0;
    for (let i = 0; i < maskData.length; i += 4) {
      const aMask = maskData[i + 3];
      const aProg = progData[i + 3];
      if (aMask > 10 && aProg > 10) {
        count++;
      }
    }

    scratchedLinePixels = count;
    const ratio = scratchedLinePixels / totalLinePixels;

    if (ratio >= CLEAR_THRESHOLD) {
      triggerClear();
    }
  }

  function scratchAt(x, y) {
    ctx.save();
    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(x, y, 6, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    progressCtx.save();
    progressCtx.fillStyle = "rgba(255,255,255,1)";
    progressCtx.beginPath();
    progressCtx.arc(x, y, 6, 0, Math.PI * 2);
    progressCtx.fill();
    progressCtx.restore();

    updateProgress();
  }

  function drawScratchLine(x1, y1, x2, y2) {
    ctx.save();
    ctx.globalCompositeOperation = "destination-out";
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.lineWidth = 12;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
    ctx.restore();

    progressCtx.save();
    progressCtx.lineCap = "round";
    progressCtx.lineJoin = "round";
    progressCtx.lineWidth = 12;
    progressCtx.strokeStyle = "rgba(255,255,255,1)";
    progressCtx.beginPath();
    progressCtx.moveTo(x1, y1);
    progressCtx.lineTo(x2, y2);
    progressCtx.stroke();
    progressCtx.restore();

    updateProgress();
  }

  function triggerGameOver() {
    if (isGameOver || isCleared) return;
    isGameOver = true;
    isMouseDown = false;

    statusText.textContent = "달고나가 깨졌습니다!";

    ctx.save();
    ctx.globalAlpha = 0.5;
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.restore();

    ctx.save();
    ctx.strokeStyle = "#f5f5f5";
    ctx.lineWidth = 3;
    const cracks = 5;
    for (let i = 0; i < cracks; i++) {
      const angle = (Math.PI * 2 * i) / cracks + Math.random() * 0.5;
      const len = 80 + Math.random() * 80;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(cx + Math.cos(angle) * len, cy + Math.sin(angle) * len);
      ctx.stroke();
    }
    ctx.restore();

    ctx.save();
    ctx.fillStyle = "#ff5555";
    ctx.font = "bold 48px sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("GAME OVER", cx, cy);
    ctx.restore();
  }

  function triggerClear() {
    if (isCleared || isGameOver) return;
    isCleared = true;
    isMouseDown = false;

    ctx.save();
    ctx.globalAlpha = 0.25;
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.restore();

    ctx.save();
    ctx.fillStyle = "#ffe066";
    ctx.strokeStyle = "#aa6c00";
    ctx.lineWidth = 4;
    ctx.font = "bold 52px sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("CLEAR!", cx, cy);
    ctx.strokeText("CLEAR!", cx, cy);
    ctx.restore();

    if (currentLevel < MAX_LEVEL && currentLevel >= highestUnlocked) {
      highestUnlocked = currentLevel + 1;
      saveHighestUnlocked();
      updateLevelButtons();
    }

    if (currentLevel === 5) {
      fetchFlagAndShow();
    } else {
      statusText.textContent =
        "성공!";
    }
  }

  function fetchFlagAndShow() {
    fetch("/api/stage5/clear", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
    })
      .then((res) => res.json())
      .then((data) => {
        if (!data.ok) {
          statusText.textContent =
            "flag 렌더링 에러 " + (data.error || "");
          return;
        }

        const flag = data.flag;

        statusText.textContent = "FLAG: " + flag;

        ctx.save();
        ctx.fillStyle = "rgba(0, 0, 0, 0.8)";
        ctx.fillRect(0, canvas.height - 80, canvas.width, 80);
        ctx.fillStyle = "#00ff9c";
        ctx.font = "bold 24px monospace";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(flag, canvas.width / 2, canvas.height - 40);
        ctx.restore();
      })
      .catch((err) => {
        console.error(err);
        statusText.textContent = "flag 요철 에청";
      });
  }

})();
