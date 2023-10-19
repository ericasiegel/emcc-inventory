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
import { useRef, useState } from "react";
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
      resetForm();
    },
  });
  const [storeQuantityValue, setStoreQuantityValue] = useState(1);

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

  const resetForm = () => setStoreQuantityValue(1);

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
              <NumberInput
                value={storeQuantityValue}
                onChange={(value) => setStoreQuantityValue(Number(value))}
                width="100%"
                ref={storeQuantity}
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
