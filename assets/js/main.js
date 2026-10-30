/**
 * Mobile Navigation Toggle & Awards Auto-Moving Carousel
 */
document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Navigation Hamburger Toggle
  const navToggle = document.querySelector('.nav-toggle');
  const siteNav = document.querySelector('.site-nav');

  if (navToggle && siteNav) {
    navToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = siteNav.classList.toggle('open');
      navToggle.classList.toggle('open', isOpen);
      navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    // Close menu when clicking a link
    siteNav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        siteNav.classList.remove('open');
        navToggle.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });

    // Close menu when tapping outside header
    document.addEventListener('click', (e) => {
      if (siteNav.classList.contains('open') && !siteNav.contains(e.target) && !navToggle.contains(e.target)) {
        siteNav.classList.remove('open');
        navToggle.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });

    // Close menu on Escape key or resize to desktop
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && siteNav.classList.contains('open')) {
        siteNav.classList.remove('open');
        navToggle.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });

    window.addEventListener('resize', () => {
      if (window.innerWidth > 820 && siteNav.classList.contains('open')) {
        siteNav.classList.remove('open');
        navToggle.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // 2. Awards & Honors Auto-Moving Carousel (Home Page)
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
