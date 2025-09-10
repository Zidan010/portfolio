import json
import os
import requests
from http import HTTPStatus

def handler(event, context):
    # Set CORS headers
    headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type'
    }

    # Handle preflight OPTIONS request
    if event['httpMethod'] == 'OPTIONS':
        return {
            'statusCode': HTTPStatus.OK,
            'headers': headers,
            'body': json.dumps({'message': 'CORS preflight'})
        }

    try:
        # Parse the incoming request body
        body = json.loads(event['body'])
        user_message = body.get('userMessage', '')
        resume_context = body.get('resumeContext', '')

        if not user_message:
            return {
                'statusCode': HTTPStatus.BAD_REQUEST,
                'headers': headers,
                'body': json.dumps({
                    'title': 'Error',
                    'content': 'Please enter a message.',
                    'details': ['No user message provided in request body.'],
                    'links': []
                })
            }

        # Get the API key from Netlify environment variables
        api_key = os.environ.get('GROQ_API_KEY')
        if not api_key:
            return {
                'statusCode': HTTPStatus.INTERNAL_SERVER_ERROR,
                'headers': headers,
                'body': json.dumps({
                    'title': 'Error',
                    'content': 'API key configuration error. Please contact the administrator.',
                    'details': ['GROQ_API_KEY environment variable is not set.'],
                    'links': []
                })
            }

        # System prompt for Groq API
        system_prompt = f"""
You are an AI assistant representing Sadir Ahmed Zidan, a Machine Learning Engineer. Your role is to provide accurate and professional responses about Sadir's experience, skills, projects, education, and contact information based on the provided resume data. Respond in a friendly, professional tone, and ensure answers are concise and relevant to the user's query. If the query is unrelated to the resume, provide a general helpful response and gently steer the conversation back to Sadir's background if appropriate.

**Response Format**: Always return your response in JSON format with the following structure:
{{
  "title": "Response title or category (e.g., Skills, Experience, Projects)",
  "content": "Main response text",
  "details": ["Optional list of bullet points for additional details"],
  "links": [{{"text": "Link text", "url": "Link URL"}}]
}}

Here is the resume data:

{resume_context}

Now, respond to the user's query: "{user_message}"
        """

        # Make the request to Groq API
        try:
            response = requests.post(
                'https://api.groq.com/openai/v1/chat/completions',
                headers={
                    'Content-Type': 'application/json',
                    'Authorization': f'Bearer {api_key}'
                },
                json={
                    'model': 'llama3-70b-8192',
                    'messages': [
                        {'role': 'system', 'content': system_prompt},
                        {'role': 'user', 'content': user_message}
                    ],
                    'max_tokens': 500,
                    'temperature': 0.7
                },
                timeout=10
            )
        except requests.exceptions.RequestException as req_error:
            return {
                'statusCode': HTTPStatus.INTERNAL_SERVER_ERROR,
                'headers': headers,
                'body': json.dumps({
                    'title': 'Error',
                    'content': 'Failed to connect to the Groq API.',
                    'details': [f'Request error: {str(req_error)}'],
                    'links': []
                })
            }

        if response.status_code != 200:
            return {
                'statusCode': HTTPStatus.INTERNAL_SERVER_ERROR,
                'headers': headers,
                'body': json.dumps({
                    'title': 'Error',
                    'content': f'HTTP error from Groq API! status: {response.status_code}',
                    'details': [f'Response text: {response.text[:200]}'],
                    'links': []
                })
            }

        try:
            data = response.json()
            raw_content = data['choices'][0]['message']['content'].strip()
        except (KeyError, IndexError) as parse_error:
            return {
                'statusCode': HTTPStatus.INTERNAL_SERVER_ERROR,
                'headers': headers,
                'body': json.dumps({
                    'title': 'Error',
                    'content': 'Failed to parse Groq API response.',
                    'details': [f'Parse error: {str(parse_error)}', f'Response: {response.text[:200]}'],
                    'links': []
                })
            }

        # Parse the response as JSON
        try:
            structured_response = json.loads(raw_content)
            return {
                'statusCode': HTTPStatus.OK,
                'headers': headers,
                'body': json.dumps(structured_response)
            }
        except json.JSONDecodeError as parse_error:
            return {
                'statusCode': HTTPStatus.INTERNAL_SERVER_ERROR,
                'headers': headers,
                'body': json.dumps({
                    'title': 'Error',
                    'content': 'Sorry, I couldn\'t process the response properly. Please try again or ask about Sadir\'s experience, skills, or projects!',
                    'details': [f'JSON decode error: {str(parse_error)}', f'Raw content: {raw_content[:200]}'],
                    'links': []
                })
            }

    except Exception as error:
        return {
            'statusCode': HTTPStatus.INTERNAL_SERVER_ERROR,
            'headers': headers,
            'body': json.dumps({
                'title': 'Error',
                'content': 'Sorry, I encountered an issue while processing your request. Please try again or ask about Sadir\'s experience, skills, or projects!',
                'details': [f'Unexpected error: {str(error)}'],
                'links': []
            })
        }