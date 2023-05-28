// background.js
try{
  // Track URLs and time spent on each page
  let startTime = 0;
  let previousUrl = '';
  let timeSpent = 0;
  let elapsedTime = 0; 
  // let Vtitle = '';


  // // YouTube API Key
  // const apiKey = 'AIzaSyDKFRkk0HQWBIXQqQjaDW9-Fz9opaFkZys';

  // // Function to extract content name from YouTube URL
  // function getContentName(url) {
  //   // Extract video ID from YouTube URL
  //   const videoId = url.match(/(?<=v=|v\/|embed\/|youtu.be\/|\/v\/|\/e\/|watch\?v=|youtube.com\/embed\/)([^#\&\?]*).*/i)[1];

  //   // Make API request to get video details
  //   fetch(`https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${apiKey}`)
  //     .then(response => response.json())
  //     .then(data => {
  //       // Extract video title from the response
  //       Vtitle = data.items[0].snippet.title;
        
  //       // Use the video title as needed
  //       console.log('Video Title:', Vtitle);
  //     })
  //     .catch(error => {
  //       console.log('Error:', error);
  //     });

  // }

  // Example usage
  // const youtubeURL = 'https://www.youtube.com/watch?v=VIDEO_ID';
  // getContentName(youtubeURL);



  // Add a listener to track page transitions
  chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    if (changeInfo.url && (changeInfo.url.startsWith('http')) || changeInfo.url.startsWith('https')) {
      startTime = new Date().getTime();
      // trackPageVisit(tab);
      previousUrl = tab.url;
      // Vtitle = getContentName(previousUrl);

      // Update the timer every second
      setInterval(() => {
        if (startTime) {
          // Calculate the elapsed time in seconds
          elapsedTime = Math.round((new Date().getTime() - startTime) / 1000);
          // timerElement.innerText = `Page opened: ${elapsedTime} seconds ago`;
        }
      }, 1000);

    }
  });


  // Add a listener to respond to popup requests for previous URL and time spent
  chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.action === 'getPreviousData') {
      sendResponse({
        previousUrl: previousUrl,
        timeSpent: elapsedTime,
        // title: Vtitle,
      });
    }
  });

} catch(e){
  console.error(e);
}
