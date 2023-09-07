import { CookieQuery } from './../App';
import { useQuery } from "@tanstack/react-query";
import APIClient from "../services/api-client";

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
    // Create a queryKey and queryFn outside of conditionals
    const queryKey = ['cookies', cookieQuery];
    // const queryFn = apiClient.getAll;
    const queryFn = () =>
      apiClient.getAll({
        params:{
          search: cookieQuery.searchText
        }
      })
  
    // Use useQuery unconditionally
    const { data: cookiesData, error: queryError, isLoading } = useQuery(
      queryKey,
      queryFn
    );
  
    // Conditionally process the data based on cookieQuery
    const filteredCookies = cookiesData?.results.filter((cookie) => {
      if (cookieQuery.selectedActive === null) return true;
      return cookie.is_active === cookieQuery.selectedActive;
    }) || [];

  
    let error: string | null = null;
  
    if (queryError) {
      error = "An error occurred while fetching data."; // Set a generic error message
    }
  
    return {
      data: filteredCookies,
      error,
      isLoading,
    };
  };
  

export default useCookies