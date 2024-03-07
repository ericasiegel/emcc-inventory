
import APIClient from '../services/api-client';
import useMutateCookies from './useMutateCookies';
import { COOKIES_ENDPOINT } from '../constants';

interface Props {
    id: number;
    endpoint: string;
    onSuccessCallback: () => void;
}

const useEditData = <T>({ id, endpoint, onSuccessCallback }: Props) => {
    const apiClient = new APIClient(endpoint + '/');
    const {
        mutate: editData,
        error,
        isLoading,
    } = useMutateCookies<T, Error, T>(
        (editedData: T) => apiClient.patch(editedData, id),
        () => {
            onSuccessCallback();
        },
        [COOKIES_ENDPOINT, endpoint]
    )
  return { editData, error, isLoading }
}

export default useEditData