import { Button } from "@chakra-ui/react";
import { PiCheckBold } from "react-icons/pi";

const CheckMarkButton = () => {
  return (
    <Button type="submit" variant="unstyled">
      <PiCheckBold size={30} color="green" />
    </Button>
  );
};

export default CheckMarkButton;
