import { useParams } from "react-router-dom";
import useCookie from "../cookies/useCookie";
import {
  Image,
  Heading,
  Spinner,
  Card,
  Text,
  SimpleGrid,
  GridItem,
  HStack,
  Flex,
} from "@chakra-ui/react";
import CookieDetailContainer from "../components/CookieDetailContainer";
import DetailCard from "../cookies/DetailCard";
import useDoughs from "../dough/useDoughs";
import useBaked from "../baked/useBaked";
import noImage from "../assets/no-image-placeholder-6f3882e0.webp";
import ActiveInactiveSwitch from "../cookies/ActiveInactiveSwitch";
import StoreCookieDetailCard from "../inStore/StoreCookieDetailCard";
import AddFormModal from "../components/AddFormModal";
import AddImageForm from "../cookieImage/AddImageForm";
import DeleteImageButton from "../cookieImage/DeleteImageButton";

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
            cookie={cookie}
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
          <DetailCard
            id={cookie.id}
            size="mega"
            count={cookie.counts}
            dataFetcher={useBaked}
            headingText="Baked Cookies"
            endpoint="bakedcookies"
          />
          <DetailCard
            id={cookie.id}
            size="mini"
            count={cookie.counts}
            dataFetcher={useBaked}
            headingText="Baked Cookies"
            endpoint="bakedcookies"
          />
        </CookieDetailContainer>
        <CookieDetailContainer>
          <StoreCookieDetailCard
            id={cookie.id}
            size="mega"
            count={cookie.counts}
          />
          <StoreCookieDetailCard
            id={cookie.id}
            size="mini"
            count={cookie.counts}
          />
        </CookieDetailContainer>
      </GridItem>
      <GridItem>
        {cookie.images?.length === 0 ? (
          <Flex justifyContent="flex-end">
            <AddFormModal header="Add Image">
              <AddImageForm slug={cookie.slug} />
            </AddFormModal>
          </Flex>
        ) : (
          <Flex justifyContent="flex-end">
            <DeleteImageButton slug={cookie.slug} id={cookie.images[0].id} />
          </Flex>
        )}
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
