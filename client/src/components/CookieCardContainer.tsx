
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
      // borderRadius={10}
      // borderColor="black"
      // backgroundColor='#cf6a87'
      backgroundColor='#ebb6c8'
      boxShadow="xl"
      overflow="hidden"
      p={1}
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
