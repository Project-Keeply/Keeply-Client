import { ROUTE_PATH } from '@shared/router/path';
import { useNavigate } from 'react-router';

import Button from './Button';

import expiryIllustration from '@/shared/assets/images/expiry-illustration.png';

const ManagementGuideButton = () => {
  const navigate = useNavigate();

  const handleConfirmClick = () => {
    navigate(ROUTE_PATH.MANAGEMENT);
  };

  return (
    <div className="bg-white rounded-[10px] px-7 py-5 flex flex-col gap-6">
      <div className="flex items-center gap-4">
        <img
          src={expiryIllustration}
          alt="유통기한 임박 안내"
          className="w-24 h-24 object-contain"
        />
        <div className="flex flex-col gap-3">
          <div className="flex items-start gap-1">
            <span className="text-caption1 font-semibold text-gray-300">유통기한 임박 상품</span>
            <span className="inline-block shrink-0 w-1.5 h-1.5 rounded-full bg-red-500" />
          </div>
          <p className="text-title2 font-bold">
            <span className="text-primary-500">폐기상품</span>을 확인해보세요
          </p>
        </div>
      </div>
      <Button variant="primary" onClick={handleConfirmClick}>
        상품 확인하기
      </Button>
    </div>
  );
};

export default ManagementGuideButton;
