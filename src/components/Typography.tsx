import React from 'react';

interface TypographyProps {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
  htmlFor?: string;
}

export const Display: React.FC<TypographyProps> = ({ 
  children, 
  className = '', 
  as: Component = 'h1' 
}) => {
  return (
    <Component className={`font-display text-white transition-colors duration-500 ${className}`}>
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
    <Component className={`font-display font-semibold transition-colors duration-500 ${className}`}>
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
    <Component className={`font-body font-normal leading-relaxed text-[#8A8A8A] ${className}`}>
      {children}
    </Component>
  );
};

export const Label: React.FC<TypographyProps> = ({ 
  children, 
  className = '', 
  as: Component = 'span',
  htmlFor
}) => {
  const FinalComponent = htmlFor ? 'label' : Component;
  return (
    <FinalComponent 
      htmlFor={htmlFor}
      className={`section-label ${className}`}
    >
      {children}
    </FinalComponent>
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
