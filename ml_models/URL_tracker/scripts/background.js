//  // background.js
try{
  // Track URLs and time spent on each page
  let startTime = 0;
  let currentUrl = '';
  let YtabId = '';
  let timeSpent = 0;
  let elapsedTime = 0; 

  let isYoutubetrans = false;
  let isYoutubeActive = false;
  let isYoutubecreation = false;

  chrome.action.setBadgeText({ 'text': '?'});
  chrome.action.setBadgeBackgroundColor({ 'color': "#777" });

  function FormatDuration(d) {
    if (d < 0) {
      return "?";
    }
    var divisor = d < 3600000 ? [60000, 1000] : [3600000, 60000];
    function pad(x) {
      return x < 10 ? "0" + x : x;
    }
    return Math.floor(d / divisor[0]) + ":" + pad(Math.floor((d % divisor[0]) / divisor[1]));
  }

  function convertSecondsToMMSS(seconds) {
    var minutes = Math.floor(seconds / 60);
    var remainingSeconds = seconds % 60;
    var minutesStr = minutes < 10 ? "0" + minutes : minutes.toString();
    var secondsStr = remainingSeconds < 10 ? "0" + remainingSeconds : remainingSeconds.toString();
    return minutesStr + ":" + secondsStr;
  }

  function UpdateBadges() {
    var now = new Date();
    var description = convertSecondsToMMSS(timeSpent + elapsedTime);
    console.log(convertSecondsToMMSS(timeSpent + elapsedTime));
    chrome.action.setBadgeText({'text': description});
  }
  
  setInterval(UpdateBadges, 1000);

  function getCurrentTimeInSeconds() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    
    const totalSeconds = (hours * 3600) + (minutes * 60) + seconds;
    return totalSeconds;
  }
  
  // Example usage
  const currentTimeInSeconds = getCurrentTimeInSeconds();

  const intervalId = setInterval(timer, 1000);

  function timer(){
    if (!isYoutubetrans && isYoutubeActive && isYoutubecreation){
      elapsedTime = Math.round((new Date().getTime() - startTime) / 1000);
      chrome.action.setBadgeBackgroundColor({ 'color': "#FF0000" });
      // timeSpent = elapsedTime
    }else if (isYoutubetrans && isYoutubeActive && !isYoutubecreation){
      elapsedTime = Math.round((new Date().getTime() - startTime) / 1000);
      chrome.action.setBadgeBackgroundColor({ 'color': "#FF0000" });
      // timeSpent += elapsedTime;
      // isYoutubecreation = true;
    } else if (!isYoutubetrans && isYoutubeActive && !isYoutubecreation){
      chrome.action.setBadgeBackgroundColor({ 'color': "#777" });
      timeSpent += elapsedTime;
      elapsedTime = 0;
    }
  }

  function handleTabUpdate (tabId, changeInfo, tab){
    if (tab.url && tab.url.includes("youtube.com/watch")) {
      console.log("update url..", tabId);
      currentUrl = tab.url;
      YtabId = tabId;
      isYoutubecreation = true;
      isYoutubeActive = true;
      isYoutubetrans = false;
      startTime = new Date().getTime();
      console.log(startTime,elapsedTime,timeSpent);

      const queryParameters = tab.url.split("?")[1];
      const urlParameters = new URLSearchParams(queryParameters);
    }
  }

  // Function to handle tab removal
  function handleTabRemoval(tabId, removeInfo){
      if (YtabId == tabId) {
        isYoutube = false;
        isYoutubeActive = false;
        isYoutubecreation = false;
        timeSpent += elapsedTime;
        elapsedTime = 0;
        clearInterval(intervalId);
        console.log('tab removed..', currentUrl);
      }
  }
  
  // Function to handle page transitions
  function handlePageTransition(activeInfo) {
    let gettingTab = chrome.tabs.get(activeInfo.tabId);

    gettingTab.then((tab) => {
      if (tab.url.includes('youtube.com/watch') && isYoutubeActive) {
        // Transition to YouTube page from another page
        isYoutubeActive = true;
        isYoutubetrans = true;
        isYoutubecreation = false;
        startTime = new Date().getTime();
        console.log('Transition to YouTube page:', tab.url);
        console.log(startTime,elapsedTime,timeSpent);
      }else if(!(tab.url.includes("youtube.com/watch")) && isYoutubeActive){
        // Transition to another page from YouTube
        isYoutubeActive = true;
        isYoutubetrans = false;
        isYoutubecreation = false
        console.log('Transition from YouTube to another page:', tab.url);
        console.log(startTime,elapsedTime,timeSpent);

      }
    });
    
  }

  // Add a listener to respond to popup requests for previous URL and time spent
  chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.action === 'exceededTime') {
      sendResponse({
        exceededTime: timeSpent + elapsedTime,
        currentUrl: currentUrl
      });
    }
  });

  // Listener for page transitions
  // chrome.webNavigation.onCommitted.addListener(handlePageTransition);
  chrome.tabs.onActivated.addListener(handlePageTransition)

  // Listener for tab removal
  chrome.tabs.onRemoved.addListener(handleTabRemoval);
  // Add a listener to track page transitions
  chrome.tabs.onUpdated.addListener(handleTabUpdate);

} catch(e){
  console.error(e);
}





