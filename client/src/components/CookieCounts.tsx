import { Badge, HStack, Heading, Text } from "@chakra-ui/layout";
import { Counts } from "../hooks/useCookies";

interface Props {
  counts: Counts;
}

const CookieCounts = ({ counts }: Props) => {
  const doughColor = counts.doughs > 5 ? "green" : "red";
  const bakedColorMega = counts.baked_cookies.mega > 5 ? "green" : "red";
  const bakedColorMini = counts.baked_cookies.mini > 5 ? "green" : "red";
  const storeColorMega = counts.total_in_store.mega > 5 ? "green" : "red";
  const storeColorMini = counts.total_in_store.mini > 5 ? "green" : "red";

  return (
    <>
      <HStack>
        <Heading fontSize="lg">Dough</Heading>
        <Badge fontSize="14px" paddingX={2} colorScheme={doughColor}>
          {counts.doughs}
        </Badge>
      </HStack>
      <HStack>
        <Heading fontSize="lg">Baked Cookies</Heading>
        <Text>Mega: </Text>
        <Badge fontSize="14px" paddingX={2} colorScheme={bakedColorMega}>
          {counts.baked_cookies.mega}
        </Badge>
        <Text>Mini:</Text>
        <Badge fontSize="14px" paddingX={2} colorScheme={bakedColorMini}>
          {counts.baked_cookies.mini}
        </Badge>
      </HStack>
      <HStack>
        <Heading fontSize="lg">In Store</Heading>
        <Text>Mega: </Text>
        <Badge fontSize="14px" paddingX={2} colorScheme={storeColorMega}>
          {counts.total_in_store.mega}
        </Badge>
        <Text>Mini:</Text>
        <Badge fontSize="14px" paddingX={2} colorScheme={storeColorMini}>
          {counts.total_in_store.mini}
        </Badge>
      </HStack>
    </>
  );
};

export default CookieCounts;
