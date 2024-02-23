import { Button } from "@chakra-ui/react";
import { MdOutlineModeEdit } from "react-icons/md";

interface Props {
  onClick: () => void;
}

const EditButton = ({ onClick }: Props) => {
  return (
    <Button onClick={onClick} variant="unstyled" colorScheme="blue">
      <MdOutlineModeEdit color='blue' size="30px" />
    </Button>
  );
};

export default EditButton;
