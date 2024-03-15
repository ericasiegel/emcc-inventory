import { COOKIES_ENDPOINT } from '../constants';
import { Cookie, DeleteImage } from '../cookies/Cookie';
import APIClient from '../services/api-client';
import useMutateCookies from '../hooks/useMutateCookies';

const useDeleteImage = (id : number) => {
    const apiClient = new APIClient(COOKIES_ENDPOINT + "/");
    const {
      mutate: deleteImage,
      error,
      isLoading,
    } = useMutateCookies<Cookie, Error, DeleteImage>(
      (updatedCookie: DeleteImage) => apiClient.patch(updatedCookie, id),
      () => {},
      [COOKIES_ENDPOINT]
    );
    return { deleteImage, error, isLoading }
}

export default useDeleteImage