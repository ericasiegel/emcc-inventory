import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Center,
  FormControl,
  HStack,
  Heading,
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
import { useRef, useState } from "react";
import useAddDough from "./useAddDough";

interface Props {
  id: number;
  counts: number;
}

const AddDoughForm = ({ id }: Props) => {
  const { data: getLocations } = useLocations();
  const locations = getLocations?.pages.flatMap((page) => page.results);

  const [doughQantityValue, setDoughQuantityValue] = useState(1);

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
      cookie_name: id,
      quantity: doughquantityValue,
      location_name: parseInt(locationIdValue!),
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
          <Heading paddingBottom={2} size="lg">
            Add Dough
          </Heading>
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
                value={doughQantityValue}
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
