"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

export default function AnimatedSection({
  children,
  className = "",
  style = {},
  delay = 0,
  direction = "up", // up, down, left, right
  once = true,
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, margin: "-60px" });

  const variants = {
    up: { hidden: { y: 40, opacity: 0 }, visible: { y: 0, opacity: 1 } },
    down: { hidden: { y: -40, opacity: 0 }, visible: { y: 0, opacity: 1 } },
    left: { hidden: { x: -40, opacity: 0 }, visible: { x: 0, opacity: 1 } },
    right: { hidden: { x: 40, opacity: 0 }, visible: { x: 0, opacity: 1 } },
    fade: { hidden: { opacity: 0 }, visible: { opacity: 1 } },
    scale: { hidden: { scale: 0.9, opacity: 0 }, visible: { scale: 1, opacity: 1 } },
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      style={style}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants[direction] || variants.up}
      transition={{
        duration: 0.6,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
    >
      {children}
    </motion.div>
  );
}
