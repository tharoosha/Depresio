// popup.js

// Function to retrieve data from the background script
chrome.runtime.sendMessage({ action: 'getPreviousData' }, function(response) {
    const previousUrlElement = document.getElementById('previousUrl');
    const timeSpentElement = document.getElementById('timeSpent');
  
    if (response) {
      previousUrlElement.textContent = response.previousUrl;
      timeSpentElement.textContent = response.timeSpent;
    } else {
      previousUrlElement.textContent = 'N/A';
      timeSpentElement.textContent = 'N/A';
    }
  });
  