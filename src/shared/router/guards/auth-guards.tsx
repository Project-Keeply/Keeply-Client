import { Navigate, Outlet } from 'react-router'

import { ROUTE_PATH } from '../path'

import { getAccessToken } from '@/shared/apis'

const AuthGuards = () => {
  const isAuthenticated = Boolean(getAccessToken());

  if(!isAuthenticated) {
    return <Navigate to={ROUTE_PATH.LOGIN} replace />
  }
  return <Outlet />
}

export default AuthGuards
