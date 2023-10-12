import { Grid, Show, GridItem, HStack } from "@chakra-ui/react";
import CookieGrid from "../components/CookieGrid";
import CookieHeading from "../components/CookieHeading";
import SideBar from "../components/SideBar";
import AddCookieForm from "../components/AddCookieForm";
import AddFormModal from "../components/AddFormModal";

const HomePage = () => {
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
          <AddFormModal header="Add A Cookie">
            <AddCookieForm />
          </AddFormModal>
        </HStack>
        <CookieGrid />
      </GridItem>
    </Grid>
  );
};

export default HomePage;
