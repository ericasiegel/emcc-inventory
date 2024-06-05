import APIClient from '../services/api-client';
import { COOKIES_ENDPOINT } from '../constants';
import { Cookie } from './Cookie';
import useMutateCookies from '../hooks/useMutateCookies';

const useAddCookie = (onSuccessCallback: () => void) => {
  const apiClient = new APIClient<Cookie>(COOKIES_ENDPOINT + "/");
  
  const {
    mutate: addCookie,
    error,
    isLoading,
  } = useMutateCookies<Cookie, Error, Cookie>(
    (newCookie: Cookie) => apiClient.post(newCookie),
    () => {
      onSuccessCallback();
    },
    [COOKIES_ENDPOINT]
  );
  return { addCookie, error, isLoading };
}

export default useAddCookie;
