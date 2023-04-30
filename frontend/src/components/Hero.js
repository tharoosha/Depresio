import React from 'react';
import '../styles/hero.scss';
import linearLine from '../images/lines-hero.svg';

const Hero = () => {
   return (
      <section className="container">
         <div className="flex align--center">
            <img src={linearLine} />
            <div className="hero__heading">
               <h1>Let's build from here!</h1>
               <p className="para--24 mt--16">Harnessed for productivity. Designed for collaboration. Celebrated for built-in security. Welcome to the platform developers love.</p>
            </div>
         </div>
         <div className="linear--green">
            <svg aria-hidden="true" height="24" viewBox="0 0 24 24" version="1.1" width="24" data-view-component="true">
               <path d="M15.22 4.97a.75.75 0 0 1 1.06 0l6.5 6.5a.75.75 0 0 1 0 1.06l-6.5 6.5a.749.749 0 0 1-1.275-.326.749.749 0 0 1 .215-.734L21.19 12l-5.97-5.97a.75.75 0 0 1 0-1.06Zm-6.44 0a.75.75 0 0 1 0 1.06L2.81 12l5.97 5.97a.749.749 0 0 1-.326 1.275.749.749 0 0 1-.734-.215l-6.5-6.5a.75.75 0 0 1 0-1.06l6.5-6.5a.75.75 0 0 1 1.06 0Z"></path>
            </svg>
         </div>
      </section>
   );
};

export default Hero;
