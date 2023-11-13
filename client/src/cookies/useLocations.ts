
import APIClient, { FetchResponse } from '../services/api-client'
import { Location } from './Location'
import { useInfiniteQuery } from '@tanstack/react-query'

const apiClient = new APIClient<Location>('/locations')

const useLocations = () => {
  return useInfiniteQuery<FetchResponse<Location>, Error>({
    queryKey: ['locations'],
    queryFn: () =>
    apiClient.getAll({}),
})
}

export default useLocations