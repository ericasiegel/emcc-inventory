import { SimpleGrid, Text } from "@chakra-ui/layout";
import useCookies from "../hooks/useCookies";
import CookieCard from "./CookieCard";
import CookieCardSkeleton from "./CookieCardSkeleton";
import CookieCardContainer from "./CookieCardContainer";
import { CookieQuery } from "../App";
import React from "react";
import { Box, Button } from "@chakra-ui/react";

interface Props {
  cookieQuery: CookieQuery;
  // activeCookie: boolean | null
}

const CookieGrid = ({ cookieQuery }: Props) => {
  const { data, query } = useCookies(cookieQuery);
  const skeletons = [1, 2, 3, 4, 5, 6];
  const { isLoading, isFetchingNextPage, fetchNextPage, hasNextPage } = query;

  if (query.error) return <Text>{query.error.message}</Text>;

  const filteredCookies = data.filter((cookie) => {
    if (cookieQuery.selectedActive === null) return true;
    return cookie.is_active === cookieQuery.selectedActive;
  });

  return (
    <Box padding={3}>
      <SimpleGrid columns={{ sm: 1, md: 2, lg: 3, xl: 4 }} spacing={5}>
        {isLoading &&
          skeletons.map((skeleton) => (
            <CookieCardContainer key={skeleton}>
              <CookieCardSkeleton />
            </CookieCardContainer>
          ))}
        {filteredCookies.map((cookie) => (
          <CookieCardContainer key={cookie.id}>
            <CookieCard cookie={cookie} />
          </CookieCardContainer>
        ))}
      </SimpleGrid>
      {hasNextPage && (
        <Button marginY={5} onClick={() => fetchNextPage()}>
          {isFetchingNextPage ? "Loading..." : "Load More"}
        </Button>
      )}
    </Box>
  );
};

export default CookieGrid;
