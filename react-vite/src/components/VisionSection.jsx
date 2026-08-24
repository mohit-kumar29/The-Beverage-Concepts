import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import BuildingBars from "../assets/BuildingBars.jpg";

gsap.registerPlugin(ScrollTrigger);

const T = {
  bg: "#000000",
  text: "#FFFFFF",
  accent: "#E5E5E5", 
  muted: "rgba(255, 255, 255, 0.58)",
  line: "rgba(255, 255, 255, 0.12)"
};

export default function VisionSingleFrame() {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const contentRef = useRef(null);
  const lineRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        }
      });

      // 1. Image Shutter Reveal with scale
      tl.fromTo(imageRef.current,
        { clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)", scale: 1.05 },
        { clipPath: "polygon(0 0%, 100% 0%, 100% 100%, 0 100%)", scale: 1, duration: 1.8, ease: "power4.inOut" }
      );

      // 2. Decorative Line expansion
      tl.fromTo(lineRef.current,
        { scaleY: 0 },
        { scaleY: 1, duration: 1.2, ease: "expo.out", transformOrigin: "top" },
        "-=1.2"
      );

      // 3. Eyebrow label fade-in
      tl.fromTo(".vision-eyebrow",
        { opacity: 0, x: -16 },
        { opacity: 1, x: 0, duration: 0.9, ease: "power3.out" },
        "-=0.9"
      );

      // 4. Text Elements Staggered Rise with slight rotation
      tl.from(".reveal-item", {
        y: 40,
        opacity: 0,
        rotation: 1,
        stagger: 0.15,
        duration: 1.2,
        ease: "power3.out"
      }, "-=0.8");

      // 5. Hardware-Accelerated Floating Sequence (Prevents layout shifting on mobile viewports)
      gsap.to(".inner-img", {
        y: "4%",
        duration: 6,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Simple feature detection to safely pass the correct layout properties down to Framer Motion
  const isTouchDevice = typeof window !== "undefined" && ('ontouchstart' in window || navigator.maxTouchPoints > 0);

  return (
    <section
      ref={sectionRef}
      style={{
        background: T.bg,
        color: T.text,
        width: "100%",
        position: "relative",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        overflow: "hidden",
        boxSizing: "border-box",
        padding: "clamp(40px, 8vh, 80px) clamp(24px, 5.5vw, 80px)"
      }}
      className="min-h-screen w-full"
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght=0,300;0,400;1,300;1,400&family=Inter:wght=300;400&family=Syne:wght=300;400;600&display=swap');

        .vision-frame-grid {
          display: grid;
          grid-template-columns: 4.5fr 7.5fr;
          width: 100%;
          max-width: 1440px;
          margin: 0 auto;
          position: relative;
          z-index: 2;
          gap: 80px;
          align-items: start;
        }

        .vision-image-wrapper {
          width: 100%;
          position: relative;
          overflow: hidden;
          border-radius: 6px;
          aspect-ratio: 2/3;
          z-index: 2;
          transform: translate3d(0, 0, 0); /* Stabilizes rendering context boundaries */
          box-shadow:
            0 18px 80px rgba(0, 0, 0, 0.55),
            0 1px 0 rgba(255, 255, 255, 0.06) inset;
        }

        .vision-image-wrapper::before {
          content: '';
          position: absolute;
          inset: 0;
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 6px;
          z-index: 3;
          pointer-events: none;
        }

        .vision-image-wrapper::after {
          content: '';
          position: absolute;
          top: 0; left: 0; width: 100%; height: 100%;
          background: linear-gradient(180deg, rgba(0,0,0,0) 35%, rgba(0,0,0,0.55) 100%);
          pointer-events: none;
          transition: background 1.2s ease;
          z-index: 2;
        }

        .vision-image-caption {
          position: absolute;
          bottom: 24px;
          left: 24px;
          z-index: 4;
          font-family: 'Syne', sans-serif;
          font-size: 0.7rem;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.7);
          opacity: 0;
          transform: translateY(8px);
          transition: opacity 0.8s ease, transform 0.8s ease;
        }

        /* DESKTOP HOVER INTERACTIONS */
        @media (hover: hover) {
          .vision-image-wrapper .inner-img {
            filter: grayscale(1) brightness(0.95) contrast(1.05);
            transform: scale(1.02);
            transition: filter 1.8s cubic-bezier(0.25, 1, 0.5, 1), transform 1.8s cubic-bezier(0.25, 1, 0.5, 1);
          }
          .vision-image-wrapper:hover .inner-img {
            filter: grayscale(0) brightness(1.1) contrast(1) !important;
            transform: scale(1.07);
          }
          .vision-image-wrapper:hover::after {
            background: linear-gradient(180deg, rgba(0,0,0,0) 40%, rgba(0,0,0,0.25) 100%);
          }
          .vision-image-wrapper:hover .vision-image-caption {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .vision-content-area {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: flex-start;
          height: 100%;
          position: relative;
          gap: 32px;
          /* SHIFTED RIGHT: Changed from 4px to 48px to move the text right */
          padding-left: 60px; 
        }

        .vision-eyebrow {
          font-family: 'Syne', sans-serif;
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 0.32em;
          text-transform: uppercase;
          color: ${T.accent};
          display: flex;
          align-items: center;
          gap: 14px;
          margin: 0;
        }

        .vision-eyebrow::before {
          content: '';
          display: inline-block;
          width: 28px;
          height: 1px;
          background: ${T.accent};
          opacity: 0.4;
        }

        .vision-heading {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(54px, 5.5vw, 90px);
          font-weight: 300;
          line-height: 1.08;
          letter-spacing: -0.02em;
          color: #FFFFFF;
          margin: 0;
          max-width: 750px;
        }

        .vision-heading em {
          font-style: italic;
          font-weight: 300;
          color: #999999; 
          padding-right: 0.05em;
        }

        .premium-body {
          font-family: 'Syne', sans-serif;
          font-size: clamp(0.95rem, 1vw, 1.1rem);
          line-height: 1.75;
          font-weight: 300;
          color: ${T.muted};
          max-width: 520px;
        }

        .premium-body p {
          margin: 0 0 1.5rem 0;
        }

        .premium-body p:last-child {
          margin-bottom: 0;
        }

        .vision-meta-row {
          display: flex;
          gap: 48px;
          padding-top: 8px;
          width: 100%;
          max-width: 520px;
        }

        .vision-meta-item {
          display: flex;
          flex-direction: column;
          gap: 6px;
          padding-top: 20px;
        }

        .vision-meta-label {
          font-family: 'Syne', sans-serif;
          font-size: 0.68rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.4);
        }

        .vision-meta-value {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.15rem;
          font-weight: 400;
          color: #FFFFFF;
        }

        .divider-line {
          position: absolute;
          left: -2vw;
          top: 0;
          bottom: 0;
          width: 1px;
          background: linear-gradient(180deg, transparent 0%, ${T.line} 15%, ${T.line} 85%, transparent 100%);
        }

        /* RESPONSIVE STYLES FOR TABLET & MOBILE */
        @media (max-width: 1024px) {
          .vision-frame-grid {
            grid-template-columns: 1fr;
            gap: 56px;
          }
          .vision-image-wrapper {
            aspect-ratio: 2/3;
            max-height: 550px;
            width: 100%;
            height: auto;
            order: 2;
          }
          .vision-content-area {
            padding-left: 0;
            order: 1;
            align-items: center;
            text-align: center;
            gap: 32px;
          }
          .vision-eyebrow {
            justify-content: center;
          }
          .vision-heading {
            font-size: clamp(40px, 8vw, 60px);
          }
          .premium-body {
            max-width: 600px;
          }
          .vision-meta-row {
            justify-content: center;
          }
          .divider-line {
            display: none;
          }
        }

        @media (max-width: 768px) {
          .vision-frame-grid {
            gap: 40px;
          }
          .vision-image-wrapper {
            aspect-ratio: 2/3;
            max-height: 520px;
            width: 100%;
            height: auto;
          }
          .vision-heading {
            font-size: 36px;
            line-height: 1.15;
          }
          .premium-body {
            font-size: 1rem;
            line-height: 1.65;
          }
          .vision-content-area {
             align-items: flex-start;
             text-align: left;
             gap: 24px;
          }
          .vision-eyebrow {
            justify-content: flex-start;
          }
          .vision-meta-row {
            justify-content: flex-start;
            gap: 32px;
          }
        }
      `}</style>

      <div className="vision-frame-grid">
        <div className="vision-image-wrapper">
          <motion.img
            ref={imageRef}
            className="inner-img"
            src={BuildingBars}
            alt="Bespoke bar design architectural concept"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center",
              willChange: "transform, filter"
            }}
            initial={isTouchDevice ? { filter: "grayscale(100%) contrast(1.05) brightness(0.95)", scale: 1.02 } : false}
            whileInView={isTouchDevice ? { filter: "grayscale(0%) contrast(1.05) brightness(1)", scale: 1.05 } : false}
            viewport={{ once: false, amount: 0.15 }}
            transition={{ duration: 2.8, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>

        <div className="vision-content-area" ref={contentRef}>

          <h1 className="vision-heading">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-15%" }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            >
              &ldquo;Building Bars that <em>Perform</em>, not just Pour.&rdquo;
            </motion.div>
          </h1>

          <div className="premium-body reveal-item">
            <p>
              Our approach blends creativity with commercial sense, designing concepts that don&rsquo;t just look exceptional, but operate efficiently, sustain momentum, and generate real value.
            </p>
            <p>
              Rooted in modern techniques, operational sustainability, and the five senses&mdash;we create hospitality experiences that feel alive, relevant, and entirely unforgettable.
            </p>
          </div>

          <div className="vision-meta-row reveal-item">
            <div className="vision-meta-item">
              {/* <span className="vision-meta-label">Discipline</span>
              <span className="vision-meta-value">Design &amp; Build</span> */}
            </div>
            <div className="vision-meta-item">
              {/* <span className="vision-meta-label">Focus</span>
              <span className="vision-meta-value">Bespoke Hospitality</span> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}