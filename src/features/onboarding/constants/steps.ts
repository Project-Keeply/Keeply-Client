export const ONBOARDING_ROLE = {
  PART_TIMER: 'PART_TIMER',
  STORE_MANAGER: 'STORE_MANAGER',
} as const;

export type OnboardingRole =
  (typeof ONBOARDING_ROLE)[keyof typeof ONBOARDING_ROLE];

export const BRAND = {
  GS25: 'GS25',
  CU: 'CU',
  SEVEN_ELEVEN: 'SEVEN_ELEVEN',
  EMART24: 'EMART24',
} as const;

export type Brand = (typeof BRAND)[keyof typeof BRAND];

export const BRAND_LABEL: Record<Brand, string> = {
  GS25: 'GS25',
  CU: 'CU',
  SEVEN_ELEVEN: '세븐일레븐',
  EMART24: '이마트 24',
};

export const ONBOARDING_STEP = {
  ROLE: 'role',
  WORKSPACE_CODE: 'workspaceCode',
  BRAND: 'brand',
  STORE_NAME: 'storeName',
} as const;

export type OnboardingStepName =
  (typeof ONBOARDING_STEP)[keyof typeof ONBOARDING_STEP];

export const PART_TIMER_STEPS = [
  ONBOARDING_STEP.ROLE,
  ONBOARDING_STEP.WORKSPACE_CODE,
] as const;

export const STORE_MANAGER_STEPS = [
  ONBOARDING_STEP.ROLE,
  ONBOARDING_STEP.BRAND,
  ONBOARDING_STEP.STORE_NAME,
] as const;
