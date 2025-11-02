from langchain.agents import create_agent
from langchain_openai import ChatOpenAI
from langchain.tools import tool
from dotenv import load_dotenv
import os

load_dotenv()
openai_api_key = os.getenv("OPENAI_API_KEY")
if not openai_api_key:
    raise ValueError("Missing OPENAI_API_KEY in .env")

@tool
def search_database(query: str, limit: int = 10) -> str:
    """A tool to search the customer database."""
    return f"Found {limit} results for '{query}'"


model = ChatOpenAI(
    model="gpt-4", # Recommended: use a model known to be good for agents (like gpt-4 or gpt-4o)
    temperature=0.1,
    max_tokens=1000,
    timeout=30,
    openai_api_key=openai_api_key
)

agent = create_agent(
    model, 
    tools=[search_database], 
    system_prompt="You are a helpful assistant. Be concise and accurate.")

result = agent.invoke({"input": "Find records for customers in Paris"})

final_message = result["messages"][-1].content
print("\n=== Agent Response ===")
print(final_message)