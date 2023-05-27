import './styles/Home.scss';
import React from 'react';
import Hero from './components/Hero';
import Footer from './components/Footer';
import featureOne from './images/feature-1.svg';
import featureTwo from './images/feature-2.svg';
import featureThree from './images/feature-3.svg';
import featureFour from './images/feature-4.svg';
import featureFive from './images/feature-5.svg';
import featureSix from './images/feature-6.svg';
import emailIcon from './images/Email-Icon.svg';
import documentsIcon from './images/Documents-Icon.svg';
import eventslIcon from './images/Events-Icon.svg';
import filesIcon from './images/Files-Icon.svg';
import arrowTop from './images/arrow-up.svg';
import arrowDown from './images/arrow-down.svg';
import arrowLeft from './images/arrow-left.svg';
import arrowRight from './images/arrow-right.svg';
import crossIcon from './images/cross-icon.svg';
import chatUser from './images/chat-user.svg';
import chatUser2 from './images/chat-user-2.svg';
import mobileResponsive from './images/mobile-responsive.svg';
import uploadImage from './images/upload-image.svg';
import productUI from './images/product-ui.svg';
import emailPreview from './images/email-preview.svg';
import testimonialAvatar1 from './images/testimonials-avatar-1.svg';
import testimonialIcon from './images/testimonial-icon.svg';
import testimonialBg from './images/testimonial-bg.svg';
import testimonialLeftArrow from './images/testimonial-left-arrow.svg';
import testimonialRightArrow from './images/testimonial-right-arrow.svg';
import joinCommunity from './images/join-community.png';
import logo from './images/depresio-logo-bg-removed.jpeg';
import blog1 from './images/blog-image-1.svg';
import blog2 from './images/blog-image-2.svg';
import blog3 from './images/blog-image-3.svg';
import newsArrowRight from './images/news-arrow-right.svg';

