import { HStack, ListItem, Text } from "@chakra-ui/layout";
import { FaCookie } from 'react-icons/fa'

interface BakeryListItemProps {
  label: string;
}

const BakeryListItem = ({ label }: BakeryListItemProps) => {
  return (
    <ListItem paddingY={2}>
      <HStack>
        <FaCookie color='#941c3e' size='30px' />
        <Text>{label}</Text>
      </HStack>
    </ListItem>
  );
};

export default BakeryListItem;

