import APIClient, { FetchResponse } from "../services/api-client"
import { useInfiniteQuery } from "@tanstack/react-query";

interface Props {
    endpoint: string;
    id: number;
    size?: string;

}


const useGetData = <T>({ endpoint, id, size }: Props) => {

    const apiClient = new APIClient<T>('/' + endpoint);

    return useInfiniteQuery<FetchResponse<T>, Error>({
        queryKey: [endpoint, id, size],
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

export default useGetData;