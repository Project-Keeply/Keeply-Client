import { type ReactNode } from 'react';
import { ROUTE_PATH } from '@shared/router/path';
import { useNavigate } from 'react-router';

import { IcLeftArrow } from '../icons/svgs';

interface CommonHeaderProps {
  title?: string;
  showBack?: boolean;
  onBack?: () => void;
  leftSlot?: ReactNode;
  rightSlot?: ReactNode;
  showDivider?: boolean;
  className?: string;
}

const CommonHeader = ({
  title,
  showBack,
  onBack,
  leftSlot,
  rightSlot,
  showDivider = true,
  className,
}: CommonHeaderProps) => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    if (onBack) {
      onBack();
      return;
    }
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate(ROUTE_PATH.HOME);
    }
  };

  return (
    <header
      className={`relative flex h-[50px] items-center justify-center ${className ?? ''}`}
    >
      {leftSlot ? (
        <div className="absolute left-[19px]">{leftSlot}</div>
      ) : (
        showBack && (
          <button
            type="button"
            className="absolute left-[19px]"
            onClick={handleBackClick}
          >
            <IcLeftArrow />
          </button>
        )
      )}
      {title && <h1 className="text-title2 font-semibold">{title}</h1>}
      {rightSlot && <div className="absolute right-[19px]">{rightSlot}</div>}
      {showDivider && (
        <div className="absolute bottom-0 left-5 right-5 h-px bg-gray-100" />
      )}
    </header>
  );
};

export default CommonHeader;
