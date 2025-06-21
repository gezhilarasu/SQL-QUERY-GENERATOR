##query_handler.py
from flask import jsonify
import mysql.connector
import google.generativeai as genai
from services.db_schema import get_schema_text
import os
import re
from dotenv import load_dotenv

load_dotenv()

# Configure Gemini API - Use environment variable for API key
api_key = os.getenv('GEMINI_API_KEY')
if not api_key:
    raise ValueError("GEMINI_API_KEY environment variable not set")

genai.configure(api_key=api_key)
model = genai.GenerativeModel("gemini-1.5-flash")
def handle_query(config, question):
    """
    Handle user query by generating and executing SQL
    Args:
        config: Database configuration dictionary
        question: User's natural language question
    Returns:
        JSON response with query results or confirmation message
    """
    conn = None
    cursor = None
    
    try:
        # Validate config
        if not isinstance(config, dict):
            return jsonify({"error": f"Invalid config type: {type(config)}. Expected dictionary."}), 500

        print(f"Config received in handle_query: {config}")
        print(f"Config type: {type(config)}")

        # Get schema
        try:
            schema_text = get_schema_text(config)
        except Exception as schema_error:
            return jsonify({"error": f"Failed to get database schema: {str(schema_error)}"}), 500

        # Prompt for Gemini
        prompt = f"""
You are an expert SQL assistant. Given a user question and the database schema, generate the correct MySQL query.

Rules:
- You may generate SELECT, INSERT, UPDATE, DELETE, CREATE, DROP, ALTER, etc.
- Use backticks around table and column names if they contain spaces or special characters.
- Return only the SQL query without explanation or formatting.
- Use proper MySQL syntax.

Schema:
{schema_text}

User Question: {question}

Generate only the MySQL query:
"""

        try:
            # Use Gemini to generate SQL query
            response = model.generate_content(prompt)

            # Safely extract the generated SQL from response parts
            generated_text = "".join(part.text for part in response.parts if hasattr(part, "text"))

            # Clean up markdown-style formatting if present
            generated_query = re.sub(r"```sql\s*", "", generated_text, flags=re.IGNORECASE)
            generated_query = re.sub(r"```\s*", "", generated_query).strip()

        except Exception as ai_error:
            return jsonify({"error": f"Failed to generate SQL query: {str(ai_error)}"}), 500

        print(f"Generated SQL query: {generated_query}")

        # Execute query
        try:
            conn = mysql.connector.connect(**config)
            cursor = conn.cursor(dictionary=True,buffered=True)

            cursor.execute(generated_query)
            query_upper = generated_query.strip().upper()
            result_returning_keywords = ("SELECT", "SHOW", "DESCRIBE", "EXPLAIN")

            # If SELECT query, fetch results
            if query_upper.startswith(result_returning_keywords):
                results = cursor.fetchall()
                return jsonify({
                    "query": generated_query,
                    "results": results,
                    "row_count": len(results)
                })
            else:
                # For non-SELECT queries, commit and return confirmation
                conn.commit()
                return jsonify({
                    "query": generated_query,
                    "message": f"Query executed successfully: {generated_query}"
                })

        except mysql.connector.Error as db_error:
            return jsonify({"error": f"Database execution error: {str(db_error)}"}), 500

    except Exception as e:
        print(f"Unexpected error in handle_query: {str(e)}")
        return jsonify({"error": f"An unexpected error occurred: {str(e)}"}), 500
    finally:
        if cursor:
            cursor.close()
        if conn:
            conn.close()
