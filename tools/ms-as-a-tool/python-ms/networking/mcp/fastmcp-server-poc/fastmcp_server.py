# fastmcp_server.py
from fastmcp import FastMCP

mcp = FastMCP("Demo Server")  # initialize server instance :contentReference[oaicite:1]{index=1}

@mcp.tool()
def add(a: int, b: int) -> int:
    """Return the sum of two numbers."""
    return a + b

@mcp.resource("greeting://{name}")
def greet(name: str) -> str:
    """Return a greeting message for the provided name."""
    return f"Hello, {name}!"

if __name__ == "__main__":
    mcp.run()  # runnable via CLI or directly :contentReference[oaicite:2]{index=2}
