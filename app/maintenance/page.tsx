import type { Metadata } from "next";
import StatePage, { MaintenanceIllustration } from "@/components/StatePage";

export const metadata: Metadata = {
  title: "Under Maintenance",
  description:
    "This site is temporarily down for maintenance. Please check back shortly.",
  robots: { index: false, follow: false },
};

export default function MaintenancePage() {
  return (
    <StatePage
      illustration={<MaintenanceIllustration />}
      label="503 · Scheduled Maintenance"
      title="We'll be right back."
      text="This site is currently undergoing scheduled maintenance while I make some improvements. Thanks for your patience — please check back shortly."
    />
  );
}
