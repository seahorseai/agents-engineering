from langchain_openai import ChatOpenAI
from langchain.agents import AgentExecutor, create_tool_calling_agent
from langchain_core.messages import HumanMessage
from langgraph.graph import StateGraph, END, START
from langgraph.graph.state import CompiledStateGraph
from typing import TypedDict
from langchain_core.prompts import PromptTemplate

from dotenv import load_dotenv
import os

load_dotenv()  # Load environment variables from .env file

# --------------------------
# Tools
# --------------------------
from langchain_community.tools import WikipediaQueryRun
from langchain_community.utilities import WikipediaAPIWrapper
from langchain_community.tools import DuckDuckGoSearchRun

# Initialize tools
wikipedia = WikipediaQueryRun(api_wrapper=WikipediaAPIWrapper())
duckduckgo_search = DuckDuckGoSearchRun()

tools_a = [wikipedia, duckduckgo_search]
tools_b = [DuckDuckGoSearchRun(), WikipediaQueryRun(api_wrapper=WikipediaAPIWrapper())]

# --------------------------
# LLM Setup
# --------------------------
llm = ChatOpenAI(
    api_key=os.getenv("OPENAI_API_KEY"),
    model="gpt-4o",
    temperature=0
)

# --------------------------
# Agents
# --------------------------

# Define prompts using PromptTemplate
agent_prompt_a = PromptTemplate.from_template(
    """You are Agent A. You must answer the question using the provided tools.
    
Question: {input}
{agent_scratchpad}"""
)

agent_prompt_b = PromptTemplate.from_template(
    """You are Agent B. You must answer the question using the provided tools.

Question: {input}
{agent_scratchpad}"""
)

# Create agents
agent_a = create_tool_calling_agent(llm, tools_a, agent_prompt_a)
agent_executor_a = AgentExecutor(agent=agent_a, tools=tools_a, verbose=True)

agent_b = create_tool_calling_agent(llm, tools_b, agent_prompt_b)
agent_executor_b = AgentExecutor(agent=agent_b, tools=tools_b, verbose=True)

# --------------------------
# Graph State Definition
# --------------------------
class GraphState(TypedDict):
    input: str
    agent_a_result: str
    agent_b_result: str

# --------------------------
# Nodes
# --------------------------
def run_agent_a(state: GraphState) -> dict:
    print("Running Agent A")
    result = agent_executor_a.invoke({"input": state["input"]})
    return {"agent_a_result": result["output"]}

def run_agent_b(state: GraphState) -> dict:
    print("Running Agent B")
    result = agent_executor_b.invoke({"input": state["input"]})
    return {"agent_b_result": result["output"]}

def merge_results(state: GraphState) -> dict:
    return {
        "output": f"Agent A said: {state['agent_a_result']}\nAgent B said: {state['agent_b_result']}"
    }

# --------------------------
# Build the LangGraph
# --------------------------
workflow = StateGraph(GraphState)

# Add nodes
workflow.add_node("run_agent_a", run_agent_a)
workflow.add_node("run_agent_b", run_agent_b)
workflow.add_node("merge_results", merge_results)

# Connect start to both agents
workflow.add_edge(START, "run_agent_a")
workflow.add_edge(START, "run_agent_b")

# Connect each agent to the merger
workflow.add_edge("run_agent_a", "merge_results")
workflow.add_edge("run_agent_b", "merge_results")

# End after merging
workflow.add_edge("merge_results", END)

# Compile graph
app: CompiledStateGraph = workflow.compile()

# --------------------------
# Run the Workflow
# --------------------------
if __name__ == "__main__":
    user_input = "What is 25*4 plus 10 squared?"
    result = app.invoke({"input": user_input})
    print("\nFinal Output:")
    print(result.get("output", "No output found"))