import AuthGuards from '@shared/router/guards/auth-guards';
import {
  AnnouncementWritePage,
  HomePage,
  LoginCallbackPage,
  LoginPage,
  ManagementPage,
  ManagementWritePage,
  MyPage,
  OnboardingPage,
  TermsPage,
  WithdrawPage,
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
    path: ROUTE_PATH.LOGIN_CALLBACK,
    Component: LoginCallbackPage,
  },
  {
    path: ROUTE_PATH.ONBOARDING,
    Component: OnboardingPage,
  },
  {
    path: ROUTE_PATH.ANNOUNCEMENT_WRITE,
    Component: AnnouncementWritePage,
  },
  {
    path: ROUTE_PATH.MANAGEMENT_WRITE,
    Component: ManagementWritePage,
  },
  {
    path: ROUTE_PATH.MYPAGE_WITHDRAW,
    Component: WithdrawPage,
  },
  {
    path: ROUTE_PATH.MYPAGE_TERMS,
    Component: TermsPage,
  },
  {
    Component: AuthGuards,
    children: [
      {
        Component: AppShell,
        children: [
          { path: ROUTE_PATH.HOME, Component: HomePage },
          { path: ROUTE_PATH.WORKING_SPACE, Component: WorkingSpacePage },
          { path: ROUTE_PATH.MANAGEMENT, Component: ManagementPage },
          { path: ROUTE_PATH.MYPAGE, Component: MyPage },
        ] satisfies RouteObject[],
      },
    ],
  },
];
