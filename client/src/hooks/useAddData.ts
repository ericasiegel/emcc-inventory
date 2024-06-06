import APIClient from '../services/api-client';
import useMutateCookies from './useMutateCookies';
import { COOKIES_ENDPOINT } from '../constants';

interface Props<T> {
    endpoint: string;
    onSuccessCallback: () => void;
    onResultCallback?: (result: T) => void;
  }
  
  const useAddData = <T>({ endpoint, onSuccessCallback, onResultCallback }: Props<T>) => {
    const apiClient = new APIClient(endpoint + "/");
  
    const { 
      mutate: addData, 
      error, 
      isLoading 
    } = useMutateCookies<T, Error, T>(
      (newData: T) => apiClient.post(newData).then(res => res as T),
      onSuccessCallback,
      [COOKIES_ENDPOINT, endpoint],
      onResultCallback // Pass the onResultCallback here
    );
  
    return { addData, error, isLoading }
  }
  
  export default useAddData;
  