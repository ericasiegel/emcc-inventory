import { useQuery } from "@tanstack/react-query";
import APIClient from "../services/api-client";
import { Cookie } from "./useCookies";

const apiClient = new APIClient<Cookie>('/cookies');

const useCookie = (slug: string) => useQuery({
    queryKey: ['cookies', slug],
    queryFn: () => apiClient.get(slug)
})

export default useCookie;