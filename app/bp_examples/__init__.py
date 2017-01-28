# -*- coding: UTF-8 -*-

import os
from flask import Blueprint

static_folder=os.path.join(os.pardir, 'static')
bp_examples = Blueprint('examples',__name__,static_folder=static_folder)

from . import views
