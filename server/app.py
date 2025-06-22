# app.py
from flask import Flask, request, jsonify
from flask_cors import CORS
from services.query_handler import handle_query
from routes.test_connection import test_connection
import os

app = Flask(__name__)
from flask_cors import CORS

CORS(app, resources={r"/*": {"origins": "https://querycraft-sql.vercel.app"}})


app.register_blueprint(test_connection)

@app.route("/ask", methods=["POST"])
def ask():
    data = request.get_json()
    print("Request JSON:", data)

    db_config = data.get("db_config")
    question = data.get("question")

    if not db_config:
        return jsonify({"error": "Database configuration missing in request."}), 400
    if not question:
        return jsonify({"error": "No question provided"}), 400

    print("Received question:", question)
    print("DB Config:", db_config)

    return handle_query(db_config, question)


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=int(os.environ.get("PORT", 5000)), debug=True)
