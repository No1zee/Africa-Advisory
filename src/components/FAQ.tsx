"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
import { Display, Body, Label, Tabular } from './Typography';
import { TRANSITIONS, VARIANTS } from './Motion';

const faqs = [
  {
    category: "STRATEGIC LOGIC",
    q: "Why prioritize Africa Advisory over global institutional firms?",
    a: "Global bulge-bracket firms often operate on purely transactional models. We focus on geographic precision and local connectivity. Our value lies in navigating the specific geopolitical nuances of African markets—depth that centralized global models frequently overlook."
  },
  {
    category: "MANDATE CONTINUITY",
    q: "What is the typical engagement horizon for a strategic mandate?",
    a: "We build for permanence, not speed. A typical structural financing or debt resolution mandate follows a 12 to 24-month horizon. This allows for rigorous risk mitigation and ensures the resulting financial architecture is workable for the next decade."
  },
  {
    category: "SOVEREIGN DATA",
    q: "How is technical sovereignty and data ownership handled?",
    a: "Our commitment to client autonomy is absolute. Upon mandate resolution, all strategic intelligence, financial models, and IP are transferred entirely to the client. We do not believe in ongoing licensing fees or institutional data-locking."
  },
  {
    category: "RISK MITIGATION",
    q: "How do you navigate cross-border liquidity and settlement risks?",
    a: "We leverage established, long-standing relationships with regional central banks and verified trade corridors. By aligning with local regulatory frameworks rather than bypassing them, we secure reliable liquidity paths for even the most complex mandates."
  }
];

export const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i);

  return (
    <section id="faq" className="section bg-base-obsidian border-t border-white/5 relative overflow-hidden">
      {/* Background architectural grid line */}
      <div className="absolute left-[30%] top-0 bottom-0 w-px bg-white/[0.03] pointer-events-none" />
      
      <div className="container relative z-10 text-secondary-parchment">
        <motion.div 
          variants={VARIANTS.STAGGER_CONTAINER}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="editorial-grid mb-24"
        >
          <div className="col-span-12 md:col-span-6">
            <motion.div variants={VARIANTS.RISE_REVEAL}>
              <Label className="text-brand-teal mb-8 uppercase tracking-[0.2em] font-semibold italic">Intelligence Briefing</Label>
            </motion.div>
            <motion.div variants={VARIANTS.RISE_REVEAL} transition={{ delay: 0.2 }}>
              <Display as="h2" className="text-secondary-parchment">
                Strategic <br />
                <span className="italic opacity-60">Clarification.</span>
              </Display>
            </motion.div>
          </div>
          <div className="col-span-12 md:col-start-8 md:col-span-5 flex items-end">
            <motion.div variants={VARIANTS.RISE_REVEAL} transition={{ delay: 0.4 }}>
              <Body className="text-secondary-parchment opacity-80">
                Direct answers to the critical queries shaping large-scale African mandates. We value clarity over complexity.
              </Body>
            </motion.div>
          </div>
        </motion.div>

        {/* Accordion Column */}
        <div className="max-w-4xl mx-auto space-y-6">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, ...TRANSITIONS.RESTRAINED }}
              className={`group border-b border-white/5 pb-6 transition-all duration-700 ${
                openIndex === i ? 'border-brand-teal/20' : ''
              }`}
            >
              <button
                onClick={() => toggle(i)}
                className="w-full flex items-start justify-between text-left group-hover:pl-4 transition-all duration-500 ease-exquisite"
              >
                <div className="flex flex-col gap-4">
                  <Tabular className="text-[0.6rem] text-brand-teal font-bold uppercase tracking-[0.3em]">
                    // {faq.category}
                  </Tabular>
                  <Display 
                    as="h3" 
                    className={`text-2xl transition-colors duration-500 ${
                      openIndex === i ? 'text-brand-teal' : 'text-secondary-parchment group-hover:text-brand-teal/70'
                    }`}
                  >
                    {faq.q}
                  </Display>
                </div>
                
                <div className={`mt-10 p-2 rounded-full border transition-all duration-700 ${
                  openIndex === i 
                    ? 'border-brand-teal bg-brand-teal text-white rotate-180' 
                    : 'border-white/10 text-white/40 group-hover:border-brand-teal/40 group-hover:text-brand-teal'
                }`}>
                  {openIndex === i ? <Minus size={14} /> : <Plus size={14} />}
                </div>
              </button>

              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={TRANSITIONS.RESTRAINED}
                    className="overflow-hidden"
                  >
                    <div className="pt-8 pb-4 pl-4 border-l border-brand-teal/20 ml-1">
                      <Body className="text-secondary-parchment leading-relaxed max-w-2xl opacity-90">
                        {faq.a}
                      </Body>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Footer Link */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-24 text-center"
        >
          <div className="w-px h-12 bg-black/10 mx-auto mb-8" />
          <Label className="opacity-50 tracking-[0.4em]">Further inquiries? </Label>
          <a href="#contact" className="text-brand-teal font-medium hover:underline underline-offset-8 transition-all tracking-widest uppercase text-[0.7rem] ml-2">
            Secure Communications →
          </a>
        </motion.div>
      </div>
    </section>
  );
};
