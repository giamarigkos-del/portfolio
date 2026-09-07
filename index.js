/* -----------------------------------------
  Have focus outline only for keyboard users 
 ---------------------------------------- */

const handleFirstTab = (e) => {
  if(e.key === 'Tab') {
    document.body.classList.add('user-is-tabbing')

    window.removeEventListener('keydown', handleFirstTab)
    window.addEventListener('mousedown', handleMouseDownOnce)
  }

}

const handleMouseDownOnce = () => {
  document.body.classList.remove('user-is-tabbing')

  window.removeEventListener('mousedown', handleMouseDownOnce)
  window.addEventListener('keydown', handleFirstTab)
}

window.addEventListener('keydown', handleFirstTab)

const backToTopButton = document.querySelector(".back-to-top");
let isBackToTopRendered = false;

let alterStyles = (isBackToTopRendered) => {
  backToTopButton.style.visibility = isBackToTopRendered ? "visible" : "hidden";
  backToTopButton.style.opacity = isBackToTopRendered ? 1 : 0;
  backToTopButton.style.transform = isBackToTopRendered
    ? "scale(1)"
    : "scale(0)";
};

window.addEventListener("scroll", () => {
  if (window.scrollY > 700) {
    isBackToTopRendered = true;
    alterStyles(isBackToTopRendered);
  } else {
    isBackToTopRendered = false;
    alterStyles(isBackToTopRendered);
  }
});

/* -----------------------------------------
  Work carousels (multiple screenshots per project)
 ---------------------------------------- */

const carousels = document.querySelectorAll(".work__carousel");

carousels.forEach((carousel) => {
  const track = carousel.querySelector(".work__carousel-track");
  const slides = Array.from(track.children);
  const prevButton = carousel.querySelector(".work__carousel-arrow--prev");
  const nextButton = carousel.querySelector(".work__carousel-arrow--next");
  const dots = Array.from(carousel.querySelectorAll(".work__carousel-dot"));

  let currentIndex = 0;
  let autoplayTimer = null;

  const goToSlide = (index) => {
    currentIndex = (index + slides.length) % slides.length;
    track.style.transform = `translateX(-${currentIndex * 100}%)`;
    dots.forEach((dot, i) => dot.classList.toggle("is-active", i === currentIndex));
  };

  const startAutoplay = () => {
    autoplayTimer = window.setInterval(() => goToSlide(currentIndex + 1), 4000);
  };

  const stopAutoplay = () => {
    window.clearInterval(autoplayTimer);
    autoplayTimer = null;
  };

  const handleManualNavigation = (index) => {
    stopAutoplay();
    goToSlide(index);
  };

  prevButton.addEventListener("click", () => handleManualNavigation(currentIndex - 1));
  nextButton.addEventListener("click", () => handleManualNavigation(currentIndex + 1));
  dots.forEach((dot, i) => dot.addEventListener("click", () => handleManualNavigation(i)));

  goToSlide(0);
  if (slides.length > 1) {
    startAutoplay();
  }
});