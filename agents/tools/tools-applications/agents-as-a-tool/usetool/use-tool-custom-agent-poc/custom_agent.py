# custom_agent.py
from langgraph.graph import MessagesState, StateGraph, START, END
from langchain_core.messages import SystemMessage, HumanMessage, ToolMessage
from langchain_openai import ChatOpenAI
from langchain_core.tools import tool
from typing import Literal
import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()
api_key = os.getenv("OPENAI_API_KEY")
if not api_key:
    raise ValueError("OPENAI_API_KEY not found in .env")

# Define the arithmetic tool
@tool
def arithmetic(operation: str, x: float, y: float) -> float:
    """Performs basic arithmetic operations (add, subtract, multiply, divide)"""
    if operation == "add":
        return x + y
    elif operation == "subtract":
        return x - y
    elif operation == "multiply":
        return x * y
    elif operation == "divide":
        if y == 0:
            raise ValueError("Cannot divide by zero")
        return x / y
    else:
        raise ValueError(f"Unsupported operation: {operation}")

# Create tools dictionary
tools_by_name = {"arithmetic": arithmetic}

# Initialize the LLM with tools
llm = ChatOpenAI(model="gpt-4o-mini", temperature=0)
llm_with_tools = llm.bind_tools([arithmetic])

# Nodes
def llm_call(state: MessagesState):
    """LLM decides whether to call a tool or not"""
    return {
        "messages": [
            llm_with_tools.invoke(
                [
                    SystemMessage(
                        content="You are a helpful assistant tasked with performing arithmetic on a set of inputs. "
                                "Use the arithmetic tool when needed, specifying the operation and numbers."
                    )
                ]
                + state["messages"]
            )
        ]
    }

def tool_node(state: MessagesState):
    """Performs the tool call"""
    result = []
    for tool_call in state["messages"][-1].tool_calls:
        tool = tools_by_name[tool_call["name"]]
        observation = tool.invoke(tool_call["args"])
        result.append(ToolMessage(content=str(observation), tool_call_id=tool_call["id"]))
    return {"messages": result}

# Conditional edge function
def should_continue(state: MessagesState) -> Literal["environment", END]:
    """Decide if we should continue the loop or stop based upon whether the LLM made a tool call"""
    messages = state["messages"]
    last_message = messages[-1]
    if last_message.tool_calls:
        return "environment"
    return END

# Build workflow
agent_builder = StateGraph(MessagesState)

# Add nodes
agent_builder.add_node("llm_call", llm_call)
agent_builder.add_node("environment", tool_node)

# Add edges
agent_builder.add_edge(START, "llm_call")
agent_builder.add_conditional_edges(
    "llm_call",
    should_continue,
    {
        "environment": "environment",
        END: END,
    },
)
agent_builder.add_edge("environment", "llm_call")

# Compile the agent
agent = agent_builder.compile()

# Example usage
if __name__ == "__main__":
    messages = [HumanMessage(content="Add 3 and 4.")]
    result = agent.invoke({"messages": messages})
    
    print("Final response:")
    for m in result["messages"]:
        m.pretty_print()