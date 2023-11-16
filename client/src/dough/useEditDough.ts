
import useMutateCookies from '../hooks/useMutateCookies';
import { Dough, EditDough } from './Dough';
import APIClient from '../services/api-client';
import { CACHE_KEY_COOKIES } from '../constants';

const useEditDough = (id: number) => {
    const apiClient = new APIClient("doughs/");

    const {
      mutate: editDough,
      error,
      isLoading,
    } = useMutateCookies<Dough, Error, EditDough>(
      (dough: EditDough) => apiClient.patch(dough, id),
      () => {},
      [CACHE_KEY_COOKIES, "doughs"]
    );
    return { editDough, error, isLoading }
}

export default useEditDough