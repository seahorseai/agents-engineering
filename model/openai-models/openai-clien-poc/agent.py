import os
from dotenv import load_dotenv, find_dotenv
from openai import OpenAI  # assuming you are using the new “openai” client

# Load environment variables from .env file (and environment)
load_dotenv(find_dotenv())  # or simply load_dotenv() if you don’t need to search

# Retrieve the API key
api_key = os.getenv("OPENAI_API_KEY")
if api_key is None:
    raise RuntimeError("OPENAI_API_KEY environment variable not set")

# Create the OpenAI client
client = OpenAI(api_key=api_key)

# Example API call (chat completions)
response = client.chat.completions.create(
    model="gpt-3.5-turbo",
    messages=[
        {"role": "user", "content": "Hello, how are you?"}
    ],
    max_tokens=100,
    temperature=0.7
)

print(response.choices[0].message.content)
