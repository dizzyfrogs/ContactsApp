from flask import request, jsonify
from config import app, db
from models import Contact

if __name__ == "__main__":
    app.run(debug = True)