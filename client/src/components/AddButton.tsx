import { Button } from "@chakra-ui/react";
import { IoAddCircleOutline } from "react-icons/io5";

interface Props {
  onClick: () => void;
}

const AddButton = ({ onClick }: Props) => {
  return (
    <Button onClick={onClick} variant="unstyled">
      <IoAddCircleOutline color='purple' size="35px" />
    </Button>
  );
};

export default AddButton;
