import { useState, useEffect } from "react";
import apiClient from "../services/api-client";
import { CanceledError } from "axios";


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
    counts?: Counts;
    images?: Image[];
  }
  
  interface fetchCookiesResponse {
    count: number;
    results: Cookie[];
  }

const useCookies = () => {
    const [cookies, setCookies] = useState<Cookie[]>([]);
    const [error, setError] = useState("");
  
    useEffect(() => {
        const controller = new AbortController();

      apiClient
        .get<fetchCookiesResponse>("cookies/", { signal: controller.signal })
        .then((res) => setCookies(res.data.results))
        .catch((err) => {
            if (err instanceof CanceledError) return;
            setError(err.message)
        });

        return () => controller.abort();
    }, []);

    return { cookies, error }
}

export default useCookies