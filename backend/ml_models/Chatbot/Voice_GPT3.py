import openai
import pyttsx3
import speech_recognition as sr
import time 

# Set you OpenAI API Key 
openai.api_key = "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"

#Initialize the text-to-speech engine
engine = pyttsx3.init('dummy') 

def transcribe_audio_to_text(filename):
    recognizer  = sr.Recognizer()
    with sr.AudioFile(filename) as source:
        audio = recognizer.record(source)
    try:
        return recognizer.recognize_google(audio)
    except:
        print("Skipping unknown error")

# def generate_response(prompt):
#     response = openai.Completion.create(
#         engine='text-davinci-003',
#         prompt=prompt,
#         max_tokens = 4000,
#         n = 1,
#         stop= None,
#         temperature= 0.5,
#     )
#     return response["choices"][0]['text']

def speak_text(text):
    engine.say(text)
    engine.runAndWait()

def main():
    while True:
        # wait for user to say "genius"
        print("say Genius to start recording your question...")
        with sr.Microphone() as source:
            recognizer = sr.Recognizer()
        #     audio = recognizer.listen(source)
        #     try:
        #         transcription = recognizer.recognize_google(audio)
        #         if transcription.lower() == "genius":
        #             # Record audio
        #             # filename = "Input.wav"
        #             print("Say you question...")
        #             with sr.Microphone() as source:
        #                 recognizer = sr.Recognizer()
        #                 source.pause_threshold = 1
        #                 audio = recognizer.listen(source, phrase_time_limit=None, timeout=None)
        #                 # with open(filename, 'wb') as f:
        #                     # f.write(audio.get_wav_data())
                    
        #             # Transcribe audio to text
        #             # text = transcribe_audio_to_text(filename)
        #             text = recognizer.recognize_google(audio)
        #             if text:
        #                 print(f"You said: {text}")

        #                 # generate response using GPT_3
        #                 response = generate_response(text)
        #                 print(f"GPT-3 say: {response}")

        #                 # Read response using text-to-speech
        #                 # speak_text(response)
        #                 engine.say(response)
        #                 engine.runAndWait()
        #     except Exception as e:
        #         print("An error occurred: {}".format(e))

if __name__ == "__main__":
    main()