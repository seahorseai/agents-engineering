from dotenv import load_dotenv
import os


def load_openai_api_key():
    load_dotenv()
    openai_api_key = os.getenv("OPENAI_API_KEY")
    if not openai_api_key:
        raise ValueError("Missing OPENAI_API_KEY in .env")
    return openai_api_key
