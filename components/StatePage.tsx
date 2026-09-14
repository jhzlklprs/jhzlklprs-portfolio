export default function StatePage({
  illustration,
  label,
  title,
  text,
  actions,
}: {
  illustration: React.ReactNode;
  label: string;
  title: string;
  text: string;
  actions?: React.ReactNode;
}) {
  return (
    <div className="state-page reveal">
      <div className="state-illustration">{illustration}</div>
      <p className="state-label">{label}</p>
      <h1>{title}</h1>
      <p className="state-text">{text}</p>
      {actions && <div className="state-actions">{actions}</div>}
    </div>
  );
}

export function NotFoundIllustration() {
  return (
    <svg viewBox="0 0 240 160" xmlns="http://www.w3.org/2000/svg">
      <rect x="0.5" y="0.5" width="239" height="159" rx="10" fill="var(--surface)" stroke="var(--border)" />
      <circle cx="20" cy="20" r="3" fill="var(--border)" />
      <circle cx="32" cy="20" r="3" fill="var(--border)" />
      <circle cx="44" cy="20" r="3" fill="var(--border)" />
      <line x1="0.5" y1="34" x2="239.5" y2="34" stroke="var(--border)" />
      <text
        x="112"
        y="112"
        textAnchor="middle"
        fontFamily="Inter, sans-serif"
        fontWeight="800"
        fontSize="48"
        fill="var(--border)"
      >
        404
      </text>
      <g
        transform="translate(158,90)"
        fill="none"
        stroke="var(--accent)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="0" cy="0" r="15" />
        <line x1="11" y1="11" x2="22" y2="22" />
      </g>
    </svg>
  );
}

export function MaintenanceIllustration() {
  return (
    <svg viewBox="0 0 240 160" xmlns="http://www.w3.org/2000/svg">
      <rect x="0.5" y="0.5" width="239" height="159" rx="10" fill="var(--surface)" stroke="var(--border)" />
      <circle cx="20" cy="20" r="3" fill="var(--border)" />
      <circle cx="32" cy="20" r="3" fill="var(--border)" />
      <circle cx="44" cy="20" r="3" fill="var(--border)" />
      <line x1="0.5" y1="34" x2="239.5" y2="34" stroke="var(--border)" />
      <g
        transform="translate(120,92)"
        fill="none"
        stroke="var(--accent)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle r="24" />
        <circle r="7.5" />
        <line x1="0" y1="-33" x2="0" y2="-24" />
        <line x1="0" y1="33" x2="0" y2="24" />
        <line x1="-33" y1="0" x2="-24" y2="0" />
        <line x1="33" y1="0" x2="24" y2="0" />
        <line x1="-23" y1="-23" x2="-17" y2="-17" />
        <line x1="23" y1="-23" x2="17" y2="-17" />
        <line x1="-23" y1="23" x2="-17" y2="17" />
        <line x1="23" y1="23" x2="17" y2="17" />
      </g>
      <line x1="55" y1="140" x2="185" y2="140" stroke="var(--border)" strokeWidth="4" strokeLinecap="round" />
      <line x1="55" y1="140" x2="130" y2="140" stroke="var(--accent)" strokeWidth="4" strokeLinecap="round" />
    </svg>
  );
}
