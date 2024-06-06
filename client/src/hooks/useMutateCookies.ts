import { useMutation, useQueryClient } from "@tanstack/react-query";

const useMutateCookies = <TData, TError, TInput>(
    mutationFn: (input: TInput) => Promise<TData>, 
    closeForm: () => void, 
    invalidateKeys: string[], 
    onResultCallback?: (data: TData) => void
  ) => {
    const queryClient = useQueryClient();
    const {mutateAsync, error, isLoading} = useMutation<TData, TError, TInput>({
      mutationFn,
      onSuccess: (data: TData) => {
        invalidateKeys.forEach((key) => {
          queryClient.invalidateQueries({queryKey: [key]});
        });
        closeForm();
        if (onResultCallback) {
          onResultCallback(data);
        }
      },
    });
    const mutate = async (input: TInput): Promise<TData> => {
      return await mutateAsync(input);
    }
    return { mutate, error, isLoading };
  }
  
  export default useMutateCookies;
  