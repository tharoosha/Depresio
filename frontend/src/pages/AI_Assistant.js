import React, { useEffect, useState, useRef } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/AI.scss';
import profileImg from '../images/chat-user.svg';
import aiLoader from '../images/ai-loader.gif';
import aiLoaderNew from '../images/ai-loader-new.gif';
import recordingGif from '../images/recording.gif';
import logo from '../images/depresio-logo-bg-removed.jpeg';
import { BsFillMicFill, BsSendCheck } from 'react-icons/bs';
import useFetch from '../hooks/fetch.hook';
import { useAuthStore } from '../store/store';
import { MediaRecorder, register } from 'extendable-media-recorder';
import { connect } from 'extendable-media-recorder-wav-encoder';
// import 'dotenv/config';
import { updateRecommendation } from '../helper/helper'


import axios from 'axios';

const AI_Assistant = () => {
   const { username } = useAuthStore((state) => state.auth);
   const [{ isLoading, apiData, serverError }] = useFetch(`/user/${username}`);
   let voice_message;

   const [message, setMessage] = useState('');
   const [response, setResponse] = useState('');
   const [chatLog, setChatLog] = useState([]);
   const [emotion, setEmotion] = useState('');
   const [loading, setLoading] = useState(false);
   const [recording, setRecording] = useState(false);

   const chatContainerRef = useRef(null);
   const mediaRecorderRef = useRef(null);

   useEffect(() => {
      if (chatContainerRef.current) {
         chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
      }
   }, [response]);





   const startRecording = async () => {
      if (recording) {
         if (mediaRecorderRef.current) {
            mediaRecorderRef.current.stop();
            setRecording(false);
         }
         return;
      }
      try {
         if (mediaRecorderRef.current === null) {
            await register(await connect());
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            mediaRecorderRef.current = new MediaRecorder(stream, { mimeType: 'audio/wav' });
         }
         const audioChunks = [];
         mediaRecorderRef.current.ondataavailable = function (ev) {
            audioChunks.push(ev.data);
         };

         mediaRecorderRef.current.onstop = async () => {

            console.log('data available after MediaRecorder.stop() called.');
            
            const audioBlob = new Blob(audioChunks);
            const formData = new FormData();
            const audioFile = new File([audioBlob], 'userVoice.wav', { type: 'audio/wav' });
            
            formData.append('audio', audioFile);
            
            setLoading(true);
            
            setRecording(false); // Set recording to false when audio is sent
            
            axios
               .post(`${process.env.REACT_APP_SERVER_ENDPOINT}/api/voice-input`, formData)
               .then((response) => {
                  console.log(response.data.result);
                  let data = response.data.result;
                  data = String(data);
                  const updatedChatLogWithVoice = [...chatLog, { user: 'User', message: data }];
                  setChatLog(updatedChatLogWithVoice);
                  const voice_message = response.data.result;
                  axios
                     .post(`${process.env.REACT_APP_SERVER_ENDPOINT}/api/analyze`, { message: voice_message })
                     .then((response) => {
                        const updatedChatLogWithAI = [...chatLog, { user: 'User', message: voice_message }, { user: 'AI_Consultant', message: response.data.result }];
                        setChatLog(updatedChatLogWithAI);
                        setResponse(response.data.result);
                     })
                     .catch((error) => console.error(error));
                  axios
                     .post(`${process.env.REACT_APP_SERVER_ENDPOINT}/api/emotion_analyze`, { message: voice_message })
                     .then((response) => {
                        setEmotion(response.data.emotion);
                        updateRecommendation({"recommendation" : emotion})
                        console.log('database update done')
                     })
                     .catch((error) => console.error(error));
                  setLoading(false);
               })
               .catch((error) => {
                  console.error(error);
                  setLoading(false);
               });
         };
         setRecording(true);
         mediaRecorderRef.current.start();
      } catch (error) {
         console.error('Error accessing the microphone:', error);
      }
   };

   const handleSubmit = (e) => {
      e.preventDefault();
      const updatedChatLog = [...chatLog, { user: 'User', message: message }];
      setChatLog(updatedChatLog);
      // console.log('{$process.env.REACT_APP_SERVER_ENDPOINT}')

      

      setLoading(true);

      // axios
      //    .post(`${process.env.REACT_APP_SERVER_ENDPOINT}/api/analyze`, { message: message })
      //    .then((response) => {
      //       const updatedChatLogWithAI = [...updatedChatLog, { user: 'AI_Consultant', message: response.data.result }];
      //       setChatLog(updatedChatLogWithAI);
      //       setResponse(response.data.result);
      //       setLoading(false);
      //    })
      //    .catch((error) => {
      //       console.error(error);
      //       setLoading(false);
      //    });

      axios
         .post(`${process.env.REACT_APP_SERVER_ENDPOINT}/api/emotion_analyze`, { message: message })
         .then((response) => {
            setEmotion(response.data.emotion);

            console.log(emotion);
            updateRecommendation({emotion})
            console.log('database update done')

         })
         .catch((error) => console.error(error));

      setMessage('');
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
                        {chatLog.map((chat, index) => (
                           <div key={index} className={`AI__wrapper__inner__2__body__chat chat--wrapper ${chat.user === 'AI_Consultant' ? 'ai-message' : 'user-message'}`}>
                              <div className="flex">
                                 <div className="disp--block">
                                    <div className="flex">
                                       <img src={chat.user === 'AI_Consultant' ? logo : profileImg} alt={chat.user} />
                                       <div className="chat--item--meta">
                                          <label>{chat.user === 'AI_Consultant' ? 'Depresio Assistant' : 'You'}</label>
                                       </div>
                                    </div>
                                 </div>
                              </div>
                              <p className={`chat--para ${chat.user === 'AI_Consultant' ? 'ai-text' : 'user-text'}`}>{chat.message}</p>
                           </div>
                        ))}
                     </div>
                     {loading && (
                        <div className="loader ai-loader">
                           <img src={aiLoaderNew} alt="Loading..." />
                        </div>
                     )}
                     <div className="AI__wrapper__inner__2__footer">
                        <div className="flex">
                           <form onSubmit={handleSubmit}>
                              <div className="AI__wrapper__inner__2__footer__left">
                                 <textarea placeholder="You can ask me anything! I am here to help 🙂" value={message} onChange={(e) => setMessage(e.target.value)}></textarea>
                              </div>
                              <div className="btn-flex-container assistant-main-btns">
                                 <button type="submit" className="submit-button">
                                    <BsSendCheck />
                                 </button>
                                 <button type="button" className="record_button" onClick={startRecording}>
                                    {recording ? (
                                       <div className="wave">
                                          <div className="dot"></div>
                                          <div className="dot"></div>
                                          <div className="dot"></div>
                                       </div>
                                    ) : (
                                       <BsFillMicFill />
                                    )}
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
