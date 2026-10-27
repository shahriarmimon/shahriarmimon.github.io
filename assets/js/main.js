/**
 * Awards & Honors Auto-Moving Carousel with Touch & Hover Pause
 */
document.addEventListener('DOMContentLoaded', () => {
  const track = document.getElementById('awards-track');
  const prevBtn = document.getElementById('carousel-prev');
  const nextBtn = document.getElementById('carousel-next');
  const dots = document.querySelectorAll('.carousel-dot');
  const wrapper = document.querySelector('.carousel-wrapper');

  if (!track || dots.length === 0) return;

  const slides = track.querySelectorAll('.carousel-slide');
  let currentIndex = 0;
  let autoPlayTimer = null;
  const AUTO_PLAY_DELAY = 3800; // 3.8 seconds per slide

  function goToSlide(index) {
    if (index < 0) index = slides.length - 1;
    if (index >= slides.length) index = 0;
    currentIndex = index;

    const targetSlide = slides[currentIndex];
    if (targetSlide) {
      track.scrollTo({
        left: targetSlide.offsetLeft,
        behavior: 'smooth'
      });
    }
    updateDots(currentIndex);
  }

  function updateDots(index) {
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === index);
    });
  }

  function startAutoPlay() {
    stopAutoPlay();
    autoPlayTimer = setInterval(() => {
      goToSlide(currentIndex + 1);
    }, AUTO_PLAY_DELAY);
  }

  function stopAutoPlay() {
    if (autoPlayTimer) {
      clearInterval(autoPlayTimer);
      autoPlayTimer = null;
    }
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      goToSlide(currentIndex - 1);
      startAutoPlay();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      goToSlide(currentIndex + 1);
      startAutoPlay();
    });
  }

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      goToSlide(i);
      startAutoPlay();
    });
  });

  // Pause auto-scroll on mouse hover or touch interaction
  if (wrapper) {
    wrapper.addEventListener('mouseenter', stopAutoPlay);
    wrapper.addEventListener('mouseleave', startAutoPlay);
    wrapper.addEventListener('touchstart', stopAutoPlay, { passive: true });
    wrapper.addEventListener('touchend', startAutoPlay, { passive: true });
  }

  // Sync dot indicator when user swipes manually
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

  // Recalculate scroll alignment on window resize
  window.addEventListener('resize', () => {
    const targetSlide = slides[currentIndex];
    if (targetSlide) {
      track.scrollTo({ left: targetSlide.offsetLeft, behavior: 'auto' });
    }
  });

  // Start automatic movement immediately
  startAutoPlay();
});
