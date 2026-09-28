/*
 * PROJECT DATA — the only file you edit to add or change a case study.
 *
 * case-study.html?id=<id> renders whichever project has that id.
 * Every field is optional except id, title, year: leave one out and that
 * part of the page simply doesn't appear.
 *
 * FIELDS
 *   id         unique, used in the URL (case-study.html?id=hotel-rosita)
 *   year       shown first in the meta line
 *   tagline    short line after the year, e.g. "Website redesign & development"
 *   status     e.g. "Live", "Internal system", "In progress"
 *   title      big page title
 *   lead       the intro paragraph under the title
 *   links      [{ label, url, primary }]  primary:true = accent colour
 *   badges     [{ label, value }]         small two-tone pills (Role, Type…)
 *   hero       screenshot path            browserUrl = text in the browser bar
 *   body       ["paragraph", ...]         the main story (left column)
 *   note       a final, dimmer paragraph
 *   highlights ["sentence", ...]          right-hand HIGHLIGHTS list
 *   stack      ["Tech", ...]              right-hand BUILT WITH tags
 *   figures    [{ src, caption }]         extra images shown below the story
 *
 * INLINE MARKUP inside body / highlights / note:
 *   *text*        → accent-coloured emphasis
 *   `text`        → small code pill
 *   [label](url)  → link
 *
 * Images live in assets/projects/<id>/  (e.g. assets/projects/hotel-rosita/cover.jpg)
 * Order in this list = order of "Next project".
 */
