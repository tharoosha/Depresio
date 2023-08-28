import React from 'react';
import '../styles/header.scss';
import { Link } from 'react-router-dom';
import logo from '../images/depresio-logo-bg-removed.jpeg';

const Header = () => {
   return (
      <header className="header--line">
         <div className="container header pt--24 pb--16">
            <div className="header__left">
               <Link className="logo-link" to="/">
                  <img src={logo} alt="Depresio Logo" />
               </Link>
               <ul>
                  <li>
                     <Link to="/assistant">Access Our AI Assistant</Link>
                     <Link to="/music-therapy">Music Therapy</Link>
                     {/* <Link to="/treatment-plan">Treatment Plan</Link> */}
                     <Link to="/yt-recommendation">Recommendations</Link>
                  </li>
               </ul>
            </div>
            {/* <div className="header__right">
               <button>Sign In</button>
               <button>Sign Up</button>
            </div> */}
         </div>
      </header>
   );
};

export default Header;
