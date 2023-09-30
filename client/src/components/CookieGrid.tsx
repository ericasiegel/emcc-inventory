import { SimpleGrid, Text } from "@chakra-ui/layout";
import useCookies from "../hooks/useCookies";
import CookieCard from "./CookieCard";
import CookieCardSkeleton from "./CookieCardSkeleton";
import CookieCardContainer from "./CookieCardContainer";
import { Spinner, Box } from "@chakra-ui/react";
import InfiniteScroll from "react-infinite-scroll-component";
import AddCookieForm from "./AddCookieForm";
import { useState } from "react";
import AddButton from "./AddButton";

const CookieGrid = () => {
  const {
    data,
    error,
    isLoading,
    // isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useCookies();
  const skeletons = [1, 2, 3, 4, 5, 6];

  const [formVisible, setFormVisible] = useState(false);
  const toggleFormVisibility = () => setFormVisible(!formVisible);

  if (error) return <Text>{error.message}</Text>;
  const fetchedCookiesCount =
    data?.pages.reduce((total, page) => total + page.results.length, 0) || 0;

  return (
    <>
      <Box paddingX={10}>
        <AddButton onClick={toggleFormVisibility} />
        {formVisible && <AddCookieForm />}
      </Box>
      <InfiniteScroll
        dataLength={fetchedCookiesCount}
        hasMore={!!hasNextPage}
        next={() => fetchNextPage()}
        loader={<Spinner />}
      >
        <SimpleGrid
          columns={{ sm: 1, md: 2, lg: 3, xl: 4 }}
          spacing={5}
          padding={5}
        >
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
      </InfiniteScroll>
    </>
  );
};

export default CookieGrid;
