// popup.js

// Function to retrieve data from the background script
chrome.runtime.sendMessage({ action: 'getPreviousData' }, function(response) {
  const previousUrlElement = document.getElementById('previousUrl');
  const timeSpentElement = document.getElementById('timeSpent');
  // const videotitleElement = document.getElementById('Vtitle');

  if (response) {
    previousUrlElement.textContent = response.previousUrl;
    timeSpentElement.textContent = response.timeSpent;
    // videotitleElement.textContent = response.Vtitle;
  } else {
    previousUrlElement.textContent = 'N/A';
    timeSpentElement.textContent = 'N/A';
    // videotitleElement.textContent = 'N/A';
  }


  if (response.timeSpent >= 20){
    alert(`you are spending too much on ${response.previousUrl}`);
  }
});
