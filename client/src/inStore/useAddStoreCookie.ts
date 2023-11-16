import { COOKIES_ENDPOINT, STORE_ENDPOINT } from "../constants";
import { Store, AddEditStore } from "./StoreCookie";
import APIClient from "../services/api-client";
import useMutateCookies from "../hooks/useMutateCookies";

const useAddStoreCookie = (onSuccessCallback: () => void) => {
    const apiClient = new APIClient(STORE_ENDPOINT + "/");
    const {
      mutate: addStoreCookies,
      error,
      isLoading,
    } = useMutateCookies<Store, Error, AddEditStore>(
      (cookie: AddEditStore) => apiClient.post(cookie),
      () => {
        onSuccessCallback();
      },
      [COOKIES_ENDPOINT, STORE_ENDPOINT]
    );
    return { addStoreCookies, error, isLoading }
}

export default useAddStoreCookie