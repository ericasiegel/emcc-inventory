import { Cookie } from './Cookie';
import { COOKIES_ENDPOINT } from "../constants"
import APIClient from "../services/api-client"
import useMutateCookies from '../hooks/useMutateCookies';

const useEditCookie = (id: number, onSuccessCallback?: () => void) => {
    const apiClient = new APIClient(COOKIES_ENDPOINT + '/');

    const {
        mutate: editCookie,
        error, 
        isLoading,
    } = useMutateCookies<Cookie, Error, Cookie>(
        (updatedCookie: Cookie) => apiClient.patch(updatedCookie, id),
        () => {
            if (onSuccessCallback ){
                onSuccessCallback();
            }
        },
        [COOKIES_ENDPOINT]
    );
    return { editCookie, error, isLoading }
}

export default useEditCookie