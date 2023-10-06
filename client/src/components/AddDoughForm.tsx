import {
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
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRef } from "react";

interface Props {
    id: number
    counts: number
}

const AddDoughForm = ({ id }: Props) => {
  const { data: getLocations } = useLocations();
  const locations = getLocations?.pages.flatMap((page) => page.results);

  const apiClient = new APIClient("doughs/");
  const queryClient = useQueryClient();

  const addDough = useMutation({
    mutationFn: (dough: AddUpdateDough) =>
      apiClient.addDough(dough).then((res) => res.data),
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["doughs"],
        });
        queryClient.invalidateQueries({
          queryKey: ["cookies"],
        });
    },
  });
  
  const locationId = useRef<HTMLSelectElement>(null);
  const doughQuantity = useRef<HTMLInputElement>(null);
  

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const locationIdValue = locationId.current?.value;
    const doughquantityValue = doughQuantity.current?.querySelector('input')?.valueAsNumber;


    const doughData: AddUpdateDough = {
      cookie_name: id,
      quantity: (doughquantityValue),
      location_name: parseInt(locationIdValue!)
    };

    addDough.mutate(doughData);
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <FormControl>
        <Heading paddingBottom={2} size='lg'>Add Dough</Heading>
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
            <NumberInput defaultValue={1} width="100%" ref={doughQuantity}>
              <NumberInputField type="number" />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </HStack>
        </Box>
        <Center>
          <Button type="submit" colorScheme="blue" marginTop={3}>
            Add Dough
          </Button>
        </Center>
      </FormControl>
    </form>
  );
};

export default AddDoughForm;
