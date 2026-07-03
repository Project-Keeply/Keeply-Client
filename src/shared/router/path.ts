export const ROUTE_PATH = {
  HOME: '/',
  LOGIN: '/login',
  ONBOARDING: '/onboarding',
  WORKING_SPACE: '/working-space',
  MANAGEMENT: '/management',
  MYPAGE: '/my-page',
  ANNOUNCEMENT_WRITE: '/announcement/write',
  MANAGEMENT_WRITE: '/management/write',
  WORKING_SPACE_WRITE: '/working-space/write',
  MYPAGE_PROFILE: '/my-page/profile',
  MYPAGE_WITHDRAW: '/my-page/withdraw',
  MYPAGE_TERMS: '/my-page/terms',
} as const;

export type Routes = (typeof ROUTE_PATH)[keyof typeof ROUTE_PATH];
