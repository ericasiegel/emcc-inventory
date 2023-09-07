import { useEffect, useState } from "react";
import { Cookie } from "../hooks/useCookies";
import { Box, Center, Container, Heading, Spinner } from "@chakra-ui/react";
import LowCountsBox from "./LowCountsBox";
import LowCounts from "./LowCounts";
import LowCountsTitleBox from "./LowCountsTitleBox.tsx";

const lowCountThreshold = 5;

const LowCountsSidebar = ({ lowCookieCounts }: { lowCookieCounts: Cookie[] }) => {
  const [isLoadingLocal, setIsLoadingLocal] = useState(true);
  const [processedLowCounts, setProcessedLowCounts] = useState<Cookie[]>([]);

  useEffect(() => {
    if (lowCookieCounts.length > 0) {
      const lowCounts = lowCookieCounts.filter((cookie) => {
        const { doughs, baked_cookies, total_in_store } = cookie.counts;
        return (
          doughs <= lowCountThreshold ||
          baked_cookies.mega <= lowCountThreshold ||
          baked_cookies.mini <= lowCountThreshold ||
          total_in_store.mega <= lowCountThreshold ||
          total_in_store.mini <= lowCountThreshold
        );
      });
      // console.log(processedLowCounts)
      // Processed the low counts data
      setProcessedLowCounts(lowCounts);
      setIsLoadingLocal(false); // Set loading state to false when data is processed
    }
  }, [lowCookieCounts]);
  
  // Handle error and loading states here
  
  if (lowCookieCounts === null || isLoadingLocal) {
    return <Spinner />; // Render a loading state or fallback
  }


  return (
    <Container
      color="#941c3e"
      width="100%"
      padding={0}
      my={3}
    >
      <Center paddingY={6}>
        <Heading fontSize="3xl">Low Counts</Heading>
      </Center>
      <Box borderBottom="1px solid #941c3e" w="100%" />
      <LowCountsTitleBox title="Dough">
        <LowCountsBox>
          <LowCounts
            cookies={processedLowCounts}
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
          cookies={processedLowCounts}
          filterCriteria={(cookie) =>
            cookie.counts.baked_cookies.mega <= lowCountThreshold
          }
          displayData={(cookie) => cookie.counts.baked_cookies.mega}
        />
      </LowCountsBox>
      <LowCountsBox subTitle="Mini">
        <LowCounts
          cookies={processedLowCounts}
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
          cookies={processedLowCounts}
          filterCriteria={(cookie) =>
            cookie.counts.total_in_store.mega <= lowCountThreshold
          }
          displayData={(cookie) => cookie.counts.total_in_store.mega}
        />
      </LowCountsBox>
      <LowCountsBox subTitle="Mini">
        <LowCounts
          cookies={processedLowCounts}
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
