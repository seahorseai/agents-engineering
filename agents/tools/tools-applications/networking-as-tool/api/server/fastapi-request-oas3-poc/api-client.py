import requests

# Replace with your actual URL if deployed
url = "http://localhost:8000/items/"

payload = {
    "name": "Example Item",
    "price": 12.99
}

response = requests.post(url, json=payload)

print("Status Code:", response.status_code)
print("Response:", response.json())
