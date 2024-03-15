import { useMutation, useQueryClient } from "@tanstack/react-query";

const useMutateCookies = <TData, TError, TInput>( mutationFn: (input: TInput) => Promise<TData>, resetForm: () => void, invalidateKeys: string[]) => {
    const queryClient = useQueryClient();
    const {mutateAsync, error, isLoading} = useMutation<TData, TError, TInput>({
        mutationFn,
        onSuccess: () => {
                invalidateKeys.forEach((key) => {
                  queryClient.invalidateQueries({queryKey: [key]});
                });
                resetForm()
        },
    })
    const mutate = async (input: TInput) => {
        await mutateAsync(input);
    }
    return { mutate, error, isLoading };
}

export default useMutateCookies;