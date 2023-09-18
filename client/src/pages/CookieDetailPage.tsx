import { useParams } from "react-router-dom";
import useCookie from "../hooks/useCookie";
import { Heading, Spinner } from "@chakra-ui/react";

const CookieDetailPage = () => {
  const { slug } = useParams();
  const { data: cookie, isLoading, error } = useCookie(slug!);
  

  if (isLoading) return <Spinner />;

  if (error) throw error;

  return (
    <>
      <Heading>{cookie?.name}</Heading>
    </>
  );
};

export default CookieDetailPage;
