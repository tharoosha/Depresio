// import React, { useState, useEffect } from "react";
// import Header from "../components/Header";
// import Footer from "../components/Footer";
// import "../styles/YT_RecommendationView.scss";
// import { Link } from "react-router-dom";
// import keys from "./Keys";

// async function get_youtube_videos_from_preferences(
//   api_key,
//   categories,
//   max_results = 5
// ) {
//   const base_url = "https://www.googleapis.com/youtube/v3/search";
//   const video_ids = [];

//   for (const category of categories) {
//     const params = new URLSearchParams({
//       part: "snippet",
//       q: category,
//       type: "video",
//       maxResults: max_results,
//       key: api_key,
//     });

//     const response = await fetch(`${base_url}?${params.toString()}`);
//     const data = await response.json();

//     if (!("items" in data)) {
//       console.log(
//         `Error fetching videos for category '${category}': ${
//           data.error ? data.error.message : "Unknown error"
//         }`
//       );
//       continue;
//     }

//     for (const item of data["items"]) {
//       const video_id = item["id"]["videoId"];
//       video_ids.push(video_id);
//     }
//   }

//   return video_ids;
// }

// const YT_RecommendationView = () => {
//   const [videoIds, setVideoIds] = useState([]);
//   const [isReviewDialogVisible, setIsReviewDialogVisible] = useState(false);
//   const [rating, setRating] = useState(0);

//   const apiKey = keys.YOUTUBE_API_KEY;
//   const storedData = localStorage.getItem("selectedCategories");

//   // useEffect(() => {
//   //   get_youtube_videos_from_preferences(apiKey, storedData).then((data) => {
//   //     setVideoIds(data);
//   //   });
//   // }, [storedData, apiKey]);

//   const handleRating = (selectedRating) => {
//     setRating(selectedRating);
//     console.log(selectedRating);
//   };

//   return (
//     <>
//       <Header />
//       <div className="AI mt--24 mb--48">
//         <div className="container">
//           <div className="AI__wrapper">
//             <div className=" AI__wrapper__inner__2">
//               <div className="AI__wrapper__inner__2__header">
//                 <p>Videos recommended for you based on your preferences.</p>
//               </div>

//               <div className="container">
//                 <div className="yt-container">
//                   {videoIds.map((videoId) => (
//                     <div className="yt-recommendation-item" key={videoId}>
//                       <iframe
//                         width="560"
//                         height="315"
//                         src={`https://www.youtube.com/embed/${videoId}`}
//                         title={`YouTube video player for ${videoId}`}
//                         allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//                         allowFullScreen
//                       ></iframe>
//                     </div>
//                   ))}
//                 </div>
//                 <div className="button-container">
//                   <Link to="/preferences">Preferences</Link>
//                 </div>
//               </div>
//               {isReviewDialogVisible && (
//                 <div className="review-dialog">
//                   <div className="review-dialog-content">
//                     <h2>Rate the Recommendations</h2>
//                     {[...Array(5)].map((star, index) => {
//                       return (
//                         <span
//                           key={index}
//                           className={`star ${index < rating ? "filled" : ""}`} // Add filled class based on rating
//                           onClick={() => {
//                             handleRating(index + 1);
//                           }}
//                         >
//                           {index < rating ? "★" : "☆"}{" "}
//                           {/* Change the star symbol based on rating */}
//                         </span>
//                       );
//                     })}
//                     <button onClick={() => setIsReviewDialogVisible(false)}>
//                       Close
//                     </button>
//                   </div>
//                 </div>
//               )}

//               <div className="popup-inner__button">
//                 <button onClick={() => setIsReviewDialogVisible(true)}>
//                   Rate Videos
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       <Footer />
//     </>
//   );
// };

// export default YT_RecommendationView;

// YT_RecommendationView.js
import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/YT_RecommendationView.scss";
import { Link } from "react-router-dom";

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
      key: "AIzaSyDBZvJ8PM_LySjL8I_Mjqp78TUUrJUqJIE",
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
  const [isReviewDialogVisible, setIsReviewDialogVisible] = useState(false);
  const [rating, setRating] = useState(0);

  const apiKey = 'AIzaSyDBZvJ8PM_LySjL8I_Mjqp78TUUrJUqJIE'
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
                <div className="popup-inner__button"></div>
                <div className="button-container">
                  <Link to="/preferences">Select Your New Preferences</Link>
                </div>
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
