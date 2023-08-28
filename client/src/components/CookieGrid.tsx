import { SimpleGrid, Text } from "@chakra-ui/layout";
import useCookies from "../hooks/useCookies";
import CookieCard from "./CookieCard";
import CookieCardSkeleton from "./CookieCardSkeleton";
import CookieCardContainer from "./CookieCardContainer";

const CookieGrid = () => {
  const { data, error, isLoading } = useCookies();
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
          skeletons.map((skeleton) => (
            <CookieCardContainer key={skeleton}>
              <CookieCardSkeleton />
            </CookieCardContainer>
          ))}
        {data.map((cookie) => (
          <CookieCardContainer key={cookie.id}>
            <CookieCard cookie={cookie} />
          </CookieCardContainer>
        ))}
      </SimpleGrid>
    </>
  );
};

export default CookieGrid;
