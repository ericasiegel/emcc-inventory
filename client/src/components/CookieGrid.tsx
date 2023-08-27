import { SimpleGrid, Text } from "@chakra-ui/layout";
import useCookies from "../hooks/useCookies";
import CookieCard from "./CookieCard";
import CookieCardSkeleton from "./CookieCardSkeleton";

const CookieGrid = () => {
  const { cookies, error, isLoading } = useCookies();
  const skeletons = [1, 2, 3, 4, 5, 6];

  return (
    <>
      <Text>{error}</Text>
      <SimpleGrid
        columns={{ sm: 1, md: 2, lg: 3, xl: 4 }}
        padding={3}
        spacing={5}
      >
        {isLoading &&
          skeletons.map((skeleton) => <CookieCardSkeleton key={skeleton} />)}
        {cookies.map((cookie) => (
          <CookieCard key={cookie.id} cookie={cookie} />
        ))}
      </SimpleGrid>
    </>
  );
};

export default CookieGrid;
