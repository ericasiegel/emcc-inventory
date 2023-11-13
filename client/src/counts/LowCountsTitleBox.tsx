import { Center, Heading, Box } from "@chakra-ui/react";
import { ReactNode } from "react";


interface Props {
    title: string;
    children: ReactNode
}

const LowCountsTitleBox = ({ title, children }: Props) => {
  return (
    <Box
    color="black"
    borderBottom="1px solid #941c3e"
    w="100%"
    paddingY={3}>
    <Center paddingY={4}>
        <Heading color='#941c3e' as="i" fontSize="xl">
          {title}
        </Heading>
      </Center>
      {children}
    </Box>
  )
}

export default LowCountsTitleBox