
import { COOKIES_ENDPOINT } from '../constants';
import { AddImage } from './Image';
import APIClient from '../services/api-client';
import useMutateCookies from '../hooks/useMutateCookies';
import { Image } from "./Image";

const useAddImage = (slug: string) => {
    const apiClient = new APIClient(COOKIES_ENDPOINT + "/");

  const {
    mutate: uploadImage,
    error,
    isLoading,
  } = useMutateCookies<Image, Error, AddImage>(
    (image: AddImage) =>
      apiClient.uploadImage(image, slug).then((res) => res.data),
    () => {},
    [COOKIES_ENDPOINT]
  );
  return { uploadImage, error, isLoading }
}

export default useAddImage