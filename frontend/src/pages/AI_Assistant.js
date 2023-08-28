import React, { useEffect, useState, useRef }  from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/AI.scss';
import profileImg from '../images/chat-user.svg';
import logo from '../images/depresio-logo-bg-removed.jpeg';
import { BsFillMicFill, BsSendCheck } from 'react-icons/bs';
import useFetch from '../hooks/fetch.hook';
import { useAuthStore } from '../store/store'



import axios from 'axios';

const AI_Assistant = () => {

   const { username } = useAuthStore(state => state.auth)
   const [{ isLoading, apiData, serverError }] = useFetch(`/user/${username}`)


   const [message, setMessage] = useState('');
   const [response, setResponse] = useState('');
   const [chatLog, setChatLog] = useState([]);

   const chatContainerRef = useRef(null);
   //Scroll to the bottom of the chat container whenever a new message is added
   useEffect(()=>{
      if (chatContainerRef.current){
         chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
      }
   }, [response]);


   const handleSubmit = (e) => {
      e.preventDefault();
      console.log(message)
      setChatLog([...chatLog, { user: "User", message: message}])

      // Make an HTTP request to the backend API to analyze user input using axios
      axios
         .post('http://localhost:3000/api/analyze', { message: message })
         .then((response) => {
            setChatLog([...chatLog, {user: "AI_Consultant", message: response.data.result}])
            setResponse(response.data.result)
         })
         .catch((error) => console.error(error));

      // Clear the input field after submitting
      setMessage('');
      console.log(chatLog)
   };


   return (

      <>
         <Header />
         <div className="AI mt--24 mb--48">
            <div className="container">
               <div className="AI__wrapper">
                  <div className=" AI__wrapper__inner__2">
                     <div className="AI__wrapper__inner__2__header">
                        <h3>Good Evening, {apiData?.firstName || apiData?.username}!🥳</h3>
                        <p>I'm here to help you. Please let me know what you need assistance with, and I'll do my best to provide the information or guidance you're looking for!</p>
                     </div>
                     <div className="AI__wrapper__inner__2__body mt--24 chat-container" ref={chatContainerRef}>
                        {/* <div className="AI__wrapper__inner__2__body__chat chat--wrapper">
                           <div className="flex">
                              <div className="disp--block">
                                 <div className="flex">
                                    <img src={profileImg} alt="profileImg" />
                                    <div className="chat--item--meta">
                                       <label>You</label>
                                    </div>
                                 </div>
                              </div>
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
                                    </div>
                                 </div>
                              </div>
                              
                           </div>
                           <p className="chat--para">{response}</p>
                        </div> */}
                        {chatLog.map((chat, index) => (
                           <div
                              key={index}
                              className={`AI__wrapper__inner__2__body__chat chat--wrapper ${chat.user === "AI_Consultant" ? "ai-message" : "user-message"}`}>
                              <div className="flex">
                                 <div className="disp--block">
                                    <div className="flex">
                                       <img src={chat.user === "AI-Consultant" ? logo : profileImg} alt={chat.user} />
                                       <div className="chat--item--meta">
                                          <label>{chat.user === "AI_Consultant" ? "Depresio Assistant" : "You"}</label>
                                          {/* <label>Timestamp logic here</label> */}
                                       </div>
                                    </div>
                                 </div>
                              </div>
                              <p className={`chat--para ${chat.user === "AI_Consultant" ? "ai-text" : "user-text"}`}>{chat.message}</p>
                           </div>
                        ))}
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
