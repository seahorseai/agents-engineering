import requests

# Define the API endpoint
url = "https://jsonplaceholder.typicode.com/posts/1"

# Make a GET request
response = requests.get(url)

# Check if the request was successful
if response.status_code == 200:
    # Parse JSON response
    data = response.json()
    print("Post Title:", data["title"])
    print("Post Body:", data["body"])
else:
    print("Request failed with status code:", response.status_code)
