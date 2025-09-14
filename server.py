from flask import Flask, request, jsonify
from dotenv import load_dotenv
import os
import requests

load_dotenv()
app = Flask(__name__)

GROQ_API_KEY = os.getenv('GROQ_API_KEY')

@app.route('/api/groq', methods=['POST'])
def groq_proxy():
    payload = request.get_json()
    headers = {
        'Content-Type': 'application/json',
        'Authorization': f'Bearer {GROQ_API_KEY}'
    }
    response = requests.post(
        'https://api.groq.com/openai/v1/chat/completions',
        headers=headers,
        json=payload
    )
    return jsonify(response.json()), response.status_code

if __name__ == '__main__':
    app.run(port=3000)