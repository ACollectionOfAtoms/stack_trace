from flask import Flask, request, session, g, redirect, url_for, abort, render_template, flash
import json
import screenscrape as sc
# from contextlib import closing

# configuration
# DATABASE = 'tmp/flaskr.db'
DEBUG = True
SECRET_KEY = 'super secret key'
# USERNAME = 'admin'
# PASSWORD = 'default'

# create our little application :)
app = Flask(__name__)
app.config.from_object(__name__)


# def connect_db():
#    return sqlite3.connect(app.config['DATABASE'])


# def init_db():
#     with closing(connect_db()) as db:
#         with app.open_resource('tmp/schema.sql', mode='r') as f:
#             db.cursor().executescript(f.read())
#         db.commit()


# @app.before_request
# def before_request():
#     g.db = connect_db()


# @app.teardown_request
# def teardown_request(exception):
#     db = getattr(g, 'db', None)
#     if db is not None:
#         db.close()


@app.route('/')
def show_results():
    # cur = g.db.execute('select title, text from entries order by id desc')
    # entries = [dict(title=row[0], text=row[1]) for row in cur.fetchall()]
    return render_template('results.html')


@app.route('/results', methods=['POST'])
def generate_graph():
    if request.method == 'POST':
        print request.get_json()
    return redirect(url_for('show_results'))


@app.route('/login/', methods=['GET', 'POST'])
def login():
    error = None
    if request.method == 'POST':
        if request.form['username'] != app.config['USERNAME']:
            error = 'Invalid username'
        elif request.form['password'] != app.config['PASSWORD']:
            error = 'Invalid password'
        else:
            session['logged_in'] = True
            flash('You were logged in')
            return redirect(url_for('show_entries'))
    return render_template('login.html', error=error)


@app.route('/logout')
def logout():
    session.pop('logged_in', None)
    flash('You were logged out')
    return redirect(url_for('show_entries'))


if __name__ == '__main__':
    app.run()