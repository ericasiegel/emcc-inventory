import { HStack, ListItem } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/react";
import { FaCookie } from "react-icons/fa";

interface BakeryListItemProps {
  label: string;
}

const BakeryListItem = ({ label }: BakeryListItemProps) => {
  return (
    <ListItem paddingY={1}>
      <HStack>
        <FaCookie color="#941c3e" size="28px" />
        <Button
          onClick={() => console.log({ label })}
          color="black"
          fontSize="lg"
          variant="link"
        >
          {label}
        </Button>
      </HStack>
    </ListItem>
  );
};

export default BakeryListItem;
