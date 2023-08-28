import React from 'react';
import '../styles/hero.scss';
import '../styles/header.scss';
import logo from '../images/depresio-logo-bg-removed.jpeg';
import { Link } from 'react-router-dom';
import Assistant from '../images/Virtual-Assistant.png';
import { ClerkProvider, SignedIn, SignedOut, RedirectToSignIn, SignIn, SignUp } from '@clerk/clerk-react';

const Hero = () => {
   return (
      <>
         <section className="hero">
            <header className="header--line">
               <div className="container header pt--24 pb--16">
                  <div className="header__left">
                     <Link className="logo-link" to="/home">
                        <img src={logo} alt="Depresio Logo" />
                     </Link>
                     <ul>
                        <li>
                           <Link to="/assistant">Access Our AI Assistant</Link>
                           <Link to="/music-therapy">Music Therapy</Link>
                           <Link to="/yt-recommendation">Recommendations</Link>
                           <Link to='/profile'>Profile</Link>
                        </li>
                     </ul>
                  </div>
                  {/* <div className="header__right">
                     <button>Sign In</button>
                     <button>Sign Up</button>
                  </div> */}
               </div>
            </header>
            <div className="container hero__content">
               <div className="flex">
                  <div className="flex">
                     <div className="hero__heading">
                        <h1>Let's build from here!</h1>
                        <p className="para--24 mt--16">Harnessed for productivity. Designed for collaboration. Celebrated for built-in security. Welcome to the platform developers love.</p>
                        <button className="btn mt--24">Get Started</button>
                     </div>
                     <img src={Assistant} alt="Assistant" />
                  </div>
               </div>
            </div>
         </section>
      </>
   );
};

export default Hero;
