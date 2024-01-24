var contrastCard = document.getElementById("contrast-card");

// Add a click event listener to the contrast card
contrastCard.addEventListener("click", function () {
  // Get the current active tab
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    // Inject a content script into the tab
    chrome.tabs.executeScript(tabs[0].id, {
      // The code to change the contrast of the website
      code: 'document.body.style.filter = "contrast(200%)"',
    });
  });
});

// popup.js

var highlightLinksCard = document.getElementById("highlight-links");

highlightLinksCard.addEventListener("click", highlightLinks);

function highlightLinks() {
  chrome.tabs.query({ active: true, currentWindow: true }, injectScript);
}

function injectScript(tabs) {
  chrome.tabs.executeScript(tabs[0].id, { code: changeLinkStyle });
}

var changeLinkStyle = `
  var links = document.getElementsByTagName("a");
  for (var i = 0; i < links.length; i++) {
    links[i].style.fontSize = "120%";
    links[i].style.backgroundColor = "yellow";
    links[i].style.color = "black";
  }
`;

// popup.js

var increaseFontCard = document.getElementById("increase-font");

increaseFontCard.addEventListener("click", increaseFontSizes);

function increaseFontSizes() {
  chrome.tabs.query({ active: true, currentWindow: true }, injectScript);
}

function injectScript(tabs) {
  chrome.tabs.executeScript(tabs[0].id, { code: changeFontSizes });
}

var changeFontSizes = `
  var elements = document.getElementsByTagName("*");
  for (var i = 0; i < elements.length; i++) {
    var fontSize = window.getComputedStyle(elements[i]).fontSize;
    var fontSizeInPixels = parseFloat(fontSize);
    var newFontSize = fontSizeInPixels * 1.1;
    elements[i].style.fontSize = newFontSize + "px";
  }
`;

// popup.js

// Get the reset button element
var resetButton = document.querySelector(".reset-button");

// Add a click event listener to the reset button
resetButton.addEventListener("click", function () {
  // Get the current active tab
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    // Reload the current tab
    chrome.tabs.reload(tabs[0].id);
  });
});

var stopAnimationCard = document.querySelector("#stop-animation-card");

// Add a click event listener to the stop-animation card
stopAnimationCard.addEventListener("click", function () {
  // Get all the elements with animations on the page
  var animatedElements = document.querySelectorAll("*[class*='animate']");
  // Loop through the animated elements
  for (var i = 0; i < animatedElements.length; i++) {
    // Pause the animation by setting the animation-play-state property to paused
    animatedElements[i].style.animationPlayState = "paused";
  }
});

var removeImagesCard = document.querySelector("#remove-images");

removeImagesCard.addEventListener("click", function () {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.executeScript(tabs[0].id, {
      code: `
          var images = document.querySelectorAll("img");
          for (var i = 0; i < images.length; i++) {
            var emptyImage = new Image();
            emptyImage.src = "data:image/svg+xml;charset=utf-8,<svg xmlns='http://www.w3.org/2000/svg' width='" + images[i].width + "' height='" + images[i].height + "'><rect x='0' y='0' width='" + images[i].width + "' height='" + images[i].height + "' fill='grey'/></svg>";
            images[i].parentNode.replaceChild(emptyImage, images[i]);
          }
        `,
    });
  });
});
