(function () {
  "use strict";

  var overlay = document.getElementById("siteSearch");
  var input = document.getElementById("siteSearchInput");
  var results = document.getElementById("siteSearchResults");
  var closeButton = document.getElementById("siteSearchClose");

  if (!overlay || !input || !results) return;

  /*
   * Search is intentionally grouped like the reference command palette:
   * GO TO, PROJECTS, RESEARCH, LINKS, ACTIONS.
   * The actual entries are Jahzeel's site content.
   */
  var DATA = [
    { group: "GO TO", title: "Home", meta: "Portfolio · Introduction", url: "index.html#top", keywords: "home portfolio jahzeel kiel developer .net" },
    { group: "GO TO", title: "Projects", meta: "Selected work · Project index", url: "projects.html", keywords: "projects work portfolio case studies software websites systems" },
    { group: "GO TO", title: "Work", meta: "Experience · 2018 — Present", url: "work.html", keywords: "work experience career rpi system programmer .net c# asp.net vb.net sql angularjs web developer" },
    { group: "GO TO", title: "About", meta: "Tools & background", url: "about.html", keywords: "about tools skills developer background technology" },
    { group: "GO TO", title: "Contact", meta: "Get in touch", url: "contact.html", keywords: "contact email message hire get in touch" },

    { group: "PROJECTS", title: "Preventive Maintenance System", meta: "IT asset & maintenance management · In progress", url: "case-study.html?id=preventive-maintenance", keywords: "preventive maintenance pms asp.net c# sql server gridview stored procedures it asset" },
    { group: "PROJECTS", title: "Jewelry Pawning Purpose", meta: "Analytics dashboard", url: "case-study.html?id=jewelry-pawning-purpose", keywords: "jewelry pawning purpose analytics dashboard age group asp.net web forms bootstrap ado.net sql server excel export charts" },
    { group: "PROJECTS", title: "Hotel Rosita", meta: "Website redesign & development", url: "case-study.html?id=hotel-rosita", keywords: "hotel rosita html css javascript php phpmailer web design animation responsive" },
    { group: "PROJECTS", title: "Employee Disbursements Tracker", meta: "Employee transactions dashboard", url: "case-study.html?id=employee-disbursements-tracker", keywords: "employee disbursements tracker edt transactions cash advance reimbursement medical asp.net c# ado.net sql server bootstrap dashboard" },
    { group: "PROJECTS", title: "Personal Portfolio", meta: "Web development · In progress", url: "case-study.html?id=personal-portfolio", keywords: "portfolio html css javascript .net web development" },
    { group: "PROJECTS", title: "Personal Portfolio v1", meta: "Previous version", url: "case-study.html?id=portfolio-v1", keywords: "portfolio v1 previous version sidebar theme toggle html css javascript" },
    { group: "PROJECTS", title: "IT Support Login", meta: "Interface design", url: "case-study.html?id=it-support-login", keywords: "login it support interface particles tools technical support" },
    { group: "PROJECTS", title: "Ledger", meta: "Concept mockup", url: "case-study.html?id=ledger", keywords: "ledger financial dashboard reporting concept mockup c# asp.net sql server" },

    { group: "RESEARCH", title: "Technical notes", meta: "Coming soon", action: "research-soon", keywords: "research technical notes engineering notes learning" },

    { group: "LINKS", title: "GitHub", meta: "github.com", url: "https://github.com", external: true, keywords: "github code repositories source" },
    { group: "LINKS", title: "LinkedIn", meta: "linkedin.com", url: "https://linkedin.com", external: true, keywords: "linkedin professional profile career" },

    { group: "ACTIONS", title: "Copy email address", meta: "Copy to clipboard", action: "copy-email", keywords: "copy email clipboard" },
    { group: "ACTIONS", title: "Send an email", meta: "Open your mail client", action: "email", keywords: "email mail contact message" },
    { group: "ACTIONS", title: "Download résumé (PDF)", meta: "Open résumé", url: "assets/docs/resume.pdf", external: true, keywords: "resume cv curriculum vitae pdf download" }
  ];

  var selectedIndex = 0;

  /* Keep the primary navigation active state consistent on every page.
     Project case studies belong to Projects; Contact is represented by the CTA. */
  (function markActiveNavigation(){
    var file = (window.location.pathname.split("/").pop() || "index.html").toLowerCase();
    var pageMap = {
      "projects.html": "projects.html",
      "case-study.html": "projects.html",
      "work.html": "work.html",
      "about.html": "about.html"
    };
    var activeHref = pageMap[file] || null;
    var navLinks = document.querySelectorAll("nav.links a, .mobilemenu a, .mobile-menu a");

    navLinks.forEach(function(link){
      var href = (link.getAttribute("href") || "").split("#")[0].split("?")[0].toLowerCase();
      var isActive = activeHref && href === activeHref;
      link.classList.toggle("active", !!isActive);
      if (isActive) link.setAttribute("aria-current", "page");
      else link.removeAttribute("aria-current");
    });

    document.querySelectorAll("a.cta-btn[href^=\"contact.html\"]").forEach(function(link){
      var isContact = file === "contact.html";
      link.classList.toggle("active", isContact);
      if (isContact) link.setAttribute("aria-current", "page");
      else link.removeAttribute("aria-current");
    });
  })();

  var triggers = document.querySelectorAll(
    "#siteSearchBtn, #mobileSearchBtn, .site-search-trigger, .mobile-search-trigger"
  );

  function escapeHTML(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/\"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function getMatches(query) {
    var q = query.trim().toLowerCase();
    return DATA.filter(function (item) {
      return !q ||
        item.title.toLowerCase().indexOf(q) !== -1 ||
        item.meta.toLowerCase().indexOf(q) !== -1 ||
        item.group.toLowerCase().indexOf(q) !== -1 ||
        item.keywords.toLowerCase().indexOf(q) !== -1;
    });
  }

  function renderResults(query) {
    var matches = getMatches(query);
    results.innerHTML = "";
    selectedIndex = 0;

    if (!matches.length) {
      results.innerHTML =
        '<div class="site-search-empty">' +
          '<strong>No results found.</strong>' +
          '<span>Try .NET, SQL, web, hotel, reporting, or systems.</span>' +
        '</div>';
      return;
    }

    var lastGroup = "";

    matches.forEach(function (item, index) {
      if (item.group !== lastGroup) {
        var heading = document.createElement("div");
        heading.className = "site-search-group";
        heading.textContent = item.group;
        results.appendChild(heading);
        lastGroup = item.group;
      }

      var link = document.createElement("a");
      link.className = "site-search-result" + (index === 0 ? " is-selected" : "");
      link.href = item.url || "#";
      link.setAttribute("data-index", index);
      link.innerHTML =
        '<span class="site-search-result-main">' +
          '<strong>' + escapeHTML(item.title) + '</strong>' +
          '<span>' + escapeHTML(item.meta) + '</span>' +
        '</span>' +
        '<span class="site-search-enter" aria-hidden="true">↵</span>';

      if (item.external) {
        link.target = "_blank";
        link.rel = "noopener";
      }

      link.addEventListener("mouseenter", function () {
        selectedIndex = index;
        updateSelection();
      });

      link.addEventListener("click", function (event) {
        if (!item.action) return;
        event.preventDefault();
        runAction(item.action);
      });

      results.appendChild(link);
    });
  }

  function getResultLinks() {
    return Array.prototype.slice.call(
      results.querySelectorAll(".site-search-result")
    );
  }

  function updateSelection() {
    var links = getResultLinks();
    if (!links.length) return;

    links.forEach(function (link, index) {
      link.classList.toggle("is-selected", index === selectedIndex);
    });

    links[selectedIndex].scrollIntoView({ block: "nearest" });
  }

  function runAction(action) {
    if (action === "copy-email") {
      var email = "hello@example.com";
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(email).then(function () {
          input.value = "";
          renderResults("");
          input.placeholder = "Email address copied";
          window.setTimeout(function () {
            input.placeholder = "Jump to a page, project, or action...";
          }, 1400);
        });
      }
      return;
    }

    if (action === "email") {
      window.location.href = "mailto:hello@example.com";
      return;
    }

    if (action === "research-soon") {
      input.value = "";
      renderResults("");
      input.placeholder = "Research notes are coming soon";
      window.setTimeout(function () {
        input.placeholder = "Jump to a page, project, or action...";
      }, 1600);
    }
  }

  function openSearch() {
    overlay.classList.add("open");
    overlay.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    renderResults(input.value);

    window.setTimeout(function () {
      input.focus();
      input.select();
    }, 40);
  }

  function closeSearch() {
    overlay.classList.remove("open");
    overlay.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  triggers.forEach(function (trigger) {
    trigger.addEventListener("click", function (event) {
      event.preventDefault();
      var mobileMenu = document.getElementById("mobileMenu");
      if (mobileMenu) mobileMenu.classList.remove("open");
      openSearch();
    });
  });

  if (closeButton) closeButton.addEventListener("click", closeSearch);

  input.addEventListener("input", function () {
    renderResults(input.value);
  });

  overlay.addEventListener("click", function (event) {
    if (event.target === overlay) closeSearch();
  });

  document.addEventListener("keydown", function (event) {
    var isMac = navigator.platform.toUpperCase().indexOf("MAC") >= 0;
    var shortcut = isMac
      ? event.metaKey && event.key.toLowerCase() === "k"
      : event.ctrlKey && event.key.toLowerCase() === "k";

    if (shortcut) {
      event.preventDefault();
      if (overlay.classList.contains("open")) closeSearch();
      else openSearch();
      return;
    }

    if (!overlay.classList.contains("open")) return;

    if (event.key === "Escape") {
      closeSearch();
      return;
    }

    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      var links = getResultLinks();
      if (!links.length) return;
      event.preventDefault();
      selectedIndex = event.key === "ArrowDown"
        ? (selectedIndex + 1) % links.length
        : (selectedIndex - 1 + links.length) % links.length;
      updateSelection();
      return;
    }

    if (event.key === "Enter") {
      var selected = getResultLinks()[selectedIndex];
      if (selected) {
        event.preventDefault();
        selected.click();
      }
    }
  });
})();
