import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import MusicCarousel from '../components/MusicCarousel';
import '../styles/MusicTherapy.scss';
import '../styles/Base.scss';
// import depLogo from '../images/depresio-logo-bg-removed.jpeg';
import mtHome from '../images/mt-home.svg';
import mtSearch from '../images/mt-search.svg';
import mtLibrary from '../images/mt-library.svg';
// import mtLogo from '../images/mt-logo.svg';
import preSong from '../images/pre-song.png';
import nextSong from '../images/next-song.png';
import playBtn from '../images/play-pause.png';
import playerTimeline from '../images/mt-player-timeline.png';
import soundHigh from '../images/sound-high.png';
import mtShuffle from '../images/mt_shuffle.png';
import hippop from '../images/hipop-cover.png';
import bluePlayBtn from '../images/bluePlayBtn.png';
import mood1 from '../images/mood1.png';
import mood2 from '../images/mood2.png';
import mood3 from '../images/mood3.png';
import mood4 from '../images/mood4.png';
import mood5 from '../images/mood5.png';
import mood6 from '../images/mood6.png';
import profileImg from '../images/chat-user.svg';
import chevronDown from '../images/chevron-down.svg';
import { useEffect, useState } from 'react';
import { Buffer } from 'buffer';


import axios from 'axios';
const qs = require('qs');
const client_id = process.env.SPOTIFY_CLIENT_ID; // Your client id
const client_secret = process.env.SPOTIFY_CLIENT_SECRET; // Your secret
const redirect_uri = process.env.SPOTIFY_REDIRECT_URI;
const auth_token = Buffer.from(`${client_id}:${client_secret}`, 'utf-8').toString('base64');


