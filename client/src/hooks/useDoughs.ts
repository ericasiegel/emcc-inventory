import APIClient, { FetchResponse } from "../services/api-client"
import { Dough } from "../entities/Dough";
import { useInfiniteQuery } from "@tanstack/react-query";

const apiClient = new APIClient<Dough>('/doughs')

const useDoughs = ( id: number | undefined) => {
    return useInfiniteQuery<FetchResponse<Dough>, Error>({
        queryKey: ['doughs', id],
        queryFn: () =>
        apiClient
        .getAll({
            params: {
                cookie_id: id
            }
        })
    })
}

export default useDoughs;