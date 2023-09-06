import { Box, Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { BsSearch } from "react-icons/bs";

const SearchInput = () => {
  return (
    <Box marginX={3}>
      <InputGroup ml="auto">
        <InputLeftElement children={<BsSearch />} />
        <Input
          maxWidth="500px"
          borderRadius={20}
          placeholder="Search Cookies..."
          variant="filled"
        />
      </InputGroup>
    </Box>
  );
};

export default SearchInput;
