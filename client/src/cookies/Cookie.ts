
import { Counts } from '../counts/Counts';

export interface Cookie {
  id: number;
  name: string;
  slug: string;
  description?: string;
  is_active: boolean;
  counts: Counts;
  image?: string;
  delete_image: boolean;
}

export interface EditDescription {
  description: string;
}

export interface AddImage {
  image: File;
}

export interface DeleteImage {
  delete_image: boolean;
}