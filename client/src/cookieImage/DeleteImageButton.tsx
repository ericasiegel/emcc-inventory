import { Alert, AlertIcon, Button } from "@chakra-ui/react";
import { FcRemoveImage } from "react-icons/fc";
import useEditData from "../hooks/useEditData";
import { DeleteImage } from "../cookies/Cookie";
import { COOKIES_ENDPOINT } from "../constants";

interface Props {
  id: number;
}

const DeleteImageButton = ({ id }: Props) => {
  // console.log(id);
  
 const { editData: deleteImage, error, isLoading} = useEditData<DeleteImage>({ id: id, endpoint: COOKIES_ENDPOINT})

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
