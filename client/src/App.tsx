import { Grid, GridItem } from "@chakra-ui/layout";
import { Show } from "@chakra-ui/media-query";
import NavBar from "./components/NavBar";
import CookieGrid from "./components/CookieGrid";

function App() {
  return (
    <Grid
      templateAreas={{
        base: `"nav" "main"`,
        lg: `"nav nav" "aside main"`,
      }}
    >
      <GridItem area="nav" bg="#cf6a87">
        <NavBar />
      </GridItem>
      <Show above="lg">
        <GridItem area="aside" bg="#f8a5c2">
          aside
        </GridItem>
      </Show>
      <GridItem area="main" bg="#f8a5c2">
        <CookieGrid />
      </GridItem>
    </Grid>
  );
}

export default App;
