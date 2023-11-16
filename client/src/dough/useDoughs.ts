import APIClient, { FetchResponse } from "../services/api-client"
import { useInfiniteQuery } from "@tanstack/react-query";
import { Dough } from "./Dough";
import { DOUGHS_ENDPOINT } from "../constants";

const apiClient = new APIClient<Dough>('/doughs')

const useDoughs = ( id: number) => {
    return useInfiniteQuery<FetchResponse<Dough>, Error>({
        queryKey: [DOUGHS_ENDPOINT, id],
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