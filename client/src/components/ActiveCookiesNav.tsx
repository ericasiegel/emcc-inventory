import { List, ListItem, HStack, Button } from "@chakra-ui/react";
import { useState } from "react";
import { FaCookie } from "react-icons/fa";


interface Props {
  onSelectActive: (is_active: boolean | null) => void;
  setSelectedlabel: (label: string) => void;
}

const ActiveCookiesNav = ({ onSelectActive, setSelectedlabel }: Props) => {
  const [selectedButton, setSelectedButton] = useState('All Cookies')

  const menu = [
    {label: "All Cookies", is_active: null},
    {label: "Active Cookies", is_active: true},
    {label: "Inactive Cookies", is_active: false},
  ];

  const handleButtonClick = (is_active: boolean | null, label: string) => {
    onSelectActive(is_active);
    setSelectedlabel(label);
    setSelectedButton(label)
  };



  return (
    <>
      <List p={5}>
        {menu.map((item) => (
          <ListItem paddingY={1} key={item.label}>
            <HStack>
              <FaCookie
                color='#941c3e'
                size="28px"
                // opacity={item.label == "Inactive Cookies" ? "60%" : "100%"}
              />
              <Button
                onClick={() => handleButtonClick(item.is_active, item.label)}
                color='#941c3e' 
                // color={ selectedButton === item.label ? 'Black' : '#941c3e' }
                // opacity={item.label == "Inactive Cookies" ? "60%" : "100%"}
                fontSize={ selectedButton === item.label ? 'xl' : 'lg' }
                variant="link"
                whiteSpace='normal'
                textAlign='left'
                fontWeight={ selectedButton === item.label ? 'Bold' : 'Normal' }
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
