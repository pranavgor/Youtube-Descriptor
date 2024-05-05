from groq_llama import generate_summary
from fastapi import FastAPI

app = FastAPI()

@app.get("/summary/")
async def read_item(video_link: str):
    video_id = video_link[-11:]
    summary = generate_summary(video_id)
    return{
        'video_id': video_id,
        'text_summary': summary
    }


print(generate_summary('z8Otk01Xi-U'))