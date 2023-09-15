import { Heading } from '@chakra-ui/react'
import useCookieQueryStore from '../store'


const CookieHeading = () => {
  const label = useCookieQueryStore(s => s.cookieQuery.selectedLabel)
  return (
    <Heading color="#941c3e" as='h1' my={5} fontSize='5xl'>{label}</Heading>
  )
}

export default CookieHeading