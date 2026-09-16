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

                  var isActive =
                    link.getAttribute(
                      'href'
                    ) ===
                    '#' +
                    entry.target.id;

                  link.classList.toggle(
                    'active',
                    isActive
                  );

                  if (isActive) {

                    link.setAttribute(
                      'aria-current',
                      'location'
                    );

                  } else {

                    link.removeAttribute(
                      'aria-current'
                    );

                  }

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
     Theme Colors — kept in sync with style.css variables,
     used to update the mobile browser chrome color below.
  ------------------------------------------------------- */

  var THEME_COLORS = {
    dark: '#0a0b0f',
    light: '#f7f7f7'
  };

  var themeColorMeta =
    document.querySelector(
      'meta[name="theme-color"]'
    );


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

        var isActive = buttonTheme === theme;

        button.classList.toggle(
          'active',
          isActive
        );

        button.setAttribute(
          'aria-pressed',
          String(isActive)
        );

      }
    );


    /* -----------------------------------------------------
       Update Browser Chrome Color
    ----------------------------------------------------- */

    if (themeColorMeta) {

      var resolvedTheme = theme;

      if (theme === 'system') {

        resolvedTheme =
          window.matchMedia(
            '(prefers-color-scheme: dark)'
          ).matches
            ? 'dark'
            : 'light';

      }

      themeColorMeta.setAttribute(
        'content',
        THEME_COLORS[resolvedTheme] || THEME_COLORS.dark
      );

    }


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
     Defaults to "dark" when no preference has been saved yet.
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
      'dark'
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


/* =========================================================
   PRELOADER
========================================================= */

(function () {

  var preloader =
    document.getElementById(
      'preloader'
    );

  if (!preloader) {
    return;
  }

  var fill =
    preloader.querySelector(
      '.preloader-bar-fill'
    );

  var percentEl =
    preloader.querySelector(
      '.preloader-percent'
    );

  var reduceMotion =
    window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

  var progress = 0;

  var startTime = Date.now();

  var rafId = null;

  /* Preloader always shows for at least this long, so it
     never flashes on a fast connection — feels intentional
     instead of like a glitch. */
  var MIN_VISIBLE_MS = 900;

  /* Pause at 100% before fading out */
  var HOLD_AT_FULL_MS = 250;


  /* -------------------------------------------------------
     Easing — decelerates toward the target, no hard snap
  ------------------------------------------------------- */

  function easeOutCubic(t) {
    return 1 - Math.pow(1 - t, 3);
  }


  /* -------------------------------------------------------
     Update Progress
  ------------------------------------------------------- */

  function setProgress(value) {

    progress = Math.min(value, 100);

    if (fill) {
      fill.style.width = progress + '%';
    }

    if (percentEl) {
      percentEl.textContent =
        String(Math.round(progress)).padStart(2, '0') + '%';
    }

  }


  /* -------------------------------------------------------
     Animate progress smoothly from its current value to a
     target over a given duration, easing the whole way —
     used both for the pre-load climb and the final fill.
  ------------------------------------------------------- */

  function animateTo(target, duration, onDone) {

    cancelAnimationFrame(rafId);

    var from = progress;
    var start = null;

    function step(timestamp) {

      if (start === null) {
        start = timestamp;
      }

      var elapsed = timestamp - start;
      var t = Math.min(elapsed / duration, 1);

      setProgress(
        from + (target - from) * easeOutCubic(t)
      );

      if (t < 1) {
        rafId = requestAnimationFrame(step);
      } else if (onDone) {
        onDone();
      }

    }

    rafId = requestAnimationFrame(step);

  }


  /* -------------------------------------------------------
     Hide Preloader
  ------------------------------------------------------- */

  function hidePreloader() {

    document.documentElement.classList.remove(
      'is-loading'
    );

    preloader.classList.add(
      'is-hidden'
    );

    preloader.addEventListener(
      'transitionend',
      function handler() {

        preloader.remove();

        preloader.removeEventListener(
          'transitionend',
          handler
        );

      }
    );

  }


  document.documentElement.classList.add(
    'is-loading'
  );


  /* -------------------------------------------------------
     Reduced Motion — skip the count-up, just wait for load
  ------------------------------------------------------- */

  if (reduceMotion) {

    setProgress(100);

    function finishReduced() {

      var elapsed = Date.now() - startTime;

      var remaining =
        Math.max(MIN_VISIBLE_MS - elapsed, 0);

      setTimeout(hidePreloader, remaining);

    }

    if (document.readyState === 'complete') {
      finishReduced();
    } else {
      window.addEventListener('load', finishReduced);
    }

    return;

  }


  /* -------------------------------------------------------
     Phase 1 — eased climb toward 90%, simulating progress
     while we wait to hear that the page is actually ready.
     Deliberately slow/decelerating; gets interrupted by
     finish() as soon as the real page load completes.
  ------------------------------------------------------- */

  animateTo(90, 1800);


  /* -------------------------------------------------------
     Finish — triggered on window load, or a safety timeout.
     Eases smoothly from wherever the bar currently sits up
     to 100% (no snap), then waits out MIN_VISIBLE_MS before
     fading the preloader away.
  ------------------------------------------------------- */

  function finish() {

    var elapsed = Date.now() - startTime;

    var remaining =
      Math.max(MIN_VISIBLE_MS - elapsed, 0);

    /* Stretch the final fill across whatever time is left
       before the minimum-visible threshold, so it reads as
       one continuous glide to 100% rather than a jump. */
    var fillDuration =
      Math.max(remaining, 350);

    animateTo(
      100,
      fillDuration,
      function () {
        setTimeout(hidePreloader, HOLD_AT_FULL_MS);
      }
    );

  }

  if (document.readyState === 'complete') {
    finish();
  } else {
    window.addEventListener('load', finish);
  }

  setTimeout(finish, 4000);

})();


