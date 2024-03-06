import APIClient from '../services/api-client'
import { COOKIES_ENDPOINT, INSTRUCTIONS_ENDOINT } from '../constants'
import useMutateCookies from '../hooks/useMutateCookies';
import { Instructions } from './Recipe';

const useAddInstructions = (onSuccessCallback: () => void) => {
  const apiClient = new APIClient(INSTRUCTIONS_ENDOINT + "/");
  const {
    mutate: addInstructions,
    error,
    isLoading
  } = useMutateCookies<Instructions, Error, Instructions>(
    (instruction: Instructions) => apiClient.post(instruction), 
    () => {
        onSuccessCallback();
    },
    [COOKIES_ENDPOINT, INSTRUCTIONS_ENDOINT]
  )
  return { addInstructions, error, isLoading }
}

export default useAddInstructions