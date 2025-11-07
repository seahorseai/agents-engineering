import os
from dotenv import load_dotenv
from langgraph.prebuilt import create_react_agent
from langchain_openai import ChatOpenAI

# Set your OpenAI API key
# You can get one at https://platform.openai.com/api-keys
# For this example, we'll use a placeholder. In a real scenario, you'd set it as an environment variable.

# Load environment variables
load_dotenv()
api_key = os.getenv("OPENAI_API_KEY")
if not api_key:
    raise ValueError("OPENAI_API_KEY not found in .env")

# Initialize the ChatOpenAI model
# Ensure you have access to gpt-4o-mini or a similar model
model = ChatOpenAI(model="gpt-4o-mini", temperature=0, api_key=api_key)

# Create the agent with the web_search_preview tool
# The web_search_preview tool is a prebuilt tool from OpenAI
agent = create_react_agent(
    model=model,
    tools=[{"type": "web_search_preview"}]
)

# Invoke the agent with a message that requires web search
print("Invoking agent with: 'What was a positive news story from today?'")
response = agent.invoke(
    {"messages": [("user", "What was a positive news story from today?")]}
)

# Print the response from the agent
print("\nAgent Response:")
for message in response["messages"]:
    if isinstance(message, tuple):
        print(f"  {message[0]}: {message[1]}")
    else:
        print(f"  {message.type}: {message.content}")


