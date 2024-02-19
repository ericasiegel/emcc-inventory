import { Ingredient } from './Recipe'
import { useInfiniteQuery } from '@tanstack/react-query'
import APIClient, { FetchResponse } from '../services/api-client'


const apiClient = new APIClient<Ingredient>('/ingredient')

const useIngredientItem = () => {
    return useInfiniteQuery<FetchResponse<Ingredient>, Error>({
        queryKey: ['ingredient'],
        queryFn: () =>
        apiClient.getAll({}),
    })
}

export default useIngredientItem