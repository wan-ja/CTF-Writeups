from flask import Flask, render_template, request, jsonify
import random

app = Flask(__name__)

NUMBER_RANGE = (0, 10000)
TARGET_NUMBER = random.randint(*NUMBER_RANGE)

def flag():
    try:
        FLAG = open("./flag", "r").read()
    except:
        FLAG = "[**FLAG**]"
    return FLAG

@app.route('/')
def index():
    return render_template('index.html', range=NUMBER_RANGE)

@app.route('/guess', methods=['POST'])
def guess_number():
    user_guess = int(request.form['guess'])
    
    if user_guess == TARGET_NUMBER:
        return jsonify({"result": "Correct", "flag": flag()})
    else:
        return jsonify({"result": "Incorrect", "flag": "Try again~!"})

if __name__ == '__main__':
    app.run(host="0.0.0.0")
