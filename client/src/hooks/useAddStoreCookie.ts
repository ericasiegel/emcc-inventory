import { CACHE_KEY_COOKIES } from "../constants";
import { Store, AddStore } from "../entities/StoreCookie";
import APIClient from "../services/api-client";
import useMutateCookies from "./useMutateCookies";

const useAddStoreCookie = (onSuccessCallback: () => void) => {
    const apiClient = new APIClient("store/");
    const {
      mutate: addStoreCookies,
      error,
      isLoading,
    } = useMutateCookies<Store, Error, AddStore>(
      (cookie: AddStore) => apiClient.post(cookie),
      () => {
        onSuccessCallback();
      },
      [CACHE_KEY_COOKIES, "store"]
    );
    return { addStoreCookies, error, isLoading }
}

export default useAddStoreCookie