import { Alert, AlertIcon, Button } from "@chakra-ui/react";
import { FcRemoveImage } from "react-icons/fc";
import APIClient from "../services/api-client";
import useMutateCookies from "../hooks/useMutateCookies";
import { Cookie } from "../entities/Cookie";

interface Props {
  slug: string;
  id: number;
}

const DeleteImageButton = ({ slug, id }: Props) => {
  const apiClient = new APIClient("cookies/");
  const {
    mutate: deleteItem,
    error,
    isLoading,
  } = useMutateCookies<Cookie, Error, number>(
    (id: number) => apiClient.deleteImage(slug, id).then((res) => res.data),
    () => {},
    ["cookies"]
  );

  return (
    <>
      {error && (
        <Alert status="error">
          <AlertIcon />
          {error.message}
        </Alert>
      )}
      <Button
        colorScheme="red"
        variant="unstyled"
        onClick={(event) => {
          event.preventDefault();
          deleteItem(id);
        }}
      >
        {isLoading ? "Deleting..." : <FcRemoveImage size="25px" />}
      </Button>
    </>
  );
};

export default DeleteImageButton;
