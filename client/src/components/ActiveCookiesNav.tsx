import { List, ListItem, HStack, Button } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FaCookie } from "react-icons/fa";
import useCookieQueryStore from "../store";


const ActiveCookiesNav = () => {
  const onSelectActive = useCookieQueryStore(s => s.setSelectedActive)
  const searchText = useCookieQueryStore(s => s.cookieQuery.searchText)
  const [selectedButton, setSelectedButton] = useState('All Cookies')

  const menu = [
    {label: "All Cookies", is_active: null},
    {label: "Active Cookies", is_active: true},
    {label: "Inactive Cookies", is_active: false},
  ];

  const handleButtonClick = (is_active: boolean | null, label: string) => {
    onSelectActive(is_active, label);
    setSelectedButton(label)

  };

  // useEffect(() => {
  //   if (searchText !== '') {
  //     setSelectedButton('')
  //   }
  // }, [searchText]);

  return (
    <>
      <List p={5}>
        {menu.map((item) => (
          <ListItem paddingY={1} key={item.label}>
            <HStack>
              <FaCookie
                color='#941c3e'
                size="28px"
              />
              <Button
                onClick={() => handleButtonClick(item.is_active, item.label)}
                color='#941c3e' 
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
