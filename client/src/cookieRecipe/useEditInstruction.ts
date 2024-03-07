import { Instructions } from './Recipe';
import APIClient from '../services/api-client'
import { COOKIES_ENDPOINT, INSTRUCTIONS_ENDOINT } from '../constants'
import useMutateCookies from '../hooks/useMutateCookies';

const useEditInstruction = (id: number, onSuccessCallback: () => void) => {
    const apiClient = new APIClient(INSTRUCTIONS_ENDOINT + "/");

    const {
        mutate: editInstruction,
        error,
        isLoading
    } = useMutateCookies<Instructions, Error, Instructions>(
        (instruction: Instructions) => apiClient.patch(instruction, id),
        () => {
            onSuccessCallback();
        },
        [COOKIES_ENDPOINT, INSTRUCTIONS_ENDOINT]
    )
  return { editInstruction, error, isLoading }
}

export default useEditInstruction