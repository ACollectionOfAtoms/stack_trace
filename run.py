from flask import Flask, request, redirect, url_for, render_template
import screenscrape as sc

DEBUG = True
SECRET_KEY = 'super secret key'

app = Flask(__name__)
app.config.from_object(__name__)


@app.route('/')
def show_results():
    return render_template('results.html')


@app.route('/results', methods=['POST'])
def generate_graph():
    if request.method == 'POST':
        queries = request.get_json()
        for item in queries:
            print queries[item]['query'], sc.return_results(queries[item]['query'])
    return redirect(url_for('show_results'))

if __name__ == '__main__':
    app.run()