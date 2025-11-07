import sys
import os
sys.path.append(os.path.dirname(os.path.abspath(__file__)))
print("sys.path:", sys.path)  # Debugging: Print sys.path to verify

import pytest

from unittest.mock import patch
from langchain_core.messages import AIMessage

from prebuilt_agent import reverse_string, create_react_agent, ChatOpenAI
import pydantic_core

@pytest.fixture
def agent():
    # Mock environment variable for OPENAI_API_KEY
    with patch.dict(os.environ, {"OPENAI_API_KEY": "test_key"}):
        # Set up the LLM and agent
        llm = ChatOpenAI(model="gpt-4", temperature=0, api_key="test_key")
        agent = create_react_agent(
            llm,
            tools=[reverse_string],
            prompt="You are a witty assistant that can reverse words when asked. Use tools if needed."
        )
        yield agent

def test_reverse_string_tool():
    # Test the reverse_string tool directly using invoke to avoid deprecation warning
    result = reverse_string.invoke("LangGraph")
    assert result == "hparGgnaL"

def test_agent_reverses_string(agent):
    # Test the agent with a valid input
    inputs = {"messages": [{"role": "user", "content": "Can you reverse the word 'LangGraph'?"}]}
    with patch.object(ChatOpenAI, 'invoke', return_value=AIMessage(content="hparGgnaL")):
        result = agent.invoke(inputs)
        final_message = result["messages"][-1].content
        assert final_message == "hparGgnaL"

def test_empty_string(agent):
    # Test the agent with an empty string
    inputs = {"messages": [{"role": "user", "content": "Can you reverse the word ''?"}]}
    with patch.object(ChatOpenAI, 'invoke', return_value=AIMessage(content="")):
        result = agent.invoke(inputs)
        final_message = result["messages"][-1].content
        assert final_message == ""

def test_non_string_input():
    # Test the reverse_string tool with non-string input
    with pytest.raises(pydantic_core.ValidationError):
        reverse_string.invoke(123)

def test_missing_api_key(monkeypatch):
    # Test behavior when API key is missing
    monkeypatch.delenv("OPENAI_API_KEY", raising=False)
    with pytest.raises(Exception) as exc_info:
        ChatOpenAI(model="gpt-4", temperature=0, api_key=None)
    assert "api_key" in str(exc_info.value)
