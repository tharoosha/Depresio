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
import os
from dotenv import load_dotenv

load_dotenv()


def search_youtube_videos(video_types_probabilities):
    # api_key = os.getenv("YOUTUBE_API_KEY")
    api_key = "AIzaSyBLplcZSVmjupMn-6drtByHPuFFuQui4MI"

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


def get_youtube_videos_from_preferences(api_key, categories, max_results=5):
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
            # link = f"https://www.youtube.com/watch?v={video_id}"
            link = f"{video_id}"
            video_links.append(link)

    return video_links

# def youtube_lists(input):
def youtube_lists(input):
    try:
        # Parse the JSON data
        api_key = "AIzaSyBLplcZSVmjupMn-6drtByHPuFFuQui4MI"

        category_list = input["categories"]
        # print(category_list)
        # print(category_list)
        # categories = ["Gaming"]

        videos = get_youtube_videos_from_preferences(api_key, category_list)
        # videos = ["FLDAuYJy4Tw", "XGdYhRxHNAQ", "MhZhezlx8ZU", "BejOWDwJYYM", "lg-oBTPvlgU"]

        # videos = get_youtube_videos_from_preferences(API_KEY, categories)
        # print(videos)
        # # for video in videos:
        # #     print(video)

        output = {"result": videos}
        # # output = {"result": ["lTxn2BuqyzU", "MU0HhH4dIHs", "i5gbWhRW_ZA", "FUqttxtk8y0", "8PD-Smkxsj0", "nqf8-vB_PWE", "TQgWzalijAw", "JbHk0ZjYM04", "GkIA4ldWRis", "puy5WYx1Wok", "DwuJeGYlYyw", "4GvI7M8PyKs", "n_NfxUQCoXE", "Fjp2TdlTTIU", "SCyFBeIgaDc"]}

        output_json = json.dumps(output)
        # # sys.stdout.flush()
        # # print(result)
        print(output_json)
        # json_string = json.dumps(videos)
        # json_string = json.dumps(videos)
        # print(json_string)

        # videos = videos.split(',')
        # print(videos)
        # return videos
    
    except Exception as e:
        error_message = str(e)
        output = {"error2011": error_message}

        output_json = json.dumps(output)
        print(output_json)
        sys.stdout.flush()

if __name__ == '__main__':
    # json list looks like '["Gaming"]'
    input = sys.argv[1]
    # data = json.loads(input)
    # youtube_lists(input)
    input = {"categories" : [input]}
    # input = ["Film & Animation","Music","Shows"]
    youtube_lists(input)
    # print(input)
    # print(input)



    
    
