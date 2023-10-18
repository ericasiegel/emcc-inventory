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
  Text,
} from "@chakra-ui/react";
import APIClient, { AddUpdateStore } from "../services/api-client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRef } from "react";
import { Store } from "../entities/Store";

interface Props {
  id: number;
  cookieSize: string;
}

const AddStoreCookiesForm = ({ id, cookieSize }: Props) => {
  const apiClient = new APIClient("store/");
  const queryClient = useQueryClient();
  const addStoreCookies = useMutation<Store, Error, AddUpdateStore>({
    mutationFn: (store: AddUpdateStore) =>
      apiClient.addStore(store).then((res) => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["store"],
      });
      queryClient.invalidateQueries({
        queryKey: ["cookies"],
      });
    },
  });

  const storeQuantity = useRef<HTMLInputElement>(null);

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const storequantityValue =
      storeQuantity.current?.querySelector("input")?.valueAsNumber;

    const storeData: AddUpdateStore = {
      cookie_name: id,
      quantity: storequantityValue,
      size: cookieSize,
    };

    addStoreCookies.mutate(storeData);
  };

  return (
    <>
      {addStoreCookies.error && (
        <Alert status="error">
          <AlertIcon />
          {addStoreCookies.error.message}
        </Alert>
      )}
      <form onSubmit={handleFormSubmit}>
        <FormControl>
          <Heading paddingBottom={2} size="lg">
            Add Cookies to Store
          </Heading>
          <Box>
            <HStack>
              <Text>Quantity: </Text>
              <NumberInput defaultValue={1} width="100%" ref={storeQuantity}>
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
              disabled={addStoreCookies.isLoading}
              type="submit"
              colorScheme="blue"
              marginTop={3}
            >
              {addStoreCookies.isLoading
                ? "Adding Cookies to Store..."
                : "Add Cookies to Store"}
            </Button>
          </Center>
        </FormControl>
      </form>
    </>
  );
};

export default AddStoreCookiesForm;
