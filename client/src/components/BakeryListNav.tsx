import { HStack, ListItem } from "@chakra-ui/layout";
import { Button, List } from "@chakra-ui/react";
import { FaCookie } from "react-icons/fa";

// interface Props {
//   onHeadingClick: (label: string) => void;
// }

const BakeryListNav = () => {
  const menu = ["Baked Cookies", "Doughs", "Cookies In Store"];

  // const handleHeadingClick = (label: string) => {
  //   onHeadingClick(label)
  // }

  return (
    <List px={5}>
      {menu.map((label) => (
        <ListItem paddingY={1} key={label}>
          <HStack>
            <FaCookie
              color="#941c3e"
              size="28px"
              opacity={label == "Inactive Cookies" ? "60%" : "100%"}
            />
            <Button
              onClick={() => console.log(label)}
              color="#941c3e"
              fontSize="lg"
              variant="link"
              whiteSpace="normal"
              textAlign="left"
              fontWeight='normal'
            >
              {label}
            </Button>
          </HStack>
        </ListItem>
      ))}
    </List>
  );
};

export default BakeryListNav;