import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/YT_RecommendationView.scss';

const YT_RecommendationView = () => {
   return (
      <>
         <Header />
         <div className="container">
            <div className="yt-container">
               <div className="yt-recommendation-item">
                  <iframe width="560" height="315" src="https://www.youtube.com/embed/yhB3BgJyGl8" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
               </div>
               <div className="yt-recommendation-item">
                  <iframe width="560" height="315" src="https://www.youtube.com/embed/fuhE6PYnRMc" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
               </div>
               <div className="yt-recommendation-item">
                  <iframe width="560" height="315" src="https://www.youtube.com/embed/48h57PspBec" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>{' '}
               </div>
               <div className="yt-recommendation-item">
                  <iframe width="560" height="315" src="https://www.youtube.com/embed/FM7Z-Xq8Drc" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>{' '}
               </div>
               <div className="yt-recommendation-item">
                  <iframe width="560" height="315" src="https://www.youtube.com/embed/WTOm65IZneg" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>{' '}
               </div>
               <div className="yt-recommendation-item">
                  <iframe width="560" height="315" src="https://www.youtube.com/embed/1WEAJ-DFkHE" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>{' '}
               </div>
               <div className="yt-recommendation-item">
                  <iframe width="560" height="315" src="https://www.youtube.com/embed/YLt73w6criQ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>{' '}
               </div>
               <div className="yt-recommendation-item">
                  <iframe width="560" height="315" src="https://www.youtube.com/embed/TJ2ifmkGGus" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>{' '}
               </div>
               <div className="yt-recommendation-item">
                  <iframe width="560" height="315" src="https://www.youtube.com/embed/7IKab3HcfFk" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>{' '}
               </div>
               <div className="yt-recommendation-item">
                  <iframe width="560" height="315" src="https://www.youtube.com/embed/h5NvTTOlOtI" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>{' '}
               </div>
            </div>
         </div>
         <Footer />
      </>
   );
};

export default YT_RecommendationView;



