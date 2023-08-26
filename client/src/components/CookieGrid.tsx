
import { Text } from "@chakra-ui/layout";
import useCookies from "../hooks/useCookies";


const CookieGrid = () => {
  const {cookies, error} = useCookies();
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
