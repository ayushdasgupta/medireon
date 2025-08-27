"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "motion/react";
import { Home, Info, Star, Gift, Phone, BanknoteArrowDown, LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import AnchorLink from "react-anchor-link-smooth-scroll";
import { APPNAME } from "@/constraint";

interface NavItem {
  name: string;
  url: string;
  icon: LucideIcon;
}

export default function Navbar() {
  const menuItems: NavItem[] = [
    { name: "Home", url: "#home", icon: Home },
    { name: "About", url: "#about", icon: Info },
    { name: "Features", url: "#features", icon: Star },
    { name: "Benefits", url: "#benefits", icon: Gift },
    { name: "Pricing", url: "#pricing", icon: BanknoteArrowDown },
    { name: "Contact", url: "#contact", icon: Phone },
  ];

  const [activeTab, setActiveTab] = useState(menuItems[0].name);
  const [isMobile, setIsMobile] = useState(false);
  const [, setIsClickScrolling] = useState(false);
  const [isNavbarVisible, setIsNavbarVisible] = useState(false);

  const hideTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Detect mobile screen
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Mouse movement detection for desktop
  useEffect(() => {
   if (isMobile) {
    setIsNavbarVisible(true); // Always visible on mobile
    return;
  }

    const handleMouseMove = () => {
      setIsNavbarVisible(true);

      // Reset the hide timer
      if (hideTimeoutRef.current) {
        clearTimeout(hideTimeoutRef.current);
      }
      hideTimeoutRef.current = setTimeout(() => {
        setIsNavbarVisible(false);
      }, 1500); // Hide after 1.5s of no movement
    };

    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      if (hideTimeoutRef.current) {
        clearTimeout(hideTimeoutRef.current);
      }
    };
  }, [isMobile]);

  // Smooth scroll click
  const handleNavClick = (item: NavItem) => {
    setActiveTab(item.name);
    setIsClickScrolling(true);

    const element = document.querySelector(item.url);
    if (element) {
      const navbarHeight = 80; // adjust to your navbar height
      const elementTop = (element as HTMLElement).getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementTop - navbarHeight,
        behavior: "smooth",
      });

      const handleScrollEnd = () => {
        setIsClickScrolling(false);
        window.removeEventListener("scrollend", handleScrollEnd);
      };

      window.addEventListener("scrollend", handleScrollEnd);
    }
  };

  // Scroll spy
useEffect(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute("id");
          const activeItem = menuItems.find((item) => item.url === `#${id}`);
          if (activeItem) setActiveTab(activeItem.name);
        }
      });
    },
    { threshold: 0.6 } // 60% of section must be visible
  );

  menuItems.forEach((item) => {
    const section = document.querySelector(item.url);
    if (section) observer.observe(section);
  });

  return () => observer.disconnect();
});

  return (
    <div
      className={cn(
        "fixed sm:top-0 left-1/2 -translate-x-1/2 z-40 transition-transform duration-500",
        "w-full sm:w-auto px-2",
        isNavbarVisible ? "translate-y-0" : "-translate-y-full" // Slide effect
      )}
    >
      <div
        className="
          flex items-center justify-between
          overflow-x-auto sm:overflow-visible  
          sm:gap-3 bg-white/80 border border-gray-200
          backdrop-blur-lg py-1 px-1 rounded-full shadow-lg
          pointer-events-auto mt-4
        "
      >
        {!isMobile && (
          <AnchorLink
            href="#home"
            className="text-blue-600 font-bold px-4 py-2 mr-2"
          >
            {APPNAME}
          </AnchorLink>
        )}

        {menuItems
          .filter((item) => !(item.name === "Home" && !isMobile))
          .map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.name;

            return (
              <button
                key={item.name}
                onClick={() => handleNavClick(item)}
                className={cn(
                  "relative cursor-pointer text-sm font-semibold rounded-full transition-colors",
                  "flex-shrink-0 px-4 py-2 md:px-6",
                  "text-gray-600 hover:text-blue-600",
                  isActive && "text-blue-600"
                )}
              >
                {isMobile ? (
                  <Icon size={18} strokeWidth={2.5} />
                ) : (
                  item.name
                )}

                {isActive && (
                  <motion.div
                    layoutId="lamp"
                    className="absolute inset-0 w-full bg-blue-100 rounded-full -z-10"
                    initial={false}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 30,
                    }}
                  />
                )}
              </button>
            );
          })}
      </div>
    </div>
  );
}
