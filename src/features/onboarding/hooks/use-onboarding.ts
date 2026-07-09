import { useMutation } from '@tanstack/react-query';

import {
  postOwnerOnboarding,
  postStaffOnboarding,
} from '../apis/onboarding-api';
import { ONBOARDING_ROLE } from '../constants';
import type { OnboardingFormValues } from '../schemas';

import { useUser } from '@/entities/user';

interface UseOnboardingOptions {
  onSuccess: () => void;
}

export const useOnboarding = ({ onSuccess }: UseOnboardingOptions) => {
  const { user } = useUser();

  return useMutation({
    mutationFn: (values: OnboardingFormValues) => {
      if (values.role === ONBOARDING_ROLE.PART_TIMER) {
        return postStaffOnboarding({
          name: user.name,
          inviteCode: values.workspaceCode,
        });
      }
      return postOwnerOnboarding({
        name: user.name,
        storeBrand: values.brand,
        storeName: values.storeName,
      });
    },
    onSuccess,
    // TODO: 토스트/에러 문구 UX 컴포넌트 추가 후 사용자 피드백(isError)으로 대체
    onError: (error) => {
      // eslint-disable-next-line no-console
      console.error('온보딩 제출 실패:', error);
    },
  });
};
