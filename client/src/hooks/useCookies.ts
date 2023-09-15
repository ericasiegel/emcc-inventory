import { FetchResponse } from './../services/api-client';
import { CookieQuery } from './../App';
import { useInfiniteQuery } from "@tanstack/react-query";
import APIClient from "../services/api-client";
import ms from 'ms';

const apiClient = new APIClient<Cookie>('/cookies')


interface Image {
  id: number;
  image: string;
}

export interface Counts {
  doughs: number;
  baked_cookies: {
    mega: number;
    mini: number;
  };
  total_in_store: {
    mega: number;
    mini: number;
  };
}

export interface Cookie {
    id: number;
    name: string;
    is_active: boolean;
    counts: Counts;
    images?: Image[];
  }
  

  const useCookies = (cookieQuery: CookieQuery) => {
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