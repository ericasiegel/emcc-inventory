import { HStack, List, ListItem, Text } from "@chakra-ui/layout";
import { FaCookie } from 'react-icons/fa'

const BakeryList = () => {
  return (
    <>
    <List>
      <ListItem paddingY={2}><HStack><FaCookie color='#941c3e' size='30px' /><Text>Cookies List</Text></HStack></ListItem>
      <ListItem paddingY={2}><HStack><FaCookie color='#941c3e' size='30px' /><Text>Baked Cookies</Text></HStack></ListItem>
      <ListItem paddingY={2}><HStack><FaCookie color='#941c3e' size='30px' /><Text>Doughs</Text></HStack></ListItem>
      <ListItem paddingY={2}><HStack><FaCookie color='#941c3e' size='30px' /><Text>Cookies In Store</Text></HStack></ListItem>
    </List>
    </>
  );
};

export default BakeryList;
