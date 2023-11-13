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
import { AddEditStore } from "./StoreCookie";
import { useRef, useState } from "react";
import useAddStoreCookie from "./useAddStoreCookie";

interface Props {
  id: number;
  cookieSize: string;
}

const AddStoreCookiesForm = ({ id, cookieSize }: Props) => {
  const [storeQuantityValue, setStoreQuantityValue] = useState(1);
  const resetForm = () => setStoreQuantityValue(1);

  const { addStoreCookies, error, isLoading } = useAddStoreCookie(resetForm);

  const storeQuantity = useRef<HTMLInputElement>(null);

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const storequantityValue =
      storeQuantity.current?.querySelector("input")?.valueAsNumber;

    const storeData: AddEditStore = {
      cookie_name: id,
      quantity: storequantityValue,
      size: cookieSize,
    };

    addStoreCookies(storeData);
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
