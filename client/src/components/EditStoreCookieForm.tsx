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
import APIClient, { EditStore } from "../services/api-client";
import { useRef } from "react";
import { Store } from "../entities/Store";
import useMutateCookies from "../hooks/useMutateCookies";

interface Props {
  id: number;
  cookieSize: string;
}

const EditStoreCookiesForm = ({ id, cookieSize }: Props) => {
  const apiClient = new APIClient("store/");

  const {
    mutate: editStoreCookies,
    error,
    isLoading,
  } = useMutateCookies<Store, Error, EditStore>(
    (store: EditStore) =>
      apiClient.editStore(store, id).then((res) => res.data),
    () => {
      
    },
    ["cookies", "store"]
  );

  const storeQuantity = useRef<HTMLInputElement>(null);

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const storequantityValue =
      storeQuantity.current?.querySelector("input")?.valueAsNumber;

    const storeData: EditStore = {
      quantity: storequantityValue,
    };

    editStoreCookies(storeData);
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
            Edit {cookieSize} Cookies in Store
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
            <Button disabled={isLoading} type="submit" colorScheme="blue" marginTop={3}>
            {isLoading ? "Editing Cookies in Store..." : "Edit Cookies in Store"}
            </Button>
          </Center>
        </FormControl>
      </form>
    </>
  );
};

export default EditStoreCookiesForm;
