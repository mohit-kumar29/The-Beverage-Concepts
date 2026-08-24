import React, { useRef, useEffect, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { assets } from '../assets/assets';

const COCKTAIL_IMAGES = [
  { id: 1, src: assets.GalleryImg1, alt: "Smoked Negroni" },
  { id: 2, src: assets.GalleryImg2, alt: "Artisan Ice", caption: "" },
  { id: 3, src: assets.GalleryImg3, alt: "Citrus Infusion", caption: "" },
  { id: 4, src: assets.GalleryImg4, alt: "Crystal Glass", caption: "" },
  { id: 5, src: assets.GalleryImg5, alt: "Crystal Martini", caption: "" },
  { id: 6, src: assets.GalleryImg6, alt: "Champagne Toast", caption: "" },
  { id: 7, src: assets.GalleryImg7, alt: "Whiskey Neat", caption: "" },
  { id: 8, src: assets.GalleryImg8, alt: "Herb & Blossom", caption: "" },
  { id: 9, src: assets.GalleryImg9, alt: "Smoke Effect", caption: "" },
  { id: 10, src: assets.GalleryImg10, alt: "Premium Spirits", caption: "" },
  { id: 11, src: assets.GalleryImg11, alt: "Bartender Craft", caption: "" },
  { id: 12, src: assets.GalleryImg12, alt: "Gin Tonic", caption: "" },
  { id: 13, src: assets.GalleryImg13, alt: "Red Wine Pour", caption: "" },
  { id: 14, src: assets.GalleryImg14, alt: "Pacific Horizon", caption: "" },
  { id: 15, src: assets.GalleryImg15, alt: "Midnight Reserve", caption: "" },
  { id: 16, src: assets.GalleryImg16, alt: "Espresso Martini", caption: "" },
  { id: 17, src: assets.GalleryImg17, alt: "Luxury Bar", caption: "" },
  { id: 18, src: assets.GalleryImg18, alt: "Layered Drink", caption: "" },
  { id: 19, src: assets.GalleryImg19, alt: "Citrus Slice", caption: "" },
  { id: 20, src: assets.GalleryImg20, alt: "Mojito Fresh", caption: "" },
  { id: 21, src: assets.GalleryImg21, alt: "Copper Bar", caption: "" },
];

export default function Gallery() {
  const scrollContainerRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Progressive background prefetching without blocking the main render thread
  useEffect(() => {
    const priorityImages = COCKTAIL_IMAGES.slice(0, 4);
    const deferredImages = COCKTAIL_IMAGES.slice(4);

    priorityImages.forEach((item) => {
      if (item.src) {
        const img = new Image();
        img.src = item.src;
      }
    });

    const timer = setTimeout(() => {
      deferredImages.forEach((item) => {
        if (item.src) {
          const img = new Image();
          img.src = item.src;
        }
      });
    }, 150);

    return () => clearTimeout(timer);
  }, []);

  const checkScrollLimits = useCallback(() => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  }, []);

  useEffect(() => {
    const el = scrollContainerRef.current;
    if (el) {
      checkScrollLimits();
      el.addEventListener('scroll', checkScrollLimits, { passive: true });
      window.addEventListener('resize', checkScrollLimits);
      return () => {
        el.removeEventListener('scroll', checkScrollLimits);
        window.removeEventListener('resize', checkScrollLimits);
      };
    }
  }, [checkScrollLimits]);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      const scrollDistance = window.innerWidth < 768 ? window.innerWidth * 0.75 : 450;
      scrollContainerRef.current.scrollBy({ left: -scrollDistance, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      const scrollDistance = window.innerWidth < 768 ? window.innerWidth * 0.75 : 450;
      scrollContainerRef.current.scrollBy({ left: scrollDistance, behavior: 'smooth' });
    }
  };

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,200;0,300;0,400;0,500;1,200;1,300;1,400&family=Inter:wght@300;400&display=swap"
        rel="stylesheet"
      />

      <style>{`
        .gallery-heading-wrap {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(52px, 7vw, 105px);
          font-weight: 300;
          line-height: 0.88;
          letter-spacing: -0.04em;
          color: #000000;
          margin: 0;
          padding: 0;
        }
        .gallery-heading-wrap em {
          font-style: italic;
          font-weight: 300;
          color: #666666; 
          display: block;
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
          -webkit-overflow-scrolling: touch;
          will-change: scroll-position;
        }
      `}</style>

      <div id="gallery" className="w-full bg-[#FFFFFF] text-[#000000] selection:bg-[#000000] selection:text-[#FFFFFF]">
        <div className="relative h-screen w-full bg-[#FFFFFF] flex items-center select-none overflow-hidden">
          
          {/* LEFT BUTTON (FIXED AT LEFT END, CENTERED VERTICALLY) */}
          <button
            onClick={scrollLeft}
            disabled={!canScrollLeft}
            aria-label="Scroll gallery left"
            className={`absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 rounded-full border border-[#000000]/20 bg-[#FFFFFF]/80 backdrop-blur-sm flex items-center justify-center transition-all duration-300 group ${
              canScrollLeft
                ? 'opacity-100 hover:bg-[#000000] hover:text-[#FFFFFF] cursor-pointer pointer-events-auto'
                : 'opacity-0 pointer-events-none cursor-not-allowed'
            }`}
          >
            <svg className="w-4 h-4 transform group-hover:-translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* RIGHT BUTTON (FIXED AT RIGHT END, CENTERED VERTICALLY) */}
          <button
            onClick={scrollRight}
            disabled={!canScrollRight}
            aria-label="Scroll gallery right"
            className={`absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 rounded-full border border-[#000000]/20 bg-[#FFFFFF]/80 backdrop-blur-sm flex items-center justify-center transition-all duration-300 group ${
              canScrollRight
                ? 'opacity-100 hover:bg-[#000000] hover:text-[#FFFFFF] cursor-pointer pointer-events-auto'
                : 'opacity-0 pointer-events-none cursor-not-allowed'
            }`}
          >
            <svg className="w-4 h-4 transform group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* HORIZONTAL SCROLL CONTAINER CONTROLLED BY BUTTONS */}
          <div
            ref={scrollContainerRef}
            className="flex h-[72vh] md:h-[82vh] lg:h-[86vh] items-center px-12 md:px-24 gap-10 overflow-x-auto hide-scrollbar scroll-smooth w-full"
          >
            {/* INTRO PANEL */}
            <div className="horizontal-item w-[85vw] md:w-[45vw] lg:w-[38vw] flex-shrink-0 flex flex-col justify-center h-full pr-8 md:pr-16">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-5 h-px bg-[#000000]/20" />
              </div>

              <div className="gallery-heading-wrap mb-8">
                <h1 style={{ margin: 0, padding: 0, fontWeight: "inherit", fontSize: "inherit", lineHeight: "inherit", letterSpacing: "inherit" }}>
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                    className="flex flex-col"
                  >
                    <span>Creations</span>
                    <em>Gallery</em>
                  </motion.div>
                </h1>
              </div>
            </div>

            {/* ALL DYNAMIC IMAGES IN HORIZONTAL TRACK */}
            {COCKTAIL_IMAGES.map((item, index) => {
              const isInitialImage = index < 3;
              return (
                <div
                  key={item.id}
                  className="horizontal-item w-[75vw] sm:w-[48vw] md:w-[30vw] lg:w-[24vw] h-full flex-shrink-0 flex flex-col justify-between group"
                >
                  <div className="w-full flex-grow overflow-hidden rounded-2xl border border-[#000000]/5 bg-[#FAFAFA]" style={{ transform: 'translateZ(0)' }}>
                    <img
                      src={item.src}
                      alt={item.alt}
                      loading={isInitialImage ? "eager" : "lazy"}
                      fetchPriority={isInitialImage ? "high" : "auto"}
                      decoding="async"
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      style={{ 
                        filter: 'grayscale(12%) contrast(1.05) brightness(1.0)', 
                        transform: 'translate3d(0, 0, 0)',
                        contentVisibility: 'auto'
                      }}
                    />
                  </div>
                  <div className="border-t border-[#000000]/10 mt-4 pt-3 flex justify-between items-baseline flex-shrink-0">
                    <span
                      style={{ fontFamily: "'Cormorant Garamond', 'Didot', Georgia, serif" }}
                      className="text-xs md:text-sm tracking-[0.15em] uppercase text-[#1A1A1A] font-normal"
                    >
                      {item.caption}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}