from flask import Blueprint, current_app, render_template
from stacktrace.cache import cache

main = Blueprint('main', __name__, template_folder='templates')


@main.route('/')
@cache.cached(300, key_prefix='main_index')
def index():
    return render_template('index.html')
