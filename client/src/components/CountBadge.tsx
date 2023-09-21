import { HStack, Text } from "@chakra-ui/layout";
import ColorBadge from "./ColorBadge";

interface Props {
  label: string;
  count: number;
}

const CountBadge = ({ label, count }: Props) => {

  return (
    <HStack px={2}>
      <Text fontSize="md" as="i">
        {label}:
      </Text>
      <ColorBadge size="16px" count={count} />
    </HStack>
  );
};

export default CountBadge;
