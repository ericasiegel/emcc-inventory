import { Image } from '@chakra-ui/image'
import { HStack, Heading} from '@chakra-ui/layout'
import logo from '../assets/emcc-logo-white_1024x1024.webp';

const NavBar = () => {
  return (
    <HStack>
        <Image margin={3} src={logo} boxSize='100px' />
        <Heading color='#f9dfe8'>Cookie Inventory</Heading>
        {/* <Text color='white'>nav bar</Text> */}
    </HStack>
  )
}

export default NavBar