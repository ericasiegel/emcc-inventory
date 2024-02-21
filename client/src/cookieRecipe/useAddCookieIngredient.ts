import APIClient from '../services/api-client'
import { COOKIES_ENDPOINT, INGREDIENTS_ENDOINT } from '../constants'
import useMutateCookies from '../hooks/useMutateCookies';
import { Ingredients } from './Recipe';

const useAddCookieIngredient = (onSuccessCallback: () => void) => {
    const apiClient = new APIClient(INGREDIENTS_ENDOINT + '/');
    const {
        mutate: addCookieIngredient,
        error,
        isLoading,
    } = useMutateCookies<Ingredients, Error, Ingredients>(
        (cookieIngredient: Ingredients) => apiClient.post(cookieIngredient),
        () => {
            onSuccessCallback();
        },
        [COOKIES_ENDPOINT, INGREDIENTS_ENDOINT]
    )
  return { addCookieIngredient, error, isLoading }
}

export default useAddCookieIngredient