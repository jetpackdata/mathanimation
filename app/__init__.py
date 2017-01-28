# -*- coding: UTF-8 -*-
from flask import Flask, render_template

def create_app():
    app = Flask(__name__)
    
    from .bp_examples import bp_examples as bp_examples
    app.register_blueprint(bp_examples,url_prefix='/examples')

    @app.route('/',methods=['GET'])
    def index():
        return render_template('index.html')

    
    return app