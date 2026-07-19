import { type ReactNode } from 'react';
import { ROUTE_PATH } from '@shared/router/path';
import { useNavigate } from 'react-router';

import { IcLeftArrow } from '../icons/svgs';

interface CommonHeaderProps {
  title?: string;
  showBack?: boolean;
  onBack?: () => void;
  /** 지정 시 showBack/onBack보다 우선하며, 좌측 영역을 이 노드로 대체한다. */
  leftSlot?: ReactNode;
  rightSlot?: ReactNode;
  showDivider?: boolean;
  /** true면 스크롤 시 헤더를 상단에 고정한다(불투명 배경 포함). */
  isSticky?: boolean;
  className?: string;
}

const CommonHeader = ({
  title,
  showBack,
  onBack,
  leftSlot,
  rightSlot,
  showDivider = true,
  isSticky = false,
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
      className={`relative flex h-[50px] shrink-0 items-center justify-center ${isSticky ? 'sticky top-0 z-10 bg-white' : ''} ${className ?? ''}`}
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
