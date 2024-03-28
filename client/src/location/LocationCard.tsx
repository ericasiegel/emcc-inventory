import {
  Container,
  Spinner,
  Center,
  Heading,
  Alert,
  AlertIcon,
  Text,
  UnorderedList,
  ListItem,
  HStack,
} from "@chakra-ui/react";
import useGetData from "../hooks/useGetData";
import { Location } from "./Location";
import { LOCATIONS_ENDOINT } from "../constants";
import AddLocationForm from "./AddLocationForm";
import { useState } from "react";
import AddButton from "../components/AddButton";
import DeleteButton from "../components/DeleteButton";

const LocationCard = () => {
  const [openForm, setOpenForm] = useState(false);

  const {
    data: getLocations,
    isLoading,
    error,
  } = useGetData<Location>({
    endpoint: LOCATIONS_ENDOINT,
    id: 0,
  });
  const locations = getLocations?.pages.flatMap((page) => page.results);

  if (error)
    return (
      <Alert status="error">
        <AlertIcon />
        <Text size="lg">Locations could not be retrieved</Text>
      </Alert>
    );

  return (
    <Container
      color="#941c3e"
      width="100%"
      padding={4}
      borderTop="4px"
      borderBottom="4px"
    >
      <Center paddingBottom={3}>
        <Heading fontSize="3xl">Locations</Heading>
      </Center>
      <Center>
        {openForm ? (
          <AddLocationForm closeForm={() => setOpenForm(false)} />
        ) : (
          <AddButton onClick={() => setOpenForm(true)} />
        )}
      </Center>
      {isLoading && <Spinner />}
      <UnorderedList>
        {locations?.map((location) => (
          <ListItem key={location.id}>
            <HStack justifyContent='space-between'>
              <Text fontSize="xl">{location.title}</Text>
              <DeleteButton endpoint={LOCATIONS_ENDOINT} id={location.id} />
            </HStack>
          </ListItem>
        ))}
      </UnorderedList>
      {/* add Alert box for reason why it can't be deleted if there are items present */}
    </Container>
  );
};

export default LocationCard;
