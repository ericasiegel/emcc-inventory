import { Box, Text } from "@chakra-ui/react";

interface Props {
  description?: string;
}

const CookieDescriptionCard = ({ description }: Props) => {
  return (
    <Box display="flex" justifyContent='center' paddingY={2}>
      <Text fontSize='xl' as='cite'>{description}</Text>
    </Box>
  );
};

export default CookieDescriptionCard;
