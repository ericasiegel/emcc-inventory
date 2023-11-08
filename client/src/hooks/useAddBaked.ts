import { CACHE_KEY_COOKIES } from "../constants";
import { Baked, AddUpdateBaked } from "../entities/Baked";
import APIClient from "../services/api-client";
import useMutateCookies from "./useMutateCookies";


const useAddBaked = (onSuccessCallback: () => void) => {
    const apiClient = new APIClient("bakedcookies/");
  const {
    mutate: addBakedCookies,
    error,
    isLoading,
  } = useMutateCookies<Baked, Error, AddUpdateBaked>(
    (baked: AddUpdateBaked) => apiClient.post(baked),
    () => {
      onSuccessCallback();
    },
    [CACHE_KEY_COOKIES, "bakedcookies"]
  );
  return { addBakedCookies, error, isLoading }
}

export default useAddBaked