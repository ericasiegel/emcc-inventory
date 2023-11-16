import { useQuery } from "@tanstack/react-query";
import cookieService from "../services/cookieService";
import { COOKIES_ENDPOINT } from "../constants";


const useCookie = (slug: string) => useQuery({
    queryKey: [COOKIES_ENDPOINT, slug],
    queryFn: () => cookieService.get(slug)
})

export default useCookie;
