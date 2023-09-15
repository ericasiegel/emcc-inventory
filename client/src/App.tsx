import { Grid, GridItem, Box } from "@chakra-ui/layout";
import { Show } from "@chakra-ui/media-query";
import NavBar from "./components/NavBar";
import CookieGrid from "./components/CookieGrid";
import CookieHeading from "./components/CookieHeading";
import SideBar from "./components/SideBar";


function App() {

  return (
    <Grid
      templateAreas={{
        base: `"nav" "main"`,
        lg: `"nav nav" "aside main"`,
      }}
      templateColumns={{ base: "1fr", lg: '270px 1fr'}}
    >
      <GridItem area="nav" bg="#cf6a87">
        <NavBar />
      </GridItem>
      <Show above="lg">
        <GridItem area="aside" bg="#f7afc8" paddingX={3}>
          <SideBar />
        </GridItem>
      </Show>
      <GridItem area="main" bg="#f7afc8">
        <Box paddingLeft={4}>
        <CookieHeading />
        </Box>
        <CookieGrid />
      </GridItem>
    </Grid>
  );
}

export default App;
