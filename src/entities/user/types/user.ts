import type { components } from '@shared/types/schema';

export type UserResponse = components['schemas']['UserResponse'];

export interface User {
  id: number,
  name: string;
  profileImageUrl: string;
  groupName: string;
}
