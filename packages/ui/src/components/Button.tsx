import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost' | 'contrast';
  size?: 'sm' | 'md' | 'lg' | 'xl';
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
  // WCAG 2.2 AAA Strict: Minimum tap target 56x56px for all primary interactions
  const base = "inline-flex items-center justify-center font-bold rounded-2xl transition-all min-h-[56px] min-w-[56px] px-6 py-3.5 focus:outline-none focus:ring-4 focus:ring-amber-400 focus:ring-offset-2 focus:ring-offset-slate-950 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer select-none text-base break-words text-center";
  
  const variants = {
    primary: "bg-amber-400 hover:bg-amber-300 text-slate-950 shadow-xl shadow-amber-400/25 active:scale-98 font-extrabold",
    secondary: "bg-slate-900 hover:bg-slate-800 text-slate-100 border-2 border-slate-700 active:scale-98",
    danger: "bg-rose-600 hover:bg-rose-500 text-white shadow-xl shadow-rose-600/25 active:scale-98",
    ghost: "bg-transparent hover:bg-slate-800 text-slate-200 hover:text-white border border-slate-800",
    contrast: "bg-white hover:bg-slate-100 text-black border-2 border-white shadow-2xl font-black"
  };

  const sizes = {
    sm: "text-sm min-h-[56px] px-5 py-3",
    md: "text-base min-h-[56px] px-6 py-3.5",
    lg: "text-lg min-h-[64px] px-8 py-4",
    xl: "text-xl min-h-[72px] px-10 py-5"
  };

  return (
    <button
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {icon && <span className="mr-3 inline-flex items-center flex-shrink-0">{icon}</span>}
      <span className="leading-tight">{children}</span>
    </button>
  );
};