const MusicTherapy = () => {

   const [songs, setSongs] = useState([]);

   const [accessToken, setAccessToken] = useState(null);
   const [trackData, setTrackData] = useState(null);
 
   useEffect(() => {
     // Function to extract the access token from the URL hash
     const getAccessTokenFromHash = () => {
       const hash = window.location.hash;
       const tokenMatch = hash.match(/access_token=([^&]*)/);
       if (tokenMatch) {
         return tokenMatch[1];
       }
       return null;
     };
 
     // Check if we have an access token in the URL hash
     const tokenFromHash = getAccessTokenFromHash();
 
     if (tokenFromHash) {
       // We have an access token; set it in state
       setAccessToken(tokenFromHash);
     } else {
       // Redirect the user to Spotify for authentication
       window.location = `https://accounts.spotify.com/authorize?client_id=${client_id}&redirect_uri=${redirect_uri}&response_type=token`;
     }
   }, []);
 
   useEffect(() => {
     // If we have an access token, make an API request to retrieve a track
     if (accessToken) {
       const trackId = '1HNkqx9Ahdgi1Ixy2xkKkL'; // Replace with the actual track ID
 
       axios
         .get(`https://api.spotify.com/v1/tracks/${trackId}`, {
           headers: {
             Authorization: `Bearer ${accessToken}`,
           },
         })
         .then((response) => {
           setTrackData(response.data);
         })
         .catch((error) => {
           console.error('Error fetching track data:', error);
         });
     }
   }, [accessToken]);
  
   return (
      <>
         <Header />
         <div className="container">
            <div className="mt-main-container mt--24 mb--48">
               <div className="mt-grid-inner">
                  <div className="mt-first-col">
                     <div className="mt-logo-container">
                        <div className="AI__wrapper__inner__1__header flex">
                           <div className="flex gap--16">
                              <img src={profileImg} alt="profileImg" />
                              <div className="AI__wrapper__inner__1__header__details">
                                 <h4>John Doe</h4>
                                 <label>Online</label>
                              </div>
                           </div>
                           <img className="chevrown--icon" src={chevronDown} alt="chevronDown" />
                        </div>
                     </div>
                     <div className="mt-navbar">
                        <ul>
                           <li>
                              <a href="#">
                                 <div className="mt-menu-item">
                                    <div className="mt-menu-icon">
                                       <img src={mtHome}></img>
                                    </div>
                                    <div className="mt-menu-name">
                                       <p className="para--20">Home</p>
                                    </div>
                                 </div>
                              </a>
                           </li>
                           <li>
                              <a href="#">
                                 <div className="mt-menu-item">
                                    <div className="mt-menu-icon">
                                       <img src={mtSearch}></img>
                                    </div>
                                    <div className="mt-menu-name">
                                       <p className="para--20">Search</p>
                                    </div>
                                 </div>
                              </a>
                           </li>
                           <li>
                              <a href="#">
                                 <div className="mt-menu-item">
                                    <div className="mt-menu-icon">
                                       <img src={mtLibrary}></img>
                                    </div>
                                    <div className="mt-menu-name">
                                       <p className="para--20">Library</p>
                                    </div>
                                 </div>
                              </a>
                           </li>
                        </ul>
                     </div>
                     <div className="mt-trending mt--48">
                        <div className="title">
                           <h4> Trending Songs</h4>
                        </div>
                        <div className="mt-trending-tracks-container  mt--32">
                           <div className="mt-trending-track">
                              <div className="mt-trending-track-name">
                                 <p>As It Was</p>
                              </div>
                              <div className="mt-trending-track-artist">
                                 <p>Harry Style</p>
                                 <p>3:20</p>
                              </div>
                           </div>
                           <div className="mt-trending-track">
                              <div className="mt-trending-track-name">
                                 <p>About Damn Time</p>
                              </div>
                              <div className="mt-trending-track-artist">
                                 <p>Lizzo</p>
                                 <p>2:20</p>
                              </div>
                           </div>
                           <div className="mt-trending-track">
                              <div className="mt-trending-track-name">
                                 <p>Hold On </p>
                              </div>
                              <div className="mt-trending-track-artist">
                                 <p>Justin Beiber</p>
                                 <p>3:10</p>
                              </div>
                           </div>
                           <div className="mt-trending-track">
                              <div className="mt-trending-track-name">
                                 <p>Unholy</p>
                              </div>
                              <div className="mt-trending-track-artist">
                                 <p>Sam Smith</p>
                                 <p>4:20</p>
                              </div>
                           </div>
                           <div className="mt-trending-track">
                              <div className="mt-trending-track-name">
                                 <p>Until I Found In You</p>
                              </div>
                              <div className="mt-trending-track-artist">
                                 <p>Stephen Sanchez</p>
                                 <p>2:26</p>
                              </div>
                           </div>
                           <div className="mt-trending-track">
                              <div className="mt-trending-track-name">
                                 <p>Flowers</p>
                              </div>
                              <div className="mt-trending-track-artist">
                                 <p>Miley Cyrus</p>
                                 <p>3:03</p>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
                  <div className="mt-second-col">
                     <div>
                        <h1>
                           To Be Styled...
                        </h1>
{/*
                        {getAudioFeatures_Track('1HNkqx9Ahdgi1Ixy2xkKkL') ? (
                           <div>
                              <p>content available</p>
                              <p>JSON.stringify({getAudioFeatures_Track('1HNkqx9Ahdgi1Ixy2xkKkL')}, null, 2)</p>
                           </div>
                           ) : (
                           <p>Loading audio features...</p>
                           )}


                        */}
                        <h5>
                           End
                        </h5>
                     </div>
                     <div className="mt-music-player">
                        <div className="mt-player-options">
                           <div className="mt-player-buttons">
                              <img src={preSong}></img>
                              <img src={playBtn}></img>
                              <img src={nextSong}></img>
                           </div>
                           <div className="mt-plaer-song-name">
                              <p className="song-name">Papah mama Senang</p>
                              <p className="song-artist">Zee Mia</p>
                           </div>
                        </div>
                        <div className="mt-player-timeline">
                           <img src={playerTimeline}></img>
                           <div className="details">
                              <div className="duration">
                                 <p>12:30</p>
                              </div>
                              <div className="volume">
                                 <img src={soundHigh}></img>
                                 <img src={mtShuffle}></img>
                              </div>
                           </div>
                        </div>
                     </div>
                     <div className="mt-top-hits-sec mt--48">
                        <div className="mt-top-music-title">
                           <h2>Top Hits Today</h2>
                        </div>
                        <div className="mt-top-music-list-container">
                           <MusicCarousel />
                        </div>
                     </div>
                     <div className="mt-recommended-tracks mt--64">
                        <div className="mt-recommended-music-title">
                           <h2>Recommend Your Moods</h2>
                        </div>
                        <div className="mt-recommended-music-container mt--32">
                           <div className="left-col">
                              <div className="first-row">
                                 <div className="col">
                                    <div className="thumbnail">
                                       <img className="thumb-img" src={mood1}></img>
                                       <img className="blueBtn" src={bluePlayBtn}></img>
                                    </div>
                                    <div className="details">
                                       <p>Experimental Music</p>
                                    </div>
                                 </div>
                                 <div className="col">
                                    <div className="thumbnail">
                                       <img className="thumb-img" src={mood2}></img>
                                       <img className="blueBtn" src={bluePlayBtn}></img>
                                    </div>
                                    <div className="details">
                                       <p>
                                          Trap <br /> Dance
                                       </p>
                                    </div>
                                 </div>
                                 <div className="col">
                                    <div className="thumbnail">
                                       <img className="thumb-img" src={mood3}></img>
                                       <img className="blueBtn" src={bluePlayBtn}></img>
                                    </div>
                                    <div className="details">
                                       <p>
                                          Workout <br /> Cardio
                                       </p>
                                    </div>
                                 </div>
                              </div>
                              <div className="second-row">
                                 <div className="col">
                                    <div className="thumbnail">
                                       <img className="thumb-img" src={mood4}></img>
                                       <img className="blueBtn" src={bluePlayBtn}></img>
                                    </div>
                                    <div className="details">
                                       <p>
                                          Soft Floks <br /> Music
                                       </p>
                                    </div>
                                 </div>
                                 <div className="col">
                                    <div className="thumbnail">
                                       <img className="thumb-img" src={mood5}></img>
                                       <img className="blueBtn" src={bluePlayBtn}></img>
                                    </div>
                                    <div className="details">
                                       <p>
                                          Indonesia <br /> Melow
                                       </p>
                                    </div>
                                 </div>
                                 <div className="col">
                                    <div className="thumbnail">
                                       <img className="thumb-img" src={mood6}></img>
                                       <img className="blueBtn" src={bluePlayBtn}></img>
                                    </div>
                                    <div className="details">
                                       <p>
                                          Singing <br /> Country
                                       </p>
                                    </div>
                                 </div>
                              </div>
                           </div>
                           <div className="right-col">
                              <div className="col-inner">
                                 <div className="thumbnail">
                                    <img src={hippop}></img>
                                 </div>
                                 <div className="details">
                                    <h5>Pop Hitz 2023</h5>
                                    <p>
                                       All the songs that make <br /> you more hitz{' '}
                                    </p>
                                    <div className="btn">
                                       <a href="">Buy Premium</a>
                                    </div>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
         <Footer />
      </>
   );
};

export default MusicTherapy;
