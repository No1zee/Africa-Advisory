"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Display } from './Typography';

export const Navigator = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [briefingMode, setBriefingMode] = useState(false);
  const [isLight, setIsLight] = useState(false);

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

  useEffect(() => {
    // Dynamic Inversion Logic
    const observer = new IntersectionObserver(
      (entries) => {
        const isIntersecting = entries.some(entry => entry.isIntersecting);
        setIsLight(isIntersecting);
      },
      {
        rootMargin: '-10% 0% -90% 0%', // Only track the top of the viewport
        threshold: 0
      }
    );

    const lightSections = document.querySelectorAll('[data-nav-light="true"]');
    lightSections.forEach(section => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  const navClasses = scrolled 
    ? isLight 
      ? 'bg-secondary-parchment/70 backdrop-blur-2xl border-b border-black/5 py-4 shadow-[0_4px_30px_rgba(0,0,0,0.03)]' 
      : 'bg-base-obsidian/70 backdrop-blur-2xl border-b border-white/5 py-4 shadow-[0_4px_30px_rgba(0,0,0,0.2)]' 
    : 'bg-transparent py-6 lg:py-10';

  return (
    <nav className={`fixed top-0 left-0 w-full z-[150] transition-all duration-700 safe-pt-nav ${navClasses}`}>
      <div className="container flex justify-between items-center relative">
        <div className="flex items-center">
          <Link href="/" className="group cursor-pointer flex flex-col items-center gap-1">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="relative flex items-start"
            >
              <span className={`font-display text-4xl lg:text-5xl leading-none ${isLight ? 'text-base-obsidian' : 'text-white'}`}>A</span>
              <span className={`font-body text-xs lg:text-sm font-bold leading-none mt-1 ml-0.5 ${isLight ? 'text-base-obsidian/60' : 'text-[#00B4A6]'}`}>4</span>
            </motion.div>
            <motion.span 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              className={`text-[0.45rem] tracking-[0.4em] uppercase font-bold whitespace-nowrap ${isLight ? 'text-base-obsidian' : 'text-white'}`}
            >
              Africa Advisory
            </motion.span>
          </Link>
        </div>

        <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center gap-6 lg:gap-8">
          {[
            { name: 'Home', href: '#home' },
            { name: 'Mandates', href: '#mandates' },
            { name: 'Services', href: '#services' },
            { name: 'Network', href: '#network' },
            { name: 'Intelligence', href: '#intelligence' },
            { name: 'Leadership', href: '#leadership' },
            { name: 'Contact', href: '#contact' }
          ].map((item, i) => (
            <motion.a
              key={item.name}
              href={item.href}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className={`section-label opacity-60 hover:opacity-100 transition-opacity relative group/nav text-[0.62rem] ${
                isLight ? 'text-base-obsidian' : 'text-secondary-parchment'
              }`}
            >
              {item.name}
            </motion.a>
          ))}
        </div>

        <div className="flex items-center gap-6">
          <motion.a
            href="#contact"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="px-6 py-3 font-semibold text-[0.65rem] uppercase tracking-[0.2em] transition-colors duration-200 hidden md:flex items-center justify-center ml-8 bg-[#00B4A6] text-white hover:bg-[#00D1C1]"
          >
            Schedule Advisory Call
          </motion.a>

          {/* Hamburger Menu Icon - Visible below 768px */}
          <button 
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden flex flex-col justify-center items-center gap-1.5 w-8 h-8 focus:outline-none z-[200]" 
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            <motion.span 
              animate={menuOpen ? { rotate: 45, y: 7.5 } : { rotate: 0, y: 0 }}
              className={`w-6 h-[2px] ${isLight && !menuOpen ? 'bg-base-obsidian' : 'bg-white'} transition-all`}
            />
            <motion.span 
              animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
              className={`w-6 h-[2px] ${isLight && !menuOpen ? 'bg-base-obsidian' : 'bg-white'} transition-all`}
            />
            <motion.span 
              animate={menuOpen ? { rotate: -45, y: -7.5 } : { rotate: 0, y: 0 }}
              className={`w-6 h-[2px] ${isLight && !menuOpen ? 'bg-base-obsidian' : 'bg-white'} transition-all`}
            />
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay - Institutional Slide Down */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: '-100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '-100%' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 bg-base-obsidian z-[180] flex flex-col p-8 pt-32"
          >
            <div className="flex flex-col gap-8">
              {[
                { name: 'Home', href: '#home' },
                { name: 'Mandates', href: '#mandates' },
                { name: 'Services', href: '#services' },
                { name: 'Network', href: '#network' },
                { name: 'Intelligence', href: '#intelligence' },
                { name: 'Leadership', href: '#leadership' },
                { name: 'Contact', href: '#contact' }
              ].map((item, i) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + (i * 0.05) }}
                  className="font-display text-4xl text-white/50 hover:text-[#00B4A6] transition-colors"
                >
                  {item.name}
                </motion.a>
              ))}
              
              <motion.a
                href="#contact"
                onClick={() => setMenuOpen(false)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mt-8 px-6 py-5 bg-[#00B4A6] text-white text-center font-bold uppercase tracking-[0.2em] w-full"
              >
                Schedule Advisory Call
              </motion.a>
            </div>

            <div className="mt-auto pt-12 border-t border-white/5">
               <span className="text-[0.6rem] tracking-[0.3em] uppercase opacity-30 text-white">Institutional Advisory · Since 1984</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
