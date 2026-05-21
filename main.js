/* =========================================
   SHINE NATIVE — Main JavaScript
   ========================================= */

'use strict';

// =========================================
// PAGE LOADER
// =========================================
(function initLoader() {
  const loader = document.createElement('div');
  loader.className = 'page-loader';
  loader.innerHTML = `
    <div class="loader-logo"><span>✦</span> ShineNative</div>
    <div class="loader-bar"><div class="loader-progress"></div></div>
  `;
  document.body.prepend(loader);

  window.addEventListener('load', () => {
    setTimeout(() => {
      loader.classList.add('hidden');
      setTimeout(() => loader.remove(), 700);
    }, 1300);
  });
})();

// =========================================
// CUSTOM CURSOR
// =========================================
(function initCursor() {
  const cursor = document.getElementById('cursor');
  const follower = document.getElementById('cursorFollower');
  if (!cursor || !follower) return;

  let mouseX = 0, mouseY = 0;
  let followerX = 0, followerY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.left = mouseX + 'px';
    cursor.style.top  = mouseY + 'px';
  });

  function animateFollower() {
    followerX += (mouseX - followerX) * 0.12;
    followerY += (mouseY - followerY) * 0.12;
    follower.style.left = followerX + 'px';
    follower.style.top  = followerY + 'px';
    requestAnimationFrame(animateFollower);
  }
  animateFollower();

  // Scale cursor on interactive elements
  const interactives = document.querySelectorAll('a, button, .prop-card, .service-card, .filter-btn');
  interactives.forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.style.transform = 'translate(-50%, -50%) scale(2)';
      follower.style.transform = 'translate(-50%, -50%) scale(1.4)';
      follower.style.opacity = '0.4';
    });
    el.addEventListener('mouseleave', () => {
      cursor.style.transform = 'translate(-50%, -50%) scale(1)';
      follower.style.transform = 'translate(-50%, -50%) scale(1)';
      follower.style.opacity = '0.6';
    });
  });

  // Hide on mobile
  if (window.matchMedia('(hover: none)').matches) {
    cursor.style.display = 'none';
    follower.style.display = 'none';
    document.body.style.cursor = 'auto';
  }
})();

// =========================================
// NAVIGATION — scroll state + hamburger
// =========================================
(function initNav() {
  const nav = document.getElementById('nav');
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  // Scroll state
  window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  }, { passive: true });

  // Hamburger toggle
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    mobileMenu.classList.toggle('open');
    document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
  });

  // Close on link click
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      mobileMenu.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
})();

// =========================================
// SCROLL REVEAL
// =========================================
(function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal:not(.hero .reveal)');

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -60px 0px'
    });

    reveals.forEach(el => observer.observe(el));
  } else {
    // Fallback — show all
    reveals.forEach(el => el.classList.add('revealed'));
  }
})();

