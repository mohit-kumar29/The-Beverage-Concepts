import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import Footer from '../components/Footer'; 
import ContactUs from "../components/ContactUs";
import { assets } from '../assets/assets';

gsap.registerPlugin(ScrollTrigger);

export default function PremiumBespokeDesign() {
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const whiteSectionRef = useRef(null);
  const line1Ref = useRef(null);
  const line2Ref = useRef(null);
  const heroRef = useRef(null);
  const parallaxContainerRef = useRef(null);
  const parallaxImageRef = useRef(null);

  // Global Page Scroll Progress
  const { scrollYProgress } = useScroll();
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 80, damping: 25 });

  // Dedicated Scroll tracking for White Editorial Section Image Parallax
  const { scrollYProgress: whiteSectionScroll } = useScroll({
    target: whiteSectionRef,
    offset: ["start end", "end start"],
  });

  // Vertical parallax motion maintaining beard visibility & top alignment
  const imageY = useTransform(whiteSectionScroll, [0, 1], ["-4%", "4%"]);

  const processSteps = [
    {
      number: "01",
      subheading: "Discovery & Brand Consultation",
      text: "Every great menu begins with understanding your venue. We start by learning about your restaurant or bar concept, cuisine, target guests, brand identity, operational capabilities, and business objectives. This allows us to create a menu that feels authentic to your venue."
    },
    {
      number: "02",
      subheading: "Research & Creative Direction",
      text: "Our team studies your local market, current global beverage trends, and your competitive landscape. We combine this research with your vision to develop a unique creative direction that sets your venue apart."
    },
    {
      number: "03",
      subheading: "Concept Development",
      text: "We build the story behind your menu—defining its theme, flavour philosophy, guest experience, and signature style. Every cocktail is designed to support one cohesive narrative rather than being just a collection of drinks."
    },
    {
      number: "04",
      subheading: "Recipe Development & R&D",
      text: "This is where creativity meets precision. We develop and test each cocktail through extensive research and experimentation, focusing on flavour balance, presentation, profitability, consistency, and operational efficiency."
    },
    {
      number: "05",
      subheading: "Beverage List Integration",
      text: "Beyond the signature cocktails, we help curate a supporting beverage selection, including spirits, wines, beers, non-alcoholic beverages, and mixers, ensuring the entire beverage offering complements the menu concept."
    },
    {
      number: "06",
      subheading: "Presentation & Menu Design",
      text: "We carefully craft cocktail names, descriptions, storytelling, and menu structure. We can also collaborate on the visual design to ensure the menu reflects your brand and creates anticipation before the first drink is served."
    },
    {
      number: "07",
      subheading: "On-Site Training & Menu Implementation",
      text: "Once development is complete, we visit your venue to train your team on recipes, techniques, preparation, presentation, guest engagement, and service standards. Our goal is to ensure every drink is executed consistently."
    },
    {
      number: "08",
      subheading: "Operational Documentation",
      text: "You’ll receive a complete beverage manual including standardized recipes, preparation methods, garnish specifications, batching guides, SOPs, costing, and production notes to maintain quality long after implementation."
    },
    {
      number: "09",
      subheading: "Launch Support",
      text: "We support your menu launch by fine-tuning operations, assisting during the initial service period, and ensuring both your team and guests experience the menu exactly as intended."
    },
    {
      number: "10",
      subheading: "Ongoing Partnership",
      text: "A successful menu evolves over time. We remain available for seasonal updates, quality reviews, menu refinements, and future collaborations to keep your beverage program fresh and relevant."
    }
  ];

  const bottomWords = [
    "SINGLE MENU",
    "CONCEPT & STORY",
    "STAFF TRAINING",
    "TRAINING MANUALS",
    "SOP CREATION"
  ];

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });

    const ctx = gsap.context(() => {
      // Hero Title Stagger
      gsap.fromTo(
        [line1Ref.current, line2Ref.current],
        { y: 140, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          stagger: 0.12, 
          duration: 1.6, 
          ease: "power3.out", 
          delay: 0.2 
        }
      );

      // Editorial reveal
      ScrollTrigger.batch('.editorial-section', {
        start: 'top 85%',
        onEnter: (batch) => {
          gsap.fromTo(
            batch,
            { opacity: 0, y: 25 },
            { opacity: 1, y: 0, duration: 0.9, ease: 'power2.out', overwrite: 'auto' }
          );
        }
      });

      // Process steps reveal
      ScrollTrigger.batch('.process-step-card', {
        start: 'top 90%',
        onEnter: (batch) => {
          gsap.fromTo(
            batch,
            { opacity: 0, y: 20 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              stagger: 0.06,
              ease: 'power3.out',
              overwrite: 'auto'
            }
          );
        }
      });

      // Bottom Parallax Image Effect
      if (parallaxImageRef.current && parallaxContainerRef.current) {
        gsap.fromTo(
          parallaxImageRef.current,
          { yPercent: -5 },
          {
            yPercent: 5,
            ease: 'none',
            scrollTrigger: {
              trigger: parallaxContainerRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true
            }
          }
        );
      }
    }, containerRef);

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="bg-[#060606] text-[#EDEDED] font-sans selection:bg-neutral-800 selection:text-white overflow-x-hidden min-h-screen antialiased"
      ref={containerRef}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300&family=Inter:wght@300;400;500;600;700;800&display=swap');

        .luxury-serif {
          font-family: 'Cormorant Garamond', serif;
        }
        
        .luxury-sans {
          font-family: 'Inter', sans-serif;
        }

        .premium-heading-process {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(56px, 9vw, 120px);
          font-weight: 300;
          line-height: 0.88;
          letter-spacing: -0.04em;
          color: #ffffff;
          margin-bottom: 0;
          text-transform: none !important;
        }

        .premium-heading-process em {
          font-style: italic;
          font-weight: 300;
          color: #999999; 
          text-transform: none !important;
        }

        .gpu-accelerated {
          transform: translateZ(0);
          backface-visibility: hidden;
        }
      `}</style>

      {/* Top Thin Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] bg-white z-[100] origin-left"
        style={{ scaleX: smoothProgress }}
      />

      {/* 1. HERO SECTION */}
      <section ref={heroRef} className="relative h-screen w-full overflow-hidden flex items-center justify-center p-4 sm:p-8 md:p-16 lg:p-32 border-b border-neutral-900">
        <motion.div style={{ scale }} className="absolute inset-0 z-0 gpu-accelerated">
          <div className="absolute inset-0 z-10" />
          <img
            src={assets.BespokeBg}
            alt="Cinematic Beverage Design"
            className="w-full h-full object-cover brightness-50"
            fetchPriority="high"
            decoding="async"
          />
        </motion.div>

        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          onClick={() => navigate('/#ourservices')}
          className="absolute top-10 left-6 md:left-12 z-50 flex items-center gap-2 text-xs tracking-[0.3em] uppercase hover:opacity-50 transition-opacity text-white cursor-pointer"
        >
          <ArrowLeft size={16} strokeWidth={1} /> Back
        </motion.button>

        {/* Hero Title Container */}
        <div className="relative z-20 w-full max-w-7xl mx-auto flex flex-col justify-center items-center h-full pb-16 text-center">
          <div className="w-full">
            <h1 className="text-[2.6rem] sm:text-6xl md:text-8xl lg:text-9xl font-serif leading-[0.88] md:leading-[0.85] italic tracking-tight perspective-[1000px] text-center text-white drop-shadow-[0_4px_16px_rgba(0,0,0,0.6)]">
              <div className="overflow-hidden block pt-1 pb-3 -mb-3">
                <div ref={line1Ref} className="will-change-transform origin-left whitespace-nowrap">
                  <span className="text-[#999999]">Bespoke</span>
                </div>
              </div>
              <div className="overflow-hidden block pt-1 pb-5">
                <div ref={line2Ref} className="not-italic ml-0 md:ml-12 will-change-transform origin-left whitespace-nowrap">
                  Beverage Design
                </div>
              </div>
            </h1>
          </div>
        </div>
      </section>

      {/* 2. EDITORIAL TEXT & PARALLAX IMAGE SECTION */}
      <section 
        ref={whiteSectionRef}
        className="editorial-section min-h-screen w-full px-6 md:px-20 bg-[#FFFFFF] text-[#000000] flex flex-col justify-center items-center py-20 overflow-hidden"
      >
        <div className="max-w-7xl w-full flex flex-col justify-between my-auto gap-8 lg:gap-20">
          
          {/* Top Row: Aligned starting top baselines for text and image */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start w-full">
            
            {/* Left Text Column */}
            <div className="lg:col-span-7 space-y-6 md:space-y-8 text-left flex flex-col justify-start z-10 pt-1">
              <p className="text-lg md:text-[22px] lg:text-[24px] font-light leading-[1.65] text-[#000000]">
                We collaborate closely with you and your beverage team to craft 
                a unique, storytelling cocktail menu—from classic selections to 
                innovative signature drinks—designed for either the main bar or 
                the restaurant bar.
              </p>
              <p className="text-lg md:text-[22px] lg:text-[24px] font-light leading-[1.65] text-[#000000]">
                Each section is meticulously crafted to reflect your concept, with 
                drinks that complement your culinary offerings, ensuring a seamless 
                harmony between food and beverage.
              </p>
              <p className="text-lg md:text-[22px] lg:text-[24px] font-light leading-[1.65] text-[#000000]">
                We integrate sustainable practices, elevating each guest’s 
                experience from start to finish.
              </p>
              <p className="text-lg md:text-[22px] lg:text-[24px] font-light leading-[1.65] text-[#000000]">
                In addition, we design the menu with modern trends in mind, 
                including a curated selection of low-ABV and zero-proof options, 
                ensuring every guest has a sophisticated, inclusive experience.
              </p>
            </div>

            {/* Right Image Column: Matches Starting Height with Left Column */}
            <div className="group lg:col-span-5 relative w-full rounded max-w-[550px] mx-auto h-[520px] sm:h-[620px] lg:h-[700px] overflow-hidden flex items-center justify-center border border-neutral-200">
              <motion.div 
                style={{ y: imageY }} 
                className="relative w-full h-[110%] will-change-transform flex items-center justify-center"
              >
                <img
                  src={assets.BespokeTextImage}
                  alt="Bespoke Beverage Craftsmanship"
                  className="w-full h-full object-cover object-top filter grayscale contrast-110 group-hover:grayscale-0 group-hover:contrast-100 transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)]"
                />
              </motion.div>
            </div>
          </div>

          {/* Bottom Row: 5 Horizontal Tags with Bullet Points on Mobile/Tablet */}
          <div className="w-full pt-4 lg:pt-10 flex flex-col lg:flex-row items-start lg:items-center justify-start lg:justify-between gap-3 lg:gap-4">
            {bottomWords.map((word, index) => (
              <div 
                key={index}
                className="flex items-center gap-3 lg:gap-0"
              >
                <span className="lg:hidden w-1.5 h-1.5 rounded-full bg-black flex-shrink-0" />
                <span className="text-[11px] sm:text-[12px] lg:text-[12.5px] tracking-[0.25em] lg:tracking-[0.3em] uppercase font-semibold text-[#000000] whitespace-nowrap">
                  {word}
                </span>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 2.5 OUR PROCESS SECTION */}
      <section className="pt-10 sm:pt-12 md:pt-16 lg:pt-28 pb-20 sm:pb-24 md:pb-28 px-6 md:px-16 bg-[#000000] border-b border-[#1A1A1A]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-6 sm:mb-8 md:mb-12 lg:mb-24">
            <h2 className="premium-heading-process">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.9, ease: "easeOut" }}
              >
                Our <em>Process</em>
              </motion.div>
            </h2>
          </div>

          <div className="max-w-5xl mx-auto border-t border-[#161616]">
            {processSteps.map((step, idx) => (
              <div
                key={idx}
                className="process-step-card group relative grid grid-cols-1 md:grid-cols-[100px_1fr] gap-2 md:gap-16 items-start py-6 sm:py-7 md:py-12 border-b border-[#161616] overflow-hidden gpu-accelerated"
              >
                <span className="pointer-events-none absolute left-0 top-0 h-full w-px bg-white scale-y-0 origin-top transition-transform duration-500 ease-out group-hover:scale-y-100" />

                <div className="flex items-center gap-4 md:block md:pl-6">
                  <span className="luxury-serif text-3xl md:text-5xl font-light text-[#3D3D3D] tabular-nums transition-colors duration-300 group-hover:text-white">
                    {step.number}
                  </span>
                </div>

                <div className="md:pr-16">
                  <div className="flex items-baseline justify-between gap-6 mb-3">
                    <h3 className="luxury-sans text-xl md:text-2xl font-bold uppercase tracking-wider text-white">
                      {step.subheading}
                    </h3>
                  </div>
                  <p className="text-sm md:text-base text-[#8A8A8A] font-light leading-relaxed max-w-xl">
                    {step.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2.75 FULL WIDTH BOTTOM IMAGE SECTION */}
      <section className="w-full bg-[#FFFFFF] p-2 sm:p-3 md:p-4">
        <div 
          ref={parallaxContainerRef}
          className="relative w-full aspect-[16/10] md:aspect-[16/9] rounded-2xl md:rounded-3xl lg:rounded-xl overflow-hidden bg-[#0A0A0A] gpu-accelerated"
        >
          <img
            ref={parallaxImageRef}
            src={assets.BespokeBigImg}
            alt="Bespoke Master Creation"
            loading="lazy"
            decoding="async"
            className="absolute inset-0 -top-[5%] -bottom-[5%] w-full h-[110%] object-cover grayscale contrast-125 will-change-transform"
          />
        </div>
      </section>

      {/* 3. EDITORIAL FOOTER */}
      <ContactUs />
      <Footer />
    </motion.div>
  );
}