import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Center,
  FormControl,
  HStack,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Select,
  Text,
} from "@chakra-ui/react";
import useLocations from "../cookies/useLocations";
import { AddUpdateDough } from "./Dough";
import { useReducer, useRef } from "react";
import useAddDough from "./useAddDough";
import addUpdateFormReducer, {
  StartingState,
} from "../reducers/addUpdateFormReducer";

interface Props {
  id: number;
  counts: number;
}

const AddDoughForm = ({ id }: Props) => {
  const { data: getLocations } = useLocations();
  const locations = getLocations?.pages.flatMap((page) => page.results);

  const initialState: StartingState = {
    cookieValue: 1,
    selectedStoredUsage: "",
    storedUsageValue: 0,
    storedQuantity: 0,
  };
  const [state, dispatch] = useReducer(addUpdateFormReducer, initialState);
  const { cookieValue } = state;

  const setDoughQuantityValue = (value: number) => {
    dispatch({ type: "set_cookie_value", payload: value });
  };

  const resetForm = () => {
    if (locationId.current) {
      locationId.current.value = "";
    }
    setDoughQuantityValue(1);
  };

  const { addDough, error, isLoading } = useAddDough(resetForm);

  const locationId = useRef<HTMLSelectElement>(null);
  const doughQuantity = useRef<HTMLInputElement>(null);

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const locationIdValue = locationId.current?.value;
    const doughquantityValue =
      doughQuantity.current?.querySelector("input")?.valueAsNumber;

    const doughData: AddUpdateDough = {
      cookie_id: id,
      quantity: doughquantityValue,
      location_id: parseInt(locationIdValue!),
    };

    addDough(doughData);
  };

  return (
    <>
      {error && (
        <Alert status="error">
          <AlertIcon />
          {error.message}
        </Alert>
      )}
      <form onSubmit={handleFormSubmit}>
        <FormControl>
          <Box>
            <Select
              placeholder="Select Location"
              ref={locationId}
              paddingBottom={2}
            >
              {locations?.map((location) => (
                <option key={location.id} value={location.id}>
                  {location.title}
                </option>
              ))}
            </Select>
            <HStack>
              <Text>Quantity: </Text>
              <NumberInput
                value={cookieValue}
                onChange={(value) => setDoughQuantityValue(Number(value))}
                width="100%"
                ref={doughQuantity}
              >
                <NumberInputField type="number" />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </HStack>
          </Box>
          <Center>
            <Button
              disabled={isLoading}
              type="submit"
              colorScheme="blue"
              marginTop={3}
            >
              {isLoading ? "Adding Doughs..." : "Add Doughs"}
            </Button>
          </Center>
        </FormControl>
      </form>
    </>
  );
};

export default AddDoughForm;
