import sqlite3
import pandas as pd

# 1. Create a sample DataFrame
data = {
    'id': [1, 2, 3, 4],
    'name': ['Alice', 'Bob', 'Charlie', 'David'],
    'age': [25, 30, 35, 40]
}
df = pd.DataFrame(data)

# 2. Create an in-memory SQLite database
conn = sqlite3.connect(':memory:')

# 3. Write the DataFrame to the SQL database
df.to_sql('people', conn, index=False, if_exists='replace')

# 4. Query the database using SQL
query = "SELECT * FROM people WHERE age > 30"
result_df = pd.read_sql_query(query, conn)

# 5. Show the result
print(result_df)

# Optional: Close the connection
conn.close()
