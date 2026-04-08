"use client";

import { useEffect, useRef } from 'react';

export const useReveal = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            
            // Get index relative to siblings with same reveal class
            const parent = el.parentElement;
            if (parent) {
              const reveals = Array.from(parent.querySelectorAll('.reveal, .mask-reveal, .blur-reveal'));
              const index = reveals.indexOf(el);
              if (index !== -1) {
                el.style.transitionDelay = `${index * 0.15}s`;
              }
            }

            el.classList.add('visible');
            el.classList.add('focus-in');
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -50px 0px' }
    );

    const elements = document.querySelectorAll('.reveal, .mask-reveal, .blur-reveal');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return ref;
};
