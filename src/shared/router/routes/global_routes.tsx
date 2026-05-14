import {
  HomePage,
  LoginPage,
  ManagementPage,
  MyPage,
  OnboardingPage,
  WorkingSpacePage,
} from '@shared/router/lazy';
import { ROUTE_PATH } from '@shared/router/path';
import type { RouteObject } from 'react-router';

import AppShell from '@/app/layouts/AppShell';

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
    ] satisfies RouteObject[],
  },
];
