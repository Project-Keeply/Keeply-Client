import { queryKeys } from '@shared/query/query-keys';
import { useSuspenseQuery } from '@tanstack/react-query';

import { getMyGroup } from '../apis/group-api';

const useMyGroup = () => {
  const { data } = useSuspenseQuery({
    queryKey: queryKeys.group.me(),
    queryFn: getMyGroup,
  });
  if (data.groupId === undefined) {
    throw new Error('groupID가 존재하지 않습니다.');
  }
  return { group: data, groupId: data.groupId };
};
export default useMyGroup;
