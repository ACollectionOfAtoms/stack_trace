from flask import Flask, request, render_template
from stacktrace.utils import get_instance_folder_path
from stacktrace.main.controllers import main
from stacktrace.cache import cache
from stacktrace.config import configure_app

app = Flask(__name__,
            instance_path=get_instance_folder_path(),
            template_folder='templates')
configure_app(app)
cache.init_app(app)
app.jinja_env.add_extension('jinja2.ext.loopcontrols')

app.register_blueprint(main, url_prefix='/')

@app.errorhandler(404)
def page_not_found(error):
    app.logger.error('Page not found: %s', (request.path, error))
    return render_template('404.htm'), 404


@app.errorhandler(500)
def internal_error(error):
    app.logger.error('Server Error: %s', error)
    return "500 error"

@app.errorhandler(Exception)
def unhandled_exception(error):
    app.logger.error('Unhandled Eception: %s', error)
    return "500 Error"
