import { IcLeftArrow } from '../icons/svgs';

interface CommonHeaderProps {
  title: string;
  showBack?: boolean;
}

const navigateBack = () => {
  window.history.back();
}

const CommonHeader = ({ title, showBack }: CommonHeaderProps) => {
  return (
    <header className="relative flex h-[56px] items-center justify-center">
      {showBack && (
        <button 
          type="button"
          className="left-4.75 absolute" onClick={navigateBack}>
          <IcLeftArrow />
        </button>
      )}
      <h1 className="text-title2 font-semibold">{title}</h1>
    </header>
  );
};

export default CommonHeader
