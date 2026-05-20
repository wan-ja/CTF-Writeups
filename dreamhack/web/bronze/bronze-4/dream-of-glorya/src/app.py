import random
from flask import Flask, request, render_template, session, redirect, url_for, flash
import os

app = Flask(__name__)
app.secret_key = os.urandom(24)
FLAG = "SP{this_is_not_flag}"

ADMIN_PW = str(random.randint(0, 2000)).zfill(5)
filtering1 = ["<script>", "<img>", "on", "chr", "Lucy"]

users = {
    "admin": {"pw": ADMIN_PW, "money": 999999, "is_insured": True},
    "gloria martinez": {"pw": "P@ssw0rd", "money": 10, "is_insured": False}
}

@app.route('/')
def index():
    if 'user' not in session:
        return redirect(url_for('login'))
    
    curr_user = session['user']
    user_data = users.get(curr_user, {"money": 0, "is_insured": False})
    
    flag = None
    if curr_user == "gloria martinez" and user_data['is_insured']:
        flag = FLAG
        
    return render_template('index.html', user=curr_user, data=user_data, flag=flag)

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        user_input = request.form.get('id', '')
        password = request.form.get('pw', '')
        user_input = user_input.strip()

        if user_input == "admin":
            flash("H4cker.. dont access my account!")
            return redirect(url_for('index'))
        
        
        user_input = (user_input.upper()).lower()

        for word in filtering1:
                if word in user_input:
                        flash(f"위험한 키워드가 발견됬습니다 {word}")
                        return redirect(url_for('index'))
        
        if user_input in users and users[user_input]['pw'] == password:
            session['user'] = user_input
            return redirect(url_for('index'))
        
        else:

            flash("ID or Password is incorrect!")
            return redirect(url_for('login'))
    return render_template('login.html')

@app.route('/buy_insurance', methods=['POST'])
def buy():
    user = session.get('user')
    if user in users:
        if users[user]['money'] >= 20000:
            users[user]['money'] -= 20000
            users[user]['is_insured'] = True
            flash("보험 가입이 완료되었습니다!")
        else:
            flash("잔액이 부족합니다. (필요 금액: 20,000 €$)")
    return redirect(url_for('index'))

@app.route('/add_insured')
def add_insured():
    if session.get('user') != 'admin':
        flash("권한이 없습니다.")
        return redirect(url_for('index'))
    
    target = request.args.get('target', '').lower()
    if target in users:
        users[target]['is_insured'] = True
        flash(f"{target} 유저가 보험에 등록되었습니다.")
    else:
        flash("존재하지 않는 유저입니다.")
    return redirect(url_for('index'))

@app.route('/logout')
def logout():
    session.pop('user', None)
    return redirect(url_for('login'))

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
