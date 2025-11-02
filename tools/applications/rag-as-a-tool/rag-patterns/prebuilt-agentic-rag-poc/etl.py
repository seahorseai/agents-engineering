# etl.py

import os
from dotenv import load_dotenv

# LangChain imports
from langchain.tools.retriever import create_retriever_tool
from langchain_community.vectorstores import FAISS
from langchain_openai import OpenAIEmbeddings
from langchain_community.document_loaders import TextLoader
from langchain.text_splitter import CharacterTextSplitter

# Load environment variables from .env
load_dotenv()
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
if not OPENAI_API_KEY:
    raise ValueError("OPENAI_API_KEY is not set in your environment.")

# Create a sample text file
with open("state_of_the_union.txt", "w") as f:
    f.write("""
    Hello, my fellow citizens. Today, I want to talk about the future of our great nation.
    We are facing many challenges, including climate change, economic inequality, and global competition.
    Climate change is one of the most pressing issues of our time, and we must act now to ensure
    a better future for our children and grandchildren.
    """)

# Load and split documents
loader = TextLoader("state_of_the_union.txt")
documents = loader.load()
text_splitter = CharacterTextSplitter(chunk_size=1000, chunk_overlap=0)
texts = text_splitter.split_documents(documents)

# Embeddings and vectorstore
embeddings = OpenAIEmbeddings(openai_api_key=OPENAI_API_KEY)
vectorstore = FAISS.from_documents(texts, embeddings)
