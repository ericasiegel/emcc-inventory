
import { Cookie } from '../hooks/useCookies'
import { Card, CardBody, Heading, Image } from "@chakra-ui/react";
import CookieCounts from './CookieCounts'


interface Props {
    cookie: Cookie
}

const CookieCard = ({ cookie }: Props) => {
  return (
    <Card backgroundColor='inherit'>
        {cookie.images && cookie.images.length > 0 && <Image src={cookie.images[0].image} />}
        <CardBody>
            <Heading as='em' color='#941c3e' fontSize='3xl'>{cookie.name}</Heading>
            <CookieCounts counts={cookie.counts} />
        </CardBody>
    </Card>
  )
}

export default CookieCard