import os
import logging
from groq import Groq
from dotenv import load_dotenv
from process_cc import get_cc


logger = logging.getLogger(__name__)
logging.basicConfig(level = logging.INFO)


def generate_summary(video_id):

    # Load keys
    load_dotenv()

    client = Groq(api_key=os.getenv('GROQ_API_KEY'))

    text_cc = get_cc(video_id)

    logger.info('Generating Summary')

    completion = client.chat.completions.create(
        model="llama3-70b-8192",
        messages=[
            {
                "role": "user",
                "content": f"Summarize the text in 500 words - {text_cc}" 

            },
        ],
        temperature=1,
        max_tokens=1060,
        top_p=1,
        stream=True,
        stop=None,
    )

    summary = ''
    for chunk in completion:
        # logger.info(chunk.choices[0].delta.content or "")
        summary += chunk.choices[0].delta.content or ""
    
    return summary
