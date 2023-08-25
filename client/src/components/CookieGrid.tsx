import { useEffect, useState } from "react";
import apiClient from "../services/api-client";
import { Text } from "@chakra-ui/layout";

interface Cookie {
  id: number;
  name: string;
}

interface fetchCookiesResponse {
  count: number;
  results: Cookie[];
}

const CookieGrid = () => {
  const [cookies, setCookies] = useState<Cookie[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    apiClient
      .get<fetchCookiesResponse>("cookies/")
      .then((res) => setCookies(res.data.results))
      .catch((err) => setError(err.message));
  }, []);

  return (
    <>
      <Text>{error}</Text>
      <ul>
        {cookies.map((cookie) => (
          <li key={cookie.id}>{cookie.name}</li>
        ))}
      </ul>
    </>
  );
};

export default CookieGrid;
