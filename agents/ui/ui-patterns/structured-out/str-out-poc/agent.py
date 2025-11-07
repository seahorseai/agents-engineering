import os
import json
from dotenv import load_dotenv
from pydantic import BaseModel, Field
from langchain_core.tools import tool
from langchain_openai import ChatOpenAI
from langgraph.prebuilt import create_react_agent

# 🌍 1. Load environment variables
load_dotenv()
api_key = os.getenv("OPENAI_API_KEY")

# ✅ 2. Initialize LLM with loaded API key
llm = ChatOpenAI(model="gpt-4o", temperature=0, api_key=api_key)

# 📦 3. Define structured output schema
class WeatherResponse(BaseModel):
    location: str = Field(description="City queried")
    conditions: str = Field(description="Forecast details")

# 🔧 4. Define tool
@tool
def get_weather(city: str) -> str:
    """Mock weather retrieval"""
    if city.lower() == "paris":
        return "Sunny, around 22°C"
    else:
        return "Weather data unavailable"

# 🤖 5. Create agent with structured output
agent = create_react_agent(
    model=llm,
    tools=[get_weather],
    prompt="You are a helpful assistant that provides weather information.",
    response_format=WeatherResponse
)

# 🚀 6. Run the agent
result = agent.invoke({"messages": [("user", "What's the weather in Paris?")]})

# 📤 7. Output structured response
import json


response = result["structured_response"]
print(f"📍 Location: {response.location}\n🌤️ Conditions: {response.conditions}")

