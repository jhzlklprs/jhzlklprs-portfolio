(function () {
  "use strict";

  /* ---------------- helpers ---------------- */
  function esc(v) {
    return String(v == null ? "" : v)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  /* Tiny inline markup: `code`, *emphasis*, [label](url). Input is escaped first. */
  function rich(text) {
    var s = esc(text);
    s = s.replace(/`([^`]+)`/g, "<code>$1</code>");
    s = s.replace(/\*([^*]+)\*/g, "<em>$1</em>");
    s = s.replace(/\[([^\]]+)\]\(((?:https?:\/\/|\/|\.|#|[\w-]+\.html)[^)\s]*)\)/g, function (m, label, url) {
      var ext = /^https?:/.test(url);
      return '<a href="' + url + '"' + (ext ? ' target="_blank" rel="noopener"' : "") + ">" + label + "</a>";
    });
    return s;
  }

  var ARROW_UP_RIGHT =
    '<svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.4" aria-hidden="true"><path d="M3 9l6-6M4 3h5v5"/></svg>';
  var ARROW_LEFT =
    '<svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.4" aria-hidden="true"><path d="M10 6H2M5.5 2.5L2 6l3.5 3.5"/></svg>';

  /* ---------------- pick the project from ?id= ---------------- */
  var projects = window.PROJECTS || [];
  var id = new URLSearchParams(window.location.search).get("id");
  var pos = -1;
  for (var i = 0; i < projects.length; i++) {
    if (projects[i].id === id) { pos = i; break; }
  }
  var root = document.getElementById("caseRoot");
  if (!root) return;

  if (pos === -1) {
    document.title = "Project not found · Jahzeel Kiel";
    root.innerHTML =
      '<div class="wrap case-missing">' +
        '<a class="case-back" href="projects.html">' + ARROW_LEFT + "All projects</a>" +
        '<h1 class="case-title">Not found.</h1>' +
        "<p>That case study doesn't exist (yet). <a href=\"projects.html\">Back to all projects</a>.</p>" +
      "</div>";
    return;
  }

  var p = projects[pos];
  var next = projects[(pos + 1) % projects.length];

  /* ---------------- page title / description ---------------- */
  document.title = p.title + " · Jahzeel Kiel";
  var desc = document.querySelector('meta[name="description"]');
  if (desc) desc.setAttribute("content", p.lead || (p.title + " — case study by Jahzeel Kiel."));

  /* ---------------- build ---------------- */
  var h = '<div class="wrap case-page">';

  // back link
  h += '<a class="case-back reveal" href="projects.html">' + ARROW_LEFT + "All projects</a>";

  // meta line
  h += '<div class="case-meta-line reveal">' +
         '<span class="yr">' + esc(p.year) + "</span>" +
         (p.tagline ? '<span class="rule"></span><span>' + esc(p.tagline) + "</span>" : "") +
         (p.status ? '<span class="rule"></span><span class="state">● ' + esc(p.status) + "</span>" : "") +
       "</div>";

  // title + lead
  h += '<h1 class="case-title reveal">' + esc(p.title) + "</h1>";
  if (p.lead) h += '<p class="case-lead reveal">' + esc(p.lead) + "</p>";

  // links
  if (p.links && p.links.length) {
    h += '<div class="case-links reveal">' + p.links.map(function (l) {
      var ext = /^https?:/.test(l.url);
      return '<a href="' + esc(l.url) + '"' + (l.primary ? ' class="primary"' : "") +
             (ext ? ' target="_blank" rel="noopener"' : "") + ">" + esc(l.label) + (ext ? ARROW_UP_RIGHT : "") + "</a>";
    }).join("") + "</div>";
  }

  // badges
  if (p.badges && p.badges.length) {
    h += '<div class="case-badges reveal">' + p.badges.map(function (b) {
      return '<span class="case-badge"><b>' + esc(b.label) + "</b><span>" + esc(b.value) + "</span></span>";
    }).join("") + "</div>";
  }

  // hero screenshot
  if (p.hero) {
    h += '<figure class="case-shot reveal">' +
           '<div class="case-shot-bar"><i></i><i></i><i></i>' +
             (p.browserUrl ? '<span class="case-shot-url">' + esc(p.browserUrl) + "</span>" : "") +
           "</div>" +
           '<img src="' + esc(p.hero) + '" alt="' + esc(p.title) + ' screenshot">' +
         "</figure>";
  }

  // body: prose + sidebar
  var hasProse = (p.body && p.body.length) || p.note;
  var hasHighlights = p.highlights && p.highlights.length;
  var hasStack = p.stack && p.stack.length;
  var hasSide = hasHighlights || hasStack;

  if (hasProse || hasSide) {
    h += '<div class="case-body reveal' + (hasSide ? "" : " no-side") + '">';

    h += '<div class="case-prose">' +
           (p.body || []).map(function (t) { return "<p>" + rich(t) + "</p>"; }).join("") +
           (p.note ? '<p class="note">' + rich(p.note) + "</p>" : "") +
         "</div>";

    if (hasSide) {
      h += '<aside class="case-side">';
      if (hasHighlights) {
        h += '<div class="side-label">Highlights</div><ul class="case-highlights">' +
             p.highlights.map(function (t) { return "<li>" + rich(t) + "</li>"; }).join("") + "</ul>";
      }
      if (hasStack) {
        h += '<div class="case-built"><div class="side-label">Built with</div><div class="case-tags">' +
             p.stack.map(function (t) { return "<span>" + esc(t) + "</span>"; }).join("") + "</div></div>";
      }
      h += "</aside>";
    }
    h += "</div>";
  }

  // extra figures (e.g. a dropdown screenshot)
  if (p.figures && p.figures.length) {
    h += '<div class="case-figures reveal">' + p.figures.map(function (f) {
      return "<figure><img src=\"" + esc(f.src) + "\" alt=\"" + esc(f.caption || p.title) + "\" loading=\"lazy\">" +
             (f.caption ? "<figcaption>" + esc(f.caption) + "</figcaption>" : "") + "</figure>";
    }).join("") + "</div>";
  }

  // next project
  h += '<nav class="case-next reveal" aria-label="Next project">' +
         '<a href="case-study.html?id=' + encodeURIComponent(next.id) + '">' +
           '<span class="lbl">Next project</span>' +
           '<span class="ttl">' + esc(next.title) + ARROW_UP_RIGHT.replace('width="12" height="12"', 'width="16" height="16"') + "</span>" +
         "</a></nav>";

  h += "</div>";
  root.innerHTML = h;

  /* ---------------- mobile navigation ---------------- */
  var burger = document.getElementById("burgerBtn");
  var menu = document.getElementById("mobileMenu");
  var icon = document.getElementById("burgerIcon");

  if (burger && menu && icon) {
    var open = false;
    var setOpen = function (value) {
      open = value;
      menu.classList.toggle("open", open);
      burger.setAttribute("aria-expanded", open ? "true" : "false");
      icon.innerHTML = open
        ? '<path d="M6 6l12 12M18 6L6 18"/>'
        : '<path d="M3 6h18M3 12h18M3 18h18"/>';
      document.body.style.overflow = open ? "hidden" : "";
    };
    burger.addEventListener("click", function () { setOpen(!open); });
    menu.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () { setOpen(false); });
    });
  }

  /* ---------------- reveal on scroll (runs AFTER render) ---------------- */
  var items = document.querySelectorAll(".reveal");
  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (reduced || !("IntersectionObserver" in window)) {
    items.forEach(function (el) { el.classList.add("visible"); });
    return;
  }

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.05, rootMargin: "0px 0px -30px 0px" });

  items.forEach(function (el) { observer.observe(el); });
})();
