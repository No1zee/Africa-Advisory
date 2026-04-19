"use client";

import React from 'react';

const STRIP_ITEMS = [
  { label: 'Structured Capital', value: '$4.2B+' },
  { label: 'Active Mandates', value: '7' },
  { label: 'Focus Region', value: 'SADC & ECOWAS' },
  { label: 'Regulatory Scope', value: 'Cross-Border' },
  { label: 'Key Sectors', value: 'Infrastructure · Tech · Energy' },
  { label: 'Advisory Experience', value: '40 Years' },
];

export const CredentialStrip = () => {
  return (
    <div className="credential-strip w-full">
      <div className="container">
        <div className="flex items-center gap-0 divide-x divide-white/[0.06] overflow-x-auto scrollbar-none">
          {STRIP_ITEMS.map((item, i) => (
            <div key={i} className="flex flex-col items-center px-6 py-2 shrink-0 min-w-fit">
              <span className="credential-strip-item">{item.label}</span>
              <span className="credential-strip-value">{item.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
