# agentic-rag.py

import os
from dotenv import load_dotenv

# LangChain imports
from langchain.tools.retriever import create_retriever_tool
from langchain_openai import ChatOpenAI

from etl import vectorstore

retriever = vectorstore.as_retriever()

# Import LangGraph create_react_agent
from langgraph.prebuilt import create_react_agent
import langchain
langchain.verbose = True  # enable debug logs

# Load environment variables from .env
load_dotenv()
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
if not OPENAI_API_KEY:
    raise ValueError("OPENAI_API_KEY is not set in your environment.")

# Wrap retriever as a tool
retriever_tool = create_retriever_tool(
    retriever=retriever,
    name="doc_retriever",
    description="Search the document database for relevant information."
)

# Define LLM
llm = ChatOpenAI(model="gpt-4o", api_key=OPENAI_API_KEY)

# Create the agent using LangGraph's create_react_agent
agent_runnable = create_react_agent(llm, [retriever_tool])

# Run query
query = "What did the president say about climate change?"
response = agent_runnable.invoke({
    "messages": [
        ("system", "You are an intelligent agent who helps answer questions using a document retriever."),
        ("user", query)
    ]
})

print("\n--- Agent Response ---\n")
# Print the last AI message
for msg in response["messages"]:
    if msg.type == "AIMessage":
        print(msg.content)
        break