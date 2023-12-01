import { RadioGroup, HStack, Radio, Box, Text } from '@chakra-ui/react'

interface Props {
    title: string;
    usage: string;
    handleUsage: (value: string) => void;
}

const AddUpdateFormRadioButtons = ({ title, usage, handleUsage }: Props) => {
  return (
    <Box paddingY={3}>
              <Text fontSize="20px" as="i">
                {title}
              </Text>
              <RadioGroup value={usage} defaultValue="No" onChange={handleUsage}>
                <HStack spacing="24px">
                  <Radio value="No">No</Radio>
                  <Radio value="Yes">Yes</Radio>
                </HStack>
              </RadioGroup>
            </Box>
  )
}

export default AddUpdateFormRadioButtons