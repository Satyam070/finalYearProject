from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI
from pydantic import BaseModel
from googletrans import Translator



# Initialize FastAPI app and Translator
app = FastAPI()
translator = Translator()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins or replace with specific origins (e.g., ["http://localhost:3000"])
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods (GET, POST, etc.)
    allow_headers=["*"],  # Allows all headers
)

# Pydantic model for translation request
class TranslationRequest(BaseModel):
    text: str
    src_lang: str
    dest_lang: str

# Translation endpoint
@app.post("/translate/")
async def translate(request: TranslationRequest):
    translated = translator.translate(request.text, src=request.src_lang, dest=request.dest_lang)
    return {"translated": translated.text}