/* =========================================================
   TERMINAL BOOT ANIMATION
   Types out the fake boot sequence in #terminalBoot line by
   line, then leaves a blinking cursor on the final line and
   loops. Respects prefers-reduced-motion by skipping the
   typing and just showing the finished state.
========================================================= */

(function () {

  var terminal =
    document.getElementById(
      'terminalBoot'
    );

  if (!terminal) {
    return;
  }

  var lineEls =
    Array.prototype.slice.call(
      terminal.querySelectorAll(
        '.terminal-boot-line'
      )
    );

  if (!lineEls.length) {
    return;
  }

  var reduceMotion =
    window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

  var TYPE_SPEED_MS = 18;
  var LINE_DELAY_MS = 220;
  var RESTART_DELAY_MS = 3200;


  /* -------------------------------------------------------
     Reduced Motion — show the finished state, no typing,
     no looping, no blinking cursor.
  ------------------------------------------------------- */

  if (reduceMotion) {

    lineEls.forEach(
      function (lineEl) {

        var text =
          lineEl.getAttribute(
            'data-text'
          ) || '';

        var cursorEl =
          lineEl.querySelector(
            '.terminal-boot-cursor'
          );

        lineEl.textContent = text;

        if (cursorEl) {
          lineEl.appendChild(cursorEl);
        }

      }
    );

    return;

  }


  /* -------------------------------------------------------
     Type A Single Line
  ------------------------------------------------------- */

  function typeLine(lineEl, onDone) {

    var text =
      lineEl.getAttribute(
        'data-text'
      ) || '';

    var cursorEl =
      lineEl.querySelector(
        '.terminal-boot-cursor'
      );

    var i = 0;

    lineEl.textContent = '';

    function step() {

      i = i + 1;

      lineEl.textContent =
        text.slice(0, i);

      if (cursorEl) {
        lineEl.appendChild(cursorEl);
      }

      if (i < text.length) {

        setTimeout(step, TYPE_SPEED_MS);

      } else if (onDone) {

        onDone();

      }

    }

    step();

  }


  /* -------------------------------------------------------
     Reset All Lines Back To Empty
  ------------------------------------------------------- */

  function resetLines() {

    lineEls.forEach(
      function (lineEl) {

        var cursorEl =
          lineEl.querySelector(
            '.terminal-boot-cursor'
          );

        lineEl.textContent = '';

        if (cursorEl) {

          cursorEl.classList.remove(
            'is-visible'
          );

          lineEl.appendChild(
            cursorEl
          );

        }

      }
    );

  }


  /* -------------------------------------------------------
     Run The Full Boot Sequence, Then Loop
  ------------------------------------------------------- */

  function runSequence() {

    resetLines();

    var index = 0;

    function next() {

      if (index >= lineEls.length) {

        var finalCursor =
          terminal.querySelector(
            '.terminal-boot-line--final .terminal-boot-cursor'
          );

        if (finalCursor) {

          finalCursor.classList.add(
            'is-visible'
          );

        }

        setTimeout(
          runSequence,
          RESTART_DELAY_MS
        );

        return;

      }

      var lineEl = lineEls[index];

      typeLine(
        lineEl,
        function () {

          index = index + 1;

          setTimeout(
            next,
            LINE_DELAY_MS
          );

        }
      );

    }

    next();

  }

  runSequence();

})();