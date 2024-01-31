import { useQuery } from '@tanstack/react-query'
import { RECIPE_ENDOINT } from '../constants'
import APIClient from '../services/api-client'
import { Recipe } from './Recipe'

const apiClient = new APIClient<Results>('/recipes')

interface Results {
    results?: Recipe[]
}

const useRecipes = (id: number) => useQuery({
    queryKey: [RECIPE_ENDOINT + '/?cookie_id=', id],
    queryFn: () => apiClient.get(`?cookie_id=${id}`)
})

export default useRecipes;