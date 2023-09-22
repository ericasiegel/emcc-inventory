import {
  Card,
  CardBody,
  CardHeader,
  Heading,
  ListItem,
  UnorderedList,
  Text,
  Flex,
} from "@chakra-ui/react";
import { format } from "date-fns";
import ColorBadge from "./ColorBadge";
import { Counts } from "../entities/Counts";
import { Baked } from "../entities/Baked";
import { Dough } from "../entities/Dough";

interface Props<T> {
    id: number;
    size?: string;
    count: Counts;
    countType?: "baked_cookies" | "total_in_store";
    dataFetcher: (id: number, size?: string) => { data?: { pages: { results: T[] }[] } };
    headingText: string;
  }

const DetailCard = <T extends Baked | Dough>({
    id,
    size,
    count,
    countType,
    dataFetcher,
    headingText,
  }: Props<T>) => {

  const result = dataFetcher(id, size);
  const items = (result?.data?.pages.flatMap((page) => page.results) || [])

  let countSize =
    countType === "baked_cookies"
      ? size === "mega"
        ? count.baked_cookies.mega
        : count.baked_cookies.mini
      : size === "mega"
      ? count.total_in_store.mega
      : count.total_in_store.mini;
  // Use count.doughs when size is not specified
  if (!size) {
    countSize = count.doughs;
  }
  const headingSize = size === "mega" ? "Mega" : "Mini";

  const headerContent = size ? (
    <>
      <Heading fontSize="3xl">{headingText}</Heading>
      <Flex justifyContent="space-between">
        <Heading fontSize="2xl">{headingSize}</Heading>
        <ColorBadge size="30px" count={countSize} />
      </Flex>
    </>
  ) : (
    <Flex justifyContent="space-between">
      <Heading fontSize="3xl">{headingText}</Heading>
      <ColorBadge size="30px" count={countSize} />
    </Flex>
  );


  return (
    <Card backgroundColor="inherit" variant="unstyled" padding={4}>
      <CardHeader>{headerContent}</CardHeader>
      <CardBody paddingTop={2}>
        <UnorderedList>
          {items?.map((item) => (
            <ListItem key={item.id}>
              <Text>
                <strong>Location: </strong>
                {item.location} <strong>Quantity: </strong>
                {item.quantity} <strong>Date: </strong>
                {format(new Date(item.date_added), "MM/dd/yyyy")}{" "}
              </Text>
            </ListItem>
          ))}
        </UnorderedList>
      </CardBody>
    </Card>
  );
};

export default DetailCard;
