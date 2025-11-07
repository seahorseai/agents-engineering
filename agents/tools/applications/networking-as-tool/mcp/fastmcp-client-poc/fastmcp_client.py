# fastmcp_client.py
import asyncio
from fastmcp import Client

async def main():
    client = Client("http://127.0.0.1:8000")  # default port for HTTP transport

    sum_res = await client.call_tool("add", {"a": 7, "b": 5})
    print("add(7,5) =", sum_res.result)

    greeting = await client.fetch_resource("greeting://Alice")
    print("greeting:", greeting)

if __name__ == "__main__":
    asyncio.run(main())
