"use client";

import React from 'react';
import { motion } from 'framer-motion';

export const ArchitecturalGrid = () => {
  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Vertical Lines */}
      <div className="grid-line-v-jade left-[5%]" />
      <motion.div 
        className="grid-line-v left-[25%]" 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, delay: 0.5 }}
      />
      <div className="grid-line-v left-[50%]" />
      <motion.div 
        className="grid-line-v-jade left-[75%]" 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, delay: 0.7 }}
      />
      <div className="grid-line-v left-[95%]" />

      {/* Horizontal Lines */}
      <div className="grid-line-h-jade top-[10%]" />
      <motion.div 
        className="grid-line-h-jade top-[40%]" 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, delay: 0.6 }}
      />
      <div className="grid-line-h top-[70%]" />
      
      {/* Strategic Glow */}
      <motion.div 
        className="absolute strategic-glow w-[600px] h-[600px] top-[20%] left-[40%]"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
      />
    </div>
  );
};
