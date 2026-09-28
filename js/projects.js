(function () {
  "use strict";

  /* ============================================================
     Projects page interactions
     Keeps your existing burger/terminal behavior and adds
     keyboard search for the project index.
     ============================================================ */

  var burger = document.getElementById("burgerBtn");
  var menu = document.getElementById("mobileMenu");
  var icon = document.getElementById("burgerIcon");

  if (burger && menu && icon) {
    var open = false;

    function setOpen(v) {
      open = v;
      menu.classList.toggle("open", open);
      burger.setAttribute("aria-expanded", open ? "true" : "false");

      icon.innerHTML = open
        ? '<path d="M6 6l12 12M18 6L6 18"/>'
        : '<path d="M3 6h18M3 12h18M3 18h18"/>';

      document.body.style.overflow = open ? "hidden" : "";
    }

    burger.addEventListener("click", function () {
      setOpen(!open);
    });

    menu.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        setOpen(false);
      });
    });
  }
})();
