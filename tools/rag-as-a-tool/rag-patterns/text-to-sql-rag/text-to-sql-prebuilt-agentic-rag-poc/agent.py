import os
import tempfile
import pandas as pd
from dotenv import load_dotenv
from sqlalchemy import create_engine, text

from langchain_openai import ChatOpenAI  # updated import
from langchain_community.tools import QuerySQLDatabaseTool  # updated import for SQL tool
from langchain_community.vectorstores import FAISS
from langchain_openai import OpenAIEmbeddings  # updated import
from langchain.tools.retriever import create_retriever_tool
from langchain_community.utilities import SQLDatabase
from langgraph.prebuilt import create_react_agent
from langchain.docstore.document import Document
from langchain.text_splitter import RecursiveCharacterTextSplitter

# -------------------- 0. Load environment --------------------
load_dotenv()
openai_key = os.getenv("OPENAI_API_KEY")
if not openai_key:
    raise ValueError("OPENAI_API_KEY environment variable not set.")

# -------------------- 1. Set up DuckDB file --------------------
products_df = pd.DataFrame({
    'id': [1, 2, 3],
    'name': ['USB Charger', 'Bluetooth Speaker', 'Notebook'],
    'price': [15.99, 45.00, 3.50],
    'category': ['electronics', 'electronics', 'stationery'],
    'stock': [120, 35, 200]
})

temp_dir = tempfile.gettempdir()
db_file_path = os.path.join(temp_dir, "temp_duckdb_rag.db")

engine = create_engine(f"duckdb:///{db_file_path}")

with engine.begin() as connection:
    existing_tables = connection.execute(text("SHOW TABLES")).fetchall()
    if not any("products" in row[0] for row in existing_tables):
        products_df.to_sql("products", con=connection, index=False, if_exists="replace")

# -------------------- 2. LangChain SQLDatabase --------------------
db = SQLDatabase.from_uri(f"duckdb:///{db_file_path}", include_tables=["products"])

# -------------------- 3. FAISS Vector Store for schema --------------------
embedding = OpenAIEmbeddings(openai_api_key=openai_key)

schema_docs = [
    Document(page_content="""
    Table: products
    Columns: id (int), name (text), price (float), category (text), stock (int)
    """),
    Document(page_content="""
    You can query products by filtering on price and category.
    For example: Find all electronics under $50.
    """),
]

splitter = RecursiveCharacterTextSplitter(chunk_size=512, chunk_overlap=0)
split_docs = splitter.split_documents(schema_docs)
faiss_index = FAISS.from_documents(split_docs, embedding)

retriever = faiss_index.as_retriever()
retriever_tool = create_retriever_tool(
    retriever,
    name="schema_context_tool",
    description="Provides context about the schema and how to query the product database."
)

# -------------------- 4. SQL Execution Tool --------------------
sql_tool = QuerySQLDatabaseTool(db=db)

# -------------------- 5. Create Agent --------------------
llm = ChatOpenAI(model="gpt-4", temperature=0)  # Do NOT pass openai_api_key here, uses env variable

agent = create_react_agent(llm, tools=[retriever_tool, sql_tool])

# -------------------- 6. Runner --------------------
def ask_question(nl_query: str):
    state = {
        "messages": [
            {"role": "system", "content": "You are an assistant that helps answer product-related questions using SQL over a DuckDB database."},
            {"role": "user", "content": nl_query}
        ]
    }
    result = agent.invoke(state)
    return result["messages"][-1].content

if __name__ == "__main__":
    query = "Show me all products under 20 dollars in the electronics category"
    print(ask_question(query))
