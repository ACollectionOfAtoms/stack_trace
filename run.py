from flask import Flask, request, redirect, url_for, render_template, jsonify
import screenscrape as sc

DEBUG = True
SECRET_KEY = 'super secret key'

app = Flask(__name__)
app.config.from_object(__name__)

queries = {'children' : []}


@app.route('/')
def show_results():
    return render_template('results.html')


@app.route('/results', methods=['POST', 'GET'])
def generate_graph():
    if request.method == 'POST':
        for q in request.get_json():
            queries['children'].append(request.get_json()[q])
        print queries
        for q_Dict in queries['children']:
            q_Dict['hits'] = sc.return_results(q_Dict['query'])
        print queries
        return render_template('results.html')


@app.route('/data', methods=['GET'])
def send_hits():
    return jsonify(queries)


if __name__ == '__main__':
    app.run()
