import { Image } from './Image';
import { Counts } from './Counts';


export interface Cookie {
  id: number;
  name: string;
  slug: string;
  is_active: boolean;
  counts: Counts;
  images?: Image[];
}
