import { Grid, GridItem, Box } from "@chakra-ui/layout";
import { Show } from "@chakra-ui/media-query";
import NavBar from "./components/NavBar";
import CookieGrid from "./components/CookieGrid";
import { useState } from "react";
import CookieHeading from "./components/CookieHeading";
import SideBar from "./components/SideBar";

export interface CookieQuery {
  selectedActive: boolean | null;
  selectedLabel: string;
  searchText?: string;
}

function App() {
  const [cookieQuery, setCookieQuery] = useState<CookieQuery>({
    selectedActive: null,
    selectedLabel: "All Cookies"
  })

  const updateCookieQuery = (selectedActive: boolean | null, selectedLabel: string) => {
    setCookieQuery({ selectedActive, selectedLabel });
  };
  

  return (
    <Grid
      templateAreas={{
        base: `"nav" "main"`,
        lg: `"nav nav" "aside main"`,
      }}
      templateColumns={{ base: "1fr", lg: '270px 1fr'}}
    >
      <GridItem area="nav" bg="#cf6a87">
        <NavBar onSearch={(searchText) => setCookieQuery({...cookieQuery, searchText })} />
      </GridItem>
      <Show above="lg">
        <GridItem area="aside" bg="#f7afc8" paddingX={3}>
          <SideBar updateCookieQuery={updateCookieQuery} cookieQuery={cookieQuery} />
        </GridItem>
      </Show>
      <GridItem area="main" bg="#f7afc8">
        <Box paddingLeft={4}>
        <CookieHeading label={cookieQuery.selectedLabel} />
        </Box>
        <CookieGrid cookieQuery={cookieQuery} />
      </GridItem>
    </Grid>
  );
}

export default App;
