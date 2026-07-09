import { queryKeys } from '@shared/query/query-keys';
import { useSuspenseQuery } from '@tanstack/react-query'

import { getMe } from '../apis/user-api';
import type { User } from '../types/user';

const useUser = () => {
  const { data } = useSuspenseQuery({
    queryKey: queryKeys.user.me(),
    queryFn: getMe,
  });

  const user: User = {
    name: data.name ?? '',
    profileImageUrl: data.profileImageUrl ?? '',
  };
  return {user}
};

export default useUser;
