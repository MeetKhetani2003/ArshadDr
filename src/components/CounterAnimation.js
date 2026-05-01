"use client";
import { useRef, useEffect } from "react";
import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";

export default function CounterAnimation({ target, suffix = "", duration = 2 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => Math.floor(v));

  useEffect(() => {
    if (isInView) {
      const num = parseInt(target.replace(/[^0-9]/g, ""));
      animate(count, num, { duration, ease: "easeOut" });
    }
  }, [isInView, target, count, duration]);

  return (
    <motion.span ref={ref}>
      <motion.span>{rounded}</motion.span>
      {suffix}
    </motion.span>
  );
}
