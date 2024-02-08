import { useParams } from "react-router-dom";
import useCookie from "../cookies/useCookie";
import {
  Image,
  Heading,
  Spinner,
  Card,
  SimpleGrid,
  GridItem,
  HStack,
  Flex,
  Center,
  Box,
} from "@chakra-ui/react";
import CookieDetailContainer from "../components/CookieDetailContainer";
import DetailCard from "../components/DetailCard";
import noImage from "../assets/no-image-placeholder-6f3882e0.webp";
import ActiveInactiveSwitch from "../cookies/ActiveInactiveSwitch";
import StoreCookieDetailCard from "../inStore/StoreCookieDetailCard";
import AddImageForm from "../cookieImage/AddImageForm";
import DeleteImageButton from "../cookieImage/DeleteImageButton";
import { BAKED_ENDPOINT, DOUGHS_ENDPOINT, STORE_ENDPOINT } from "../constants";
import RecipeCard from "../cookieRecipe/RecipeCard";
import CookieDescriptionCard from "../cookies/CookieDescriptionCard";
import EditCookieDescriptionForm from "../cookies/EditCookieDescriptionForm";
import FormModal from "../components/FormModal";

const CookieDetailPage = () => {
  const { slug } = useParams();
  const { data: cookie, isLoading, error } = useCookie(slug!);

  if (isLoading) return <Spinner />;

  if (error) throw error;

  if (!cookie) {
    return null; // or display an error message or handle this case as needed
  }

  const imgUrl = cookie.image ? cookie.image : noImage;

  return (
    <SimpleGrid columns={{ base: 1, md: 2 }} spacing={5}>
      <GridItem>
        <HStack justifyContent="space-between">
          <Heading color="#941c3e" size="2xl" paddingY={3}>
            {cookie?.name}
          </Heading>
          <ActiveInactiveSwitch cookie={cookie} />
        </HStack>
        <HStack justifyContent="space-between" alignItems="center">
          <Box flex="1">
            {" "}
            <Center>
              <CookieDescriptionCard description={cookie?.description} />
            </Center>
          </Box>
          <FormModal header="Edit Cookie Description" isAddForm={false}>
            <EditCookieDescriptionForm
              id={cookie.id}
              oldDescription={cookie?.description}
              cookie={cookie}
            />
          </FormModal>
        </HStack>

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
        {cookie.image === null ? (
          <Flex justifyContent="flex-end">
            <FormModal header="Add Image" isAddForm={true}>
              <AddImageForm id={cookie.id} />
            </FormModal>
          </Flex>
        ) : (
          <Flex justifyContent="flex-end">
            <DeleteImageButton cookie={cookie} />
          </Flex>
        )}
        <Image
          margin="0 auto" // Center horizontally using margin auto
          display="block"
          padding={4}
          src={imgUrl}
          alt={cookie.description}
          maxW="50%"
          height="auto"
          borderRadius="full"
          overflow="hidden"
          boxShadow="dark-lg"
          background="#941c3e"
          p="2"
        />
        <Card
          padding={3}
          border={2}
          width="100%"
          background="inherit"
          variant="elevated"
          marginTop={5}
        >
          <RecipeCard id={cookie.id} name={cookie.name} notes={cookie.notes} />
        </Card>
      </GridItem>
    </SimpleGrid>
  );
};

export default CookieDetailPage;
