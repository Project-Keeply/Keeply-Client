import { Navigate, Outlet } from 'react-router';

import { ROUTE_PATH } from '../path';

import { useMyGroup } from '@/entities/group';

const OwnerGuard = () => {
  const { group } = useMyGroup();

  if(group.role !== 'OWNER') {
    return <Navigate to={ROUTE_PATH.MYPAGE} replace />;
  }
  return <Outlet />;
}

export default OwnerGuard;