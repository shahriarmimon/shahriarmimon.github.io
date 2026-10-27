/**
 * Minimal script for the Awards & Honors scrolling carousel
 */
document.addEventListener('DOMContentLoaded', () => {
  const track = document.getElementById('awards-track');
  const prevBtn = document.getElementById('carousel-prev');
  const nextBtn = document.getElementById('carousel-next');
  const dots = document.querySelectorAll('.carousel-dot');

  if (!track || dots.length === 0) return;

  const slides = track.querySelectorAll('.carousel-slide');
  let currentIndex = 0;

  function goToSlide(index) {
    if (index < 0) index = slides.length - 1;
    if (index >= slides.length) index = 0;
    currentIndex = index;

    const slideWidth = track.clientWidth;
    track.scrollTo({
      left: slideWidth * currentIndex,
      behavior: 'smooth'
    });
    updateDots(currentIndex);
  }

  function updateDots(index) {
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === index);
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => goToSlide(currentIndex - 1));
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => goToSlide(currentIndex + 1));
  }

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => goToSlide(i));
  });

  // Sync dot indicator when user scrolls/swipes manually
  track.addEventListener('scroll', () => {
    const slideWidth = track.clientWidth;
    if (slideWidth > 0) {
      const newIndex = Math.round(track.scrollLeft / slideWidth);
      if (newIndex !== currentIndex && newIndex >= 0 && newIndex < slides.length) {
        currentIndex = newIndex;
        updateDots(currentIndex);
      }
    }
  }, { passive: true });
});
