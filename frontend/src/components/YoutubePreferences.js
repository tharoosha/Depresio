import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import keys from "../pages/Keys";

function YoutubePreferences() {
  const [categoriesName, setCategoriesName] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);

  const YOUTUBE_API_KEY = keys.YOUTUBE_API_KEY;
  const YOUTUBE_CATEGORIES_URL = `https://www.googleapis.com/youtube/v3/videoCategories?part=snippet&regionCode=US&key=${YOUTUBE_API_KEY}`;

  useEffect(() => {
    axios
      .get(YOUTUBE_CATEGORIES_URL)
      .then((response) => {
        setCategoriesName(response.data.items);
      })
      .catch((error) => {
        console.error("Error fetching YouTube categories:", error);
      });
  }, []);

  const handleCategoryChange = (title) => {
    if (selectedCategories.includes(title)) {
      setSelectedCategories((prevTitles) =>
        prevTitles.filter((categoryTitle) => categoryTitle !== title)
      );
    } else {
      setSelectedCategories((prevTitles) => [...prevTitles, title]);
    }
  };

  const handleSubmit = () => {
    try {
      localStorage.setItem(
        "selectedCategories",
        JSON.stringify(selectedCategories)
      );
    } catch (error) {
      console.error("Error storing preferences:", error);
    }
  };

  const handlegetData = () => {
    const storedData = localStorage.getItem("selectedCategories");
    console.log(storedData);
  };

  return (
    <div className="AI mt--24 mb--48">
      <div className="container">
        <div className="AI__wrapper">
          <div className=" AI__wrapper__inner__2">
            <div className="AI__wrapper__inner__2__header">
              <p>
                I'm here to help you. Please let me know what you need
                assistance with, and I'll do my best to provide the information
                or guidance you're looking for!
              </p>
            </div>

            <div className="preference__wrapper__inner__2__footer">
              <div className="preference-suggestions">
                <h2>YouTube Video Preferences</h2>
                {categoriesName.map((category) => (
                  <div key={category.id}>
                    <label>
                      <input
                        type="checkbox"
                        checked={selectedCategories.includes(
                          category.snippet.title
                        )}
                        onChange={() =>
                          handleCategoryChange(category.snippet.title)
                        }
                      />
                      {category.snippet.title}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            <div>
              
              <div>
                <button
                  type="submit"
                  className="btn btn-primary"
                  onClick={handleSubmit}
                >
                  Submit
                </button>
                <button
                  type="submit"
                  className="btn btn-secondary"
                  onClick={handlegetData}
                >
                  Get Saved Data
                </button>
                <div
                  style={{
                    borderBottom: 50,
                    marginTop: "30px",
                    marginLeft: "30px",
                  }}
                >
                  <Link to="/yt-recommendation">Recommendations</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default YoutubePreferences;
