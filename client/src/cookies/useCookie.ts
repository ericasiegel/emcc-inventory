import { useQuery } from "@tanstack/react-query";
import cookieService from "../services/cookieService";
import { CACHE_KEY_COOKIES } from "../constants";


const useCookie = (slug: string) => useQuery({
    queryKey: [CACHE_KEY_COOKIES, slug],
    queryFn: () => cookieService.get(slug)
})

export default useCookie;
