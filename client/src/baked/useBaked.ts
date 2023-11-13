import APIClient, { FetchResponse } from "../services/api-client"
import { useInfiniteQuery } from "@tanstack/react-query";
import { Baked } from "./Baked";

const apiClient = new APIClient<Baked>('/bakedcookies')

const useBaked = ( id: number, size?: string) => {
    return useInfiniteQuery<FetchResponse<Baked>, Error>({
        queryKey: ['bakedcookies', id, size],
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

export default useBaked;