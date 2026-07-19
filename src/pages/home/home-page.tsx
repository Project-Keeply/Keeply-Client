import banner1 from '@shared/assets/images/banners/banner-1.svg';
import banner2 from '@shared/assets/images/banners/banner-2.svg';
import banner3 from '@shared/assets/images/banners/banner-3.svg';
import { CommonHeader } from '@shared/components';
import ManagementGuideButton from '@shared/components/ManagementGuideButton';
import { IcLogo } from '@shared/icons';
import { ROUTE_PATH } from '@shared/router/path';
import { useNavigate } from 'react-router';

import BannerCarousel from './ui/banner-carousel';

import {
  AnnouncementItemList,
  useAnnouncements,
} from '@/entities/announcement';
import { useMyGroup } from '@/entities/group';

const HomePage = () => {
  const navigate = useNavigate();
  const handleProfileClick = () => {
    navigate(ROUTE_PATH.MYPAGE);
  };

  const { groupId } = useMyGroup();
  const { announcements } = useAnnouncements(groupId);

  return (
    <div className="flex flex-1 flex-col bg-lightgray">
      <CommonHeader
        isSticky
        leftSlot={<IcLogo className="h-10 w-auto" />}
        rightSlot={
          <button
            type="button"
            aria-label="프로필"
            className="size-10 rounded-full bg-gray-200"
            onClick={handleProfileClick}
          />
        }
        showDivider={false}
      />
      <div className="flex flex-col gap-5 px-6.25 pb-6.25">
        <BannerCarousel images={[banner1, banner2, banner3]} />
        <AnnouncementItemList date={new Date()} items={announcements} />
        <ManagementGuideButton />
      </div>
    </div>
  );
};

export default HomePage;
