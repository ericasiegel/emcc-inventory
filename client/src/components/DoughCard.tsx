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
import useDoughs from "../hooks/useDoughs";
import { Counts } from "../entities/Counts";
import ColorBadge from "./ColorBadge";

interface Props {
  id: number;
  counts: Counts;
}

const DoughCard = ({ id, counts }: Props) => {
    const { data } = useDoughs(id)
    const doughs= data?.pages.flatMap((page) => page.results)
  return (
    <Card backgroundColor="inherit" variant='unstyled'>
      <CardHeader>
        <Flex justifyContent='space-between'>
        <Heading fontSize="3xl">Doughs</Heading>
        <ColorBadge size='30px' count={counts.doughs} />
        </Flex>
      </CardHeader>
      <CardBody paddingTop={2}>
        <UnorderedList>
          {doughs?.map((dough) => (
            <ListItem key={dough.id}>
              <Text>
                <strong>Location: </strong>
                {dough.location} <strong>Quantity: </strong>
                {dough.quantity} <strong>Date: </strong>
                {format(new Date(dough.date_added), "MM/dd/yyyy")}{" "}
              </Text>
            </ListItem>
          ))}
        </UnorderedList>
      </CardBody>
    </Card>
  );
};

export default DoughCard;
