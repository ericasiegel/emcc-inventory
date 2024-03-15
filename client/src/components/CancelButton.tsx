import { Button } from "@chakra-ui/react";
import { MdOutlineCancel } from "react-icons/md";

interface Props {
  onClick: () => void;
}

const CancelButton = ({ onClick }: Props) => {
  return (
    <Button onClick={onClick} variant="unstyled" colorScheme="pink">
      <MdOutlineCancel color='red' size="35px" />
    </Button>
  );
};

export default CancelButton;