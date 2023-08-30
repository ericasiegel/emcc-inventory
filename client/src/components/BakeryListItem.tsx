import { HStack, ListItem } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/react";
import { FaCookie } from "react-icons/fa";

interface BakeryListItemProps {
  label: string;
}

const BakeryListItem = ({ label }: BakeryListItemProps) => {
  const labelOpacity = label === 'Inactive Cookies' ? '60%' : '100%';
  return (
    <ListItem paddingY={1}>
      <HStack>
        <FaCookie color="#941c3e" size="28px" opacity={labelOpacity} />
        <Button
          onClick={() => console.log({ label })}
          color='black'
          opacity={labelOpacity}
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
