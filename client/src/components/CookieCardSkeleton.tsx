import { Card, CardBody, Skeleton, SkeletonText } from '@chakra-ui/react'

const CookieCardSkeleton = () => {
  return (
    <Card backgroundColor='inherit'>
        <Skeleton height='200px' />
        <CardBody>
            <SkeletonText />
        </CardBody>
    </Card>
  )
}

export default CookieCardSkeleton