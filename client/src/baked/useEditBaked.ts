
import APIClient from '../services/api-client';
import { BAKED_ENDPOINT, COOKIES_ENDPOINT } from '../constants';
import { Baked, EditBaked } from './Baked';
import useMutateCookies from '../hooks/useMutateCookies';

const useEditBaked = (id: number) => {
    const apiClient = new APIClient(BAKED_ENDPOINT + "/");

    const {
      mutate: editBakedCookie,
      error,
      isLoading,
    } = useMutateCookies<Baked, Error, EditBaked>(
      (bakedCookie: EditBaked) => apiClient.patch(bakedCookie, id),
      () => {},
      [COOKIES_ENDPOINT, BAKED_ENDPOINT]
    );
    return { editBakedCookie, error, isLoading }
}

export default useEditBaked