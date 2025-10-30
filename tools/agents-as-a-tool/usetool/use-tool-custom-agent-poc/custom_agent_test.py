import pytest
from langgraph.graph import MessagesState
from langchain_core.messages import HumanMessage, AIMessage, ToolMessage
from custom_agent import arithmetic, should_continue, tool_node, agent
from unittest.mock import patch

# Test the arithmetic tool
def test_arithmetic_add():
    result = arithmetic.invoke({"operation": "add", "x": 3.0, "y": 4.0})
    assert result == 7.0

def test_arithmetic_subtract():
    result = arithmetic.invoke({"operation": "subtract", "x": 5.0, "y": 2.0})
    assert result == 3.0

def test_arithmetic_multiply():
    result = arithmetic.invoke({"operation": "multiply", "x": 3.0, "y": 4.0})
    assert result == 12.0

def test_arithmetic_divide():
    result = arithmetic.invoke({"operation": "divide", "x": 8.0, "y": 2.0})
    assert result == 4.0

def test_arithmetic_divide_by_zero():
    with pytest.raises(ValueError, match="Cannot divide by zero"):
        arithmetic.invoke({"operation": "divide", "x": 5.0, "y": 0.0})

def test_arithmetic_invalid_operation():
    with pytest.raises(ValueError, match="Unsupported operation: invalid"):
        arithmetic.invoke({"operation": "invalid", "x": 5.0, "y": 2.0})

# Test the should_continue function
def test_should_continue_with_tool_call():
    state = {
        "messages": [
            AIMessage(
                content="",
                tool_calls=[{"name": "arithmetic", "args": {}, "id": "123"}]
            )
        ]
    }
    assert should_continue(state) == "environment"

def test_should_continue_without_tool_call():
    state = {
        "messages": [AIMessage(content="Result: 7")]
    }
    assert should_continue(state) == "__end__"

# Test the tool_node function
def test_tool_node():
    state = {
        "messages": [
            AIMessage(
                content="",
                tool_calls=[
                    {
                        "name": "arithmetic",
                        "args": {"operation": "add", "x": 3.0, "y": 4.0},
                        "id": "123"
                    }
                ]
            )
        ]
    }
    result = tool_node(state)
    assert len(result["messages"]) == 1
    assert isinstance(result["messages"][0], ToolMessage)
    assert result["messages"][0].content == "7.0"
    assert result["messages"][0].tool_call_id == "123"

