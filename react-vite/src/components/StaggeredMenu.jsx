"use client";

import React, { useCallback, useLayoutEffect, useRef, useState, useEffect } from 'react';
import { gsap } from 'gsap';
import tbc_logo from "../assets/tbc_logo.png";

export const StaggeredMenu = ({
  position = 'right',
  colors = ['#000000', '#000000'], 
  items = [],
  socialItems = [],
  displaySocials = true,
  displayItemNumbering = true,
  className,
  menuButtonColor = '#FFFFFF',      
  openMenuButtonColor = '#FFFFFF',  
  changeMenuColorOnOpen = true,
  isFixed = true,
  accentColor = '#000000', 
  closeOnClickAway = true,
  onMenuOpen,
  onMenuClose
}) => {
  const [open, setOpen] = useState(false);
  const openRef = useRef(false);

  const panelRef = useRef(null);
  const preLayersRef = useRef(null);
  const preLayerElsRef = useRef([]);

  const plusHRef = useRef(null);
  const plusVRef = useRef(null);
  const iconRef = useRef(null);

  const textInnerRef = useRef(null);
  const textWrapRef = useRef(null);
  const [textLines, setTextLines] = useState(['Menu', 'Close']);

  const openTlRef = useRef(null);
  const closeTweenRef = useRef(null);
  const spinTweenRef = useRef(null);
  const textCycleAnimRef = useRef(null);
  const colorTweenRef = useRef(null);

  const toggleBtnRef = useRef(null);
  const logoContainerRef = useRef(null);
  const busyRef = useRef(false);

  // Dynamic state to track footer visibility
  const [isFooterVisible, setIsFooterVisible] = useState(false);

  // Monitor footer proximity using a performant Intersection Observer
  useEffect(() => {
    const footerElement = document.querySelector('footer');
    if (!footerElement) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsFooterVisible(entry.isIntersecting);
      },
      {
        root: null,
        threshold: 0.05, // Triggers when 5% of the footer is visible
      }
    );

    observer.observe(footerElement);

    return () => {
      observer.disconnect();
    };
  }, []);

  // Synchronized context execution handling
  useEffect(() => {
    const lenisInstance = window.lenis || document.querySelector('html')?.__lenis;

    if (open) {
      document.documentElement.classList.add('sm-lock-active');
      document.body.classList.add('sm-lock-active');
      if (lenisInstance) lenisInstance.stop();
    } else {
      document.documentElement.classList.remove('sm-lock-active');
      document.body.classList.remove('sm-lock-active');
      if (lenisInstance) lenisInstance.start();
    }

    return () => {
      document.documentElement.classList.remove('sm-lock-active');
      document.body.classList.remove('sm-lock-active');
      if (lenisInstance) lenisInstance.start();
    };
  }, [open]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const panel = panelRef.current;
      const preContainer = preLayersRef.current;
      const plusH = plusHRef.current;
      const plusV = plusVRef.current;
      const icon = iconRef.current;
      const textInner = textInnerRef.current;

      if (!panel || !plusH || !plusV || !icon || !textInner) return;

      let preLayers = [];
      if (preContainer) {
        preLayers = Array.from(preContainer.querySelectorAll('.sm-prelayer'));
      }
      preLayerElsRef.current = preLayers;

      const offscreen = position === 'left' ? -100 : 100;
      gsap.set([panel, ...preLayers], { xPercent: offscreen, opacity: 1 });
      if (preContainer) {
        gsap.set(preContainer, { xPercent: 0, opacity: 1 });
      }

      gsap.set(plusH, { transformOrigin: '50% 50%', rotate: 0 });
      gsap.set(plusV, { transformOrigin: '50% 50%', rotate: 90 });
      gsap.set(icon, { rotate: 0, transformOrigin: '50% 50%' });
      gsap.set(textInner, { yPercent: 0 });
      
      // Initially hide the menu logo container setup
      if (logoContainerRef.current) {
        gsap.set(logoContainerRef.current, { opacity: 0, y: -30, visibility: 'hidden' });
      }

      if (toggleBtnRef.current) {
        gsap.set(toggleBtnRef.current, { color: menuButtonColor });
        
        // Exact matching transition configuration and timing parameters aligned with the hero section logo element
        gsap.fromTo(toggleBtnRef.current,
          { y: 160, rotateX: 15, opacity: 0 },
          { y: 0, rotateX: 0, opacity: 1, duration: 1.8, ease: "expo.out", delay: 1.1 }
        );
      }
    });
    return () => ctx.revert();
  }, [menuButtonColor, position]);

  const buildOpenTimeline = useCallback(() => {
    const panel = panelRef.current;
    const layers = preLayerElsRef.current;
    if (!panel) return null;

    openTlRef.current?.kill();
    if (closeTweenRef.current) {
      closeTweenRef.current.kill();
      closeTweenRef.current = null;
    }

    const itemEls = Array.from(panel.querySelectorAll('.sm-panel-itemLabel'));
    const numberEls = Array.from(panel.querySelectorAll('.sm-number-badge'));
    const socialTitles = Array.from(panel.querySelectorAll('.sm-socials-title'));
    const socialLinks = Array.from(panel.querySelectorAll('.sm-socials-link'));

    const offscreen = position === 'left' ? -100 : 100;
    const layerStates = layers.map(el => ({ el, start: offscreen }));
    const panelStart = offscreen;

    if (itemEls.length) gsap.set(itemEls, { yPercent: 140, rotate: 2 });
    if (numberEls.length) gsap.set(numberEls, { opacity: 0, y: 15 });
    if (socialTitles.length) gsap.set(socialTitles, { opacity: 0, y: 20 });
    if (socialLinks.length) gsap.set(socialLinks, { y: 15, opacity: 0 });

    const tl = gsap.timeline({ paused: true });

    layerStates.forEach((ls, i) => {
      tl.fromTo(ls.el, 
        { xPercent: ls.start }, 
        { xPercent: 0, duration: 0.85, ease: 'expo.out' }, 
        i * 0.06
      );
    });

    const lastTime = layerStates.length ? (layerStates.length - 1) * 0.06 : 0;
    const panelInsertTime = lastTime + (layerStates.length ? 0.04 : 0);
    const panelDuration = 0.85;

    tl.fromTo(panel, 
      { xPercent: panelStart }, 
      { xPercent: 0, duration: panelDuration, ease: 'expo.out' }, 
      panelInsertTime
    );

    // Synchronize Top Logo appearance precisely with final panel insertion timing
    if (logoContainerRef.current) {
      tl.fromTo(logoContainerRef.current,
        { opacity: 0, y: -30, visibility: 'hidden' },
        { opacity: 1, y: 0, visibility: 'visible', duration: 0.8, ease: 'power3.out' },
        panelInsertTime + 0.15
      );
    }

    if (itemEls.length) {
      const itemsStart = panelInsertTime + 0.18;
      tl.to(itemEls, { 
        yPercent: 0, 
        rotate: 0, 
        duration: 0.95, 
        ease: 'power4.out', 
        stagger: { each: 0.07 } 
      }, itemsStart);

      if (numberEls.length) {
        tl.to(numberEls, { 
          opacity: 1, 
          y: 0, 
          duration: 0.75, 
          ease: 'power3.out', 
          stagger: { each: 0.07 } 
        }, itemsStart + 0.08);
      }
    }

    if (socialTitles.length || socialLinks.length) {
      const socialsStart = panelInsertTime + 0.30;
      
      if (socialTitles.length) {
        tl.to(socialTitles, { 
          opacity: 1, 
          y: 0, 
          duration: 0.75, 
          ease: 'power3.out', 
          stagger: { each: 0.08 } 
        }, socialsStart + 0.08);
      }
      
      if (socialLinks.length) {
        tl.to(socialLinks, { 
          y: 0, 
          opacity: 1, 
          duration: 0.75, 
          ease: 'power3.out', 
          stagger: { each: 0.05 } 
        }, socialsStart + 0.20);
      }
    }

    openTlRef.current = tl;
    return tl;
  }, [position]);

  const playOpen = useCallback(() => {
    if (busyRef.current) return;
    busyRef.current = true;
    const tl = buildOpenTimeline();
    if (tl) {
      tl.eventCallback('onComplete', () => { busyRef.current = false; });
      tl.play(0);
    } else {
      busyRef.current = false;
    }
  }, [buildOpenTimeline]);

  const playClose = useCallback(() => {
    openTlRef.current?.kill();
    openTlRef.current = null;

    const panel = panelRef.current;
    const layers = preLayerElsRef.current;
    if (!panel) return;

    closeTweenRef.current?.kill();

    const offscreen = position === 'left' ? -100 : 100;
    
    // Animate logo out dynamically mirroring the panel removal speed setup
    if (logoContainerRef.current) {
      gsap.to(logoContainerRef.current, {
        opacity: 0,
        y: -20,
        duration: 0.4,
        ease: 'power2.inOut',
        onComplete: () => {
          if (logoContainerRef.current) logoContainerRef.current.style.visibility = 'hidden';
        }
      });
    }

    const all = [...layers, panel];
    closeTweenRef.current = gsap.to(all, {
      xPercent: offscreen,
      duration: 0.65,
      ease: 'expo.inOut',
      overwrite: 'auto',
      stagger: { each: 0.05, from: 'end' },
      onComplete: () => {
        busyRef.current = false;
      }
    });
  }, [position]);

  const animateIcon = useCallback(opening => {
    const icon = iconRef.current;
    const h = plusHRef.current;
    const v = plusVRef.current;
    if (!icon || !h || !v) return;

    spinTweenRef.current?.kill();

    if (opening) {
      spinTweenRef.current = gsap.timeline({ defaults: { ease: 'expo.out' } })
        .to(h, { rotate: 45, duration: 0.7 }, 0)
        .to(v, { rotate: -45, duration: 0.7 }, 0);
    } else {
      spinTweenRef.current = gsap.timeline({ defaults: { ease: 'expo.inOut' } })
        .to(h, { rotate: 0, duration: 0.55 }, 0)
        .to(v, { rotate: 90, duration: 0.55 }, 0);
    }
  }, []);

  const animateColor = useCallback(opening => {
    const btn = toggleBtnRef.current;
    if (!btn) return;
    colorTweenRef.current?.kill();
    if (changeMenuColorOnOpen) {
      const targetColor = opening ? openMenuButtonColor : menuButtonColor;
      colorTweenRef.current = gsap.to(btn, { color: targetColor, delay: 0.15, duration: 0.45, ease: 'power2.out' });
    }
  }, [openMenuButtonColor, menuButtonColor, changeMenuColorOnOpen]);

  const animateText = useCallback(opening => {
    const inner = textInnerRef.current;
    if (!inner) return;

    textCycleAnimRef.current?.kill();
    const currentLabel = opening ? 'Menu' : 'Close';
    const targetLabel = opening ? 'Close' : 'Menu';
    
    const seq = [currentLabel, targetLabel, targetLabel];
    setTextLines(seq);
    gsap.set(inner, { yPercent: 0 });

    const finalShift = ((seq.length - 1) / seq.length) * 100;
    textCycleAnimRef.current = gsap.to(inner, {
      yPercent: -finalShift,
      duration: 0.65,
      ease: 'expo.out'
    });
  }, []);

  const toggleMenu = useCallback(() => {
    const target = !openRef.current;
    openRef.current = target;
    setOpen(target);

    if (target) {
      onMenuOpen?.();
      playOpen();
    } else {
      onMenuClose?.();
      playClose();
    }

    animateIcon(target);
    animateColor(target);
    animateText(target);
  }, [playOpen, playClose, animateIcon, animateColor, animateText, onMenuOpen, onMenuClose]);

  const closeMenu = useCallback(() => {
    if (openRef.current) {
      openRef.current = false;
      setOpen(false);
      onMenuClose?.();
      playClose();
      animateIcon(false);
      animateColor(false);
      animateText(false);
    }
  }, [playClose, animateIcon, animateColor, animateText, onMenuClose]);

  // Prevent scroll event propagation to lenis/global scroll listeners
  const handleScrollStopPropagation = (e) => {
    e.stopPropagation();
  };

  // Hide header specifically when entering the footer, unless the overlay panel is currently open
  const shouldHideHeader = isFooterVisible && !open;

  return (
    <div className={`sm-scope ${isFixed ? 'fixed top-0 left-0 w-screen h-screen overflow-hidden pointer-events-none' : 'w-full h-full'}`} style={{ zIndex: 9999 }}>
      <div 
        className="staggered-menu-wrapper relative w-full h-full" 
        style={accentColor ? { ['--sm-accent']: accentColor } : undefined} 
        data-position={position}
        data-open={open ? "true" : undefined}
      >
        
        <div ref={preLayersRef} className="sm-prelayers absolute top-0 right-0 bottom-0 pointer-events-none z-[5]" aria-hidden="true">
          {(colors.length ? colors : ['#000000', '#000000']).map((c, i) => (
            <div key={i} className="sm-prelayer absolute top-0 right-0 h-full w-full" style={{ background: c || '#000000' }} />
          ))}
        </div>

        {/* LOGO CONTAINER */}
        <div 
          ref={logoContainerRef}
          className="absolute top-0 left-0 z-[99999] p-6 md:p-14 lg:p-28 pt-[40px] md:pt-[50px] lg:pt-[30px] lg:pl-[50px] overflow-hidden select-none pointer-events-none" 
        >
          <img 
            src={tbc_logo} 
            alt="The Beverage Concepts Logo" 
            className="h-[70px] md:h-[60px] lg:h-[120px] w-auto object-contain block" 
            style={{ 
              cursor: open ? 'pointer' : 'default',
              pointerEvents: open ? 'auto' : 'none'
            }}
            onClick={() => {
              if (open) {
                const heroElement = document.getElementById('hero');
                if (heroElement) {
                  heroElement.scrollIntoView({ behavior: 'smooth' });
                } else {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }
                closeMenu();
              }
            }}
          />
        </div>

        <header 
          className={`staggered-menu-header absolute top-0 left-0 w-full flex items-center justify-between p-6 sm:p-10 bg-transparent z-20 transition-all duration-500 ease-in-out ${
            shouldHideHeader ? 'opacity-0 pointer-events-none -translate-y-4' : 'opacity-100 pointer-events-auto translate-y-0'
          }`}
        >
          <button ref={toggleBtnRef} className="sm-toggle relative inline-flex items-center gap-2 pointer-events-auto outline-none ml-auto" onClick={toggleMenu} type="button">
            <span ref={textWrapRef} className="sm-toggle-textWrap relative inline-block overflow-hidden whitespace-nowrap min-w-[55px] text-right">
              <span ref={textInnerRef} className="sm-toggle-textInner flex flex-col">
                {textLines.map((l, i) => (
                  <span className="sm-toggle-line block whitespace-nowrap text-right" key={i}>{l}</span>
                ))}
              </span>
            </span>

            <span ref={iconRef} className="sm-icon relative w-4 h-4 shrink-0 inline-flex items-center justify-center">
              <span ref={plusHRef} className="sm-icon-line absolute w-full h-[1px] bg-current" />
              <span ref={plusVRef} className="sm-icon-line absolute w-full h-[1px] bg-current" />
            </span>
          </button>
        </header>

        <aside id="staggered-menu-panel" ref={panelRef} className="staggered-menu-panel absolute top-0 right-0 h-full bg-[#FFFFFF] flex flex-col z-10 pointer-events-auto">
          <div className="sm-panel-inner relative h-full flex flex-col justify-start pt-32 sm:pt-30 pl-8 sm:pl-16 md:pl-20 pr-0 ml-auto w-full max-w-none">        
            <ul className="sm-panel-list list-none m-0 p-0 flex flex-col items-end gap-2 sm:gap-10">
              {items.map((it, idx) => (
                <li className="sm-panel-itemWrap relative overflow-hidden" key={idx}>
                  <a className="sm-link-container group flex items-start no-underline py-1 w-[260px] sm:w-[380px] md:w-[460px] lg:w-[580px]" href={it.link} onClick={(e) => { it.onClick?.(e); closeMenu(); }}>
                    <div className="overflow-hidden relative flex-1 text-left whitespace-nowrap">
                      <span className="sm-panel-itemLabel block text-[#000000] font-light text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight uppercase leading-none transition-transform duration-300 ease-out group-hover:translate-x-3">
                        {it.label}
                      </span>
                    </div>
                  </a>
                </li>
              ))}
            </ul>

            {displaySocials && (
              <div className="sm-socials absolute bottom-0 left-0 pl-4 sm:pl-8 md:pl-10 pb-10 sm:pb-16 flex flex-col gap-8 sm:gap-12 w-full max-w-[260px] sm:max-w-[450px] md:max-w-[600px] lg:max-w-[700px]">
                
                {/* Responsive Width-Bounded Hover Trigger Container */}
                <div className="sm-download-wrapper inline-block w-fit relative z-50 pointer-events-auto">
                  <div className="group relative inline-block w-[180px] sm:w-[200px] md:w-[220px] lg:w-[250px]">
                    <div className="bg-white border rounded-[22px] lg:rounded-[26px] group-hover:shadow-xl overflow-hidden w-full transition-shadow duration-300">
                      
                      {/* Strictly Centered Header Bar */}
                      {/* <div className="h-10 md:h-11 flex items-center justify-between px-4 md:px-5 lg:px-6 cursor-pointer select-none">
                        <div className="w-full flex items-center justify-between gap-2 md:gap-3 lg:gap-4">
                          <span className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-black shrink-0"></span>
                          <span className="text-[12px] md:text-xs uppercase tracking-widest text-black font-medium text-center flex-1 leading-none">
                            DOWNLOADS
                          </span>
                          <span className="text-xs md:text-xl text-black transform transition-transform duration-300 group-hover:rotate-90 leading-none shrink-0 inline-flex items-center justify-center">
                            ›
                          </span>
                        </div>
                      </div> */}

                      {/* Expandable Document Cards Grid Container - Explicit Height with forced scroll isolation */}
                      <div 
                        onWheel={handleScrollStopPropagation}
                        onTouchMove={handleScrollStopPropagation}
                        className="max-h-0 opacity-0 group-hover:max-h-[190px] md:group-hover:max-h-[210px] group-hover:opacity-100 group-hover:px-4 group-hover:pb-4 group-hover:pt-1 md:group-hover:px-5 md:group-hover:pb-5 lg:group-hover:px-6 lg:group-hover:pb-6 transition-all duration-500 ease-in-out overflow-y-auto sm-download-scroll pointer-events-auto"
                      >
                        <div className="grid grid-cols-1 gap-2 pt-2 border-t border-zinc-100">
                          <a href="/docs/MohitCV.pdf" download="MohitCV.pdf" className="group/item flex items-center justify-between p-2.5 rounded-lg bg-zinc-50 hover:bg-black hover:text-white transition-all duration-300 no-underline">
                            <div className="flex flex-col">
                              <span className="text-[11px] md:text-xs font-semibold uppercase tracking-wider text-black group-hover/item:text-white transition-colors duration-300">Curriculum Vitae</span>
                              <span className="text-[9px] md:text-[10px] text-zinc-400 group-hover/item:text-zinc-300 transition-colors duration-300">PDF Document</span>
                            </div>
                            <span className="text-xs text-zinc-400 group-hover/item:text-white transition-colors duration-300">↓</span>
                          </a>

                          <a href="/docs/Portfolio.pdf" download="Portfolio.pdf" className="group/item flex items-center justify-between p-2.5 rounded-lg bg-zinc-50 hover:bg-black hover:text-white transition-all duration-300 no-underline">
                            <div className="flex flex-col">
                              <span className="text-[11px] md:text-xs font-semibold uppercase tracking-wider text-black group-hover/item:text-white transition-colors duration-300">Brand Portfolio</span>
                              <span className="text-[9px] md:text-[10px] text-zinc-400 group-hover/item:text-zinc-300 transition-colors duration-300">PDF Presentation</span>
                            </div>
                            <span className="text-xs text-zinc-400 group-hover/item:text-white transition-colors duration-300">↓</span>
                          </a>

                          <a href="/docs/ServicesOverview.pdf" download="ServicesOverview.pdf" className="group/item flex items-center justify-between p-2.5 rounded-lg bg-zinc-50 hover:bg-black hover:text-white transition-all duration-300 no-underline">
                            <div className="flex flex-col">
                              <span className="text-[11px] md:text-xs font-semibold uppercase tracking-wider text-black group-hover/item:text-white transition-colors duration-300">Services Deck</span>
                              <span className="text-[9px] md:text-[10px] text-zinc-400 group-hover/item:text-zinc-300 transition-colors duration-300">PDF Overview</span>
                            </div>
                            <span className="text-xs text-zinc-400 group-hover/item:text-white transition-colors duration-300">↓</span>
                          </a>

                          <a href="/docs/ServicesOverview.pdf" download="ServicesOverview.pdf" className="group/item flex items-center justify-between p-2.5 rounded-lg bg-zinc-50 hover:bg-black hover:text-white transition-all duration-300 no-underline">
                            <div className="flex flex-col">
                              <span className="text-[11px] md:text-xs font-semibold uppercase tracking-wider text-black group-hover/item:text-white transition-colors duration-300">Services Deck</span>
                              <span className="text-[9px] md:text-[10px] text-zinc-400 group-hover/item:text-zinc-300 transition-colors duration-300">PDF Overview</span>
                            </div>
                            <span className="text-xs text-zinc-400 group-hover/item:text-white transition-colors duration-300">↓</span>
                          </a>

                          <a href="/docs/ServicesOverview.pdf" download="ServicesOverview.pdf" className="group/item flex items-center justify-between p-2.5 rounded-lg bg-zinc-50 hover:bg-black hover:text-white transition-all duration-300 no-underline">
                            <div className="flex flex-col">
                              <span className="text-[11px] md:text-xs font-semibold uppercase tracking-wider text-black group-hover/item:text-white transition-colors duration-300">Services Deck</span>
                              <span className="text-[9px] md:text-[10px] text-zinc-400 group-hover/item:text-zinc-300 transition-colors duration-300">PDF Overview</span>
                            </div>
                            <span className="text-xs text-zinc-400 group-hover/item:text-white transition-colors duration-300">↓</span>
                          </a>

                          <a href="/docs/ServicesOverview.pdf" download="ServicesOverview.pdf" className="group/item flex items-center justify-between p-2.5 rounded-lg bg-zinc-50 hover:bg-black hover:text-white transition-all duration-300 no-underline">
                            <div className="flex flex-col">
                              <span className="text-[11px] md:text-xs font-semibold uppercase tracking-wider text-black group-hover/item:text-white transition-colors duration-300">Services Deck</span>
                              <span className="text-[9px] md:text-[10px] text-zinc-400 group-hover/item:text-zinc-300 transition-colors duration-300">PDF Overview</span>
                            </div>
                            <span className="text-xs text-zinc-400 group-hover/item:text-white transition-colors duration-300">↓</span>
                          </a>

                          <a href="/docs/ServicesOverview.pdf" download="ServicesOverview.pdf" className="group/item flex items-center justify-between p-2.5 rounded-lg bg-zinc-50 hover:bg-black hover:text-white transition-all duration-300 no-underline">
                            <div className="flex flex-col">
                              <span className="text-[11px] md:text-xs font-semibold uppercase tracking-wider text-black group-hover/item:text-white transition-colors duration-300">Services Deck</span>
                              <span className="text-[9px] md:text-[10px] text-zinc-400 group-hover/item:text-zinc-300 transition-colors duration-300">PDF Overview</span>
                            </div>
                            <span className="text-xs text-zinc-400 group-hover/item:text-white transition-colors duration-300">↓</span>
                          </a>

                          <a href="/docs/ServicesOverview.pdf" download="ServicesOverview.pdf" className="group/item flex items-center justify-between p-2.5 rounded-lg bg-zinc-50 hover:bg-black hover:text-white transition-all duration-300 no-underline">
                            <div className="flex flex-col">
                              <span className="text-[11px] md:text-xs font-semibold uppercase tracking-wider text-black group-hover/item:text-white transition-colors duration-300">Services Deck</span>
                              <span className="text-[9px] md:text-[10px] text-zinc-400 group-hover/item:text-zinc-300 transition-colors duration-300">PDF Overview</span>
                            </div>
                            <span className="text-xs text-zinc-400 group-hover/item:text-white transition-colors duration-300">↓</span>
                          </a>
                        </div>
                      </div>

                    </div>
                  </div>
                </div>

                <div className="sm-socials-content flex flex-row gap-6 sm:gap-10 md:gap-20 lg:gap-32">
                  {/* Column 1: Socials */}
                  {socialItems.length > 0 && (
                    <div className="flex flex-col gap-3 shrink-0">
                      <h2 className="sm-socials-title m-0 text-[10px] sm:text-[11px] lg:text-[12px] uppercase tracking-widest text-[#000000] font-medium whitespace-nowrap">Socials</h2>
                      <ul className="sm-socials-list list-none m-0 p-0 flex flex-col items-start gap-2">
                        {socialItems.map((s, i) => (
                          <li key={i}>
                            <a href={s.link} target="_blank" rel="noopener noreferrer" className="sm-socials-link text-[10px] sm:text-xs lg:text-sm font-normal text-zinc-500 no-underline hover:text-black transition-colors duration-300 whitespace-nowrap">
                              {s.label}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Column 2: Our Services Section */}
                  <div className="flex flex-col gap-3">
                    <h2 className="sm-socials-title m-0 text-[10px] sm:text-[11px] lg:text-[12px] uppercase tracking-widest text-[#000000] font-medium whitespace-nowrap">What We Offer</h2>
                    <ul className="sm-socials-list list-none m-0 p-0 flex flex-col items-start gap-2">
                      <li>
                        <a href="/elemental-beverage-alchemy" className="sm-socials-link text-[10px] sm:text-xs lg:text-sm font-normal text-zinc-500 no-underline hover:text-black transition-colors duration-300 whitespace-nowrap">
                          Elemental Beverage Alchemy
                        </a>
                      </li>
                      <li>
                        <a href="/bespoke-beverage-design" className="sm-socials-link text-[10px] sm:text-xs lg:text-sm font-normal text-zinc-500 no-underline hover:text-black transition-colors duration-300 whitespace-nowrap">
                          Bespoke Beverage Design
                        </a>
                      </li>
                      <li>
                        <a href="/total-beverage-solution" className="sm-socials-link text-[10px] sm:text-xs lg:text-sm font-normal text-zinc-500 no-underline hover:text-black transition-colors duration-300 whitespace-nowrap">
                          Total Beverage Solution
                        </a>
                      </li>
                    </ul>
                  </div>

                  <div className="flex flex-col gap-3">
                    {/* <h2 className="sm-socials-title m-0 text-[12px] uppercase tracking-widest text-[#000000] font-medium">About Us</h2> */}
                    <ul className="sm-socials-list list-none m-0 p-0 flex flex-col items-start gap-2 flex-wrap">
                      <li>
                        {/* <a href="/learn-more" className="sm-socials-link text-xs sm:text-sm font-normal text-zinc-500 no-underline hover:text-black transition-colors duration-300">
                          Founder's Story
                        </a> */}
                      </li>
                    </ul>
                  </div>
                </div>

              </div>
            )}
          </div>
        </aside>
      </div>

      <style>{`
        html {
          scrollbar-gutter: stable;
        }

        html.sm-lock-active, body.sm-lock-active {
          overflow: hidden !important;
        }

        /* Direct force scrolling for internal dropdown, completely unblocked */
        .sm-download-scroll {
          overflow-y: auto !important;
          overscroll-behavior: contain !important;
          touch-action: pan-y !important;
          -webkit-overflow-scrolling: touch !important;
          pointer-events: auto !important;
          scrollbar-width: auto;
          scrollbar-color: #000000 transparent;
        }

        /* Visible, Thick, Black Custom Scrollbar */
        .sm-download-scroll::-webkit-scrollbar {
          width: 8px;
        }
        .sm-download-scroll::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.05);
          border-radius: 9999px;
        }
        .sm-download-scroll::-webkit-scrollbar-thumb {
          background: #000000;
          border-radius: 9999px;
        }
        .sm-download-scroll::-webkit-scrollbar-thumb:hover {
          background: #333333;
        }

        /* Solid Black [#000000] Background Pill with Pure White Text/Icon */
        .sm-scope .sm-toggle {
          background: #000000 !important;
          border: 1px solid #000000 !important;
          color: #ffffff !important;
          border-radius: 9999px;
          padding: 10px 22px;
          font-weight: 500;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          font-size: 11px;
          transition: background 0.3s, border-color 0.3s, transform 0.2s ease, color 0.2s ease;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }

        .sm-scope .sm-toggle:hover {
          background: #222222 !important;
          border-color: #222222 !important;
          color: #ffffff !important;
          transform: scale(1.02);
        }

        /* Opened State */
        .sm-scope [data-open="true"] .sm-toggle {
          background: #000000 !important;
          border-color: #000000 !important;
          color: #ffffff !important;
        }
        
        .sm-scope [data-open="true"] .sm-toggle:hover {
          background: #222222 !important;
          border-color: #222222 !important;
          color: #ffffff !important;
        }

        .sm-scope .sm-toggle-textWrap {
          display: inline-block;
          height: 1.4em;
          overflow: hidden;
        }

        .sm-scope .sm-toggle-textInner {
          display: flex;
          flex-direction: column;
        }

        .sm-scope .sm-toggle-line {
          height: 1.4em;
          line-height: 1.4em;
          display: block;
          font-size: 11px;
          color: inherit;
        }

        .sm-scope .staggered-menu-panel { width: 100vw; }
        .sm-scope .sm-prelayers { width: 100vw; }
        .sm-scope .sm-prelayer { background: #000000 !important; }

        @media (max-width: 1024px) {
          .sm-scope .sm-panel-itemLabel { font-size: 2.5rem; }
          .sm-scope .sm-socials { max-width: none !important; width: calc(100% - 2rem); }
        }

        @media (max-width: 640px) {
          .sm-scope .sm-toggle { 
            padding: 8px 8px; 
            gap: 8px; 
            border: 1px solid #000000 !important;
          }
          .sm-scope .sm-toggle-textWrap {
            min-width: 48px;
            height: 1.4em;
          }
          .sm-scope .sm-toggle-line {
            height: 1.4em;
            line-height: 1.4em;
            font-size: 10px;
          }
          .sm-scope .sm-icon {
            width: 12px;
            height: 12px;
          }
          .sm-scope .sm-panel-inner { padding-left: 1.5rem; padding-right: 0px; margin-left: 0; max-width: 100%; }
          .sm-scope .sm-socials { padding-left: 1rem; padding-bottom: 2.5rem; gap: 1.5rem; max-width: none !important; width: calc(100% - 1.5rem); }
          .sm-scope .sm-socials-content { transform: translateY(-24px) !important; }
          .sm-scope .sm-panel-itemLabel { font-size: 2rem; }
          .sm-scope .sm-link-container { gap: 3px; }
        }
      `}</style>
    </div>
  );
};

export default StaggeredMenu;