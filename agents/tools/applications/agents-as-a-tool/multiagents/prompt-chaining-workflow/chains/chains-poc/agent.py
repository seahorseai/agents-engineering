from langchain_core.runnables import Runnable
from langchain_openai import ChatOpenAI
from langchain_core.prompts import ChatPromptTemplate
from langchain_community.tools import DuckDuckGoSearchResults
from langgraph.graph import StateGraph, END, START
import os
from dotenv import load_dotenv

# -------- Load Environment Variables --------
load_dotenv()
api_key = os.getenv("OPENAI_API_KEY")
if not api_key:
    raise ValueError("OPENAI_API_KEY not found in .env")

# -------- LLM + TOOL CONFIG --------
llm = ChatOpenAI(model="gpt-4", temperature=0.3, api_key=api_key)
search_tool = DuckDuckGoSearchResults(max_results=3)

# -------- NODE 1: SEARCH --------
def search_web(state: dict) -> dict:
    topic = state["topic"]
    results = search_tool.invoke({"query": topic})
    return {**state, "search_results": results}

# -------- NODE 2: ANALYZE --------
analyze_prompt = ChatPromptTemplate.from_messages([
    ("system", "You are a market research analyst."),
    ("human", "Summarize and analyze these search results:\n\n{search_results}")
])
analyze_chain: Runnable = analyze_prompt | llm

def analyze_results(state: dict) -> dict:
    response = analyze_chain.invoke({"search_results": state["search_results"]})
    return {**state, "analysis": response.content}

# -------- NODE 3: REPORT --------
report_prompt = ChatPromptTemplate.from_messages([
    ("system", "You are a marketing strategist generating reports."),
    ("human", "Write a concise marketing research report on '{topic}' using this analysis:\n\n{analysis}")
])
report_chain: Runnable = report_prompt | llm

def generate_report(state: dict) -> dict:
    response = report_chain.invoke({
        "topic": state["topic"],
        "analysis": state["analysis"]
    })
    return {**state, "report": response.content}


# -------- BUILD LANGGRAPH --------
graph_builder = StateGraph(state_schema=dict)  # <-- required now

graph_builder.add_node("search", search_web)
graph_builder.add_node("analyze", analyze_results)
graph_builder.add_node("report", generate_report)

graph_builder.add_edge(START, "search")
graph_builder.add_edge("search", "analyze")
graph_builder.add_edge("analyze", "report")
graph_builder.add_edge("report", END)

# Compile the graph
graph = graph_builder.compile()


# -------- RUN AGENT --------
if __name__ == "__main__":
    topic = "Top AI marketing tools for startups in 2025"
    result = graph.invoke({"topic": topic})
    print("\n📊 Final Report:\n")
    print(result["report"])
