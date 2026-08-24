import React from "react";
import StaggeredMenu from "./StaggeredMenu";
import tbc_logo from "../assets/tbc_logo.png";

export default function Navbar() {
  const handleNavClick = (e, targetId) => {
    e.preventDefault();
    
    const lenisInstance = window.lenis;

    setTimeout(() => {
      if (targetId === "home") {
        if (lenisInstance) {
          lenisInstance.scrollTo(0, { immediate: true });
        } else {
          window.scrollTo({ top: 0, behavior: "auto" });
        }
        window.history.pushState(null, null, " ");
        return;
      }

      const el = document.getElementById(targetId);
      if (el) {
        window.history.pushState(null, null, `#${targetId}`);
        if (lenisInstance) {
          lenisInstance.scrollTo(el, { immediate: true });
        } else {
          el.scrollIntoView({ behavior: "auto" });
        }
      }
    }, 650);
  };

  const handleGlobalClick = (e) => {
    const anchor = e.target.closest("a");
    if (!anchor) return;

    const href = anchor.getAttribute("href");

    const socialMap = {
      "#linkedin": "https://www.linkedin.com/company/lets-mix-wid-lpha/posts/?feedView=all",
      "#instagram": "https://www.instagram.com/thebeverageconcepts/",
      "#whatsapp": "https://wa.me/6581448355"
    };

    if (socialMap[href]) {
      e.preventDefault();
      e.stopPropagation();
      window.open(socialMap[href], "_blank", "noopener,noreferrer");
    }
  };

  const menuItems = [
    { label: "Home", onClick: (e) => handleNavClick(e, "home"), link: "#" },
    { label: "About Us", onClick: (e) => handleNavClick(e, "aboutus"), link: "#aboutus" },
    { label: "Our Services", onClick: (e) => handleNavClick(e, "ourservices"), link: "#ourservices" },
    { label: "Gallery", onClick: (e) => handleNavClick(e, "gallery"), link: "#gallery" },
    { label: "Contact Us", onClick: (e) => handleNavClick(e, "contactus"), link: "#contactus" },
  ];

  const socialItems = [
    { label: "LinkedIn", link: "#linkedin" },
    { label: "Instagram", link: "#instagram" },
    { label: "WhatsApp", link: "#whatsapp" }
  ];

  return (
    <div onClickCapture={handleGlobalClick}>
      <StaggeredMenu
        position="right"
        items={menuItems}
        socialItems={socialItems}
        displaySocials={true}
        displayItemNumbering={true}
        menuButtonColor="#57595B"
        openMenuButtonColor="#000000"
        changeMenuColorOnOpen={true}
        colors={["#999999", "#999999"]}
        // logoUrl={tbc_logo}
        accentColor="#71717a"
      />
    </div>
  );
}