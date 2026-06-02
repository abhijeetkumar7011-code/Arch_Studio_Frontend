    "use client";

    import { useState } from "react";
    import Navbar from "../components/Navbar";
    import Hero from "../components/Hero";
    import Services from "../components/Services";
    import About from "../components/About";
    import Process from "../components/Process";
    import Testimonials from "../components/Testimonials";
    import Contact from "../components/Contact";
    import Footer from "../components/Footer";
    import SmoothScroll from "../components/SmoothScroll";
    import ContactModal from "../components/ContactModal";
    import Loader from "../components/Loader";
    import ProjectsShowcase from "@/components/ProjectsShowcase";
    // import CustomCursor from "../components/CustomCursor";

    export default function Home() {
      const [isContactOpen, setIsContactOpen] = useState(false);

      const openContact = () => setIsContactOpen(true);
      const closeContact = () => setIsContactOpen(false);

      return (
        <main className="bg-black relative min-h-screen selection:bg-[#d6c6b8] selection:text-black">
          <SmoothScroll />
          <Loader />
          {/* <CustomCursor /> */}

          <Navbar onContactClick={openContact} />
          
          {/* Target Sections */}
          <div id="home"><Hero onContactClick={openContact} /></div>
          <ProjectsShowcase />
          {/* <div id="projects"><Projects /></div> */}
          <div id="services"><Services /></div>
          <div id="about"><About /></div>
          <div id="process"><Process /></div>
          <div id="testimonials"><Testimonials /></div>
          <div id="contact"><Contact/></div>
          {/* <div id="contact"><Contact onContactClick={openContact} /></div> */}
          
          <Footer />

          {/* Global Form Overlay Sheet */}
          <ContactModal isOpen={isContactOpen} onClose={closeContact} />
        </main>
      );
    }