import { type Routes } from '@shared/router/path';
import { useNavigate } from 'react-router'

const useRouteNavigation = () => {
  const navigate = useNavigate()

  const handleNavigate = (path: Routes) => {
    navigate(path)
  }
  return {
    handleNavigate
  }
}

export default useRouteNavigation
