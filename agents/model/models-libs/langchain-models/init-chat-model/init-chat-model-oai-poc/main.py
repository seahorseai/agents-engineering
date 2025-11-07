from langchain_core.prompts import ChatPromptTemplate



from langchain.chat_models import init_chat_model
from langgraph.prebuilt import create_react_agent
from langchain_core.tools import tool

import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()
api_key = os.getenv("OPENAI_API_KEY")
if not api_key:
    raise ValueError("OPENAI_API_KEY not found in .env")

# Example dummy tool
# Define a simple tool
@tool
def get_weather(location: str) -> str:
    """Get the current weather for a given location."""
    return f"The weather in {location} is sunny and 25°C."


# ✅ Init the chat model using init_chat_model
# Initialize the chat model using OpenAI's GPT-4
model = init_chat_model(
    model="openai:gpt-4",  # or "openai:gpt-4o" for GPT-4o
    temperature=0,
    api_key=api_key, # <-- use 'config' for credentials
)

# ✅ Define prompt with input variable
prompt = ChatPromptTemplate.from_messages([
    ("system", "You are a helpful assistant."),
    ("placeholder", "{messages}")
])

# ✅ Create the agent using LangGraph
agent = create_react_agent(
    model=model,
    tools=[get_weather],
    prompt=prompt,
)
# ✅ Provide the input as a dict
# Run the agent with a sample question
response = agent.invoke({"input": "What's the weather in Paris?"
                        ,"chat_history": []})

final_message = response["messages"][-1]
print(final_message.content)