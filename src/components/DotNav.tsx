"use client";

import React, { useState, useEffect } from 'react';

const NAV_SECTIONS = [
  { id: 'mandates', label: 'Mandates' },
  { id: 'services', label: 'Services' },
  { id: 'network', label: 'Network' },
  { id: 'intelligence', label: 'Intelligence' },
  { id: 'about', label: 'Leadership' },
  { id: 'contact', label: 'Contact' },
];

export const DotNav = () => {
  const [activeSection, setActiveSection] = useState<string>('');
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show dot nav after hero
      setVisible(window.scrollY > window.innerHeight * 0.5);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-40% 0% -55% 0%',
        threshold: 0,
      }
    );

    NAV_SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleClick = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div
      className={`dot-nav transition-opacity duration-700 hidden lg:flex ${visible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      aria-label="Section navigation"
      role="navigation"
    >
      {NAV_SECTIONS.map(({ id, label }) => (
        <button
          key={id}
          onClick={() => handleClick(id)}
          className={`dot-nav-item ${activeSection === id ? 'active' : ''}`}
          aria-label={`Navigate to ${label}`}
          title={label}
        >
          <span className="dot-nav-label">{label}</span>
          <span className="dot-nav-dot" />
        </button>
      ))}
    </div>
  );
};
