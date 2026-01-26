'use client';

import Section from "@/components/ui/Section";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { profile } from "@/data/profile";
import Image from "next/image";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <Section className="flex flex-col-reverse md:flex-row items-center justify-between min-h-[calc(100vh-100px)] py-12 gap-10">
      
      {/* Left Content */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-6 max-w-2xl flex-1"
      >
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground leading-tight">
          Hello, I&apos;m <span className="relative inline-block text-primary">
            {profile.name}
            <motion.span 
              className="absolute -bottom-2 left-0 w-full h-2 bg-yellow-300/60 -z-10 skew-x-12"
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ delay: 1, duration: 0.8 }}
            />
          </span>.
        </h1>
        
        <div className="flex flex-col space-y-2 text-xl md:text-2xl text-muted-foreground font-light">
          {profile.experience.map((job, i) => (
             <span key={i} className="flex items-center">
               <span className="w-2 h-2 rounded-full bg-primary/60 mr-3"></span>
               {job.role} at {job.company}
             </span>
          ))}
        </div>

        <p className="text-lg text-muted-foreground leading-relaxed">
          {profile.summary}
        </p>
        
        <div className="flex flex-wrap gap-4 pt-4">
          <Link 
            href="/portfolio"
            className="inline-flex items-center px-6 py-3 rounded-lg bg-primary text-white font-medium hover:bg-primary-dark transition-colors shadow-sm"
          >
            View Projects
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
          <Link 
            href="/contact"
            className="inline-flex items-center px-6 py-3 rounded-lg border border-border bg-white text-foreground font-medium hover:bg-gray-50 transition-colors"
          >
            Contact Me
          </Link>
        </div>
      </motion.div>

      {/* Right Image */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="flex-shrink-0 relative w-64 h-64 md:w-80 md:h-80 lg:w-[400px] lg:h-[400px]"
      >
        <div className="absolute inset-0 bg-primary/10 rounded-full blur-3xl transform -translate-y-4"></div>
        <Image
          src="/rizki.jpeg"
          alt={profile.name}
          fill
          className="object-cover rounded-3xl shadow-2xl border-4 border-white/50 rotate-3 hover:rotate-0 transition-transform duration-500"
          priority
        />
      </motion.div>
    </Section>
  );
}
