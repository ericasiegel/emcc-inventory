import { CACHE_KEY_COOKIES } from "../constants";
import { Store, AddEditStore } from "./StoreCookie";
import APIClient from "../services/api-client";
import useMutateCookies from "../hooks/useMutateCookies";

const useAddStoreCookie = (onSuccessCallback: () => void) => {
    const apiClient = new APIClient("store/");
    const {
      mutate: addStoreCookies,
      error,
      isLoading,
    } = useMutateCookies<Store, Error, AddEditStore>(
      (cookie: AddEditStore) => apiClient.post(cookie),
      () => {
        onSuccessCallback();
      },
      [CACHE_KEY_COOKIES, "store"]
    );
    return { addStoreCookies, error, isLoading }
}

export default useAddStoreCookie