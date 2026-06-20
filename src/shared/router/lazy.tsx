import { lazy } from 'react'

export const LoginPage = lazy(() => import('@/pages/login/login-page'))
export const OnboardingPage = lazy(() => import('@/pages/onboarding/onboarding-page'))
export const HomePage = lazy(() => import('@/pages/home/home-page'))
export const WorkingSpacePage = lazy(() => import('@/pages/working-space/working-space-page'))
export const ManagementPage = lazy(() => import('@/pages/management/management-page'))
export const MyPage = lazy(() => import('@/pages/my-page/my-page'))
export const AnnouncementWritePage = lazy(() => import('@/pages/home/write/announcement-write-page'))
export const ManagementWritePage = lazy(() => import('@/pages/management/write/management-write-page'))