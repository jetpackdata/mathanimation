# -*- coding: UTF-8 -*-
from flask import Flask, render_template

def create_app():
    app = Flask(__name__)
    
    from .bp_2DVectors import bp_2DVectors as bp_2DVectors
    app.register_blueprint(bp_2DVectors,url_prefix='/2DVectors')

    @app.route('/',methods=['GET'])
    def index():
        return render_template('index.html')

    
    return app