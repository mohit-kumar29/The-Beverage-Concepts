import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import tbc_logo from "../assets/tbc_logo.png";

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const sectionRef = useRef(null);
  const videoRef = useRef(null);
  const introRef = useRef(null);
  const panelRef = useRef(null);
  const glowRef = useRef(null);
  const h1Ref = useRef(null);
  const h2Ref = useRef(null);
  const logoRef = useRef(null);

  useEffect(() => {
    // Force immediate video playback on mobile mount
    if (videoRef.current) {
      videoRef.current.defaultMuted = true;
      videoRef.current.muted = true;
      videoRef.current.play().catch(() => {});
    }

    // Only play intro when entering hero directly (no hash in URL)
    const isReturningToSection = Boolean(window.location.hash);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      if (!isReturningToSection) {
        // Direct Home/Hero load: Play black screen intro slide-up
        tl.to(introRef.current, {
          y: "-100%",
          duration: 1.6,
          delay: 0.5,
          ease: "expo.inOut",
          onComplete: () => {
            if (introRef.current) {
              introRef.current.style.display = "none";
              introRef.current.style.visibility = "hidden";
            }
          },
        });

        // Main Text Animation
        tl.fromTo(
          [logoRef.current, h1Ref.current, h2Ref.current],
          { y: 160, rotateX: 15, opacity: 0 },
          { y: 0, rotateX: 0, opacity: 1, stagger: 0.12, duration: 1.8, ease: "expo.out" },
          "-=1.0"
        );

        // Panel Animation
        tl.from(panelRef.current, { x: 160, opacity: 0, duration: 1.6, ease: "power4.out" }, "-=1.2");
      } else {
        // Back button navigation: Immediately remove black overlay
        if (introRef.current) {
          introRef.current.style.display = "none";
          introRef.current.style.visibility = "hidden";
        }
        gsap.set([logoRef.current, h1Ref.current, h2Ref.current, panelRef.current], {
          y: 0,
          rotateX: 0,
          opacity: 1,
        });
      }

      // Glow Pulse
      gsap.to(glowRef.current, {
        opacity: 0.6,
        duration: 6,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // Floating animation for panel (Desktop only)
      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px)", () => {
        gsap.to(panelRef.current, {
          y: 20,
          duration: 2.5,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative w-full h-screen min-h-[100dvh] bg-[#FFFFFF] text-[#000000] overflow-hidden flex items-center justify-center cursor-default select-none"
    >
      {/* BACKGROUND VIDEO ELEMENT */}
      <div className="absolute inset-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          disablePictureInPicture
          disableRemotePlayback
          className="w-full h-full object-cover transform-gpu"
          src="/videos/water-drop.mp4"
        />
      </div>

      {/* INTRO OVERLAY */}
      <div
        ref={introRef}
        className="fixed inset-0 bg-[#000000] z-[999] flex items-center justify-center pointer-events-none w-full h-full overflow-hidden"
      />

      {/* TOP LOGO CONTAINER */}
      <div className="absolute top-0 left-0 z-50 p-6 md:p-10 lg:p-28 pt-6 md:pt-8 lg:pt-[30px] lg:pl-[50px] overflow-hidden">
        <img
          ref={logoRef}
          src={tbc_logo}
          alt="The Beverage Concepts Logo"
          className="h-[80px] sm:h-12 md:h-16 lg:h-[120px] w-auto object-contain pointer-events-none"
          style={{ opacity: 0 }}
        />
      </div>

      {/* MAIN CONTENT - EXACT SCREEN CENTERED */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-full px-4 sm:px-8 md:px-14 lg:px-28 pointer-events-none flex flex-col items-center justify-center text-center">
        <h1
          className="leading-[0.9] sm:leading-[0.95] lg:leading-[1] w-full"
          style={{ fontFamily: "'Cormorant Garamond', serif", letterSpacing: "-0.04em" }}
        >
          <div className="overflow-hidden py-1">
            <div
              ref={h1Ref}
              className="text-[clamp(2.2rem,11vw,140px)] text-[#000000] whitespace-nowrap tracking-tight"
              style={{ fontWeight: 300 }}
            >
              THE BEVERAGE
            </div>
          </div>
          <div className="overflow-hidden py-1">
            <div
              ref={h2Ref}
              className="text-[clamp(2.2rem,11vw,120px)] text-[#999999] whitespace-nowrap tracking-tight"
              style={{ fontWeight: 300, fontStyle: "italic" }}
            >
              CONCEPTS
            </div>
          </div>
        </h1>
      </div>

      {/* PANEL CONTAINER */}
      <div
        ref={panelRef}
        className="absolute bottom-4 sm:bottom-6 lg:bottom-10 right-0 lg:right-10 w-full lg:w-[42%] h-[20vh] sm:h-[30vh] md:h-[40vh] lg:h-[60vh] flex items-center justify-center overflow-hidden pointer-events-none"
      >
        <div ref={glowRef} />
      </div>
    </section>
  );
}
