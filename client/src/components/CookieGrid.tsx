import { SimpleGrid, Text } from "@chakra-ui/layout";
import useCookies from "../hooks/useCookies";
import CookieCard from "./CookieCard";
import CookieCardSkeleton from "./CookieCardSkeleton";
import CookieCardContainer from "./CookieCardContainer";
import { CookieQuery } from "../App";
import { Box, Button } from "@chakra-ui/react";

interface Props {
  cookieQuery: CookieQuery;
  // activeCookie: boolean | null
}

const CookieGrid = ({ cookieQuery }: Props) => {
  const { data, error, isLoading, isFetchingNextPage, fetchNextPage, hasNextPage } = useCookies(cookieQuery);
  const skeletons = [1, 2, 3, 4, 5, 6];
  // const { isLoading, isFetchingNextPage, fetchNextPage, hasNextPage } = query;

  if (error) return <Text>{error.message}</Text>;

  return (
    <Box padding={3}>
      <SimpleGrid columns={{ sm: 1, md: 2, lg: 3, xl: 4 }} spacing={5}>
        {isLoading &&
          skeletons.map((skeleton) => (
            <CookieCardContainer key={skeleton}>
              <CookieCardSkeleton />
            </CookieCardContainer>
          ))}
        {data?.pages.map((page) =>
          page.results.map((cookie) => (
            <CookieCardContainer key={cookie.id}>
              <CookieCard cookie={cookie} />
            </CookieCardContainer>
          ))
        )}
      </SimpleGrid>
      {hasNextPage && (
        <Button colorScheme="facebook" variant='outline' marginY={5} onClick={() => fetchNextPage()}>
          {isFetchingNextPage ? "Loading..." : "Load More"}
        </Button>
      )}
    </Box>
  );
};

export default CookieGrid;
