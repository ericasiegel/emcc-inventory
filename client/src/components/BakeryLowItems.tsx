import { useEffect, useState } from "react";
import useCookies, { Cookie } from "../hooks/useCookies";
import {
  Box,
  Center,
  Container,
  HStack,
  Heading,
  List,
  ListItem,
  Text,
} from "@chakra-ui/react";
import { LiaCookieBiteSolid } from "react-icons/lia";

const lowCountThreshold = 5;

const BakeryLowItems = () => {
  const { data, isLoading, error } = useCookies();
  const [lowCookieCounts, setLowCookieCounts] = useState<Cookie[]>([]);

  useEffect(() => {
    if (data && !isLoading) {
      const lowCounts = data.filter((cookie) => {
        const { doughs, baked_cookies, total_in_store } = cookie.counts;
        return (
          doughs <= lowCountThreshold ||
          baked_cookies.mega <= lowCountThreshold ||
          baked_cookies.mini <= lowCountThreshold ||
          total_in_store.mega <= lowCountThreshold ||
          total_in_store.mini <= lowCountThreshold
        );
      });
      setLowCookieCounts(lowCounts);
    }
  }, [data, isLoading]);

  return (
    <Container
      color="#941c3e"
      width="100%"
      border="1px"
      borderRadius={10}
      padding={0}
      my={3}
    >
      <Text>{error}</Text>
      <Center paddingY={6}>
        <Heading
          //   borderBottom="1px solid black"
          fontSize="3xl"
        >
          Low Counts
        </Heading>
      </Center>
      <Box borderBottom="1px solid #941c3e" w="100%" />

      <Center paddingY={4}>
        <Heading as="i" fontSize="xl">
          Doughs
        </Heading>
      </Center>
      <Box color="black" padding={1}>
        <List>
          {lowCookieCounts
            .filter((cookie) => cookie.counts.doughs <= lowCountThreshold)
            .map((cookie) => (
              <ListItem key={cookie.id}>
                <HStack spacing={2}>
                  <LiaCookieBiteSolid color="#941c3e" size="28px" />
                  <Text>{cookie.name}: </Text>
                  <Text as="b" color="red">
                    {cookie.counts.doughs}
                  </Text>
                </HStack>
              </ListItem>
            ))}
        </List>
      </Box>

      <Box
        color="black"
        borderBottom="1px solid #941c3e"
        w="100%"
        paddingTop={3}
      />
      <Center paddingY={4}>
        <Heading as="i" fontSize="xl">
          Baked Cookies
        </Heading>
      </Center>
      <Box color="black" padding={1}>
        <Heading fontSize="lg" as="b">
          Mega
        </Heading>
        <List paddingBottom={2}>
          {lowCookieCounts
            .filter(
              (cookie) => cookie.counts.baked_cookies.mega <= lowCountThreshold
            )
            .map((cookie) => (
              <ListItem paddingX={1} key={cookie.id}>
                <HStack spacing={2}>
                  <LiaCookieBiteSolid color="#941c3e" size="28px" />
                  <Text>{cookie.name}: </Text>
                  <Text as="b" color="red">
                    {cookie.counts.doughs}
                  </Text>
                </HStack>
              </ListItem>
            ))}
        </List>
        <Heading fontSize="lg" as="b">
          Mini
        </Heading>
        <List paddingBottom={2}>
          {lowCookieCounts
            .filter(
              (cookie) => cookie.counts.baked_cookies.mini <= lowCountThreshold
            )
            .map((cookie) => (
              <ListItem paddingX={1} key={cookie.id}>
                <HStack spacing={2}>
                  <LiaCookieBiteSolid color="#941c3e" size="28px" />
                  <Text>{cookie.name}: </Text>
                  <Text as="b" color="red">
                    {cookie.counts.baked_cookies.mini}
                  </Text>
                </HStack>
              </ListItem>
            ))}
        </List>
      </Box>

      <Box borderBottom="1px solid #941c3e" w="100%" paddingTop={3} />
      <Center paddingY={4}>
        <Heading as="i" fontSize="xl">
          Cookies In Store
        </Heading>
      </Center>
      <Box color="black" padding={1}>
        <Heading fontSize="lg" as="b">
          Mega
        </Heading>
        <List paddingBottom={2}>
          {lowCookieCounts
            .filter(
              (cookie) => cookie.counts.total_in_store.mega <= lowCountThreshold
            )
            .map((cookie) => (
              <ListItem paddingX={1} key={cookie.id}>
                <HStack spacing={2}>
                  <LiaCookieBiteSolid color="#941c3e" size="28px" />
                  <Text>{cookie.name}: </Text>
                  <Text as="b" color="red">
                    {cookie.counts.total_in_store.mega}
                  </Text>
                </HStack>
              </ListItem>
            ))}
        </List>
        <Heading fontSize="lg" as="b">
          Mini
        </Heading>
        <List paddingBottom={2}>
          {lowCookieCounts
            .filter(
              (cookie) => cookie.counts.total_in_store.mini <= lowCountThreshold
            )
            .map((cookie) => (
              <ListItem paddingX={1} key={cookie.id}>
                <HStack spacing={2}>
                  <LiaCookieBiteSolid color="#941c3e" size="28px" />
                  <Text>{cookie.name}: </Text>
                  <Text as="b" color="red">
                    {cookie.counts.total_in_store.mini}
                  </Text>
                </HStack>
              </ListItem>
            ))}
        </List>
      </Box>
    </Container>
  );
};

export default BakeryLowItems;