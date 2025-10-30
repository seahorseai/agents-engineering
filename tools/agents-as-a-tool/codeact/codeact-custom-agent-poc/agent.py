from langchain_openai import ChatOpenAI
from langgraph.graph import StateGraph, END, START
from langchain.schema import BaseOutputParser
from typing import TypedDict
from dotenv import load_dotenv
import traceback
import os

# Load environment variables
load_dotenv()
assert os.getenv("OPENAI_API_KEY"), "OPENAI_API_KEY not set in .env"

# Typed state with retry support
class AgentState(TypedDict, total=False):
    instruction: str
    code: str
    output: str
    error: str
    traceback: str
    retries: int

# Extract Python code from LLM response
class CodeExtractor(BaseOutputParser):
    def parse(self, text: str) -> str:
        import re
        match = re.search(r"```python(.*?)```", text, re.DOTALL)
        return match.group(1).strip() if match else text.strip()

# Step 1: Generate code
def generate_code(state: AgentState) -> AgentState:
    llm = ChatOpenAI(temperature=0, model="gpt-4")
    prompt = f"Write Python code to do the following task:\n\n{state['instruction']}"
    response = llm.invoke(prompt)
    code = CodeExtractor().parse(response.content)
    return {
        **state,
        "code": code
    }

# Step 2: Execute the code
def execute_code(state: AgentState) -> AgentState:
    try:
        local_vars = {}
        exec(state["code"], {}, local_vars)
        output = local_vars.get("result", "Execution completed. No `result` variable found.")
        return {
            **state,
            "output": output,
            "error": None,
            "traceback": None
        }
    except Exception as e:
        retries = state.get("retries", 0) + 1
        return {
            **state,
            "error": str(e),
            "traceback": traceback.format_exc(),
            "retries": retries
        }

# Branch logic: Retry if error and below max
MAX_RETRIES = 3

def error_handler(state: AgentState) -> str:
    if "error" in state and state.get("retries", 0) < MAX_RETRIES:
        return "generate_code"
    return END

# Build LangGraph
builder = StateGraph(AgentState)

builder.add_node("generate_code", generate_code)
builder.add_node("execute_code", execute_code)

builder.add_edge(START, "generate_code")
builder.add_edge("generate_code", "execute_code")
builder.add_conditional_edges("execute_code", error_handler)

graph = builder.compile()

# Run the agent
if __name__ == "__main__":
    user_input = "Plot a sine wave using matplotlib and numpy"
    initial_state: AgentState = {"instruction": user_input, "retries": 0}
    
    result = graph.invoke(initial_state)

    print("\n--- Final Result ---")
    if "output" in result:
        print("✅ Output:\n", result["output"])
    else:
        print("❌ Error:\n", result.get("error", "Unknown error"))
        print("Traceback:\n", result.get("traceback", "No traceback"))
