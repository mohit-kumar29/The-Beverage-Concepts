import { useNavigate } from "react-router-dom";
import { useRef, useEffect } from "react";
import {
  motion,
  useInView,
  useScroll,
  useTransform,
  useSpring,
} from "framer-motion";
import ElementalBeverageAlchemy from "../assets/ElementalBeverageAlchemy.jpg";
import BespokeBeverageDesign from "../assets/BespokeBeverageDesign.jpg";
import TotalBeverageSolution from "../assets/TotalBeverageSolution.jpg";

/* ─────────────────────────────────────────────────
  GLOBAL STYLES & SCROLL FIXES
───────────────────────────────────────────────── */
const G = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,200;0,300;1,200;1,300&family=Inter:wght@300;400&display=swap');

    :root {
      --serif : 'Cormorant Garamond', serif;
      --sans  : 'Inter', sans-serif;
      --ease  : cubic-bezier(0.16, 1, 0.3, 1);
    }

    .os-root {
      position: relative;
      width: 100%;
      min-height: 100vh; 
      background: #000;
      display: flex;
      flex-direction: column;
      padding: clamp(60px, 8vh, 80px) clamp(24px, 5.5vw, 80px);
      overflow: visible !important; 
      box-sizing: border-box;
      z-index: 1;
    }

    .premium-heading {
      font-family: 'Cormorant Garamond', serif;
      font-size: clamp(56px, 9vw, 120px);
      font-weight: 300;
      line-height: 0.88;
      letter-spacing: -0.04em;
      color: #ffffff;
      margin-bottom: clamp(40px, 6vh, 80px);
      text-transform: none !important;
    }

    .premium-heading em {
      font-style: italic;
      font-weight: 300;
      color: #999999; 
      text-transform: none !important;
    }

    .os-grid {
      flex: 1;
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 20px;
      min-height: 500px;
    }

    .os-panel {
      position: relative;
      overflow: hidden;
      cursor: pointer;
      background: #0a0a0a;
      height: 680px;
      transform: translateZ(0);
      will-change: transform;
      contain: paint;
    }

    .os-img-track {
      position: absolute;
      inset: -15% 0;
      will-change: transform;
      transform: translateZ(0);
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .os-img-track img {
      position: absolute;
      left: 50%;
      top: 50%;
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
      filter: grayscale(100%) brightness(0.6);
      transition: filter 1.1s var(--ease), transform 1.1s var(--ease);
      will-change: transform, filter;
      transform: translateZ(0);
    }

    .os-body {
      position: absolute;
      inset: 0;
      z-index: 3;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 40px;
      text-align: center;
      pointer-events: none;
    }

    .os-desc {
      font-family: var(--serif);
      font-style: italic;
      font-weight: 300;
      font-size: clamp(22px, 0.95vw, 13.5px);
      line-height: 2;
      letter-spacing: 0.02em;
      color: rgba(255,255,255,0.85);
      opacity: 0;
      transform: translateY(20px);
      transition: all 0.7s var(--ease);
    }

    .os-panel:hover .os-desc {
      opacity: 1;
      transform: translateY(0);
    }

    .os-label-wrap {
      position: absolute;
      bottom: 40px;
      left: 0;
      right: 0;
      z-index: 4;
      text-align: center;
      overflow: hidden;
    }

    .os-label {
      display: inline-block;
      font-family: var(--sans);
      font-weight: 900;
      font-size: clamp(12.5px, 0.75vw, 11px);
      letter-spacing: 0.55em;
      text-transform: uppercase;
      color: rgba(255, 255, 255, 0.65);
      transition: color 0.6s ease, letter-spacing 0.7s var(--ease);
    }

    .os-panel:hover .os-label {
      color: #fff;
      letter-spacing: 0.65em;
    }

    /* ── MOBILE & TABLET ONLY ── */
    @media (max-width: 900px) {
      .os-root { 
        height: auto; 
        padding: 80px 5vw; 
      }

      .os-grid { 
        grid-template-columns: 1fr; 
        gap: 32px; 
      }

      /* Longer panel height for mobile */
      .os-panel { 
        height: 580px; 
      }

      .os-desc {
        opacity: 1 !important;
        transform: translateY(0) !important;
        font-size: clamp(13.5px, 3.2vw, 15.5px);
        line-height: 1.7;
        padding: 0 16px;
        color: rgba(255, 255, 255, 0.9);
      }

      .os-img-track img {
        filter: grayscale(100%) brightness(0.35) !important;
      }

      .os-body {
        padding: 30px 24px 70px 24px;
      }

      .os-label {
        font-size: 11px;
        letter-spacing: 0.4em;
        color: rgba(255, 255, 255, 0.9);
      }

      .os-label-wrap {
        bottom: 28px;
      }
    }
  `}</style>
);

const SERVICES = [
  {
    src: ElementalBeverageAlchemy,
    label: "Elemental Beverage Alchemy",
    desc: `We transform teams into beverage professionals through hands-on mastery, technical knowledge, and structured learning — tailored for beginners, intermediates, and experts alike.`,
    objectPos: "center center !important",
  },
  {
    src: BespokeBeverageDesign,
    label: "Bespoke Beverage Design",
    desc: `We collaborate closely with you to craft a unique, creative, and story-driven cocktail menu that complements your culinary offering, reflects your concept, and incorporates sustainable practices — elevating the overall guest experience`,
    objectPos: "center center",
  },
  {
    src: TotalBeverageSolution,
    label: "Total Beverage Solution",
    desc: `From vision to execution, we partner with you at every stage — crafting the full concept and theme, conducting strategic market analysis, developing innovative beverage programs, and delivering professional training that positions your venue for long-term success.`,
    objectPos: "center center",
  },
];

function Panel({ src, label, desc, index, objectPos }) {
  const ref = useRef(null);
  const navigate = useNavigate();

  const inView = useInView(ref, {
    once: true,
    margin: "300px 0px",
  });

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useSpring(
    useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]),
    { stiffness: 50, damping: 25 }
  );

  const handleClick = () => {
    if (label === "Elemental Beverage Alchemy") {
      navigate("/elemental-beverage-alchemy");
    }
    if (label === "Bespoke Beverage Design") {
      navigate("/bespoke-beverage-design");
    }
    if (label === "Total Beverage Solution") {
      navigate("/total-beverage-solution");
    }
  };

  return (
    <motion.div
      ref={ref}
      className="os-panel"
      onClick={handleClick}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: index * 0.18 }}
    >
      <motion.div className="os-img-track" style={{ y }}>
        <img
          src={src}
          alt={label}
          loading="eager"
          decoding="async"
          fetchPriority="high"
          style={{
            transform: "translate(-50%, -50%)",
            objectPosition: objectPos,
            willChange: "transform, filter",
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transformStyle: "preserve-3d",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translate(-50%, -50%) scale(1.08)";
            e.currentTarget.style.filter =
              "grayscale(0%) brightness(0.4) blur(3px)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translate(-50%, -50%)";
            e.currentTarget.style.filter =
              "grayscale(100%) brightness(0.6)";
          }}
        />
      </motion.div>

      <div className="os-body">
        <p className="os-desc">{desc}</p>
      </div>

      <div className="os-label-wrap">
        <motion.span className="os-label">{label}</motion.span>
      </div>
    </motion.div>
  );
}

export default function OurServices() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const unlock = () => {
      document.body.style.overflow = "visible";
      document.documentElement.style.overflow = "visible";
    };
    unlock();
    window.addEventListener("resize", unlock);
    return () => window.removeEventListener("resize", unlock);
  }, []);

  useEffect(() => {
    [
      ElementalBeverageAlchemy,
      BespokeBeverageDesign,
      TotalBeverageSolution,
    ].forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  return (
    <section id="ourservices" ref={sectionRef} className="os-root">
      <G />

      <div className="premium-heading">
        <h1 className="premium-heading em">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            Our <em>Services</em>
          </motion.div>
        </h1>
      </div>

      <div className="os-grid">
        {SERVICES.map((s, i) => (
          <Panel key={i} {...s} index={i} />
        ))}
      </div>
    </section>
  );
}