from flask import Flask, request, redirect, url_for, render_template, jsonify
import screenscrape as sc

DEBUG = True
SECRET_KEY = 'super secret key'

app = Flask(__name__)
app.config.from_object(__name__)

queries = {}

@app.route('/')
def show_results():
    return render_template('layout.html')


@app.route('/results', methods=['POST', 'GET'])
def generate_graph():
    if request.method == 'POST':
        queries = request.get_json()
        for item in queries:
            queries[item]['hits'] = sc.return_results(queries[item]['query'])


@app.route('/data', methods=['GET'])
def send_hits():
    return jsonify(queries)


if __name__ == '__main__':
    app.run()
