import { ArrowUpRightIcon } from "@/components/icons";

export default function Contact() {
  return (
    <section id="contact" className="reveal" style={{ animationDelay: "0.35s" }}>
      <h2>Contact</h2>

      <p className="lead">
        Always glad to hear about interesting problems or talk about
        technology.
      </p>

      <a className="email" href="mailto:jhzlklprs@gmail.com">
        jhzlklprs@gmail.com
        <ArrowUpRightIcon />
      </a>
    </section>
  );
}
