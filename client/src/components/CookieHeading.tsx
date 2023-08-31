import { Heading } from '@chakra-ui/react'

interface Props {
    label: string;
}

const CookieHeading = ({label}: Props) => {
  return (
    <Heading color="#941c3e" as='h1' my={5} fontSize='5xl'>{label}</Heading>
  )
}

export default CookieHeading