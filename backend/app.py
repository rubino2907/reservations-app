# Flask app: write your API here
from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)

CORS(app)

reservations = [
    {"id": 1, "name": "Ruben", "vehicle": "Audi", "date": "2026-11-20"}
]

@app.route("/reservations", methods=["GET"])
def get_reservations():
    return jsonify(reservations)

@app.route("/reservations", methods=["POST"])
def post_reservations():
    data = request.get_json()
    new_reservation = {"id": max((r["id"] for r in reservations), default=0) + 1,"name": data["name"], "vehicle": data["vehicle"], "date": data["date"]}
    reservations.append(new_reservation)
    return jsonify(new_reservation),201