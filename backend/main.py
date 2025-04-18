from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import json
import os
from dotenv import load_dotenv
import httpx

load_dotenv()  # Load environment variables from .env file

app = FastAPI()

# Define allowed origins
origins = [
    "http://localhost:3000",   # for Next.js (local dev)
    "http://127.0.0.1:3000",
    "https://yourdomain.com",  # for production
]

# Add the CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,            # List of allowed origins
    allow_credentials=True,           # Allow cookies and auth headers
    allow_methods=["*"],              # Allow all HTTP methods
    allow_headers=["*"],              # Allow all headers
)

# Load dummy data
with open("../dummyData.json", "r") as f:
    DUMMY_DATA = json.load(f)

@app.get("/api/data")
def get_data():
    """
    Returns dummy data (e.g., list of users).
    """
    return DUMMY_DATA["salesReps"]

@app.post("/api/ai")
async def ai_endpoint(request: Request):
    body = await request.json()
    user_question = body.get("question", "")
    api_key = os.getenv("HF_API_KEY")
    model_id = os.getenv("HF_MODEL")

    try:
        async with httpx.AsyncClient() as client:
            response = await client.post(
                f"https://api-inference.huggingface.co/models/{model_id}",
                headers={
                    "Authorization": f"Bearer {api_key}",
                    "Content-Type": "application/json",
                },
                json={"inputs": user_question}
            )
            response.raise_for_status()
            result = response.json()
            # HF returns a list of generated text results
            return {"answer": result[0]["generated_text"]}
    except Exception as e:
        return {"answer": f"Something went wrong: {str(e)}"}



if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
