# import requests


# def search_youtube_videos(video_types_probabilities):
#     api_key = "AIzaSyAFx7r4060tZZ-wDfbKgWyZDyaV-ACw0yc"
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
API_KEY = "AIzaSyC9SwCqNCpLxlQot1NE9ktEL-8lBMIyKNg"


def search_youtube_videos(video_types_probabilities):
    api_key = "AIzaSyC9SwCqNCpLxlQot1NE9ktEL-8lBMIyKNg"
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
            link = f"https://www.youtube.com/watch?v={video_id}"
            video_links.append(link)

    return video_links


categories = ["Travel & Events", "Gaming", "Comedy", "Horror", "Drama"]
videos = get_youtube_videos_from_preferences(API_KEY, categories)
for video in videos:
    print(video)
