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

   const [isRecording, setIsRecording] = useState(false);
   const [mediaRecorder, setMediaRecorder] = useState(null);

   // const stream = navigator.mediaDevices.getUserMedia({ audio: true });


   //Scroll to the bottom of the chat container whenever a new message is added
   useEffect(()=>{
      if (chatContainerRef.current){
         chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
      }
   }, [response]);

   // const startRecording = async () => {

   //    if (isRecording) {
   //      mediaRecorder.stop();
   //      console.log(mediaRecorder.state);
   //      setIsRecording(false);
   //    //   return;
   //    }

   //    if (!isRecording){
   //       mediaRecorder.start();
   //       console.log(mediaRecorder.state);
   //       setMediaRecorder(recorder);
   //    }
      
   //    try {
   //       const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
   //       const recorder = new MediaRecorder(stream);
   //       const audioChunks = [];
     
   //       recorder.ondataavailable = function(ev) {
   //         audioChunks.push(ev.data);
   //       };
   //       // console.log(recorder.onstop)
   //       recorder.onstop = async () => {
   //          console.log("data available after MediaRecorder.stop() called.");
   //          const audioBlob = new Blob(audioChunks);
   //          const formData = new FormData();
   //          formData.append('audio', audioBlob, 'userVoice.wav');
            
   //          console.log(formData);
   //          // Send the audio data to the Node.js backend
   //          // axios.post('http://localhost:5001/api/voice-input', formData)
   //          //    .then((response) => {
   //          //      const updatedChatLogWithVoice = [...chatLog, { user: "User", message: response.data.result }];
   //          //      setChatLog(updatedChatLogWithVoice);
   //          //      setMessage(response.data.result);
   //          //    })
   //          // .catch(error => console.error(error));
             
   //          // // Make an HTTP request to the backend API to analyze user input using axios
   //          // axios.post('http://localhost:5001/api/analyze', { message: message })
   //          // .then((response) => {
   //          //    const updatedChatLogWithAI = [...chatLog, { user: "AI_Consultant", message: response.data.result }];
   //          //    setChatLog(updatedChatLogWithAI)
   //          //    setResponse(response.data.result)
   //          // })
   //          // .catch((error) => console.error(error));

   //          // // Clear the input field after submitting
   //          // setMessage('');
   //          // console.log(chatLog)
   //       };
     
   //       setIsRecording(true);
   //       recorder.start();
   //       console.log(mediaRecorder.state);
   //       setMediaRecorder(recorder);
   //    }
   //    catch (error){
   //       console.error('Error accessing the microphone:', error);
   //    }

   // };
   const startRecording = (e) => {
      e.preventDefault();
  
      // No need to get the user's microphone every time.
      // Just check if we already have the MediaRecorder instance.
      if (mediaRecorder) {
          if (isRecording) {
              mediaRecorder.stop();
              setIsRecording(false);
              console.log("Recording stopped.");
          } else {
              mediaRecorder.start();
              setIsRecording(true);
              console.log("Recording started.");
          }
      } else {
          if (navigator.mediaDevices) {
              console.log("getUserMedia supported.");
              const constraints = { audio: true };
              let chunks = [];
  
              navigator.mediaDevices
                  .getUserMedia(constraints)
                  .then((stream) => {
                        const newMediaRecorder = new MediaRecorder(stream);
  
                        newMediaRecorder.ondataavailable = (e) => {
                          chunks.push(e.data);
                        };
  
                        newMediaRecorder.onstop = (e) => {
                           console.log("data available after MediaRecorder.stop() called.");

                           const audioBlob = new Blob(chunks);
                           const formData = new FormData();
                           formData.append('audio', audioBlob, 'userVoice.wav');

                           for (let pair of formData.entries()) {
                              console.log(pair[0] + ': ' + pair[1]);
                           }

                           // Send the audio data to the Node.js backend
                           axios.post('http://localhost:5001/api/voice-input', formData)
                           .then((response) => {
                              // const updatedChatLogWithVoice = [...chatLog, { user: "User", message: response.data.result }];
                              // setChatLog(updatedChatLogWithVoice);
                              // setMessage(response.data.result);
                              console.log('response.data.result')
                           })
                           .catch(error => console.error(error));
                          
                        };
  
                      // Set the mediaRecorder state so we can use it next time
                      setMediaRecorder(newMediaRecorder);
                      newMediaRecorder.start();
                      setIsRecording(true);
                      console.log("Recording started.");
                  })
                  .catch((err) => {
                      console.error(`The following error occurred: ${err}`);
                  });
          }
      }
  };
  

   const handleSubmit = (e) => {
      e.preventDefault();
      const updatedChatLog = [...chatLog, { user: "User", message: message }];
      setChatLog(updatedChatLog)

      // Make an HTTP request to the backend API to analyze user input using axios
      axios
         .post('http://localhost:5001/api/analyze', { message: message })
         .then((response) => {
            const updatedChatLogWithAI = [...updatedChatLog, { user: "AI_Consultant", message: response.data.result }];
            setChatLog(updatedChatLogWithAI)
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
                        {chatLog.map((chat, index) => (
                           <div
                              key={index}
                              className={`AI__wrapper__inner__2__body__chat chat--wrapper ${chat.user === "AI_Consultant" ? "ai-message" : "user-message"}`}>
                              <div className="flex">
                                 <div className="disp--block">
                                    <div className="flex">
                                       <img src={chat.user === "AI_Consultant" ? logo : profileImg} alt={chat.user} />
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

                                 <button type='button' className='record_button' onClick={startRecording}>
                                    <BsFillMicFill />
                                 </button>
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
