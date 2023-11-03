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
import { useRef, useState } from "react";
import { Store } from "../entities/Store";
import useMutateCookies from "../hooks/useMutateCookies";
import { CACHE_KEY_COOKIES } from "../constants";

interface Props {
  id: number;
  cookieSize: string;
}

const AddStoreCookiesForm = ({ id, cookieSize }: Props) => {
  const apiClient = new APIClient("store/");
  const {
    mutate: addStoreCookies,
    error,
    isLoading,
  } = useMutateCookies<Store, Error, AddUpdateStore>(
    // apiClient,
    (cookie: AddUpdateStore) =>
      apiClient.addStore(cookie).then((res) => res.data),
    () => {
      resetForm();
    },
    [CACHE_KEY_COOKIES, "store"]
  );
  
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

    addStoreCookies(storeData);
  };

  const resetForm = () => setStoreQuantityValue(1);

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
              disabled={isLoading}
              type="submit"
              colorScheme="blue"
              marginTop={3}
            >
              {isLoading
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
