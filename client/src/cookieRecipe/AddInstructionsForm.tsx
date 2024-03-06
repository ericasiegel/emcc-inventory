import useAddInstructions from "./useAddInstructions";
import { Alert, AlertIcon, FormControl, HStack, Input, Box } from "@chakra-ui/react";
import CancelButton from "../components/CancelButton";
import CheckMarkButton from "../components/CheckMarkButton";
import { useRef } from "react";

const defaultInstructionValue = {
    id: 0,
    cookie: "", 
    cookie_id: 0,
    instruction: ""
}

interface Props {
  cookieId: number;
  closeForm: () => void;
}

const AddInstructionsForm = ({ cookieId, closeForm }: Props) => {
  const { addInstructions, error, isLoading } = useAddInstructions(closeForm);

  const instruction = useRef<HTMLInputElement>(null);

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const instructionValue = instruction.current?.value;

    const instructionData = {
        ...defaultInstructionValue, 
        cookie_id: cookieId,
        instruction: instructionValue!,
    };
    addInstructions(instructionData)
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
                size="lg"
                ref={instruction}
                backgroundColor="transparent"
                textAlign="center"
                fontSize="xl"
                placeholder="Add an instruction"
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

export default AddInstructionsForm;
