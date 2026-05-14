import AppShell from '@/app/layouts/AppShell'

import { HomePage, LoginPage, ManagementPage, MyPage, OnboardingPage, WorkingSpacePage } from '../lazy'
import { ROUTE_PATH } from '../path'

export const globalRoutes = [
  {
    path: ROUTE_PATH.LOGIN,
    Component: LoginPage,
  },
  {
    path: ROUTE_PATH.ONBOARDING,
    Component: OnboardingPage,
  },
  {
    Component: AppShell,
    children: [
      { path: ROUTE_PATH.HOME, Component: HomePage },
      { path: ROUTE_PATH.WORKING_SPACE, Component: WorkingSpacePage },
      { path: ROUTE_PATH.MANAGEMENT, Component: ManagementPage },
      { path: ROUTE_PATH.MYPAGE, Component: MyPage },
    ],
  },
]
