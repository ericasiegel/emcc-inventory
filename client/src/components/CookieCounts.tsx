import { Heading } from "@chakra-ui/layout";
import { Counts } from "../hooks/useCookies";
import CountBadge from "./CountBadge";
import { Box, Center } from "@chakra-ui/react";

interface Props {
  counts: Counts;
}

const CookieCounts = ({ counts }: Props) => {
  return (
    <>
    <Box py={2}>
      <Center>
        <Heading fontSize="xl">Dough</Heading>
        <CountBadge label="" count={counts.doughs} />
      </Center>
    </Box>

    <Box py={2}>
      <Center>
        <Heading fontSize="xl">Baked Cookies</Heading>
      </Center>
      <Center>
        <CountBadge label="Mega" count={counts.baked_cookies.mega} />
        <CountBadge label="Mini" count={counts.baked_cookies.mini} />
      </Center>
    </Box>

    <Box py={2}>
      <Center>
        <Heading fontSize="xl">Cookies In Store</Heading>
      </Center>
      <Center>
        <CountBadge label="Mega" count={counts.total_in_store.mega} />
        <CountBadge label="Mini" count={counts.total_in_store.mini} />
      </Center>
    </Box>
    </>
  );
};

export default CookieCounts;
