// popup.js

// Function to retrieve data from the background script
chrome.runtime.sendMessage({ action: 'exceededTime' }, function(response) {
  const currentUrlElement = document.getElementById('currentUrl');
  const timeSpentElement = document.getElementById('exceededTime');
  // const videotitleElement = document.getElementById('Vtitle');

  if (response) {
    currentUrlElement.textContent = response.currentUrl;
    timeSpentElement.textContent = response.exceededTime;
    // videotitleElement.textContent = response.Vtitle;
  } else {
    previousUrlElement.textContent = 'N/A';
    timeSpentElement.textContent = 'N/A';
    // videotitleElement.textContent = 'N/A';
  }


  // if (response.timeSpent >= 20){
  //   alert(`you are spending too much on ${response.previousUrl}`);
  // }
});
