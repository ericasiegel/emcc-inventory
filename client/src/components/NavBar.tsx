import { Image } from '@chakra-ui/image'
import { HStack, Text } from '@chakra-ui/layout'
import logo from '../assets/emcc-logo-white_1024x1024.webp';

const NavBar = () => {
  return (
    <HStack>
        <Image src={logo} boxSize='100px' />
        <Text color='white'>Nav Bar</Text>
    </HStack>
  )
}

export default NavBar