import os
from flask import Flask, render_template, jsonify, request

app = Flask(__name__)

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
FLAG_PATH = os.path.join(BASE_DIR, "flag.txt")

def load_flag():
    with open(FLAG_PATH, "r", encoding="utf-8") as f:
        return f.read().strip()

@app.route("/")
def index():
    return render_template("index.html")


@app.route("/api/stage5/clear", methods=["POST"])
def api_stage5_clear():
    return jsonify({"ok": True, "flag": load_flag()})


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5999, debug=False)
