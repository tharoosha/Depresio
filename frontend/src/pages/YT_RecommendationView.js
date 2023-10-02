import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/YT_RecommendationView.scss";
import { Link } from "react-router-dom";

const YT_RecommendationView = () => {
  const videoIds = [];

  const storedData = localStorage.getItem("selectedCategories");

  console.log(storedData);

  return (
    <>
      <Header />
      <div className="container">
        <div className="yt-container">
          {videoIds.map((videoId, index) => (
            <div className="yt-recommendation-item" key={index}>
              <iframe
                width="560"
                height="315"
                src={`https://www.youtube.com/embed/${videoId}`}
                title={`YouTube video player ${index}`}
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowfullscreen
              ></iframe>
            </div>
          ))}
        </div>
      </div>
      <div
        style={{
          margin: "30px",
        }}
        className="button-container"
      >
        <Link to="/preferences">Preferences</Link>
      </div>

      <Footer />
    </>
  );
};

export default YT_RecommendationView;
