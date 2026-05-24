import type { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant: 'primary' | 'gray' | 'red';
  children: ReactNode;
}

const variantStyles = {
  primary: 'bg-primary-500 text-white hover:bg-primary-600',
  gray: 'bg-gray-200 text-white hover:bg-gray-300',
  red: 'bg-red-500 text-white hover:bg-red-600',
};

const Button = ({ variant, children, className, ...rest }: ButtonProps) => {
  return (
    <button
      type="button"
      className={`w-full py-4.5 rounded-[10px] text-button1 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 ${variantStyles[variant]} ${className ?? ''}`}
      {...rest}
    >
      {children}
    </button>
  );
}

export default Button
