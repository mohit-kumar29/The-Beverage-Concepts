import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowUpRight, ArrowDown } from "lucide-react";

import FounderImage from "../assets/AboutUs.jpg";

/* ── STYLES ── */
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Inter:wght@200;300;400;500&display=swap');

    .font-serif-sharp {
      font-family: 'Cormorant Garamond', Georgia, serif;
    }

    .font-sans-sharp {
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
    }

    /* Architectural Grid Canvas Lines */
    .grid-lines-bg {
      background-size: 100% 80px;
      background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.03) 1px, transparent 1px);
    }

    .dark-grid-lines-bg {
      background-size: 100% 80px;
      background-image: linear-gradient(to bottom, rgba(255, 255, 255, 0.04) 1px, transparent 1px);
    }
  `}</style>
);

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
      delay: i * 0.1,
    },
  }),
};

const timelineData = [
  {
    year: "2012",
    title: "FINE DINING DISCIPLINE",
    description: "Immersed in global luxury capitals, mastering balance, liquid architecture, and sensory precision.",
  },
  {
    year: "2015",
    title: "CONSULTANCY ORIGINS",
    description: "Architected bespoke beverage programs combining high commercial yield with unyielding artistry.",
  },
  {
    year: "2017",
    title: "PROGRAM ARCHITECTURE",
    description: "Pioneered proprietary extraction frameworks and operational bar blueprints across flagship properties.",
  },
  {
    year: "2020",
    title: "OPERATIONAL EVOLUTION",
    description: "Standardized digital playbooks and resilient systems to navigate severe industry shifts.",
  },
  {
    year: "2022",
    title: "TALENT CULTIVATION",
    description: "Trained hundreds of professionals worldwide in hospitality psychology and precision execution.",
  },
  {
    year: "2025",
    title: "THE BEVERAGE CONCEPTS",
    description: "Unifying global exposure and creative vision into a luxury consultancy brand.",
  },
];

const coreValues = [
  {
    num: "01",
    title: "SURGICAL PRECISION",
    description: "Calibrating every ingredient ratio, glass weight, and temperature gradient with exact intentionality.",
  },
  {
    num: "02",
    title: "SENSORY ARTISTRY",
    description: "Merging classical distillation technique with modernist alchemy to build unforgettable liquid identities.",
  },
  {
    num: "03",
    title: "OPERATIONAL STRUCTURE",
    description: "Designing ergonomic back-of-house systems that perform seamlessly under high-volume pressure.",
  },
  {
    num: "04",
    title: "ENDURING LEGACY",
    description: "Constructing timeless beverage concepts that deliver sustainable profit and long-term enterprise prestige.",
  },
];

export default function FoundersStory() {
  const navigate = useNavigate();
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const scaleProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const heroImageY = useTransform(scrollYProgress, [0, 0.3], ["0%", "10%"]);

  return (
    <div
      ref={containerRef}
      className="relative w-full bg-white text-neutral-900 font-sans-sharp selection:bg-neutral-950 selection:text-white"
    >
      <GlobalStyles />

      {/* TOP SCROLL LINE */}
      <motion.div
        style={{ scaleX: scaleProgress }}
        className="fixed top-0 left-0 right-0 h-[2px] bg-neutral-950 z-50 origin-left"
      />

      {/* ── HERO SECTION ── */}
      <section className="relative min-h-screen pt-32 pb-20 px-6 md:px-12 lg:px-20 max-w-[1440px] mx-auto flex flex-col justify-between grid-lines-bg border-b border-neutral-200">
        
        {/* TOP HEADER TRACK */}
        <div className="flex justify-between items-center border-b border-neutral-200 pb-6">
          <span className="text-[10px] tracking-[0.35em] uppercase font-mono text-neutral-400">
            [ FOUNDER'S STORY ]
          </span>
          <span className="text-[10px] tracking-[0.35em] uppercase font-mono text-neutral-400">
            01 / 06
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-end my-auto py-12">
          
          <motion.div
            initial="hidden"
            animate="visible"
            custom={0}
            variants={fadeIn}
            className="lg:col-span-7 space-y-8"
          >
            <h1 className="font-serif-sharp text-5xl sm:text-7xl md:text-8xl font-light text-neutral-950 tracking-tight leading-[0.9] uppercase">
              EVERY GREAT <br />
              <em className="italic text-neutral-400 font-light">BEVERAGE</em> <br />
              HAS A STORY.
            </h1>

            <p className="text-sm md:text-base text-neutral-600 font-light max-w-xl leading-relaxed tracking-wide uppercase">
              Our journey began with passion, craftsmanship, and the belief that every drink can create unforgettable experiences.
            </p>

            <div className="pt-4">
              <button
                onClick={() => navigate("/total-beverage-solution")}
                className="group inline-flex items-center gap-6 px-8 py-4 border border-neutral-950 text-neutral-950 text-[11px] uppercase tracking-[0.25em] font-normal hover:bg-neutral-950 hover:text-white transition-all duration-300"
              >
                <span>EXPLORE SERVICES</span>
                <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
              </button>
            </div>
          </motion.div>

          {/* HERO IMAGE */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="lg:col-span-5 relative"
          >
            <div className="relative aspect-[3/4] w-full overflow-hidden border border-neutral-200 bg-neutral-100">
              <motion.img
                style={{ y: heroImageY }}
                src={FounderImage}
                alt="Founder Portrait"
                className="w-full h-full object-cover filter grayscale contrast-125 brightness-95"
              />
            </div>
          </motion.div>

        </div>

        {/* BOTTOM METRIC BAR */}
        <div className="pt-6 border-t border-neutral-200 flex justify-between items-center text-[10px] tracking-[0.25em] uppercase text-neutral-400 font-mono">
          <span>THE BEVERAGE CONCEPTS</span>
          <div className="flex items-center gap-2">
            <span>SCROLL</span>
            <ArrowDown className="w-3 h-3 animate-bounce" />
          </div>
        </div>

      </section>

      {/* ── CHAPTER 01: THE BEGINNING ── */}
      <section className="py-28 px-6 md:px-12 lg:px-20 max-w-[1440px] mx-auto border-b border-neutral-200">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          
          <div className="lg:col-span-4 border-l border-neutral-950 pl-6 h-fit">
            <span className="text-[10px] font-mono tracking-[0.3em] text-neutral-400 uppercase block mb-2">
              02 / GENESIS
            </span>
            <h2 className="font-serif-sharp text-3xl md:text-5xl font-light text-neutral-950 uppercase leading-none">
              OBSESSION WITH <br />
              <em className="italic text-neutral-400 font-light">PERFECTION.</em>
            </h2>
          </div>

          <div className="lg:col-span-8 text-neutral-700 font-light text-base md:text-lg leading-relaxed space-y-8 tracking-wide">
            <p>
              In luxury hospitality, true perfection is rarely an accident. It is the disciplined alignment of atmosphere, geometry, psychology, and sensory chemistry. When we founded <strong className="font-medium text-neutral-950">The Beverage Concepts</strong>, our goal went far beyond crafting signature cocktail menus—it was to reimagine how high-end beverage programs are built from the ground up.
            </p>
            <p>
              Having managed operations across luxury venues spanning India, Dubai, Singapore, the Caribbean, and the Maldives, we noticed a recurring gap: breathtaking bar designs that failed under peak operational pressure, paired with elaborate drinks lacking commercial longevity. We united our international exposure and operational intellect to bridge that gap permanently.
            </p>
          </div>

        </div>
      </section>

      {/* ── CHAPTER 02: TIMELINE ── */}
      <section className="py-28 bg-neutral-950 text-white dark-grid-lines-bg border-b border-neutral-800">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20">
          
          <div className="flex justify-between items-end border-b border-neutral-800 pb-8 mb-20">
            <div>
              <span className="text-[10px] font-mono tracking-[0.3em] text-neutral-500 uppercase block mb-2">
                03 / CHRONOLOGY
              </span>
              <h2 className="font-serif-sharp text-4xl md:text-6xl font-light uppercase tracking-tight">
                JOURNEY MILESTONES
              </h2>
            </div>
            <span className="text-[10px] font-mono tracking-[0.3em] text-neutral-500 uppercase hidden sm:block">
              2012 — 2025
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border-t border-l border-neutral-800">
            {timelineData.map((item, idx) => (
              <motion.div
                key={idx}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={idx}
                variants={fadeIn}
                className="p-8 md:p-10 border-r border-b border-neutral-800 flex flex-col justify-between h-[320px] hover:bg-neutral-900 transition-colors duration-300"
              >
                <span className="font-mono text-xs tracking-widest text-neutral-500">
                  [{item.year}]
                </span>

                <div className="space-y-3">
                  <h3 className="font-serif-sharp text-2xl font-light text-white tracking-wide uppercase">
                    {item.title}
                  </h3>
                  <p className="text-neutral-400 font-light text-xs md:text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* ── CHAPTER 03: PHILOSOPHY & PILLARS ── */}
      <section className="py-28 px-6 md:px-12 lg:px-20 max-w-[1440px] mx-auto border-b border-neutral-200">
        
        <div className="text-center max-w-4xl mx-auto mb-24 space-y-6">
          <span className="text-[10px] font-mono tracking-[0.3em] text-neutral-400 uppercase block">
            04 / PHILOSOPHY
          </span>
          <blockquote className="font-serif-sharp text-3xl sm:text-5xl font-light text-neutral-950 uppercase leading-snug">
            "OUR PHILOSOPHY HAS NEVER BEEN ABOUT SERVING DRINKS. IT HAS ALWAYS BEEN ABOUT CREATING EXPERIENCES."
          </blockquote>
          <div className="w-12 h-[1px] bg-neutral-950 mx-auto" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0 border-t border-l border-neutral-200">
          {coreValues.map((value, idx) => (
            <motion.div
              key={idx}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={idx}
              variants={fadeIn}
              className="p-8 border-r border-b border-neutral-200 space-y-6 hover:bg-neutral-50 transition-colors duration-300"
            >
              <span className="font-mono text-xs text-neutral-400 block">{value.num}</span>
              <h3 className="font-serif-sharp text-xl font-light text-neutral-950 uppercase tracking-wide">
                {value.title}
              </h3>
              <p className="text-xs text-neutral-600 font-light leading-relaxed">
                {value.description}
              </p>
            </motion.div>
          ))}
        </div>

      </section>

      {/* ── CHAPTER 04: CLOSING & CTA ── */}
      <section className="py-28 bg-neutral-950 text-white text-center px-6 md:px-12 lg:px-20">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          className="max-w-3xl mx-auto space-y-8"
        >
          <span className="text-[10px] font-mono tracking-[0.35em] text-neutral-500 uppercase block">
            05 / CONTINUATION
          </span>

          <h2 className="font-serif-sharp text-4xl sm:text-6xl md:text-7xl font-light uppercase tracking-tight">
            WE ARE STILL WRITING OUR STORY.
          </h2>

          <p className="text-neutral-400 font-light text-xs md:text-sm tracking-widest uppercase max-w-md mx-auto">
            Partner with us to architect your next flagship beverage program.
          </p>

          <div className="pt-4">
            <button
              onClick={() => navigate("/total-beverage-solution")}
              className="inline-flex items-center gap-6 px-10 py-5 border border-white text-white text-[11px] uppercase tracking-[0.25em] font-normal hover:bg-white hover:text-neutral-950 transition-all duration-300"
            >
              <span>DISCOVER OUR SERVICES</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      </section>

    </div>
  );
}