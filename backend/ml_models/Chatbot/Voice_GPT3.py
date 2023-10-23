from speech_recognition import AudioFile, Recognizer
import sys
import json

def stt(audio: object):
    # try:
        """Converts speech to text.
        Args:
            audio: record of user speech
        Returns:
            text (str): recognized speech of user
        """
        
        # Create a Recognizer object
        r = Recognizer()
        # Open the audio file
        with AudioFile(audio) as source:
            # Listen for the data (load audio to memory)
            audio_data = r.record(source)
            # Transcribe the audio using Google's speech-to-text API
        
            text = r.recognize_google(audio_data)
        
        # desired_output = 
        # print(desired_output)
    


        response = str(text)

        output = {response}

        # output_json = json.dumps(output)
        print(response)
        # sys.stdout.flush()
        # return response

    # except ValueError as e:
    #     return str(e)  # Return the error message

if __name__ == "__main__":
    # audio_data = sys.stdin.buffer.read()
    # stt("backend/ml_models/temp_audio.wav")
    # print(result)
    # print(audio_data)
    
    # audio_data = sys.stdin.read()  # Get audio file path from command line
    audio_data = sys.argv[1]
    stt(audio_data)