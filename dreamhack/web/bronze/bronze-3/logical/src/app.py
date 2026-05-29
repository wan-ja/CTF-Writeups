from flask import Flask, render_template, redirect, request, make_response
from random import randint
from hashlib import md5
from sqlite3 import connect

app = Flask(__name__)
hidden_dir = '/dir_' + str(randint(1, 99999999999999999))


@app.route('/', methods=['GET','POST'])
def login():
    if request.method == 'GET':
        return render_template('login.html')
    elif request.method == 'POST':
        if not login_check():
            return render_template('login.html', error='Something wrong with the login details. Try again.')
        else:
            return redirect(hidden_dir)
    else:
        return make_response(405)

@app.route(hidden_dir)
def hidden_endpoint():
    return render_template('hidden.html', FLAG=open('flag.txt').read())

def login_check():
    uname = request.form.get('uname', '')
    password = request.form.get('password', '')
    if not uname and not password:
        return False
    connection = connect("logical.db")
    cursor = connection.cursor()
    query = ("SELECT uname, password FROM users WHERE password = '{}'").format(md5(password.encode()).hexdigest())
    usrname = cursor.execute(query).fetchall()
    name = usrname[0][0] if usrname and usrname[0] and usrname[0][0] else ''
    return name == uname


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=80, debug=False)
