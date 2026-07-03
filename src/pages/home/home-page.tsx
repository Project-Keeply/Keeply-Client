import { CommonHeader } from '@shared/components';
import { ROUTE_PATH } from '@shared/router/path';
import { useNavigate } from 'react-router';

import BannerCarousel from './ui/banner-carousel';

import type { Announcement } from '@/entities/announcement';
import { AnnouncementItemList } from '@/entities/announcement';
import banner1 from '@/shared/assets/images/banners/banner-1.svg';
import banner2 from '@/shared/assets/images/banners/banner-2.svg';
import banner3 from '@/shared/assets/images/banners/banner-3.svg';
import ManagementGuideButton from '@/shared/components/ManagementGuideButton';
import { IcLogo } from '@/shared/icons';

const MOCK_ANNOUNCEMENTS: Announcement[] = [
  {
    id: 1,
    tag: '주간',
    title:
      '종량제 봉투 판매 수량 제한종량제 봉투 판매 수량 제한종량제 봉투 판매 수량 제한종량제 봉투 판매 수량 제한',
    imgUrl: '',
    content: '봉투 판매 수량을 1인당 최대 2개로 제한합니다.',
  },
  {
    id: 2,
    tag: '주간',
    title: '종량제 봉투 판매 수량 제한',
    imgUrl: '',
    content: '봉투 판매 수량을 1인당 최대 2개로 제한합니다.',
  },
  {
    id: 3,
    tag: '일일',
    title: '종량제 봉투 판매 수량 제한',
    imgUrl: '',
    content: '봉투 판매 수량을 1인당 최대 2개로 제한합니다.',
  },
  {
    id: 4,
    tag: '주간',
    title: '종량제 봉투 판매 수량 제한',
    imgUrl: '',
    content: '봉투 판매 수량을 1인당 최대 2개로 제한합니다.',
  },
];

const HomePage = () => {
  const navigate = useNavigate();

  const handleProfileClick = () => {
    navigate(ROUTE_PATH.MYPAGE);
  };

  return (
    <div className="flex flex-1 flex-col bg-lightgray p-6.25 gap-5">
      <CommonHeader
        className="bg-white"
        leftSlot={<IcLogo className="h-7.5 w-auto" />}
        rightSlot={
          <button
            type="button"
            aria-label="프로필"
            className="size-7.5 rounded-full bg-gray-200"
            onClick={handleProfileClick}
          />
        }
        showDivider={false}
      />
      <BannerCarousel images={[banner1, banner2, banner3]} />
      <AnnouncementItemList date={new Date()} items={MOCK_ANNOUNCEMENTS} />
      <ManagementGuideButton />
    </div>
  );
};

export default HomePage;
