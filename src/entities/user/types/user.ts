import type { components } from '@shared/types/schema';

export type UserResponse = components['schemas']['UserResponse'];

export interface User {
  name: string;
  storeName: string;
  profileImageUrl: string;

}