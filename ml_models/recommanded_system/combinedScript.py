import mood_TO_video
import youtube_search
import sys
import json

def combined_script(input_mood):
    try:
    # Call the function from mood_TO_video.py to get the output JSON
    # output_json = train_and_predict_video_types(input_mood)

    # # Parse the JSON string to get the JSON object
    # video_type_probabilities_dict = json.loads(output_json)

    # # Call the function from youtube_search.py with the JSON object
    # youtube_result = search_youtube_videos(video_type_probabilities_dict)

    # # Return the result from youtube_search.py as a JSON string
    # return json.dumps(youtube_result)

        vidoe_types = mood_TO_video.train_and_predict_video_types(input_mood)
        result = youtube_search.search_youtube_videos(vidoe_types)
        result = json.dumps(result)
        # response = str(result)
        output = {"result": result}

        output_json = json.dumps(output)
        sys.stdout.flush()
        print(result)
    except:
        error_message = str(e)
        output = {"error2011": error_message}

        output_json = json.dumps(output)
        # print(output_json)
        sys.stdout.flush()
        return(output_json)
    
if __name__ == '__main__':
    # Check if there is at least one command-line argument (excluding the script name)
    if len(sys.argv) > 1:
        # The first command-line argument (sys.argv[1]) will be the input_mood
        # input_mood = sys.argv[1]

        # Call the function with the received input_mood
        # combined_script(input_mood)
        combined_script("Happiness")
        
    else:
        # If no input_mood is provided, handle the case accordingly
        print(json.dumps({"error": "No mood provided"}))
        sys.stdout.flush()
    # combined_script('Happiness')
