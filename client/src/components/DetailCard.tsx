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
import { Store } from "../entities/Store";

interface Props<T> {
  id: number;
  size?: string;
  count: Counts;
  countType?: "baked_cookies" | "total_in_store";
  dataFetcher: (id: number, size?: string) => { data?: { pages: { results: T[] }[] } };
  headingText: string;
}
// Type guard function to check if an object has the 'date_added' property
function hasDateAddedProperty<T extends object>(
  obj: T
): obj is T & { date_added: string } {
  return "date_added" in obj;
}
// Type guard function to check if an object has the 'location' property
function hasLocationProperty<T>(obj: T): obj is T & { location: string } {
  return !!obj && typeof obj === "object" && "location" in obj;
}
const DetailCard = <T extends Baked | Dough | Store>({
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
              {hasLocationProperty(item) && (
                  <>
                    <strong>Location: </strong>
                    {item.location}
                  </>
                )}
                <strong>  Quantity: </strong>
                {item.quantity} 
                <strong>  Date Added/Updated: </strong>
                {hasDateAddedProperty(item)
                  ? format(new Date(item.date_added), "MM/dd/yyyy")
                  : format(new Date((item as Store).last_updated),"MM/dd/yyyy")  // Cast to Store to access last_updated
                }
              </Text>
            </ListItem>
          ))}
        </UnorderedList>
      </CardBody>
    </Card>
  );
};

export default DetailCard;