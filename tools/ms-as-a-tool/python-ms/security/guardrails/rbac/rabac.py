from langgraph.graph import StateGraph, END
from langgraph.prebuilt import ToolNode
from typing import TypedDict, Literal
import guardrails as gd


# ---------------------------
# Step 1: Define State
# ---------------------------
class AgentState(TypedDict):
    user_input: str
    role: Literal["admin", "user", "guest"]
    response: str


# ---------------------------
# Step 2: Guardrails Validator
# ---------------------------
# Example: ensure the response is safe & JSON structured
schema = """
<rail version="0.3">

<output>
  <string name="message" description="Validated agent response"/>
</output>

<filters>
  <filter id="no-hate" name="profanity" on_fail="error"/>
</filters>

</rail>
"""

guard = gd.Guard.from_rail_string(schema)


def validate_response(text: str) -> str:
    """Validate LLM response with guardrails."""
    result = guard.parse(text)
    return result.validated_output["message"]


# ---------------------------
# Step 3: RBAC Layer
# ---------------------------
def check_access(role: str, action: str) -> bool:
    """Simple RBAC rules."""
    rules = {
        "admin": ["read", "write", "delete"],
        "user": ["read", "write"],
        "guest": ["read"]
    }
    return action in rules.get(role, [])


# ---------------------------
# Step 4: Define Agent Logic
# ---------------------------
def agent_node(state: AgentState) -> AgentState:
    user_text = state["user_input"]
    role = state["role"]

    # RBAC check
    if not check_access(role, "write"):
        response = f"Access denied for role '{role}' to perform this action."
    else:
        # Imagine this is the AI model output
        raw_response = f"Hello {role}, you said: {user_text}"
        response = validate_response(raw_response)

    return {**state, "response": response}


# ---------------------------
# Step 5: Build Graph
# ---------------------------
graph = StateGraph(AgentState)
graph.add_node("agent", agent_node)
graph.set_entry_point("agent")
graph.set_finish_point("agent")

app = graph.compile()


# ---------------------------
# Step 6: Run Agent
# ---------------------------
if __name__ == "__main__":
    inputs = {"user_input": "Show me system details", "role": "guest"}
    result = app.invoke(inputs)
    print(result["response"])
