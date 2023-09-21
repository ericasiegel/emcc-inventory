import { Box } from "@chakra-ui/react";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const CookieDetailContainer = ({ children }: Props) => {
  return (
    <Box
      border="2px"
      borderColor="#c44569"
      backgroundColor="#fcc0d5"
      borderRadius={10}
      overflow="hidden"
      marginY={3}
      padding={4}
    >
      {children}
    </Box>
  );
};

export default CookieDetailContainer;
