##test_connection.py

from flask import Blueprint, request, jsonify, current_app
import mysql.connector

test_connection = Blueprint("test_connection", __name__)

@test_connection.route("/test-connection", methods=["POST"])
def test_db_connection():
    data = request.get_json()
    
    if not data:
        return jsonify({"error": "No JSON data provided"}), 400
    
    # Validate required fields
    required_fields = ["host", "user", "password", "database"]
    for field in required_fields:
        if field not in data:
            return jsonify({"error": f"Missing required field: {field}"}), 400
    
    try:
        # Create connection config
        connection_config = {
            "host": data["host"],
            "user": data["user"], 
            "password": data["password"],
            "database": data["database"],
            "port": int(data.get("port", 3306))
        }
        
        # Test connection
        conn = mysql.connector.connect(**connection_config)
        conn.close()

        # ✅ Store in app global config
        current_app.config["DB_CONFIG"] = connection_config

        return jsonify({"message": "Connected successfully and config stored"}), 200
    except mysql.connector.Error as db_error:
        return jsonify({"error": f"Database connection error: {str(db_error)}"}), 400
    except ValueError as ve:
        return jsonify({"error": f"Invalid port number: {str(ve)}"}), 400
    except Exception as e:
        return jsonify({"error": f"Unexpected error: {str(e)}"}), 500