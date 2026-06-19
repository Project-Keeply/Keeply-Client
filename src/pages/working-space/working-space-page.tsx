import { CommonHeader } from '@shared/components';
import WorkingLogList from '@/entities/working-space/components/WorkingLogList';
import type { WorkingLog } from '@/entities/working-space/types/working-log';

const today = new Date();
const getDateString = (daysAgo: number): string => {
  const d = new Date(today);
  d.setDate(d.getDate() - daysAgo);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
};

const CONTENTS = [
  '오전 근무 시작. 재고 확인 완료.',
  '냉장고 온도 점검 완료. 이상 없음.',
  '삼각김밥 재고 부족. 발주 넣었습니다.',
  '청소 완료. 화장실 휴지 교체 필요합니다.',
  '야간 근무 인수인계 완료. 특이사항 없음.',
  '음료 냉장고 정리 완료. 유통기한 지난 샌드위치 2개 폐기 처리. 점장님께 보고 완료.',
  '담배 재고 부족. 말보로 레드, 에쎄 체인지 각각 1카톤씩 발주 필요.',
  '카드단말기 오류 발생. 재부팅 후 정상 작동 확인.',
  '편의점 앞 청소 완료. 주변 쓰레기 수거 완료.',
  '야간 순찰 완료. 이상 없음.',
];

const MOCK_LOGS: WorkingLog[] = [
  ...Array.from({ length: 100 }, (_, i) => ({
    id: String(i + 1),
    tag: i % 2 === 0 ? '훈진' : '진훈',
    content: CONTENTS[i % CONTENTS.length],
    date: getDateString(0),
    variant: (i % 2 === 0 ? 'primary' : 'secondary') as 'primary' | 'secondary',
  })),
  { id: '101', tag: '훈진', content: '어제 오전 근무 완료.', date: getDateString(1), variant: 'primary' },
  { id: '102', tag: '진훈', content: '어제 저녁 재고 정리 완료.', date: getDateString(1), variant: 'secondary' },
];

const WorkingSpacePage = () => {
  return (
    <>
      <CommonHeader title="근무일지" />
      <WorkingLogList logs={MOCK_LOGS} />
    </>
  );
};

export default WorkingSpacePage;
