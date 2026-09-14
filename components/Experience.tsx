type Job = {
  period: string;
  company: string;
  role: string;
  description: string;
  stack: string[];
};

const JOBS: Job[] = [
  {
    period: "2025 - PRESENT",
    company: "RPI",
    role: "System Programmer I",
    description:
      "Develop and maintain business-critical .NET applications, modernize legacy systems, and deliver application features, reporting, and database solutions.",
    stack: [
      "C#",
      "ASP.NET",
      ".NET",
      "VB.NET",
      "MS SQL Server",
      "IIS",
      "JavaScript • HTML • CSS",
      "Bootstrap",
      "Legacy System Modernization",
    ],
  },
  {
    period: "2023 - 2024",
    company: "Private Contractor",
    role: "Front-end Web Developer",
    description:
      "Developed and maintained responsive websites and e-commerce solutions with a focus on usability, performance, and compatibility.",
    stack: [
      "AngularJS",
      "JavaScript",
      "HTML & CSS",
      "Responsive Web Development",
      "Website Performance Optimization",
    ],
  },
  {
    period: "2022 - 2023",
    company: "Guavatek",
    role: "Junior Web Developer",
    description:
      "Developed and maintained client and internal websites, implementing responsive interfaces and features based on project requirements.",
    stack: ["AngularJS", "JavaScript", "HTML & CSS", "Bootstrap", "cPanel · Namecheap · SSL"],
  },
  {
    period: "2020 - 2022",
    company: "Rodriguez Property Ventures & Dev't Corp.",
    role: "IT & Web Development Support",
    description:
      "Supported business operations through web development, system maintenance, inventory management, and technical support.",
    stack: [
      "HTML",
      "CSS",
      "JavaScript",
      "Website & System Maintenance",
      "Technical Support",
    ],
  },
  {
    period: "2018 - 2019",
    company: "Quadfinity Solution",
    role: "Web Developer Intern",
    description:
      "Assisted in developing, modifying, and testing responsive websites while gaining hands-on web development experience.",
    stack: [
      "HTML",
      "CSS",
      "JavaScript",
      "Responsive Web Development",
      "Website Testing & Debugging",
    ],
  },
];

export default function Experience() {
  return (
    <section
      id="experience"
      className="reveal"
      style={{ animationDelay: "0.25s" }}
    >
      <h2>Experience</h2>

      {JOBS.map((job) => (
        <div className="job" key={job.company + job.period}>
          <time>{job.period}</time>
          <div>
            <h3>
              {job.company} · <span className="company">{job.role}</span>
            </h3>
            <p className="mt-2 text-sm leading-normal">{job.description}</p>
            <ul>
              {job.stack.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      ))}

      <div className="resume-link">
        <a href="/resume.pdf" target="_blank" rel="noopener noreferrer">
          View Full Résumé
          <span>→</span>
        </a>
      </div>
    </section>
  );
}
