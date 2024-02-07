import {
  Card,
  CardBody,
  CardHeader,
  Heading,
  ListItem,
  UnorderedList,
  Text,
  Flex,
  HStack,
} from "@chakra-ui/react";
import { format } from "date-fns";
import ColorBadge from "../counts/ColorBadge";
import { Counts } from "../counts/Counts";
import { Baked } from "../baked/Baked";
import { Dough } from "../dough/Dough";
import DeleteButton from "./DeleteButton";
import AddDoughForm from "../dough/AddDoughForm";
import AddFormModal from "./AddFormModal";
import AddBakedCookiesForm from "../baked/AddBakedCookiesForm";
import useGetData from "../hooks/useGetData";

interface Props {
  id: number;
  size?: string;
  count: Counts;
  headingText: string;
  endpoint: string;
}

const DetailCard = <T extends Baked | Dough>({
  id,
  size,
  count,
  headingText,
  endpoint,
}: Props) => {
  const result = useGetData<T>({endpoint, id, size});
  const items = result?.data?.pages.flatMap((page) => page.results) || [];

  let countSize =
    size === "mega" ? count.baked_cookies.mega : count.baked_cookies.mini;
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

  let chooseForm;

  switch (endpoint) {
    case "doughs":
      chooseForm = <AddDoughForm id={id} counts={countSize} />;
      break;
    case "bakedcookies":
      chooseForm = <AddBakedCookiesForm id={id} cookieSize={size!} />;
      break;
    default:
      chooseForm = null;
      break;
  }

  return (
    <Card
      backgroundColor="inherit"
      variant="unstyled"
      padding={4}
      minW={endpoint === "doughs" ? "100%" : "50%"}
    >
      <CardHeader>
        {headerContent}
        <AddFormModal header="">{chooseForm}</AddFormModal>
      </CardHeader>
      <CardBody paddingTop={2}>
        <UnorderedList>
          {items?.map((item) => (
            <ListItem
              key={item.id}
              flexDirection={{ base: "column", md: "row" }}
            >
              <HStack justifyContent="space-between" width="100%">
                <Text>
                  <strong>Location: </strong>
                  {item.location}

                  <strong> Quantity: </strong>
                  {item.quantity}

                  <strong> Date Added: </strong>
                  {format(new Date(item.date_added), "MM/dd/yyyy")}
                </Text>
                <DeleteButton id={item.id} endpoint={endpoint} />
              </HStack>
            </ListItem>
          ))}
        </UnorderedList>
      </CardBody>
    </Card>
  );
};

export default DetailCard;
