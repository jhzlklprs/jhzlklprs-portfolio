
/* =========================================================
   PORTFOLIO JAVASCRIPT
========================================================= */


/* =========================================================
   ACTIVE NAVIGATION
========================================================= */

(function () {

  var sections =
    document.querySelectorAll(
      'main section[id]'
    );

  var navLinks =
    document.querySelectorAll(
      'nav a[href^="#"]'
    );

  if (!sections.length || !navLinks.length) {
    return;
  }

  var observer =
    new IntersectionObserver(

      function (entries) {

        entries.forEach(
          function (entry) {

            if (
              entry.isIntersecting
            ) {

              navLinks.forEach(
                function (link) {

                  link.classList.toggle(

                    'active',

                    link.getAttribute(
                      'href'
                    ) ===
                    '#' +
                    entry.target.id

                  );

                }
              );

            }

          }
        );

      },

      {
        rootMargin:
          '-40% 0px -50% 0px'
      }

    );

  sections.forEach(
    function (section) {

      observer.observe(
        section
      );

    }
  );

})();


/* =========================================================
   THEME SWITCHER
========================================================= */

(function () {

  var themeButtons =
    document.querySelectorAll(
      '[data-theme-value]'
    );

  if (!themeButtons.length) {
    return;
  }


  /* -------------------------------------------------------
     Apply Theme
  ------------------------------------------------------- */

  function applyTheme(theme) {

    document.documentElement.setAttribute(
      'data-theme',
      theme
    );


    /* -----------------------------------------------------
       Update Active Button
    ----------------------------------------------------- */

    themeButtons.forEach(
      function (button) {

        var buttonTheme =
          button.getAttribute(
            'data-theme-value'
          );

        button.classList.toggle(
          'active',
          buttonTheme === theme
        );

      }
    );


    /* -----------------------------------------------------
       Save User Preference
    ----------------------------------------------------- */

    localStorage.setItem(
      'portfolio-theme',
      theme
    );

  }


  /* -------------------------------------------------------
     Load Saved Theme
  ------------------------------------------------------- */

  var savedTheme =
    localStorage.getItem(
      'portfolio-theme'
    );


  if (
    savedTheme === 'light' ||
    savedTheme === 'dark' ||
    savedTheme === 'system'
  ) {

    applyTheme(
      savedTheme
    );

  } else {

    applyTheme(
      'system'
    );

  }


  /* -------------------------------------------------------
     Button Events
  ------------------------------------------------------- */

  themeButtons.forEach(
    function (button) {

      button.addEventListener(
        'click',
        function () {

          var theme =
            button.getAttribute(
              'data-theme-value'
            );

          applyTheme(
            theme
          );

        }
      );

    }
  );

})();