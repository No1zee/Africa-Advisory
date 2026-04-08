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
    <Component className={`font-display font-normal tracking-tight ${className}`}>
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
    <Component className={`font-body font-light leading-relaxed ${className}`}>
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
    <Component className={`font-body text-[0.65rem] tracking-[0.3em] uppercase opacity-60 ${className}`}>
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
    <Component className={`font-body font-normal tabular-nums ${className}`}>
      {children}
    </Component>
  );
};
