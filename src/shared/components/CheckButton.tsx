import type { ButtonHTMLAttributes, ReactNode } from 'react';

import { IcCheck, IcFillCheck } from '../icons/svgs';

interface CheckButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  isChecked?: boolean;
  size?: 'sm' | 'lg';
  hasBackground?: boolean;
  onCheckClick?: () => void;
}

const CheckButton = ({
  children,
  isChecked = false,
  size = 'lg',
  hasBackground = false,
  onCheckClick,
  ...rest
}: CheckButtonProps) => {
  const containerClassName = `w-full px-4.5 flex items-center justify-between rounded-[10px] transition-colors
    ${!hasBackground ? 'bg-white' : isChecked ? 'bg-primary-200' : 'bg-gray-100'}
    ${size === 'sm' ? 'py-5' : 'py-8'}`;

  const textClassName =
    size === 'sm' ? 'text-body4 font-semibold' : 'text-title1 font-semibold';

  if (onCheckClick) {
    return (
      <div className={containerClassName}>
        <button
          type="button"
          onClick={rest.onClick}
          className="flex-1 text-left cursor-pointer"
        >
          <span className={textClassName}>{children}</span>
        </button>
        <button
          type="button"
          onClick={onCheckClick}
          aria-label="처리 완료"
          className="cursor-pointer"
        >
          {isChecked ? <IcFillCheck /> : <IcCheck />}
        </button>
      </div>
    );
  }

  return (
    <button type="button" {...rest} className={containerClassName}>
      <span className={textClassName}>{children}</span>
      {isChecked ? <IcFillCheck /> : <IcCheck />}
    </button>
  );
};

export default CheckButton;
