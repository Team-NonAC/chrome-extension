// content.js

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === "changeContrast") {
    // Replace this with your own logic to change the color scheme
    // For demonstration purposes, let's invert the colors
    document.body.style.filter = "invert(100%)";
  }
});
