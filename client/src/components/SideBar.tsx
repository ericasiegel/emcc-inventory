import { List, ListItem, HStack, Button } from "@chakra-ui/react";
import { FaCookie } from "react-icons/fa";
import LowCountsSidebar from "./LowCountsSidebar";
import useCookies from "../hooks/useCookies";
import BakeryListItem from "./BakeryListItem";


interface Props {
  onSelectActive: (is_active: boolean | null) => void;
}

const BakeryList = ({ onSelectActive }: Props) => {
  const menu = [
    {label: "All Cookies", is_active: null},
    {label: "Active Cookies", is_active: true},
    {label: "Inactive Cookies", is_active: false},
  ];

  const { data } = useCookies(null);

  const handleButtonClick = (is_active: boolean | null) => {
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
                color="black"
                opacity={item.label == "Inactive Cookies" ? "60%" : "100%"}
                fontSize="lg"
                variant="link"
                whiteSpace='normal'
                textAlign='left'
              >
                {item.label}
              </Button>
            </HStack>
          </ListItem>
        ))}
      </List>
      <BakeryListItem />
      <LowCountsSidebar lowCookieCounts={data} />
    </>
  );
};

export default BakeryList;
