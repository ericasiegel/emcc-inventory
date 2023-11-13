import { CACHE_KEY_COOKIES } from "../constants";
import { Dough, AddUpdateDough } from "./Dough";
import APIClient from "../services/api-client";
import useMutateCookies from "../hooks/useMutateCookies";


const useAddDough = (onSuccessCallback: () => void) => {
    const apiClient = new APIClient("doughs/");
    const {
      mutate: addDough,
      error,
      isLoading,
    } = useMutateCookies<Dough, Error, AddUpdateDough>(
      (dough: AddUpdateDough) => apiClient.post(dough),
      () => {
        onSuccessCallback();
      },
      [CACHE_KEY_COOKIES, "doughs"]
    );
    return { addDough, error, isLoading }
}

export default useAddDough