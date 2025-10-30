from langchain_community.vectorstores import FAISS
from langchain_openai import OpenAIEmbeddings, ChatOpenAI
from langchain_core.documents import Document
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain.chains import RetrievalQA
from dotenv import load_dotenv
import os

# Load environment variables from .env file
load_dotenv()

api_key = os.getenv("OPENAI_API_KEY")
if not api_key:
    raise ValueError("OPENAI_API_KEY not found in .env")

# 1. Load and split documents
text = """
LangChain is a framework for developing applications powered by language models.
It enables applications that are data-aware, agentic, and able to interact with their environment.
FAISS is a library for efficient similarity search and clustering of dense vectors.
"""

# Create a list of Documents
documents = [Document(page_content=text)]

# Split the document into chunks
splitter = RecursiveCharacterTextSplitter(chunk_size=300, chunk_overlap=20)
docs = splitter.split_documents(documents)

# 2. Create embeddings and vector store
embeddings = OpenAIEmbeddings()  # Requires OPENAI_API_KEY env var
vectorstore = FAISS.from_documents(docs, embeddings)

# 3. Create a retriever
retriever = vectorstore.as_retriever(search_kwargs={"k": 2})

# 4. Set up the RAG chain
llm = ChatOpenAI(model="gpt-4", api_key=api_key)  # or gpt-3.5-turbo
qa_chain = RetrievalQA.from_chain_type(
    llm=llm,
    retriever=retriever,
    return_source_documents=True
)

# 5. Run a query
query = "What is LangChain and what does FAISS do?"
result = qa_chain.invoke({"query": query})

# Print results
print("Answer:\n", result["result"])
print("\nRetrieved Docs:\n")
for doc in result["source_documents"]:
    print(doc.page_content)
