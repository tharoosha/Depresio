import React, { useEffect, useState, useRef } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/AI.scss';
import profileImg from '../images/chat-user.svg';
import logo from '../images/depresio-logo-bg-removed.jpeg';
import { BsFillMicFill, BsSendCheck } from 'react-icons/bs';
import useFetch from '../hooks/fetch.hook';
import { useAuthStore } from '../store/store';
import { MediaRecorder, register } from 'extendable-media-recorder';
import { connect } from 'extendable-media-recorder-wav-encoder';
// import 'dotenv/config';


import axios from 'axios';

const AI_Assistant = () => {
   const { username } = useAuthStore((state) => state.auth);
   const [{ isLoading, apiData, serverError }] = useFetch(`/user/${username}`);
   let voice_message;

   const [message, setMessage] = useState('');
   const [response, setResponse] = useState('');
   const [chatLog, setChatLog] = useState([]);
   const [emotion, setEmotion] = useState('');
   const [recommendations, setRecommendations] = useState('');

   const chatContainerRef = useRef(null);

   const [isRecording, setIsRecording] = useState(false);
   // const [mediaRecorder, setMediaRecorder] = useState(null);
   const mediaRecorderRef = useRef(null);

   // const stream = navigator.mediaDevices.getUserMedia({ audio: true });

   //Scroll to the bottom of the chat container whenever a new message is added
   useEffect(() => {
      if (chatContainerRef.current) {
         chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
      }
   }, [response]);

   // useEffect(() =>  {
   //    axios.get('${process.env.SERVER_ENDPOINT}/api/spotify_recommend', { mood: emotion })
   //    .then((response) => {
   //       setRecommendations(response.data);
   //       console.log(response.data);
   //    })
   //    .catch((error) => console.error(error))
   // }, [emotion]);

   const startRecording = async () => {
      if (isRecording) {
         if (mediaRecorderRef.current) {
            mediaRecorderRef.current.stop();
            setIsRecording(false);
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

            const audio = formData.get('audio');
            console.log(audio);

            // Send the audio data to the Node.js backend
            axios
               .post(`${process.env.REACT_APP_SERVER_ENDPOINT}/api/voice-input`, formData)
               .then((response) => {
                  console.log(response.data.result);
                  let data = response.data.result;
                  data = String(data);
                  const updatedChatLogWithVoice = [...chatLog, { user: 'User', message: data }];
                  setChatLog(updatedChatLogWithVoice);
                  // setMessage(response.data.result);

                  const voice_message = response.data.result;

                  // console.log(chatLog)
                  // Make an HTTP request to the backend API to analyze user input using axios
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
                        // console.log(response.data.emotion)
                     })
                     .catch((error) => console.error(error));
                  // console.log(chatLog);
                  console.log(emotion);
               })
               .catch((error) => console.error(error));
         };

         setIsRecording(true);
         mediaRecorderRef.current.start();
         // console.log(mediaRecorder.state);
         // setMediaRecorder(recorder);
      } catch (error) {
         console.error('Error accessing the microphone:', error);
      }
   };

   const handleSubmit = (e) => {
      e.preventDefault();
      const updatedChatLog = [...chatLog, { user: 'User', message: message }];
      setChatLog(updatedChatLog);
      // console.log('{$process.env.REACT_APP_SERVER_ENDPOINT}')

      

      // Make an HTTP request to the backend API to analyze user input using axios
      axios
         .post(`${process.env.REACT_APP_SERVER_ENDPOINT}/api/analyze`, { message: message })
         .then((response) => {
            const updatedChatLogWithAI = [...updatedChatLog, { user: 'AI_Consultant', message: response.data.result }];
            setChatLog(updatedChatLogWithAI);
            setResponse(response.data.result);
            // console.log(response.data.result)
         })
         .catch((error) => console.error(error));

      axios
         .post(`${process.env.REACT_APP_SERVER_ENDPOINT}/api/emotion_analyze`, { message: message })
         .then((response) => {
            setEmotion(response.data.emotion);
            console.log(emotion)
         })
         .catch((error) => console.error(error));
      // Clear the input field after submitting
      setMessage('');
      // console.log(chatLog);
      // console.log(emotion);
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
                                          {/* <label>Timestamp logic here</label> */}
                                       </div>
                                    </div>
                                 </div>
                              </div>
                              <p className={`chat--para ${chat.user === 'AI_Consultant' ? 'ai-text' : 'user-text'}`}>{chat.message}</p>
                           </div>
                        ))}
                     </div>
                     <div className="AI__wrapper__inner__2__footer">
                        <div className="flex">
                           <form onSubmit={handleSubmit}>
                              <div className="AI__wrapper__inner__2__footer__left">
                                 <textarea placeholder="You can ask me anything! I am here to help 🙂" value={message} onChange={(e) => setMessage(e.target.value)}></textarea>
                              </div>
                              <div className="btn-flex-container">
                                 <div className="AI__wrapper__inner__2__footer__right">
                                    <button type="submit" className="submit-button">
                                       <BsSendCheck />
                                    </button>
                                 </div>
                                 <div className="AI__wrapper__inner__2__footer__right-2">
                                    <button type="button" className="record_button" onClick={startRecording}>
                                       <BsFillMicFill />
                                    </button>
                                 </div>
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
