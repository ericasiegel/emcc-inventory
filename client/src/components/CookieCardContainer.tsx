import { Box } from "@chakra-ui/layout";
import { ReactNode } from "react";

interface Props {
    children: ReactNode
}

const CookieCardContainer = ({ children }: Props) => {
  return (
    <Box
      width="350px"
      borderRadius={10}
      backgroundColor='#f78fb3'
      boxShadow="dark-lg"
      overflow="hidden"
    >
        {children}
    </Box>
  );
};

export default CookieCardContainer;
