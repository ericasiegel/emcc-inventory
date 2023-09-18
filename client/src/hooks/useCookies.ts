import { FetchResponse } from './../services/api-client';
import { useInfiniteQuery } from "@tanstack/react-query";
import APIClient from "../services/api-client";
import ms from 'ms';
import useCookieQueryStore from '../store';
import { Cookie } from '../entities/Cookie';

const apiClient = new APIClient<Cookie>('/cookies')

  const useCookies = () => {
    const cookieQuery = useCookieQueryStore(s => s.cookieQuery)
    return useInfiniteQuery<FetchResponse<Cookie>, Error>({
      queryKey: ['cookies', cookieQuery],
      queryFn: ({ pageParam = 1}) =>
        apiClient
          .getAll({
            params: { 
              search: cookieQuery.searchText,
              page: pageParam,
              is_active: cookieQuery.selectedActive !== null ? cookieQuery.selectedActive : null
            },
          }),
          getNextPageParam: (lastPage, allPages) => {
            return lastPage.next ? allPages.length + 1 : undefined;
          },
          staleTime: ms('24h')
    });
  };
  
  export default useCookies;