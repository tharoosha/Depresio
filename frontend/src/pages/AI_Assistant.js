import React, { useEffect, useState, useRef }  from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/AI.scss';
import profileImg from '../images/chat-user.svg';
import chevronDown from '../images/chevron-down.svg';
import logo from '../images/depresio-logo-bg-removed.jpeg';
import edit from '../images/edit.svg';
import { AiOutlineDelete } from 'react-icons/ai';
import { MdDeleteForever } from 'react-icons/md';
import { BsFillSunFill } from 'react-icons/bs';
import { FiSettings } from 'react-icons/fi';
import { HiDotsHorizontal } from 'react-icons/hi';
import { FiThumbsUp, FiThumbsDown } from 'react-icons/fi';
import { BsFillMicFill, BsSendCheck } from 'react-icons/bs';

import axios from 'axios';

const AI_Assistant = () => {

   const [message, setMessage] = useState('');
   const [response, setResponse] = useState('');

   const chatContainerRef = useRef(null);
   //Scroll to the bottom of the chat container whenever a new message is added
   useEffect(()=>{
      if (chatContainerRef.current){
         chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
      }
   }, [response]);


   const handleSubmit = (e) => {
    e.preventDefault();

    // Make an HTTP request to the backend API to analyze user input using axios
    axios
      .post('http://localhost:3000/api/analyze', { message: message })
      .then((response) => setResponse(response.data.result))
      .catch((error) => console.error(error));
   };

   // console.log({response});

   return (

      // <div className='AI mt--24 mb--48'>
      //    <form onSubmit={handleSubmit}>
      //       <textarea
      //          value={message}
      //          onChange={(e)=> setMessage(e.target.value)}
      //       ></textarea>
      //       <button type='submit'>Submit</button>
      //    </form>
      //    <div>{response}</div>
      // </div>

      <>
         <Header />
         <div className="AI mt--24 mb--48">
            <div className="container">
               <div className="AI__wrapper">
                  {/* <div className="AI__wrapper__inner AI__wrapper__inner__1"> */}
                     {/* <div className="AI__wrapper__inner__1__header flex">
                        <div className="flex gap--16">
                           <img src={profileImg} alt="profileImg" />
                           <div className="AI__wrapper__inner__1__header__details">
                              <h4>John Doe</h4>
                              <label>Online</label>
                           </div>
                        </div>
                        <img className="chevrown--icon" src={chevronDown} alt="chevronDown" />
                     </div> */}
                     {/* <div className="AI__wrapper__inner__1__body"> */}
                        {/* <p className="history--heading">Chat History</p> */}
                        {/* <div className="AI__wrapper__inner__1__body__item">
                           <p>New Chat</p>
                           <div className="history--edit--delete">
                              <img src={edit} alt="Edit" />
                              <AiOutlineDelete />
                           </div>
                        </div> */}
                        {/* <div className="AI__wrapper__inner__1__body__item">
                           <p>I'm feeling overwhelmed and stressed out with my workload. It's becoming difficult to keep up.</p>
                           <div className="history--edit--delete">
                              <img src={edit} alt="Edit" />
                              <AiOutlineDelete />
                           </div>
                        </div> */}
                        {/* <div className="AI__wrapper__inner__1__body__item">
                           <p>A bit down and unmotivated. The long hours and repetitive tasks are draining my enthusiasm.</p>
                           <div className="history--edit--delete">
                              <img src={edit} alt="Edit" />
                              <AiOutlineDelete />
                           </div>
                        </div> */}
                        {/* <div className="AI__wrapper__inner__1__body__item">
                           <p>The constant changes and high expectations are making it hard to relax.</p>
                           <div className="history--edit--delete">
                              <img src={edit} alt="Edit" />
                              <AiOutlineDelete />
                           </div>
                        </div> */}
                        {/* <div className="AI__wrapper__inner__1__body__item">
                           <p>I'm feeling frustrated and exhausted. It seems like there's always something urgent demanding my attention.</p>
                           <div className="history--edit--delete">
                              <img src={edit} alt="Edit" />
                              <AiOutlineDelete />
                           </div>
                        </div> */}
                        {/* <div className="AI__wrapper__inner__1__body__item">
                           <p>I'm feeling quite anxious and burnt out lately. The constant pressure and deadlines are taking a toll on me.</p>
                           <div className="history--edit--delete">
                              <img src={edit} alt="Edit" />
                              <AiOutlineDelete />
                           </div>
                        </div> */}
                        {/* <div className="AI__wrapper__inner__1__body__item">
                           <p>The long hours and repetitive tasks are draining my enthusiasm.</p>
                           <div className="history--edit--delete">
                              <img src={edit} alt="Edit" />
                              <AiOutlineDelete />
                           </div>
                        </div> */}
                        {/* <div className="AI__wrapper__inner__1__body__item">
                           <p>I'm feeling overwhelmed and stressed out with my workload. It's becoming difficult to keep up.</p>
                           <div className="history--edit--delete">
                              <img src={edit} alt="Edit" />
                              <AiOutlineDelete />
                           </div>
                        </div> */}
                        {/* <div className="AI__wrapper__inner__1__body__item">
                           <p>I'm feeling overwhelmed and stressed out with my workload. It's becoming difficult to keep up.</p>
                           <div className="history--edit--delete">
                              <img src={edit} alt="Edit" />
                              <AiOutlineDelete />
                           </div>
                        </div> */}
                     {/* </div> */}
                     {/* <div className="AI__wrapper__inner__1__footer">
                        <div className="AI__wrapper__inner__1__footer__item">
                           <AiOutlineDelete />
                           <p>Clear All Conversations</p>
                        </div>
                        <div className="AI__wrapper__inner__1__footer__item">
                           <BsFillSunFill />
                           <p>Switch Light Mode</p>
                        </div>
                        <div className="AI__wrapper__inner__1__footer__item">
                           <FiSettings />
                           <p>Settings</p>
                        </div>
                     </div> */}
                  {/* </div> */}
                  <div className=" AI__wrapper__inner__2">
                     <div className="AI__wrapper__inner__2__header">
                        <h3>Good Evening, John!🥳</h3>
                        <p>I'm here to help you. Please let me know what you need assistance with, and I'll do my best to provide the information or guidance you're looking for!</p>
                     </div>
                     <div className="AI__wrapper__inner__2__body mt--24 chat-container" ref={chatContainerRef}>
                        <div className="AI__wrapper__inner__2__body__chat chat--wrapper">
                           <div className="flex">
                              <div className="disp--block">
                                 <div className="flex">
                                    <img src={profileImg} alt="profileImg" />
                                    <div className="chat--item--meta">
                                       <label>You</label>
                                       {/* <label>1 min ago</label> */}
                                    </div>
                                 </div>
                              </div>
                              {/* <div className="flex gap--12">
                                 <FiThumbsUp className="chat--options" />
                                 <FiThumbsDown className="chat--options" />
                                 <HiDotsHorizontal className="chat--options" />
                              </div> */}
                           </div>
                           <p>{message}</p>
                        </div>
                        <div className="AI__wrapper__inner__2__body__chat chat--wrapper">
                           <div className="flex">
                              <div className="disp--block">
                                 <div className="flex">
                                    <img src={logo} alt="logo" />
                                    <div className="chat--item--meta">
                                       <label>Depresio Assistant</label>
                                       {/* <label>Just now</label> */}
                                    </div>
                                 </div>
                              </div>
                              {/* <div className="flex gap--12">
                                 <FiThumbsUp className="chat--options" />
                                 <FiThumbsDown className="chat--options" />
                                 <HiDotsHorizontal className="chat--options" />
                              </div> */}
                           </div>
                           <p className="chat--para">{response}</p>
                           {/* <p className="chat--para">Here are a few suggestions to help manage your situation:</p>
                           <p className="chat--para">Prioritize tasks: Identify the most important and urgent tasks and focus on those first. Break down larger tasks into smaller, more manageable steps. Delegate or seek support: If possible, delegate tasks to others or ask for assistance when needed. Collaboration can help lighten the workload and reduce stress. </p>
                           <p className="chat--para">
                              breaks: Make sure to schedule regular breaks during your workday. Use this time to relax, recharge, and engage in activities that help reduce stress, such as deep breathing exercises or going for a short walk. Practice time management: Use effective time management techniques, such as creating a schedule, setting realistic deadlines, and avoiding multitasking. This can help you stay organized and enhance productivity. Communicate and set boundaries:
                           </p> */}
                        </div>
                     </div>
                     <div className="AI__wrapper__inner__2__footer">
                        <div className="chat-suggestions">
                           <p>Chat Suggestions</p>
                           <div>
                              <label>Regenerate Response</label>
                              <label>Explain More</label>
                              <label>Expand Answer</label>
                           </div>
                        </div>
                        <div className="flex">
                           
                           <form onSubmit={handleSubmit}>
                              <div className="AI__wrapper__inner__2__footer__left">
                              <BsFillMicFill />
                                 <textarea 
                                    placeholder='You can ask me anything! I am here to help 🙂'
                                    value={message}
                                    onChange={(e)=> setMessage(e.target.value)}
                                 ></textarea>
                              </div>
                              <div className="AI__wrapper__inner__2__footer__right">
                                 
                                 <button type='submit' className="submit-button">
                                    <BsSendCheck />
                                 </button>
                              </div>
                           </form>
                           
                           
                           {/* <div className="AI__wrapper__inner__2__footer__left"> */}
                              {/* <BsFillMicFill /> */}
                              {/* <input */}
                                 {/* type="text" */}
                                 {/* placeholder="You can ask me anything! I am here to help 🙂" */}
                              {/* /> */}
                              {/* <p>You can ask me anything! I am here to help 🙂</p> */}
                           {/* </div> */}
                           {/* <div className="AI__wrapper__inner__2__footer__right"> */}
                              {/* <BsSendCheck /> */}
                           {/* </div> */}
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

export default AI_Assistant;
