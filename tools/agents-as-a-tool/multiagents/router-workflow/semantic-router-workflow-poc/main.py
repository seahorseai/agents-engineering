import os
from typing import TypedDict
from typing_extensions import Literal
from dotenv import load_dotenv
from pydantic import BaseModel, Field

from langchain_core.messages import HumanMessage, SystemMessage
from langgraph.graph import StateGraph, START, END
from langchain_openai import ChatOpenAI


# Load environment variables
load_dotenv()
api_key = os.getenv("OPENAI_API_KEY")
if not api_key:
    raise ValueError("OPENAI_API_KEY not found in .env file")

# Initialize the LLM
llm = ChatOpenAI(
    model="gpt-4",
    temperature=0,
    api_key=api_key
)

# Routing schema definition
class Route(BaseModel):
    step: Literal["poem", "story", "joke"] = Field(
        ..., description="The next step in the routing process"
    )

# Structured output with function-calling method
router = llm.with_structured_output(Route, method="function_calling")

# Shared state
class State(TypedDict):
    input: str
    decision: str
    output: str

# Output nodes
def llm_call_1(state: State):
    """Write a story"""
    result = llm.invoke(state["input"])
    return {"output": result.content}

def llm_call_2(state: State):
    """Write a joke"""
    result = llm.invoke(state["input"])
    return {"output": result.content}

def llm_call_3(state: State):
    """Write a poem"""
    result = llm.invoke(state["input"])
    return {"output": result.content}

# Router node
def llm_call_router(state: State):
    """Route input to poem, story, or joke."""
    decision = router.invoke(
        [
            SystemMessage(
                content="Route the input to story, joke, or poem based on the user's request."
            ),
            HumanMessage(content=state["input"]),
        ]
    )
    return {"decision": decision.step}

# Decision logic
def route_decision(state: State):
    if state["decision"] == "story":
        return "llm_call_1"
    elif state["decision"] == "joke":
        return "llm_call_2"
    elif state["decision"] == "poem":
        return "llm_call_3"
    else:
        raise ValueError(f"Invalid route decision: {state['decision']}")

# Build the workflow
router_builder = StateGraph(State)

# Add nodes
router_builder.add_node("llm_call_router", llm_call_router)
router_builder.add_node("llm_call_1", llm_call_1)
router_builder.add_node("llm_call_2", llm_call_2)
router_builder.add_node("llm_call_3", llm_call_3)

# Add edges
router_builder.add_edge(START, "llm_call_router")
router_builder.add_conditional_edges(
    "llm_call_router",
    route_decision,
    {
        "llm_call_1": "llm_call_1",
        "llm_call_2": "llm_call_2",
        "llm_call_3": "llm_call_3",
    },
)
router_builder.add_edge("llm_call_1", END)
router_builder.add_edge("llm_call_2", END)
router_builder.add_edge("llm_call_3", END)

# Compile the graph
router_workflow = router_builder.compile()

# Run the workflow
if __name__ == "__main__":
    prompt = "Write me a joke about cats"
    result_state = router_workflow.invoke({"input": prompt})
    print("\n🔹 Final Output:\n")
    print(result_state["output"])
