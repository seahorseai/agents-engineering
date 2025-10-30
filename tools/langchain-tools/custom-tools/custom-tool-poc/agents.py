from langchain_core.tools import tool
from langgraph.prebuilt import create_react_agent
from langchain_openai import ChatOpenAI
from dotenv import load_dotenv
import os

# Load env vars
load_dotenv()
api_key = os.getenv("OPENAI_API_KEY")
if not api_key:
    raise ValueError("OPENAI_API_KEY not found in .env")

model = ChatOpenAI(
    model="gpt-4",
    temperature=0,
    api_key=api_key
)

@tool
def multiply(a: int, b: int) -> int:
    """Multiply two numbers."""
    return a * b

agent = create_react_agent(
    model=model,
    tools=[multiply]
)
result = agent.invoke({"messages": [{"role": "user", "content": "what's 42 x 7?"}]})

# Extract and print only the final AI message content
final_message = result["messages"][-1].content
print(final_message)