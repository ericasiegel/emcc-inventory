import { useEffect, useState } from "react";
import useCookies, { Cookie } from "../hooks/useCookies";
import { Box, Center, Container, Heading, Spinner, Text } from "@chakra-ui/react";
import LowCountsBox from "./LowCountsBox";
import LowCounts from "./LowCounts";
import LowCountsTitleBox from "./LowCountsTitleBox.tsx";

const lowCountThreshold = 5;

const LowCountsSidebar = () => {
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
    
    if (error) return null;
  
    if (isLoading) return <Spinner />;

  return (
    <Container
      color="#941c3e"
      width="100%"
      padding={0}
      my={3}
    >
      <Center paddingY={6}>
        <Heading fontSize="3xl">Low Counts</Heading>
        <Text color="red">{error}</Text>
      </Center>
      <Box borderBottom="1px solid #941c3e" w="100%" />
      <LowCountsTitleBox title="Dough">
        <LowCountsBox>
          <LowCounts
            cookies={lowCookieCounts}
            filterCriteria={(cookie) =>
              cookie.counts.doughs <= lowCountThreshold
            }
            displayData={(cookie) => cookie.counts.doughs}
          />
        </LowCountsBox>
      </LowCountsTitleBox>

      <LowCountsTitleBox title="Baked Cookies">
      <LowCountsBox subTitle="Mega">
        <LowCounts
          cookies={lowCookieCounts}
          filterCriteria={(cookie) =>
            cookie.counts.baked_cookies.mega <= lowCountThreshold
          }
          displayData={(cookie) => cookie.counts.baked_cookies.mega}
        />
      </LowCountsBox>
      <LowCountsBox subTitle="Mini">
        <LowCounts
          cookies={lowCookieCounts}
          filterCriteria={(cookie) =>
            cookie.counts.baked_cookies.mini <= lowCountThreshold
          }
          displayData={(cookie) => cookie.counts.baked_cookies.mini}
        />
      </LowCountsBox>
      </LowCountsTitleBox>

      <LowCountsTitleBox title="Total In Store">
      <LowCountsBox subTitle="Mega">
        <LowCounts
          cookies={lowCookieCounts}
          filterCriteria={(cookie) =>
            cookie.counts.total_in_store.mega <= lowCountThreshold
          }
          displayData={(cookie) => cookie.counts.total_in_store.mega}
        />
      </LowCountsBox>
      <LowCountsBox subTitle="Mini">
        <LowCounts
          cookies={lowCookieCounts}
          filterCriteria={(cookie) =>
            cookie.counts.total_in_store.mini <= lowCountThreshold
          }
          displayData={(cookie) => cookie.counts.total_in_store.mini}
        />
      </LowCountsBox>
      </LowCountsTitleBox>
    </Container>
  );
};

export default LowCountsSidebar;
