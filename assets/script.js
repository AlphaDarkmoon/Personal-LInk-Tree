/*==========================================================================
   Template Name: LinkForest
   Author: AlphaDarkmoon --RekkusuYash
   Template URL: https://github.com/AlphaDarkmoon/LinkForest 
   Author URL: https://github.com/AlphaDarkmoon
   File Description : Main JavaScript file of the LinkForest
==========================================================================*/

/*==========================================================================
  Table of Contents
==========================================================================

  1. Constructor and Typing Animation
  2. Window Load Event Handler
  3. Document Ready Event Handlers
    3.1 Splash Screen Fade Out
    3.2 Toggle Profile Image Class

==========================================================================*/


// Constructor function for typing animation
var TxtType = function (el, toRotate, period) {
  this.toRotate = toRotate;
  this.el = el;
  this.loopNum = 0;
  this.period = parseInt(period, 10) || 2000; // Default period is 2000 milliseconds
  this.txt = "";
  this.tick(); // Start typing animation
  this.isDeleting = false;
};

// Method to handle typing animation
TxtType.prototype.tick = function () {
  var i = this.loopNum % this.toRotate.length;
  var fullTxt = this.toRotate[i];

  // Update the typed text
  if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
  } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
  }

  // Update the HTML element to display the typed text
  this.el.innerHTML = '<span class="wrap">' + this.txt + "</span>";

  var that = this;
  var delta = 200 - Math.random() * 100;

  if (this.isDeleting) {
    delta /= 2;
  }

  // Adjust delta based on typing state
  if (!this.isDeleting && this.txt === fullTxt) {
    delta = this.period;
    this.isDeleting = true;
  } else if (this.isDeleting && this.txt === "") {
    this.isDeleting = false;
    this.loopNum++;
    delta = 500;
  }

  // Schedule the next update
  setTimeout(function () {
    that.tick();
  }, delta);
};

// Run when the window is loaded
window.onload = function () {
  var elements = document.getElementsByClassName("typewrite");
  for (var i = 0; i < elements.length; i++) {
    var toRotate = elements[i].getAttribute("data-type");
    var period = elements[i].getAttribute("data-period");
    if (toRotate) {
      new TxtType(elements[i], JSON.parse(toRotate), period); // Initialize typing animation
    }
  }
  // INJECT CSS
  var css = document.createElement("style");
  css.type = "text/css";
  css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #fff}";
  document.body.appendChild(css); // Add CSS for typing effect
};

// Run when the document is ready
$(document).ready(function () {
  // Show splash screen and fade out
  $("#splash-screen").delay(500).fadeOut("slow", function () {
    // Fade out the splash screen and show the main content
    $("#main-content").fadeIn("slow");
  });
});

// Run when the document is ready
$(document).ready(function () {
  const box = $(".profile-img");
  box.toggleClass(".profile-img-rev"); // Toggle a CSS class for the profile image
});

// Opens a Popup when click on session
function showPopup() {
  const popup = document.getElementById('popup');
  popup.style.display = 'block';
}

function closePopup() {
  const popup = document.getElementById('popup');
  popup.style.display = 'none';
}

function copyText() {
  const textToCopy = document.querySelector('.popup-content p').innerText;

  // Create a textarea element to hold the text to copy
  const textarea = document.createElement('textarea');
  textarea.value = textToCopy;
  document.body.appendChild(textarea);

  // Select and copy the text
  textarea.select();
  document.execCommand('copy');

  // Remove the textarea element
  document.body.removeChild(textarea);
}