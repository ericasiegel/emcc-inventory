import { List, ListItem, HStack, Button } from "@chakra-ui/react";
import { FaCookie } from "react-icons/fa";
// import BakeryListItem from "./BakeryListItem";
import LowCountsSidebar from "./LowCountsSidebar";
import useCookies from "../hooks/useCookies";
// import { Cookie } from "../hooks/useCookies";
// import { useState } from "react";

interface Props {
  onSelectActive: (is_active: boolean) => void;
}

const BakeryList = ({ onSelectActive }: Props) => {
  const menu = [
    {label: "Active Cookies List", is_active: true},
    // "Baked Cookies",
    // "Doughs",
    // "Cookies In Store",
    {label: "Inactive Cookies", is_active: false},
  ];

  const { data } = useCookies(null);

  const handleButtonClick = (is_active: boolean) => {
    onSelectActive(is_active);
  };


  return (
    <>
      <List p={5}>
        {menu.map((item) => (
          <ListItem paddingY={1} key={item.label}>
            <HStack>
              <FaCookie
                color="#941c3e"
                size="28px"
                opacity={item.label == "Inactive Cookies" ? "60%" : "100%"}
              />
              <Button
                onClick={() => handleButtonClick(item.is_active)}
                // onClick={() => onSelectActive(cookie)}
                color="black"
                opacity={item.label == "Inactive Cookies" ? "60%" : "100%"}
                fontSize="lg"
                variant="link"
              >
                {item.label}
              </Button>
            </HStack>
          </ListItem>
        ))}
      </List>
      <LowCountsSidebar lowCookieCounts={data} />
    </>
  );
};

export default BakeryList;
