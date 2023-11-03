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
import APIClient, { AddUpdateBaked } from "../services/api-client";
import { useRef, useState } from "react";
import { Baked } from "../entities/Baked";
import useMutateCookies from "../hooks/useMutateCookies";
import { CACHE_KEY_COOKIES } from "../constants";

interface Props {
  id: number;
  cookieSize: string;
}

const AddBakedCookiesForm = ({ id, cookieSize }: Props) => {
  const { data: getLocations } = useLocations();
  const locations = getLocations?.pages.flatMap((page) => page.results);

  const apiClient = new APIClient("bakedcookies/");
  const {
    mutate: addBakedCookies,
    error,
    isLoading,
  } = useMutateCookies<Baked, Error, AddUpdateBaked>(
    (baked: AddUpdateBaked) =>
      apiClient.post(baked),
    () => {
      resetForm();
    },
    [CACHE_KEY_COOKIES, "bakedcookies"]
  );

  const [bakedValue, setBakedValue] = useState(1);

  const locationId = useRef<HTMLSelectElement>(null);
  const bakedQuantity = useRef<HTMLInputElement>(null);

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

  const resetForm = () => {
    if (locationId.current) locationId.current.value = "";
    setBakedValue(1);
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
              {isLoading
                ? "Adding Baked Cookies..."
                : "Add Baked Cookies"}
            </Button>
          </Center>
        </FormControl>
      </form>
    </>
  );
};

export default AddBakedCookiesForm;
