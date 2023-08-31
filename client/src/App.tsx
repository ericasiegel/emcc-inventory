import { Grid, GridItem, Box } from "@chakra-ui/layout";
import { Show } from "@chakra-ui/media-query";
import NavBar from "./components/NavBar";
import CookieGrid from "./components/CookieGrid";
import BakeryList from "./components/SideBar";
import { useState } from "react";
import CookieHeading from "./components/CookieHeading";



function App() {
  const [active, setSelectedActive] = useState<boolean | null>(null);
  const [selectedLabel, setSelectedLabel] = useState<string>('All Cookies')


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
          <BakeryList onSelectActive={setSelectedActive} setSelectedlabel={setSelectedLabel} />
        </GridItem>
      </Show>
      <GridItem area="main" bg="#f8a5c2">
        <Box paddingLeft={4}>
        <CookieHeading label={selectedLabel} />
        </Box>
        <CookieGrid activeCookie={active} />
      </GridItem>
    </Grid>
  );
}

export default App;
