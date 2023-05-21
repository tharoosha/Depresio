// background.js
try{
  // Track URLs and time spent on each page
  let startTime = new Date().getTime();
  let previousUrl = '';
  let timeSpent = 0;

  function trackPageVisit(tab) {
    const currentTime = new Date().getTime();
    const elapsedTime = Math.round((currentTime - startTime) / 1000); // Calculate elapsed time in seconds
    const currentUrl = tab.url;

    // Log the previous URL and the time spent on that page
    console.log(`Visited URL: ${previousUrl}`);
    console.log(`Time spent on the previous page: ${elapsedTime} seconds`);

    // Update the previous URL and start time for the next page
    previousUrl = currentUrl;
    timeSpent = elapsedTime;

    // Update the start time for the next page
    startTime = currentTime;
  }

  // Add a listener to track page transitions
  chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    if (changeInfo.url && changeInfo.url.startsWith('http')) {
      trackPageVisit(tab);
    }
  });

  // Add a listener to respond to popup requests for previous URL and time spent
  chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.action === 'getPreviousData') {
      sendResponse({
        previousUrl: previousUrl,
        timeSpent: timeSpent,
      });
    }
  });

} catch(e){
  console.error(e);
}
