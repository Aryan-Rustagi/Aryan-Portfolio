"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const [isHidden, setIsHidden] = useState(true);
  const [isTouchDevice, setIsTouchDevice] = useState(true); // default true for SSR safety

  useEffect(() => {
    // Detect touch devices
    if (window.matchMedia("(pointer: coarse)").matches) {
      return;
    }
    
    setIsTouchDevice(false);
    document.body.classList.add("hide-default-cursor");

    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (isHidden) setIsHidden(false);
    };

    const handleMouseLeave = () => setIsHidden(true);
    const handleMouseEnter = () => setIsHidden(false);

    const handleHoverStart = () => setIsHovering(true);
    const handleHoverEnd = () => setIsHovering(false);

    window.addEventListener("mousemove", updatePosition);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    const addHoverListeners = () => {
      const clickables = document.querySelectorAll(
        "a, button, input, textarea, select, .project-row, [role='button']"
      );
      clickables.forEach((el) => {
        el.addEventListener("mouseenter", handleHoverStart);
        el.addEventListener("mouseleave", handleHoverEnd);
      });
    };

    addHoverListeners();

    const observer = new MutationObserver(() => {
      addHoverListeners();
    });
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      document.body.classList.remove("hide-default-cursor");
      window.removeEventListener("mousemove", updatePosition);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      observer.disconnect();
      
      const clickables = document.querySelectorAll(
        "a, button, input, textarea, select, .project-row, [role='button']"
      );
      clickables.forEach((el) => {
        el.removeEventListener("mouseenter", handleHoverStart);
        el.removeEventListener("mouseleave", handleHoverEnd);
      });
    };
  }, [isHidden]);

  if (isTouchDevice) return null;

  return (
    <motion.div
      animate={{
        x: position.x - (isHovering ? 24 : 6),
        y: position.y - (isHovering ? 24 : 6),
        opacity: isHidden ? 0 : 1,
      }}
      transition={{ type: "spring", stiffness: 800, damping: 40, mass: 0.1 }}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: isHovering ? "48px" : "12px",
        height: isHovering ? "48px" : "12px",
        backgroundColor: isHovering ? "rgba(255, 77, 23, 0.1)" : "var(--accent)",
        border: isHovering ? "1px solid var(--accent)" : "none",
        borderRadius: "50%",
        pointerEvents: "none",
        zIndex: 9999,
        backdropFilter: isHovering ? "blur(2px)" : "none",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    />
  );
}
