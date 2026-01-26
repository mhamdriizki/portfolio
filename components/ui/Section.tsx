'use client';

import { cn } from "@/lib/utils";
import React from "react";
import { motion } from "framer-motion";

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  as?: React.ElementType; 
  delay?: number;
}

export default function Section({
  children,
  className = "",
  id,
  as: Component = "section", // Framer Motion uses motion.div, but we can stick to 'section' with proper ref delegation or just wrap inner.
  delay = 0,
}: SectionProps) {
  // To keep semantics, we render the Component, but animate its content or itself.
  // Using motion.create(Component) or just a wrapper. Let's use a motion wrapper inside the semantic tag or make the semantic tag a motion component.
  
  const MotionComponent = motion(Component as any);

  return (
    <MotionComponent
      id={id}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay: delay }}
      className={`py-12 md:py-16 lg:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${className}`}
    >
      {children}
    </MotionComponent>
  );
}
