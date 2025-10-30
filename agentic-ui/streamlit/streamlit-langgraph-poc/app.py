import streamlit as st
from langgraph.prebuilt import create_react_agent
from langchain_openai import ChatOpenAI
from langchain_core.tools import tool
from dotenv import load_dotenv
import os

# -------------------------------
# Load environment variables
# -------------------------------
load_dotenv()
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")

# -------------------------------
# 1️⃣  Define a simple tool
# -------------------------------
@tool
def add(a: int, b: int) -> int:
    """Add two integers together."""
    return a + b

# -------------------------------
# 2️⃣  Create the LangGraph agent
# -------------------------------
llm = ChatOpenAI(model="gpt-4o-mini")  # or gpt-3.5-turbo, etc.
agent = create_react_agent(
    model=llm,
    tools=[add],
    prompt="You are a helpful assistant that can call tools if needed."
)

# -------------------------------
# 3️⃣  Streamlit UI
# -------------------------------
st.set_page_config(page_title="LangGraph Agent", page_icon="🤖")
st.title("🤖 LangGraph React Agent")
st.caption("Built with LangGraph + Streamlit — in one file!")

# Initialize chat history
if "messages" not in st.session_state:
    st.session_state.messages = []

# Display chat history
for msg in st.session_state.messages:
    with st.chat_message(msg["role"]):
        st.markdown(msg["content"])

# Input box
if prompt := st.chat_input("Ask me something..."):
    # Add user message
    st.session_state.messages.append({"role": "user", "content": prompt})
    with st.chat_message("user"):
        st.markdown(prompt)

    # Get agent response
    with st.chat_message("assistant"):
        with st.spinner("Thinking..."):
            result = agent.invoke({"messages": [{"role": "user", "content": prompt}]})

            # Extract last assistant message safely
            messages = result.get("messages", [])
            if messages:
                last_msg = messages[-1]
                # Handle LangChain message objects
                if hasattr(last_msg, "content"):
                    response = last_msg.content
                else:
                    response = str(last_msg)
            else:
                response = "⚠️ No response from agent."

            st.markdown(response)

    # Save response
    st.session_state.messages.append({"role": "assistant", "content": response})
