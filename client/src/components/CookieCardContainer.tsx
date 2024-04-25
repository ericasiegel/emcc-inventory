
import { Card } from "@chakra-ui/react";
import { ReactNode } from "react";

interface Props {
    children: ReactNode
}

const CookieCardContainer = ({ children }: Props) => {
  return (
    <Card
    variant='elevated'
      height="100%"
      borderRadius={10}
      // borderColor="black"
      backgroundColor='#fcc0d5'
      boxShadow="xl"
      overflow="hidden"
      _hover={{
        transform: 'scale(1.03)',
        transition: 'transform .15s ease-in'
      }}
    >
        {children}
    </Card>
  );
};

export default CookieCardContainer;
