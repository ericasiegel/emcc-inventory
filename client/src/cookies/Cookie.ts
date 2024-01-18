import { Image } from '../cookieImage/Image';
import { Counts } from '../counts/Counts';

export interface Cookie {
  id: number;
  name: string;
  slug: string;
  description?: string;
  is_active: boolean;
  counts: Counts;
  images?: Image[];
}

