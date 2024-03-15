import APIClient from '../services/api-client';
import useMutateCookies from './useMutateCookies';
import { COOKIES_ENDPOINT } from '../constants';

interface Props {
    endpoint: string;
    onSuccessCallback: () => void;
}

const useAddData = <T>({ endpoint, onSuccessCallback }: Props) => {
    const apiClient = new APIClient(endpoint + "/");

    const { 
        mutate: addData, 
        error, 
        isLoading 
    } = useMutateCookies<T, Error, T>(
        (newData: T) => apiClient.post(newData),
        () => {
            onSuccessCallback();
        },
        [COOKIES_ENDPOINT, endpoint]
    );

  return { addData, error, isLoading}
}

export default useAddData