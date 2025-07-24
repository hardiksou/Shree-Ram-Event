const events = [
  "Smoke Fire Entry",
  "Balloon Decoration",
  "Selfie Video Machine",
  "LED Photo Lighting",
  "CO2 Machine",
  "Varmala Machine",
  "Full Decoration"
];

let currentEvent = 0;
let currentChar = 0;
let typingSpeed = 120;

function typeText() {
  const textElement = document.getElementById("typed-text");
  if (currentChar < events[currentEvent].length) {
    textElement.textContent += events[currentEvent].charAt(currentChar);
    currentChar++;
    setTimeout(typeText, typingSpeed);
  } else {
    setTimeout(eraseText, 2000);
  }
}

function eraseText() {
  const textElement = document.getElementById("typed-text");
  if (currentChar > 0) {
    textElement.textContent = textElement.textContent.slice(0, -1);
    currentChar--;
    setTimeout(eraseText, 50);
  } else {
    currentEvent = (currentEvent + 1) % events.length;
    setTimeout(typeText, 500);
  }
}

typeText();

//gallery js
let slideIndex = 1;
showSlides(slideIndex);

function plusDivs(n) {
    showSlides(slideIndex += n);
}

function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("mySlides");
    if (n > slides.length) { slideIndex = 1; }
    if (n < 1) { slideIndex = slides.length; }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slides[slideIndex - 1].style.display = "block";
}

// Auto slideshowlet slideIndex = 1;
showSlides(slideIndex);

function plusDivs(n) {
    showSlides(slideIndex += n);
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("mySlides");
    let dots = document.getElementsByClassName("dot");
    if (n > slides.length) { slideIndex = 1; }
    if (n < 1) { slideIndex = slides.length; }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";
}

setInterval(() => {
    plusDivs(1);
}, 4000); // 4 seconds interval
// setInterval(() => {
//     plusDivs(1);
// }, 8000);

// 🎬 Video Slider Script
let videoIndex = 0;
const videoSlides = document.querySelectorAll('.video-slide');

function showVideoSlide(index) {
  if (index >= videoSlides.length) videoIndex = 0;
  if (index < 0) videoIndex = videoSlides.length - 1;

  videoSlides.forEach((slide) => {
    slide.classList.remove('active', 'fade-in'); // remove old animation
    slide.querySelector('video').pause(); // pause all videos
  });

  videoSlides[videoIndex].classList.add('active', 'fade-in'); // add animation to new slide
}

function changeVideoSlide(n) {
  videoIndex += n;
  showVideoSlide(videoIndex);
}

// Initial show
showVideoSlide(videoIndex);

//Contact and Footer
document.addEventListener("DOMContentLoaded", function () {
  const contactSection = document.querySelector(".contact");
  const contactForm = document.querySelector(".contact__form");
  const contactInputs = document.querySelectorAll(".contact__input");
  const contactButton = document.querySelector(".contact__button");

  function checkVisibility() {
    const windowHeight = window.innerHeight;
    const contactRect = contactSection.getBoundingClientRect();

    if (contactRect.top >= 0 && contactRect.top < windowHeight * 0.75) {
      contactSection.style.opacity = "1";
      contactSection.style.transform = "translateY(0)";
      setTimeout(() => {
        contactForm.style.opacity = "1";
        contactForm.style.transform = "translateY(0)";
        contactInputs.forEach((input, index) => {
          setTimeout(() => {
            input.style.opacity = "1";
            input.style.transform = "translateY(0)";
          }, index * 200);
        });
        contactButton.style.opacity = "1";
        contactButton.style.transform = "translateY(0)";
      }, 300);
    } else {
      contactSection.style.opacity = "0";
      contactSection.style.transform = "translateY(20px)";
      contactForm.style.opacity = "0";
      contactForm.style.transform = "translateY(20px)";
      contactInputs.forEach(input => {
        input.style.opacity = "0";
        input.style.transform = "translateY(20px)";
      });
      contactButton.style.opacity = "0";
      contactButton.style.transform = "translateY(20px)";
    }
  }

  window.addEventListener("scroll", checkVisibility);
  window.addEventListener("resize", checkVisibility);
  checkVisibility();

  // Existing slideshow and video slider scripts (if any) can remain
  let slideIndex = 1;
  showDivs(slideIndex);

  function plusDivs(n) {
    showDivs(slideIndex += n);
  }

  function showDivs(n) {
    let i;
    let x = document.getElementsByClassName("mySlides");
    let dots = document.getElementsByClassName("dot");
    if (n > x.length) { slideIndex = 1 }
    if (n < 1) { slideIndex = x.length }
    for (i = 0; i < x.length; i++) {
      x[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
    }
    x[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";
  }

  let videoIndex = 0;
  showVideoSlide(videoIndex);

  function changeVideoSlide(n) {
    showVideoSlide(videoIndex += n);
  }

  function showVideoSlide(n) {
    let i;
    let slides = document.getElementsByClassName("video-slide");
    if (n >= slides.length) { videoIndex = 0 }
    if (n < 0) { videoIndex = slides.length - 1 }
    for (i = 0; i < slides.length; i++) {
      slides[i].classList.remove("active");
    }
    slides[videoIndex].classList.add("active");
  }
})

//contact send succesfully
document.getElementById('contactForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const name = document.querySelector('input[name="name"]').value;
  const email = document.querySelector('input[name="email"]').value;
  const message = document.querySelector('textarea[name="message"]').value;
  const formMessage = document.getElementById('formMessage');

  try {
  const response = await fetch('https://shree-ram-event-8rr1.onrender.com/send', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, message })
  });
  console.log('Response status:', response.status);
  const data = await response.json();
  formMessage.style.color = data.success ? 'green' : 'red';
  formMessage.textContent = data.message;
  if (data.success) {
    document.getElementById('contactForm').reset();
  }
} catch (error) {
  console.error('Fetch error:', error);
  formMessage.style.color = 'red';
  formMessage.textContent = 'An error occurred. Please try again.';
}
});

//https://shree-ram-event.onrender.com/send
