from langchain.agents import create_agent
from langchain.chat_models import init_chat_model
from openapikey import load_openai_api_key
from langgraph.checkpoint.memory import InMemorySaver
from langchain.agents.middleware import SummarizationMiddleware
from langchain_core.runnables import RunnableConfig


agent = create_agent(
    model=init_chat_model(
        model="openai:gpt-4", 
        temperature=0.1,
        max_tokens=1000,
        timeout=30,
        openai_api_key=load_openai_api_key),  
    middleware=[
        SummarizationMiddleware(
            model="gpt-4o-mini",
            max_tokens_before_summary=4000,  # Trigger summarization at 4000 tokens
            messages_to_keep=20,  # Keep last 20 messages after summary
        )
    ],
    checkpointer=InMemorySaver(),
    system_prompt="You are a helpful assistant. Be concise and accurate.")




config: RunnableConfig = {"configurable": {"thread_id": "1"}}
agent.invoke({"messages": "hi, my name is bob"}, config)
agent.invoke({"messages": "write a short poem about cats"}, config)
agent.invoke({"messages": "now do the same but for dogs"}, config)
final_response = agent.invoke({"messages": "what's my name?"}, config)

final_response["messages"][-1].pretty_print()