window.PROJECTS = [
  {
    id: "preventive-maintenance",
    year: "2026",
    tagline: "IT asset & maintenance management",
    status: "In progress",
    title: "Preventive Maintenance System",
    lead: "A tracking system for the tech support team's preventive maintenance visits across every department, built to replace paper forms and Excel sheets.",
    badges: [
      { label: "Role", value: "Software Developer" },
      { label: "Type", value: "Internal system" }
    ],
    hero: "assets/projects/preventive-maintenance/cover.jpg",
    browserUrl: "internal.preventive-maintenance",

    body: [
      "Tech support performs preventive maintenance on the units in every department. Tracking that on paper and in Excel makes it hard to see which units were serviced, when, and by whom. This system turns each visit into a *searchable record*.",
      "Each record follows the unit itself, including its age, so the team sees how old the equipment is alongside its maintenance history. The dashboard summarizes active PM records and issued, acquired, and depreciated units, with a brand and model breakdown, a unit-type breakdown, and a maintenance overview by department, visit date, and technician.",
      "A technician panel shows each tech's total PMs and last visit at a glance, records can be exported, and user management and system maintenance sit alongside in the sidebar."
    ],
    note: "Still in progress. The plan is to move it to ASP.NET Core MVC with Entity Framework.",

    highlights: [
      "Dashboard cards for active PM records and issued, acquired, and depreciated units",
      "Tracks each unit's age and details, not just that a visit happened",
      "Per-technician panel with total PMs and last visit date",
      "Maintenance overview by department, date visited, and tech support",
      "Charts for brand and model and for unit type (laptop, Macbook, PC)",
      "Data export, so records no longer live in paper forms and Excel sheets"
    ],
    stack: ["C#", "ASP.NET Web Forms", "ADO.NET", "MS SQL Server", "Bootstrap", "HTML", "CSS", "JavaScript"]
  },

  {
    id: "jewelry-pawning-purpose",
    year: "2025",
    tagline: "Analytics dashboard",
    status: "Internal system",
    title: "Jewelry Pawning Purpose",
    lead: "An analytics dashboard that shows why customers pawn their jewelry, and how those reasons differ across age groups.",
    badges: [
      { label: "Role", value: "Software Developer" },
      { label: "Type", value: "Internal system" }
    ],
    hero: "assets/projects/jewelry-pawning-purpose/cover.jpg",
    browserUrl: "internal.jewelry-analytics",

    body: [
      "Every pawn transaction has a purpose behind it: helping family, saving or investing, starting a business, paying for school, covering an emergency. This dashboard turns those records into a picture management can read at a glance, so it is clear *why* customers pawn and *who* they are.",
      "Purposes are grouped into eight categories: family support, savings and investment, business capital, travel and leisure, education, emergency and medical aid, celebration, and others. A stacked bar chart splits each category across six age brackets, from 18–25 up to 65+, while a pie chart shows each category's share of the whole.",
      "Below the charts, every category has its own summary card with its overall count. Expanding a card reveals the gender and age breakdown behind it. A date-range filter narrows every chart and card to the period being reviewed, and one click exports the data to Excel for reporting.",
      "It is built as an ASP.NET Web Forms application, with ADO.NET reading from MS SQL Server and Bootstrap handling the layout, plus custom HTML, CSS, and JavaScript for the interactive parts."
    ],

    highlights: [
      "Stacked bar chart splits every pawning purpose across six age brackets, from 18–25 to 65+",
      "Pie chart shows each purpose's share of the total at a glance",
      "Eight purpose cards, each expandable to its gender and age data",
      "Date-from and date-to filter with a one-click reset",
      "Export to Excel for offline reporting"
    ],
    stack: ["HTML", "CSS", "JavaScript", "ASP.NET Web Forms", "Bootstrap", "ADO.NET", "MS SQL Server", "Excel export"]
  },

  {
    id: "hotel-rosita",
    year: "2024",
    tagline: "Website redesign & development",
    status: "Live",
    title: "Hotel Rosita",
    lead: "Bringing a client-provided design to life through a polished, responsive, and interactive web experience.",
    links: [
      { label: "Live site", url: "https://www.hotelrosita.com.ph", primary: true }
    ],
    badges: [
      { label: "Role", value: "Web Developer" },
      { label: "Type", value: "Redesign" }
    ],
    hero: "assets/projects/hotel-rosita/cover.jpg",
    browserUrl: "www.hotelrosita.com.ph",

    body: [
      "Hotel Rosita provided the initial visual direction, including UI designs, page layouts, imagery, and a defined color palette. The goal was to transform that static direction into a responsive website while keeping the client's intended visual identity intact.",
      "The work was not about replacing the client's concept. It was about translating it accurately, refining the parts that needed to work better on the web, and adding enough interaction to make the result feel *alive*.",
      "The implementation focused on refining the supplied layouts, improving the responsive experience, and introducing motion so the final website felt less static and more engaging.",
      "The final website preserves the visual direction established by the client while introducing responsive layouts, animation, transitions, and interactive details. It still feels recognizably rooted in the original Hotel Rosita concept."
    ],

    highlights: [
      "Reviewed the supplied screens, imagery, layouts, typography, spacing, and color palette *before* writing any code",
      "Adjusted layout relationships, spacing, sizing, and responsive behavior so the visual direction translated naturally to the web",
      "Added transitions, hover states, and animation to move the original concept beyond a static composition",
      "Connected the required functionality, including a contact form sending mail through PHPMailer",
      "Checked layouts and interactions across screen sizes before delivery"
    ],
    stack: ["HTML", "CSS", "JavaScript", "PHP", "PHPMailer", "Responsive design"]
  },

  {
    id: "employee-disbursements-tracker",
    year: "2026",
    tagline: "Employee transactions dashboard",
    status: "In progress",
    title: "Employee Disbursements Tracker",
    lead: "A dashboard where employees can see their own disbursement transactions, filtered by transaction type.",
    links: [
      { label: "Live system", url: "https://rpiwebhost.gotdns.com/EDT/Dashboard.aspx", primary: true }
    ],
    badges: [
      { label: "Role", value: "Software Developer" },
      { label: "Type", value: "Internal system" }
    ],
    hero: "assets/projects/employee-disbursements-tracker/cover.jpg",
    browserUrl: "internal.disbursements-tracker",

    body: [
      "Employee Disbursements Tracker gives employees a single place to see their own disbursement transactions, such as cash advances, reimbursements, and medical or bereavement benefits, without having to ask around for them.",
      "A transaction-type dropdown filters what is shown, from *All Types* down to eleven specific categories. Summary cards show total transactions and how many cash advances are still unliquidated versus liquidated. A line chart tracks transactions over time, a doughnut chart breaks them down by type, and a recent-transactions table lists the date, type, control number, amount, and status.",
      "It is built with ASP.NET and C#, with ADO.NET reading from MS SQL Server and Bootstrap plus custom HTML, CSS, and JavaScript on the front end."
    ],
    note: "The system is at its first stage, view-only. The next feature lets employees apply for a transaction type directly, and administrators will see those requests.",

    highlights: [
      "Transaction-type dropdown filters the whole dashboard, with eleven types from bereavement and cash advance to reimbursement and sickness",
      "Summary cards for total transactions and cash advances liquidated versus unliquidated",
      "Transactions-over-time line chart and breakdown-by-type doughnut chart",
      "Recent-transactions table with date, type, control number, amount, and status",
      "Date-range filter with an Apply button",
      "Next: employees apply for a type in the system, and the admin sees the requests"
    ],
    stack: ["C#", "ASP.NET", "ADO.NET", "MS SQL Server", "Bootstrap", "HTML", "CSS", "JavaScript"]
  },

  {
    id: "personal-portfolio",
    year: "2026",
    tagline: "Web development",
    status: "In progress",
    title: "Personal Portfolio",
    lead: "The site you're on: a developer portfolio built from scratch to show .NET and business-systems work, with no framework and no build step.",
    badges: [
      { label: "Role", value: "Designer & Developer" },
      { label: "Type", value: "Portfolio" }
    ],
    hero: "assets/projects/personal-portfolio/cover.jpg",

    body: [
      "This portfolio is the project I'm working on right now. It presents my .NET and business-systems work in one place, built with plain HTML, CSS, and JavaScript instead of a template or framework.",
      "Every case study renders from a single template and one data file, so adding a project means adding an entry rather than building a new page. A keyboard-driven search palette (*Ctrl K*) jumps to any page, project, or action.",
      "It is still evolving: new case studies, screenshots, and content are added as each project gets documented."
    ],

    highlights: [
      "One case-study template driven by a single data file, instead of a separate page per project",
      "Command-palette search that jumps to any page, project, or action",
      "Dark, responsive layout with shared navigation and footer across every page",
      "No framework and no build step: plain files that deploy as a static site"
    ],
    stack: ["HTML", "CSS", "JavaScript"]
  },

  {
    id: "portfolio-v1",
    year: "2026",
    tagline: "Previous version",
    status: "Archived",
    title: "Personal Portfolio v1",
    lead: "The first version of this portfolio: a fixed-sidebar layout with a light and dark theme toggle, built with plain HTML, CSS, and JavaScript.",
    badges: [
      { label: "Role", value: "Designer & Developer" },
      { label: "Type", value: "Portfolio" }
    ],
    hero: "assets/projects/portfolio-v1/cover.jpg",

    body: [
      "Version one of my portfolio used a fixed sidebar for navigation, with the about text, experience timeline, and selected work in a single scrolling column beside it. A terminal-style session card at the top of the page set the tone.",
      "It included a system, light, and dark theme switch. The current portfolio replaced it with a multi-page layout and a data-driven case-study template."
    ],

    highlights: [
      "Fixed sidebar navigation: About, Experience, Work, Contact",
      "System, light, and dark theme toggle",
      "Terminal-style session card and an experience timeline",
      "Plain HTML, CSS, and JavaScript with no framework"
    ],
    stack: ["HTML", "CSS", "JavaScript"]
  },

  {
    id: "it-support-login",
    year: "2025",
    tagline: "Interface design",
    status: "Internal system",
    title: "IT Support Login",
    lead: "A custom login experience with an IT support visual direction.",
    badges: [
      { label: "Role", value: "Developer" },
      { label: "Type", value: "Interface design" }
    ],

    /* ===== MOCK CONTENT: replace every [Placeholder] with your real details ===== */
    body: [
      "[Placeholder] The IT support team's tools deserved a sign-in page that felt like their own, not a default form. This login uses an IT support visual direction, with a friendly *Welcome back* heading and a focused sign-in card.",
      "[Placeholder] Describe how sign-in works here: what gets validated, which error messages appear, and where the user lands after a successful login.",
      "[Placeholder] Describe the design details that give it character, such as the background, animation, or theme."
    ],
    note: "[Placeholder] Add what you learned building it, or where else the design is used.",

    highlights: [
      "[Placeholder] Focused sign-in card with a clear welcome heading",
      "[Placeholder] Validation and error messages that say what went wrong",
      "[Placeholder] Visual direction matched to the IT support team",
      "[Placeholder] Responsive layout for desktop and mobile"
    ],
    stack: ["HTML", "CSS", "JavaScript"]
  },

  {
    id: "ledger",
    year: "2026",
    tagline: "Concept mockup",
    status: "Concept",
    title: "Ledger",
    lead: "A financial dashboard and reporting interface concept focused on performance, usability, and clean data visualization.",
    badges: [
      { label: "Type", value: "Mockup" }
    ],

    body: [
      "Ledger is a design concept, not a shipped system. It explores how a financial dashboard could present performance data clearly, with a focus on readable charts and an interface that stays easy to use.",
      "The concept is aimed at the .NET stack, using C#, ASP.NET, and SQL Server."
    ],
    stack: ["C#", "ASP.NET", "SQL Server"]
  }
];
