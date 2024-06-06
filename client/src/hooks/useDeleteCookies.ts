import { AxiosError } from "axios";
import { COOKIES_ENDPOINT } from "../constants";
import { Baked } from "../baked/Baked";
import { Cookie } from "../cookies/Cookie";
import { Dough } from "../dough/Dough";
import APIClient from "../services/api-client";
import useMutateCookies from "./useMutateCookies";

const useDeleteCookies = (endpoint: string) => {
  const apiClient = new APIClient<Cookie | Dough | Baked>(endpoint);

  const {
    mutate: deleteItem,
    error,
    isLoading,
  } = useMutateCookies<{ message: string }, AxiosError, number>(
    (id: number) => apiClient.delete(id).then(res => res),
    () => {},
    [COOKIES_ENDPOINT, endpoint]
  );

  return { deleteItem, error, isLoading }
}

export default useDeleteCookies;
