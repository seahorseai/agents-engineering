from typing import List, Dict, Any, Optional
import os
import chromadb
from chromadb.config import Settings
from langchain.schema import Document
from langchain_openai import OpenAIEmbeddings
import logging
from dotenv import load_dotenv, find_dotenv

load_dotenv(find_dotenv())

logger = logging.getLogger(__name__)

class SupportVectorStore:
    """
    A class to manage the vector store for support tickets using ChromaDB.
    """

    def __init__(self, vecstore_path: str):
        """Initialize the vector store with ChromaDB client and OpenAI embeddings."""
        os.makedirs(vecstore_path, exist_ok=True)

        self.vecstore_path = vecstore_path
        self.embeddings = OpenAIEmbeddings(model="text-embedding-ada-002")

        # Persistent ChromaDB client
        self.client = chromadb.Client(
            Settings(
                is_persistent=True,
                persist_directory=vecstore_path
            )
        )

        self.collections: Dict[str, chromadb.Collection] = {}

    # ----------------------------------------------------------------------
    def _prepare_metadata(self, metadata: Dict[str, Any]) -> Dict[str, Any]:
        """Ensure all metadata is ChromaDB-compatible (no lists or None)."""
        processed = {}
        for key, value in metadata.items():
            if value is None:
                continue
            if isinstance(value, list):
                processed[key] = ", ".join(str(v) for v in value)
            else:
                processed[key] = str(value)
        return processed

    # ----------------------------------------------------------------------
    def _process_metadata_for_return(self, metadata: Dict[str, Any]) -> Dict[str, Any]:
        """Convert comma-separated lists back to Python lists when appropriate."""
        processed = {}
        for key, value in metadata.items():
            if isinstance(value, str) and "," in value:
                processed[key] = [v.strip() for v in value.split(",")]
            else:
                processed[key] = value
        return processed

    # ----------------------------------------------------------------------
    def create_vector_store(self, documents_by_type: Dict[str, List[Document]]) -> None:
        """
        Create vector store collections from documents, organized by support type.
        """
        for support_type, docs in documents_by_type.items():
            if not docs:
                logger.warning(f"No documents found for support type '{support_type}'. Skipping.")
                continue

            collection = self.client.get_or_create_collection(name=support_type)
            self.collections[support_type] = collection

            ids, texts, metadatas = [], [], []

            for i, doc in enumerate(docs):
                ids.append(f"{support_type}_{i}")
                texts.append(doc.page_content)
                metadatas.append(self._prepare_metadata(doc.metadata))

            # Add to Chroma
            collection.add(
                ids=ids,
                documents=texts,
                metadatas=metadatas,
                embeddings=self.embeddings.embed_documents(texts)
            )

            logger.info(f"✅ Created vector collection for '{support_type}' with {len(docs)} documents.")

        self.client.persist()

    # ----------------------------------------------------------------------
    @classmethod
    def load_local(cls, directory: str) -> Optional["SupportVectorStore"]:
        """
        Load a vector store from local storage.
        """
        if not os.path.exists(directory):
            logger.warning(f"Vector store directory not found: {directory}")
            return None

        instance = cls(directory)

        # Load all existing collections
        try:
            for name in instance.client.list_collections():
                collection = instance.client.get_collection(name=name.name)
                instance.collections[name.name] = collection
            logger.info(f"Loaded {len(instance.collections)} collections from {directory}.")
        except Exception as e:
            logger.error(f"Failed to load Chroma collections: {e}")
            return None

        return instance

    # ----------------------------------------------------------------------
    def query_similar(
        self,
        query: str,
        support_type: Optional[str] = None,
        k: int = 5
    ) -> List[Dict[str, Any]]:
        """Query the vector store for similar documents."""
        if not query or not query.strip():
            logger.warning("Empty or null query provided. Returning no results.")
            return []
        if len(query.strip()) < 10:
            logger.warning("Query too short (<10 characters). Returning no results.")
            return []

        collections_to_query = []
        if support_type:
            if support_type not in self.collections:
                logger.warning(f"Support type '{support_type}' not found.")
                return []
            collections_to_query = [self.collections[support_type]]
        else:
            collections_to_query = list(self.collections.values())

        results = []
        for collection in collections_to_query:
            query_emb = self.embeddings.embed_query(query)
            res = collection.query(query_embeddings=[query_emb], n_results=k)

            for doc, meta, dist in zip(res["documents"][0], res["metadatas"][0], res["distances"][0]):
                results.append({
                    "content": doc,
                    "metadata": self._process_metadata_for_return(meta),
                    "similarity": 1 - dist  # Chroma returns distances
                })

        # Sort by similarity descending
        results.sort(key=lambda x: x["similarity"], reverse=True)
        return results

    # ----------------------------------------------------------------------
    def get_support_types(self) -> List[str]:
        """Return list of all support type collections."""
        return list(self.collections.keys())
