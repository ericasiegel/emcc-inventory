import { BAKED_ENDPOINT, COOKIES_ENDPOINT } from "../constants";
import { Baked, AddUpdateBaked } from "./Baked";
import APIClient from "../services/api-client";
import useMutateCookies from "../hooks/useMutateCookies";


const useAddBaked = (onSuccessCallback: () => void) => {
    const apiClient = new APIClient(BAKED_ENDPOINT + "/");
  const {
    mutate: addBakedCookies,
    error,
    isLoading,
  } = useMutateCookies<Baked, Error, AddUpdateBaked>(
    (baked: AddUpdateBaked) => apiClient.post(baked),
    () => {
      onSuccessCallback();
    },
    [COOKIES_ENDPOINT, BAKED_ENDPOINT]
  );
  return { addBakedCookies, error, isLoading }
}

export default useAddBaked