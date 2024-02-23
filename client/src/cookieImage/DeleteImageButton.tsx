import { Alert, AlertIcon, Button } from "@chakra-ui/react";
import { FcRemoveImage } from "react-icons/fc";
import useDeleteImage from "./useDeleteImage";

interface Props {
  id: number;
}

const DeleteImageButton = ({ id }: Props) => {
  const { deleteImage, error, isLoading } = useDeleteImage(id);

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
        variant="outline"
        onClick={handleDeleteImage}
      >
        {isLoading ? "Deleting..." : <FcRemoveImage size="30px" />}
      </Button>
    </>
  );
};

export default DeleteImageButton;
