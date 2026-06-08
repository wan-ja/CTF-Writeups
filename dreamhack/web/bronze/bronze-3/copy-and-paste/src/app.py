from flask import Flask, render_template_string
from pathlib import Path

app = Flask(__name__)

TEMPLATE = """
<!doctype html>
<html lang="ko">
<head>
  <meta charset="utf-8">
  <title>Copy & Paste</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <style>
    @font-face {
      font-family: 'MyMapped';
      src: url('/static/fonts/DejaVuSans.ttf') format('truetype');
      font-weight: normal;
      font-style: normal;
      font-display: swap;
    }
    :root { --bg:#0f172a; --fg:#e2e8f0; --card:#111827; --accent:#38bdf8; }
    * { box-sizing:border-box; }
    html, body {
      height:100%;
      margin:0;
      background:var(--bg);
      color:var(--fg);
      font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto,
                   Noto Sans, Apple SD Gothic Neo, "맑은 고딕", "Malgun Gothic", sans-serif;
    }
    .wrap {
      min-height:100%;
      display:flex;
      align-items:center;
      justify-content:center;
      padding:24px;
    }
    .card { width:min(720px, 92vw); }
    h1 {
      margin:0 0 12px;
      font-size:clamp(20px, 3vw, 28px);
      font-weight:700;
      letter-spacing:0.2px;
      color:var(--accent);
    }
    .box {
      display:none;
      background:var(--card);
      border:1px solid rgba(255,255,255,0.08);
      border-radius:16px;
      padding:20px 22px;
      box-shadow: 0 8px 30px rgba(0,0,0,0.25);
      white-space:pre-wrap;
      word-break:break-word;
      font-size:16px;
      line-height:1.5;
      font-family: 'MyMapped', ui-monospace, SFMono-Regular, Menlo, Consolas,
                   "Liberation Mono", monospace;
      font-variant-ligatures: none;
    }
    .box.show { display:block; }
  </style>
</head>
<body>
  <div class="wrap">
    <div class="card">
      <h1>Just Copy It!</h1>
      <pre class="box" id="flag">{{ flag_text | e }}</pre>
    </div>
  </div>
  <script>
    (function(){
      const box = document.getElementById('flag');
      const reveal = () => { if (!box.classList.contains('show')) box.classList.add('show'); };
      const t = setTimeout(reveal, 3000);
      try {
        const p1 = document.fonts && document.fonts.load ? document.fonts.load("16px 'MyMapped'") : null;
        const p2 = document.fonts && document.fonts.ready ? document.fonts.ready : null;
        if (p1 && p2) Promise.all([p1, p2]).then(()=>{ clearTimeout(t); reveal(); });
      } catch(e) {}
    })();
  </script>
</body>
</html>
"""

def read_flag() -> str:
    path = Path(__file__).with_name("flag.txt")
    return path.read_text(encoding="utf-8")

@app.get("/")
def index():
    return render_template_string(TEMPLATE, flag_text=read_flag())

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8000, debug=False)
