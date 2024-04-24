import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Center,
} from "@chakra-ui/react";

const IngredientCard = () => {
  return (
    <Center>
      <Alert
        status="info"
        variant="subtle"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        textAlign="center"
        height="200px"
        width="50%"
      >
        <AlertIcon boxSize="40px" mr={0} />
        <AlertTitle m={4} fontSize="3xl">
          Welcome to the Pantry!
        </AlertTitle>
        <AlertDescription maxWidth="md" fontSize='xl'>
          We are working hard on this feature, and it will be coming soon!
        </AlertDescription>
      </Alert>
    </Center>
  );
};

export default IngredientCard;
