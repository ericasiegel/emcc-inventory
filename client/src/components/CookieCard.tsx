
import { Cookie } from '../hooks/useCookies'
import { Card, CardBody, Heading, Image } from "@chakra-ui/react";
import CookieCounts from './CookieCounts'
import noImage from '../assets/no-image-placeholder-6f3882e0.webp'


interface Props {
    cookie: Cookie
}

const CookieCard = ({ cookie }: Props) => {
  const imgUrl = cookie.images && cookie.images?.length > 0 ? cookie.images[0].image : noImage;
  const inactiveCookie = !cookie.is_active ? '40%' : '100%';

  return (
    <Card backgroundColor='inherit' opacity={inactiveCookie} height="100%">
        <Image src={imgUrl} alt={cookie.name} width='100%' height='auto' />
        <CardBody paddingX={3} width='100%'>
            <Heading as='em' color='#941c3e' fontSize='3xl'>{cookie.name}</Heading>
            <CookieCounts counts={cookie.counts} />
        </CardBody>
    </Card>
  )
}

export default CookieCard