import { Image } from '@chakra-ui/image'
import { HStack, Heading} from '@chakra-ui/layout'
import logo from '../assets/emcc-logo-white_1024x1024.webp';
import SearchInput from './SearchInput';
import { Box } from '@chakra-ui/react';


const NavBar = () => {
  return (
    <Box background='#cf6a87' paddingBottom={{base: '3', sm: "3", md: "0"}}>
      <HStack
        justifyContent={{ base: "center", md: "space-between" }}
        alignItems="center"
        flexDirection={{ base: "column", md: "row" }}
      >
        <HStack>
          <Image margin={3} src={logo} boxSize="100px" />
          <Heading color="#f9dfe8">Cookie Inventory</Heading>
        </HStack>
        <SearchInput />
      </HStack>
    </Box>
  );
};

export default NavBar