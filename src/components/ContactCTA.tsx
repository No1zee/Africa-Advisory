"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Display, Label, Body } from './Typography';

type FormState = 'idle' | 'sending' | 'sent' | 'error';

const CONTACT_DETAILS = [
  { label: 'Principal', value: 'Bruce Jewels' },
  { label: 'Jurisdiction', value: 'Johannesburg · London' },
  { label: 'Response Time', value: 'Within 2 business days' },
];

const TRUST_INDICATORS = [
  'Sovereign mandates welcomed',
  'Institutional confidentiality by default',
  'Non-disclosure frameworks available on request',
];

export const ContactCTA = () => {
  const [formState, setFormState] = useState<FormState>('idle');
  const [formData, setFormData] = useState({
    name: '',
    organisation: '',
    email: '',
    mandate: 'Project Finance',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState('sending');
    await new Promise(r => setTimeout(r, 1800));
    setFormState('sent');
  };

  return (
    <section id="contact" className="relative pt-16 lg:pt-20 pb-28 lg:pb-40 bg-[hsl(216_12%_8%)] overflow-hidden">
      {/* Subtle corner glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#00B4A6]/[0.04] rounded-full blur-[120px] pointer-events-none" />

      <div className="container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-11 gap-16 lg:gap-24">
          
          {/* ── Left: Copy + Contact Details ── */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 flex flex-col gap-10"
          >
            <div>
              <Display as="h2" className="text-white text-3xl md:text-5xl lg:text-5xl leading-tight mb-6 uppercase tracking-tight font-bold">
                ALL ENQUIRIES WELCOME REGARDING SOVEREIGN DEBT AND PROJECT FINANCE MANDATES.
              </Display>
              <Body className="text-[#8A8A8A] text-base leading-relaxed max-w-md">
                Our team responds to institutional enquiries within 48 business hours. 
                All communications are treated with strict confidentiality.
              </Body>
            </div>

            {/* Confidentiality Shield */}
            <div className="flex items-center gap-3 text-white/40">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="shrink-0 text-[#00B4A6]/60">
                <path d="M9 1.5L2.25 4.5V9C2.25 12.75 5.175 16.245 9 17.25C12.825 16.245 15.75 12.75 15.75 9V4.5L9 1.5Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"/>
                <path d="M6 9L8 11L12 7" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className="text-[0.58rem] uppercase tracking-[0.2em]">
                All enquiries treated with institutional confidentiality
              </span>
            </div>

            {/* HQ & Coverage details */}
            <div className="flex flex-col gap-10 border-l border-[#00B4A6]/20 pl-6 mt-4">
              {/* HQ */}
              <div>
                <span className="text-white/60 text-sm leading-relaxed max-w-[200px] block">
                  1st Floor, Block D, Melrose Arch, Johannesburg, 2196
                </span>
              </div>
              
              {/* Coverage */}
              <div>
                <span className="text-[0.65rem] uppercase tracking-[0.1em] text-white/50">
                  SADC · ECOWAS · EAC · GCC & Asia Corridors
                </span>
              </div>
            </div>

            {/* Direct Contact */}
            <div className="flex flex-col gap-3 pt-6 border-t border-white/5">
              <a href="mailto:bruce@africaadvisory.com" className="flex items-center gap-3 text-white/40 hover:text-[#00B4A6] transition-colors duration-300 group">
                <span className="text-[0.6rem] uppercase tracking-[0.2em]">Mandate Enquiries: bruce@africaadvisory.com</span>
              </a>
            </div>
          </motion.div>

          {/* ── Right: Form ── */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6"
          >
            {formState === 'sent' ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col items-start justify-center h-full gap-6 py-20 border border-[#00B4A6]/20 px-10 bg-white/[0.01]"
              >
                <div className="w-12 h-12 border border-[#00B4A6]/40 flex items-center justify-center">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M4 10L8 14L16 6" stroke="#00B4A6" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </div>
                <Display as="h3" className="text-white text-3xl">Mandate Submitted</Display>
                <Body className="text-white/55 max-w-sm leading-relaxed">
                  Confidential briefing received. A senior advisor will respond 
                  within 24-48 business hours to discuss the institutional alignment.
                </Body>
                <button onClick={() => setFormState('idle')} className="text-[#00B4A6] text-[0.6rem] uppercase tracking-[0.25em] mt-4 hover:opacity-70 transition-opacity">
                  ← Submit another enquiry
                </button>
              </motion.div>
            ) : (
              <div className="border border-white/10 p-8 lg:p-14 relative bg-white/[0.01]">
                {/* Corner accents */}
                <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-[#00B4A6]/60" />
                <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-[#00B4A6]/60" />
                <div className="absolute bottom-0 left-0 w-8 h-8 border-b border-l border-[#00B4A6]/60" />
                <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-[#00B4A6]/60" />

                <div className="mb-10">
                  <h3 className="font-display text-2xl text-white">Mandate Submission</h3>
                </div>

              <form onSubmit={handleSubmit} className="flex flex-col gap-8">
                {/* Name */}
                <div className="flex flex-col gap-3">
                  <label className="text-[0.48rem] tracking-[0.25em] text-white/35">Contact Name</label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Full Name and Title"
                    className="w-full bg-transparent border-b border-white/10 py-3 text-white text-sm focus:border-[#00B4A6]/60 outline-none transition-colors duration-300"
                  />
                </div>

                {/* Institution */}
                <div className="flex flex-col gap-3">
                  <label className="text-[0.48rem] tracking-[0.25em] text-white/35">Institution</label>
                  <input
                    type="text"
                    name="organisation"
                    required
                    value={formData.organisation}
                    onChange={handleChange}
                    placeholder="Ministry, DFI, or Corporate entity"
                    className="w-full bg-transparent border-b border-white/10 py-3 text-white text-sm focus:border-[#00B4A6]/60 outline-none transition-colors duration-300"
                  />
                </div>

                {/* Region of Interest */}
                <div className="flex flex-col gap-3">
                  <label htmlFor="mandate-region" className="text-[0.48rem] tracking-[0.25em] text-white/35">Region of Interest</label>
                  <select
                    id="mandate-region"
                    name="mandate"
                    value={formData.mandate}
                    onChange={handleChange}
                    className="w-full bg-transparent border-b border-white/10 py-3 text-white/80 text-sm focus:border-[#00B4A6]/60 outline-none transition-colors duration-300 appearance-none cursor-pointer"
                  >
                    <option value="" disabled>Select geographic sub-region</option>
                    <option className="bg-[#0A0C10] text-white">SADC (Southern Africa)</option>
                    <option className="bg-[#0A0C10] text-white">ECOWAS (West Africa)</option>
                    <option className="bg-[#0A0C10] text-white">EAC (East Africa)</option>
                    <option className="bg-[#0A0C10] text-white">International / Corridors</option>
                  </select>
                </div>

                {/* Message */}
                <div className="flex flex-col gap-3">
                  <label className="text-[0.48rem] tracking-[0.25em] text-white/35">Mandate Brief</label>
                  <textarea
                    name="message"
                    rows={5}
                    required
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Preliminary mandate description and estimated transaction value..."
                    className="w-full bg-transparent border-b border-white/10 py-3 text-white text-sm focus:border-[#00B4A6]/60 outline-none transition-colors duration-300 resize-none"
                  />
                </div>

                {/* Submit Button */}
                <div className="mt-4">
                  <button
                    type="submit"
                    disabled={formState === 'sending'}
                    className="w-full py-5 bg-[#00B4A6] text-white font-bold text-[0.65rem] uppercase tracking-[0.4em] hover:bg-[#00D1C1] transition-all duration-300 disabled:opacity-60"
                  >
                    {formState === 'sending' ? 'Sending Brief...' : 'SEND ENQUIRY'}
                  </button>
                  <p className="text-[11px] text-white/30 mt-6 text-center italic leading-relaxed">
                    All submissions are treated with strict professional confidentiality. An NDA is available on request.
                  </p>
                </div>
              </form>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
