import { List, ListItem, HStack, Button } from "@chakra-ui/react";
import { FaCookie } from "react-icons/fa";


interface Props {
  onSelectActive: (is_active: boolean | null) => void;
  setSelectedlabel: (label: string) => void;
}

const ActiveCookiesNav = ({ onSelectActive, setSelectedlabel }: Props) => {
  const menu = [
    {label: "All Cookies", is_active: null},
    {label: "Active Cookies", is_active: true},
    {label: "Inactive Cookies", is_active: false},
  ];

  const handleButtonClick = (is_active: boolean | null, label: string) => {
    onSelectActive(is_active);
    setSelectedlabel(label);
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
                onClick={() => handleButtonClick(item.is_active, item.label)}
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
    </>
  );
};

export default ActiveCookiesNav;
