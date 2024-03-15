import { Button } from "@chakra-ui/react";
import { FaRegCircleCheck } from "react-icons/fa6";

const CheckMarkButton = () => {
  return (
    <Button type="submit" variant="unstyled" ms={3}>
      <FaRegCircleCheck size={30} color="green" />
    </Button>
  );
};

export default CheckMarkButton;
