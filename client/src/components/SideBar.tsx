import { List } from "@chakra-ui/layout";
import BakeryListItem from "./BakeryListItem";
import LowCountsSidebar from "./LowCountsSidebar";

const BakeryList = () => {
  const menu = ["Active Cookies List", "Baked Cookies", "Doughs", "Cookies In Store", "Inactive Cookies"];

  return (
    <>
      <List p={5}>
        {menu.map((label) => (
          <BakeryListItem key={label} label={label} />
        ))}
      </List>
      <LowCountsSidebar />
    </>
  );
};

export default BakeryList;
