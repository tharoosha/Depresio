import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/Treatment.scss';
import '../styles/AI.scss';
import profileImg from '../images/chat-user.svg';
import chevronDown from '../images/chevron-down.svg';
import profileAvatar from '../images/profile-avatar.svg';
import reminders from '../images/reminders.svg';
import workshop from '../images/workshop.svg';
import leave from '../images/leave.svg';
import officeWork from '../images/office-work.svg';
import ProgressBar from '../images/ProgressBar.png';
import { RiBarChartBoxLine, RiTodoLine } from 'react-icons/ri';
import { ImStatsBars } from 'react-icons/im';
import { AiOutlineSchedule } from 'react-icons/ai';
import { FiSettings } from 'react-icons/fi';
import { FiThumbsUp, FiThumbsDown } from 'react-icons/fi';
import { BsBookmarkHeart } from 'react-icons/bs';
import { HiDotsVertical } from 'react-icons/hi';

const TreatmentPlan = () => {
   return (
      <>
         <Header />
         <div className="container">
            <div className="TreatmentWrapper mt--24 mb--48">
               <div className="TreatmentWrapper__inner__1 Tr__inner">
                  <div className="TreatmentWrapper__inner__1__header">
                     <div className="flex">
                        <img src={profileImg} alt="profileImg" />
                        <div>
                           <h4>John Doe</h4>
                           <label>Online</label>
                        </div>
                     </div>
                     <img src={chevronDown} alt="chevronDown" />
                  </div>
                  <div className="TreatmentWrapper__inner__1__body">
                     <p className="dashboard--heading">Dashboard</p>
                     <div className="Tr__nav__flex">
                        <div className="Tr__nav__flex__1">
                           <div className="dashboard__nav__item">
                              <RiBarChartBoxLine />
                              <p>Overview</p>
                           </div>
                           <div className="dashboard__nav__item">
                              <RiTodoLine />
                              <p>Todos</p>
                           </div>
                           <div className="dashboard__nav__item">
                              <ImStatsBars />
                              <p>Statistics</p>
                           </div>
                           <div className="dashboard__nav__item">
                              <AiOutlineSchedule />
                              <p>Schedule</p>
                           </div>
                        </div>
                        <div className="Tr__nav__flex__2">
                           <div className="flex align--center">
                              <FiSettings />
                              <p>Settings</p>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
               <div className="TreatmentWrapper__inner__2 Tr__inner ">
                  <h3>Overview</h3>
                  <p>Welcome back, John! Your progress is really good. Keep it up</p>
                  <div className="TreatmentWrapper__inner__2__header__box__wrapper mt--24">
                     <div className="header__box__wrapper__1">
                        <img src={leave} alt="leave" />
                        <h3>9.5 Average Score</h3>
                        <p>Better than previous week</p>
                     </div>
                     <div className="header__box__wrapper__2">
                        <img className="box-2-img" src={officeWork} alt="officeWork" />
                        <h3>Current Task Progress</h3>
                        <p>Working on the authentication functionality </p>
                        <div className="flex progress__flex">
                           <span className="progress--round"></span>
                           <label>In Progress</label>
                        </div>
                        <img className="progress" src={ProgressBar} alt="ProgressBar" />
                     </div>
                  </div>
                  <div className="TreatmentWrapper__inner__2__body">
                     <h2 className="mt--32">Personalized Recommendations</h2>
                     <div className="recommendations__wrapper mt--24">
                        <div className="recommendations__wrapper__inner">
                           <h4 className="flex-3">Name</h4>
                           <h4 className="flex-1">Start</h4>
                           <h4 className="flex-1">Preference</h4>
                           <h4 className="flex-1">Save</h4>
                        </div>
                        <div className="recommendations__wrapper__inner recommendations__wrapper__inner__body">
                           <p className="flex-3">Based on your interest in cooking shows, how about trying out a new recipe this weekend? It can be a fun and therapeutic activity to relieve stress.</p>
                           <p className="flex-1">June 15th</p>
                           <p className="flex-1">
                              <div className="flex">
                                 <FiThumbsUp className="preference--options" />
                                 <FiThumbsDown className="preference--options" />
                              </div>
                           </p>
                           <p className="flex-1">
                              <BsBookmarkHeart />
                           </p>
                        </div>
                        <div className="recommendations__wrapper__inner recommendations__wrapper__inner__body">
                           <p className="flex-3">Since you enjoy listening to music, why not attend a live concert or music festival in your area? It can be a great way to unwind and enjoy the performance.</p>
                           <p className="flex-1">June 25th</p>
                           <p className="flex-1">
                              <div className="flex">
                                 <FiThumbsUp className="preference--options" />
                                 <FiThumbsDown className="preference--options" />
                              </div>
                           </p>
                           <p className="flex-1">
                              <BsBookmarkHeart />
                           </p>
                        </div>
                        <div className="recommendations__wrapper__inner recommendations__wrapper__inner__body">
                           <p className="flex-3">Considering your love for nature, why not plan a hiking trip to a nearby scenic location? Spending time in nature can help reduce stress and rejuvenate your mind.</p>
                           <p className="flex-1">October 17th</p>
                           <p className="flex-1">
                              <div className="flex">
                                 <FiThumbsUp className="preference--options" />
                                 <FiThumbsDown className="preference--options" />
                              </div>
                           </p>
                           <p className="flex-1">
                              <BsBookmarkHeart />
                           </p>
                        </div>
                     </div>
                  </div>
               </div>
               <div className="TreatmentWrapper__inner__3 Tr__inner">
                  <div className="TreatmentWrapper__inner__3__header">
                     <img src={profileAvatar} alt="profileAvatar" />
                     <h3 className="profile--name">John Doe</h3>
                     <label className="profile--position">Senior Software Engineer</label>
                  </div>
                  <div className="TreatmentWrapper__inner__3__body">
                     <div className="flex">
                        <h3>Reminders</h3>
                        <img src={reminders} alt="reminders" />
                     </div>
                     <div className="reminders__wrapper mt--24">
                        <div className="reminders__wrapper__inner">
                           <div className="flex">
                              <div className="flex gap--12">
                                 <img src={workshop} alt="workshop" />
                                 <div>
                                    <p>Workshop</p>
                                    <label>8.00 AM - 12.00 PM</label>
                                 </div>
                              </div>
                              <HiDotsVertical />
                           </div>
                        </div>
                        <div className="reminders__wrapper__inner">
                           <div className="flex">
                              <div className="flex gap--12">
                                 <img src={officeWork} alt="officeWork" />
                                 <div>
                                    <p>Office Work</p>
                                    <label>2.00 PM - 4.00 PM</label>
                                 </div>
                              </div>
                              <HiDotsVertical />
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

export default TreatmentPlan;
