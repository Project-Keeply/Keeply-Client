import { useSuspenseQuery } from '@tanstack/react-query';

import { getMyGroup } from '../apis/group-api';

import { queryKeys } from '@/shared/query/query-keys';

const useMyGroup = () => {
  const { data } = useSuspenseQuery({
    queryKey: queryKeys.group.me(),
    queryFn: getMyGroup
  });
  return { group: data }
}
export default useMyGroup;