import { COOKIES_ENDPOINT, STORE_ENDPOINT } from "../constants";
import { Store, EditStore } from "./StoreCookie";
import APIClient from "../services/api-client";
import useMutateCookies from "../hooks/useMutateCookies";

const useEditStoreCookies = (id: number) => {
    const apiClient = new APIClient(STORE_ENDPOINT + "/");

    const {
      mutate: editStoreCookies,
      error,
      isLoading,
    } = useMutateCookies<Store, Error, EditStore>(
      (store: EditStore) => apiClient.patch(store, id),
      () => {},
      [COOKIES_ENDPOINT, STORE_ENDPOINT]
    );
    return { editStoreCookies, error, isLoading }
}

export default useEditStoreCookies