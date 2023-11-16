import { COOKIES_ENDPOINT, DOUGHS_ENDPOINT } from "../constants";
import { Dough, AddUpdateDough } from "./Dough";
import APIClient from "../services/api-client";
import useMutateCookies from "../hooks/useMutateCookies";


const useAddDough = (onSuccessCallback: () => void) => {
    const apiClient = new APIClient(DOUGHS_ENDPOINT + "/");
    const {
      mutate: addDough,
      error,
      isLoading,
    } = useMutateCookies<Dough, Error, AddUpdateDough>(
      (dough: AddUpdateDough) => apiClient.post(dough),
      () => {
        onSuccessCallback();
      },
      [COOKIES_ENDPOINT, DOUGHS_ENDPOINT]
    );
    return { addDough, error, isLoading }
}

export default useAddDough