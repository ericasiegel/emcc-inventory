import { Heading, Box, Text } from '@chakra-ui/react'

interface Props {
    notes: string | null
}

const NotesSection = ({notes}: Props) => {
  return (
    <Box>
            <Heading size="sm" textTransform="uppercase">
              Notes
            </Heading>
            <Text pt="2" fontSize="sm">
              {notes}
            </Text>
          </Box>
  )
}

export default NotesSection