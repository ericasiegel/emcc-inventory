import { HStack, ListItem } from "@chakra-ui/layout";
import { Button, List } from "@chakra-ui/react";
import { FaCookie } from "react-icons/fa";

const BakeryListItem = () => {
  const menu = [
    "Active Cookies List",
    "Baked Cookies",
    "Doughs",
    "Cookies In Store",
    "Inactive Cookies",
  ];

  return (
    <List p={5}>
      {menu.map((label) => (
        <ListItem paddingY={1} key={label}>
          <HStack>
            <FaCookie color="#941c3e" size="28px" opacity={label == "Inactive Cookies" ? "60%" : "100%"} />
            <Button
              onClick={() => console.log(label)}
              color="black"
              opacity={label == "Inactive Cookies" ? "60%" : "100%"}
              fontSize="lg"
              variant="link"
            >
              {label}
            </Button>
          </HStack>
        </ListItem>
      ))}
    </List>
  );
};

export default BakeryListItem;
