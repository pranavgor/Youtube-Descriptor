summarize = document.getElementById('Summarize');
const BACKEND_API_URL = 'http://127.0.0.1:8000/summary';

if(summarize){
    function summarizeVideo(url) {
        // Make a GET request to the backend API with the video URL as a parameter
        fetch(`${BACKEND_API_URL}?video_link=${url}`)
            .then(response => response.json())
            .then(summary => {
                console.log(summary);
                // Send a message to the content script with the summary
                
                chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
                    console.log(tabs);
                    // chrome.tabs.sendMessage(tabs[0].id, { action: "Summary Ready", summary });
                    chrome.tabs.sendMessage(tabs[0].id, {"video_url": url, action:"Summary Ready", summary: summary.text_summary}); 
                    // chrome.runtime.sendMessage({ action: "Summary Ready", summary });
                });
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }

    // Call the summarizeVideo function when the SummaryButton is clicked
    summarize.onclick = e => {

        chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
            let url = tabs[0].url.split("&")[0];
            var expression = /https?:\/\/(www\.)?youtube.com\/watch\b([v?=].*)/g
            var regex = new RegExp(expression);

            if (!url.match(regex))
                return;

            chrome.tabs.sendMessage(tabs[0].id, { action: "Loading Summary" });

            summarizeVideo(url);
        });
    };
};
