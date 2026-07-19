import { ROUTE_PATH, type Routes } from '@shared/router/path';

interface MyPageMenu {
  label: string;
  path: Routes;
  ownerOnly?: boolean;
}

export const MYPAGE_MENUS: MyPageMenu[] = [
  { label: '초대코드', path: ROUTE_PATH.MYPAGE_INVITE, ownerOnly: true },
  { label: '탈퇴하기', path: ROUTE_PATH.MYPAGE_WITHDRAW },
  { label: '약관 및 정책', path: ROUTE_PATH.MYPAGE_TERMS },
];
