(function () {
  'use strict';

  // ===== Mobile Nav Toggle =====
  var toggle = document.getElementById('nav-toggle');
  var navLinks = document.getElementById('nav-links');
  if (toggle && navLinks) {
    toggle.addEventListener('click', function () {
      navLinks.classList.toggle('open');
    });
    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navLinks.classList.remove('open');
      });
    });
  }

  // ===== Cursor Glow =====
  var cursorGlow = document.getElementById('cursor-glow');
  var glowActive = false;
  document.addEventListener('mousemove', function (e) {
    if (!glowActive) {
      cursorGlow.classList.add('active');
      glowActive = true;
    }
    cursorGlow.style.left = e.clientX + 'px';
    cursorGlow.style.top = e.clientY + 'px';
  });

  document.addEventListener('mouseleave', function () {
    cursorGlow.classList.remove('active');
    glowActive = false;
  });

  // ===== Navbar Style on Scroll =====
  var navbar = document.getElementById('navbar');
  window.addEventListener('scroll', function () {
    if (window.scrollY > 50) {
      navbar.style.borderBottomColor = 'rgba(255,255,255,0.08)';
    } else {
      navbar.style.borderBottomColor = 'rgba(255,255,255,0.06)';
    }
  });

  // ===== Scroll Fade-In Animation =====
  var fadeEls = document.querySelectorAll(
    '.bento-card, .exp-row, .section-label, .contact-card, .hero-stats'
  );
  fadeEls.forEach(function (el) {
    el.classList.add('fade-up');
  });

  // Add stagger class to grids
  document.querySelectorAll('.bento-grid, .exp-dashboard').forEach(function (el) {
    el.classList.add('stagger-children');
  });

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  fadeEls.forEach(function (el) {
    observer.observe(el);
  });

  // ===== Counter Animation for Stats =====
  var statValues = document.querySelectorAll('.stat-value[data-count]');
  var statsAnimated = false;

  var statsObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting && !statsAnimated) {
        statsAnimated = true;
        animateCounters();
      }
    });
  }, { threshold: 0.5 });

  var statsBar = document.querySelector('.hero-stats');
  if (statsBar) {
    statsObserver.observe(statsBar);
  }

  function animateCounters() {
    statValues.forEach(function (el) {
      var target = parseInt(el.getAttribute('data-count'), 10);
      var duration = 1500;
      var start = 0;
      var startTime = null;

      function step(timestamp) {
        if (!startTime) startTime = timestamp;
        var progress = Math.min((timestamp - startTime) / duration, 1);
        var eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
        var current = Math.floor(eased * target);
        el.textContent = current;
        if (progress < 1) {
          requestAnimationFrame(step);
        } else {
          el.textContent = target;
        }
      }

      requestAnimationFrame(step);
    });
  }

  // ===== Active Nav Link Highlight =====
  var sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', function () {
    var scrollY = window.scrollY + 120;
    sections.forEach(function (section) {
      var top = section.offsetTop;
      var height = section.offsetHeight;
      var id = section.getAttribute('id');
      var link = document.querySelector('.nav-links a[href="#' + id + '"]');
      if (link) {
        if (scrollY >= top && scrollY < top + height) {
          link.classList.add('active');
        } else {
          link.classList.remove('active');
        }
      }
    });
  });

})();
