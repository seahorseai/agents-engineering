from langchain.retrievers import ParentDocumentRetriever
from langchain_community.vectorstores import FAISS
from langchain_huggingface import HuggingFaceEmbeddings
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.storage import InMemoryStore
from langchain_core.documents import Document

# 1. Define sample parent documents
docs = [
    Document(page_content="LangChain is a framework for developing applications powered by language models."),
    Document(page_content="It enables applications that are context-aware and able to reason over documents."),
    Document(page_content="Parent-child chunking helps retrieve full documents while indexing smaller parts."),
]

# 2. Setup parent and child splitters
parent_splitter = RecursiveCharacterTextSplitter(chunk_size=300, chunk_overlap=30)
child_splitter = RecursiveCharacterTextSplitter(chunk_size=100, chunk_overlap=20)

# 3. Setup HuggingFace embeddings
embeddings = HuggingFaceEmbeddings(model_name="all-MiniLM-L6-v2")

# 4. Split documents into child chunks
child_docs = child_splitter.split_documents(docs)

# 5. Create FAISS vectorstore from child docs and embeddings
vectorstore = FAISS.from_documents(documents=child_docs, embedding=embeddings)

# 6. Create an in-memory docstore for the parent docs
docstore = InMemoryStore()

# 7. Create ParentDocumentRetriever with vectorstore, docstore, and splitters
retriever = ParentDocumentRetriever(
    vectorstore=vectorstore,
    docstore=docstore,
    child_splitter=child_splitter,
    parent_splitter=parent_splitter,
)

# 8. Add the original parent documents to the retriever (indexes them internally)
retriever.add_documents(docs)

# 9. Query the retriever using the updated `invoke()` method
query = "What is LangChain?"
results = retriever.invoke(query)

# 10. Print the results
for i, doc in enumerate(results, 1):
    print(f"\n[Result {i}]\n{doc.page_content}")
