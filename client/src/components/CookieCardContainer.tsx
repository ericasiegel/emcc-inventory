import { Box } from "@chakra-ui/layout";
import { ReactNode } from "react";

interface Props {
    children: ReactNode
}

const CookieCardContainer = ({ children }: Props) => {
  return (
    <Box
      height="100%"
      borderRadius={10}
      backgroundColor='#fcc0d5'
      outline='1px'
      boxShadow="xl"
      overflow="hidden"
      _hover={{
        transform: 'scale(1.03)',
        transition: 'transform .15s ease-in'
      }}
    >
        {children}
    </Box>
  );
};

export default CookieCardContainer;
