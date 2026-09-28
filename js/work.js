(function () {
  'use strict';

  var burger = document.getElementById('burgerBtn');
  var menu = document.getElementById('mobileMenu');
  var icon = document.getElementById('burgerIcon');
  var open = false;

  function setOpen(value) {
    open = value;
    if (!menu || !burger) return;
    menu.classList.toggle('open', open);
    burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    if (icon) {
      icon.innerHTML = open
        ? '<path d="M6 6l12 12M18 6L6 18"/>'
        : '<path d="M3 6h18M3 12h18M3 18h18"/>';
    }
    document.body.style.overflow = open ? 'hidden' : '';
  }

  if (burger) burger.addEventListener('click', function () { setOpen(!open); });
  if (menu) menu.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', function () { setOpen(false); });
  });

  var items = document.querySelectorAll('.reveal');
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (reduced || !('IntersectionObserver' in window)) {
    items.forEach(function (item) { item.classList.add('visible'); });
    return;
  }

  var observer = new IntersectionObserver(function (entries, obs) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -50px 0px' });

  items.forEach(function (item, index) {
    item.style.transitionDelay = Math.min(index * 45, 220) + 'ms';
    observer.observe(item);
  });
})();
