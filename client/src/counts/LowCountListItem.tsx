import { ListItem, HStack, Text } from "@chakra-ui/react";
import { LiaCookieBiteSolid } from "react-icons/lia";

interface Props {
    name: string;
    count: number;
}

const LowCountListItem = ({ name, count }: Props) => {
  return (
    <ListItem paddingX={1}>
      <HStack spacing={2}>
        <LiaCookieBiteSolid color="#941c3e" size="28px" />
        <Text>{name}: </Text>
        <Text as="b" color="red">
          {count}
        </Text>
      </HStack>
    </ListItem>
  );
};

export default LowCountListItem;
