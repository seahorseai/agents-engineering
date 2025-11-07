# simple_duckduckgo_agent.py


from langchain_community.tools.ddg_search.tool import DuckDuckGoSearchResults

from langchain_openai import ChatOpenAI
from langgraph.prebuilt import create_react_agent
from dotenv import load_dotenv
import os

# Load env vars
load_dotenv()
api_key = os.getenv("OPENAI_API_KEY")
if not api_key:
    raise ValueError("OPENAI_API_KEY not found in .env")

# 1. Tool setup
search = DuckDuckGoSearchResults()
tools = [search]

# 2. LLM
model = ChatOpenAI(
    model="gpt-4",
    temperature=0,
    api_key=api_key
)

# 3. Agent
agent = create_react_agent(
    model=model, 
    tools=tools,
    prompt="You are a news assistant that can search news using tools if needed."
    )

# 4. Run
if __name__ == "__main__":

    # User message
    inputs = {"messages": [{"role": "user", "content": "What's the latest news about SpaceX?"}]}
    result = agent.invoke(inputs)
    # Extract and print only the final AI message content
    final_message = result["messages"][-1].content
    print(final_message)



