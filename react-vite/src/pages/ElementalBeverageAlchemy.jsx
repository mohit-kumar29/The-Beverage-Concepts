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

export default function ElementalAlchemyPage() {
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

  // Vertical parallax motion without cropping top details
  const imageY = useTransform(whiteSectionScroll, [0, 1], ["-4%", "4%"]);

  const processSteps = [
    {
      number: "01",
      subheading: "Discovery & Training Needs Assessment",
      text: "Every training program begins with understanding your business. We assess your property, beverage concepts, service standards, team structure, operational challenges, and learning objectives to design a programme tailored to your specific needs."
    },
    {
      number: "02",
      subheading: "Skills Evaluation",
      text: "We evaluate your team's current knowledge and practical abilities across beverage preparation, technical skills, product knowledge, service standards, and guest engagement. This helps us identify strengths, knowledge gaps, and development opportunities."
    },
    {
      number: "03",
      subheading: "Programme Design",
      text: "Based on our assessment, we develop a bespoke training curriculum aligned with your business objectives. Whether the focus is bartending fundamentals, advanced mixology, coffee, wine, spirits, leadership, menu execution, or luxury service, every module is customised to your operation."
    },
    {
      number: "04",
      subheading: "Learning Experience",
      text: "Training combines interactive theory with hands-on practical sessions. Participants learn the science behind beverages, modern techniques, flavour development, operational best practices, and the principles that drive consistency, creativity, and efficiency."
    },
    {
      number: "05",
      subheading: "Practical Application",
      text: "Knowledge is reinforced through live demonstrations, guided practice, recipe execution, service simulations, problem-solving exercises, and real-world scenarios to build confidence and competence in day-to-day operations."
    },
    {
      number: "06",
      subheading: "Performance Assessment",
      text: "Participants complete practical and theoretical assessments to measure understanding, technical proficiency, and operational readiness. Constructive feedback is provided throughout the programme to support continuous improvement."
    },
    {
      number: "07",
      subheading: "SOPs & Training Resources",
      text: "To ensure long-term consistency, we provide supporting training materials, operational guidelines, recipe manuals, beverage knowledge resources, and best-practice documentation that teams can continue using after the programme."
    },
    {
      number: "08",
      subheading: "Implementation Support",
      text: "Following training, we work alongside your leadership team to help integrate new standards, techniques, and workflows into daily operations, ensuring the learning translates into measurable improvements in service and performance."
    },
    {
      number: "09",
      subheading: "Performance Review",
      text: "We evaluate the impact of the training through operational observations, team feedback, service consistency, and business performance, providing recommendations for continued development where required."
    },
    {
      number: "10",
      subheading: "Continuous Learning Partnership",
      text: "Great beverage professionals never stop learning. We offer ongoing workshops, advanced masterclasses, leadership development, seasonal training, and refresher programmes to ensure your team continues to grow alongside your business and the evolving beverage industry."
    }
  ];

  const bottomWords = [
    "BEVERAGE TRAINING",
    "MODERN TECHNIQUE",
    "TRAINING MANUALS",
    "STORY TELLING",
    "SUSTAINABILITY"
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

      {/* 1. HERO ARCHITECTURE */}
      <section ref={heroRef} className="relative h-screen w-full overflow-hidden flex items-center justify-center p-4 sm:p-8 md:p-16 lg:p-32 border-b border-neutral-900">
        <motion.div style={{ scale }} className="absolute inset-0 z-0 gpu-accelerated">
          <div className="absolute inset-0 z-10" />
          <img
            src={assets.ElementalBg}
            alt="Elemental Alchemy Backdrop"
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
                  <span className="text-[#999999]">Elemental</span>
                </div>
              </div>
              <div className="overflow-hidden block pt-1 pb-5">
                <div ref={line2Ref} className="not-italic ml-0 md:ml-12 will-change-transform origin-left whitespace-nowrap">
                  Beverage Alchemy
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
          
          {/* Top Row: Aligned starting top baselines for text and image */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start w-full">
            
            {/* Left Text Column */}
            <div className="lg:col-span-7 space-y-6 md:space-y-8 text-left flex flex-col justify-start z-10 pt-1">
              <p className="text-lg md:text-[22px] lg:text-[24px] font-light leading-[1.65] text-[#000000]">
                Elemental Beverage Alchemy is a comprehensive beverage education training that takes you on a journey from foundational topics like fermentation & distillation—through classic techniques, all the way to cutting-edge scientific mixology.
              </p>
              <p className="text-lg md:text-[22px] lg:text-[24px] font-light leading-[1.65] text-[#000000]">
                This beverage training is infused with global inspiration drawn from travels across multiple countries, competitions, and distilleries, ensuring each session brings a rich, diverse perspective.
              </p>
              <p className="text-lg md:text-[22px] lg:text-[24px] font-light leading-[1.65] text-[#000000]">
                We provide thorough study materials for every session, establishing structured operational mastery and precision across all front-of-house beverage execution.
              </p>
              <p className="text-lg md:text-[22px] lg:text-[24px] font-light leading-[1.65] text-[#000000]">
                Our training is strictly aligned with leading industry luxury standards such as LQA and Forbes, ensuring your team meets the highest levels of operational excellence and innovation.
              </p>
            </div>

            {/* Right Image Column: Matches Starting Height with Left Column */}
            <div className="group lg:col-span-5 relative w-full rounded max-w-[550px] mx-auto h-[520px] sm:h-[620px] lg:h-[700px] overflow-hidden flex items-center justify-center border border-neutral-200">
              <motion.div 
                style={{ y: imageY }} 
                className="relative w-full h-[110%] will-change-transform flex items-center justify-center"
              >
                <img
                  src={assets.ElementalTextImage}
                  alt="Elemental Beverage Alchemy Architecture"
                  className="w-full h-full object-cover object-top filter grayscale contrast-110 group-hover:grayscale-0 group-hover:contrast-100 transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)]"
                />
              </motion.div>
            </div>
          </div>

          {/* Bottom Row: 5 Horizontal Tags */}
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
            src={assets.ElementalBigImg}
            alt="Elemental Alchemy Master Creation"
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