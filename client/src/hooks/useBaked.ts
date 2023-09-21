import APIClient, { FetchResponse } from "../services/api-client"
import { useInfiniteQuery } from "@tanstack/react-query";
import { Baked } from "../entities/Baked";

const apiClient = new APIClient<Baked>('/bakedcookies')

const useBaked = ( id: number | undefined, size: string) => {
    return useInfiniteQuery<FetchResponse<Baked>, Error>({
        queryKey: ['bakedcookies', id, size],
        queryFn: () =>
        apiClient
        .getAll({
            params: {
                cookie_id: id,
                size: size
            }
        })
    })
}

export default useBaked;