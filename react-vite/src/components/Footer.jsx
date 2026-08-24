"use client";

import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faLinkedin, faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import tbc_logo from "../assets/tbc_logo.png";

export default function Footer() {
  const footerRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    return () => {
      document.head.removeChild(link);
    };
  }, []);

  const studio = [
    { text: 'Home', section: 'home' },
    { text: 'About Us', section: 'aboutus' },
    { text: 'Our Services', section: 'ourservices' },
    { text: 'Gallery', section: 'gallery' },
    { text: 'Contact Us', section: 'contactus' }
  ];

  const connect = [
    { 
      isIcon: true,
      icon: faInstagram, 
      url: '#instagram',
      externalUrl: 'https://www.instagram.com/thebeverageconcepts/',
      ariaLabel: 'Instagram',
      isSlimIcon: false
    },
    { 
      isIcon: true,
      icon: faLinkedin, 
      url: '#linkedin',
      externalUrl: 'https://www.linkedin.com/company/lets-mix-wid-lpha/posts/?feedView=all',
      ariaLabel: 'LinkedIn',
      isSlimIcon: false
    },
    { 
      isIcon: true,
      icon: faWhatsapp, 
      url: '#whatsapp',
      externalUrl: 'https://wa.me/6581448355', // Add your phone number here e.g. https://wa.me/1234567890
      ariaLabel: 'WhatsApp',
      isSlimIcon: false
    },
  ];

  const handleStudioNavigation = (e, section) => {
    e.preventDefault();
    if (section === 'home' || section === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      window.history.pushState(null, null, ' ');
      return;
    }

    const el = document.getElementById(section);
    if (el) {
      window.history.pushState(null, null, `#${section}`);
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer
      ref={footerRef}
      className="relative w-full bg-[#FFFFFF] text-[#000000] pt-20 pb-8 font-['Plus_Jakarta_Sans',sans-serif] h-[100vh] flex flex-col justify-between select-none"
    >
      {/* Premium Grain Overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.012] bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22%20xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter%20id=%22noise%22%3E%3CfeTurbulence%20type=%22fractalNoise%22%20baseFrequency=%220.65%22%20numOctaves=%223%22%20stitchTiles=%22stitch%22/%3E%3C/filter%20%3E%3Crect%20width=%22100%25%22%20height=%22100%25%22%20filter=%22url(%23noise)%22/%3E%3C/svg%3E')]" />

      <div className="w-full relative z-10 px-6 md:px-12 lg:px-20 max-w-[1600px] mx-auto flex flex-col justify-between flex-1">
        
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pb-16 items-start border-b border-black/10">
          
          {/* Column 1: Studio Links */}
          <div className="flex flex-col space-y-4">
            <ul className="space-y-3">
              {studio.map((item, idx) => (
                <li key={idx} className="block">
                  <a
                    href={`#${item.section}`}
                    onClick={(e) => handleStudioNavigation(e, item.section)}
                    className="group relative text-[15px] text-[#444444] font-medium transition-colors duration-300 hover:text-[#050505] inline-block visual-link-alignment cursor-pointer"
                  >
                    {item.text}
                    <span className="absolute bottom-0 left-0 w-full h-[1px] bg-[#050505] scale-x-0 origin-left transition-transform duration-300 ease-out group-hover:scale-x-100" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2: Logo and Bio Centered */}
          <div className="flex flex-col items-center text-center space-y-6 md:pt-2">
            <img 
              src={tbc_logo} 
              alt="The Beverage Concepts Logo" 
              className="h-[200px] w-auto object-contain" 
            />
            <p className="text-[17px] text-[#999999] font-family: 'Cormorant Garamond', serif; leading-relaxed tracking-wide max-w-xl">
              “Building Bars that Perform, not just Pour.”
            </p>
          </div>

          {/* Column 3: Connect Links Flexed on Single Line */}
          <div className="flex flex-col space-y-4 md:items-end">
            <ul className="flex flex-row items-center gap-6">
              {connect.map((item, idx) => (
                <FooterLink 
                  key={idx} 
                  text={item.text} 
                  url={item.url} 
                  externalUrl={item.externalUrl} 
                  isIcon={item.isIcon} 
                  icon={item.icon} 
                  ariaLabel={item.ariaLabel} 
                  isSlimIcon={item.isSlimIcon} 
                />
              ))}
            </ul>
          </div>

        </div>

        {/* Dynamic Typography Brand Panel */}
        <div className="py-2 flex justify-center items-center">
          <span className="text-[10vw] font-800 tracking-[-0.03em] text-[#000000] opacity-95">
            TheBeverageConcepts
          </span>
        </div>

      </div>
    </footer>
  );
}

function FooterLink({ text, url, externalUrl, isIcon, icon, ariaLabel, isSlimIcon }) {
  const handleClick = (e) => {
    if (externalUrl) {
      e.preventDefault(); // Prevents browser from jumping/navigating locally to the hash
      window.open(externalUrl, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <li className="block">
      <a
        href={url}
        onClick={handleClick}
        target={url.startsWith('http') ? '_blank' : undefined}
        rel={url.startsWith('http') ? 'noopener noreferrer' : undefined}
        aria-label={ariaLabel}
        className="group relative text-[15px] text-[#444444] font-medium transition-colors duration-300 hover:text-[#050505] inline-block visual-link-alignment cursor-pointer"
      >
        {isIcon ? (
          <FontAwesomeIcon 
            icon={icon} 
            className={`text-[25px] transition-transform duration-300 ease-out group-hover:scale-105 ${
              isSlimIcon ? "stroke-[25] paint-order-stroke fill-current" : ""
            }`} 
            style={isSlimIcon ? { stroke: 'currentColor' } : undefined}
          />
        ) : (
          <>
            {text}
            <span className="absolute bottom-0 left-0 w-full h-[1px] bg-[#050505] scale-x-0 origin-left transition-transform duration-300 ease-out group-hover:scale-x-100" />
          </>
        )}
      </a>
    </li>
  );
}