type Project = {
  title: string;
  description: string;
  stack: string[];
  demoHref: string;
  demoLabel: string;
  demoExternal?: boolean;
  year: string;
  thumb: React.ReactNode;
};

const PROJECTS: Project[] = [
  {
    title: "Ledger",
    description:
      "A financial dashboard and reporting interface focused on performance, usability, and clean data visualization.",
    stack: ["C#", "ASP.NET", "SQL Server"],
    // Intentionally points at a route that doesn't exist yet, so it
    // renders the site's own not-found page as a lightweight "demo"
    // placeholder — same trick the original static site used with 404.html.
    demoHref: "/preview/ledger",
    demoLabel: "Live Demo",
    year: "2026",
    thumb: (
      <svg viewBox="0 0 200 120" xmlns="http://www.w3.org/2000/svg">
        <rect width="200" height="120" fill="var(--surface)" />
        <circle cx="12" cy="12" r="3" fill="var(--border)" />
        <circle cx="22" cy="12" r="3" fill="var(--border)" />
        <circle cx="32" cy="12" r="3" fill="var(--border)" />
        <line x1="16" y1="102" x2="184" y2="102" stroke="var(--border)" />
        <line x1="16" y1="26" x2="16" y2="102" stroke="var(--border)" />
        <polyline
          points="16,84 40,70 64,80 88,50 112,64 136,34 160,48 184,22"
          fill="none"
          stroke="var(--accent)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="184" cy="22" r="3" fill="var(--accent)" />
      </svg>
    ),
  },
  {
    title: "Preventive Maintenance System",
    description:
      "A system for managing preventive maintenance records, equipment information, and scheduled maintenance activities.",
    stack: ["ASP.NET", "C#", "SQL Server"],
    demoHref: "/maintenance",
    demoLabel: "Live Demo",
    year: "2026",
    thumb: (
      <svg viewBox="0 0 200 120" xmlns="http://www.w3.org/2000/svg">
        <rect width="200" height="120" fill="var(--surface)" />
        <rect
          x="16"
          y="26"
          width="88"
          height="82"
          rx="3"
          fill="none"
          stroke="var(--border)"
        />
        <line x1="24" y1="42" x2="96" y2="42" stroke="var(--muted)" strokeOpacity="0.55" />
        <line x1="24" y1="54" x2="96" y2="54" stroke="var(--muted)" strokeOpacity="0.55" />
        <circle cx="150" cy="60" r="22" fill="none" stroke="var(--accent)" strokeWidth="2" />
      </svg>
    ),
  },
  {
    title: "Portfolio Dashboard",
    description:
      "A modern developer portfolio built with a clean fixed-sidebar layout and responsive design.",
    stack: ["Next.js", "TypeScript", "Tailwind CSS"],
    demoHref: "/",
    demoLabel: "You're Viewing It",
    year: "2026",
    thumb: (
      <svg viewBox="0 0 200 120" xmlns="http://www.w3.org/2000/svg">
        <rect width="200" height="120" fill="var(--surface)" />
        <rect x="16" y="26" width="38" height="26" rx="4" fill="var(--accent)" fillOpacity="0.85" />
        <rect x="60" y="26" width="38" height="26" rx="4" fill="var(--muted)" fillOpacity="0.35" />
        <rect x="104" y="26" width="38" height="26" rx="4" fill="none" stroke="var(--border)" />
        <rect x="16" y="60" width="168" height="10" rx="3" fill="none" stroke="var(--border)" />
      </svg>
    ),
  },
];

export default function Work() {
  return (
    <section id="work" className="reveal" style={{ animationDelay: "0.3s" }}>
      <h2>Selected Work</h2>

      {PROJECTS.map((project) => (
        <div className="project" key={project.title}>
          <div className="thumb">{project.thumb}</div>

          <div>
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            <ul>
              {project.stack.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="project-side">
            <a
              className="btn-demo"
              href={project.demoHref}
              {...(project.demoExternal
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
            >
              {project.demoLabel}
            </a>
            <span className="num">{project.year}</span>
          </div>
        </div>
      ))}
    </section>
  );
}
