import React, { useState } from 'react';
import '../styles/header.scss';
import { Link } from 'react-router-dom';
import logo from '../images/depresio-logo-bg-removed.jpeg';

const Header = () => {
   const [menuActive, setMenuActive] = useState(false);

   const toggleMenu = () => {
      setMenuActive(!menuActive);
   };
   return (
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
                     {/* <Link to="/treatment-plan">Treatment Plan</Link> */}
                     <Link to="/yt-recommendation">Recommendations</Link>
                     <Link to="/profile">Profile</Link>
                  </li>
               </ul>
            </div>
            <div className="header">
               <div className={`header__right ${menuActive ? 'menu-active' : ''}`} id="menuToggle" onClick={toggleMenu}>
                  <div className={`hamburger-line ${menuActive ? 'hamburger-active' : ''}`}></div>
                  <div className={`hamburger-line ${menuActive ? 'hamburger-active' : ''}`}></div>
                  <div className={`hamburger-line ${menuActive ? 'hamburger-active' : ''}`}></div>
               </div>
            </div>
            <div className={`menu ${menuActive ? 'menu-active' : ''}`} id="menu">
               <ul>
                  <li>
                     <Link to="/home">Home</Link>
                     <Link to="/assistant">Access Our AI Assistant</Link>
                     <Link to="/music-therapy">Music Therapy</Link>
                     {/* <Link to="/treatment-plan">Treatment Plan</Link> */}
                     <Link to="/yt-recommendation">Recommendations</Link>
                     <Link to="/profile">Profile</Link>
                  </li>
               </ul>
            </div>
         </div>
      </header>
   );
};

export default Header;
