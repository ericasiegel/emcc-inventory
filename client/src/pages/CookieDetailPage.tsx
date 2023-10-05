import { useParams } from "react-router-dom";
import useCookie from "../hooks/useCookie";
import {
  Flex,
  Image,
  Heading,
  Spinner,
  Card,
  Text,
  SimpleGrid,
  GridItem,
  HStack,
  Box,
} from "@chakra-ui/react";
import CookieDetailContainer from "../components/CookieDetailContainer";
import DetailCard from "../components/DetailCard";
import useDoughs from "../hooks/useDoughs";
import useBaked from "../hooks/useBaked";
import useStoreCookies from "../hooks/useStoreCookies";
import noImage from "../assets/no-image-placeholder-6f3882e0.webp";
import ActiveInactiveSwitch from "../components/ActiveInactiveSwitch";
import { id } from "date-fns/locale";
import AddDoughForm from "../components/AddDoughForm";
import FormModal from "../components/FormModal";

const CookieDetailPage = () => {
  const { slug } = useParams();
  const { data: cookie, isLoading, error } = useCookie(slug!);

  if (isLoading) return <Spinner />;

  if (error) throw error;

  if (!cookie) {
    return null; // or display an error message or handle this case as needed
  }
  const imgUrl =
    cookie.images && cookie.images?.length > 0
      ? cookie.images[0].image
      : noImage;

  return (
    <SimpleGrid columns={{ base: 1, md: 2 }} spacing={5}>
      <GridItem>
        <HStack justifyContent="space-between">
          <Heading color="#941c3e" size="2xl" paddingY={3}>
            {cookie?.name}
          </Heading>
          <ActiveInactiveSwitch
            id={cookie.id}
            name={cookie.name}
            is_active={cookie.is_active}
          />
        </HStack>

        <CookieDetailContainer>
          <DetailCard
            id={cookie.id}
            count={cookie.counts}
            dataFetcher={useDoughs}
            headingText="Doughs"
            endpoint="doughs"
          />
        </CookieDetailContainer>
        <CookieDetailContainer>
          <Flex justifyContent="space-between">
            <DetailCard
              id={cookie.id}
              size="mega"
              count={cookie.counts}
              countType="baked_cookies"
              dataFetcher={useBaked}
              headingText="Baked Cookies"
              endpoint="/bakedcookies"
            />
            <DetailCard
              id={cookie.id}
              size="mini"
              count={cookie.counts}
              countType="baked_cookies"
              dataFetcher={useBaked}
              headingText="Baked Cookies"
              endpoint="/bakedcookies"
            />
          </Flex>
        </CookieDetailContainer>
        <CookieDetailContainer>
          <Flex justifyContent="space-between">
            <DetailCard
              id={cookie.id}
              size="mega"
              count={cookie.counts}
              countType="total_in_store"
              dataFetcher={useStoreCookies}
              headingText="Total Cookies In Store"
              endpoint="store"
            />
            <DetailCard
              id={cookie.id}
              size="mini"
              count={cookie.counts}
              countType="total_in_store"
              dataFetcher={useStoreCookies}
              headingText="Total Cookies In Store"
              endpoint="store"
            />
          </Flex>
        </CookieDetailContainer>
      </GridItem>
      <GridItem>
        <Image
          margin="0 auto" // Center horizontally using margin auto
          display="block"
          padding={4}
          src={imgUrl}
          alt={cookie.name}
          maxW="70%"
          height="auto"
          borderRadius="full"
          overflow="hidden"
          boxShadow="dark-lg"
          background="#941c3e"
          p="2"
        />
        <Card padding={3} border={2} width="100%" background="inherit">
          <Text>Recipe Here</Text>
        </Card>
      </GridItem>
      {/* CREATE recipe box */}
    </SimpleGrid>
  );
};

export default CookieDetailPage;
