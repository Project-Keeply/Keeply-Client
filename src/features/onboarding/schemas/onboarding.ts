import { z } from 'zod'

import type { Brand, OnboardingRole } from '@/features/onboarding/constants'
import { BRAND, ONBOARDING_ROLE } from '@/features/onboarding/constants'

export const workspaceCodeSchema = z
  .string()
  .regex(/^[A-Z0-9]{6}$/, '근무지 코드는 영문 대문자/숫자 6자리입니다.');

export const storeNameSchema = z
  .string()
  .min(1, '매장 별명을 입력해주세요.')
  .max(20, '매장 별명은 20자 이내로 입력해주세요.')

export const onboardingSchema = z.discriminatedUnion('role', [
  z.object({
    role: z.literal(ONBOARDING_ROLE.PART_TIMER),
    workspaceCode: workspaceCodeSchema,
  }),
  z.object({
    role: z.literal(ONBOARDING_ROLE.STORE_MANAGER),
    brand: z.enum([BRAND.GS25, BRAND.CU, BRAND.SEVEN_ELEVEN, BRAND.EMART24]),
    storeName: storeNameSchema,
  }),
]);

export type OnboardingFormValues = z.infer<typeof onboardingSchema>;

export interface OnboardingFormDraft {
  role?: OnboardingRole;
  workspaceCode?: string;
  brand?: Brand;
  storeName?: string;
}