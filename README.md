# YouTube-Descriptor
YTD is a browser extension that can extract information from youtube videos and provide users with a short summary. Powered by keyword LLM, our application will help users by providing short descriptions for their youtube videos. This application is intended for all youtube users from students to the elderly, helping them save time and effort on finding the content of their choice.

## Backend Setup

1) Setup Python Environment
`source backend/groq/bin/activate`

2) Load Keys
`source .env`

3) Run FastAPI
`fastapi dev backend/entry.py`

## Frontend Setup

1) Go to chrome://extensions/.
2) At the top right, turn on Developer mode.
3) Click Load unpacked.
4) Find and select the ’frontend’ folder which contains the manifest.json file.
5) Open a youtube video in a new tab and click on the extension.
6) Click on "Summarize Video" with the server running to generate a summary for the youtube video