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
import { useState } from "react";
import AddInstructionsForm from "./AddInstructionsForm";
import AddButton from "../components/AddButton";

interface Props {
  instructions: Instructions[];
  cookieId: number;
}

const InstructionsSection = ({ instructions, cookieId }: Props) => {
  const [openForm, setOpenForm] = useState(false);

  return (
    <Box>
      <HStack>
        <Heading size="md" textTransform="uppercase">
          Instructions
        </Heading>
        {openForm ? (
          <AddInstructionsForm
            cookieId={cookieId}
            closeForm={() => setOpenForm(false)}
          />
        ) : (
          <AddButton onClick={() => setOpenForm(true)} />
        )}
      </HStack>
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
