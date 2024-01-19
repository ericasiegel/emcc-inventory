import { Cookie, EditDescription } from './Cookie';
import { COOKIES_ENDPOINT } from "../constants"
import APIClient from "../services/api-client"
import useMutateCookies from '../hooks/useMutateCookies';

const useEditCookieDescription = (id: number, onSuccessCallback: () => void) => {
    const apiClient = new APIClient(COOKIES_ENDPOINT + '/');

    const {
        mutate: editCookieDescription,
        error, 
        isLoading,
    } = useMutateCookies<Cookie, Error, EditDescription>(
        (description: EditDescription) => apiClient.patch(description, id),
        () => {
            onSuccessCallback();
        },
        [COOKIES_ENDPOINT]
    );
    return { editCookieDescription, error, isLoading }
}

export default useEditCookieDescription