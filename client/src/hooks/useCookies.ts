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
  

  const useCookies = (isActive: boolean | null) => {
    const queryKey = ['cookies', isActive]; // Define the query key
    const queryFn = apiClient.getAll
  
    const { data: cookiesData, error: queryError , isLoading } = useQuery(queryKey, queryFn);

    const filteredCookies = cookiesData?.results.filter((cookie) => {
      if (isActive === null) return true;
      return cookie.is_active === isActive;
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