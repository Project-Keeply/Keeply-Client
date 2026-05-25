import { BirdIcon } from '@shared/icons';

const HomePage = () => {
  return (
    <div className="flex flex-col gap-2 p-4">
      <h1 className="text-2xl font-bold">홈 페이지</h1>
      <div className="flex items-center gap-2 text-gray-700">
        <BirdIcon width={20} height={20} />
        <span>SVGR 아이콘 적용 완료</span>
      </div>
    </div>
  );
}

export default HomePage
