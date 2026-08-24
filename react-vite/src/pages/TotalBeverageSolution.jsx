import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import Footer from '../components/Footer'; 
import ContactUs from '../components/ContactUs';
import { assets } from '../assets/assets';

gsap.registerPlugin(ScrollTrigger);

export default function TotalBeverageSolution() {
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
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  // Dedicated Scroll tracking for White Editorial Section Image Parallax
  const { scrollYProgress: whiteSectionScroll } = useScroll({
    target: whiteSectionRef,
    offset: ["start end", "end start"],
  });

  const imageY = useTransform(whiteSectionScroll, [0, 1], ["-8%", "8%"]);

  const processSteps = [
    {
      number: "01",
      subheading: "Discovery & Business Assessment",
      text: "Every successful beverage program begins with understanding your property. We conduct a comprehensive assessment of your hotel, including its brand positioning, guest demographics, existing beverage operations, outlet concepts, operational challenges, and commercial objectives."
    },
    {
      number: "02",
      subheading: "Beverage Audit & Opportunity Analysis",
      text: "We evaluate every aspect of your current beverage operation across all outlets, reviewing menus, product mix, purchasing, inventory, equipment, workflows, service standards, staffing, and profitability. This allows us to identify opportunities for improvement and growth."
    },
    {
      number: "03",
      subheading: "Beverage Strategy Development",
      text: "Based on our findings, we develop a tailored beverage strategy aligned with your property's vision. This includes defining each outlet's identity, beverage positioning, guest experience, revenue objectives, and operational roadmap."
    },
    {
      number: "04",
      subheading: "Outlet Concept & Beverage Program Design",
      text: "Each outlet receives its own customized beverage program, designed to complement its concept, cuisine, and target audience. Whether it's a lobby lounge, signature bar, pool bar, beach club, restaurant, rooftop, or in-room dining, every offering is thoughtfully developed to create a cohesive property-wide experience."
    },
    {
      number: "05",
      subheading: "Menu Development & Product Curation",
      text: "We create and refine complete beverage offerings across all outlets, including cocktails, mocktails, coffee, tea, wines, spirits, beers, wellness beverages, and specialty drinks. Every menu is developed with creativity, consistency, operational efficiency, and profitability in mind."
    },
    {
      number: "06",
      subheading: "Procurement, Costing & Operational Systems",
      text: "We establish the operational foundation behind every beverage program, including supplier recommendations, product specifications, recipe costing, inventory guidelines, batching systems, SOPs, production workflows, and quality control procedures to ensure efficiency and sustainable profitability."
    },
    {
      number: "07",
      subheading: "Team Development & Training",
      text: "We deliver comprehensive training for bartenders, restaurant teams, supervisors, and beverage leaders. Training covers technical skills, product knowledge, service excellence, upselling, operational standards, leadership, and guest engagement to ensure consistent execution across every outlet."
    },
    {
      number: "08",
      subheading: "Implementation & Property-Wide Rollout",
      text: "Our team oversees the implementation of the beverage program across the property, supporting menu launches, operational setup, workflow optimization, and service execution to ensure every outlet is fully prepared from day one."
    },
    {
      number: "09",
      subheading: "Performance Monitoring & Optimization",
      text: "Following implementation, we monitor beverage performance through menu engineering, sales analysis, guest feedback, cost control, and operational reviews. We continuously refine the program to maximize revenue, improve efficiency, and enhance the guest experience."
    },
    {
      number: "10",
      subheading: "Long-Term Partnership",
      text: "A great beverage program is never static. We continue to support your property with seasonal menu updates, outlet refreshes, staff development, operational audits, concept enhancements, and strategic consulting—ensuring your beverage operation continues to evolve with your business and the industry."
    }
  ];

  const bottomWords = [
    "Property beverage strategy",
    "Beverage Concepts",
    "Menus",
    "Documents",
    "Menu engineering"
  ];

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });

    // GSAP Context to handle Hero Text Reveal
    const ctx = gsap.context(() => {
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
      ScrollTrigger.batch('.editorial-reveal', {
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

      // Parallax Image Effect
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
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
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

      {/* 1. HERO ARCHITECTURE */}
      <section ref={heroRef} className="relative h-screen w-full overflow-hidden flex items-center justify-center p-4 sm:p-8 md:p-16 lg:p-32 border-b border-neutral-900">
        
        {/* Background Image Container */}
        <motion.div style={{ scale }} className="absolute inset-0 z-0 gpu-accelerated">
          <div className="absolute inset-0 z-10" />
          <img
            src={assets.TotalBg}
            alt="Total Solution Backdrop"
            className="w-full h-full object-cover brightness-[0.45]"
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
          className="absolute top-10 left-6 md:left-12 z-50 flex items-center gap-2 text-xs tracking-[0.3em] uppercase hover:opacity-50 transition-opacity cursor-pointer text-white"
        >
          <ArrowLeft size={16} strokeWidth={1} /> Back
        </motion.button>

        {/* Hero Copy Composition */}
        <div className="relative z-20 w-full max-w-7xl mx-auto flex flex-col justify-center items-center h-full pb-16 text-center">
          <div className="w-full">
            <h1 className="text-[2.6rem] sm:text-6xl md:text-8xl lg:text-9xl font-serif leading-[0.88] md:leading-[0.85] italic tracking-tight perspective-[1000px] text-center text-white drop-shadow-[0_4px_16px_rgba(0,0,0,0.6)]">
              <div className="overflow-hidden block pt-1 pb-3 -mb-3">
                <div ref={line1Ref} className="will-change-transform origin-left whitespace-nowrap">
                  <span className="text-[#999999]">Total</span>
                </div>
              </div>
              <div className="overflow-hidden block pt-1 pb-5">
                <div ref={line2Ref} className="not-italic ml-0 md:ml-12 will-change-transform origin-left whitespace-nowrap">
                  Beverage Solution
                </div>
              </div>
            </h1>
          </div>
        </div>
      </section>

      {/* 2. WHITE EDITORIAL SECTION WITH PARALLAX IMAGE */}
      <section 
        ref={whiteSectionRef}
        className="editorial-reveal min-h-screen w-full px-6 md:px-20 bg-[#FFFFFF] text-[#000000] flex flex-col justify-center items-center py-20 overflow-hidden"
      >
        <div className="max-w-7xl w-full flex flex-col justify-between my-auto gap-8 lg:gap-20">
          
          {/* Top Row: Paragraphs and Parallax Image Side-by-Side */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start w-full">
            
            {/* Left Text Column */}
            <div className="lg:col-span-7 space-y-6 md:space-y-8 text-left flex flex-col justify-start z-10 pt-1">
              <p className="text-lg md:text-[22px] lg:text-[24px] font-light leading-[1.65] text-[#000000]">
                Total Beverage Solution is our full-scale, end-to-end beverage consultancy service. We provide a complete bar blueprint that encompasses everything—from our Elemental Beverage Alchemy training, to Bespoke Beverage Design, all the way to custom R&D for a groundbreaking new concept.
              </p>
              <p className="text-lg md:text-[22px] lg:text-[24px] font-light leading-[1.65] text-[#000000]">
                Our service includes the development of a fully realized beverage program, from the foundational concept to tailored training, station setups, and specialized bartender development.
              </p>
              <p className="text-lg md:text-[22px] lg:text-[24px] font-light leading-[1.65] text-[#000000]">
                This is the full bar experience: a complete, immersive journey that empowers your entire team—whether new or experienced—to thrive in a dynamic beverage environment.
              </p>
              <p className="text-lg md:text-[22px] lg:text-[24px] font-light leading-[1.65] text-[#000000]">
                We handle the concept, the research, and the execution, ensuring your bar is not just a service, but an experience.
              </p>
            </div>

            {/* Right Image Column with Smooth Parallax Frame */}
            <div className="group lg:col-span-5 relative w-full rounded max-w-[550px] mx-auto h-[520px] sm:h-[620px] lg:h-[700px] overflow-hidden flex items-center justify-center border border-neutral-200">
              <motion.div 
                style={{ y: imageY }} 
                className="relative w-full h-[110%] will-change-transform flex items-center justify-center"
              >
                <img
                  src={assets.TotalTextImage}
                  alt="Total Beverage Solution Architecture"
                  className="w-full h-full object-cover object-top filter grayscale contrast-125 group-hover:grayscale-0 group-hover:contrast-100 transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)]"
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

      {/* 2.6 FULL-BLEED PARALLAX HERO IMAGE SECTION */}
      <section className="w-full bg-[#FFFFFF] p-2 sm:p-3 md:p-4">
        <div 
          ref={parallaxContainerRef}
          className="relative w-full aspect-[16/10] md:aspect-[16/9] rounded-2xl md:rounded-3xl lg:rounded-xl overflow-hidden bg-[#0A0A0A] gpu-accelerated"
        >
          <img
            ref={parallaxImageRef}
            src={assets.TotalBigImg}
            alt="Total Beverage Master Creation"
            loading="lazy"
            decoding="async"
            className="absolute inset-0 -top-[5%] -bottom-[5%] w-full h-[110%] object-cover grayscale contrast-125 will-change-transform"
          />
        </div>
      </section>

      {/* 3. REUSABLE EDITORIAL FOOTER */}
      <ContactUs />
      <Footer />
    </motion.div>
  );
}