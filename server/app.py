# app.py
from flask import Flask, request, jsonify
from flask_cors import CORS
from services.query_handler import handle_query
from routes.test_connection import test_connection

app = Flask(__name__)
CORS(app)

app.register_blueprint(test_connection)

@app.route("/ask", methods=["POST"])
def ask():
    db_config = app.config.get("DB_CONFIG")
    if not db_config:
        return jsonify({"error": "No DB config found. Please connect first."}), 400

    print("Before receiving")
    data = request.get_json()
    print("Request JSON:", data)

    question = data.get("question")
    if not question:
        return jsonify({"error": "No question provided"}), 400

    print("Received question:", question)
    print("DB Config type:", type(db_config))
    print("DB Config content:", db_config)
    return handle_query(db_config, question)


if __name__ == "__main__":
    app.run(debug=True)