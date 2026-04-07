// ── NAVBAR JS ──
(function () {
  const nav = document.getElementById('mainNav');
  const toggle = document.getElementById('navToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  const dropdownTriggers = document.querySelectorAll('.nav__dropdown-trigger');

  function handleScroll() {
    if (window.scrollY > 5) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  }
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  if (toggle) {
    toggle.addEventListener('click', function () {
      const isOpen = mobileMenu.classList.toggle('open');
      toggle.classList.toggle('open', isOpen);
      toggle.setAttribute('aria-expanded', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });
  }

  // Mobile Dropdowns logic
  const mobileDropdownTriggers = document.querySelectorAll('.nav__mobile-item--dropdown .nav__mobile-link');
  mobileDropdownTriggers.forEach(function (trigger) {
    trigger.addEventListener('click', function (e) {
      e.preventDefault();
      const parent = trigger.closest('.nav__mobile-item--dropdown');
      const isOpen = parent.classList.toggle('open');
      trigger.setAttribute('aria-expanded', isOpen);
    });
  });

  dropdownTriggers.forEach(function (btn) {
    // Handle click for accessibility & mobile
    btn.addEventListener('click', function (e) {
      if (window.innerWidth > 900) {
        // Optional: on desktop, you might want to navigate to the primary link if it has one, 
        // but since they are button triggers, we just let them toggle.
      }
      const expanded = btn.getAttribute('aria-expanded') === 'true';
      dropdownTriggers.forEach(function (other) {
        other.setAttribute('aria-expanded', 'false');
      });
      btn.setAttribute('aria-expanded', !expanded);
      e.stopPropagation();
    });

    // Handle mouseenter to clear any clicked open state from others
    const parent = btn.closest('.nav__item--dropdown');
    if (parent) {
      parent.addEventListener('mouseenter', function () {
        dropdownTriggers.forEach(function (other) {
          other.setAttribute('aria-expanded', 'false');
        });
      });
    }
  });

  document.addEventListener('click', function (e) {
    if (!e.target.closest('.nav__item--dropdown')) {
      dropdownTriggers.forEach(function (btn) {
        btn.setAttribute('aria-expanded', 'false');
      });
    }
  });

  const links = document.querySelectorAll('.nav__link[href]');
  links.forEach(function (link) {
    if (link.getAttribute('href') === window.location.pathname.split('/').pop()) {
      link.classList.add('active');
    }
  });
})();
