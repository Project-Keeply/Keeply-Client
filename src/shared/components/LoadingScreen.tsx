import loading1 from '@shared/assets/images/loading/loading-1.png';
import loading2 from '@shared/assets/images/loading/loading-2.png';
import loading3 from '@shared/assets/images/loading/loading-3.png';
import loading4 from '@shared/assets/images/loading/loading-4.png';

const LOADING_ICONS = [loading1, loading2, loading3, loading4];

const LoadingScreen = () => {
  return (
    <div className="flex h-dvh w-full items-center justify-center gap-8 bg-white">
      {LOADING_ICONS.map((icon, index) => (
        <img
          key={icon}
          src={icon}
          alt=""
          className="animate-loading-bounce w-[40px]"
          style={{ animationDelay: `${index * 0.2}s` }}
        />
      ))}
    </div>
  );
};

export default LoadingScreen;
