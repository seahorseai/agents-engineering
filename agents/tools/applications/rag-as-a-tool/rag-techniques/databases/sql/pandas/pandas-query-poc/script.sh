#!/bin/bash

echo "🚀 Starting setup..."

# Optional: create a virtual environment
py -m venv env
source env/bin/activate

echo "📄 Installing dependencies from requirements.txt..."
pip install --upgrade pip
pip install -r requirements.txt

echo "✅ Setup complete! You can now run your scraper."

##### for runing this command
##### chmod +x script.sh
##### ./script.sh