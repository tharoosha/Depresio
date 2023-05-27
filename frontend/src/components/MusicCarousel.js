import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../styles/MusicTherapy.scss';
import '../styles/Base.scss';
import bluePlayBtn from '../images/bluePlayBtn.png';
import songThumb_1 from '../images/songThumb_1.png';
import songThumb_2 from '../images/songThumb_2.png';
import songThumb_3 from '../images/songThumb_3.png';
import songThumb_4 from '../images/songThumb_4.png';

const MusicCarousel = () => {
   var settings = {
      dots: true,
      infinite: true,
      speed: 2000,
      autoplay: true,
      autoplaySpeed: 5000,
      slidesToShow: 2,
      slidesToScroll: 1,
      initialSlide: 0,
      arrows: false,
      responsive: [
         {
            breakpoint: 1024,
            settings: {
               slidesToShow: 3,
               slidesToScroll: 3,
               infinite: true,
               dots: true,
            },
         },
         {
            breakpoint: 600,
            settings: {
               slidesToShow: 2,
               slidesToScroll: 2,
               initialSlide: 2,
            },
         },
         {
            breakpoint: 480,
            settings: {
               slidesToShow: 1,
               slidesToScroll: 1,
            },
         },
      ],
   };
   return (
      <div className="slider-div mt--32">
         <Slider {...settings}>
            <div className="mt-slider-card">
               <div className="card-inner set-1">
                  <div className="songContent">
                     <div className="track-thumbnail">
                        <img src={songThumb_1}></img>
                     </div>
                     <div className="track-details">
                        <h3>Senandung Air</h3>
                        <p className="song-artist">Zee Mia</p>
                     </div>
                  </div>
                  <div className="bluePlayBtn">
                     <img src={bluePlayBtn}></img>
                  </div>
               </div>
            </div>
            <div className="mt-slider-card">
               <div className="card-inner set-1">
                  <div className="songContent">
                     <div className="track-thumbnail">
                        <img src={songThumb_2}></img>
                     </div>
                     <div className="track-details">
                        <h3>Kiss Me More...</h3>
                        <p className="song-artist">Doja Cat, SZA</p>
                     </div>
                  </div>
                  <div className="bluePlayBtn">
                     <img src={bluePlayBtn}></img>
                  </div>
               </div>
            </div>
            <div className="mt-slider-card">
               <div className="card-inner set-1">
                  <div className="songContent">
                     <div className="track-thumbnail">
                        <img src={songThumb_3}></img>
                     </div>
                     <div className="track-details">
                        <h3>Flowers</h3>
                        <p className="song-artist">Miley Cyrus</p>
                     </div>
                  </div>
                  <div className="bluePlayBtn">
                     <img src={bluePlayBtn}></img>
                  </div>
               </div>
            </div>
            <div className="mt-slider-card">
               <div className="card-inner set-1">
                  <div className="songContent">
                     <div className="track-thumbnail">
                        <img src={songThumb_4}></img>
                     </div>
                     <div className="track-details">
                        <h3>Hold On </h3>
                        <p className="song-artist">Justin Beiber</p>
                     </div>
                  </div>
                  <div className="bluePlayBtn">
                     <img src={bluePlayBtn}></img>
                  </div>
               </div>
            </div>
         </Slider>
      </div>
   );
};

export default MusicCarousel;
