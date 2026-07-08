export const ROUTE_PATH = {
  HOME: '/',
  LOGIN: '/login',
  LOGIN_CALLBACK: '/login/callback',
  ONBOARDING: '/onboarding',
  WORKING_SPACE: '/working-space',
  MANAGEMENT: '/management',
  MYPAGE: '/my-page',
  ANNOUNCEMENT_WRITE: '/announcement/write',
  MANAGEMENT_WRITE: '/management/write',
  MYPAGE_WITHDRAW: '/my-page/withdraw',
  MYPAGE_TERMS: '/my-page/terms',
} as const;

export type Routes = (typeof ROUTE_PATH)[keyof typeof ROUTE_PATH];
