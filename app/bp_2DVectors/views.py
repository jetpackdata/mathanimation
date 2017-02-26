# -*- coding: UTF-8 -*-
from . import bp_2DVectors
from flask import render_template

@bp_2DVectors.route('/',methods=['GET'])
def index():
    return render_template('2DVectors/index.html')

@bp_2DVectors.route('/2DVectorsRep',methods=['GET'])
def VectorsRep2D():
    return render_template('2DVectors/2DVectorsRep.html')

@bp_2DVectors.route('/2DVectorOperations',methods=['GET'])
def VectorOperations2D():
    return render_template('2DVectors/2DVectorOperations.html')
    