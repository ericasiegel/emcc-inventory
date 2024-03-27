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
} from "@chakra-ui/react";
import useGetData from "../hooks/useGetData";
import { Location } from "./Location";
import { LOCATIONS_ENDOINT } from "../constants";

const LocationCard = () => {
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
    <Container color="#941c3e" width="100%" padding={4} borderTop='4px' borderBottom='4px'>
      <Center paddingBottom={3}>
        <Heading fontSize="3xl">Locations</Heading>
      </Center>
      {isLoading && <Spinner />}
      <UnorderedList>
        {locations?.map((location) => (
          <ListItem key={location.id}><Text fontSize='xl'>{location.title}</Text></ListItem>
        ))}
      </UnorderedList>
    </Container>
  );
};

export default LocationCard;
