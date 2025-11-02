# prebuilt_agent.py


from langchain_openai import ChatOpenAI
from langgraph.prebuilt import create_react_agent
from langchain_core.tools import tool

import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()
api_key = os.getenv("OPENAI_API_KEY")
if not api_key:
    raise ValueError("OPENAI_API_KEY not found in .env")

# Set up the OpenAI model
llm = ChatOpenAI(
    model="gpt-4",
    temperature=0,
    api_key=api_key
)

# Define a tool with metadata
@tool
def reverse_string(text: str) -> str:
    """Reverses a string."""
    return text[::-1]

# Create the ReAct agent
agent = create_react_agent(
    model=llm,
    tools=[reverse_string],
    prompt="You are a witty assistant that can reverse words when asked. Use tools if needed."
)

# User message
inputs = {"messages": [{"role": "user", "content": "Can you reverse the word 'LangGraph'?"}]}
result = agent.invoke(inputs)
# Extract and print only the final AI message content
final_message = result["messages"][-1].content
print(final_message)