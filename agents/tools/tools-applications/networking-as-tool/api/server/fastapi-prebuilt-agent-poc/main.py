# main.py

import os
from dotenv import load_dotenv
load_dotenv()

from fastapi import FastAPI, Depends, HTTPException
from fastapi.security.api_key import APIKeyHeader
from agent_graph import agent_runnable

app = FastAPI(title="Marketing Research Agent", version="1.0")

# --- Security ---
API_KEY = os.getenv("API_KEY")
if not API_KEY:
    raise RuntimeError("API_KEY is not set in environment.")

api_key_header = APIKeyHeader(name="X-API-Key")

def validate_api_key(key: str = Depends(api_key_header)):
    if key != API_KEY:
        raise HTTPException(status_code=403, detail="Unauthorized")
    return True

# --- Endpoint ---
@app.post("/research")
async def perform_research(input: str, valid: bool = Depends(validate_api_key)):
    try:
        result = agent_runnable.invoke({"input": input})
         # Extract the final message from the "messages" key
        messages = result["messages"]  # Access the messages list
        final_message = messages[-1]  # Get the last message (the agent's response)

        # Return the content of the final message
        return final_message.content
    except Exception as e:
        return {"error": str(e)}
