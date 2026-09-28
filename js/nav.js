/* Shared navigation active-state controller */
(function () {
  'use strict';

  function normalize(path) {
    return (path || '')
      .split('?')[0]
      .split('#')[0]
      .split('/')
      .pop()
      .toLowerCase() || 'index.html';
  }

  var currentFile = normalize(window.location.pathname);

  /* Shared navbar behavior: no divider at the top, show it after scrolling. */
  var header = document.querySelector('header');
  function syncHeaderScrollState() {
    if (!header) return;
    header.classList.toggle('is-scrolled', window.scrollY > 8);
  }
  syncHeaderScrollState();
  window.addEventListener('scroll', syncHeaderScrollState, { passive: true });

  /* The navbar logo goes home. On other pages it simply opens index.html; on
     the home page it reloads a fresh copy instead of smooth-scrolling to #top. */
  var logo = header && header.querySelector('a.logo');
  if (logo && currentFile === 'index.html') {
    logo.addEventListener('click', function (e) {
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
      e.preventDefault();
      try { history.scrollRestoration = 'manual'; } catch (err) {}
      window.location.replace('index.html');
    });
  }

  /* Project detail pages belong to the Projects section. */
  var activeTarget = currentFile === 'case-study.html'
    ? 'projects.html'
    : currentFile;

  document.querySelectorAll('nav.links a, .mobilemenu a').forEach(function (link) {
    var href = normalize(link.getAttribute('href'));
    var isNumberedNav = href === 'projects.html' || href === 'work.html' || href === 'about.html';
    var isActive = isNumberedNav && href === activeTarget;

    link.classList.toggle('active', isActive);

    if (isActive) {
      link.setAttribute('aria-current', 'page');
    } else {
      link.removeAttribute('aria-current');
    }
  });

  /* Contact is the CTA, not one of the numbered links. */
  if (currentFile === 'contact.html') {
    document.querySelectorAll('a.cta-btn[href]').forEach(function (link) {
      if (normalize(link.getAttribute('href')) === 'contact.html') {
        link.classList.add('active');
        link.setAttribute('aria-current', 'page');
      }
    });
  }
})();