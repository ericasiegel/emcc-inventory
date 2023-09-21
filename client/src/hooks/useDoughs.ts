import APIClient, { FetchResponse } from "../services/api-client"
import { useInfiniteQuery } from "@tanstack/react-query";
import { Dough } from "../entities/Dough";

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