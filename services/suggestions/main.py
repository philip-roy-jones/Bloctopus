from fastapi import FastAPI
import json
import random
import uvicorn  # Import uvicorn to run the server

app = FastAPI()

#loading messages,
with open("messages.json", "r", encoding="utf-8") as f:
    messages = json.load(f)

@app.get("/api/suggestions/random")
def get_motivation():
    print("Received request for random suggestion")
    return random.choice(messages)

#Add this block to run the application,
if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=4444)