
import { Alert, AlertIcon, FormControl, HStack, Input, Box } from "@chakra-ui/react";
import CancelButton from "../components/CancelButton";
import CheckMarkButton from "../components/CheckMarkButton";
import { useRef } from "react";
import { Instructions } from "./Recipe";
import useEditData from "../hooks/useEditData";
import { INSTRUCTIONS_ENDOINT } from "../constants";


interface Props {
  oldInstruction: Instructions;
  closeForm: () => void;
}

const EditInstructionsForm = ({ oldInstruction, closeForm }: Props) => {
    const { editData, error, isLoading } = useEditData<Instructions>({
        id: oldInstruction.id,
        endpoint: INSTRUCTIONS_ENDOINT,
        onSuccessCallback: closeForm,
      });

  const instruction = useRef<HTMLInputElement>(null);

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const instructionValue = instruction.current?.value;

    const instructionData = {
        ...oldInstruction, 
        instruction: instructionValue!,
    };
    editData(instructionData)
  }


  return (
    <>
      <Box width="100%">
        {error && (
          <Alert status="error">
            <AlertIcon />
            {error.message}
          </Alert>
        )}
        <form onSubmit={handleFormSubmit}>
          <FormControl>
            <HStack>
              <Input
                width="100%"
                variant="outline"
                borderColor="black"
                focusBorderColor="green"
                size="md"
                ref={instruction}
                backgroundColor="transparent"
                textAlign="left"
                fontSize="md"
                defaultValue={oldInstruction.instruction}
              />
              {isLoading ? "..." : <CheckMarkButton />}
              <CancelButton onClick={closeForm} />
            </HStack>
          </FormControl>
        </form>
      </Box>
    </>
  );
};

export default EditInstructionsForm;
