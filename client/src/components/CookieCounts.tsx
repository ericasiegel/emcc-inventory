import { Heading, Text } from "@chakra-ui/layout";
import { Counts } from "../hooks/useCookies";

interface Props {
  counts?: Counts;
}

const CookieCounts = ({ counts }: Props) => {
  return (
    <>
      <Heading fontSize="md">Dough</Heading>
      <Text>{counts?.doughs}</Text>
      <Heading fontSize="md">Baked Cookies</Heading>
      <Text>
        Mega: {counts?.baked_cookies.mega} | Mini:{" "}
        {counts?.baked_cookies.mini}
      </Text>
      <Heading fontSize="md">In Store</Heading>
      <Text>
        Mega: {counts?.total_in_store?.mega} | Mini:{" "}
        {counts?.total_in_store?.mini}
      </Text>
    </>
  );
};

export default CookieCounts;
