import {
  Heading,
  UnorderedList,
  ListItem,
  HStack,
  Box,
  Text,
} from "@chakra-ui/react";
import DeleteButton from "../components/DeleteButton";
import { INSTRUCTIONS_ENDOINT } from "../constants";
import { Instructions } from "./Recipe";

interface Props {
    instructions: Instructions[];
    cookieId: number;
  }

const InstructionsSection = ({ instructions, cookieId }: Props) => {
  return (
    <Box>
      <Heading size="md" textTransform="uppercase">
        Instructions
      </Heading>
      <UnorderedList>
        {instructions.map((instructon) => (
          <ListItem key={instructon.id}>
            <HStack justifyContent="space-between" width="100%">
              <Text>{instructon.instruction}</Text>
              <DeleteButton
                id={instructon.id}
                endpoint={INSTRUCTIONS_ENDOINT}
              />
            </HStack>
          </ListItem>
        ))}
      </UnorderedList>
    </Box>
  );
};

export default InstructionsSection;
