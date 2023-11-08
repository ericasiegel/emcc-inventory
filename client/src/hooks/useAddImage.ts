
import { CACHE_KEY_COOKIES } from '../constants';
import { AddImage } from '../entities/Image';
import APIClient from '../services/api-client';
import useMutateCookies from './useMutateCookies';
import { Image } from "../entities/Image";

const useAddImage = (slug: string) => {
    const apiClient = new APIClient("cookies/");

  const {
    mutate: uploadImage,
    error,
    isLoading,
  } = useMutateCookies<Image, Error, AddImage>(
    (image: AddImage) =>
      apiClient.uploadImage(image, slug).then((res) => res.data),
    () => {},
    [CACHE_KEY_COOKIES]
  );
  return { uploadImage, error, isLoading }
}

export default useAddImage