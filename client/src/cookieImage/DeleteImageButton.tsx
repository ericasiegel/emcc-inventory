import { Alert, AlertIcon, Button } from "@chakra-ui/react";
import { FcRemoveImage } from "react-icons/fc";
import { Cookie } from "../cookies/Cookie";
import useDeleteImage from "./useDeleteImage";

interface Props {
  cookie: Cookie
}

const DeleteImageButton = ({ cookie }: Props) => {
  const { deleteImage, error, isLoading } = useDeleteImage(cookie.id);

  const handleDeleteImage = () => {
    deleteImage({
      delete_image: true,
    })
  }

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
        onClick={handleDeleteImage}
      >
        {isLoading ? "Deleting..." : <FcRemoveImage size="25px" />}
      </Button>
    </>
  );
};

export default DeleteImageButton;
