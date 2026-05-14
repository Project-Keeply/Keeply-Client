export const ROUTE_PATH = {
  HOME: '/',
  LOGIN: '/login',
  ONBOARDING: '/onboarding',
  WORKING_SPACE: '/working-space',
  MANAGEMENT: '/management',
  MYPAGE: '/my-page',
}

export type Routes = (typeof ROUTE_PATH)[keyof typeof ROUTE_PATH]