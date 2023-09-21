import { Card, CardBody, CardHeader, Heading, ListItem, UnorderedList, Text, Flex } from '@chakra-ui/react';
import { format } from 'date-fns';
import useBaked from '../hooks/useBaked';
import ColorBadge from './ColorBadge';
import { Counts } from '../entities/Counts';

interface Props {
    id: number;
    size: string;
    count: Counts
}

const BakedDetail = ({ id, size, count }: Props) => {
    const { data } = useBaked( id, size);
    const baked = data?.pages.flatMap((page) => page.results)

    const headingSize = size === 'mega' ? 'Mega' : 'Mini'
    const countSize = size === 'mega' ? count.baked_cookies.mega : count.baked_cookies.mini
    
    return (
        <Card backgroundColor="inherit" variant='unstyled' padding={4}>
          <CardHeader>
            <Flex justifyContent='space-between'>
            <Heading fontSize="3xl">Baked {headingSize} Cookies </Heading>
            <ColorBadge size='30px' count={countSize} />
            </Flex>
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