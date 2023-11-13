import { Alert, AlertIcon, Button } from "@chakra-ui/react";
import { FcRemoveImage } from "react-icons/fc";
import useDeleteImage from "./useDeleteImage";

interface Props {
  slug: string;
  id: number;
}

const DeleteImageButton = ({ slug, id }: Props) => {
  const { deleteImage, error, isLoading } = useDeleteImage(slug);

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
          deleteImage(id);
        }}
      >
        {isLoading ? "Deleting..." : <FcRemoveImage size="25px" />}
      </Button>
    </>
  );
};

export default DeleteImageButton;
