(function(){
  /* ---- mark the current page in the shared navigation ---- */
  (function(){
    var file = (window.location.pathname.split('/').pop() || 'index.html').toLowerCase();
    if (!file || file === '/') file = 'index.html';

    var pageMap = {
      'projects.html': 'projects.html',
      'work.html': 'work.html',
      'about.html': 'about.html',
      'case-study.html': 'projects.html'
    };

    var activePage = pageMap[file] || null;
    var navLinks = document.querySelectorAll('nav.links a, .mobilemenu a');

    navLinks.forEach(function(link){
      var href = (link.getAttribute('href') || '').split('#')[0].split('?')[0].toLowerCase();
      var isActive = activePage && href === activePage;
      link.classList.toggle('active', !!isActive);
      if (isActive) link.setAttribute('aria-current', 'page');
      else link.removeAttribute('aria-current');
    });

    /* The contact page is reached through the CTA rather than the numbered nav. */
    if (file === 'contact.html') {
      document.querySelectorAll('a.cta-btn[href^="contact.html"]').forEach(function(link){
        link.classList.add('active');
        link.setAttribute('aria-current', 'page');
      });
    }
  })();

  var burger = document.getElementById('burgerBtn');
  var menu = document.getElementById('mobileMenu');
  var icon = document.getElementById('burgerIcon');
  var open = false;
  function setOpen(v){
    open = v;
    menu.classList.toggle('open', open);
    burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    icon.innerHTML = open
      ? '<path d="M6 6l12 12M18 6L6 18"/>'
      : '<path d="M3 6h18M3 12h18M3 18h18"/>';
    document.body.style.overflow = open ? 'hidden' : '';
  }
  if (burger) {
    burger.addEventListener('click', function(){ setOpen(!open); });
  }
  if (menu) {
    menu.querySelectorAll('a').forEach(function(a){
      a.addEventListener('click', function(){ setOpen(false); });
    });
  }
  var deskCta = document.getElementById('deskCta');
  if (deskCta) deskCta.remove();

  /* ---- terminal ---- */
  var overlay = document.getElementById('termOverlay');
  var body = document.getElementById('termBody');
  var input = document.getElementById('termInput');
  var history = []; var histIdx = -1;

  function line(html, cls){
    var d = document.createElement('div');
    d.className = 'line' + (cls ? ' ' + cls : '');
    d.innerHTML = html;
    body.appendChild(d);
    body.scrollTop = body.scrollHeight;
  }
  function esc(s){ return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }

  var banner = 'Welcome to sunny.patel v1.0 &mdash; type <span class="prompt">help</span> to see what\'s here.';

  var commands = {
    help: function(){
      line('Available commands:');
      [['about','a couple lines on who I am'],
       ['projects','list of things I\'ve shipped'],
       ['work','current role'],
       ['skills','what I actually work in'],
       ['contact','ways to reach me'],
       ['whoami','guest session info'],
       ['resume','open the resume'],
       ['clear','clear the screen'],
       ['exit','close this terminal']].forEach(function(c){
        line('  <span class="prompt">'+c[0]+'</span><span class="dim">'+' '.repeat(Math.max(1,12-c[0].length))+c[1]+'</span>');
      });
    },
    about: function(){
      line('Software developer based in the Greater Toronto Area, Canada.');
      line('I work across the stack: real-time web apps down to the systems and cloud infrastructure underneath them.');
    },
    projects: function(){
      line('<span class="prompt">basalt</span>       2026  &mdash; hardware verification tooling for GPU firmware');
      line('<span class="prompt">ats-screener</span> 2026  &mdash; resume checker against real ATS engines');
      line('<span class="prompt">sunnify</span>       2024  &mdash; Spotify playlists to tagged local audio');
      line('<span class="dim">run "open projects" to view the full list on the page</span>');
    },
    work: function(){
      line('Currently a Software Developer Intern, doing full-stack work on applied AI tooling.');
      line('<span class="dim">run "open work" for the full path</span>');
    },
    skills: function(){
      line('Product engineering &middot; systems & infrastructure &middot; cloud & delivery.');
      line('Comfortable end to end: React/TypeScript on the front, Node/Go services, Docker & Kubernetes, CI/CD.');
    },
    contact: function(){
      line('Email:    <span class="link" data-href="mailto:hello@example.com">hello@example.com</span>');
      line('GitHub:   <span class="link" data-href="https://github.com">github.com</span>');
      line('LinkedIn: <span class="link" data-href="https://linkedin.com">linkedin.com</span>');
    },
    whoami: function(){ line('guest &mdash; read-only session, no sudo here.'); },
    resume: function(){ line('Opening résumé&hellip;'); line('<span class="dim">(hook this up to your real résumé link)</span>'); },
    sudo: function(){ line('Nice try. This session stays guest-level.', 'err'); },
    clear: function(){ body.innerHTML = ''; },
    exit: function(){ closeTerm(); }
  };

  function openLink(href){
    var a = document.createElement('a'); a.href = href; a.target = '_blank'; a.rel = 'noopener';
    document.body.appendChild(a); a.click(); a.remove();
  }

  function run(raw){
    var cmd = raw.trim();
    if(!cmd) return;
    line('<span class="prompt">guest@sunnypatel.net ~ %</span> ' + esc(cmd));
    history.push(cmd); histIdx = history.length;

    var parts = cmd.split(/\s+/);
    var name = parts[0].toLowerCase();

    if(name === 'open' && parts[1]){
      var target = parts[1].toLowerCase();
      var map = {projects:'#work', work:'#experience', about:'#skills', contact:'#contact'};
      if(map[target]){
        line('Scrolling to <span class="prompt">'+target+'</span>&hellip;');
        closeTerm();
        setTimeout(function(){ document.querySelector(map[target]).scrollIntoView({behavior:'smooth'}); }, 180);
      } else {
        line('Nothing called "'+esc(target)+'" to open.', 'err');
      }
      return;
    }
    if(commands[name]){ commands[name](); return; }
    line('command not found: ' + esc(name) + ' <span class="dim">(try "help")</span>', 'err');
  }

  function openTerm(){
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
    if(!body.childElementCount){ line(banner); }
    setTimeout(function(){ input.focus(); }, 50);
  }
  function closeTerm(){
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  document.getElementById('termOpenBtn') && document.getElementById('termOpenBtn').addEventListener('click', openTerm);
  document.getElementById('termOpenBtnMobile') && document.getElementById('termOpenBtnMobile').addEventListener('click', function(){ setOpen(false); openTerm(); });
  overlay.addEventListener('click', function(e){ if(e.target === overlay) closeTerm(); });
  document.addEventListener('keydown', function(e){
    if(e.key === 'Escape' && overlay.classList.contains('open')) closeTerm();
    if((e.key === '`' ) && !overlay.classList.contains('open') && document.activeElement !== input){
      e.preventDefault(); openTerm();
    }
  });
  body.addEventListener('click', function(e){
    if(e.target.classList.contains('link')){ openLink(e.target.getAttribute('data-href')); }
  });
  input.addEventListener('keydown', function(e){
    if(e.key === 'Enter'){ run(input.value); input.value = ''; }
    else if(e.key === 'ArrowUp'){ e.preventDefault(); if(histIdx>0){ histIdx--; input.value = history[histIdx]||''; } }
    else if(e.key === 'ArrowDown'){ e.preventDefault(); if(histIdx<history.length){ histIdx++; input.value = history[histIdx]||''; } }
  });
  /* ---- boot card typewriter loop ---- */
  (function(){
    var container = document.getElementById('bootLines');
    if(!container) return;
    var lineEls = Array.prototype.slice.call(container.querySelectorAll('.bootline'));
    var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    var TYPE_SPEED = 18, LINE_DELAY = 220, RESTART_DELAY = 3200;
    var timers = [];
    function clearTimers(){ timers.forEach(clearTimeout); timers = []; }
    function set(fn, ms){ var t = setTimeout(fn, ms); timers.push(t); return t; }

    function typeLine(el, text, onDone){
      el.style.opacity = '1';
      var isFinal = el.classList.contains('final');
      var cursorNode = isFinal ? el.querySelector('.bootcursor') : null;
      el.textContent = '';
      if(cursorNode) el.appendChild(cursorNode);
      var i = 0;
      function step(){
        i++;
        var slice = text.slice(0, i);
        if(isFinal && cursorNode){ el.textContent = slice; el.appendChild(cursorNode); }
        else { el.textContent = slice; }
        if(i < text.length){ set(step, TYPE_SPEED); }
        else { onDone && onDone(); }
      }
      step();
    }

    function resetLines(){
      lineEls.forEach(function(el){
        el.style.opacity = '0'; el.textContent = '';
        if(el.classList.contains('final')){
          var c = document.createElement('span');
          c.className = 'bootcursor'; c.id = 'bootCursor';
          el.appendChild(c);
        }
      });
    }

    function showFullImmediately(){
      lineEls.forEach(function(el){
        var text = el.getAttribute('data-text');
        el.style.opacity = '1';
        if(el.classList.contains('final')){
          el.textContent = text;
          var c = document.createElement('span');
          c.className = 'bootcursor show'; el.appendChild(c);
        } else { el.textContent = text; }
      });
    }

    function runSequence(){
      clearTimers();
      resetLines();
      var idx = 0;
      function next(){
        if(idx >= lineEls.length){
          var finalCursor = container.querySelector('.final .bootcursor');
          if(finalCursor) finalCursor.classList.add('show');
          set(runSequence, RESTART_DELAY);
          return;
        }
        var el = lineEls[idx];
        var text = el.getAttribute('data-text');
        typeLine(el, text, function(){ idx++; set(next, LINE_DELAY); });
      }
      next();
    }

    if(reduced){ showFullImmediately(); }
    else { runSequence(); }
  })();
})();