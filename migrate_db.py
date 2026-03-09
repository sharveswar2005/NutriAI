import sqlite3

def upgrade_database():
    db_path = "nutriai_v2.db"
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()

    columns_to_add = [
        ("diet_preference", "VARCHAR"),
        ("allergies", "VARCHAR"),
        ("health_status", "VARCHAR"),
        ("nutrition_score", "INTEGER")
    ]

    for col_name, col_type in columns_to_add:
        try:
            cursor.execute(f"ALTER TABLE prediction_history ADD COLUMN {col_name} {col_type};")
            print(f"Added column: {col_name}")
        except sqlite3.OperationalError as e:
            if "duplicate column name" in str(e).lower():
                print(f"Column {col_name} already exists.")
            else:
                print(f"Error adding {col_name}: {e}")

    conn.commit()
    conn.close()
    print("Database upgrade completed successfully.")

if __name__ == "__main__":
    upgrade_database()
