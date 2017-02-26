# -*- coding: UTF-8 -*-

import os
from flask import Blueprint

static_folder=os.path.join(os.pardir, 'static')
bp_2DVectors = Blueprint('2DVectors',__name__,static_folder=static_folder)

from . import views
