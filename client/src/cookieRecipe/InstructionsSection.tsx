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
import EditInstructionsForm from "./EditInstructionsForm";
import EditButton from "../components/EditButton";

interface Props {
  instructions: Instructions[];
  cookieId: number;
}

const InstructionsSection = ({ instructions, cookieId }: Props) => {
  const [openForm, setOpenForm] = useState(false);
  const [openEditForm, setOpenEditForm] = useState(false);
  const [selectedInstruction, setSelectedInstruction] = useState<number | null>(
    null
  );

  const openEditInstructionsForm = (instructionId: number) => {
    setSelectedInstruction(instructionId);
    setOpenEditForm(true);
  };

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
        {instructions.map((instruction) => (
          <ListItem key={instruction.id}>
            {openEditForm && selectedInstruction === instruction.id ? (
              <EditInstructionsForm
                oldInstruction={instruction}
                closeForm={() => setOpenEditForm(false)}
              />
            ) : (
              <HStack justifyContent="space-between" width="100%">
                <Text>{instruction.instruction}</Text>
                <Box>
                  <EditButton
                    onClick={() => openEditInstructionsForm(instruction.id)}
                  />
                  <DeleteButton
                    id={instruction.id}
                    endpoint={INSTRUCTIONS_ENDOINT}
                  />
                </Box>
              </HStack>
            )}
          </ListItem>
        ))}
      </UnorderedList>
    </Box>
  );
};

export default InstructionsSection;
