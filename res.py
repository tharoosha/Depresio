import requests

# URL of your API
url = 'http://127.0.0.1:5000/classify'

# Video title you want to classify
video_title = "Eric Weinstein: Revolutionary Ideas in Science, Math, and Society | Artificial Intelligence Podcast"

# Prepare the data as a JSON payload
data = {'video_title': video_title}

# Send the POST request
response = requests.post(url, json=data)

# Check the response
if response.status_code == 200:
    # The response should contain the categories
    categories = response.json()['categories']
    print("Categories:", categories)
else:
    print("Error:", response.text)
