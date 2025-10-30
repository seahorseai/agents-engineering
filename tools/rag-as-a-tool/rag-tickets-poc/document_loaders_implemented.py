from typing import List, Dict, Any
from pathlib import Path
from langchain.schema import Document
from langchain_community.document_loaders import JSONLoader
import xml.etree.ElementTree as ET
import logging
import jq
import os

logger = logging.getLogger(__name__)


class SupportDocumentLoader:
    """
    A loader to read, normalize, and convert JSON and XML support tickets into LangChain Documents.
    """

    def __init__(self, data_path: str):
        """
        Initialize loader with data directory.
        """
        self.data_path = Path(data_path)
        if not self.data_path.exists():
            raise FileNotFoundError(f"Data path does not exist: {self.data_path}")
        logger.info(f"Initialized SupportDocumentLoader with path: {self.data_path}")

    # ------------------------------------------------------
    # JSON TICKET HELPERS
    # ------------------------------------------------------
    def get_json_content(self, data: Dict[str, Any]) -> str:
        """
        Format JSON ticket data into standardized content string.
        """
        return (
            f"Subject: {data.get('subject', '')}\n"
            f"Description: {data.get('body', '')}\n"
            f"Resolution: {data.get('answer', '')}\n"
            f"Type: {data.get('type', '')}\n"
            f"Queue: {data.get('queue', '')}\n"
            f"Priority: {data.get('priority', '')}"
        )

    def get_json_metadata(self, record: Dict[str, Any], support_type: str = None) -> Dict[str, Any]:
        """
        Extract metadata fields and ensure unique ticket_id format.
        """
        if not support_type:
            raise ValueError("support_type is required for JSON metadata extraction")

        original_id = str(record.get("Ticket ID") or record.get("id") or record.get("ticket_id") or "")
        if not original_id:
            raise ValueError("Missing original ticket ID in record")

        tags = [
            record.get(f"tag_{i}")
            for i in range(1, 9)
            if record.get(f"tag_{i}")
        ]

        metadata = {
            "ticket_id": f"{support_type}_{original_id}",
            "original_ticket_id": original_id,
            "support_type": support_type,
            "type": record.get("type", ""),
            "queue": record.get("queue", ""),
            "priority": record.get("priority", ""),
            "language": record.get("language", "en"),
            "tags": tags,
            "source": "json",
            "subject": record.get("subject", ""),
            "body": record.get("body", ""),
            "answer": record.get("answer", "")
        }

        return metadata

    # ------------------------------------------------------
    # XML TICKET LOADING
    # ------------------------------------------------------
    def load_xml_tickets(self, file_path: Path, support_type: str) -> List[Document]:
        """
        Parse XML support tickets and convert to Document objects.
        """
        documents = []
        try:
            tree = ET.parse(file_path)
            root = tree.getroot()
            for ticket in root.findall(".//ticket"):
                original_id = ticket.findtext("id", str(uuid4()))
                subject = ticket.findtext("subject", "")
                description = ticket.findtext("description", "")
                resolution = ticket.findtext("resolution", "")
                type_ = ticket.findtext("type", "")
                queue = ticket.findtext("queue", "")
                priority = ticket.findtext("priority", "")
                language = ticket.findtext("language", "en")

                tags = [t.text for t in ticket.findall(".//tags/tag") if t.text]

                content = (
                    f"Subject: {subject}\n"
                    f"Description: {description}\n"
                    f"Resolution: {resolution}\n"
                    f"Type: {type_}\n"
                    f"Queue: {queue}\n"
                    f"Priority: {priority}"
                )

                metadata = {
                    "ticket_id": f"{support_type}_xml_{original_id}",
                    "original_ticket_id": original_id,
                    "support_type": support_type,
                    "type": type_,
                    "queue": queue,
                    "priority": priority,
                    "language": language,
                    "tags": tags,
                    "source": "xml",
                }

                documents.append(Document(page_content=content, metadata=metadata))

            logger.info(f"Loaded {len(documents)} XML tickets from {file_path.name}")
        except Exception as e:
            logger.error(f"Failed to load XML file {file_path}: {e}", exc_info=True)
        return documents

    # ------------------------------------------------------
    # LOAD ALL TICKETS (JSON + XML)
    # ------------------------------------------------------
    def load_tickets(self) -> Dict[str, List[Document]]:
        """
        Load all JSON and XML tickets grouped by support type.
        """
        support_docs: Dict[str, List[Document]] = {}
        seen_ids = set()

        for folder in self.data_path.iterdir():
            if not folder.is_dir():
                continue

            support_type = folder.name.lower()
            support_docs[support_type] = []

            for file_path in folder.iterdir():
                if file_path.suffix.lower() == ".json":
                    loader = JSONLoader(
                        file_path=file_path,
                        jq_schema=".[]",
                        content_key=None,
                        text_content=False
                    )

                    # Use custom metadata/content
                    records = loader.load()
                    for record in records:
                        record_data = record.page_content if isinstance(record.page_content, dict) else {}
                        metadata = self.get_json_metadata(record_data, support_type)
                        content = self.get_json_content(record_data)

                        if metadata["ticket_id"] in seen_ids:
                            raise ValueError(f"Duplicate ticket ID found: {metadata['ticket_id']}")
                        seen_ids.add(metadata["ticket_id"])

                        support_docs[support_type].append(Document(page_content=content, metadata=metadata))

                elif file_path.suffix.lower() == ".xml":
                    xml_docs = self.load_xml_tickets(file_path, support_type)
                    for doc in xml_docs:
                        if doc.metadata["ticket_id"] in seen_ids:
                            raise ValueError(f"Duplicate ticket ID found: {doc.metadata['ticket_id']}")
                        seen_ids.add(doc.metadata["ticket_id"])
                        support_docs[support_type].append(doc)

        logger.info(f"Loaded {sum(len(v) for v in support_docs.values())} total tickets")
        return support_docs

    # ------------------------------------------------------
    # WRAPPER
    # ------------------------------------------------------
    def create_documents(self) -> Dict[str, List[Document]]:
        """
        Load and process all support tickets.
        """
        logger.info("Creating documents from support data...")
        return self.load_tickets()
