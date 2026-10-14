import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  className = '',
  ...props
}) => {
  const base = "inline-flex items-center justify-center font-bold rounded-xl transition-all min-h-[48px] px-5 py-2.5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer select-none";
  
  const variants = {
    primary: "bg-amber-400 hover:bg-amber-300 text-slate-950 shadow-lg shadow-amber-400/20 active:scale-98",
    secondary: "bg-slate-800 hover:bg-slate-700 text-slate-100 border border-slate-700 active:scale-98",
    danger: "bg-rose-600 hover:bg-rose-500 text-white shadow-lg shadow-rose-600/20 active:scale-98",
    ghost: "bg-transparent hover:bg-slate-800/60 text-slate-300 hover:text-white"
  };

  const sizes = {
    sm: "text-xs min-h-[40px] px-3.5 py-1.5",
    md: "text-sm min-h-[48px] px-5 py-2.5",
    lg: "text-base min-h-[56px] px-7 py-3.5"
  };

  return (
    <button
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {icon && <span className="mr-2 inline-flex items-center">{icon}</span>}
      <span>{children}</span>
    </button>
  );
};
