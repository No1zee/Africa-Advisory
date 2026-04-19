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
            
            const index = parseInt(el.dataset.revealIndex || '0', 10);
            el.style.transitionDelay = `${index * 0.15}s`;

            el.classList.add('visible');
            el.classList.add('focus-in');
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -50px 0px' }
    );

    const elements = document.querySelectorAll<HTMLElement>('.reveal, .mask-reveal, .blur-reveal');
    const parentMap = new Map<HTMLElement, HTMLElement[]>();
    
    // Efficiently batch queries to avoid O(N^2) layout thrashing
    elements.forEach((el) => {
      const parent = el.parentElement;
      if (!parent) return;

      if (!parentMap.has(parent)) {
        parentMap.set(
          parent, 
          Array.from(parent.querySelectorAll<HTMLElement>('.reveal, .mask-reveal, .blur-reveal'))
        );
      }
      
      const siblings = parentMap.get(parent)!;
      const index = siblings.indexOf(el);
      el.dataset.revealIndex = index.toString();
      observer.observe(el);
    });

    return () => {
      observer.disconnect();
      parentMap.clear();
    };
  }, []);

  return ref;
};
