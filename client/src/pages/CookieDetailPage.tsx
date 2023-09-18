import { useParams } from "react-router-dom";
import useCookie from "../hooks/useCookie";
import { Heading, Text, Spinner, Box, List, ListItem } from "@chakra-ui/react";
import useDoughs from "../hooks/useDoughs";

const CookieDetailPage = () => {
  const { slug } = useParams();
  const { data: cookie, isLoading, error } = useCookie(slug!);

  const { data: dough } = useDoughs(cookie?.id);

  if (isLoading) return <Spinner />;

  if (error) throw error;

  return (
    <>
      <Heading>{cookie?.name}</Heading>
      <Box>
        <Text fontSize="2xl" as="b">
          Doughs
        </Text>
        {dough?.pages.map((page) =>
          page.results.map((dough) => (
            <List>
              <ListItem>Date Added: {dough.date_added}</ListItem>
              <ListItem>Location: {dough.location}</ListItem>
              <ListItem>Quantity: {dough.quantity}</ListItem>
            </List>
          ))
        )}
      </Box>
    </>
  );
};

export default CookieDetailPage;
