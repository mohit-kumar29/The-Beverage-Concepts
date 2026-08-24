import React, { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ScrollFloat({
  children,
  animationDuration = 0.8, // Reduced for a faster, snappier lift
  ease = "power4.out",     // Kept the high-end curve, but faster duration makes it punchy
  scrollStart = "top 88%", // Triggers slightly earlier so it's already moving when entering view
  stagger = 0.02,          // Half the original delay for a crisp, cohesive fluid movement
}) {
  const containerRef = useRef(null);

  useLayoutEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // Target the inner word elements
    const words = el.querySelectorAll(".scroll-float-word");
    if (!words.length) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        words,
        {
          y: "100%", // Start fully hidden below the overflow boundary
        },
        {
          y: "0%", // Animate cleanly up to its natural position
          duration: animationDuration,
          stagger: stagger,
          ease: ease,
          force3D: true, // Forces GPU acceleration
          scrollTrigger: {
            trigger: el,
            start: scrollStart,
            toggleActions: "play none none none", // Changed to prevent performance-heavy layout recalculations on scrolling up
            fastScrollEnd: true,                 // Crucial: Forces completion if the user scrolls past rapidly
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [animationDuration, ease, scrollStart, stagger]);

  // Safely extract text from children
  const text =
    typeof children === "string"
      ? children
      : children?.props?.children || "";

  // Split string into individual words to replicate the exact Two Good Co mask architecture
  const wordsArray = String(text).split(" ");

  return (
    <span
      ref={containerRef}
      className="inline-block w-full"
    >
      {wordsArray.map((word, index) => (
        <span
          key={index}
          className="inline-block overflow-hidden pb-[0.1em] mr-[0.22em]"
          style={{ verticalAlign: "bottom" }}
        >
          <span
            className="scroll-float-word inline-block will-change-transform"
            style={{ display: "inline-block" }}
          >
            {word}
          </span>
        </span>
      ))}
    </span>
  );
}