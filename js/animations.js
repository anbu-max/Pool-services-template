// ── SCROLL ANIMATION OBSERVER ──
(function () {
  document.documentElement.classList.add('js');

  const observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          if (entry.target.hasAttribute('data-stagger')) {
            Array.from(entry.target.children).forEach(function (child) {
              child.classList.add('in-view');
            });
          }
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  document.querySelectorAll('[data-animate], [data-stagger]').forEach(function (el) {
    observer.observe(el);
  });
})();
