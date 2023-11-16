import { COOKIES_ENDPOINT } from '../constants';
import { Cookie } from '../cookies/Cookie';
import APIClient from '../services/api-client';
import useMutateCookies from '../hooks/useMutateCookies';

const useDeleteImage = (slug: string) => {
    const apiClient = new APIClient(COOKIES_ENDPOINT + "/");
    const {
      mutate: deleteImage,
      error,
      isLoading,
    } = useMutateCookies<Cookie, Error, number>(
      (id: number) => apiClient.deleteImage(slug, id).then((res) => res.data),
      () => {},
      [COOKIES_ENDPOINT]
    );
    return { deleteImage, error, isLoading }
}

export default useDeleteImage