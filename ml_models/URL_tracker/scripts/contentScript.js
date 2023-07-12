//contentScript.js

(()=>{

    chrome.runtime.onMessage.addListener((obj, sender, respond)=>{
        const {type, startTime} = obj;
        elapsedTime =  0;

        if(type = "NEW"){
            setInterval(() => {
                if (startTime) {
                  // Calculate the elapsed time in seconds
                  elapsedTime = Math.round((new Date().getTime() - startTime) / 1000);
                  if (elapsedTime > 10) { // 15 minutes = 900 seconds
                    chrome.runtime.sendMessage({ action: 'exceededTime' });
                  }
                }
            }, 1000);
        }
        
    });
    

});



