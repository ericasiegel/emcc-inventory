import { CACHE_KEY_COOKIES } from "../constants";
import { Store, EditStore } from "../entities/StoreCookie";
import APIClient from "../services/api-client";
import useMutateCookies from "./useMutateCookies";

const useEditStoreCookies = (id: number) => {
    const apiClient = new APIClient("store/");

    const {
      mutate: editStoreCookies,
      error,
      isLoading,
    } = useMutateCookies<Store, Error, EditStore>(
      (store: EditStore) => apiClient.patch(store, id),
      () => {},
      [CACHE_KEY_COOKIES, "store"]
    );
    return { editStoreCookies, error, isLoading }
}

export default useEditStoreCookies