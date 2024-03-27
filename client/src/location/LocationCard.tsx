import { Container, Spinner, Center, Heading } from "@chakra-ui/react"
import useGetData from "../hooks/useGetData"
import { Location } from "./Location"
import { LOCATIONS_ENDOINT } from "../constants"


const LocationCard = () => {
  useGetData<Location>({
    endpoint: LOCATIONS_ENDOINT,
    id: 0
  })
  return (
    <Container color="#941c3e" width="100%" padding={0}>
      {/* {isLoading && <Spinner />} */}
      <Center paddingY={6}>
        <Heading fontSize="3xl">Locations</Heading>
      </Center>

      </Container>
  )
}

export default LocationCard