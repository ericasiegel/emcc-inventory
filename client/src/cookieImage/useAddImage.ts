
import { COOKIES_ENDPOINT } from '../constants';
import APIClient from '../services/api-client';
import useMutateCookies from '../hooks/useMutateCookies';
import { Image } from "./Image";
import { AddImage } from '../cookies/Cookie';

const useAddImage = (id: number) => {
    const apiClient = new APIClient(COOKIES_ENDPOINT + "/");

  const {
    mutate: uploadImage,
    error,
    isLoading,
  } = useMutateCookies<Image, Error, AddImage>(
    (image: AddImage) =>
      apiClient.uploadImage(image, id).then((res) => res.data),
    () => {},
    [COOKIES_ENDPOINT]
  );
  return { uploadImage, error, isLoading }
}

export default useAddImage