import { showErrorToast } from '@shared/utils/toast';
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
    onError: () => {
      showErrorToast('온보딩에 실패했어요. 잠시 후 다시 시도해주세요.');
    },
  });
};
