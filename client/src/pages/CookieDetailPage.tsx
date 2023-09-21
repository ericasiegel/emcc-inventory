import { useParams } from "react-router-dom";
import useCookie from "../hooks/useCookie";
import { Flex, Heading, Spinner } from "@chakra-ui/react";
import DoughCard from "../components/DoughCard";
import CookieCounts from "../components/CookieCounts";
import CookieDetailContainer from "../components/CookieDetailContainer";
import BakedDetail from "../components/BakedDetail";

const CookieDetailPage = () => {
  const { slug } = useParams();
  const { data: cookie, isLoading, error } = useCookie(slug!);

  if (isLoading) return <Spinner />;

  if (error) throw error;

  if (!cookie) {
    return null; // or display an error message or handle this case as needed
  }

  return (
    <>
      <Heading>{cookie?.name}</Heading>
      <CookieDetailContainer>
        <CookieCounts counts={cookie?.counts} />
      </CookieDetailContainer>
      {/* image to right of counts */}
      <CookieDetailContainer>
        <DoughCard id={cookie?.id} />
      </CookieDetailContainer>
      <CookieDetailContainer>
        <Flex justifyContent='space-between'>
          <BakedDetail id={cookie?.id} size="mega" />
          <BakedDetail id={cookie?.id} size="mini" />
        </Flex>
      </CookieDetailContainer>
      {/* DISPLAY Store Cookies divided up by size */}
      {/* DISPLAY image */}
      {/* CREATE recipe box */}
    </>
  );
};

export default CookieDetailPage;
