"use client";

import { useRef, useState, ReactElement } from "react";
import { motion, useSpring } from "framer-motion";

interface MagneticProps {
  children: ReactElement;
  intensity?: number;
}

export function Magnetic({ children, intensity = 0.3 }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  
  const springConfig = { stiffness: 200, damping: 15, mass: 0.1 };
  const x = useSpring(0, springConfig);
  const y = useSpring(0, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    
    // Calculate distance from center
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    
    x.set(middleX * intensity);
    y.set(middleY * intensity);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      style={{ x, y, display: "inline-block", zIndex: isHovered ? 10 : 1 }}
    >
      {children}
    </motion.div>
  );
}
