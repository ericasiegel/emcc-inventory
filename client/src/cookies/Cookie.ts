
import { Counts } from '../counts/Counts';

export interface Cookie {
  id: number;
  name: string;
  slug: string;
  description?: string;
  is_active: boolean;
  counts?: Counts;
  image?: string | null;
  delete_image: boolean;
  notes: string | null;
}

export interface AddImage {
  image: File;
}

export interface DeleteImage {
  delete_image: boolean;
}