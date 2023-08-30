
import { Cookie } from '../hooks/useCookies'
import { Card, CardBody, Heading, Image } from "@chakra-ui/react";
import CookieCounts from './CookieCounts'
import noImage from '../assets/no-image-placeholder-6f3882e0.webp'


interface Props {
    cookie: Cookie
}

const CookieCard = ({ cookie }: Props) => {
  const imgUrl = cookie.images && cookie.images?.length > 0 ? cookie.images[0].image : noImage;
  return (
    <Card backgroundColor='inherit'>
        <Image src={imgUrl} alt={cookie.name} />
        <CardBody paddingX={3}>
            <Heading as='em' color='#941c3e' fontSize='3xl'>{cookie.name}</Heading>
            <CookieCounts counts={cookie.counts} />
        </CardBody>
    </Card>
  )
}

export default CookieCard