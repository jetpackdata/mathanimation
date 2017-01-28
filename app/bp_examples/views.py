# -*- coding: UTF-8 -*-
from . import bp_examples
from flask import render_template

@bp_examples.route('/',methods=['GET'])
def index():
    return render_template('examples/index.html')

@bp_examples.route('/example1',methods=['GET'])
def demo():
    return render_template('examples/demo1.html')
    