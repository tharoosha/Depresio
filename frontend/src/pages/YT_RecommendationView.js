import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/YT_RecommendationView.scss";
import { Link } from "react-router-dom";
import axios from "axios";
// get_youtube_videos_from_preferences

/** POST: http://localhost:5001/api/youtube_list */
/** 
 * @param : {
  "categories" : ["Gaming"],
}
*/

const YT_RecommendationView = () => {
  const [videoIds, setVideoIds] = useState([]);
  const [isReviewDialogVisible, setIsReviewDialogVisible] = useState(false);
  const [rating, setRating] = useState(0);

  const storedData = localStorage.getItem("selectedCategories");

  const handleRating = (selectedRating) => {
    setRating(selectedRating);
    console.log(selectedRating);
  };

  useEffect(() => {
    if (isReviewDialogVisible) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, [isReviewDialogVisible]);

  useEffect(() => {
    localStorage.setItem("rating", rating);
  }, [rating]);

  useEffect(() => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: storedData,
    };
    axios
      .post("http://localhost:5001/api/youtube_list", storedData)
      .then((response) => {
        console.log(response.data);
        setVideoIds(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [storedData]);

  // Convert the list to a JSON array
  // json_array = json.dumps(videoIds)
  // const videoUrls = JSON.parse(videoIds);
  console.log("Loaded Ids ", typeof videoIds);

  return (
    <>
      <Header />
      <div className="AI mt--24 mb--48">
        <div className="container">
          <div className="AI__wrapper">
            <div className=" AI__wrapper__inner__2">
              <div className="AI__wrapper__inner__2__header">
                <p>Videos recommended for you based on your preferences.</p>
              </div>

              <div className="container">
                <div className="yt-container">
                  {videoIds.map((videoId) => {
                    return (
                      <div className="yt-recommendation-item">
                        <iframe
                          width="560"
                          height="315"
                          src={`https://www.youtube.com/embed/${videoId}`}
                          title={`YouTube video player for ${videoId}`}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        ></iframe>
                        <div className="button-container">
                          <button
                            style={{
                              backgroundColor: "transparent",
                              color: "white",
                              border: "none",
                              cursor: "pointer",
                              fontSize: "20px",
                            }}
                            onClick={() => setIsReviewDialogVisible(true)}
                          >
                            Rate Videos
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="popup-inner__button"></div>
                <div className="button-container">
                  <Link to="/preferences">Select Your New Preferences</Link>
                </div>
              </div>

              {isReviewDialogVisible && (
                <div className="review-dialog">
                  <div className="review-dialog-content">
                    <button
                      className="close-button"
                      onClick={() => setIsReviewDialogVisible(false)}
                    >
                      X
                    </button>
                    <h2
                      style={{
                        textAlign: "center",
                        color: "black",
                      }}
                    >
                      Rate the Recommendations
                    </h2>
                    {[...Array(5)].map((star, index) => {
                      return (
                        <span
                          key={index}
                          className={`star ${index < rating ? "filled" : ""}`}
                          onClick={() => {
                            handleRating(index + 1);
                          }}
                        >
                          {index < rating ? "★" : "☆"}
                        </span>
                      );
                    })}
                    <button onClick={() => setIsReviewDialogVisible(false)}>
                      Close
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default YT_RecommendationView;
