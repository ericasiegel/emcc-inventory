import { HStack, Heading } from "@chakra-ui/layout";
import { Counts } from "../hooks/useCookies";
import CountBadge from "./CountBadge";

interface Props {
  counts: Counts;
}

const CookieCounts = ({ counts }: Props) => {

  return (
    <>
      <HStack>
        <Heading fontSize="lg">Dough</Heading>
        <CountBadge label='' count={counts.doughs} />
      </HStack>
      <HStack>
        <Heading fontSize="lg">Baked Cookies</Heading>
        <CountBadge label="Mega" count={counts.baked_cookies.mega} />
        <CountBadge label="Mini" count={counts.baked_cookies.mini} />
      </HStack>
      <HStack>
      <Heading fontSize="lg">Cookies In Store</Heading>
        <CountBadge label="Mega" count={counts.total_in_store.mega} />
        <CountBadge label="Mini" count={counts.total_in_store.mini} />
      </HStack>
    </>
  );
};

export default CookieCounts;
