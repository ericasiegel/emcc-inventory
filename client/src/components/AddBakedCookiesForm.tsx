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
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRef } from "react";
import { Baked } from "../entities/Baked";

interface Props {
  id: number;
  cookieSize: string;
}

const AddBakedCookiesForm = ({ id, cookieSize }: Props) => {
  const { data: getLocations } = useLocations();
  const locations = getLocations?.pages.flatMap((page) => page.results);

  const apiClient = new APIClient("bakedcookies/");
  const queryClient = useQueryClient();
  const addBakedCookies = useMutation<Baked, Error, AddUpdateBaked>({
    mutationFn: (baked: AddUpdateBaked) =>
      apiClient.addBaked(baked).then((res) => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["bakedcookies"],
      });
      queryClient.invalidateQueries({
        queryKey: ["cookies"],
      });
    },
  });

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

    addBakedCookies.mutate(bakedData);
  };

  return (
    <>
      {addBakedCookies.error && (
        <Alert status="error">
          <AlertIcon />
          {addBakedCookies.error.message}
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
              <NumberInput defaultValue={1} width="100%" ref={bakedQuantity}>
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
              disabled={addBakedCookies.isLoading}
              type="submit"
              colorScheme="blue"
              marginTop={3}
            >
              {addBakedCookies.isLoading
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
