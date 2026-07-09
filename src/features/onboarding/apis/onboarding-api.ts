import type { ApiResponse } from '@shared/apis';
import { apiInstance, unwrapDataResponse } from '@shared/apis';

import type {
  OwnerOnboardingRequest,
  OwnerOnboardingResponse,
  StaffOnboardingRequest,
  StaffOnboardingResponse,
} from '../types';

export const postStaffOnboarding = async (
  body: StaffOnboardingRequest,
): Promise<StaffOnboardingResponse> => {
  const res = await apiInstance.post<ApiResponse<StaffOnboardingResponse>>(
    '/onboarding/staff',
    body,
  );
  return unwrapDataResponse(res);
};

export const postOwnerOnboarding = async (
  body: OwnerOnboardingRequest,
): Promise<OwnerOnboardingResponse> => {
  const res = await apiInstance.post<ApiResponse<OwnerOnboardingResponse>>(
    '/onboarding/owner',
    body,
  );
  return unwrapDataResponse(res);
};
