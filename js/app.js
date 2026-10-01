import { mountComputer } from "./scene.js";

const S = window.SITE, P = S.profile;
const $ = (s, r = document) => r.querySelector(s);
const asset = (p) => (p || "").replace(/^\//, "");
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
// tiny markdown: **bold**, *emphasis* and `code`
const rich = (s) => esc(s).replace(/\*\*(.+?)\*\*/g, "<b>$1</b>").replace(/`(.+?)`/g, "<code>$1</code>").replace(/\*(.+?)\*/g, "<em>$1</em>").replace(/\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');
const arrow = "↗";
const link = (href, label) => `<a class="ext" href="${href}" target="_blank" rel="noopener noreferrer">${label} ${arrow}</a>`;

let scene = null; // 3D handle, paused when hero leaves the viewport

/* ---------- shared bits ---------- */
const windowFrame = (src, alt, url) => src ? `
  <div class="win"><div class="win-bar"><i></i><i></i><i></i><span>${url ? esc(url.replace(/^https?:\/\//, "")) : ""}</span></div>
  <img src="${asset(src)}" alt="${esc(alt)}" loading="lazy"></div>` : "";
const paras = (t, cls = "dim") => String(t).split(/\n\n+/).map((x) => `<p class="${cls}">${rich(x)}</p>`).join("");
const tagList = (a) => `<p class="tags">${a.map((t) => `<span>${esc(t)}</span>`).join("")}</p>`;

const card = (p) => `
  <a class="card reveal" href="#/projects/${p.slug}">
    ${windowFrame(p.image, p.name + " screenshot", p.browserUrl || "")}
    <div class="card-h"><h3>${esc(p.name)}</h3><span class="mono muted">${p.year}</span></div>
    <p class="dim">${esc(p.oneLiner || p.tagline)}</p>
    ${p.status ? `<span class="pill">${esc(p.status)}</span>` : ""}
  </a>`;

/* ---------- pages ---------- */
function home() {
  const featured = S.projects.filter((p) => p.featured)
    .sort((a, b) => S.PINNED.indexOf(a.slug) - S.PINNED.indexOf(b.slug));
  const now = S.experiences[0];
  return `
  <section class="hero"><div class="glow"></div>
    <div class="wrap hero-grid">
      <div>
        <div class="mono muted status"><span class="live-dot"></span>${esc(P.position.availability)}</div>
        <h1>${esc(P.heroLines[0])} <span class="lavender">${esc(P.heroLines[1])}</span></h1>
        <p class="lead dim">${rich(P.intro)}</p>
        <div class="cta-row">
          <a class="cta" href="#/projects">Browse projects →</a>
          <a class="mono muted ext" href="${P.resumeFile}" target="_blank" rel="noopener">Resume (PDF) ${arrow}</a>
        </div>
      </div>
      <div class="device" id="device" role="img" aria-label="Interactive 3D IBM 3278 terminal"></div>
    </div>
  </section>

  <section class="band"><div class="wrap between">
    <div><p class="eyebrow">right now</p><h2 class="sm">${esc(now.role)} at ${esc(now.company)}.</h2><p class="dim narrow">${esc(now.summary)}</p></div>
    <a class="mono muted ext" href="#/work">Full work history ${arrow}</a>
  </div></section>

  <section class="band"><div class="wrap">
    <p class="eyebrow">focus areas</p>
    <div class="caps">${S.capabilities.map((c) => `
      <div class="cap reveal"><h3><span class="mono lavender">▸</span>${esc(c.title)}</h3><p class="dim">${esc(c.body)}</p></div>`).join("")}</div>
  </div></section>

  <section class="band"><div class="wrap">
    <div class="between"><div><p class="eyebrow">recent projects</p><h2>Systems the business runs on.</h2></div>
      <a class="mono muted ext" href="#/projects">View all projects ${arrow}</a></div>
    <div class="grid3">${featured.map(card).join("")}</div>
  </div></section>

  <section class="band center"><div class="wrap">
    <h2>Got a system that needs work?</h2>
    <p class="dim">${esc(P.cta)}</p>
    <a class="cta" href="#/contact">Contact me</a>
  </div></section>`;
}

const head = (eyebrow, title, sub) => `<div class="wrap page"><div class="eyebrow">${eyebrow}</div><h1 class="h1">${title}</h1>${sub ? `<p class="lead dim">${sub}</p>` : ""}`;
const num = (i) => String(i + 1).padStart(2, "0");
const tagSpans = (a, cls) => `<div class="${cls}">${a.map((t) => `<span>${esc(t)}</span>`).join("")}</div>`;

/* ---------- Projects: large alternating rows, process block, more work ---------- */
const concept = {
  "it-support-login": `<div class="small-browser"><span></span><span></span><span></span></div>
    <div class="small-login-ui"><b>IT SUPPORT</b><strong>Welcome back.</strong><i></i><i></i></div>`,
  ledger: `<div class="small-browser"><span></span><span></span><span></span></div>
    <div class="small-ledger-ui"><b>Ledger</b><em>Performance overview</em>
      <svg viewBox="0 0 200 70" preserveAspectRatio="none" aria-hidden="true">
        <line x1="0" y1="17" x2="200" y2="17" stroke="rgba(255,255,255,.06)"/><line x1="0" y1="35" x2="200" y2="35" stroke="rgba(255,255,255,.06)"/><line x1="0" y1="53" x2="200" y2="53" stroke="rgba(255,255,255,.06)"/>
        <polygon points="0,62 28,50 52,55 82,34 112,42 146,20 200,8 200,70 0,70" fill="rgba(139,124,246,.10)"/>
        <polyline points="0,62 28,50 52,55 82,34 112,42 146,20 200,8" fill="none" stroke="#8b7cf6" stroke-width="1.8" stroke-linejoin="round" stroke-linecap="round" vector-effect="non-scaling-stroke"/>
      </svg></div>`,
};

function projects() {
  const big = S.projects.slice(0, 5), more = S.projects.slice(5);
  const row = (p, i) => {
    const internal = p.meta && p.meta.Type === "Internal system";
    const live = internal ? `#/private/${p.slug}` : p.links && p.links.live;
    return `
    <article class="featured-project reveal${i % 2 ? " reverse" : ""}">
      <div class="project-media">
        <a class="project-browser" href="#/projects/${p.slug}" aria-label="Open ${esc(p.name)} case study">
          <div class="browser-bar"><span class="browser-dot red"></span><span class="browser-dot yellow"></span><span class="browser-dot green"></span><span class="browser-url">${esc(p.browserUrl || "")}</span></div>
          <div class="browser-screen"><img src="${asset(p.image)}" alt="${esc(p.name)} screenshot" loading="lazy"></div>
        </a>
      </div>
      <div class="featured-copy">
        <div class="project-meta"><span>${num(i)}</span><span>${p.year}</span>${p.status ? `<span class="project-state${p.status === "Live" ? "" : " internal"}">● ${esc(p.status)}</span>` : ""}</div>
        <h3>${esc(p.name)}</h3>
        <div class="project-kicker">${esc(p.tagline)}</div>
        <p>${esc(p.oneLiner || p.summary)}</p>
        ${tagSpans(p.stack.slice(0, 5), "project-tags")}
        <div class="project-links"><a href="#/projects/${p.slug}">Case study <span>↗</span></a>${live ? `<a href="${live}"${internal ? "" : ' target="_blank" rel="noopener noreferrer"'}>Live <span>↗</span></a>` : ""}</div>
      </div>
    </article>`;
  };
  const small = (p) => `
      <a class="small-project reveal" href="#/projects/${p.slug}">
        <div class="small-shot${p.slug === "ledger" ? " small-ledger" : ""}">${p.image ? `<img src="${asset(p.image)}" alt="${esc(p.name)} screenshot" loading="lazy">` : concept[p.slug] || ""}</div>
        <div class="small-project-title"><h3>${esc(p.name)}</h3><span>${p.year}</span></div>
        <p>${esc(p.oneLiner || p.summary)}</p>
        <span class="small-link">${p.status === "Concept" ? "View concept" : p.image ? "View project" : "Case study"} ↗</span>
      </a>`;
  const pr = S.process;
  return `<div class="pg">
  <section class="projects-intro"><div class="wrap projects-intro-inner">
    <div class="eyebrow">Projects</div>
    <h1>Selected projects, <span>in detail.</span></h1>
    <p>Web applications, internal business systems, and tools built around real workflows. Each project is a chance to turn requirements into something useful, maintainable, and ready for people to use.</p>
  </div></section>

  <section class="projects-section"><div class="wrap">${big.map(row).join("")}</div></section>

  ${pr ? `<section class="project-note-section"><div class="wrap">
    <div class="eyebrow">How I approach projects</div>
    <div class="project-note-card">
      <div class="project-note-image"><div class="process-diagram">${pr.steps.map((t) => `<span>${esc(t)}</span>`).join("<i>→</i>")}</div></div>
      <div class="project-note-copy">
        <div class="project-note-label">Development process</div>
        <h2>${esc(pr.title)}</h2>
        <p>${esc(pr.body)}</p>
        <a class="more" href="#/about">More about how I work <span>↗</span></a>
      </div>
    </div>
  </div></section>` : ""}

  ${more.length ? `<section class="more-work-section"><div class="wrap">
    <div class="eyebrow">More work</div>
    <div class="more-work-grid">${more.map(small).join("")}</div>
  </div></section>` : ""}
  </div>`;
}

/* ---------- Case study ---------- */
function project(slug) {
  const i = S.projects.findIndex((x) => x.slug === slug);
  if (i < 0) return notFound();
  const p = S.projects[i], next = S.projects[(i + 1) % S.projects.length];
  const internal = p.meta && p.meta.Type === "Internal system";
  const live = internal ? `#/private/${p.slug}` : p.links && p.links.live;
  const liveLabel = internal ? "Live system" : "Live site";
  const body = p.detail ? String(p.detail).split(/\n\n+/) : [];
  const meta = Object.entries(p.meta || {});
  const arr = `<svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.4" aria-hidden="true"><path d="M3 9l6-6M4 3h5v5"/></svg>`;
  const arrBig = arr.replace('width="12" height="12"', 'width="16" height="16"');
  const back = `<svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.4" aria-hidden="true"><path d="M10 6H2M5.5 2.5L2 6l3.5 3.5"/></svg>`;
  const hasSide = (p.highlights && p.highlights.length) || (p.stack && p.stack.length);
  return `<div class="pg"><div class="wrap case-page">
    <a class="case-back" href="#/projects">${back}Back to projects</a>
    <div class="case-meta-line"><span class="yr">${p.year}</span>${p.tagline ? `<span class="rule"></span><span>${esc(p.tagline)}</span>` : ""}${p.status ? `<span class="rule"></span><span class="state">● ${esc(p.status)}</span>` : ""}</div>
    <h1 class="case-title">${esc(p.name)}</h1>
    <p class="case-lead">${esc(p.summary)}</p>
    ${live ? `<div class="case-links"><a class="primary" href="${live}"${internal ? "" : ' target="_blank" rel="noopener noreferrer"'}>${liveLabel}${arr}</a></div>` : ""}
    ${meta.length ? `<div class="case-badges">${meta.map(([k, v]) => `<span class="case-badge"><b>${esc(k)}</b><span>${esc(v)}</span></span>`).join("")}</div>` : ""}
    ${p.image ? `<figure class="case-shot"><div class="case-shot-bar"><i></i><i></i><i></i>${p.browserUrl ? `<span class="case-shot-url">${esc(p.browserUrl)}</span>` : ""}</div><img src="${asset(p.image)}" alt="${esc(p.name)} screenshot"></figure>` : ""}
    ${body.length || p.note || hasSide ? `<div class="case-body${hasSide ? "" : " no-side"}">
      <div class="case-prose">${body.map((t) => `<p>${rich(t)}</p>`).join("")}${p.note ? `<p class="note">${rich(p.note)}</p>` : ""}</div>
      ${hasSide ? `<aside class="case-side">
        ${p.highlights && p.highlights.length ? `<div class="side-label">Highlights</div><ul class="case-highlights">${p.highlights.map((h) => `<li>${rich(h)}</li>`).join("")}</ul>` : ""}
        ${p.stack && p.stack.length ? `<div class="case-built"><div class="side-label">Built with</div>${tagSpans(p.stack, "case-tags")}</div>` : ""}
      </aside>` : ""}
    </div>` : ""}
    <nav class="case-next" aria-label="Next project"><a href="#/projects/${next.slug}"><span class="lbl">Next project</span><span class="ttl">${esc(next.name)}${arrBig}</span></a></nav>
  </div></div>`;
}

/* ---------- Work ---------- */
function work() {
  return `<div class="pg">
  <section class="work-intro"><div class="wrap">
    <div class="eyebrow">Experience</div>
    <h1>Building systems and keeping them useful.</h1>
    <p class="intro-copy">A career spanning .NET development, web development, business systems, and technical support — from hands-on website work to maintaining business-critical applications.</p>
  </div></section>

  <section class="experience-section"><div class="wrap"><div class="experience-list">
    ${S.experiences.map((e, i) => `
    <article class="experience-item reveal">
      <div class="experience-side"><span class="experience-number">${num(i)}</span><span class="experience-date">${e.start} — ${e.current ? "PRESENT" : e.end}</span></div>
      <div class="experience-main">
        <div class="experience-location">${esc(e.company)}</div>
        <h3>${esc(e.role)}</h3>
        <p>${esc(e.summary)}</p>
        ${e.stack ? tagSpans(e.stack, "skill-list") : ""}
      </div>
    </article>`).join("")}
  </div></div></section>

  ${S.workAreas ? `<section class="work-focus"><div class="wrap"><div class="focus-card reveal">
    <div class="focus-label">What I work across</div>
    <div class="focus-grid">${S.workAreas.map((w) => `<div><strong>${esc(w.title)}</strong><span>${esc(w.items)}</span></div>`).join("")}</div>
  </div></div></section>` : ""}

  <section class="work-contact"><div class="wrap contact-inner">
    <div class="eyebrow">Next</div>
    <h2>Have a system to build<br><span>or improve?</span></h2>
    <p>I'm interested in practical software work where development, systems, and business requirements meet.</p>
    <a class="contact-link" href="#/contact">Contact me <span>↗</span></a>
  </div></section>
  </div>`;
}

/* ---------- About ---------- */
function about() {
  const dots = ["var(--lavender)", "#8ab4ff", "#5fd97a", "#f2c94c"];
  return `<div class="pg">
  <section class="about-wrap-outer"><div class="wrap">
    <div class="eyebrow">About</div>
    <div class="about-shell">
      <aside class="about-side">
        <div class="side-photo"><img src="assets/img/profile.png" alt="${esc(P.name)}"></div>
        <div class="side-divider"></div>
        <div class="side-meta">${S.about.facts.map((f) => `<div class="side-meta-row"><div class="label">${esc(f.k)}</div><div class="value">${esc(f.v)}</div></div>`).join("")}</div>
      </aside>
      <div class="about-main">
        <h1>${esc(S.about.lead)}</h1>
        <div class="lede">${S.about.paragraphs.map((t) => `<p>${rich(t)}</p>`).join("")}</div>
        <div class="now-list"><div class="now-label">Now</div>
          <div class="now-items">${S.about.now.map((n) => `<div class="now-item"><span class="dash">—</span>${esc(n)}</div>`).join("")}</div>
        </div>
      </div>
    </div>
  </div></section>

  <section class="about-tools"><div class="wrap"><div class="tools-section">
    <div class="eyebrow">Tools I've worked with</div>
    <h2>What's in the toolbox.</h2>
    <div class="tools-grid">${S.skills.map((g, i) => `
      <div class="tools-col"><div class="tools-head"><span class="dot" style="background:${dots[i % dots.length]}"></span><span>${esc(g.group)}</span></div>
        <div class="tools-pills">${g.items.map((t) => `<span class="tools-pill">${esc(t)}</span>`).join("")}</div></div>`).join("")}
    </div>
  </div></div></section>
  </div>`;
}

/* ---------- Contact ---------- */
function contact() {
  const host = P.socials.github.replace(/^https?:\/\//, "");
  return `<div class="pg"><section class="contact-page"><div class="wrap">
    <div class="contact-kicker"><span class="contact-rule"></span><span>CONTACT</span></div>
    <h1>Let’s build something.</h1>
    <div class="contact-grid">
      <div class="contact-copy">
        <p class="contact-lead">${esc(P.contactLead)}</p>
        <a class="contact-email" href="mailto:${P.email}"><span class="contact-icon">✉</span><span>${esc(P.email)}</span></a>
        <div class="contact-meta">
          <a href="${P.socials.github}" target="_blank" rel="noopener noreferrer"><span class="meta-icon">◉</span><span>${esc(host)}</span></a>
          <a href="${P.socials.linkedin}" target="_blank" rel="noopener noreferrer"><span class="meta-icon">in</span><span>LinkedIn</span></a>
          <span><span class="meta-icon">⌖</span><span>Philippines</span></span>
        </div>
        <div class="contact-portrait-wrap" aria-hidden="true">
          <div class="contact-orbit orbit-a"></div><div class="contact-orbit orbit-b"></div>
          <img src="assets/img/profile.png" alt="" class="contact-portrait">
        </div>
      </div>
      <div class="contact-form-card">
        <form id="contactForm">
          <div class="form-row two-col">
            <label><span>NAME</span><input id="contactName" name="name" type="text" placeholder="Your name" required></label>
            <label><span>EMAIL</span><input id="contactEmail" name="email" type="email" placeholder="you@company.com" required></label>
          </div>
          <label><span>MESSAGE</span><textarea id="contactMessage" name="message" placeholder="Tell me a little about the project or opportunity..." required></textarea></label>
          <div class="contact-form-actions"><button class="contact-submit" type="submit">Send message <span>→</span></button><span class="contact-note">Opens your email client.</span></div>
          <p class="contact-form-status" id="contactFormStatus" aria-live="polite"></p>
        </form>
      </div>
    </div>
  </div></section></div>`;
}

function bindContact() {
  const f = $("#contactForm"); if (!f) return;
  f.addEventListener("submit", (e) => {
    e.preventDefault();
    const n = $("#contactName").value.trim(), m = $("#contactEmail").value.trim(), t = $("#contactMessage").value.trim();
    if (!n || !m || !t) return;
    $("#contactFormStatus").textContent = "Opening your email client...";
    location.href = `mailto:${P.email}?subject=${encodeURIComponent("Portfolio inquiry from " + n)}&body=${encodeURIComponent(`Name: ${n}\nEmail: ${m}\n\n${t}`)}`;
  });
}

const screen = (code, title, lines, back, extra = "") => `<div class="pg"><section class="state-page"><div class="wrap">
  <div class="state-term" role="status">
    <div class="state-bar"><i></i><i></i><i></i><span>${esc(code)}</span></div>
    <pre class="state-log">${lines.map(esc).join("\n")}<span class="cursor">_</span></pre>
  </div>
  <h1>${title}</h1>${extra}
  <div class="state-actions">${back}</div>
</div></section></div>`;

function credits() {
  const x = (u, t) => `<a href="${u}" target="_blank" rel="noopener noreferrer">${t}</a>`;
  return screen("credits", "Credits.",
    ["> 3D model ...... CC BY 4.0", "> software ....... MIT / Zlib", "> fonts .......... SIL OFL 1.1"],
    `<a class="cta" href="#/">Back home</a>`,
    `<div class="state-credits dim">
      <p><b>3D model.</b> &ldquo;${x("https://skfb.ly/6XW9w", "IBM 3278 terminal")}&rdquo; by ${x("https://sketchfab.com/maxdragon", "maxdragonn")}, licensed under ${x("http://creativecommons.org/licenses/by/4.0/", "Creative Commons Attribution 4.0")}. Modified: the screen artwork was removed and replaced with a live canvas display, and the model is rotated, rescaled, and lit in code. The author does not endorse this site. ${x("CREDITS.md", "Full details")}</p>
      <p><b>Software.</b> ${x("https://threejs.org", "three.js")} (MIT) and ${x("https://github.com/pmndrs/postprocessing", "postprocessing")} (Zlib).</p>
      <p><b>Fonts.</b> ${x("https://github.com/vercel/geist-font", "Geist")} and Geist Mono, and ${x("https://github.com/marcologous/hanken-grotesk", "Hanken Grotesk")} (SIL Open Font License 1.1).</p>
    </div>`);
}

const notFound = () => screen("error.404", "Page not found.",
  ["> GET " + (location.hash || "/"), "> route ........ not found", "> status ....... 404"],
  `<a class="cta" href="#/">Back home</a><a class="mono muted ext" href="#/projects">Browse projects ${arrow}</a>`,
  `<p class="dim">That page doesn't exist, or it has moved.</p>`);

function privateSystem(slug) {
  const p = S.projects.find((x) => x.slug === slug);
  if (!p) return notFound();
  return screen("internal." + p.slug, `${esc(p.name)} is an internal system.`,
    ["> connect " + p.slug, "> network ...... private", "> access ........ restricted", "> status ........ not publicly available"],
    `<a class="cta" href="#/projects/${p.slug}">Read the case study</a><a class="mono muted ext" href="#/projects">View all projects ${arrow}</a>`,
    `<p class="dim">It runs inside a company network, so there's no public demo. The case study covers what it does, how it's built, and screenshots of the real interface.</p>`);
}

/* ---------- 3D hero ---------- */
// Decide whether to run the live 3D hero or show a still image instead.
function heroMode() {
  const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const saver = !!(navigator.connection && navigator.connection.saveData);
  const cores = navigator.hardwareConcurrency || 4;
  return calm || saver || cores < 3 ? "still" : "live";
}

function mount3d() {
  const host = $("#device"); if (!host) return;
  const showStill = () => {
    host.innerHTML = '<img class="still" src="assets/terminal-still.webp" alt="A 3D render of an IBM 3278 terminal">';
    host.classList.add("fallback");
  };
  if (heroMode() === "still") return showStill();
  try { scene = mountComputer(host, "models/ibm_3278.glb", showStill); } catch (err) { console.warn("WebGL unavailable", err); return showStill(); }
  scene.start(); // hero is above the fold: start loading + rendering immediately
  const io = new IntersectionObserver(([e]) => scene && (e.isIntersecting && !document.hidden ? scene.start() : scene.stop()), { rootMargin: "200px 0px" });
  io.observe(host);
  host._io = io;
}

/* ---------- router ---------- */
// the page is built by JS, so let us own scroll position: otherwise the browser restores the old offset after load
if ("scrollRestoration" in history) history.scrollRestoration = "manual";
const routes = { "": home, projects, work, about, contact, credits };
function render() {
  document.querySelectorAll(".device").forEach((d) => d._io && d._io.disconnect());
  scene && (scene.dispose ? scene.dispose() : scene.stop()); scene = null;
  const [, a, b] = location.hash.replace(/^#/, "").split("/"); // "#/projects/slug" -> ["", "projects", "slug"]
  const key = a || "";
  const html = key === "projects" && b ? project(b) : key === "private" && b ? privateSystem(b) : routes[key] ? routes[key]() : notFound();
  const m = $("#main"); m.innerHTML = `<div class="page-in">${html}</div>`;
  document.title = key ? `${key[0].toUpperCase() + key.slice(1)} · ${P.name}` : `${P.name} · ${P.role}`;
  document.querySelectorAll("#nav a").forEach((l) => l.classList.toggle("on", l.getAttribute("href") === "#/" + key));
  window.scrollTo({ top: 0, left: 0, behavior: "instant" }); // instant: html has scroll-behavior:smooth
  mount3d(); reveal(); bindContact();
}
function reveal() {
  const io = new IntersectionObserver((es) => es.forEach((e) => e.isIntersecting && (e.target.classList.add("in"), io.unobserve(e.target))), { threshold: 0.12 });
  document.querySelectorAll(".reveal").forEach((n) => io.observe(n));
}

$("#nav").innerHTML = S.navLinks.map((l) => `<a href="#${l.href}">${l.label}</a>`).join("") + `<a href="#/contact">Contact</a>`;
$("#foot").innerHTML = `<span class="mono muted">© ${new Date().getFullYear()} ${esc(P.name)}</span>
  <span class="mono">${link(P.socials.github, "GitHub")} ${link(P.socials.linkedin, "LinkedIn")} <a class="ext" href="mailto:${P.email}">Email</a></span>
  <span class="mono muted"><a class="ext" href="#/credits">Credits</a></span>`;
document.addEventListener("visibilitychange", () => scene && (document.hidden ? scene.stop() : scene.start()));
addEventListener("hashchange", render);
render();