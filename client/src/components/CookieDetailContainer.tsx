import { Flex } from "@chakra-ui/react";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const CookieDetailContainer = ({ children }: Props) => {
  return (
    <Flex
      border="4px"
      borderColor="#6D214F"
      backgroundColor="#ebb6c8"
      borderRadius={10}
      overflow="hidden"
      marginY={3}
      padding={4}
      justifyContent='space-between'
      display="flex"
      flexDirection={{ base: "column", lg: "row" }}
    >
      {children}
    </Flex>
  );
};

export default CookieDetailContainer;
