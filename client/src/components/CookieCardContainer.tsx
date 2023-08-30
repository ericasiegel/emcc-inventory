import { Box } from "@chakra-ui/layout";
import { ReactNode } from "react";

interface Props {
    children: ReactNode
}

const CookieCardContainer = ({ children }: Props) => {
  return (
    <Box
      maxWidth="300px"
      height="100%"
      borderRadius={10}
      backgroundColor='#f99abb'
      boxShadow="dark-lg"
      overflow="hidden"
    >
        {children}
    </Box>
  );
};

export default CookieCardContainer;
