import { Button } from "@chakra-ui/react";
import { CiEdit } from "react-icons/ci";

interface Props {
  onClick: () => void;
}

const EditButton = ({ onClick }: Props) => {
  return (
    <Button onClick={onClick} variant="unstyled" colorScheme="blue" marginY={2}>
      <CiEdit color='blue' size="35px" />
    </Button>
  );
};

export default EditButton;
