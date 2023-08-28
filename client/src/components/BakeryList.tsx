import { List } from "@chakra-ui/layout";
import BakeryListItem from "./BakeryListItem";
import BakeryLowItems from "./LowCounts";

const BakeryList = () => {
  const menu = ["Cookies List", "Baked Cookies", "Doughs", "Cookies In Store"];

  return (
    <>
      <List>
        {menu.map((label) => (
          <BakeryListItem key={label} label={label} />
        ))}
      </List>
        <BakeryLowItems />
    </>
  );
};

export default BakeryList;
