import cookieService from '../services/cookieService';
import { useQuery } from "@tanstack/react-query";
import { INGREDIENT_ENDOINT } from './../constants';


const useCookie = (id: number) => useQuery({
    queryKey: [INGREDIENT_ENDOINT, id],
    queryFn: () => cookieService.get(id)
})

export default useCookie;