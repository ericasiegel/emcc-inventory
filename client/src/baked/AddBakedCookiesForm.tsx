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
import { AddUpdateBaked } from "./Baked";
import { useRef, useState } from "react";
import useAddBaked from "./useAddBaked";

interface Props {
  id: number;
  cookieSize: string;
}

const AddBakedCookiesForm = ({ id, cookieSize }: Props) => {
  const { data: getLocations } = useLocations();
  const locations = getLocations?.pages.flatMap((page) => page.results);
  const [bakedValue, setBakedValue] = useState(1);

  const locationId = useRef<HTMLSelectElement>(null);
  const bakedQuantity = useRef<HTMLInputElement>(null);

  const resetForm = () => {
    if (locationId.current) locationId.current.value = "";
    setBakedValue(1);
  };

  const { addBakedCookies, error, isLoading } = useAddBaked(resetForm);

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const locationIdValue = locationId.current?.value;
    const bakedquantityValue =
      bakedQuantity.current?.querySelector("input")?.valueAsNumber;

    const bakedData: AddUpdateBaked = {
      cookie_name: id,
      quantity: bakedquantityValue,
      size: cookieSize,
      location_name: parseInt(locationIdValue!),
    };

    addBakedCookies(bakedData);
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
            Add Baked Cookies
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
                value={bakedValue}
                onChange={(value) => setBakedValue(Number(value))}
                width="100%"
                ref={bakedQuantity}
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
              {isLoading ? "Adding Baked Cookies..." : "Add Baked Cookies"}
            </Button>
          </Center>
        </FormControl>
      </form>
    </>
  );
};

export default AddBakedCookiesForm;
