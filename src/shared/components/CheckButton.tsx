import type { ButtonHTMLAttributes, ReactNode } from 'react';

import { IcCheck, IcFillCheck } from '../icons/svgs';

interface CheckButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  isChecked?: boolean;
  size?: 'sm' | 'lg';
  hasBackground?: boolean;
}

const CheckButton = ({
  children,
  isChecked = false,
  size = 'lg',
  hasBackground = false,
  ...rest
}: CheckButtonProps) => {
  return (
    <button
      type="button"
      {...rest}
      className={
        `w-full px-4.5 flex items-center justify-between rounded-[10px] transition-colors 
        ${!hasBackground ? 'bg-white' : isChecked ? 'bg-primary-200' : 'bg-gray-100'} 
        ${size === 'sm' ? 'py-5' : 'py-8'}`
      }
    >
      <span
        className={
          size === 'sm'
            ? 'text-body4 font-semibold'
            : 'text-title1 font-semibold'
        }
      >
        {children}
      </span>
      {isChecked ? <IcFillCheck /> : <IcCheck />}
    </button>
  );
};

export default CheckButton

