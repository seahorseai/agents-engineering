from langchain.agents import create_agent
from langchain.chat_models import init_chat_model
from openapikey import load_openai_api_key
from langgraph.checkpoint.memory import InMemorySaver



agent = create_agent(
    model=init_chat_model(
        model="openai:gpt-4", 
        temperature=0.1,
        max_tokens=1000,
        timeout=30,
        openai_api_key=load_openai_api_key),  
    checkpointer=InMemorySaver(),
    system_prompt="You are a helpful assistant. Be concise and accurate.")


result = agent.invoke(
    {"messages": [{"role": "user", "content": "Hi! My name is Bob."}]},
    {"configurable": {"thread_id": "1"}},  )


final_message = result["messages"][-1].content
print("\n=== Agent Response 1 ===")
print(final_message)

result2 = agent.invoke(
    {"messages": [{"role": "user", "content": "Do you remember my name"}]},
    {"configurable": {"thread_id": "1"}},  )

final_message2 = result2["messages"][-1].content
print("\n=== Agent Response 2 ===")
print(final_message2)
