import ThemeSwitcher from "@/components/ThemeSwitcher";
import { GithubIcon, LinkedinIcon, CodepenIcon } from "@/components/icons";

const NAV_ITEMS = [
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#work", label: "Work" },
  { href: "#contact", label: "Contact" },
];

export default function Sidebar() {
  return (
    <aside>
      <div>
        <div className="identity reveal" style={{ animationDelay: "0.05s" }}>
          <h1>Jahzeel Kiel Peras</h1>
          <p className="role">.NET Developer</p>
          <p>I build reliable applications with .NET, C#, and SQL Server.</p>
        </div>

        <nav
          className="reveal"
          style={{ animationDelay: "0.15s" }}
          aria-label="Section navigation"
        >
          <ul>
            {NAV_ITEMS.map((item, i) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className={i === 0 ? "active" : undefined}
                  aria-current={i === 0 ? "location" : undefined}
                >
                  <span className="dash" />
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="sidebar-foot reveal" style={{ animationDelay: "0.25s" }}>
        <div className="socials" aria-label="Social links">
          <a
            href="https://github.com/jhzlklprs"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
          >
            <GithubIcon />
          </a>
          <a
            href="https://linkedin.com/jhzlklprs"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
          >
            <LinkedinIcon />
          </a>
          <a
            href="https://codepen.io/jhzlklprs"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="CodePen"
          >
            <CodepenIcon />
          </a>
        </div>

        <ThemeSwitcher />
      </div>
    </aside>
  );
}
