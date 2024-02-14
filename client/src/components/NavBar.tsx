import { Image } from "@chakra-ui/image";
import { HStack, Heading, Text } from "@chakra-ui/layout";
import logo from "../assets/emcc-logo-white_1024x1024.webp";
import SearchInput from "./SearchInput";
import { Box } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <Box background="#cf6a87" paddingBottom={{ base: "3", sm: "3", md: "0" }}>
      <HStack
        justifyContent={{ base: "center", md: "space-between" }}
        alignItems="center"
        flexDirection={{ base: "column", md: "row" }}
      >
        <HStack>
          <Image margin={3} src={logo} boxSize="150px" />
          <Link to={""}>
            <Heading fontSize='5xl' color="#f9dfe8">Cookie Inventory</Heading>
          </Link>
        </HStack>
        <Box flex="1" textAlign="left">
          <HStack justifyContent="flex-start" paddingStart={10}>
          <Link to={""}>
            <Text color="#f9dfe8" fontSize="2xl">
              Cookies
            </Text>
          </Link>
          <Text fontSize='2xl' paddingX='30'>|</Text>
          <Link to={"pantry"}>
            <Text color="#f9dfe8" fontSize="2xl">Pantry</Text>
          </Link>
          </HStack>
        </Box>
        <SearchInput />
      </HStack>
    </Box>
  );
};

export default NavBar;
