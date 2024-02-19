import APIClient from '../services/api-client'
import { COOKIES_ENDPOINT, INGREDIENTS_ENDOINT } from '../constants'
import useMutateCookies from '../hooks/useMutateCookies';
import { AddUpdateCookieIngredients, Ingredients } from './Recipe';

const useAddCookieIngredient = (onSuccessCallback: () => void) => {
    const apiClient = new APIClient(INGREDIENTS_ENDOINT + '/');
    const {
        mutate: addCookieIngredient,
        error,
        isLoading,
    } = useMutateCookies<Ingredients, Error, AddUpdateCookieIngredients>(
        (cookieIngredient: AddUpdateCookieIngredients) => apiClient.post(cookieIngredient),
        () => {
            onSuccessCallback();
        },
        [COOKIES_ENDPOINT, INGREDIENTS_ENDOINT]
    )
  return { addCookieIngredient, error, isLoading }
}

export default useAddCookieIngredient