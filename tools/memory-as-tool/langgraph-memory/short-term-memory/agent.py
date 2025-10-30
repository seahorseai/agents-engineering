import os
from dotenv import load_dotenv

from langgraph.prebuilt import create_react_agent
from langgraph.checkpoint.memory import InMemorySaver
from langchain_core.tools import tool
from langchain_openai import ChatOpenAI

# Load environment variables from .env file
load_dotenv()
openai_api_key = os.getenv("OPENAI_API_KEY")

# Verify API key
if not openai_api_key:
    raise ValueError("OPENAI_API_KEY not found in environment variables.")

# Set up the model
model = ChatOpenAI(model="gpt-4", temperature=0, api_key=openai_api_key)

# Define a simple tool using the @tool decorator
@tool
def get_weather(city: str) -> str:
    """Get weather for a given city."""
    return f"It's always sunny in {city}!"

# In-memory state management
checkpointer = InMemorySaver()

# Create the ReAct agent
agent = create_react_agent(
    model=model,
    tools=[get_weather],
    checkpointer=checkpointer
)

# Use a unique thread ID to track the conversation
config = {
    "configurable": {
        "thread_id": "1"
    }
}

# Start the conversation
inputs = {"messages": [{"role": "user", "content": "What is the weather in SF?"}]}
result = agent.invoke(inputs, config)
final_message = result["messages"][-1].content
print("SF:", final_message)


# Continue the conversation
inputs = {"messages": [{"role": "user", "content": "What about New York?"}]}
result = agent.invoke(inputs, config)
final_message = result["messages"][-1].content
print("NY:", final_message)
