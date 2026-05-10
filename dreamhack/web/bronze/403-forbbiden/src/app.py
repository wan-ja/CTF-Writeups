from flask import Flask, request, jsonify

app = Flask(__name__)

FLAG = "flag"

INDEX_HTML = """<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>403 Forbidden</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');

    * { margin: 0; padding: 0; box-sizing: border-box; }

    body {
      font-family: 'Inter', sans-serif;
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #6c5ce7;
      background-image: radial-gradient(circle, rgba(255,255,255,.25) 1px, transparent 1px);
      background-size: 18px 18px;
    }

    .browser {
      background: #fff;
      border-radius: 10px;
      box-shadow: 0 12px 48px rgba(0,0,0,.25);
      width: 460px;
      overflow: hidden;
    }

    .chrome { background: #e2e2e2; padding: 10px 14px 0; }

    .dots { display: flex; gap: 6px; margin-bottom: 8px; }
    .dot  { width: 12px; height: 12px; border-radius: 50%; }
    .d-r  { background: #ff5f57; }
    .d-y  { background: #febc2e; }
    .d-g  { background: #28c840; }

    .urlbar {
      background: #fff;
      border-radius: 20px;
      padding: 5px 14px;
      font-size: .73rem;
      color: #555;
      display: flex;
      align-items: center;
      gap: 6px;
      border: 1px solid #ccc;
      margin-bottom: 8px;
    }

    .tab {
      background: #d0d0d0;
      display: inline-block;
      padding: 5px 16px;
      border-radius: 6px 6px 0 0;
      font-size: .7rem;
      color: #555;
    }

    .page-body {
      border-top: 4px solid #e8eaed;
      min-height: 240px;
      padding: 60px 40px 52px;
      text-align: center;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    #errorView {
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .err-num   { font-size: 6rem; font-weight: 700; color: #1a1a1a; line-height: 1; margin-bottom: 8px; }
    .err-title { font-size: 1.4rem; font-weight: 600; color: #333; margin-bottom: 10px; }
    .err-desc  { font-size: .85rem; color: #999; }

    #successView { display: none; flex-direction: column; align-items: center; gap: 14px; }
    #successView.show { display: flex; }

    .ok-icon  { font-size: 2.8rem; }
    .ok-title { font-size: 1.1rem; font-weight: 600; color: #155724; }

    .flag-box {
      background: #d4edda;
      border: 2px solid #28a745;
      border-radius: 8px;
      padding: 14px 22px;
      font-family: 'Courier New', monospace;
      font-size: .92rem;
      color: #155724;
      word-break: break-all;
      animation: glow 1.6s infinite;
    }
    @keyframes glow {
      0%, 100% { box-shadow: 0 0 8px rgba(40,167,69,.3); }
      50%       { box-shadow: 0 0 22px rgba(40,167,69,.7); }
    }
  </style>
</head>
<body>

<div class="browser">
  <div class="chrome">
    <div class="dots">
      <div class="dot d-r"></div>
      <div class="dot d-y"></div>
      <div class="dot d-g"></div>
    </div>
    <div class="urlbar">
      <span style="color:#aaa;font-size:.7rem">&#128274;</span>
      securevault.dreamhack.games/secret
    </div>
    <div class="tab" id="tabTitle">SecureVault &#8212; 403 Forbidden</div>
  </div>

  <div class="page-body">
    <div id="errorView">
      <div class="err-num" id="statusCode">403</div>
      <div class="err-title">Forbidden</div>
      <div class="err-desc">You are not authorized to view this page</div>
    </div>
    <div id="successView">
      <div class="ok-icon">&#128681;</div>
      <div class="ok-title">Access Granted!</div>
      <div class="flag-box" id="flagText"></div>
    </div>
  </div>
</div>

<script>
  const statusEl = document.getElementById("statusCode");
  let solved = false;

  new MutationObserver(() => {
    if (solved) return;
    if (statusEl.textContent.trim() === "200") {
      solved = true;
      fetch("/flag", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "200" })
      })
      .then(r => r.json())
      .then(data => {
        if (data.flag) {
          document.getElementById("errorView").style.display = "none";
          document.getElementById("successView").classList.add("show");
          document.getElementById("flagText").textContent = data.flag;
          document.getElementById("tabTitle").textContent = "SecureVault \\u2014 200 OK";
          document.title = "200 OK";
        } else {
          solved = false;
        }
      })
      .catch(() => { solved = false; });
    }
  }).observe(statusEl, { childList: true, subtree: true, characterData: true });
</script>

</body>
</html>"""


@app.route("/")
def index():
    return INDEX_HTML


@app.route("/flag", methods=["POST"])
def flag():
    data = request.get_json(silent=True)
    if data and str(data.get("status")) == "200":
        return jsonify({"flag": FLAG})
    return jsonify({"error": "Forbidden"}), 403


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=3000, debug=False)
