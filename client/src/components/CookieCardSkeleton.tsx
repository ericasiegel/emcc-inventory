import { Card, CardBody } from '@chakra-ui/card'
import { Skeleton, SkeletonText } from '@chakra-ui/skeleton'

const CookieCardSkeleton = () => {
  return (
    <Card width='350px' borderRadius={10} backgroundColor='#f78fb3' boxShadow='dark-lg' overflow='hidden'>
        <Skeleton height='200px' />
        <CardBody>
            <SkeletonText />
        </CardBody>
    </Card>
  )
}

export default CookieCardSkeleton