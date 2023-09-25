import { useParams } from "react-router-dom";
import useCookie from "../hooks/useCookie";
import { Flex, Image, Heading, Spinner, Card, Text } from "@chakra-ui/react";
import CookieDetailContainer from "../components/CookieDetailContainer";
import DetailCard from "../components/DetailCard";
import useDoughs from "../hooks/useDoughs";
import useBaked from "../hooks/useBaked";
import useStoreCookies from "../hooks/useStoreCookies";
import noImage from "../assets/no-image-placeholder-6f3882e0.webp";

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
    <>
      <Flex alignItems="flex-start">
        <div style={{ flex: 1 }}>
          <Heading paddingY={3}>{cookie?.name}</Heading>
          <Card
            padding={2}
            border={2}
            width="100%"
            height="100%"
            background="inherit"
          >
            <Text>Recipe Here</Text>
          </Card>
        </div>
        <Image
          margin={4}
          src={imgUrl}
          alt={cookie.name}
          maxW="30%"
          height="auto"
          borderRadius="full"
          overflow="hidden"
          boxShadow="dark-lg"
          p="3"
        />
      </Flex>
      <CookieDetailContainer>
        <DetailCard
          id={cookie.id}
          count={cookie.counts}
          dataFetcher={useDoughs}
          headingText="Doughs"
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
          />
          <DetailCard
            id={cookie.id}
            size="mini"
            count={cookie.counts}
            countType="baked_cookies"
            dataFetcher={useBaked}
            headingText="Baked Cookies"
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
          />
          <DetailCard
            id={cookie.id}
            size="mini"
            count={cookie.counts}
            countType="total_in_store"
            dataFetcher={useStoreCookies}
            headingText="Total Cookies In Store"
          />
        </Flex>
      </CookieDetailContainer>
      {/* CREATE recipe box */}
    </>
  );
};

export default CookieDetailPage;
