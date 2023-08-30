import useData from "./useData";


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
    const { data, error, isLoading } = useData<Cookie>('/cookies');
    const filteredCookies = data.filter(cookie => {
      if (isActive === null) return true;
      return cookie.is_active === isActive;
    });
  return {
    data: filteredCookies,
    error, 
    isLoading
  };
};

export default useCookies