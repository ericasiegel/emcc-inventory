import { useState, useEffect } from "react";
import apiClient from "../services/api-client";
import { CanceledError } from "axios";


interface Cookie {
    id: number;
    name: string;
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