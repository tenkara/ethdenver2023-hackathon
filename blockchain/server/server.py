from os import environ as env
from flask import Flask, jsonify, request
from os import environ as env
from dotenv import load_dotenv, find_dotenv
from flask_cors import CORS, cross_origin
from jose import jwt
from flask_sqlalchemy import SQLAlchemy
from authlib.integrations.flask_oauth2 import ResourceProtector
from middleware.validator import Auth0JWTBearerTokenValidator
import openai
import pandas as pd
import numpy as np
from openai.embeddings_utils import get_embedding, cosine_similarity
from redis_search import search
import redis
from web3 import Web3
import json

# Load Environment Variables
ENV_FILE = find_dotenv()
if ENV_FILE:
    load_dotenv(ENV_FILE)

REDIS_HOST = env.get("REDIS_HOST")
REDIS_PORT = env.get("REDIS_PORT")
REDIS_PASSWORD = env.get("REDIS_PASSWORD")
AUTH0_DOMAIN = env.get("AUTH0_DOMAIN")
API_IDENTIFIER = env.get("API_IDENTIFIER")
ALGORITHMS = ["RS256"]
openai.api_key = env.get("OPENAI_API_KEY")

# Create Application
app = Flask(__name__)
cors = CORS(app, resources={r"/*": {"origins": "*"}})

redis_client = redis.Redis(
    host=REDIS_HOST,
    port=REDIS_PORT,
    password=REDIS_PASSWORD
)

# Middleware
require_auth = ResourceProtector()
validator = Auth0JWTBearerTokenValidator(
    AUTH0_DOMAIN,
    API_IDENTIFIER
)
require_auth.register_token_validator(validator)

# embedding model parameters for second gen models (text-embedding-ada-002) recommended by OpenAI
# second gen best model at the moment
embedding_model = "text-embedding-ada-002"
embedding_encoding = "cl100k_base"  # latest tokenizer for second gen models
max_tokens = 8000  # max tokens for second gen models and tokenizer above is 8191

# initilaize web3
w3 = Web3(Web3.HTTPProvider(env.get("ALCHEMY_URL")));

# Connect to the blockchain
if(w3.isConnected()):
    print("Connected to the blockchain")   
else:
    print("Not connected to the blockchain")

# Get the contract instance
with open('EHRBasic.json') as json_file:
    abi = json.load(json_file)
    contract_instance = w3.eth.contract(address=env.get('PATIENT_CONTRACT_ADDRESS'), abi=abi)
    print(f"Contract instance: {contract_instance}")

# Retrieve EHR
account_1 = os.getenv('ACCOUNT_ADDRESS_1')
patient_summary = contract_instance.functions.getPatientSummary().call({"from": account_1})

# Decode the EHR - remove the null bytes and decode the utf-8
decoded_summary = [b.decode("utf-8").strip('\x00') for b in patient_summary]

print(f"Decoded Patient Summary: {decoded_summary}")

# Routes

@app.route("/")
def index():
    return jsonify(message="Hello from SmartHealth!")


@app.route("/public")
def public():
    """No access token required to access this route
    """
    response = "Hello from a public endpoint! You don't need to be authenticated to see this."
    return jsonify(message=response)


@app.route("/private")
@cross_origin(headers=["Content-Type", "Authorization"])
@require_auth(None)
def private():
    """A valid access token is required to access this route
    """
    response = "Hello from a private endpoint! You need to be authenticated to see this."
    return jsonify(message=response)

@app.route("/authorize", methods=["GET", "POST"])
def authorize():
    if request.method == "POST":
        # Get the messages from the post body in json format
        address_1 = request.get_json()["token"]
        
        # initilaize web3
        w3 = Web3(Web3.HTTPProvider(env.get("ALCHEMY_URL")));

        # Connect to the blockchain
        if(w3.isConnected()):
            print("Connected to the blockchain")   
        else:
            print("Not connected to the blockchain")
            return jsonify({"message": "Not connected to the blockchain"})

        # Retrieve the smart contract instance
        try:
            with open('EHRBasic.json') as json_file:
                abi = json.load(json_file)
                contract_instance = w3.eth.contract(address=env.get('PATIENT_CONTRACT_ADDRESS'), abi=abi)
                print(f"Contract instance: {contract_instance}")
        except:
            return jsonify({"message": "Unable to retrieve contract instance"})

        # Retrieve EHR
        try:
            if account_1:
                patient_summary = contract_instance.functions.getPatientSummary().call({"from": account_1})
            else:
                account_1 = env.get('ACCOUNT_ADDRESS_1')
                patient_summary = contract_instance.functions.getPatientSummary().call({"from": account_1})
        except:
            return jsonify({"message": "Not authorized, unable to retrieve EHR"})
        
        # Decode the EHR - remove the null bytes and decode the utf-8
        decoded_summary = [b.decode("utf-8").strip('\x00') for b in patient_summary]

        print(f"Decoded Patient Summary: {decoded_summary}")

        return jsonify({ "message": "Authorized successfully"})

    else:
        return jsonify({
        "message": "Authorize unsuccessful. Please check your accounts and try again."
    })

@app.route("/chat", methods=["GET", "POST"])
@cross_origin(headers=["Content-Type", "Authorization"])
@require_auth(None)
def chat():
    if request.method == "POST":
        # Get the messages from the post body in json format
        messages = request.get_json()["messages"]

        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[{"role": "system", "content": "I am a digital health bot who is able to help diagnose symptoms, how can I help you?"}, *messages],
        )

        # prompt engineering...
        search_message = ''
        for message in messages:
            if (message['role'] == 'user'):
                search_message =  message['content'] + ' ' + search_message
 
        # Call the openai api to get the response
        urls = search(redis_client, search_message, k=1)[0]
        url = urls.__dict__["url"]
        if float(urls.__dict__["vector_score"]) > .2:
            url = None

        return jsonify({
            "data":
                {
                    "id": 1,
                    "role": "system",
                    "content": response.choices[0].message.content,
                    "url": url
                }
        })
    return jsonify({
        "data": [
            {   
                "id": 1,
                "sender": "user",
                "content": "Hello, how are you?"
            },
        ]
    })

@app.route("/sp/chat", methods=["GET", "POST"])
@cross_origin(headers=["Content-Type", "Authorization"])
@require_auth(None)
def spchat():
    if request.method == "POST":
        # Get the messages from the post body in json format
        messages = request.get_json()["messages"]
        
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[{"role": "system", "content": "I are a spanish digital health bot who is able to help diagnose symptoms, how can I help you?"}, *messages],
        )
        return jsonify({
            "data": {   
                    "id": 1,
                    "role": "system",
                    "content": response.choices[0].message.content
                }
        })

    return jsonify({
        "data": [
            {   
                "id": 1,
                "sender": "user",
                "content": "Hello, how are you?"
            },
        ]
    })


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=env.get("PORT", 3010))