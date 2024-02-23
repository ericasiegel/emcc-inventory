import {
  Grid,
  Show,
  GridItem,
  HStack,
  Text,
} from "@chakra-ui/react";
import CookieGrid from "../components/CookieGrid";
import CookieHeading from "../cookies/CookieHeading";
import SideBar from "../components/SideBar";
import AddCookieForm from "../cookies/AddCookieForm";
import { useState } from "react";
import AddButton from "../components/AddButton";

const HomePage = () => {
  const [openForm, setOpenForm] = useState(false);

  return (
    <Grid
      templateAreas={{
        base: `"main"`,
        lg: `"aside main"`,
      }}
      templateColumns={{ base: "1fr", lg: "270px 1fr" }}
    >
      <Show above="lg">
        <GridItem area="aside" paddingX={3}>
          <SideBar />
        </GridItem>
      </Show>
      <GridItem area="main">
        <HStack paddingX={4} justifyContent="space-between">
          <CookieHeading />
          {openForm ? (
            <AddCookieForm onSubmit={() => setOpenForm(false)} onCancel={() => setOpenForm(false)} />
          ) : (
            <HStack>
              <Text fontSize="2xl">
                Add A Cookie
              </Text>{" "}
              <AddButton onClick={() => setOpenForm(true)} />
            </HStack>
          )}
        </HStack>
        <CookieGrid />
      </GridItem>
    </Grid>
  );
};

export default HomePage;
