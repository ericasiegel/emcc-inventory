import {
  Card,
  CardBody,
  CardHeader,
  Heading,
  ListItem,
  UnorderedList,
  Text,
} from "@chakra-ui/react";
import { format } from "date-fns";
import useDoughs from "../hooks/useDoughs";

interface Props {
  id: number;
}

const DoughCard = ({ id }: Props) => {
    const { data } = useDoughs(id)
    const doughs= data?.pages.flatMap((page) => page.results)

  return (
    <Card backgroundColor="inherit" variant='unstyled'>
      <CardHeader>
        <Heading fontSize="3xl">Doughs</Heading>
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
