import Link from "next/link";
import StatePage, { NotFoundIllustration } from "@/components/StatePage";

export default function NotFound() {
  return (
    <StatePage
      illustration={<NotFoundIllustration />}
      label="404 · Page Not Found"
      title="This page doesn't exist."
      text="The page you're looking for may have been moved, renamed, or never existed in the first place."
      actions={
        <Link className="btn-home" href="/">
          Back to Homepage
        </Link>
      }
    />
  );
}
