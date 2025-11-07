# agent_api.py
from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse
from langgraph.prebuilt import create_react_agent
from langchain_core.tools import Tool  # or whatever Tool comes from in the LangChain core
from tools import fetch_ga_report, fetch_google_ads
import os

# -----------------------------
# Setup Agent
# -----------------------------
tools = [
    Tool(name="google_analytics_report", func=fetch_ga_report, description="Fetch GA4 metrics"),
    Tool(name="google_ads_report", func=fetch_google_ads, description="Fetch Google Ads metrics"),
]

agent = create_react_agent(
    model_name=os.getenv("LLM_MODEL", "gpt-4o-mini"),
    tools=tools,
    verbose=True,
)

app = FastAPI(title="LangGraph Agent API")

@app.post("/api/agent")
async def run_agent(request: Request):
    payload = await request.json()
    user_input = payload.get("input", "")
    result = agent.run(user_input)
    return JSONResponse(result)

@app.get("/api/ga_report")
async def ga_report():
    data = fetch_ga_report({"property_id": os.getenv("GA_PROPERTY_ID")})
    return JSONResponse(data)

@app.get("/api/ads_report")
async def ads_report():
    data = fetch_google_ads({"customer_id": os.getenv("GOOGLE_ADS_ID")})
    return JSONResponse(data)
