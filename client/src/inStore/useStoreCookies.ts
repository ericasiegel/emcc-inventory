import APIClient, { FetchResponse } from "../services/api-client"
import { useInfiniteQuery } from "@tanstack/react-query";
import { Store } from "./StoreCookie";

const apiClient = new APIClient<Store>('/store')

const useStoreCookies = ( id: number, size?: string) => {
    return useInfiniteQuery<FetchResponse<Store>, Error>({
        queryKey: ['store', id, size],
        queryFn: () =>
        apiClient
        .getAll({
            params: {
                cookie_id: id,
                size: size || undefined,
            }
        })
    })
}

export default useStoreCookies;