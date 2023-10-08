import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/YT_RecommendationView.scss";
import { Link } from "react-router-dom";
import keys from "./Keys";



const YT_RecommendationView = () => {
  const [videoIds, setVideoIds] = useState([]);
  const apiKey = keys.YOUTUBE_API_KEY;

  const storedData2 = [
    "Travel & Events",
    "Gaming",
    "Comedy",
    "Horror",
    "Drama",
  ];

 

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
