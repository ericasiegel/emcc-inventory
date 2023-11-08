import { AxiosError } from "axios";
import { CACHE_KEY_COOKIES } from "../constants";
import { Baked } from "../entities/Baked";
import { Cookie } from "../entities/Cookie";
import { Dough } from "../entities/Dough";
import APIClient from "../services/api-client";
import useMutateCookies from "./useMutateCookies";

const useDeleteCookies = (endpoint: string) => {
    const apiClient = new APIClient(endpoint);

  const {
    mutate: deleteItem,
    error,
    isLoading,
  } = useMutateCookies<{data: Cookie | Dough | Baked}, AxiosError, number>(
    (id: number) => apiClient.delete(id).then((res) => res.data),
    () => {},
    [CACHE_KEY_COOKIES, endpoint]
  );
  return { deleteItem, error, isLoading }
}

export default useDeleteCookies