const Home = () => {
   return (
      <>
         <Hero />
         <section className="depFeatures">
            <div className="container">
               <div className="flex align--center mb--48">
                  <h2 className="dep__sub__heading flex-2">Powerful features to help you manage all your emotions</h2>
                  <p className="dep__sub__heading__para flex-1">Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi quas.</p>
               </div>
               <div className="depFeatures__grid">
                  <div className="depFeatures__grid__item">
                     <img src={featureOne} alt="Depresio Feature 1" />
                     <p className="sub--heading--4">User Information</p>
                     <p className="para--grey">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Provident quidem necessitatibus sequi saepe illum suscipit?</p>
                  </div>
                  <div className="depFeatures__grid__item">
                     <img src={featureTwo} alt="Depresio Feature 1" />
                     <p className="sub--heading--4">Deal Tracking</p>
                     <p className="para--grey">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Provident quidem necessitatibus sequi saepe illum suscipit?</p>
                  </div>
                  <div className="depFeatures__grid__item">
                     <img src={featureThree} alt="Depresio Feature 1" />
                     <p className="sub--heading--4">User Information</p>
                     <p className="para--grey">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Provident quidem necessitatibus sequi saepe illum suscipit?</p>
                  </div>
                  <div className="depFeatures__grid__item">
                     <img src={featureFour} alt="Depresio Feature 1" />
                     <p className="sub--heading--4">User Information</p>
                     <p className="para--grey">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Provident quidem necessitatibus sequi saepe illum suscipit?</p>
                  </div>
                  <div className="depFeatures__grid__item">
                     <img src={featureFive} alt="Depresio Feature 1" />
                     <p className="sub--heading--4">User Information</p>
                     <p className="para--grey">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Provident quidem necessitatibus sequi saepe illum suscipit?</p>
                  </div>
                  <div className="depFeatures__grid__item">
                     <img src={featureSix} alt="Depresio Feature 1" />
                     <p className="sub--heading--4">User Information</p>
                     <p className="para--grey">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Provident quidem necessitatibus sequi saepe illum suscipit?</p>
                  </div>
               </div>
            </div>
         </section>
         <section className="essential">
            <div className="container">
               <div className="flex align--center ">
                  <h2 className="dep__sub__heading flex-2 text--center">Essential apps that protect your</h2>
               </div>
               <div className="flex mb--48 justify--center gap--16 mt--16">
                  <div className="flex__inner flex">
                     <img src={emailIcon} alt="Email Icon" />
                     <h3 className="dep__sub__inner__heading flex-2 text--center">Email,</h3>
                  </div>
                  <div className="flex__inner flex">
                     <img src={eventslIcon} alt="Events Icon" />
                     <h3 className="dep__sub__inner__heading flex-2 text--center">Events,</h3>
                  </div>
                  <div className="flex__inner flex">
                     <img src={filesIcon} alt="Files Icon" />
                     <h3 className="dep__sub__inner__heading flex-2 text--center">Files,</h3>
                  </div>
                  <div className="flex__inner flex">
                     <img src={documentsIcon} alt="Documents Icon" />
                     <h3 className="dep__sub__inner__heading flex-2 text--center">Documents</h3>
                  </div>
               </div>
               <div className="essential__encrypt">
                  <div className="essential__encrypt__left">
                     <h5 className="mb--16">End-to-end encrypted voice chat and messages</h5>
                     <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Modi iure totam rerum quaerat! Animi, aut soluta adipisci unde quam deserunt?</p>
                     <button className="btn">Learn More</button>
                  </div>
                  <div className="essential__encrypt__right">
                     <div className="essential__encrypt__right__header">
                        <div className="essential__encrypt__right__header__left">
                           <img className="icon icon-1" src={crossIcon} alt="" />
                           <div>
                              <img className="icon icon-2" src={arrowDown} alt="" />
                              <img className="icon icon-2" src={arrowTop} alt="" />
                           </div>
                        </div>
                        <div className="essential__encrypt__right__header__right">
                           <img className="icon icon-3" src={arrowLeft} alt="" />
                           <img className="icon icon-4" src={arrowRight} alt="" />
                        </div>
                     </div>
                     <div className="essential__encrypt__right__body">
                        <p className="mb--16">Example preview!</p>
                        <div className="essential__encrypt__right__body__item mb--16">
                           <div className="flex">
                              <div>
                                 <div className="flex">
                                    <img src={chatUser} alt="Chat User" />
                                    <div className="chat_details">
                                       <p className="chat_details__name">John Doe</p>
                                       <p className="chat_details__email">john@gmail.com</p>
                                    </div>
                                 </div>
                                 <p className="mt--16">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Velit, vitae?</p>
                              </div>
                              <p className="chat_details__date">Feb 8, 2023</p>
                           </div>
                        </div>
                        <div className="essential__encrypt__right__body__item">
                           <div className="flex">
                              <div>
                                 <div className="flex">
                                    <img src={chatUser2} alt="Chat User" />
                                    <div className="chat_details">
                                       <p className="chat_details__name">Richard Smith</p>
                                       <p className="chat_details__email">richard@gmail.com</p>
                                    </div>
                                 </div>
                                 <p className="mt--16">Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi incidunt quos quod, facere illo harum recusandae?</p>
                              </div>
                              <p className="chat_details__date">April 23, 2023</p>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
               <div className="flex mt--32 mobileResponsive">
                  <div className="essential__encrypt flex-1">
                     <div className="essential__encrypt__left">
                        <div>
                           <img src={mobileResponsive} alt="" />
                        </div>
                        <h5 className="mb--16">Fully mobile responsive</h5>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia, consequuntur!</p>
                     </div>
                  </div>
                  <div className="essential__encrypt flex-2">
                     <div className="essential__encrypt__left">
                        <h5 className="mb--16">Upload, share and preview any file</h5>
                        <p className="text--center">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Modi iure totam rerum quaerat! Animi, aut soluta adipisci unde quam deserunt?</p>
                        <div className="flex justify--center mt--24 essential__upload__image">
                           <img src={uploadImage} alt="uploadImage" />
                        </div>
                     </div>
                  </div>
               </div>
               <div className="flex justify--center mt--24">
                  <button className="btn"> See All Features</button>
               </div>
               <div className="x-line"></div>
               <div className="essential__encrypt">
                  <div className="essential__encrypt__left">
                     <h5 className="mb--16">End-to-end encrypted voice chat and messages</h5>
                     <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Modi iure totam rerum quaerat! Animi, aut soluta adipisci unde quam deserunt?</p>
                     <button className="btn">Learn More</button>
                  </div>
                  <div className="essential__encrypt__right">
                     <div className="essential__encrypt__right__header">
                        <div className="essential__encrypt__right__header__left">
                           <img className="icon icon-1" src={crossIcon} alt="" />
                           <div>
                              <img className="icon icon-2" src={arrowDown} alt="" />
                              <img className="icon icon-2" src={arrowTop} alt="" />
                           </div>
                        </div>
                        <div className="essential__encrypt__right__header__right">
                           <img className="icon icon-3" src={arrowLeft} alt="" />
                           <img className="icon icon-4" src={arrowRight} alt="" />
                        </div>
                     </div>
                     <div className="essential__encrypt__right__body">
                        <p className="mb--16">Example preview!</p>
                        <div className="essential__encrypt__right__body__item mb--16">
                           <div className="flex">
                              <div>
                                 <div className="flex">
                                    <img src={chatUser} alt="Chat User" />
                                    <div className="chat_details">
                                       <p className="chat_details__name">John Doe</p>
                                       <p className="chat_details__email">john@gmail.com</p>
                                    </div>
                                 </div>
                                 <p className="mt--16">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Velit, vitae?</p>
                              </div>
                              <p className="chat_details__date">Feb 8, 2023</p>
                           </div>
                        </div>
                        <div className="essential__encrypt__right__body__item">
                           <div className="flex">
                              <div>
                                 <div className="flex">
                                    <img src={chatUser2} alt="Chat User" />
                                    <div className="chat_details">
                                       <p className="chat_details__name">Richard Smith</p>
                                       <p className="chat_details__email">richard@gmail.com</p>
                                    </div>
                                 </div>
                                 <p className="mt--16">Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi incidunt quos quod, facere illo harum recusandae?</p>
                              </div>
                              <p className="chat_details__date">April 23, 2023</p>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
               <div className="x-line"></div>
               <div className="essential__encrypt">
                  <div className="essential__encrypt__right">
                     <div className="essential__encrypt__right__body">
                        <h5 className="mt--12">Product Mail</h5>
                        <p className="mb--24">Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, eligendi?</p>
                        <div className="essential__encrypt__right__body__item mb--16">
                           <div className="flex justify--center">
                              <img src={emailPreview} alt="" />
                           </div>
                        </div>
                     </div>
                  </div>
                  <div className="essential__encrypt__right">
                     <div className="essential__encrypt__right__body">
                        <h5 className="mt--12">Product UI</h5>
                        <p className="mb--24">Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, eligendi?</p>
                        <div className="essential__encrypt__right__body__item mb--16">
                           <div className="flex justify--center">
                              <img src={productUI} alt="" />
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </section>
         <section className="testimonials">
            <h2 className="dep__sub__heading text--center">What our clients say</h2>
            <p className="text--center mt--24">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quos, magni!</p>
            <div className="testimonials__inner">
               <div className="container">
                  <div className="testimonials__inner__item">
                     <div className="testimonials__inner__item__header">
                        <div className="flex">
                           <img className="testimonials__user" src={testimonialAvatar1} alt="" />
                           <div className="testimonials__details">
                              <h6 className="testimonials__details__name">John Doe</h6>
                              <label className="testimonials__details__position">Web Designer</label>
                           </div>
                        </div>
                        <img className="testimonials__img" src={testimonialIcon} alt="" />
                     </div>
                     <div className="testimonials__inner__item__header__body">
                        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. A aperiam nobis, quia eaque atque architecto omnis vitae cum laudantium delectus.</p>
                     </div>
                  </div>
                  <div className="testimonials__inner__item">
                     <div className="testimonials__inner__item__header">
                        <div className="flex">
                           <img className="testimonials__user" src={testimonialAvatar1} alt="" />
                           <div className="testimonials__details">
                              <h6 className="testimonials__details__name">John Doe</h6>
                              <label className="testimonials__details__position">Web Designer</label>
                           </div>
                        </div>
                        <img className="testimonials__img" src={testimonialIcon} alt="" />
                     </div>
                     <div className="testimonials__inner__item__header__body">
                        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. A aperiam nobis, quia eaque atque architecto omnis vitae cum laudantium delectus.</p>
                     </div>
                  </div>
                  <div className="testimonials__inner__item">
                     <div className="testimonials__inner__item__header">
                        <div className="flex">
                           <img className="testimonials__user" src={testimonialAvatar1} alt="" />
                           <div className="testimonials__details">
                              <h6 className="testimonials__details__name">John Doe</h6>
                              <label className="testimonials__details__position">Web Designer</label>
                           </div>
                        </div>
                        <img className="testimonials__img" src={testimonialIcon} alt="" />
                     </div>
                     <div className="testimonials__inner__item__header__body">
                        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. A aperiam nobis, quia eaque atque architecto omnis vitae cum laudantium delectus.</p>
                     </div>
                  </div>
               </div>
               <div className="testimonials__footer flex justify--center gap--24 mt--32">
                  <img src={testimonialLeftArrow} alt="" />
                  <img src={testimonialRightArrow} alt="" />
               </div>
            </div>
         </section>
         <section className="community">
            <div className="community__image__wrapper flex justify--center">
               <img src={joinCommunity} alt="" />
               <div className="community__body">
                  <img className="community__logo" src={logo} alt="Logo" />
                  <h2 className="dep__sub__heading text--center">Join the chat community</h2>
                  <p className="text--center">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsam iure assumenda amet ratione placeat recusandae suscipit esse, itaque ut libero!</p>
                  <button className="btn">Join Now</button>
               </div>
            </div>
         </section>
         <section className="news">
            <div className="container">
               <div className="flex align--center mb--48">
                  <h2 className="dep__sub__heading flex-2">Depresio in the news</h2>
                  <p className="dep__sub__heading__para flex-1">Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi quas.</p>
               </div>
               <div className="news__wrapper">
                  <div className="news__wrapper__item">
                     <img src={blog1} alt="Blog 1" />
                     <h4>Deprsio News Article 1</h4>
                     <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi culpa temporibus laudantium rerum dolorem labore aliquid quas, ut nobis deleniti!</p>
                     <div className="news--line"></div>
                     <div className="news__footer flex">
                        <label className="news__date">February 9, 2023</label>
                        <div className="flex">
                           <label className="news__link">Read more</label>
                           <img src={newsArrowRight} alt="newsArrowRight" />
                        </div>
                     </div>
                  </div>
                  <div className="news__wrapper__item">
                     <img src={blog2} alt="Blog 2" />
                     <h4>Deprsio News Article 2</h4>
                     <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi culpa temporibus laudantium rerum dolorem labore aliquid quas, ut nobis deleniti!</p>
                     <div className="news--line"></div>
                     <div className="news__footer flex">
                        <label className="news__date">February 9, 2023</label>
                        <div className="flex">
                           <label className="news__link">Read more</label>
                           <img src={newsArrowRight} alt="newsArrowRight" />
                        </div>
                     </div>
                  </div>
                  <div className="news__wrapper__item">
                     <img src={blog3} alt="Blog 3" />
                     <h4>Deprsio News Article 3</h4>
                     <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi culpa temporibus laudantium rerum dolorem labore aliquid quas, ut nobis deleniti!</p>
                     <div className="news--line"></div>
                     <div className="news__footer flex">
                        <label className="news__date">February 9, 2023</label>
                        <div className="flex">
                           <label className="news__link">Read more</label>
                           <img src={newsArrowRight} alt="newsArrowRight" />
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </section>
         <Footer />
      </>
   );
};

export default Home;
