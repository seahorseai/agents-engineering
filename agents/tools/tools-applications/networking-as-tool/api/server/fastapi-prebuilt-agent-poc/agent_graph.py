# agent_graph.py
import os
from dotenv import load_dotenv
from langchain_openai import ChatOpenAI
from langgraph.prebuilt import create_react_agent
from langchain_community.tools import DuckDuckGoSearchResults

# Load environment variables
load_dotenv()
api_key = os.getenv("OPENAI_API_KEY")
if not api_key:
    raise ValueError("OPENAI_API_KEY not found in .env")

# Define tools
tools = [DuckDuckGoSearchResults(max_results=3)]

# --- Create the LLM ---
model = ChatOpenAI(model="gpt-4", temperature=0, api_key=api_key)

# Define the system message
prompt = "You are a marketing research assistant. Use the provided tools to find current market data and summarize it concisely. If no relevant data is found or the search tool fails, provide a brief explanation and suggest checking reputable sources like IDC, Gartner, or Statista."

# --- Create the agent ---
agent_runnable = create_react_agent(
    model=model,
    tools=tools,
    prompt=prompt  # Pass the system message directly

)

# Function to run the agent
def run_agent(query: str):
    inputs = {
        "messages": [("user", query)]  # Use "messages" to pass the user query
    }
    result = agent_runnable.invoke(inputs)  # Invoke the agent

    # Extract the final message from the "messages" key
    messages = result["messages"]  # Access the messages list
    final_message = messages[-1]  # Get the last message (the agent's response)

    # Return the content of the final message
    return final_message.content

# Example usage
if __name__ == "__main__":
    query = "What are the latest trends in the smartphone market?"
    try:
        response = run_agent(query)
        print("Agent Response:")
        print(response)
    except Exception as e:
        print(f"Error running agent: {e}")
        import traceback
        traceback.print_exc()
