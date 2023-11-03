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
import useLocations from "../hooks/useLocations";
import APIClient, { AddUpdateDough } from "../services/api-client";
import { useRef, useState } from "react";
import { Dough } from "../entities/Dough";
import useMutateCookies from "../hooks/useMutateCookies";
import { CACHE_KEY_COOKIES } from "../constants";

interface Props {
  id: number;
  counts: number;
}

const AddDoughForm = ({ id }: Props) => {
  const { data: getLocations } = useLocations();
  const locations = getLocations?.pages.flatMap((page) => page.results);

  const apiClient = new APIClient("doughs/");
  const {
    mutate: addDough,
    error,
    isLoading,
  } = useMutateCookies<Dough, Error, AddUpdateDough>(
    (dough: AddUpdateDough) =>
      apiClient.post(dough),
    () => {
      resetForm();
    },
    [CACHE_KEY_COOKIES, "doughs"]
  );
  const [doughQantityValue, setDoughQuantityValue] = useState(1);

  const resetForm = () => {
    if (locationId.current) {
      locationId.current.value = "";
    }
    setDoughQuantityValue(1);
  };

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
