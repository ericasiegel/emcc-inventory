import { useParams } from "react-router-dom";
import useCookie from "../hooks/useCookie";
import { Flex, Heading, Spinner } from "@chakra-ui/react";
import DoughCard from "../components/DoughCard";
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
      {/* image to right of counts */}
      <CookieDetailContainer>
        <DoughCard id={cookie?.id} counts={cookie?.counts} />
      </CookieDetailContainer>
      <CookieDetailContainer>
        <Flex justifyContent='space-between'>
          <BakedDetail id={cookie?.id} size="mega" count={cookie?.counts} />
          <BakedDetail id={cookie?.id} size="mini" count={cookie?.counts} />
        </Flex>
      </CookieDetailContainer>
      {/* DISPLAY Store Cookies divided up by size */}
      {/* CREATE recipe box */}
    </>
  );
};

export default CookieDetailPage;
