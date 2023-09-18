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
      {/* DISPLAY counts */}
      {/* Doughs - create new component */}
      <Box>
        <Text fontSize="2xl" as="b">
          Doughs
        </Text>
        {dough?.pages.map((page) =>
          page.results.map((dough) => (
            <List key={dough.id} padding={2}>
              <ListItem><Text fontSize='lg' as='b'>Location: </Text>{dough.location}</ListItem>
              <ListItem><Text fontSize='lg' as='b'>Date Added: </Text>{dough.date_added}</ListItem>
              <ListItem><Text fontSize='lg' as='b'>Quantity: </Text>{dough.quantity}</ListItem>
            </List>
          ))
        )}
      </Box>
      {/* DISPLAY Baked Cookies divided up by size */}
      {/* DISPLAY Store Cookies divided up by size */}
    </>
  );
};

export default CookieDetailPage;
