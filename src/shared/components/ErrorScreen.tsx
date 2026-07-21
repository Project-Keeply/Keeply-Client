import errorCharacter from '@shared/assets/images/error/error_character.png';

import Button from './Button';

const ErrorScreen = () => {
  const handleRetryClick = () => {
    window.location.reload();
  };

  return (
    <div className="flex h-dvh w-full flex-col items-center justify-center gap-6 bg-white px-6">
      <img src={errorCharacter} alt="" className="w-[130px]" />
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-title1 font-bold text-gray-800 pb-2">
          문제가 발생했어요
        </h1>
        <p className="text-body1 text-gray-300">
          불편을 끼쳐드려서 죄송합니다.
        </p>
      </div>
      <Button
        variant="primary"
        className="w-[100px]"
        onClick={handleRetryClick}
      >
        다시 시도
      </Button>
    </div>
  );
};

export default ErrorScreen;
