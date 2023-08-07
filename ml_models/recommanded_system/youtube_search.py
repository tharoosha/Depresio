import requests


def search_youtube_videos(video_types_probabilities):
    api_key = "AIzaSyAFx7r4060tZZ-wDfbKgWyZDyaV-ACw0yc"
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
