import { useEffect, useState } from "react";
import useCookies from "../cookies/useCookies.ts";
import { Cookie } from "../cookies/Cookie.ts";
import {
  Box,
  Center,
  Container,
  Heading,
  Spinner,
  Text,
} from "@chakra-ui/react";
import LowCountsBox from "./LowCountsBox.tsx";
import LowCounts from "./LowCounts.tsx";
import LowCountsTitleBox from "./LowCountsTitleBox.tsx";

const lowCountThreshold = 5;

const LowCountsSidebar = () => {
  const { data, isLoading, error } = useCookies();
  const [processedLowCounts, setProcessedLowCounts] = useState<Cookie[]>([]);

  useEffect(() => {
    if (data && data.pages) {
      const lowCounts = data.pages
        .flatMap((page) => page.results)
        .filter((cookie) => {
          const { doughs, baked_cookies, total_in_store } = cookie.counts || {};
          return (
            doughs !== undefined && doughs <= lowCountThreshold ||
            (baked_cookies?.mega !== undefined && baked_cookies?.mega <= lowCountThreshold) || 
            (baked_cookies?.mini !== undefined && baked_cookies?.mini <= lowCountThreshold) || 
            (total_in_store?.mega !== undefined && total_in_store?.mega <= lowCountThreshold) || 
            (total_in_store?.mini !== undefined && total_in_store?.mini <= lowCountThreshold) 
          );
        });
      setProcessedLowCounts(lowCounts);
    }
  }, [data]);

  if (error) return <Text>{error.message}</Text>;

  return (
    <Container color="#941c3e" width="100%" padding={0} my={3}>
      {isLoading && <Spinner />}
      <Center paddingY={6}>
        <Heading fontSize="3xl">Low Counts</Heading>
      </Center>
      <Box borderBottom="1px solid #941c3e" w="100%" />
      <LowCountsTitleBox title="Dough">
        <LowCountsBox>
          <LowCounts
            cookies={processedLowCounts}
            filterCriteria={(cookie) =>
              cookie.counts?.doughs !== undefined && cookie.counts.doughs <= lowCountThreshold
            }
            displayData={(cookie) => cookie.counts?.doughs || 0}
          />
        </LowCountsBox>
      </LowCountsTitleBox>

      <LowCountsTitleBox title="Baked Cookies">
        <LowCountsBox subTitle="Mega">
          <LowCounts
            cookies={processedLowCounts}
            filterCriteria={(cookie) =>
              cookie.counts?.baked_cookies.mega !== undefined && cookie.counts.baked_cookies.mega <= lowCountThreshold
            }
            displayData={(cookie) => cookie.counts?.baked_cookies.mega || 0}
          />
        </LowCountsBox>
        <LowCountsBox subTitle="Mini">
          <LowCounts
            cookies={processedLowCounts}
            filterCriteria={(cookie) =>
              cookie.counts?.baked_cookies.mini !== undefined && cookie.counts.baked_cookies.mini <= lowCountThreshold
            }
            displayData={(cookie) => cookie.counts?.baked_cookies.mini || 0}
          />
        </LowCountsBox>
      </LowCountsTitleBox>

      <LowCountsTitleBox title="Total In Store">
        <LowCountsBox subTitle="Mega">
          <LowCounts
            cookies={processedLowCounts}
            filterCriteria={(cookie) =>
              cookie.counts?.total_in_store.mega !== undefined && cookie.counts.total_in_store.mega <= lowCountThreshold
            }
            displayData={(cookie) => cookie.counts?.total_in_store.mega || 0}
          />
        </LowCountsBox>
        <LowCountsBox subTitle="Mini">
          <LowCounts
            cookies={processedLowCounts}
            filterCriteria={(cookie) =>
              cookie.counts?.total_in_store.mini !== undefined && cookie.counts.total_in_store.mini <= lowCountThreshold
            }
            displayData={(cookie) => cookie.counts?.total_in_store.mini || 0}
          />
        </LowCountsBox>
      </LowCountsTitleBox>
    </Container>
  );
};

export default LowCountsSidebar;
