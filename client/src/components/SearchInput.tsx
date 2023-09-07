import { Box, Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { useRef } from "react";
import { BsSearch } from "react-icons/bs";

interface Props {
    onSearch: (searchText: string) => void;
}

const SearchInput = ({onSearch}: Props) => {
  const ref = useRef<HTMLInputElement>(null);
  return (
    <Box marginX={3}>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          if (ref.current) onSearch(ref.current.value);
          
        }}
      >
        <InputGroup ml="auto">
          <InputLeftElement children={<BsSearch />} />
          <Input
            ref={ref}
            maxWidth="500px"
            borderRadius={20}
            placeholder="Search Cookies..."
            variant="filled"
          />
        </InputGroup>
      </form>
    </Box>
  );
};

export default SearchInput;
