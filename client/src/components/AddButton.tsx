import { Button } from "@chakra-ui/react";
import { IoAddCircleSharp } from "react-icons/io5";

interface Props {
  onClick: () => void;
}

const AddButton = ({ onClick }: Props) => {
  return (
    <Button onClick={onClick} variant='outline' colorScheme="pink" marginY={2}>
      <IoAddCircleSharp size="25px" />
    </Button>
  );
};

export default AddButton;
