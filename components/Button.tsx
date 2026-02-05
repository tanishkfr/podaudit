import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'neutral' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  icon,
  ...props 
}) => {
  const baseStyles = "font-bold rounded-full transition-all duration-300 flex items-center justify-center gap-2 transform hover:-translate-y-1 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0";
  
  const variants = {
    primary: "bg-[#1A1A1A] text-white shadow-xl hover:bg-black border border-transparent", // Deep Charcoal
    secondary: "bg-[#7BC65C] text-[#1A1A1A] shadow-lg hover:bg-[#6ab34e]", // Leaf Green
    danger: "bg-[#F0543C] text-white shadow-lg hover:bg-[#d6452f]", // Tomato Red
    neutral: "bg-white text-[#1A1A1A] border-2 border-[#eee] hover:border-[#1A1A1A]",
    ghost: "bg-transparent hover:bg-black/5 text-[#1A1A1A]"
  };

  const sizes = {
    sm: "px-5 py-2 text-sm",
    md: "px-8 py-3 text-base",
    lg: "px-12 py-5 text-xl tracking-tight"
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {icon && <span className="inline-block">{icon}</span>}
      {children}
    </button>
  );
};