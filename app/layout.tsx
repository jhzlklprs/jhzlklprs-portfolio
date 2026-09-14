import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

// UPDATE ME: replace with your real deployed domain before publishing.
const SITE_URL = "https://jahzeelkiel.vercel.app";

export const metadata: Metadata = {
  title: "Jahzeel Kiel Peras — .NET Developer",
  description:
    "Jahzeel Kiel Peras, .NET Developer — selected work, experience, and contact.",
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/assets/images/favicon.png",
  },
  openGraph: {
    type: "website",
    siteName: "Jahzeel Kiel Peras",
    title: "Jahzeel Kiel Peras — .NET Developer",
    description:
      "Selected work, experience, and contact — .NET, C#, and SQL Server.",
    url: SITE_URL,
    // UPDATE ME: a real 1200x630 social preview image
    images: ["/assets/images/og-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Jahzeel Kiel Peras — .NET Developer",
    description:
      "Selected work, experience, and contact — .NET, C#, and SQL Server.",
    images: ["/assets/images/og-image.png"],
  },
  other: {
    "color-scheme": "dark light",
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Jahzeel Kiel Peras",
  jobTitle: ".NET Developer",
  url: SITE_URL + "/",
  email: "mailto:jhzlklprs@gmail.com",
  sameAs: [
    "https://github.com/jhzlklprs",
    "https://linkedin.com/jhzlklprs",
    "https://codepen.io/jhzlklprs",
  ],
};

// Runs before React hydrates (and before the stylesheet paints), so the
// correct theme lands on <html data-theme="..."> from the very first
// frame — same no-flash technique as the original static site's inline
// <head> script, just placed where Next.js's App Router expects it.
const noFlashThemeScript = `
(function () {
  var saved = localStorage.getItem('portfolio-theme');
  var theme = (saved === 'light' || saved === 'dark' || saved === 'system') ? saved : 'system';
  document.documentElement.setAttribute('data-theme', theme);

  var resolved = theme;
  if (theme === 'system') {
    resolved = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  var meta = document.querySelector('meta[name="theme-color"]');
  if (meta) {
    meta.setAttribute('content', resolved === 'light' ? '#f7f7f7' : '#0a0b0f');
  }
})();
`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
  lang="en"
  className={`${inter.variable} ${jetbrainsMono.variable}`}
  suppressHydrationWarning
>
      <head>
        <meta name="theme-color" content="#0a0b0f" />
        <script dangerouslySetInnerHTML={{ __html: noFlashThemeScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
