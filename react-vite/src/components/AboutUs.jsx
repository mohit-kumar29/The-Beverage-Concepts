import React, { useRef } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import AboutUs from '../assets/AboutUs.jpg'

/* ── STYLES ── */
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Inter:wght@200;300;400&display=swap');

    /* Reset & Root - Synchronized exact padding and background behavior with Our Services */
    .luxury-about-root {
      position: relative;
      width: 100%;
      min-height: 100vh;
      background: #FFFFFF;
      color: #0a0a0a;
      font-family: 'Inter', sans-serif;
      display: flex;
      flex-direction: column;
      padding: clamp(40px, 8vh, 80px) clamp(24px, 5.5vw, 80px);
      overflow: visible !important;
      box-sizing: border-box;
      z-index: 1;
    }

    /* HEADER ROW - Line border removed for a cleaner minimalist feel */
    .luxury-about-header {
      display: flex;
      flex-direction: column;
      margin-bottom: clamp(40px, 5vh, 60px);
      position: relative;
    }
    .luxury-about-label {
      font-size: 10px;
      font-weight: 300;
      letter-spacing: 0.35em;
      text-transform: uppercase;
      color: #888888;
      margin-bottom: 16px;
    }
    .luxury-about-title {
      font-family: 'Cormorant Garamond', serif;
      font-size: clamp(56px, 9vw, 120px);
      font-weight: 300;
      line-height: 0.88;
      letter-spacing: -0.04em;
    }
    .luxury-about-title em {
      font-style: italic;
      color: #999999;
      font-weight: 300;
    }

    /* BODY GRID */
    .luxury-about-grid {
      display: grid;
      grid-template-columns: 1.1fr 0.85fr;
      gap: 80px;
      align-items: start;
    }

    /* LEFT CONTENT */
    .luxury-about-text-col {
      display: flex;
      flex-direction: column;
      gap: 40px;
    }
    .luxury-about-chapter {
      display: flex;
      align-items: center;
      gap: 16px;
    }
    .luxury-about-chapter-num {
      font-size: 9px;
      color: #888;
      letter-spacing: 0.25em;
      text-transform: uppercase;
    }
    .luxury-about-chapter-rule {
      width: 48px;
      height: 1px;
      background: #e0e0e0;
    }
    .luxury-about-chapter-name {
      font-family: 'Cormorant Garamond', serif;
      font-size: 12px;
      letter-spacing: 0.18em;
      text-transform: uppercase;
      color: #555555;
      font-style: italic;
    }

    .luxury-about-subhead {
      font-family: 'Cormorant Garamond', serif;
      font-size: clamp(32px, 3.5vw, 48px);
      font-weight: 300;
      line-height: 1.12;
      text-transform: uppercase;
      letter-spacing: -0.01em;
    }
    .luxury-about-subhead em {
      font-style: italic;
      color: #888888;
    }

    .luxury-about-body p {
      font-size: 15px;
      line-height: 1.9;
      font-weight: 300;
      color: #444444;
      margin-bottom: 20px;
      letter-spacing: 0.01em;
    }
    .luxury-about-body strong {
      font-weight: 400;
      color: #111111;
    }
    
    /* Premium Button Styles */
    .luxury-about-btn-container {
      margin-top: 12px;
    }
    
    .luxury-about-btn {
      display: inline-block;
      padding: 16px 40px;
      background-color: transparent;
      color: #0a0a0a;
      border: 1px solid #0a0a0a;
      border-radius: 30px; 
      font-family: 'Inter', sans-serif;
      font-size: 12px;
      font-weight: 400;
      letter-spacing: 0.15em;
      text-transform: uppercase;
      text-decoration: none;
      cursor: pointer;
      transition: all 0.4s cubic-bezier(0.25, 1, 0.5, 1);
      position: relative;
      overflow: hidden;
      z-index: 1;
    }
    
    .luxury-about-btn::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: #0a0a0a;
      transform: scaleY(0);
      transform-origin: bottom;
      transition: transform 0.4s cubic-bezier(0.25, 1, 0.5, 1);
      z-index: -1;
      border-radius: 30px;
    }

    .luxury-about-btn:hover {
      color: #ffffff;
      border-color: #0a0a0a;
    }
    
    .luxury-about-btn:hover::before {
      transform: scaleY(1);
    }

    /* Stats Section */
    .luxury-about-stats {
      display: flex;
      gap: 56px;
      margin-top: 24px;
      border-top: 1px solid rgba(0,0,0,0.06);
      padding-top: 32px;
    }
    .luxury-about-stat-item {
      display: flex;
      flex-direction: column;
    }
    .luxury-about-stat-num {
      font-family: 'Cormorant Garamond', serif;
      font-size: 44px;
      font-weight: 300;
      line-height: 0.9;
      letter-spacing: -0.02em;
      color: #111111;
    }
    .luxury-about-stat-label {
      font-size: 9px;
      letter-spacing: 0.25em;
      text-transform: uppercase;
      color: #888888;
      margin-top: 8px;
    }

    /* RIGHT IMAGE */
    .luxury-about-img-motion {
      width: 100%;
      display: block;
    }

    .luxury-about-img-wrap {
      width: 100%;
      aspect-ratio: 4/5; 
      overflow: hidden;
      background: #fdfdfd;
      border-radius: 4px; 
      position: sticky;
      top: 120px;
      box-shadow: 0 30px 60px rgba(0, 0, 0, 0.05); 
    }
    
    /* Shared global dimensional properties */
    .luxury-about-img-wrap img {
      width: 100%;
      height: 100%;
      display: block;
      object-fit: cover;
      will-change: transform, filter;
    }

    /* DESKTOP VIEW HOVER HANDLING - Pure CSS remains untouched */
    @media (hover: hover) {
      .luxury-about-img-wrap img {
        filter: grayscale(100%) contrast(1.1) brightness(0.95);
        transform: scale(1.02);
        transition: filter 1.8s cubic-bezier(0.25, 1, 0.5, 1), transform 1.8s cubic-bezier(0.25, 1, 0.5, 1);
      }
      .luxury-about-img-wrap:hover img {
        filter: grayscale(0%) contrast(1.05) brightness(1);
        transform: scale(1.07);
      }
    }
   
    /* Subtle decorative elements */
    .luxury-about-deco-line {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 1px;
      background: linear-gradient(90deg, rgba(0,0,0,0.1), transparent);
    }

    /* RESPONSIVE STYLES FOR TABLET & MOBILE */
    @media (max-width: 1024px) {
      .luxury-about-grid {
        grid-template-columns: 1fr;
        gap: 56px;
      }
      .luxury-about-root {
        height: auto;
        padding: 80px clamp(24px, 5vw, 60px); 
      }
      .luxury-about-header {
        margin-bottom: 32px;
      }
      .luxury-about-img-wrap {
        position: relative;
        top: 0;
        /* Elongated layout container aspect-ratio to make the image longer on mobile/tablet frames */
        aspect-ratio: 3/4; 
        max-height: 550px;
        width: 100%;
        height: auto;
      }
    }

    @media (max-width: 768px) {
      .luxury-about-grid {
        gap: 16px; 
      }
      .luxury-about-root {
        padding: 60px 24px;
      }
      .luxury-about-header {
        margin-bottom: 24px;
      }
      .luxury-about-text-col {
        gap: 16px; 
      }
      .luxury-about-stats {
        gap: 16px;
        flex-direction: column;
        margin-top: 0px; 
        padding-top: 0px; 
        border-top: none; 
      }
      .luxury-about-img-wrap {
        /* Elongated ratio maintained natively for portable phones */
        aspect-ratio: 2/3; 
        max-height: 520px;
        width: 100%;
        height: auto;
      }
    }
  `}</style>
);

export default function LuxuryAboutSection() {
  const containerRef = useRef(null);
  const navigate = useNavigate();

  // Simple feature detection to safely pass the correct layout properties down to Framer Motion
  const isTouchDevice = typeof window !== "undefined" && ('ontouchstart' in window || navigator.maxTouchPoints > 0);

  return (
    <section ref={containerRef} id="aboutus" className="luxury-about-root">
      <GlobalStyles />
      <div className="luxury-about-deco-line" />

      <div className="luxury-about-header">
        <h1 className="luxury-about-title">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            About <em>Us</em> 
          </motion.div>
        </h1>
      </div>

      <div className="luxury-about-grid">
        <div className="luxury-about-text-col">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-20%" }}
            transition={{ duration: 1, delay: 0.1 }}
          >
          </motion.div>

          <div className="luxury-about-body">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-15%" }}
                transition={{ duration: 0.9, delay: 0.3, ease: "easeOut" }}
              >
                <p>
                  At <strong>The Beverage Concepts,</strong> we create beverage concepts that
                  are not only compelling but commercially successful. We partner
                  with hospitality brands to design, build, and elevate bar
                  programs that drive revenue, enhance guest experience, and
                  stand out in competitive markets.
                  From pre-opening strategy to operational refinement, we bring
                  clarity, structure, and creativity to every stage of the beverage
                  journey.
                </p>
                <p>Led by Ashish, whose journey spans leading hospitality
                destinations including India, Dubai, Singapore, the Caribbean,
                and the Maldives.</p>
                <p>
                  During his journey in Dubai, Ashish met his business partner, Uday, whose shared passion for hospitality,
                  innovation, and beverage excellence became the foundation of The Beverage Concepts. Together, they combine
                  international exposure, operational expertise, and creative vision to deliver exceptional beverage solutions.
                </p>
                <br />
                
                {/* Premium Button pointing to /founders-story route */}
                <motion.div 
                  className="luxury-about-btn-container"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-15%" }}
                  transition={{ duration: 0.9, delay: 0.4, ease: "easeOut" }}
                >
                  {/* <button 
                    onClick={() => navigate("/founders-story")} 
                    className="luxury-about-btn"
                    style={{ background: 'none', textAlign: 'left' }}
                  >
                    Founder's Story
                  </button> */}
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Right Sticky Image with explicit viewport-triggered cinematic reveal config */}
        <motion.div
          className="luxury-about-img-motion"
          initial={{ opacity: 0, clipPath: "inset(100% 0% 0% 0%)" }}
          whileInView={{ opacity: 1, clipPath: "inset(0% 0% 0% 0%)" }}
          viewport={{ once: true, margin: "0px" }} 
          transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="luxury-about-img-wrap">
            <motion.img
              src={AboutUs}
              alt="The Beverage Concepts - Craft and Heritage"
              loading="lazy"
              initial={isTouchDevice ? { filter: "grayscale(100%) contrast(1.1) brightness(0.95)", scale: 1.02 } : false}
              whileInView={isTouchDevice ? { filter: "grayscale(0%) contrast(1.05) brightness(1)", scale: 1.05 } : false}
              viewport={{ once: false, amount: 0.15 }}
              transition={{ duration: 2.8, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}