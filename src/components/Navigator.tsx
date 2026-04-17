"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Label, Tabular, Display } from './Typography';
import { TRANSITIONS, VARIANTS } from './Motion';

export const Navigator = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [briefingMode, setBriefingMode] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    if (briefingMode) {
      document.body.classList.add('briefing-mode');
    } else {
      document.body.classList.remove('briefing-mode');
    }
  }, [briefingMode]);

  return (
    <nav className={`fixed top-0 left-0 w-full z-[150] transition-all duration-700 ${
      scrolled 
        ? 'bg-base-obsidian/95 backdrop-blur-xl border-b border-white/5 py-4' 
        : 'bg-transparent py-6 lg:py-10'
    }`}>
      <div className="container flex justify-between items-center relative">
        <div className="flex items-center gap-6 lg:gap-12">
          <Link href="/" className="group cursor-pointer flex items-center gap-4">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="relative"
            >
              <div className="flex flex-col">
                <Display as="h1" className="text-xl lg:text-2xl tracking-tighter text-secondary-parchment group-hover:text-jade transition-colors duration-500">
                  A<span className="text-secondary-parchment italic opacity-40">A</span>
                </Display>
              </div>
            </motion.div>
          </Link>
        </div>

        <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center gap-12">
          {['Home', 'About', 'Services', 'Contact'].map((item, i) => (
            <motion.a
              key={item}
              href={`#${item.toLowerCase()}`}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="sculptural-label text-secondary-parchment/40 hover:text-jade transition-colors uppercase tracking-[0.3em] text-[0.75rem] relative group/nav"
            >
              {item}
              <motion.div 
                 className="absolute -bottom-1 left-0 w-0 h-px bg-jade transition-all group-hover/nav:w-full"
              />
            </motion.a>
          ))}
        </div>

        <div className="flex items-center gap-4 lg:gap-6">
          <motion.a
            href="#contact"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`px-6 py-2 bg-jade text-base-obsidian font-semibold text-[0.75rem] uppercase tracking-[0.2em] transition-all hidden lg:flex items-center justify-center hover:bg-gold hover:text-base-obsidian ${
              scrolled ? 'py-1.5' : ''
            }`}
          >
            Schedule Advisory Call
          </motion.a>

          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setBriefingMode(!briefingMode)}
            aria-label={briefingMode ? "Mode: High-Contrast" : "Mode: Default"}
            className={`hidden sm:flex w-8 h-8 liquid-glass items-center justify-center border-jade/20 rounded-full hover:border-jade transition-all ${
              briefingMode ? 'bg-jade/20 border-jade' : ''
            } ${scrolled ? 'scale-90 origin-right' : ''}`}
          >
            <div className={`w-1.5 h-1.5 rounded-full ${briefingMode ? 'bg-jade animate-pulse' : 'bg-jade/30'}`} />
          </motion.button>
          
          <button 
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-secondary-parchment p-2 focus:outline-none z-50" 
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            <div className="relative w-6 h-5">
              <motion.span 
                animate={menuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
                className="absolute top-0 left-0 w-full h-[1px] bg-secondary-parchment origin-center"
              />
              <motion.span 
                animate={menuOpen ? { opacity: 0, x: 10 } : { opacity: 1, x: 0 }}
                className="absolute top-1/2 -translate-y-1/2 left-0 w-full h-[1px] bg-secondary-parchment"
              />
              <motion.span 
                animate={menuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
                className="absolute bottom-0 left-0 w-full h-[1px] bg-secondary-parchment origin-center"
              />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, clipPath: 'circle(0% at top right)' }}
            animate={{ opacity: 1, clipPath: 'circle(150% at top right)' }}
            exit={{ opacity: 0, clipPath: 'circle(0% at top right)' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 bg-base-obsidian z-40 flex flex-col justify-center items-center"
          >
            <div className="flex flex-col items-center gap-8">
              {['Home', 'About', 'Services', 'Contact'].map((item, i) => (
                <motion.a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  onClick={() => setMenuOpen(false)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + (i * 0.1) }}
                  className="display italic text-4xl text-secondary-parchment hover:text-jade transition-colors"
                >
                  {item}
                </motion.a>
              ))}
              
            </div>

            {/* Background Texture for Menu */}
            <div className="absolute inset-0 opacity-5 pointer-events-none">
              <div className="grid-line-v left-[10%]" />
              <div className="grid-line-v left-[90%]" />
              <div className="grid-line-h top-[20%]" />
              <div className="grid-line-h top-[80%]" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
