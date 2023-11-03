import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Button,
  Flex,
} from "@chakra-ui/react";
import { BsTrash } from "react-icons/bs";
import APIClient from "../services/api-client";
import useMutateCookies from "../hooks/useMutateCookies";
import { Cookie } from "../entities/Cookie";
import { Dough } from "../entities/Dough";
import { Baked } from "../entities/Baked";
import { AxiosError } from "axios";
import { CACHE_KEY_COOKIES } from "../constants";

interface Props {
  endpoint: string;
  id: number;
}

const DeleteButton = ({ endpoint, id }: Props) => {
  const apiClient = new APIClient(endpoint);

  const {
    mutate: deleteItem,
    error,
    isLoading,
  } = useMutateCookies<{data: Cookie | Dough | Baked}, AxiosError, number>(
    (id: number) => apiClient.delete(id).then((res) => res.data),
    () => {},
    [CACHE_KEY_COOKIES, endpoint]
  );

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
            <AlertDescription>An error occurred while deleting.</AlertDescription>
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
      {isLoading ? "Deleting..." : <BsTrash size="25px" color="red" />}
    </Button>
  );
};

export default DeleteButton;
