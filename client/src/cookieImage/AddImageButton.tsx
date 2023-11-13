import { Button } from "@chakra-ui/react";
import { FcAddImage } from "react-icons/fc";

interface Props {
  onClick: () => void;
}

const AddImageButton = ({ onClick }: Props) => {
  return (
    <Button onClick={onClick} variant='solid' colorScheme="pink" marginY={2}>
      <FcAddImage size="35px" />
    </Button>
  );
};

export default AddImageButton;