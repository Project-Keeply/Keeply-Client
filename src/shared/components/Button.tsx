import type { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant: 'primary' | 'red' | 'secondary';
  children: ReactNode;
}

const variantStyles = {
  primary: 'bg-primary-500 text-white hover:bg-primary-600 cursor-pointer ',
  secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300 cursor-pointer ',
  disabled: 'bg-gray-200 text-white',
  red: 'bg-red-500 text-white hover:bg-red-600 cursor-pointer ',
};

const Button = ({ variant, children, className, ...rest }: ButtonProps) => {
  return (
    <button
      type="button"
      disabled={rest.disabled}
      className={`py-4.5 rounded-[10px] text-button1 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 ${rest.disabled ? variantStyles.disabled : variantStyles[variant]} ${className ?? ''}`}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
