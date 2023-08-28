import { Grid, GridItem } from "@chakra-ui/layout";
import { Show } from "@chakra-ui/media-query";
import NavBar from "./components/NavBar";
import CookieGrid from "./components/CookieGrid";
import BakeryList from "./components/BakeryList";

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
        <GridItem area="aside" bg="#f8a5c2" paddingX={3}>
          <BakeryList />
        </GridItem>
      </Show>
      <GridItem area="main" bg="#f8a5c2">
        <CookieGrid />
      </GridItem>
    </Grid>
  );
}

export default App;
