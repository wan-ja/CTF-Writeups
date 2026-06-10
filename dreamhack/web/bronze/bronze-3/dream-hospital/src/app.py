import hashlib
import os
from flask import Flask, render_template, request, redirect, url_for, session, abort

app = Flask(__name__)
app.secret_key = os.urandom(24).hex()

health_records = {
    1: {
        "name": "김깃발",
        "date": "2024-03-10",
        "height": "175cm",
        "weight": "70kg",
        "blood_pressure": "120/80",
        "diagnosis": "특이사항 없음 (검진완료)",
        "summary": "DH{This_is_fake_flag}",
        "owner": "admin"
    },
    125: {
        "name": "김드림",
        "date": "2024-03-25",
        "height": "180cm",
        "weight": "75kg",
        "blood_pressure": "115/75",
        "diagnosis": "비타민 D 부족 권고",
        "summary": "전반적으로 양호하며 꾸준한 운동을 권장합니다.",
        "owner": "guest"
    }
}

def get_hash(uid):
    return hashlib.md5(str(uid).encode()).hexdigest()

@app.route('/')
def index():
    if 'user' in session:
        return redirect(url_for('dashboard'))
    return render_template('index.html')

@app.route('/auth/login', methods=['POST'])
def login():
    if request.form.get('username') == 'guest' and request.form.get('password') == 'guest':
        session['user'] = 'guest'
        return redirect(url_for('dashboard'))
    return "Login Failed", 401

@app.route('/auth/logout')
def logout():
    session.pop('user', None)
    return redirect(url_for('index'))

@app.route('/dashboard')
def dashboard():
    if 'user' not in session:
        return redirect(url_for('index'))
    
    user_data = health_records[125]
    return render_template('dashboard.html', user_hash=get_hash(125), name=user_data['name'])

@app.route('/report/view/<user_hash>')
def view_report(user_hash):
    if 'user' not in session:
        return redirect(url_for('index'))
    
    for uid, data in health_records.items():
        if get_hash(uid) == user_hash:
            if data['owner'] != session['user']:
                return "<h1>Access Denied</h1>", 403
            return render_template('report.html', data=data, user_hash=user_hash)
            
    return "Not Found", 404

@app.route('/report/download/<user_hash>')
def download_report(user_hash):
    if 'user' not in session:
        return redirect(url_for('index'))
    
    for uid, data in health_records.items():
        if get_hash(uid) == user_hash:
            return render_template('print.html', data=data)
            
    return "Not Found", 404

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=False)