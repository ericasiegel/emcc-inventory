import {
  Alert,
  AlertIcon,
  FormControl,
  Input,
  Box,
  Center,
} from "@chakra-ui/react";
import CancelButton from "../components/CancelButton";
import CheckMarkButton from "../components/CheckMarkButton";
import useAddData from "../hooks/useAddData";
import { Location } from "./Location";
import { LOCATIONS_ENDOINT } from "../constants";
import { useRef } from "react";

const defaultLocationValue = {
  id: 0,
  title: "",
};

interface Props {
  closeForm: () => void;
}

const AddLocationForm = ({ closeForm }: Props) => {
  const { addData, error, isLoading } = useAddData<Location>({
    endpoint: LOCATIONS_ENDOINT,
    onSuccessCallback: closeForm,
  });

  const locationInput = useRef<HTMLInputElement>(null);

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const locationInputValue = locationInput.current?.value;

    const locationData = {
      ...defaultLocationValue,
      title: locationInputValue!,
    };

    addData(locationData);
  };
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
            <Input
              width="100%"
              variant="outline"
              borderColor="black"
              focusBorderColor="green"
              size="lg"
              ref={locationInput}
              backgroundColor="transparent"
              textAlign="center"
              fontSize="xl"
              placeholder="Add a location"
            />
            <Center>
              {isLoading ? "..." : <CheckMarkButton />}
              <CancelButton onClick={closeForm} />
            </Center>
          </FormControl>
        </form>
      </Box>
    </>
  );
};

export default AddLocationForm;
