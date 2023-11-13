import { FetchResponse } from '../services/api-client';
import { useInfiniteQuery } from "@tanstack/react-query";
import ms from 'ms';
import useCookieQueryStore from '../store';
import { Cookie } from './Cookie';
import cookieService from '../services/cookieService';
import { CACHE_KEY_COOKIES } from '../constants';



  const useCookies = () => {
    const cookieQuery = useCookieQueryStore(s => s.cookieQuery)
    return useInfiniteQuery<FetchResponse<Cookie>, Error>({
      queryKey: [CACHE_KEY_COOKIES, cookieQuery],
      queryFn: ({ pageParam = 1}) =>
        cookieService
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