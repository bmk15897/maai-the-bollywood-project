from datetime import datetime
import os
from time import sleep
from flask import Flask, request, jsonify
from openai import OpenAI
from flask_cors import CORS, cross_origin
from dotenv import load_dotenv
from pymongo import MongoClient

# Load environment variables
load_dotenv()

# OpenAI API Key
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
openai_client = OpenAI(api_key=OPENAI_API_KEY)

# MongoDB Atlas Connection
MONGO_URI = os.getenv("MONGO_URI")  # Add your MongoDB URI in .env
mongo_client = MongoClient(MONGO_URI)
db = mongo_client["story_database"]
stories_collection = db["stories"]

# Flask app setup
app = Flask(__name__)
CORS(app, supports_credentials=True)


# Start conversation thread
@app.route("/start", methods=["GET"])
def start_conversation():
    print("Starting a new conversation...")
    thread = openai_client.beta.threads.create()
    print(f"New thread created with ID: {thread.id}")
    return jsonify({"thread_id": thread.id})


# Generate response
@app.route("/chat", methods=["POST"])
@cross_origin(supports_credentials=True)
def chat():
    data = request.json
    thread_id = data.get("thread_id")
    user_input = data.get("message", "")

    if not thread_id:
        return jsonify({"error": "Missing thread_id"}), 400

    print(f"Received message: {user_input} for thread ID: {thread_id}")

    modified_input = (
        "Always use the same language as my input. Keep the keys of the json english."
        "Give JSON format for the storyline. If a previous storyline exists, "
        "then update it, else create a story. Do not give anything apart from the JSON. "
        f"Details - {user_input}"
    )

    # Add the user's message to the thread
    openai_client.beta.threads.messages.create(
        thread_id=thread_id, role="user", content=modified_input
    )

    # Run the Assistant
    run = openai_client.beta.threads.runs.create(
        thread_id=thread_id, assistant_id="asst_2IEK7CP3nvoXUTPDSgZ32LTZ"
    )

    while True:
        run_status = openai_client.beta.threads.runs.retrieve(
            thread_id=thread_id, run_id=run.id
        )
        print(f"Run status: {run_status.status}")
        if run_status.status == "completed":
            break
        sleep(1)

    # Retrieve and return the latest message from the assistant
    messages = openai_client.beta.threads.messages.list(thread_id=thread_id)
    response = messages.data[0].content[0].text.value

    # # Prepare log entry
    # log_entry = {
    #     "timestamp": datetime.utcnow(),
    #     "user_input": user_input,
    #     "assistant_response": response,
    # }

    # # Update or create the story document
    # stories_collection.update_one(
    #     {"thread_id": thread_id},
    #     {"$push": {"logs": log_entry}, "$setOnInsert": {"thread_id": thread_id}},
    #     upsert=True
    # )

    print(f"Assistant response: {response}")
    return jsonify({"response": response})


# Retrieve logs for a specific thread (story ID)
@app.route("/history/<thread_id>", methods=["GET"])
def get_history(thread_id):
    try:
        story = stories_collection.find_one({"thread_id": thread_id}, {"_id": 0, "logs": 1})
        if not story:
            return jsonify({"error": "Story not found"}), 404

        return jsonify({"logs": story.get("logs", [])})
    except Exception as e:
        print(f"Error retrieving logs: {e}")
        return jsonify({"error": "Failed to retrieve logs"}), 500


# Retrieve all stories with logs
@app.route("/all", methods=["GET"])
def get_all_stories():
    try:
        all_stories = list(stories_collection.find({}, {"_id": 0}))
        return jsonify({"stories": all_stories})
    except Exception as e:
        print(f"Error retrieving all stories: {e}")
        return jsonify({"error": "Failed to retrieve stories"}), 500


if __name__ == "__main__":
    app.run(host="127.0.0.1", port=5001)
