
import { SimpleGrid, Text } from "@chakra-ui/layout";
import useCookies from "../hooks/useCookies";
import CookieCard from "./CookieCard";


const CookieGrid = () => {
  const {cookies, error} = useCookies();
  return (
    <>
      <Text>{error}</Text>
      <SimpleGrid columns={{sm: 1, md: 2, lg:3, xl: 4}} padding={3} spacing={10}>
        {cookies.map((cookie) => (
          <CookieCard key={cookie.id} cookie={cookie} />
        ))}
      </SimpleGrid>
    </>
  );
};

export default CookieGrid;
