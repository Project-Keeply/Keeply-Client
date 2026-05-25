import { type ReactNode } from 'react';
import { ROUTE_PATH } from '@shared/router/path';
import { useNavigate } from 'react-router';

import { IcLeftArrow } from '../icons/svgs';

interface CommonHeaderProps {
  title: string;
  showBack?: boolean;
  onBack?: () => void;
  rightSlot?: ReactNode;
}

const CommonHeader = ({ title, showBack, onBack, rightSlot }: CommonHeaderProps) => {
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
    <header className="relative flex h-[56px] items-center justify-center">
      {showBack && (
        <button
          type="button"
          className="absolute left-[19px]"
          onClick={handleBackClick}
        >
          <IcLeftArrow />
        </button>
      )}
      <h1 className="text-title2 font-semibold">{title}</h1>
      {rightSlot && (
        <div className="absolute right-[19px]">{rightSlot}</div>
      )}
    </header>
  );
};

export default CommonHeader;
