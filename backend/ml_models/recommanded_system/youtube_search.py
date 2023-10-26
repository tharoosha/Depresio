# import requests


# def search_youtube_videos(video_types_probabilities):
#     api_key = "AIzaSyCoFVk0LXFuTN5Zs0OfL6-gzQVgpaSM6lc"
#     max_videos = sum(video_types_probabilities.values())
#     videos_info = []

#     for video_type, count in video_types_probabilities.items():
#         url = f"https://www.googleapis.com/youtube/v3/search?part=snippet&q={video_type}&type=video&key={api_key}"
#         response = requests.get(url)
#         data = response.json()

#         if "items" not in data:
#             print(
#                 f"Error: No 'items' key found in the API response for video type '{video_type}'.")
#             continue

#         items = data["items"][:count]

#         for item in items:
#             video_id = item["id"]["videoId"]
#             video_title = item["snippet"]["title"]
#             video_link = f"https://www.youtube.com/watch?v={video_id}"
#             videos_info.append({"video_id": video_id, "video_title": video_title,
#                                "video_type": video_type, "video_link": video_link})

#     import random
#     random.shuffle(videos_info)

#     return videos_info[:max_videos]


# import requests


# def search_youtube_videos(video_types_probabilities):
#     api_key = "AIzaSyCoFVk0LXFuTN5Zs0OfL6-gzQVgpaSM6lc"
#     max_videos = sum(video_types_probabilities.values())
#     videos_info = []

#     for video_type, count in video_types_probabilities.items():
#         url = f"https://www.googleapis.com/youtube/v3/search?part=snippet&q={video_type}&type=video&key={api_key}"
#         response = requests.get(url)
#         data = response.json()

#         if "items" not in data:
#             print(
#                 f"Error: No 'items' key found in the API response for video type '{video_type}'.")
#             continue

#         items = data["items"][:count]

#         for item in items:
#             video_id = item["id"]["videoId"]
#             video_title = item["snippet"]["title"]
#             video_link = f"https://www.youtube.com/watch?v={video_id}"
#             videos_info.append({"video_id": video_id, "video_title": video_title,
#                                "video_type": video_type, "video_link": video_link})

#     import random
#     random.shuffle(videos_info)

#     return videos_info[:max_videos]


import requests
from urllib.parse import quote_plus
import random
import sys
import json
API_KEY = "AIzaSyCoFVk0LXFuTN5Zs0OfL6-gzQVgpaSM6lc"


def search_youtube_videos(video_types_probabilities):
    api_key = "AIzaSyCoFVk0LXFuTN5Zs0OfL6-gzQVgpaSM6lc"
    max_videos = sum(video_types_probabilities.values())
    videos_info = []

    for video_type, count in video_types_probabilities.items():
        url = f"https://www.googleapis.com/youtube/v3/search?part=snippet&q={video_type}&type=video&key={api_key}"
        response = requests.get(url)
        data = response.json()

        if "items" not in data:
            print(
                f"Error: No 'items' key found in the API response for video type '{video_type}'.")
            continue

        items = data["items"][:count]

        for item in items:
            video_id = item["id"]["videoId"]
            video_title = item["snippet"]["title"]
            video_link = f"https://www.youtube.com/watch?v={video_id}"
            videos_info.append({"video_id": video_id, "video_title": video_title,
                               "video_type": video_type, "video_link": video_link})

    import random
    random.shuffle(videos_info)

    return videos_info[:max_videos]


def get_youtube_videos_from_preferences(api_key, categories, max_results=3):
    base_url = "https://www.googleapis.com/youtube/v3/search"
    video_links = []

    for category in categories:
        params = {
            'part': 'snippet',
            'q': category,
            'type': 'video',
            'maxResults': max_results,
            'key': api_key
        }

        response = requests.get(base_url, params=params)
        data = response.json()

        if 'items' not in data:
            print(f"Error fetching videos for category '{category}':")
            continue

        for item in data['items']:
            video_id = item['id']['videoId']
            link = f"https://www.youtube.com/watch?v={video_id}"
            video_links.append(link)

    return video_links

def youtube_lists(input):
    try:
        # Parse the JSON data
        normal_list = json.loads(input)

        categories = ["Gaming"]
        videos = get_youtube_videos_from_preferences(API_KEY, normal_list)
        # for video in videos:
        #     print(video)

        json_string = json.dumps(videos)

        print(json_string)
        return json_string
    
    except:
        error_message = str(e)
        output = {"error2011": error_message}

        output_json = json.dumps(output)
        print(output_json)
        sys.stdout.flush()

if __name__ == '__main__':
    # json list looks like '["Gaming"]'
    input = sys.argv[1]

    youtube_lists(input)

    
    
