import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/YT_RecommendationView.scss";
import { Link } from "react-router-dom";
import keys from "./Keys";

async function get_youtube_videos_from_preferences(
  api_key,
  categories,
  max_results = 5
) {
  const base_url = "https://www.googleapis.com/youtube/v3/search";
  const video_ids = [];

  for (const category of categories) {
    const params = new URLSearchParams({
      part: "snippet",
      q: category,
      type: "video",
      maxResults: max_results,
      key: api_key,
    });

    const response = await fetch(`${base_url}?${params.toString()}`);
    const data = await response.json();

    if (!("items" in data)) {
      console.log(
        `Error fetching videos for category '${category}': ${
          data.error ? data.error.message : "Unknown error"
        }`
      );
      continue;
    }

    for (const item of data["items"]) {
      const video_id = item["id"]["videoId"];
      video_ids.push(video_id);
    }
  }

  return video_ids;
}

const YT_RecommendationView = () => {
  const [videoIds, setVideoIds] = useState([]);
  const apiKey = keys.YOUTUBE_API_KEY;
  const storedData = localStorage.getItem("selectedCategories");

  useEffect(() => {
    get_youtube_videos_from_preferences(apiKey, storedData).then((data) => {
      setVideoIds(data);
    });
  }, [storedData, apiKey]); 

  return (
    <>
      <Header />
      <div className="container">
        <div className="yt-container">
          {videoIds.map((videoId) => (
            <div className="yt-recommendation-item" key={videoId}>
              <iframe
                width="560"
                height="315"
                src={`https://www.youtube.com/embed/${videoId}`}
                title={`YouTube video player for ${videoId}`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          ))}
        </div>
        <div className="button-container">
          <Link to="/preferences">Preferences</Link>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default YT_RecommendationView;
