import APIClient from '../services/api-client';
import { CACHE_KEY_COOKIES } from '../constants';
import { Cookie } from './Cookie';
import useMutateCookies from '../hooks/useMutateCookies';


const useAddCookie = (onSuccessCallback: () => void) => {
  const apiClient = new APIClient("cookies/");
  
  const {
    mutate: addCookie,
    error,
    isLoading,
  } = useMutateCookies<Cookie, Error, Cookie>(
    (newCookie: Cookie) => apiClient.post(newCookie),
    () => {
      onSuccessCallback();
    },
    [CACHE_KEY_COOKIES]
  );
  return { addCookie, error, isLoading }
}

export default useAddCookie