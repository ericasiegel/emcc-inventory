
import { Cookie } from '../hooks/useCookies'
import { Card, CardBody } from '@chakra-ui/card'
import { Image } from '@chakra-ui/image'
import { Heading } from '@chakra-ui/layout'


interface Props {
    cookie: Cookie
}

const CookieCard = ({ cookie }: Props) => {
  return (
    <Card borderRadius={10} backgroundColor='#f78fb3' boxShadow='dark-lg' overflow='hidden'>
        {cookie.images && cookie.images.length > 0 && <Image src={cookie.images[0].image} />}
        <CardBody>
            <Heading fontSize='2xl'>{cookie.name}</Heading>
        </CardBody>
    </Card>
  )
}

export default CookieCard