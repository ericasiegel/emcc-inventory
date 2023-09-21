import { Card, CardBody, CardHeader, Heading, ListItem, UnorderedList, Text } from '@chakra-ui/react';
import { format } from 'date-fns';
import useBaked from '../hooks/useBaked';

interface Props {
    id: number;
    size: string;
}

const BakedDetail = ({ id, size }: Props) => {
    const { data } = useBaked( id, size);
    const baked = data?.pages.flatMap((page) => page.results)

    let headingSize = 'Mini'

    if (size === 'mega')  headingSize = 'Mega'
    
    return (
        <Card backgroundColor="inherit" variant='unstyled' padding={4}>
          <CardHeader>
            <Heading fontSize="3xl">Baked {headingSize} Cookies </Heading>
          </CardHeader>
          <CardBody paddingTop={2}>
            <UnorderedList>
              {baked?.map((cookie) => (
                <ListItem key={cookie.id}>
                  <Text>
                    <strong>Location: </strong>
                    {cookie.location} <strong>Quantity: </strong>
                    {cookie.quantity} <strong>Date: </strong>
                    {format(new Date(cookie.date_added), "MM/dd/yyyy")}{" "}
                  </Text>
                </ListItem>
              ))}
            </UnorderedList>
          </CardBody>
        </Card>
      );
}

export default BakedDetail