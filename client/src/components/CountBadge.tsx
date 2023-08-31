import { Badge, HStack, Text } from "@chakra-ui/layout";

interface Props {
    label: string;
    count: number;
    threshold?: number;
}

const CountBadge = ({ label, count, threshold = 5 }: Props) => {
    const colorScheme = count > threshold ? 'purple' : 'red'

  return (
    <HStack px={2}>
        <Text fontSize='md' as='i'>{label}:</Text>
        <Badge fontSize='14px' paddingX={2} colorScheme={colorScheme}>
            {count}
        </Badge>
    </HStack>
  )
}

export default CountBadge