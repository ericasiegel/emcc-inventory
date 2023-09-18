import { Grid, Show, GridItem, Box } from "@chakra-ui/react"
import CookieGrid from "../components/CookieGrid"
import CookieHeading from "../components/CookieHeading"
import SideBar from "../components/SideBar"


const HomePage = () => {
  return (
    <Grid
    templateAreas={{
      base: `"main"`,
      lg: `"aside main"`,
    }}
    templateColumns={{ base: "1fr", lg: '270px 1fr'}}
  >
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
  )
}

export default HomePage