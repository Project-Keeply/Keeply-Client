import type { DisposalCategory } from '../constants/disposal-categories';

export interface DisposalItem {
  id: number;
  imgUrl: string;
  title: string;
  category: DisposalCategory;
  expirationDate: string;
}