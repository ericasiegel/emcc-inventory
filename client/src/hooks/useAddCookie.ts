import APIClient from '../services/api-client';
import { CACHE_KEY_COOKIES } from '../constants';
import { Cookie, AddUpdateCookie } from '../entities/Cookie';
import useMutateCookies from './useMutateCookies';


const useAddCookie = (onSuccessCallback: () => void) => {
  const apiClient = new APIClient("cookies/");
  
  const {
    mutate: addCookie,
    error,
    isLoading,
  } = useMutateCookies<Cookie, Error, AddUpdateCookie>(
    (cookie: AddUpdateCookie) => apiClient.post(cookie),
    () => {
      onSuccessCallback();
    },
    [CACHE_KEY_COOKIES]
  );
  return { addCookie, error, isLoading }
}

export default useAddCookie