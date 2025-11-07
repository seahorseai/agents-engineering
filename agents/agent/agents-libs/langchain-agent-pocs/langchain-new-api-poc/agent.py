from langchain.agents import create_agent
from langchain.chat_models import init_chat_model
from langchain.tools import tool
from openapikey import load_openai_api_key

@tool
def search_database(query: str, limit: int = 10) -> str:
    """A tool to search the customer database."""
    return f"Found {limit} results for '{query}'"

agent = create_agent(
    init_chat_model(
    model="openai:gpt-4",  # or "openai:gpt-4o" for GPT-4o
    temperature=0.1,
    max_tokens=1000,
    timeout=30,
    openai_api_key=load_openai_api_key), 
    tools=[search_database], 
    system_prompt="You are a helpful assistant. Be concise and accurate.")


result = agent.invoke({"input": "Find records for customers in Paris"})


final_message = result["messages"][-1].content
print("\n=== Agent Response ===")
print(final_message)

