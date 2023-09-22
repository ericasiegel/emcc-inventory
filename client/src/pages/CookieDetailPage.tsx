import { useParams } from "react-router-dom";
import useCookie from "../hooks/useCookie";
import { Flex, Heading, Spinner } from "@chakra-ui/react";
import CookieDetailContainer from "../components/CookieDetailContainer";
import DetailCard from "../components/DetailCard";
import useDoughs from "../hooks/useDoughs";
import useBaked from "../hooks/useBaked";
import useStoreCookies from "../hooks/useStoreCookies";

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
      {/* DISPLAY Store Cookies divided up by size */}
      {/* CREATE recipe box */}
    </>
  );
};

export default CookieDetailPage;
