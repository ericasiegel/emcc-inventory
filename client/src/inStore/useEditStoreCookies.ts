import { CACHE_KEY_COOKIES } from "../constants";
import { Store, AddEditStore } from "./StoreCookie";
import APIClient from "../services/api-client";
import useMutateCookies from "../hooks/useMutateCookies";

const useEditStoreCookies = (id: number) => {
    const apiClient = new APIClient("store/");

    const {
      mutate: editStoreCookies,
      error,
      isLoading,
    } = useMutateCookies<Store, Error, AddEditStore>(
      (store: AddEditStore) => apiClient.patch(store, id),
      () => {},
      [CACHE_KEY_COOKIES, "store"]
    );
    return { editStoreCookies, error, isLoading }
}

export default useEditStoreCookies