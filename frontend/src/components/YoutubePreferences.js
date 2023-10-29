
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Header from './Header';


function YoutubePreferences() {
  const [categoriesName, setCategoriesName] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);

  const YOUTUBE_API_KEY = "AIzaSyCoFVk0LXFuTN5Zs0OfL6-gzQVgpaSM6lc";
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
    const rating = localStorage.getItem("rating");
    console.log(storedData);
    console.log(rating);
  };


   return (
      <>
         <Header />
         <div className="AI mt--24 mb--48">
            <div className="container">
               <div className="AI__wrapper">
                  <div className=" AI__wrapper__inner__2">
                     <div className="AI__wrapper__inner__2__header">
                        <p>Please select your preferences and I will recommend you videos based on your preferences.</p>
                     </div>

                     <div className="preference__wrapper__inner__2__footer">
                        <div className="preference-suggestions">
                           <h2>YouTube Video Preferences</h2>
                           <div className="check-container">
                              {categoriesName.map((category) => (
                                 <div key={category.id}>
                                    <label>
                                       <input type="checkbox" checked={selectedCategories.includes(category.snippet.title)} onChange={() => handleCategoryChange(category.snippet.title)} />
                                       {category.snippet.title}
                                    </label>
                                 </div>
                              ))}
                           </div>
                        </div>
                     </div>
                     <div>
                        <div>
                           <button type="submit" className="btn btn-primary" onClick={handleSubmit}>
                              Submit
                           </button>
                           <button
                              type="submit"
                              style={{
                                 marginLeft: '24px',
                              }}
                              className="btn btn-secondary rem-margin-mob"
                              onClick={handlegetData}
                           >
                              Get Saved Data
                           </button>
                           <div
                              style={{
                                 borderBottom: 50,
                                 marginTop: '30px',
                              }}
                           >
                              <Link to="/yt-recommendation">Watch Recommendation Videos</Link>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </>
   );

}

export default YoutubePreferences;
