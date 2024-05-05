from youtube_transcript_api import YouTubeTranscriptApi
import logging

logger = logging.getLogger(__name__)
logging.basicConfig(level = logging.INFO)

def get_cc(video_id):

    logger.info('Preparing trancripts')

    transcript_list = YouTubeTranscriptApi.list_transcripts(video_id)

    try:
        transcript = transcript_list.find_transcript(['en'])
    except:
        print('Could not find trancripts')

    text_cc = ''
    cc_list = transcript.fetch()
    for cc in cc_list:
        text_cc += (cc['text'])
    
    logger.info('Finished Processing Transcripts')

    return text_cc
    

