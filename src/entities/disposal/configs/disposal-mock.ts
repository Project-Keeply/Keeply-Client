import type { DisposalItem } from '../types/disposal';

/**
 * 폐기 관리 페이지 퍼블리싱용 목데이터.
 * - 이미지는 아직 없어 imgUrl 은 빈 문자열로 둔다.
 * - expirationDate 는 'YYYY-MM-DD' (임박순 정렬 기준).
 */
export const DISPOSAL_MOCK: DisposalItem[] = [
  {
    id: 1,
    imgUrl: '',
    title: '참치마요 삼각김밥',
    category: 'FF',
    expirationDate: '2026-07-06',
  },
  {
    id: 2,
    imgUrl: '',
    title: '바나나맛 우유',
    category: '유제품',
    expirationDate: '2026-07-07',
  },
  {
    id: 3,
    imgUrl: '',
    title: '초코송이',
    category: '과자',
    expirationDate: '2026-07-08',
  },
  {
    id: 4,
    imgUrl: '',
    title: '진라면 매운맛',
    category: '라면',
    expirationDate: '2026-07-10',
  },
  {
    id: 5,
    imgUrl: '',
    title: '제로콜라 500ml',
    category: '음료',
    expirationDate: '2026-07-12',
  },
  {
    id: 6,
    imgUrl: '',
    title: '핫바 오리지널',
    category: '기타',
    expirationDate: '2026-07-15',
  },
];
