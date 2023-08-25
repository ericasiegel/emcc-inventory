import { Grid, GridItem } from "@chakra-ui/layout";
import { Show } from "@chakra-ui/media-query";

function App() {
  return (
    <Grid
      templateAreas={{
        base: `"nav" "main"`,
        lg: `"nav nav" "aside main"`,
      }}
    >
      <GridItem area="nav" bg="#cf6a87">
        nav
      </GridItem>
      <Show above="lg">
        <GridItem area="aside" bg="#f78fb3">
          aside
        </GridItem>
      </Show>
      <GridItem area="main" bg="#f8a5c2">
        main
      </GridItem>
    </Grid>
  );
}

export default App;
