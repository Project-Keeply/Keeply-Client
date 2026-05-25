import type { ReactNode } from 'react';

import { IcCheck, IcFillCheck } from '../icons/svgs';

interface CheckButtonProps {
  children: ReactNode;
  isChecked?: boolean;
  size?: 'sm' | 'lg';
  onClick: () => void;
  hasBackground?: boolean;
}

const CheckButton = ({ children, isChecked = false, size = 'lg', onClick, hasBackground = false }: CheckButtonProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full px-4.5 flex items-center justify-between rounded-[10px] transition-colors 
        ${!hasBackground ? 'bg-white' : isChecked ? 'bg-primary-200' : 'bg-gray-100'} ${size === 'sm' ? 'py-5' : 'py-8'}`}
    >
      <span
        className={
          size === 'sm' ? 'text-body4 font-semibold' : 'text-title1 font-semibold'
        }
      >
        {children}
      </span>
      {isChecked ? <IcFillCheck /> : <IcCheck />}
    </button>
  );
}

export default CheckButton

