import { useParams } from "react-router-dom";
import useCookie from "../cookies/useCookie";
import {
  Heading,
  Spinner,
  Card,
  SimpleGrid,
  GridItem,
  HStack,
  Box,
} from "@chakra-ui/react";
import CookieDetailContainer from "../components/CookieDetailContainer";
import DetailCard from "../components/DetailCard";
import ActiveInactiveSwitch from "../cookies/ActiveInactiveSwitch";
import StoreCookieDetailCard from "../inStore/StoreCookieDetailCard";
import { BAKED_ENDPOINT, DOUGHS_ENDPOINT, STORE_ENDPOINT } from "../constants";
import RecipeCard from "../cookieRecipe/RecipeCard";
import CookieDescription from "../cookies/CookieDescription";
import CookieImage from "../cookieImage/CookieImage";

const CookieDetailPage = () => {

  const { slug } = useParams();
  const { data: cookie, isLoading, error } = useCookie(slug!);

  if (isLoading) return <Spinner />;

  if (error) throw error;

  if (!cookie) {
    return null; // or display an error message or handle this case as needed
  }

  


  return (
    <SimpleGrid columns={{ base: 1, md: 2 }} spacing={5}>
      <GridItem>
        <HStack justifyContent="space-between">
          <Heading color="#941c3e" size="2xl" paddingY={3}>
            {cookie?.name}
          </Heading>
          <ActiveInactiveSwitch cookie={cookie} />
        </HStack>
        <Box>
          <CookieDescription cookie={cookie} />
        </Box>

        <CookieDetailContainer>
          <DetailCard
            id={cookie.id}
            count={cookie.counts}
            headingText="Doughs"
            endpoint={DOUGHS_ENDPOINT}
          />
        </CookieDetailContainer>
        <CookieDetailContainer>
          <DetailCard
            id={cookie.id}
            size="mega"
            count={cookie.counts}
            headingText="Baked Cookies"
            endpoint={BAKED_ENDPOINT}
          />
          <DetailCard
            id={cookie.id}
            size="mini"
            count={cookie.counts}
            headingText="Baked Cookies"
            endpoint={BAKED_ENDPOINT}
          />
        </CookieDetailContainer>
        <CookieDetailContainer>
          <StoreCookieDetailCard
            id={cookie.id}
            size="mega"
            count={cookie.counts}
            endpoint={STORE_ENDPOINT}
          />
          <StoreCookieDetailCard
            id={cookie.id}
            size="mini"
            count={cookie.counts}
            endpoint={STORE_ENDPOINT}
          />
        </CookieDetailContainer>
      </GridItem>
      <GridItem>
        <CookieImage image={cookie.image} description={cookie.description} id={cookie.id} />
        <Card
          padding={3}
          border={2}
          width="100%"
          background="inherit"
          variant="elevated"
          marginTop={5}
        >
          <RecipeCard id={cookie.id} name={cookie.name} notes={cookie?.notes} />
        </Card>
      </GridItem>
    </SimpleGrid>
  );
};

export default CookieDetailPage;
