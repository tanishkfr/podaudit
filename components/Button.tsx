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
  // Tactile Physics: Hard shadow that disappears on press (translate)
  const baseStyles = "font-black rounded-full transition-all duration-150 flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100 disabled:shadow-none uppercase tracking-wide border-2 border-[#1A1A1A]";
  
  const variants = {
    primary: "bg-[#1A1A1A] text-white shadow-[4px_4px_0px_rgba(0,0,0,0.3)] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_rgba(0,0,0,0.3)] active:translate-y-[2px] active:translate-x-[2px] active:shadow-none", 
    secondary: "bg-[#7BC65C] text-[#1A1A1A] shadow-[4px_4px_0px_#1A1A1A] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_#1A1A1A] active:translate-y-[2px] active:translate-x-[2px] active:shadow-none",
    danger: "bg-[#F0543C] text-white shadow-[4px_4px_0px_#1A1A1A] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_#1A1A1A] active:translate-y-[2px] active:translate-x-[2px] active:shadow-none",
    neutral: "bg-white text-[#1A1A1A] shadow-[4px_4px_0px_#1A1A1A] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_#1A1A1A] active:translate-y-[2px] active:translate-x-[2px] active:shadow-none",
    ghost: "bg-transparent border-transparent hover:bg-black/5 text-[#1A1A1A] shadow-none active:scale-95"
  };

  const sizes = {
    sm: "px-4 py-1.5 text-xs",
    md: "px-6 py-3 text-sm",
    lg: "px-10 py-4 text-lg"
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