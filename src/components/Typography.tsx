import React from 'react';

interface TypographyProps {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
}

export const Display: React.FC<TypographyProps> = ({ 
  children, 
  className = '', 
  as: Component = 'h1' 
}) => {
  return (
    <Component className={`font-display font-normal tracking-[-0.03em] leading-[0.9] ${className}`}>
      {children}
    </Component>
  );
};

export const Sovereign: React.FC<TypographyProps> = ({ 
  children, 
  className = '', 
  as: Component = 'h2' 
}) => {
  return (
    <Component className={`font-display font-normal uppercase tracking-[0.4em] text-[0.9rem] md:text-[1rem] text-jade/80 ${className}`}>
      {children}
    </Component>
  );
};

export const Body: React.FC<TypographyProps> = ({ 
  children, 
  className = '', 
  as: Component = 'p' 
}) => {
  return (
    <Component className={`font-body font-light leading-relaxed text-foreground/80 ${className}`}>
      {children}
    </Component>
  );
};

export const Label: React.FC<TypographyProps> = ({ 
  children, 
  className = '', 
  as: Component = 'span' 
}) => {
  return (
    <Component className={`font-body text-[0.75rem] md:text-[0.85rem] tracking-[0.3em] uppercase opacity-70 ${className}`}>
      {children}
    </Component>
  );
};

export const Tabular: React.FC<TypographyProps> = ({ 
  children, 
  className = '', 
  as: Component = 'span' 
}) => {
  return (
    <Component className={`font-body font-normal tabular-nums tracking-widest ${className}`}>
      {children}
    </Component>
  );
};
