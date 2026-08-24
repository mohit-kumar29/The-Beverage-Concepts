import React, { useEffect, useState, useLayoutEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { ReactLenis, useLenis } from "@studio-freight/react-lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Home Sections
import HeroSection from "./components/HeroSection";
import VisionSection from "./components/VisionSection";
import AboutUs from "./components/AboutUs";
import OurServices from "./components/OurServices";
import Gallery from "./components/Gallery";
import ContactUs from "./components/ContactUs";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";

// Pages
import ElementalBeverageAlchemy from "./pages/ElementalBeverageAlchemy";
import BespokeBeverageDesign from "./pages/BespokeBeverageDesign";
import TotalBeverageSolution from "./pages/TotalBeverageSolution";
import FoundersStory from "./pages/FoundersStory";

gsap.registerPlugin(ScrollTrigger);

function Home() {
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;
    window.lenis = lenis;

    const refresh = () => ScrollTrigger.refresh();
    requestAnimationFrame(refresh);

    return () => {
      window.lenis = null;
    };
  }, [lenis]);

  return (
    <main className="relative w-full bg-[#000000] min-h-screen">
      <Navbar />
      <HeroSection />
      <VisionSection />
      <AboutUs />
      <OurServices />
      <Gallery />
      <ContactUs />
      <Footer />
    </main>
  );
}

function ScrollToTop() {
  const { pathname, search, hash } = useLocation();
  const lenis = useLenis();

  // 1. Clear hash from URL and reset to top on initial page load / refresh
  useLayoutEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    // If loaded with a hash initially on refresh, strip it cleanly
    if (window.location.hash) {
      window.history.replaceState(null, "", window.location.pathname);
      window.scrollTo(0, 0);
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
      if (lenis) lenis.scrollTo(0, { immediate: true });
    }
  }, []);

  // 2. Handle in-app navigation, section scrolling, and back buttons
  useLayoutEffect(() => {
    if (hash) {
      let targetId = hash.replace("#", "");
      
      // Retry finding element in DOM after route transition
      let retries = 0;
      const findAndScroll = () => {
        const el = document.getElementById(targetId) || document.querySelector(hash);
        if (el) {
          if (lenis) {
            lenis.scrollTo(el, { offset: 0, duration: 1.2 });
          } else {
            el.scrollIntoView({ behavior: "smooth" });
          }
          ScrollTrigger.refresh();
        } else if (retries < 15) {
          retries++;
          setTimeout(findAndScroll, 50);
        }
      };

      const timer = setTimeout(findAndScroll, 100);
      return () => clearTimeout(timer);
    } else {
      const params = new URLSearchParams(search);
      const section = params.get("section");

      if (lenis) lenis.stop();

      if (section) {
        const el = document.getElementById(section);
        if (el) {
          if (lenis) {
            lenis.scrollTo(el, { immediate: true });
          } else {
            el.scrollIntoView({ behavior: "instant" });
          }
        }
      } else {
        window.scrollTo(0, 0);
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
        if (lenis) {
          lenis.scrollTo(0, { immediate: true });
        }
      }

      const timer = setTimeout(() => {
        ScrollTrigger.refresh();
        if (lenis) lenis.start();
      }, 50);

      return () => clearTimeout(timer);
    }
  }, [pathname, search, hash, lenis]);

  return null;
}

export default function App() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    ScrollTrigger.config({
      ignoreMobileResize: true,
    });

    ScrollTrigger.defaults({
      fastScrollEnd: true,
    });

    return () => {
      window.removeEventListener("resize", checkMobile);
      ScrollTrigger.killAll();
    };
  }, []);

  return (
    <ReactLenis
      root
      options={{
        duration: isMobile ? 0 : 1.25,
        lerp: isMobile ? 1 : 0.08,
        smoothWheel: true,
        smoothTouch: false,
        wheelMultiplier: 1,
        touchMultiplier: 1,
        autoResize: true,
        orientation: "vertical",
        gestureOrientation: "vertical",
        easing: (t) => 1 - Math.pow(1 - t, 4),
      }}
    >
      <Router>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/elemental-beverage-alchemy"
            element={<ElementalBeverageAlchemy />}
          />
          <Route
            path="/bespoke-beverage-design"
            element={<BespokeBeverageDesign />}
          />
          <Route
            path="/total-beverage-solution"
            element={<TotalBeverageSolution />}
          />
          <Route path="/founders-story" element={<FoundersStory />} />
        </Routes>
      </Router>
    </ReactLenis>
  );
}