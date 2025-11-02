from typing import List, Dict, Any, Optional
from langchain.prompts import ChatPromptTemplate
from langchain_openai import ChatOpenAI
import asyncio
import logging
from .vector_store import SupportVectorStore
import os
from dotenv import load_dotenv, find_dotenv

load_dotenv(find_dotenv())
openai_api = os.getenv("OPENAI_API_KEY")

logger = logging.getLogger(__name__)


class SupportRAGChain:
    """
    Retrieval-Augmented Generation (RAG) chain for support tickets.
    """

    def __init__(self, vector_store: SupportVectorStore):
        """
        Initialize the RAG chain with vector store and LLM.
        llm = OpenAI GPT-4o
        """
        self.vector_store = vector_store
        self.llm = ChatOpenAI(model="gpt-4o", temperature=0.3)
        self.prompt = ChatPromptTemplate.from_template(
            "You are a helpful technical support assistant.\n"
            "Use the following support ticket context to answer the user question clearly and accurately.\n\n"
            "Context:\n{context}\n\n"
            "Question:\n{question}\n\n"
            "Answer:"
        )
        logger.info("✅ RAG chain initialized successfully.")

    # ----------------------------------------------------------------------
    def get_relevant_documents(
        self, 
        query: str, 
        support_type: Optional[str] = None, 
        k: int = 3
    ) -> List[Dict[str, Any]]:
        """
        Retrieve relevant support tickets for a given query.
        """
        if not query or not query.strip():
            raise ValueError("Query cannot be empty")
        if len(query.strip()) < 10:
            raise ValueError("Query too short. Please provide more details.")

        try:
            docs = self.vector_store.query_similar(query, support_type=support_type, k=k)
            return docs
        except Exception as e:
            logger.error(f"Error retrieving documents: {e}", exc_info=True)
            return []

    # ----------------------------------------------------------------------
    def _prepare_context(self, documents: List[Dict[str, Any]]) -> str:
        """
        Format retrieved documents into a context string.
        """
        if not documents:
            return "No relevant support tickets found."

        formatted_docs = []
        for i, doc in enumerate(documents, 1):
            support_type = doc["metadata"].get("support_type", "Unknown")
            tags = ", ".join(doc["metadata"].get("tags", []))
            content = doc["content"]

            formatted_docs.append(
                f"Ticket {i}:\n"
                f"Support Type: {support_type}\n"
                f"Tags: {tags}\n"
                f"Content: {content}"
            )

        return "\n\n".join(formatted_docs)

    # ----------------------------------------------------------------------
    async def query(
        self, 
        query: str, 
        support_type: Optional[str] = None
    ) -> str:
        """
        Generate a response to a support query using RAG.
        """
        if not query or not query.strip():
            raise ValueError("Query cannot be empty")
        if len(query.strip()) < 10:
            raise ValueError("Query too short. Please provide more details.")

        try:
            # Retrieve relevant documents
            relevant_docs = self.get_relevant_documents(query, support_type=support_type)
            context = self._prepare_context(relevant_docs)

            # Prepare full prompt
            formatted_prompt = self.prompt.format_messages(
                context=context,
                question=query
            )

            # Run the model asynchronously
            response = await self.llm.ainvoke(formatted_prompt)
            return response.content.strip()

        except ValueError as ve:
            raise ve  # Pass through validation errors exactly as required
        except Exception as e:
            logger.error(f"Error generating response: {e}", exc_info=True)
            raise Exception("Error generating response") from e
