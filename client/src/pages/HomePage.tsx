import { Grid, Show, GridItem, HStack, useDisclosure } from "@chakra-ui/react";
import CookieGrid from "../components/CookieGrid";
import CookieHeading from "../cookies/CookieHeading";
import SideBar from "../components/SideBar";
import AddCookieForm from "../cookies/AddCookieForm";
import FormModal from "../components/FormModal";


const HomePage = () => {
 const { isOpen, onClose, onOpen } = useDisclosure();

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
          <FormModal header="Add A Cookie" isAddForm={true} onClose={onClose} isOpen={isOpen} onOpen={onOpen}>
            <AddCookieForm onClose={onClose} />
          </FormModal>
        </HStack>
        <CookieGrid />
      </GridItem>
    </Grid>
  );
};

export default HomePage;
