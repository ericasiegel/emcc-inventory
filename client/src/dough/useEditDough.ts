
import useMutateCookies from '../hooks/useMutateCookies';
import { Dough, EditDough } from './Dough';
import APIClient from '../services/api-client';
import { COOKIES_ENDPOINT, DOUGHS_ENDPOINT } from '../constants';

const useEditDough = (id: number) => {
    const apiClient = new APIClient(DOUGHS_ENDPOINT + "/");

    const {
      mutate: editDough,
      error,
      isLoading,
    } = useMutateCookies<Dough, Error, EditDough>(
      (dough: EditDough) => apiClient.patch(dough, id),
      () => {},
      [COOKIES_ENDPOINT, DOUGHS_ENDPOINT]
    );
    return { editDough, error, isLoading }
}

export default useEditDough