// =========================================
// STAT COUNTER ANIMATION
// =========================================
(function initCounters() {
  const stats = document.querySelectorAll('.stat-num[data-count]');
  if (!stats.length) return;

  function animateCount(el, target, duration = 2000) {
    const start = performance.now();
    const update = (now) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const ease = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(ease * target);
      if (progress < 1) requestAnimationFrame(update);
    };
    requestAnimationFrame(update);
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = parseInt(entry.target.dataset.count);
        animateCount(entry.target, target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  stats.forEach(el => observer.observe(el));
})();

// =========================================
// PROPERTY FILTERS
// =========================================
(function initFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const propCards = document.querySelectorAll('.prop-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Update active state
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;

      propCards.forEach(card => {
        const category = card.dataset.category;
        const shouldShow = filter === 'all' || category === filter;

        if (shouldShow) {
          card.classList.remove('hidden');
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });
})();

// =========================================
// TESTIMONIALS SLIDER
// =========================================
(function initTestimonials() {
  const track = document.getElementById('testimonialsTrack');
  const cards = track ? track.querySelectorAll('.testi-card') : [];
  const dotsContainer = document.getElementById('testiDots');
  const prevBtn = document.getElementById('testiPrev');
  const nextBtn = document.getElementById('testiNext');

  if (!track || !cards.length) return;

  // Only activate slider on smaller screens
  function isMobile() { return window.innerWidth <= 900; }
  function isTablet() { return window.innerWidth <= 1100 && window.innerWidth > 900; }

  let currentIndex = 0;
  let visibleCount = 4;
  let dots = [];

  function getVisibleCount() {
    if (window.innerWidth <= 680) return 1;
    if (window.innerWidth <= 900) return 2;
    if (window.innerWidth <= 1100) return 2;
    return 4;
  }

  function createDots() {
    dotsContainer.innerHTML = '';
    dots = [];
    const totalSlides = Math.ceil(cards.length / visibleCount);
    for (let i = 0; i < totalSlides; i++) {
      const dot = document.createElement('button');
      dot.className = 'testi-dot' + (i === 0 ? ' active' : '');
      dot.setAttribute('aria-label', `Slide ${i + 1}`);
      dot.addEventListener('click', () => goTo(i));
      dotsContainer.appendChild(dot);
      dots.push(dot);
    }
  }

  function updateDots() {
    const activeIndex = Math.floor(currentIndex / visibleCount);
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === activeIndex);
    });
  }

  function showCards() {
    cards.forEach((card, i) => {
      const inRange = i >= currentIndex && i < currentIndex + visibleCount;
      card.style.display = inRange ? '' : 'none';
    });
    updateDots();
  }

  function goTo(slideIndex) {
    currentIndex = slideIndex * visibleCount;
    currentIndex = Math.min(currentIndex, cards.length - visibleCount);
    showCards();
  }

  function next() {
    currentIndex = Math.min(currentIndex + visibleCount, cards.length - visibleCount);
    showCards();
  }

  function prev() {
    currentIndex = Math.max(currentIndex - visibleCount, 0);
    showCards();
  }

  function init() {
    visibleCount = getVisibleCount();
    currentIndex = 0;

    // Show all cards on desktop (grid handles layout)
    if (visibleCount === 4) {
      cards.forEach(card => card.style.display = '');
      dotsContainer.innerHTML = '';
      return;
    }

    createDots();
    showCards();
  }

  prevBtn.addEventListener('click', prev);
  nextBtn.addEventListener('click', next);

  init();

  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(init, 200);
  });

  // Auto-advance
  let autoInterval = setInterval(next, 5000);
  [prevBtn, nextBtn, track].forEach(el => {
    el.addEventListener('mouseenter', () => clearInterval(autoInterval));
    el.addEventListener('mouseleave', () => {
      autoInterval = setInterval(next, 5000);
    });
  });

  // Touch/swipe
  let touchStartX = 0;
  track.addEventListener('touchstart', e => {
    touchStartX = e.touches[0].clientX;
  }, { passive: true });

  track.addEventListener('touchend', e => {
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      diff > 0 ? next() : prev();
    }
  }, { passive: true });
})();

// =========================================
// CONTACT FORM
// =========================================
(function initForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', function(e) {
    e.preventDefault();

    const btn = form.querySelector('[type="submit"]');
    const originalText = btn.textContent;

    // Validate required fields
    let valid = true;
    form.querySelectorAll('[required]').forEach(field => {
      if (!field.value.trim()) {
        valid = false;
        field.style.borderColor = '#e74c3c';
        field.addEventListener('input', () => {
          field.style.borderColor = '';
        }, { once: true });
      }
    });

    if (!valid) return;

    // Simulate send
    btn.textContent = 'Sending...';
    btn.disabled = true;

    setTimeout(() => {
      // Replace form with success message
      const success = document.createElement('div');
      success.className = 'form-success show';
      success.innerHTML = `
        <div class="success-icon">✅</div>
        <h3>Message Received!</h3>
        <p>Thank you for reaching out. A Shine Native agent will contact you within 2 business hours.</p>
      `;
      form.innerHTML = '';
      form.appendChild(success);
    }, 1600);
  });
})();

// =========================================
// SMOOTH SCROLL
// =========================================
(function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = 80;
        const targetY = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top: targetY, behavior: 'smooth' });
      }
    });
  });
})();

// =========================================
// FAVOURITE BUTTON TOGGLE
// =========================================
(function initFavourites() {
  document.querySelectorAll('.prop-fav').forEach(btn => {
    btn.addEventListener('click', function() {
      const isActive = this.textContent === '♥';
      this.textContent = isActive ? '♡' : '♥';
      this.style.color = isActive ? '' : '#e74c3c';
    });
  });
})();

// =========================================
// PARALLAX — subtle hero orbs on scroll
// =========================================
(function initParallax() {
  const orb1 = document.querySelector('.hero-orb--1');
  const orb2 = document.querySelector('.hero-orb--2');
  if (!orb1 || !orb2) return;

  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    orb1.style.transform = `translateY(${y * 0.15}px)`;
    orb2.style.transform = `translateY(${y * -0.1}px)`;
  }, { passive: true });
})();

// =========================================
// ACTIVE NAV LINK on scroll
// =========================================
(function initActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.style.color = '';
          if (link.getAttribute('href') === `#${id}`) {
            link.style.color = 'var(--forest)';
          }
        });
      }
    });
  }, {
    threshold: 0.4,
    rootMargin: '-80px 0px -40% 0px'
  });

  sections.forEach(s => observer.observe(s));
})();

console.log('%c✦ Shine Native', 'font-family: serif; font-size: 20px; color: #C9A84C;');
console.log('%cPremium Real Estate — Built with care.', 'color: #2D4A3E; font-size: 12px;');
