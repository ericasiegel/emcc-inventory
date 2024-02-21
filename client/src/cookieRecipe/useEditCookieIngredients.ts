import APIClient from '../services/api-client'
import { COOKIES_ENDPOINT, INGREDIENTS_ENDOINT } from '../constants'
import useMutateCookies from '../hooks/useMutateCookies';
import { Ingredients } from './Recipe';

const useEditCookieIngredients = (id: number, onSuccessCallback: () => void) => {
    const apiClient = new APIClient(INGREDIENTS_ENDOINT + '/');
    const {
        mutate: editCookieIngredient,
        error,
        isLoading,
    } = useMutateCookies<Ingredients, Error, Ingredients>(
        (cookieIngredient: Ingredients) => apiClient.patch(cookieIngredient, id),
        () => {
            onSuccessCallback();
        },
        [COOKIES_ENDPOINT, INGREDIENTS_ENDOINT]
    )
  return { editCookieIngredient, error, isLoading }
}

export default useEditCookieIngredients