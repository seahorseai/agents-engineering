#!/bin/bash

echo "🚀 Starting setup..."

# Optional: create a virtual environment
python3 -m venv venv
source venv/bin/activate

echo "📄 Installing dependencies from requirements.txt..."
pip install --upgrade pip
pip install -r requirements.txt

echo "🧠 Downloading spaCy English language model..."
python -m spacy download en_core_web_sm

echo "✅ Setup complete! You can now run your scraper."

##### for runing this command
##### chmod +x script.sh
##### ./script.sh