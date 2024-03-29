import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Button,
  Flex,
} from "@chakra-ui/react";
import { BsTrash } from "react-icons/bs";
import useDeleteCookies from "../hooks/useDeleteCookies";

interface Props {
  endpoint: string;
  id: number;
}

const DeleteButton = ({ endpoint, id }: Props) => {
  const { deleteItem, error, isLoading } = useDeleteCookies(endpoint);

  if (error) {
    // Check if the error status code is 405
    if (error.response && error.response.status === 405) {
      // Display a specific message for a 405 error
      return (
        <Alert status="error">
          <AlertIcon />
          <Flex direction="column">
            <AlertTitle>Cookie Can't Be Deleted</AlertTitle>
            <AlertDescription>
              Delete all associated doughs, baked and store cookies
            </AlertDescription>
          </Flex>
        </Alert>
      );
    } else {
      // Display a generic error message for all other errors
      return (
        <Alert status="error">
          <AlertIcon />
          <Flex direction="column">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              An error occurred while deleting.
            </AlertDescription>
          </Flex>
        </Alert>
      );
    }
  }

  return (
    <Button
      colorScheme="red"
      variant="unstyled"
      onClick={(event) => {
        event.preventDefault();
        deleteItem(id);
      }}
    >
      {isLoading ? "Deleting..." : <BsTrash size="30px" color="red" />}
    </Button>
  );
};

export default DeleteButton;
