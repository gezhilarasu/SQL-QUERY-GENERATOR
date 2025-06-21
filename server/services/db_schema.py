##db_schema.py

import mysql.connector

def get_schema_text(config):
    conn = None
    cursor = None
    
    try:
        # Ensure config is a dictionary
        if not isinstance(config, dict):
            raise ValueError(f"Config must be a dictionary, got {type(config)}")
        
        # Validate required config keys
        required_keys = ["host", "user", "password", "database"]
        for key in required_keys:
            if key not in config:
                raise ValueError(f"Missing required config key: {key}")
        
        print(f"Connecting with config: {config}")
        conn = mysql.connector.connect(**config)
        cursor = conn.cursor(buffered=True)
        
        # Get all tables
        cursor.execute("SHOW TABLES")
        tables = [t[0] for t in cursor.fetchall()]
        
        if not tables:
            return "No tables found in the database."
        
        schema = ""
        for table in tables:
            # Get table structure
            cursor.execute(f"DESCRIBE `{table}`")
            columns_info = cursor.fetchall()
            
            # Format column information
            columns = []
            for col_info in columns_info:
                col_name = col_info[0]
                col_type = col_info[1]
                is_nullable = "NULL" if col_info[2] == "YES" else "NOT NULL"
                columns.append(f"{col_name} ({col_type}, {is_nullable})")
            
            schema += f"Table: {table}\nColumns: {', '.join(columns)}\n\n"
            
            # Get sample data (first 3 rows) to help with query generation
            try:
                cursor.execute(f"SELECT * FROM `{table}` LIMIT 3")
                sample_rows = cursor.fetchall()
                if sample_rows:
                    schema += f"Sample data from {table}:\n"
                    for i, row in enumerate(sample_rows, 1):
                        schema += f"  Row {i}: {row}\n"
                    schema += "\n"
            except mysql.connector.Error as e:
                schema += f"Note: Could not fetch sample data from {table}: {str(e)}\n\n"
        
        return schema
        
    except mysql.connector.Error as e:
        raise Exception(f"Database schema error: {str(e)}")
    except Exception as e:
        raise Exception(f"Schema retrieval error: {str(e)}")
    finally:
        if cursor:
            cursor.close()
        if conn:
            conn.close()
