import Preloader from "@/components/Preloader";
import ActiveNav from "@/components/ActiveNav";
import Sidebar from "@/components/Sidebar";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Work from "@/components/Work";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Preloader />
      <ActiveNav />

      <a href="#main-content" className="skip-link">
        Skip to content
      </a>

      <div className="wrap">
        <Sidebar />

        <main id="main-content" tabIndex={-1}>
          <About />
          <Experience />
          <Work />
          <Contact />
          <Footer />
        </main>
      </div>
    </>
  );
}
